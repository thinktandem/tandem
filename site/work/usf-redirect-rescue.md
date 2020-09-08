---
title: "Performance Rescue"
id: usf
client: "University of San Francisco"
summary: "We quickly fixed a mission critical bug causing periodic downtime to University of San Francisco's main marketing site."
link: "https://www.usfca.edu"
logo: /images/logos/usf.png
logoHeight: 2
logoMargin: 15

header:
  title: "Maximizing uptime<br> squashing bugs<br> quickly"
  image: /images/work/usf-screenshot.png
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

date: "2017-09-25"
tags:
  - drupal
  - higher-ed
  - performance
  - security
  - support
  - php
  - devops
  - testing
  - profiling
  - blazemeter
  - new-relic
---

::: point Summary.
For months the University of San Francisco was consistently, but seemingly randomly experiencing major downtime on their main marketing site. After many frustrating days of troubleshooting, they called on Tandem to isolate and resolve the underlying issue. We did, with a 72 hour turnaround from contract signed to fix deployed. Obvi.
:::

> I have one speed. I have one gear: GO
> - Charlie Sheen

:::::: col-wrapper
::: col-third Turnaround:
::: big
72 hrs
:::

::: col-third BlazeMeter:
::: big
75rpm
:::

::: col-third Profiling:
::: medium
New Relic
:::
::::::

::: important Level 1 Custom Diagnostics
Using a custom debugging module, significant load testing via BlazeMeter and monitoring via NewRelic we were able to analyze a complicated Drupal 7 application with a myriad of modules to identify the bug and provide a quick 72 hour turnaround.

We learned that sites using Pantheon's edge caching, Amazon's CloudFront CDN and the Drupal CDN module's duplicate content protection sometime cache pages in a way that results in an infinite redirect loop, effectively crashing the site.

To provide resolution we switched from CloudFront to Pantheon's own global CDN. As a consequence we were also able to eliminate the offending CDN module.

**Less stack complexity + Less dependencies + More stability = Mission Accomplished!**
:::

