---
layout: Post
title: 'Migrating a Drupal 4.6 Site To VuePress'
tags:
    - drupal
    - development
author: 'John Ouellet'
private: false
mainImage: images/articles/drupal-vuepress/drupal-vuepress.png
img-src: images/articles/drupal-vuepress.png
byline: 'With Lando and Symfony Console, migrating this legacy Drupal 4.6 site to VuePress was fairly straightforward.'
date: '2019-11-11'
---

Overview
-------------------

Over the summer, [Rachel Lawson](https://twitter.com/rachel_norfolk) sent out a tweet that a small non profit was looking to migrate their legacy Drupal site. I reached out and chatted with the people at [interACT](https://interactadvocates.org/) to learn more about this project.  It turns out they had a legacy Drupal 4.6 that they maintained for the [Intersex Society of North America](https://web.archive.org/web/20190411152648/http://www.isna.org/) that closed its doors over 10 years ago.  interACT maintained it due to the strong SEO rankings for intersex related items.  It was costly to maintain and interACT needed a cheaper and easier way to archive the site for all time.

This was very interesting to me as I had never worked on a Drupal 4.x site.  My first Drupal interactions were on Drupal 5 sites, but I really cut my teeth in Drupal 6.  I also knew this site ran on legacy architecture that no one used any longer.  I enjoy a good challenge and we agreed to move forward on this project.

After looking through the site, we decided to move the site to [VuePress](https://vuepress.vuejs.org/) and host it on [Netlify](https://www.netlify.com/).  I will get into why I chose these options later in the blog post.  Below is how I went about getting the Drupal 4.6 site to work in Lando, how I exported and transformed the content, and finally setting it up on Netlify.


Getting Drupal 4.6 Working Locally
-----------------

The legacy Drupal 4.6 site ran on PHP 4.x and MySQL 4.x.  Currently, [Lando](https://lando.dev/) has the option to do [php 5.3](https://docs.lando.dev/config/php.html#legacy-versions) and [MySQL 5.7](https://docs.lando.dev/config/mysql.html#patch-versions) out of the box. So I knew we would have to use a [custom compose services](https://docs.lando.dev/config/compose.html#compose) of Lando to get this site to work correctly.  

I have [already written an article](https://thinktandem.io/blog/2019/09/10/running-legacy-versions-of-drupal-on-lando/) on how we finally got this site to work with Drupal 4.6.  After I wrote that article, there was a small addition or two to handle some DB issues I was having with the site on rebuild.  Here is the final Lando YAML config file I had been using:

```yaml
name: isna-old

proxy:
  appserver:
    - isna-old.lndo.site

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    run_as_root:
      - chown -R mysql:mysql /db
    build_as_root:
      - mysql -u root -pmysql4 -e "UPDATE mysql.user SET password=OLD_PASSWORD('mysql4') WHERE USER='root'"
      - mysql -u root -pmysql4 -e "FLUSH privileges"
    build:
      - mysqladmin -u root -pmysql4 create database | true
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      volumes:
        - data_database:/db
      environment:
        MYSQL_ROOT_PASSWORD: mysql4

tooling:
  mysql:
    service: database
    cmd: mysql -u root -pmysql4 database
  php:
    service: appserver
  db-import:
    service: database
    cmd: mysql -u root -pmysql4 database < /app/DB.sql
  db-fix:
    service: database
    description: Fixs the Unknown MySQL Server Host 'database' issues
    cmd: chown -R mysql:mysql /db
    user: root
```

It was quite interesting to have a site that was built almost 15 years ago working in a modern localdev stack.  This is why Lando is such a great localdev tool to use for all your projects.  Now that we had the Drupal 4.6 site working locally, we had to figure out how to get the content out of it.


Getting the content out of the Drupal 4.6 Site
------------------

Drupal was a much different CMS when 4.6 was all the rage.  Views had just came out and none of the awesome data export modules existed yet.  There was no migrate system at all yet either.  So, I headed over to [drupal.org's module search page](https://www.drupal.org/project/project_module) and looked for a CSV export option.  After staring at a few options, I landed on the [Import-export](https://www.drupal.org/project/import_export) module as it seemed to have the basic functionality to suit our needs.  After enabling the module, I went to the config page and was presented with a few options:

<img src="/images/articles/drupal-vuepress/import-export.jpg" alt="Drupal 4.6 Import / Export Screen" /> 

As a side note, the backend of a Drupal 4.6 is not that dissimilar from a Drupal 6 site.  I was able to find what I needed fairly easily.

These options allowed me to export all the node types to CSV's.  Which is basically what I needed to get a bulk of the content out.  One of the main differences of this site from a modern Drupal site is there were no views as I mentioned before.  Instead the site used something called directories.  So I knew I would have to manually recreate those pages.  Also, the taxonomy pages were only available as XML exports.  From handling data exports in php, I know XML is much more tedious to process than CSV.  It would be easier to recreate those pages manually as well.

The only thing this module did not do is export the node path or its aliases.  This site actually has a mix of non aliased and aliased paths.  Regardless I needed this option to be able to create the structure needed in the VuePress site (more on that later).  So I did the unthinkable and hacked the module for the ability for the url to be a field that we could export.  I think the Drupal best practices overseers will forgive me since the module has been obsolete for years.

So with that said and done, I was able to get about 95% of the site exported to CSVs.  The site itself has a little over 1500 pieces of content, so this saved me a ton of time creating the site content manually.  Now all I needed to do was to convert all this content to work with VuePress.  First, I will talk about why we chose VuePress and how we set that up.


Why VuePress
----------------

Here at Tandem, we have adopted [VueJS](https://vuejs.org/) as our frontend technology.  While everyone in the Drupal community is all about React / Gatsby, we have found VueJS to suit our needs better.  When I first looked at VueJS templating code, it made sense to me right away.  I am mostly a backend developed, but I do have a good amount of experience with various JavaScript front end technologies.  With that said, the simplicity, ease of use, extensibility, and scalability is why we have used VueJS in house.  We have used it to build fully decoupled Drupal 8 sites like [poets.org](https://poets.org/) and partially decoupled components like [GoHealth's robust mapping feature](https://www.gohealthuc.com/nyc).

VuePress is a newer product that is used to build static based sites.  Since the 1.x version of VuePress, a lot of the theming mechanisms are similar-ish to Drupal's inheritance structures and you can build sites easily and quickly without really knowing VueJS.  VuePress can be used to create documentation based site like [Tandem's documentation site](https://docs.thinktandem.io/) or [Lando's documentation site](https://docs.lando.dev/).  You can also use it to make regular sites like [Lando's main site](https://lando.dev/).  

ISNA's old site looks very similar to the documentation sites we have already created.  So, it would be very easy to have a similar look and feel to the legacy site but with a modern feel.  The client did not mind that the site would look slightly different in the end either, so this made the choice easy.

### Lando VuePress Setup

As with almost all the projects we do here at Tandem, we created a [VuePress start state](https://github.com/thinktandem/template-vuepress).  We have a simple way to start all our projects and I followed [this guide to get it going](https://docs.thinktandem.io/guides/spinning-up-new-projects.html).  As an organization, we have standardized on [platform.sh](https://platform.sh/) as represented in this repo and the guide.  However, I just skipped those steps for this repo and stripped that code out since I will be building the site with Netlify. 

This starter state is good to go out of the gate.  All I did was change the app name in the lando config file and I was off to the races.  I pushed up my changes to GitHub and now I am ready to spin those out on Netlify.

### Netlify VuePress Setup

[Netlify](https://www.netlify.com/) is a newer service that embraces the [JAMStack](https://jamstack.org/) movement that is happening on the web right now.  VuePress is one of the many stacks they support with their [Netlify Build](https://www.netlify.com/products/build/) service.  

You can easily integrate a site from GitHub and it detects what the technology is.  During the setup, it lets you choose your deploy settings.  With our starter state, we changed the default ```docs``` folder to ```src```.  So, we just had to adjust the build and deploy commands in this step.  Once that is done, it deploys the site and you are good to go.  You can change the name of the site to something more readable.  For us we changed it to isna.netlify.com.  

So now that our VuePress site is setup, we need to get the Drupal 4.6 content into the new site.


Converting the Exports to Markdown
-----------------------

In our VuePress setup everything goes into the src folder.  You also can checkout how to [setup directory structure in this doc](https://vuepress.vuejs.org/guide/directory-structure.html#default-page-routing).  Our Drupal 4.6 site had paths like ```node/14``` or ```/faq```.  In VuePress, in order to achieve this structure, I need to have folders and children folders of the same name with a README.md file in them.  So, for the first example, I will need a ```node``` folder and in that folder I need a ```14``` folder with a README.md file in it with the appropriate content to achieve the same path structure.  

So with this in mind, I needed a way to create that structure and then also create the MarkDown files with the appropriate content.  There really wasn't a good tool out there that fit my needs after a lot of Googling.  So I had to create my own.  I achieved this by using [Symfony Console](https://symfony.com/doc/current/components/console.html).  Symfony Console is a powerful tool that allows us to create CLI commands via PHP classes basically.  If you have ever used [Drupal Console](https://drupalconsole.com/) before, it is powered by Symfony Console.  

I had never written a Symfony Console command before, but I have written tons of Drush commands, so it was not that different.  If you have done any custom coding in Drupal 8, you can write a Symfony Console command.  They also have a quick and easy way to get started with a new command via:

```bash
composer create-project symfony/skeleton myapp
cd myapp
composer require console 
composer require --dev maker var-dumper
```

Once I ran that, I was good to.  Now I just needed a way to take the data I had and convert it into the directories and files via PHP.  I have written many Drupal custom modules that have manipulated data in files, especially CSVs.  So I knew I could copy pasta a lot of that and place it into the Console command I was creating.  

After a couple hours, the end product is this [CSV to VuePress Markdown](https://github.com/thinktandem/csv-to-vuepress-md).  This is still a work in progress, but it got this job done for us.  To use this, your CSV files need to have a title, body, and url field in it.  Any other fields will be converted into [YAML Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html#predefined-variables) items.  From there, it creates the directory structure based on the url and generates everything to the ```output``` folder.

Once I ran all my CSV's through this mechanisms, I took the whole output folder and put it in my VuePress src folder.  It did take a few tries to get the content to look right honestly though.  This site used an old textile WYSIWYG format too which made things interesting.  There is a branch on the CSV to VuePress Markdown project that accounts for that as well.  All in all, it was only a few hours of work to get this right, which is not bad for a first try with Symfony Console.

With that, I had migrated about 95% of the site content and was ready for prime time.  Now we just had to get the site to look almost like the legacy site.


Setting Up & Styling the VuePress Site
-----------------------

In the beginning of this article, I linked to the web archive version of the site.  I needed this VuePress site to look as close as possible to the old one.  VuePress default theme has a lot of features that made this easy.  There is a built in [sidebar](https://vuepress.vuejs.org/guide/frontmatter.html#predefined-variables), [Algolia search](https://vuepress.vuejs.org/plugin/official/plugin-search.html#install), and a [customizable navbar](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar).  While there are many more options that come with VuePress, these gave me the base I needed to get this site to function and look similar to the legacy Drupal 4.6 site.

### VuePress Config

Our starter state has default settings within the ```.vuepress/config.js``` file that powers all the settings for the site.  VuePress has a powerful [Theme Config](https://vuepress.vuejs.org/config/#themeconfig) section in which you can do a lot of various tweaks and what not as needed.  So I tweaked everything specifically for this site and a bulk of the config was done.

The only really challenging part of this was getting the sidebars to function as close as possible to the legacy site.  This took some trial and error since and was a big part of the config code and there are numerous sidebars on the site.  Here is a snippet of the [FAQ sidebar](https://isna.org/faq/) that appears on every page:

```js
...
  '/': [
    {
      title: 'FAQ',
      path: '/faq/',
      children: [
        "/faq/what_is_intersex/",
        "/faq/frequency/",
        {
          title: 'Intersex conditions',
          path: '/faq/conditions/',
          collapsable: true,
          children: [
            '/faq/conditions/5AR/',
            '/faq/conditions/ais/',
            '/faq/conditions/ais_test/',
            '/faq/conditions/aphalia/',
            ...
          ]
        },
        "/faq/patient-centered/",
        "/faq/third-gender/",
...
```

Once that sidebars were all set, the last part was creating the top level navbar which was done in the theme config via:

```javascript
nav: [
  {text: 'faq', link: '/faq/'},
  {text: 'support groups', link: '/support/'},
  {text: 'contact', link: '/about/contact/'},
  {text: 'español', link: '/espanol/'},
],
```

So with that, the config was pretty much setup and good to go.  Now I could begin theme the site to get it to look as close as possible to the legacy Drupal 4.6 site.

### Theming the VuePress site

VuePress uses a [theme system](https://vuepress.vuejs.org/theme/) to handle styling and displaying information just like any other CMS.  It is pretty easy and straightforward to use.  If you have done anything in VueJS, the templating system is exactly the same.  I am just going to jump in and show you how I got the site to look the we it does.  If you aren't similar with the VueJs templating system, I suggest you [browse the VueJS docs first](https://vuejs.org/v2/guide/syntax.html).

### Layouts

The only requirement from InterACT was to have a banner at the top of every page that signified this was an archived site.  Since VuePress uses a static navbar and sidebar from the default theme, the easiest way to achieve this was to put it right above the body content.  This was fairly easy to do by [extending the VuePress default theme](https://vuepress.vuejs.org/theme/inheritance.html) and [overriding the Layout.vue](https://vuepress.vuejs.org/theme/inheritance.html#override-components) file.  

When you override a layout in VuePress, you don't need to copy everything.  Instead you can use the ```<ParentLayout>``` tags and slap all your custom stuffs in between those tags.  VuePress is smart enough to know what to do with that.  Also, VuePress has a concept of slots which are similar to hooks in Drupal for placing content in specific parts of a page.  My final layout looked like this:

```html
<template>
  <ParentLayout>
    <Banner slot="page-top" />
    <Footer slot="page-bottom" />
  </ParentLayout>
</template>

<script>
  import ParentLayout from '@parent-theme/layouts/Layout.vue'
  import Footer from '@theme/components/Footer.vue'
  import Banner from '@theme/components/Banner.vue'

  export default {
    components: {
      ParentLayout,
      Footer,
      Banner,
    }
  }
</script>
```

I have my banner (and also footer) component hooked up.  Since I am using the page-top slot, it will appear [above the content as you can see from the default layout](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/layouts/Layout.vue#L37).  

The layout I created extends the main layout that is used by all pages.  You can also create other layouts for your theme to use if you wanted to.  I did have to create a printable layout that was used on a couple pages.  If you do that, you need to use the ```layout``` YAML frontmatter key to [signify what layout to use](https://vuepress.vuejs.org/theme/default-theme-config.html#custom-layout-for-specific-pages).  

### Components

Components are very similar to the templates of Drupal.  You can write your own, like I did for the banner and footer components.  You can also override the default components, which I did do for the Navbar on this site.  To override a default theme template, you just copy the template from the default theme and put it in your components folder and make your tweaks.  Exactly the same thing in Drupal if you were to take a field.html.twig and throw it in your custom theme's template folder.

VuePress also uses stylus by default as a CSS processor.  You can use whatever CSS processor you want, but stylus works out of the box.  I found it pretty easy to use as it similar to any SASS solution, just no brackets, colons, etc.  You can see from the Banner.vue component:

```html
<template>
  <div class="banner">
    <div class="banner-text">
      <p>The Intersex Society of North America closed its doors and stopped updating this website in 2008.  ISNA’s work is continued by <a href="http://interactadvocates.org/">interACT: Advocates for Intersex Youth</a>, who proudly preserves this website as a historical archive.  For current information, links to intersex support groups, and to connect with intersex advocates, please head to <a href="http://interactadvocates.org/">interACT: Advocates for Intersex Youth</a>.</p>
    </div>
    <div class="banner-image">
      <img src="/interact.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
  };
</script>

<style lang="stylus">
  .banner
    max-width 100%
    margin 0 auto
    padding 6rem 2.5rem 2rem 2.5rem
    background-color #633f99
    color white
    display flex
    justify-content space-between
    align-items center
    @media (max-width: 958px)
      display block
    .banner-text
      p
        padding 0
        margin 0 0 0.5rem 0
        line-height 1.5
        a
          color white
          text-decoration underline
    .banner-image
      @media (max-width: 958px)
        display none
      img
        padding 10px 50px 30px 50px;
</style>
```

So as you can see, it's pretty straightforward and easy to use.  This component is on every page and is above the  content and we achieved the only requirement.  I did extend a few other components, but for the sake of brevity, we will just cover the banner.

Now with that done, it was time to add system wide styling.

### Styling 

VuePress has two files when creating non components based styling: [index.styl](https://vuepress.vuejs.org/config/#chainwebpack) and [palette.styl](https://vuepress.vuejs.org/config/#palette-styl).  We use the index.styl to write our own system wide CSS.  The palette.styl is used to override [default presets](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/core/lib/client/style/config.styl) from the default theme.  We used the last one to change a few options as seen below:

```sass
$accentColor = #369
$contentWidth = 850px
$navbarHeight = 4.3rem
```

### Static Asssets

Moving the static assets (ie images, pdfs, etc) is a fairly straight forward process.  There is a public directory in the VuePress structure that is used to store all items that will build into the root of the site.  Since I was not changing the paths of the files, I just copied all images, pdfs, etc in their respective directories and slapped them into the public directory.

That is basically it on how the [ISNA site](https://isna.org/) got its new look and feel.  If you have themed in Drupal, you can write a theme in VuePress very easily.

QA'ing the migration
---------------

Beyond the typical visual regression checks, we need to check to make sure all the content has come over.  We also need to make sure our redirects are in place as well.  We always do this in a couple steps that I will go over below.

### Check Sitemaps

Almost every site has a sitemap these days, even this legacy Drupal 4.6 site did!  What we usually do is take the sitemap and [extract all the links with this handy tool](https://robhammond.co/tools/xml-extract).  From there, we have an [internal Drupal 8 module](https://github.com/thinktandem/url_checker) (I need to convert this to a Symfony Console command!) that checks all the urls and return their status code and a few other things.  After running this, I can make not of all the 404 pages and manually fix them, which I will go over below.

### Ahrefs

[ahrefs.com](https://ahrefs.com/) is a great SEO tool we have used for years.  It also comes with a handy [audit tool](https://ahrefs.com/site-audit) to identify all SEO related problems, including 404 pages.  Whenever we do a migration, we run the new site through the audit tool before we go live.  We will adjust any SEO issues and also fix any 404 flags.  This tool is great since it finds urls that the sitemap does not have.  Any 404s I make note of and continue on.

### Google Search Console

As with the sitemap procedure, we use Google Search Console to find all indexed pages.  To get all indexed pages, click on the Coverage option on the left, then click the Valid box above the graph.  From there, you can export all the types of urls it has listed.  We take that list and run it through the url checker with the new url and make not of all 404s.


So now that we have a list of 404s, we need to fix this content.  In this instance, we had to create the pages manually.  Which was a little time consuming but not too bad.

### Fixing Missing Content

The way I handled this part of the migration was to look at the old site (while logged out) and grab the missing content between the main div tags.  I then slapped the raw HTML into this super handy [HTML to Markdown converter](https://domchristie.github.io/turndown/).  I used all the default setting with the exception of making the link styles referenced.  This saved me so much time and effort.  All together, it only took a few hours to add in the missing content.  

Once all the missing content was added, I reran all the previous steps to make sure all the content was there and it looked good.  

### Redirects

There were a bunch of redirects in place on the legacy site.  Also, some content, like the store and donate options were no longer a thing.  I decided to use [Netlify's redirect system](https://docs.netlify.com/routing/redirects/) since I had an issue with VuePress redirecting to external links.  I created the ```_redirects``` file in the public folder of the VuePress structure.  I then added all the redirects and pushed it up.  

With all our content and redirects in place, interACT checked out the site and give me the thumbs up.  It was time to make the switch.

Going Live
--------

Going Live was fairly easy with Netlify.  It only involved two steps really, adding the [custom domain](https://docs.netlify.com/domains-https/custom-domains/) and then switching the nameservers.  Netlify did the rest from there.  Just like any other modern CDN, the switch happened almost instantly. 

After going live, I did our usual post live performance testing.  I saw that the site has an issue or two in page speed and was able to alleviate those by using the [Asset Optimization](https://www.netlify.com/blog/2019/08/05/control-your-asset-optimization-settings-from-netlify.toml/) setup in Netlify.  Other than that, this site was good to go and we successfully migrated the site to VuePress.


Final Thoughts 
------------

Taking on this project allowed me to learn new things like custom Lando setups, writing a Symfony Console command, and becoming better at VuePress.  I also learned more about Netlify and its advantages and disadvantages.  The only big disadvantage I saw with Netlify was this site had too much traffic to qualify for the free plan which was a big bummer to me.  The site generates about 150 GBs / month in bandwidth from their CDN.  The site is heavily cached via [Netlify caching file](https://www.netlify.com/blog/2017/02/23/better-living-through-caching/), but it still gets hundreds of thousands of pageviews a month.  However, with the bandwidth overages, it is only $20 / month.  Which is pretty low cost considering what they were paying to keep the site going.  Other than that, Netlify is amazing and I recommend it to anyone creating a static site setup.  

Here at Tandem we have migrated all types of sites to various platforms.  If you are looking to migrate your legacy site to archive it, fill out the form below and we can talk to see what it would take.  

