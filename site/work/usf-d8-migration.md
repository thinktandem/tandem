---
title: "Drupal 8 Intranet Migration"
id: usf
client: "University of San Francisco"
summary: "We helped USF migrate their existing intranet and rebuilt their custom functionality from the ground up to optimize performance."
link: "https://www.usfca.edu"
logo: /images/logos/usf.png
logoHeight: 2
logoMargin: 15

header:
  title: "A Faster<br/>Stronger<br />Intranet"
  image: /images/work/usf-d8.png
  background:
    background-color: "#FDBB30"
    background-image: url(/images/work/usf-campus.jpg)
    background-position: 100% 20%
    background-size: cover
    background-repeat: no-repeat

theme:
  background: "#FDBB30"
  headerColor: "#00543C"
  headerHover: "#2A2A2A"
  headerActive: "#2A2A2A"
  text: "#00543C"

date: "2018-10-31"
tags:
  - drupal
  - higher-ed
  - php
  - performance
  - support
  - training
  - development
  - migrations
  - new-relic
  - blazemeter
  - blackfire
---
::: point Summary.
The University of San Francisco (USF) intranet was having issues with usability, performance, extensibility, and maintainability. This can often be the case when you maintain a complex and big site built on Drupal 7 Open Atrium over an extended period of time. USF needed to take a step back and plan for the next iteration of their intranet so they called Tandem.
:::

::: important Challenge 1: Complex Migration
One of the biggest challenges identified was migrating the existing Drupal 7 Organic Groups setup to utilize Drupal 8 Groups. Previously, there was no migration path that existed for this, however, [now there is](https://thinktandem.io/blog/2018/03/30/migrating-drupal-7-organic-groups-to-drupal-8-group/). :)
:::

:::::: col-wrapper
::: col-half Tech:
* Drupal 8
* Groups Module
* Custom Modules
:::

::: col-half Entities Migrated:
:::big
250K
:::
::::::

::: important Challenge 2: Custom Functionality
On top of the Organic Group to Group migration, there was numerous other internal functionality that needed to rebuilt.  Some of this included, but not limited to:

* Custom user weighted draggable tables
* Integration and functionality with two internal APIs
* Custom CAS integration with the Group module.
:::

::: important Challenge 3: Performance
Tandem also went through rigorous performance testing and tweaking of the custom functionality via New Relic, Blazemeter and Blackfire.
:::
