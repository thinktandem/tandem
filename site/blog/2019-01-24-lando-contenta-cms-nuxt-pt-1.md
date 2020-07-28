---
title: 'Lando + Contenta CMS + Nuxt Pt. 1'
tags:
    - development
    - api
    - drupal
    - javascript
author: 'Geoff St. Pierre'
private: false
mainImage: images/articles/headless-pt-1/landoContentaNuxt.png
img-src: images/articles/headless-pt-1/landoContentaNuxt.png
byline: 'Set up a headless Drupal architecture in Lando'
date: '2019-01-24'
---

Why?
----
Prefer video?


<div class="center-youtube-vid">
youtube|hYTqsXmiK4M
</div>

Headless architectures offer many advantages to app construction. From the COPE
(create once publish everywhere) strategy, to parallell development of the
frontend and the backend of the app, but getting the infrastructure right can be
a bit tricky. Let's take a look at how to Landoize your infrastructure and get
the apps talking to each other.

There are also alot of choices available in headless architecture. In this
artilcle we will reduce complexity by making specific choices and give a
concrete example of setting up a headless app. Here is the Tech stack:

* [Lando](https://docs.devwithlando.io) (dev environments)
* [Contenta CMS](https://www.contentacms.org) (Drupal API app)
* [Nuxt.js](https://nuxtjs.org) (Vue Framework frontend app)

Contenta CMS is Drupal distributions with many of the modules needed for an API
baked in like [jsonapi](https://www.drupal.org/project/jsonapi),
[simple_oauth](https://www.drupal.org/project/simple_oauth), and
[decoupled_router](https://www.drupal.org/project/decoupled_router) to name a
few.

Nuxt is an opinionated [Vue.js](https://vuejs.org) framework. Vue can do
anything, but that said, it means you can configure it in many ways. By using
Nuxt we leverage known good development patterns and can get up and running
quickly and still have all the power of Vue.

We will set up two independent Lando apps one for the frontend and one for the
API. We will use Contenta CMS for the API and Nuxt for the frontend.

Setup Contenta CMS
------------------

This is pretty straight forward as it is mostly just setting up a Drupal app.
First create a directory to house your app and move into it:

```bash
mkdir myapi
cd myapi
```

Now initialize and start the app to get access to our tooling:

```bash
lando init <-- choose drupal8
lando start
```

Here is the resulting `.lando.yml` fiie:

```yaml
name: myapi
recipe: drupal8
config:
  webroot: web
```

Nothing too complicated there, but be sure to answer the `lando init`
questions with `druapl8` for the recipe and `web` for the `webroot` as Contenta
CMS will set up a nested webroot in the directory called `web`.

Now that we have the app started we'll use `composer` to pull in the Contenta
CMS Drupal distibution:

```bash
lando composer create-project contentacms/contenta-jsonapi-project blah --stability dev --no-interaction --no-install
```

Composer will not let us install to a directory that already has things in it
and in this case we have our `.lando.yml` file so we install to a directory
called `blah` 🤷 now lets move everything down a level.

```bash
mv blah/* .
mv blah/.* .
rm -rf blah
```

Now use `composer` to install the app:

```bash
lando composer install
```

Now use drush to install the site:

```bash
lando drush si --db-url=mysql://drupal8:drupal8@database/drupal8
```

follow these instructions to set up some nice dev settings avoiding cache issues
in development: https://www.drupal.org/node/2598914, then:

```bash
lando drush cr
```

Now you can visit your site and you should see something like this:

<img style="width: 100%;" src="images/articles/headless-pt-1/myapi.png" alt="Screeenshot of Fresh APICMS"/>

Setup Nuxt App
--------------

Now let's set up the Nuxt app. Again we'll spin up a `.lando.yml` file start the
app and then use our tooling to download and setup Nuxt. This time we won't use
a recipe. We'll use this custom `.lando.yml` file:

Make a directory for your nuxt app:

```bash
mkdir mynuxt
cd mynuxt
```

Create this `.lando.yml` file in your `mynuxt` directory:

```yaml
name: mynuxt
proxy:
  appserver:
    - mynuxt.lndo.site
services:
  appserver:
    type: node:10
    command: "yarn dev --hostname 0.0.0.0 --port 80"
    install_dependencies_as_me:
      - yarn install
tooling:
  yarn:
    service: appserver
  npm:
    service: appserver
  node:
    service: appserver
  nuxt:
    cmd: /app/node_modules/.bin/nuxt
    service: appserver

```

Once we start this app this `.lando.yml` config  gives us access to a Node
container and `node`, `yarn`, and `nuxt` cli tools. Similar to pulling in
Contenta with `composer` we'll pull in nuxt with `yarn`.



Start the app and pull in nuxt:

```bash
lando start
lando yarn create nuxt-app .
```

When running this command it will interactively prompt you for some options for
our `mynuxt` app. Be sure to select `axios` as we'll need that for our API calls.

This will pull in nuxt and the needed dependencies and will take a minute or
two. Once it completes restart the app:

```bash
lando restart
```

Now you should be able to visit: https://mynuxt.lndo.site and see something like
this:


<img style="width: 100%;" src="images/articles/headless-pt-1/mynuxt.png" alt="Screeenshot of Fresh Nuxt app"/>

Conclusion
----------

Now you've set up the Contenta CMS API and the Nuxt frontend app. In the next
post we'll walk through wiring up queries from the Nuxt app to the API site via
[axios](https://github.com/axios/axios). That is where the fun really begins! 🧜‍♂️

Read on in [Part 2](https://thinktandem.io/blog/2019/02/01/lando-contenta-cms-nuxt-pt-2/) making API requests from the `mynuxt` frontend to the `myapi` app.


Looking for more help getting your Lando setup? Subscribe to our
[YouTube channel](https://www.youtube.com/channel/UCl_QBNuGJNoo7yH-n18K7Kg) for
instructional videos, and/or find us on [slack](https://slackpass.io/kalabox).
