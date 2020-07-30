---
title: 'USF Performance Rescue'
logo: /images/clients/usf/usf.png
org: 'University of San Francisco'
byline: 'We quickly fixed a mission critical bug causing periodic downtime to <strong>University of San Francisco''s</strong> main marketing site.'
image: /images/case-studies/usf-rescue.jpg
challenge: 'Find and eliminate a bug causing frequent downtime to USF''s primary marketing site.'
solution: 'Employ a custom debugging module, BlazeMeter and NewRelic to locate and squash bug.'
impact: 'Consistent uptime. Peace of mind for USF staff. Less code to manage going forward.'
quote:
    - { content: 'I have one speed. I have one gear: GO', author: 'Charlie Sheen' }
metrics:
    - { key: 'Solved In', value: '72 hours' }
    - { key: BlazeMeter, value: 75rpm }
    - { key: Framework, value: 'Drupal 7' }
    - { key: Profiling, value: NewRelic }
tags:
    - drupal
    - highereducation
    - rescue
background: 00574D
layout: CaseStudy
slug: usf-redirect-rescue
dark: false
private: false
date: '2017-09-25'
meta:
    - { name: description, content: 'We quickly fixed a mission critical bug causing periodic downtime to <strong>University of San Francisco''s</strong> main marketing site.' }
    - { name: keywords, content: 'drupal,highereducation,rescue,' }
---

For months the University of San Francisco was consistently, but seemingly randomly experiencing major downtime on their main [marketing site](http://usfca.edu). After many frustrating days of troubleshooting, they called on Tandem to isolate and resolve the underlying issue.

Using a custom debugging module, significant load testing via [BlazeMeter](https://www.blazemeter.com/) and monitoring via [NewRelic](https://newrelic.com/) we were able to analyze a complicated Drupal 7 application with a myriad of modules to identify the bug and provide a quick 72 hour turnaround.

We learned that sites using Varnish edge caching (provided via [Pantheon](http://pantheon.io)), Amazon's [CloudFront CDN](https://aws.amazon.com/cloudfront/) and the Drupal [CDN module's](https://www.drupal.org/project/cdn) duplicate content protection sometimes cache pages in a way that results in an infinite redirect loop, effectively crashing the site.

To provide resolution we switched from CloudFront to Pantheon's own [global CDN](https://pantheon.io/global-cdn). As a consequence we were also able to eliminate the offending CDN module.

<strong>Less stack complexity + Less dependencies + More stability = Mission Accomplished!</strong>
