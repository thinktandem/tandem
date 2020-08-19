---
title: "You Might Not Need a Full Blown CMS"
tags:
    - seo
    - mikem
author: "Mike Milano"
date: "2020-01-16"
summary: "A case for static sites"
id: mikem
pic: "https://www.gravatar.com/avatar/80b0826906351617efdd8dbdf3cee68b"
location: California
---

Before deciding on a Content Mangement System (CMS) like [Wordpress](https://wordpress.com/) or
[Drupal](https://www.drupal.org/), you should first make sure you require a CMS at all.

Wordpress has become the ubiquitous blogging platform. Likewise, Drupal has become a quite popular CMS for
more robust use cases. Their popularity is largely due to their accessibility in the sense that it can
be relatively easy to stand up a website with either.

CMS frameworks come with loads of features out of the box:
- User management (register, login, profile, administration)
- Content management (Create and manage articles without code)
- SEO friendly URLs
- Vast ecosystem of themes and modules

The allure of all these features and flexibility available to use without the need to code is great.

Behind all this convenience however is tens of thousands of lines of code. With more lines of code comes
greater complexity, and with greater complexity comes greater costs when it comes down to new development,
maintenance, and security risks.

This article isn't meant to sway you from using a CMS. Our goal is to inform you on a decision
you will be invested in for years to come.

## Maintaining an Estate vs a Track Home

Consider for a moment maintaining, and improving each of these properties.

<table border="0" style="width: 100%;margin: 20px 0;border-top: 1px solid #ccc;">
<tr><td style="width:50%;valign:top">
<b>Estate De La CMS</b>
<div><img style="border: 10px solid #ccc;" src="/images/articles/cms-vs-static/property-estate.jpg" /></div>
<li> 5 acres of land, extensively landscaped</li>
<li> 7,500 sqft 8 bdrm Main House</li>
<li> 3,000 sqft  2 bdrm Guest House</li>
<li> Tennis Court & Putting Green</li>
</td>
<td style="valign:top">
<b>Track Home on Static Circle</b>
<div><img style="border: 10px solid #ccc;" src="/images/articles/cms-vs-static/property-track.jpg" /></div>
<li> .25 acre, small front lawn</li>
<li> 1850 sqft 3 bdrm Main House</li>
<li> No Guest House</li>
<li> No Tennis Court or Putting Green</li>
</td></tr>
</table>

No doubt *Estate De La CMS* will be a handful to maintain. With more plumbing comes
more potential for leaks. More doors and windows makes for more points of entry
to secure. Water, power, resources... all much higher than the track home.

The cost/effort of building *Estate De La CMS* is significantly higher than the *Track Home on Static Circle*.

This would typically be a barrier to entry for anyone not up to the task however the
<a href="https://en.wikipedia.org/wiki/Free_and_open-source_software">Free
Open Source Software (FOSS)</a> licenses make it as if *Estate De La CMS* was passed down to you
by a rich uncle. It comes with great responsibility and if you slack on maintenance, there will be
many more problems to come.

Ok, let's get back to web applications...

## Static Websites (Track Home)

Static websites are a lightweight alternative to a full blown CMS. They run entirely in the user's browser, without the
 need for a database or server-side rendering. They are made up of HTML, CSS, and JavaScript.

If you don't require users logging in to create or modify content, and your content doesn't change that often,
 you may reduce risk and cost by going with a static website.

These days we have many tools to choose from for developing static websites. These frameworks are called
*Static Generators*, and they have come a long way over the years...

### "... up hill, both ways."

Static Generators showed up in the early 2000s. They quickly fell out of fashion
as realtime server-side languages like PHP gained in popularity. Why would we want a static
site when we can use a server-side language?

One answer to that is security, but the alternative wasn't that appealing as sites weren't very dynamic.

You see, modern web apps rely heavily on JavaScript for that rich and dynamic experience. JavaScript itself
left much to be desired back then, and to make matters worse, support for it varied between browsers. It
was difficult to provide a rich experience that worked the same on Internet Explorer and, say Firefox.

In summary, Static Generators have been around a long time, but static sites weren't all too impressive back then.

### Back to the Future...

ES6, Vue, React, Angular... wow, JavaScript has come a long way, and just as important, support across all browsers
is extremely consistent.

Static Generators are back, and producing rich and dynamic sites like never before.

VuePress, Gatsby, Jekyll, and Hugo are just a few Static Generators behind some of the most modern static sites
from around the web.

Static Generators provide standards and flexibility to write clean code with a surprising amount
of dynamics for a web application that isn't using server side processing or a back-end database.

Even though the process of development is robust and sophisticated, the product of these frameworks
are a static site.

### How is a Static Site Significant?

Whether it's planes, cars, or coffee makers, the less systems something requires means there are
less points of failure.

In the case of a website, a static site is immune to almost all vulnerabilities a CMS has. Security
is far greater because it does not require most of the systems that make websites prone to attack
or failure.

If you're happy with how the site looks, there's no need to worry about attacks that either take
control of the server or compromise data.

On the contrary, not only are CMS' open to more attack vectors, their popularity makes them a beacon
to hackers. This is why it is especially important to take CMS maintenance seriously.


## A Comparison of Requirements and Maintenance

Let's take a look at the infrastructure and maintenance required to run a static website vs a CMS like Drupal or Wordpress:

<h4>Static vs CMS Hosting and Maintenance Requirements</h4>

<style>
    #static-vs-cms-table {
        margin: 0 auto;
        width: 80%;
        border: 1px solid #ccc;
    }
    #static-vs-cms-table {
        font-size: 1.1em;
    }
    #static-vs-cms-table td {
        border: 1px solid #ccc;
        text-align: center;
    }
     #static-vs-cms-table td.header {
        font-weight: bold;
    }
    #static-vs-cms-table td.requirement {
        text-align: right;
        font-weight: bold;
    }
    #static-vs-cms-table td.value {
        text-align: center;
    }

</style>

<table id="static-vs-cms-table">
<tr>
    <td class="header">&nbsp;</td>
    <td class="header">Static Site</td>
    <td class="header">CMS (Drupal/Wordpress)</td>
</tr>
<tr>
  <td class="requirement">Web Server</td>
  <td class="value">☑️</td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">Database (MySQL)</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">Server-side Language Support (PHP)</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">Framework Updates (Drupal/Wordpress)</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">PHP Updates</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">MySQL Updates</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
  <td class="requirement">Database Backups</td>
  <td class="value"></td>
  <td class="value">☑️</td>
</tr><tr>
   <td class="requirement">Uploaded File Backups</td>
   <td class="value"></td>
   <td class="value">☑️</td>
 </tr>
</table>

Once again, we're not trying to sway you from using a CMS. We're just saying it's important to make sure
a static site isn't a good fit before committing to a CMS.

We're experts in a number of solutions including CMS and static websites and one of our biggest responsibilities
to our clients is to help determine what solution best fits their business needs.

This is a decision you may be living with for a long time so we encourage you to reach out and allow us to
review your goals and narrow down the options that will best serve you today and well into the future.
