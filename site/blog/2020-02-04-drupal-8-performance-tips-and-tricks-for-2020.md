---
title: "Drupal 8 Performance Tips and Tricks for 2020"
tags:
  - development
  - drupal
  - php
  - javascript
  - platformsh
  - performance
  - support
  - johno
author: "John Ouellet"
date: "2020-02-04"
summary: "Outlining some of the tried and tested performance enhancements that will lead you to victory in Drupal 8, Drupal 9, and beyond."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

## Overview

I have really enjoyed how much easier it is to make Drupal 8 performant compared to its predecessors.  When I first started working with Drupal 8 performance, I was surprised how few of the tips and tricks I used from Drupal 7 and prior versions could be used in Drupal 8.  In actuality, most are no longer needed!  To save you the time, I've recorded all the performance tricks I've learned since building my first Drupal 8 site in 2015.  Sites of all sizes can adopt these methods to make your user's experience that much faster and better.

## 1. Get a better host.

Before I dive into code, benchmarking, etc, the first item on your checklist should be to evaluate your hosting.  When it comes to Drupal 8 specific hosting, you should stick with one of the 3 major hosting options: [Platform.sh](https://platform.sh/), [Pantheon](https://pantheon.io/), or [Acquia](https://www.acquia.com/).  These 3 hosting providers were created with the sole purpose of making your Drupal 8 hosting experience as easy and as performant as possible.  Here at Tandem, we mainly use Platform.sh and Pantheon for Drupal.

Platform.sh is a great choice for organizations like Tandem that build and maintain applications in many different frameworks other than Drupal.  Their [multi app](https://docs.platform.sh/configuration/app/multi-app.html) structure makes it easy to do decoupled Drupal and other non-Drupal based architectures.  Another reason why we choose Platform.sh over others is their build and deploy setup caters to [Composer](https://getcomposer.org/)-based applications like Drupal 8.  Their configuration is almost a mirror to [Lando](https://lando.dev), the [most popular local development tool for Drupal](https://youtu.be/PB5mSmqZOoE?t=917) (shameless plug alert: Lando was created and is maintained by Tandem).  On top of this, Platform.sh has performance tools like [Redis](https://redis.io/) readily available on all subscription levels.

If your organization only works on Drupal and WordPress websites and prefer an easy-to-use dashboard and great support over flexibility, I highly recommend you use Pantheon.  We have been partners with Pantheon since 2012 and love their hands-off approach to the hosting experience.  Particularly for teams who don't want to tweak infrastructure, they simplify the entire hosting experience, providing a built-in world-wide CDN, automatic scaling, [Varnish](https://varnish-cache.org/)/Redis, and other performance-oriented features. As long as your site is built using Drupal best practices, Pantheon will be an automatic performance win for you.

### NGINX vs. Apache

[NGINX](https://www.nginx.com) and [Apache](https://httpd.apache.org/) have been two of the most popular HTTP server options for nearly a decade. If you know enough about either to prefer it, awesome! That probably means you know enough to optimize its performance and don't need me trying to convince you to change your ways. For the rest of us, this quote summarizes how I feel about the comparison:

> Apache is like Microsoft Word. It has a million options but you only need six. NGINX does those six things, and it does five of them 50 times faster than Apache.
> - [Chris Lea](https://chrislea.com/)

If you use Pantheon or Platform.sh, they use NGINX out of the box.  No need to configure it out do anything out of the norm.  I have spoken.

### MariaDB vs. MySQL

We suggest using [MariaDB](https://mariadb.org/) over [MySQL](https://www.mysql.com/).  MariaDB is just faster.  Instead of getting into the nitty gritty of why, here is a post by [MariaDB](https://mariadb.com/resources/blog/why-should-you-migrate-from-mysql-to-mariadb/) and [Pantheon](https://pantheon.io/blog/using-mariadb-mysql-replacement) on MariaDB advantages over MySQL.  Pantheon obviously comes with MariaDB out of the box.  With Platform.sh you can [switch out the database type](https://docs.platform.sh/configuration/services/mysql.html) easily in your ```.platform.app.yml``` file.

## 2. Using Caching

Now that you have chosen your path to a better hosting provider, it is time to get your hands dirty.  Caching is basically how your page is stored in either the browser or server to efficiently and quickly serve it to your site's visitors.  Drupal has always been very good about having numerous caching modules to use on top of its very cache-friendly core code.  Here are my suggestions for easy cache wins for your Drupal 8 site:

### Core Modules

As mentioned above, Drupal 8 comes with a few caching modules in core.  These are no brainer wins to turn on and make the magic happen.

#### Internal Page Cache

If you are not serving dynamic or per session pages (like a shopping cart or any page where a user logs in), then turning on this module is a must for all other sites.  This [drupal.org reference](https://www.drupal.org/docs/8/administering-a-drupal-8-site/internal-page-cache) goes into more depth on how and why to use this module.

#### Internal Dynamic Page Cache

Almost identical to the Internal Page Cache, however this module is used for authenticated (or logged in) users.  Again, here is a [drupal.org reference](https://www.drupal.org/docs/8/core/modules/dynamic-page-cache/overview) that goes into more details on the module.

#### BigPipe

BigPipe has been in core since Drupal 8.3.  Basically it uses placeholders to store parts of your pages.  When the content is updated, only the placeholders that reflect those content changes will be streamed while the rest of the page is cached.  While I personally don't fully understand the whole technical aspect of this, [this drupal.org overview explains it much better](https://www.drupal.org/docs/8/core/modules/big-pipe/overview).  No configuration is needed, it just works out of the box.

If you are on Pantheon, you don't need this module.  They [recommend turning it off](https://pantheon.io/docs/modules-known-issues#bigpipe) since the Pantheon Edge layer buffers text output.

#### Bandwidth Optimization aka CSS/JS Aggregation

Not a core module, but 2 options that come with Drupal 8 out of the box.  Just head over to ```/admin/config/development/performance``` and turn these CSS and JS aggregation options on.

### Contrib Modules

There are so many contrib caching modules out there.  The following list is what I have used to win the performance game.  I am sure there are a few I have missed or just don't know they exist.  In Drupal 8, you don't need much as far as contrib modules go.  However, at every convention and camp, I always headed to the performance-based talks to see if I can add to my bag of tricks.

#### Sessionless BigPipe

As the [module's page states](https://www.drupal.org/project/big_pipe_sessionless), this module uses BigPipe to accelerate the first unpersonalized (aka not user-specific) response. Chances are most pages on your site fall into this category unless you have a logged-in user experience, a shopping cart, or other feature that follows a specific user around. Since we use Internal Page Cache and BigPipe, it makes the most sense to use this module in our setup and I recommend it for yours as well.

#### Advanced CSS/JS Aggregation

Depending on the build of a site, we use the [advagg module](https://www.drupal.org/project/advagg) and its submodules in different ways. On most sites I just enable the base module and the bundler.  This is a very robust module with years worth of documentation on how and when to use it.

#### Quicklink

[Quicklink](https://www.drupal.org/project/quicklink) uses [Google Chrome Lab's Quicklink library](https://github.com/GoogleChromeLabs/quicklink) to make pages load faster by prefetching certain links.  This is another technology I don't have a full understanding of, but it does work and makes pages load very fast.  Check it out to get another quick win with no configuration needed.

### Other Cache Considerations

#### Redis or Memcached

Our preferred object cache has always been [Redis](https://redis.io/).  If you use Pantheon, it is theirs as well.  On Platform.sh you can choose either Redis or [Memcached](https://memcached.org/).  We have found (as have others) that Redis is a more performant option.  My advice is to just use Redis, but [like Levar Burton](https://www.youtube.com/watch?v=vAvQbEeTafk) I'm a big fan of self-directed learning, so you don't have to take my word for it: read this [Medium post on the comparison between the two](https://medium.com/@Alibaba_Cloud/redis-vs-memcached-in-memory-data-storage-systems-3395279b0941) for more clarity.

#### CDN

It is an absolute must to use a Content Delivery Network to make your site serve users fast and efficiently.  There are many choices, but the most popular are [CloudFlare](https://www.cloudflare.com/) and [Fastly](https://www.fastly.com/).  Pantheon uses Fastly out of the gate, so there is no configuration needed.  We use CloudFlare for all our sites on Platform.sh because their free plan is more legit than MC Hammer.  Here is a handy reference on [setting up your Cloudflare instance to work with your Drupal 8 site](https://support.cloudflare.com/hc/en-us/articles/115002911927-Caching-HTML-with-Drupal).

#### Varnish

If you decided to heed my advice and move to one of the three major Drupal hosting platforms, Varnish is already installed and configured for you.  You need Varnish on your Drupal site.  There is no need for me to dive into it further, but is a [handy reference for Drupal and Varnish](https://www.varnish-software.com/wiki/content/tutorials/drupal/index.html).

## Image Optimizations

Websites today are chock full of images.  It is very rare to not see a site built this way.  Images can be huge and resource hogs unless you handle them correctly.  Drupal 8 core and contrib modules allow us to render images efficiently and quickly to our end users.

#### Responsive Images and Image styles

Image styles have been part of Drupal core for quite some time.  Image styles are an easy way to effectively create appropriately sized images throughout your site.  Now in Drupal 8, the [responsive images module is in core](https://www.drupal.org/docs/8/mobile-guide/responsive-images-in-drupal-8) which then allows you to render images within the [HTML5 picture tag](https://www.w3schools.com/tags/tag_picture.asp) in conjunction with image styles.

To get rolling with this responsive images module, you need to [setup breakpoints in your theme](https://www.drupal.org/docs/8/theming-drupal-8/working-with-breakpoints-in-drupal-8).  Then you need to generate image styles that will scale images to their breakpoints respective sizes.  Here is a [handy reference from Promet Source](https://www.prometsource.com/blog/how-set-responsive-images-drupal-8) that gives you the blow by blow on how to set it all up.

This is a fairly straight forward process that only takes a  couple minutes per style and the performance gains are amazing.  I see a lot of sites that will have 2 image styles, one for desktop and one for mobile.  Sometimes that is all you need, but you can legit have image styles for every breakpoint.

#### Image Optimize + reSmush.it

[Image Optimize](https://www.drupal.org/project/imageapi_optimize) is a module that allows you to link up to other image optimizations to reduce the size of your images.  [Lossy and Loosless](https://www.keycdn.com/support/lossy-vs-lossless) are the compression standards that all of these optimizations utilize.  Most image optimizations plugins require the software to be installed on the server in order to work right.  This is why I recommend [reSmush.it](https://resmush.it/) as it is an external service that does this all for you.

There is a [Drupal 8 module](https://www.drupal.org/project/imageapi_optimize_resmushit) that allows you to setup an Image Optimize pipeline and use it on your image styles.  It is incredibly simple to use and the performance gains are amazing.

#### Lazy Loading

A quick summation of lazy loading is using a very small placeholder for an image that is outside of a site's current view.  When you scroll down, the lazy loading mechanism switches that placeholder for the actual image.  This allows for a smaller initial page download size which equates to more speed.

I have been using the [Lazy module](https://www.drupal.org/project/lazy) for quite sometime.  Prior to their 3.x release, they used [Blazy](http://dinbror.dk/blazy/) for lazy loading.  Since 3.x they switched to [lazysizes](https://github.com/aFarkas/lazysizes).  Either version allows for easy site wide configuration for all media types.  You can also edit image templates to accommodate for the respective lazy loading library as well.  I personally prefer Blazy since I have used it for so long, but one day I will check out their 3.x versions.  This is a must have module on your site.

## Other considerations

### PHP

Always use the latest version of PHP your host supports.  PHP gets faster and faster with every minor version.  Right now 7.3 is the hotness and all your Drupal 8 sites should be on it.  If one of your modules breaks due to the changes, update it.  Chances are there is already a fix or a patch to make everything work in the latest PHP version supported.

Write efficient and good code.  When you are writing custom modules, always take into the consideration how long it takes something to process this info.  Don't just slap code together and think, well this works.  That's great, but does it work well?  Also, use [PHPStorm](https://www.jetbrains.com/phpstorm/) and get the [PHP Inspections ​(EA Extended)](https://plugins.jetbrains.com/plugin/7622-php-inspections-ea-extended-) plugin.  It will make you a better Drupal programmer in general.

Use benchmarking tools like [New Relic](https://newrelic.com/) or [Blackfire](https://blackfire.io/) to test your existing code base.  Pantheon comes with a free version of New Relic out of the box.  Platform.sh gives you the options to setup [New Relic](https://docs.platform.sh/administration/integrations/new-relic.html) or [Blackfire](https://docs.platform.sh/administration/integrations/blackfire.html) in their configuration.  Here is a [great article I wrote a couple years ago](https://thinktandem.io/blog/2017/11/22/debugging-with-new-relic-blazemeter-strace-more/) on pinpointing a problem with benchmarking tools.

### JS

Less is more is my philosophy here.   Always question why you are adding another JS library to does XYZ on your site.  Can CSS do it, can it be done another way?  If you do use JS, try to use vanilla JS as much as you can.  JQquery is great, but it adds another 100kb or so to your page loads.  Every little bit counts when it comes to performance.

We have used [Bootstrap](https://getbootstrap.com/) for years as our go to responsive framework library. A lot of the times, we don't even need the whole JS library (or at all).  If we aren't using anything but the menu toggle, [we have a simple JS/Twig snippet for that](https://gist.github.com/labboy0276/244366df9b1f5821f872a252274d472c).  It is 5 lines long.  If you need more of the Bootstrap plugins, check this [Native JS alternative](https://github.com/thednp/bootstrap.native/) out instead.

Whenever using a JS framework, always try to find the non JQuery version, and use it.

### CSS

We have been using SASS based solutions for years.  If you use Grunt, Gulp, or Webpack, make sure you are compiling and minifying your CSS as efficiently as possibly.  There are so many tools out there to do this.  Also, remove Drupal 8 libraries you don't need from your subtheme.  Most of the time you don't need half the stuff that Drupal 8 core and contrib themes come with.

You can remove unwanted CSS (and JS) via the [Libraries Overrides](https://www.drupal.org/docs/8/modules/decoupled-blocks-vuejs/override-javascript-libraries) mechanism in Drupal 8.  To turn off a library, [just put false next](https://www.drupal.org/node/2497313) to the library key or file within the library in your override.

### HTML

Drupal is famous for having too many divs, aka "div-itis".  Pagespeed and other performance testing tools will yell at you if you have too many divs on the page, aka DOM elements.  This is also very common in sites that just have very long, huge pages.  Always try to avoid that.

The good thing about Drupal 8 is that all of the templates are extensible and can be thrown into your subtheme.  You can remove the many wrapping divs by altering the base twig templates for each type in your subtheme.  Some of the quickest wins for me is to slap the ```container.html.twig``` and ```field.html.twig``` in my subtheme and remove all the surrounding divs.

You can alternatively use a module like [Fences](https://www.drupal.org/project/fences) to do this for you as well.  I personally have never used this module, but it has been around for quite sometime.

## Conclusion

I am sure there is a thing or two I missed.  I am always looking for new ways to easily make our sites as fast as possible.  If you want a great start state that comes with a lot of the tips I suggested, checkout our [Minimis Distro](https://github.com/thinktandem/minimis).  Everything I used in some shape or form is in this distro from the get go.

If you need an help with making your Drupal 8 site as performant as possible, fill out the form below and we can talk.
