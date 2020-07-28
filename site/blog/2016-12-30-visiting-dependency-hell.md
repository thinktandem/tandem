---
title: 'Visiting Dependency Hell'
tags:
    - deployment
    - localdev
author: 'Alec Reynolds'
private: false
mainImage: 'https://thinktandem.io/images/articles/dependency-hell/inferno.jpg'
img-src: 'https://thinktandem.io/images/articles/dependency-hell/inferno.jpg'
byline: 'A brief vacation to one of software development''s notorious infernos reminded me why containers, Docker, and Kalabox are the way to manage development dependencies.'
date: '2016-12-30'
---

Last night I was (trying) to install a Laravel project (DreamFactory) for evaluation. Normally I'm using Kalabox, a Docker-based project we created to help people quickly start developing and evaluating software. However, we didn't have an app configuration for Laravel. In my haste to "get things moving," I threw caution to the wind and began installing dependencies to run the project locally.

Big mistake.

The first hurdles were fairly innocuous: updating PHP, getting Composer in shape. When I hit my first real error (an issue with autom4te when building the mongodb php extension), I was a little taken aback, but not troubled. A bit of troubleshooting found out that my Xcode command line tools needed to be updated.

An hour and several errors later, I decided to call it quits when encountering a cryptically labeled "Error 1." I'm sure it was solvable: all problems are solvable with sufficient time.

## Don't Live in Dependency Hell

Developers aren't always good sysadmins (I'm certainly no savant). Don't feel bad: if you're trying to run web applications natively on your Mac or Windows computer, likely you're wasting your time anyway. Afterall, who is running a MacOS or Windows 10 Pro server?

If you're a Linux user with extreme command-line fu, by all means: develop locally and love it. But for the rest of us who lack the time and inclination, make sure you visit Dependency Hell as infrequently as possible.

## Home Sweet Container

My short vacation reminded me why the container world of Docker and Kalabox is such a great place for my day-to-day development to live. I have the help of a huge community providing container images that solve all the tricky sysadmin problems for me. I can run the same containers locally that are used in production, guaranteeing my local efforts aren't sound and fury signifying nothing.

Using DreamFactory's Docker Compose instructions I was able to get things up and going. And with a little tweaking, I was able to switch the datastore over to Postgres and import my dataset. Now I can use my work to host this DreamFactory installation on a wide variety of providers.

It isn't magic and there's still cursing, but I'll be damned if I ever get sent back down to Dependency Hell.
