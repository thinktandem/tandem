---
title: 'Utilizing Wildcard Redirects To Win Broken Backlinks'
tags:
    - development
    - support
    - drupal
    - wordpress
author: 'John Ouellet'
private: false
mainImage: images/articles/redirect-404.jpg
img-src: images/articles/redirect-404.jpg
byline: 'Fixing legacy urls for older domains is crucial to keeping your ranking healthy on search engines.  I will show you how to do this via PHP, but this can be applied to any language.'
date: '2017-11-28'
---

Why are we doing this?
----------------------

One of our clients has been on the web for well over 20 years now.  This is the 5th iteration of their site and the 4th platform they have utilized.  Their site's structure went from 2 different HTML sites, to a static PHP site, to a ColdFusion site, to finally a Drupal 7 site. The format of the urls have changed with every version of the site as well.

> Old sites can have even older backlinks.

As a result, sites that backlink to their current site are sometimes using legacy urls that produce ugly 404 errors. Millions of backlinks meant tens of thousands of broken backlinks when we started, creating SEO issues and a bad user experience.  Utilizing a simple trick, we refreshed almost 100,000 backlinks and helped them gain yet another advantage in the SEO game.


What are Backlinks?
-------------------

Backlinks are essentially another site saying, "I dig your content, so I'm linking to it."  Search engines see that and consider it towards your ranking while evaluating your site's trustworthiness.

> Backlinks are another site saying, "I dig your content, so I'm linking to it."

There are well over [200 ranking factors](https://backlinko.com/google-ranking-factors) that Google considers.  Backlinking influences a handful of those ranking factors.  Instead of me going on and on, [this article explains backlinks really well](https://www.theedesign.com/blog/2016/what-are-backlinks-seo) if you need further information.  As a point of reference, backlinko.com and theedesign.com should be thanking me: I just supplied them backlinks in this paragraph.


Are 404s bad for SEO?
---------------------

The jury is out on this question.  I have read numerous articles that have gone back and forth on it.  The two best articles I could find is [this one from Moz](https://moz.com/blog/are-404-pages-always-bad-for-seo) and an [older article from Google Blog](https://webmasters.googleblog.com/2011/05/do-404s-hurt-my-site.html).

> Broken backlinks can hurt your SEO score.

What both articles fail to address is broken backlinks caused by 404s.  Broken backlinks can hurt your SEO score and are seen as bad referring links.  Fixing them is an easy way to drive traffic from trustworthy referring sites while elevating your ranking score with little effort.


Finding Broken Backlinks
------------------------

When we help clients with SEO, we use two main tools: [ahrefs](https://ahrefs.com) predominantly and [Google Search Console](https://www.google.com/webmasters/tools/home?hl=en) as a backup.  Ahrefs is a phenomenal tools for evaluating and fixing SEO issues.  It is quite involved and not something you can just jump into.  If you purchase their product, I highly recommend their [blog posts](https://ahrefs.com/blog/) and their [academy videos](https://ahrefs.com/academy).  To find broken backlinks to your site via Google Search Console, [this Google article explains it](https://support.google.com/webmasters/answer/55281?hl=en) for you.


Show Me the Money!
------------------

Ok, so now that all the words have been said, let's get down to business.  Like I previously mentioned, the site had numerous legacy urls of varying types.  However, most of them still followed a pattern, making this easy to do.  After evaluating a chunk of the links, we decided to send a majority of them the front page.  This was a quick and easy way to remove the 404s and remove the broken backlinks.  There were also a few instances where the legacy urls matched up to landing pages on the new site.  I will show you both examples below.

Here is the code to achieve the front page redirect:

```php
// Legacy Redirects
$http_code = 'HTTP/1.0 303 See Other';
$redirect = FALSE;

// Set this to a var so we don't mess with doing all this fun stuff below.
$uri = strtolower($_SERVER['REQUEST_URI']);

// Wild card patterns
$wildcard = array(
  'trill',
  'tronic',
  'fancy',
  'sauce',
);

// Time to make the magic happen.
$uri_check = explode('/', $_SERVER['REQUEST_URI']);

// Wilcard redirects.
if (in_array($uri_check[1], $wildcard)) {
  $redirect = TRUE;
  $uri = '/';
}

// Perform the redirect
if ($redirect) {
  header($http_code);
  header('Location: https://www.example.com' . $uri);
  exit();
}

```

What is going on here is that if a url matches the pattern listed in the wildcard array, it will get redirected to the front page.  For example: ```https://www.example.com/trill/whatevz/totes``` will now redirect to ```https://www.example.com```.  I also like to use a 303 redirects during testing because it is temporary and doesn't cache like a 301.

We also had specific cases where certain patterns could go to a sub page / landing page.  How we do this is as follows:

```php
// Legacy Redirects
$http_code = 'HTTP/1.0 303 See Other';
$redirect = FALSE;

// Set this to a var so we don't mess with doing all this fun stuff below.
$uri = strtolower($_SERVER['REQUEST_URI']);

// Wild card patterns
$wildcard = array(
  'trill',
  'tronic',
  'fancy',
  'sauce',
);

// Time to make the magic happen.
$uri_check = explode('/', $_SERVER['REQUEST_URI']);

// Wilcard redirects.
if (in_array($uri_check[1], $wildcard)) {
  $redirect = TRUE;
  $uri = '/';
}
// Redirect to specific legacy pages or paths.
elseif (isset($uri_check[1])) {
  switch ($uri_check[1]) {
    case 'elgato':
      $redirect = TRUE;
      $uri = '/thekitty/home';
      break;

    case 'rawr':
      // Old coldfusion urls
      if (isset($uri_check[2]) && strpos($uri_check[2], 'bronto.cfm') !== FALSE) {
        $redirect = TRUE;
        $uri = '/dino/saur';
      }
      break;
  }
}

// Perform the redirect
if ($redirect) {
  header($http_code);
  header('Location: https://www.example.com' . $uri);
  exit();
}
```

We slapped an elseif on our checks and then check for specific patterns to do our magic.  You can do whatever you want with this logic structure.  Once your urls are set to go, change the status code to 301 and that's that!


Conclusion
----------

After using this method for several years, I believe this is one of the simplest ways to fix broken backlinks.   I have implemented some crazy long redirect chains in the past via wildcard redirects.  Finding small simple tasks to help your site in SEO is crucial.  Fixing your broken backlinks will create a flawless user experience, make search engines happy, and give you a crucial advantage in the SEO game.
