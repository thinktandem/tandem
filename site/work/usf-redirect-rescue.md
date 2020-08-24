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
  title: "Building for<br/>the future"
  image: /images/case-studies/usf-d8.png
  background:
    background-color: "#FDBB30"
    background-position: 100% 20%
    background-size: auto
    background-repeat: no-repeat

theme:
  background: "#FDBB30"
  headerColor: "#00543C"
  headerHover: "#00543C"
  headerActive: "#00543C"
  text: "#00543C"

date: "2017-09-25"
tags:
    - drupal
    - highereducation
    - rescue
---

For months the University of San Francisco was consistently, but seemingly randomly experiencing major downtime on their main [marketing site](http://usfca.edu). After many frustrating days of troubleshooting, they called on Tandem to isolate and resolve the underlying issue.

Using a custom debugging module, significant load testing via [BlazeMeter](https://www.blazemeter.com/) and monitoring via [NewRelic](https://newrelic.com/) we were able to analyze a complicated Drupal 7 application with a myriad of modules to identify the bug and provide a quick 72 hour turnaround.

We learned that sites using Varnish edge caching (provided via [Pantheon](http://pantheon.io)), Amazon's [CloudFront CDN](https://aws.amazon.com/cloudfront/) and the Drupal [CDN module's](https://www.drupal.org/project/cdn) duplicate content protection sometimes cache pages in a way that results in an infinite redirect loop, effectively crashing the site.

To provide resolution we switched from CloudFront to Pantheon's own [global CDN](https://pantheon.io/global-cdn). As a consequence we were also able to eliminate the offending CDN module.

<strong>Less stack complexity + Less dependencies + More stability = Mission Accomplished!</strong>
