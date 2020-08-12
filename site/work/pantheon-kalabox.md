---
title: 'Pantheon on Kalabox'
logo: /images/clients/pantheon/pantheon.png
org: 'Pantheon Systems'
byline: 'We built <strong>Pantheon Systems</strong> an integration for our Kalabox GUI that allows their users to easily clone their sites onto their computer.'
image: /images/case-studies/kalabox.png
challenge: 'Provide a one-click, push-button solution that gets a user developing their Pantheon site locally in a matter of minutes.'
solution: 'Use Kalabox and Docker technology to replicate the Pantheon development environment locally.'
impact: 'Allow users of all skill levels to start developing a Pantheon-hosted site almost instantly.'
quote:
    - { content: 'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.', author: 'Douglas Adams' }
metrics:
    - { key: 'Active Monthly Users', value: 1500+ }
    - { key: 'Spin Up Time', value: '5 Minutes' }
    - { key: 'You Bet!', value: 'Cross Platfrom' }
background: EFD01B
layout: CaseStudy
slug: pantheon-kalabox
dark: true
private: false
date: '2013-09-22'
tags:
    - docker
    - nodejs
    - drupal
    - wordpress
    - startups
    - development
meta:
    - { name: description, content: 'We built <strong>Pantheon Systems</strong> an integration for our Kalabox GUI that allows their users to easily clone their sites onto their computer.' }
    - { name: keywords, content: 'docker,nodejs,drupal,wordpress,startups,development,' }
---

Pantheon was looking for a local development environment that, like Pantheon itself, was able to take a complicated problem and make it easily accessible to a wide set of users. Our [Kalabox](http://kalabox.io) GUI and CLI product fit the bill nicely.

We were able to leverage Kalabox's pluggable [nodejs](https://nodejs.org) architecture to build a sophisticated integration that:

* Uses Pantheon's Machine Tokens for authentication
* Gives push-button *get my site* and *deploy my changes* functionality
* Uses [Docker](https://www.docker.com/) to closely mimic the [powerful](https://pantheon.io/how-it-works) Pantheon runtime and toolchain
* Packages in developer power tools like Terminus, [Drush](http://www.drush.org/), [WP-CLI](http://wp-cli.org/) and [xdebug](https://xdebug.org/)
* Ships in a cross-platform, easy-to-use, one-click installer via [nw.js](https://github.com/nwjs/nw.js/)

This allowed Pantheon to easily streamline their user onboarding and agency training with a go-to standard for local development. Now they have another killer app in their product lineup.
