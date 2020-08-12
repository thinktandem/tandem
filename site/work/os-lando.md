---
title: 'Better Local Dev'
logo: /images/tandem-logo.png
org: Tandem
byline: 'How we built <strong>Lando</strong>, an open source local development tool to empower developers and bring more value to clients by saving their time.'
image: /images/case-studies/lando-screenshot.png
challenge: 'Build a tool that allows developers to easily and quickly spin up the infrastructure required for each of their projects.'
solution: 'Leverage our work and experience on the Kalabox project to build a config-file driven and Docker based *TOTAL DEV* tool.'
impact: 'Massive developer time savings in onboarding, testing and writing code that can all be passed on to the client.'
quote:
    - { content: 'In real open source, you have the right to control your own destiny.', author: 'Linus Torvalds' }
metrics:
    - { key: 'Languages Supported', value: 6 }
    - { key: 'Prebaked Recipes', value: 13 }
    - { key: 'Auxiliary Services', value: 15 }
background: ED3F7A
layout: CaseStudy
slug: tandem-local-lando
dark: false
private: false
date: '2017-07-07'
tags:
    - docker
    - nodejs
    - drupal
    - wordpress
    - laravel
    - startups
    - development
    - devops
meta:
    - { name: description, content: 'How we built <strong>Lando</strong>, an open source local development tool to empower developers and bring more value to clients by saving their time.' }
    - { name: keywords, content: 'docker,nodejs,drupal,wordpress,laravel,startups,development,devops,' }
---

[Lando](http://github.com/lando/lando) is the culmination of many years of work trying to create an easy, powerful and comprehensive local development and DevOps tool. It is designed to work with most major programming languages, frameworks and services and provides an easy way for users to specify simple or complex development requirements for their projects. This means that Lando can be used to specify things like `apache` or `memcache` but also things like `drush` or `pip`.

In that way it can be thought of as a development dependency management tool.

**With Lando you can...**

*   Easily mimic your production environment locally.
*   Standardize your teams dev environments and tooling on OSX, Windows and Linux.
*   Integrate with hosting providers like [Pantheon](https://pantheon.io)
*   Store all of the above in a version controlled config file called `.lando.yml`
*   Easily customize or extend tooling, deployment options and basically any other functionality.
*   Free yourself from the tyranny of inferior local development products.

A developer should be able to get a running site and the tools needed to develop that site with a single, short config file called `.lando.yml` that lives in the root directory of your project and a few `lando` commands.

**Lando supports these core languages:**

*   [dotnet](http://docs.devwithlando.io/services/dotnet.html)
*   [go](http://docs.devwithlando.io/services/go.html)
*   [node](http://docs.devwithlando.io/services/node.html)
*   [php](http://docs.devwithlando.io/services/php.html)
*   [python](http://docs.devwithlando.io/services/python.html)
*   [ruby](http://docs.devwithlando.io/services/ruby.html)

**and these prebaked recipes:**

*   [Backdrop](http://docs.devwithlando.io/tutorials/backdrop.html)
*   [Drupal 6](http://docs.devwithlando.io/tutorials/drupal6.html)
*   [Drupal 7](http://docs.devwithlando.io/tutorials/drupal7.html)
*   [Drupal 8](http://docs.devwithlando.io/tutorials/drupal8.html)
*   [Joomla](http://docs.devwithlando.io/tutorials/joomla.html)
*   [Laravel](http://docs.devwithlando.io/tutorials/laravel.html)
*   [MEAN](http://docs.devwithlando.io/tutorials/mean.html)
*   [LAMP](http://docs.devwithlando.io/tutorials/lamp.html)
*   [LEMP](http://docs.devwithlando.io/tutorials/lemp.html)
*   [Pantheon](http://docs.devwithlando.io/tutorials/pantheon.html)
*   [WordPress](http://docs.devwithlando.io/tutorials/wordpress.html)
*   [Custom](http://docs.devwithlando.io/tutorials/custom.html)

**and these auxiliary services:**

*   [apache](http://docs.devwithlando.io/services/apache.html)
*   [elasticsearch](http://docs.devwithlando.io/services/elasticsearch.html)
*   [mailhog](http://docs.devwithlando.io/services/mailhog.html)
*   [mariadb](http://docs.devwithlando.io/services/mariadb.html)
*   [memcached](http://docs.devwithlando.io/services/memcached.html)
*   [mongo](http://docs.devwithlando.io/services/mongo.html)
*   [mssql](http://docs.devwithlando.io/services/mssql.html)
*   [mysql](http://docs.devwithlando.io/services/mysql.html)
*   [nginx](http://docs.devwithlando.io/services/nginx.html)
*   [phpmyadmin](http://docs.devwithlando.io/services/phpmyadmin.html)
*   [postgres](http://docs.devwithlando.io/services/postgres.html)
*   [redis](http://docs.devwithlando.io/services/redis.html)
*   [solr](http://docs.devwithlando.io/services/solr.html)
*   [varnish](http://docs.devwithlando.io/services/varnish.html)

As well as a [whole lot more](https://docs.devwithlando.io).
