---
title: 'Lando + Heroku + Laravel'
tags:
    - development
    - devops
author: 'Geoff St. Pierre'
private: false
mainImage: images/articles/lando-heroku/lando-heroku-laravel.jpg
img-src: images/articles/lando-heroku/lando-heroku-laravel.jpg
byline: '🚀 ∞ Lando + Heroku + Laravel: take your dev to the next level.  📦 ☄️'
date: '2017-12-01'
---

Lando + Heroku Workflow
-----------------------

[Heroku](https://heroku.com) is a flexible cloud hosting platform. [Lando](https://docs.devwithlando.io) is a flexible local development environment. Together the can make your dev workflow really shine!

In and of itself, there is no reason you can't just take any app and deploy to Heroku as you normally would; this post will walk you through constructing a useful `.lando.yml` config file for working with Heroku.

Heroku CLI
----------

Heroku has a powerful cli tool to interact with your Heroku hosted apps. Let's take advantage of that and integrate it into Lando. Start a `.lando.yml` file like this:

```yaml
name: lando-heroku
recipe: laravel
config:
  webroot: public
  via: nginx

  # Stuff we are adding on top of the laravel recipe.
  database: mariadb:10.1

  xdebug: true

services:
  appserver:
    extras:
      - "wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh"
  node:
    type: node:6.10
    build:
      - "cd $LANDO_MOUNT && npm install"

tooling:
  node:
    service: node
  npm:
    service: node
  gulp:
    service: node
  heroku:
    service: appserver
    cmd: /usr/bin/heroku
```

The `appserver: extras` section:

```yaml
    extras:
      - "wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh"
```

retrieves the `heroku` cli app and installs in the `appserver` container.

The `tooling: heroku` section:

```yaml
heroku:
  service: appserver
  cmd: /usr/bin/heroku
```

Adds it as an available command to your lando app; so now you can run `lando heroku`:

Now start your app and now you have access to the `heroku` cli.

```bash
lando start
```

Heroku CLI Basics
-----------------

Available `heroku` commands:

```bash
lando-heroku $ lando heroku
Usage: heroku COMMAND

Help topics, type heroku help TOPIC for more details:

 access          manage user access to apps
 addons          tools and services for developing, extending, and operating
                 your app
 apps            manage apps
 auth            heroku authentication
 authorizations  OAuth authorizations
 buildpacks      manage the buildpacks for an app
 certs           a topic for the ssl plugin
 ci              run an application test suite on Heroku
 clients         OAuth clients on the platform
 config          manage app config vars
 container       Use containers to build and deploy Heroku apps
 domains         manage the domains for an app
 drains          list all log drains
 features        manage optional features
 git             manage local git repository for app
 keys            manage ssh keys
 labs            experimental features
 local           run heroku app locally
 logs            display recent log output
 maintenance     manage maintenance mode for an app
 members         manage organization members
 notifications   display notifications
 orgs            manage organizations
 pg              manage postgresql databases
 pipelines       manage collections of apps in pipelines
 plugins         manage plugins
 ps              manage dynos (dynos, workers)
 redis           manage heroku redis instances
 regions         list available regions
 releases        manage app releases
 run             run a one-off process inside a Heroku dyno
 sessions        OAuth sessions
 spaces          manage heroku private spaces
 status          status of the Heroku platform
 teams           manage teams
 update          update CLI
 webhooks        setup HTTP notifications of app activity
```

Login:

```bash
lando heroku auth:login
```

Create an app on Heroku
-----------------------

For this example we'll build a [Lavarvel](https://laravel.com) app:

```bash
lando heroku apps:create lando-heroku --buildpack heroku/php
```

Get info about your Heroku app with the `apps:info` command:

```bash
lando-heroku $ lando heroku apps:info lando-heroku
=== lando-heroku
Auto Cert Mgmt: false
Dynos:
Git URL:        https://git.heroku.com/lando-heroku.git
Owner:          serundeputy@gmail.com
Region:         us
Repo Size:      0 B
Slug Size:      0 B
Stack:          heroku-16
Web URL:        https://lando-heroku.herokuapp.com/
```

Take note of your `Git URL` and add it as a remote:

```bash
# Install Laravel
lando laravel new

# Initialize git repo and add Heroku remote
git init
git add -A
git commit -m "Initial commit."
git remote add heroku https://git.heroku.com/lando-heroku.git
```

Deploying to `heroku` is as simple as a `git push`:

```bash
git push heroku master
```

Use the `heroku` cli to set an `APP_KEY`:

```bash
lando heroku config:set APP_KEY=$(php artisan --no-ansi key:generate --show)
```

Visit your new site:

<img src="images/articles/lando-heroku/hello-laravel.jpg" align="center" alt="Laravel Hello Screen" />

Conclusion
----------
With a few simple configuration files and commands you are ready to go with all your dev tools and a chain from local to live. You can see the full git repo on GitHub: https://github.com/thinktandem/lando-heroku-demo. The main files of importance are:

* [`Procfile`](https://github.com/thinktandem/lando-heroku-demo/blob/master/Procfile)
* [`.lando.yml`](https://github.com/thinktandem/lando-heroku-demo/blob/master/.lando.yml)
* [`nginx_app.conf`](https://github.com/thinktandem/lando-heroku-demo/blob/master/nginx_app.conf)

🐼 All the convenience of Lando, all the flexibility of Heroku; enjoy! 🐝
