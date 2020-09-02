---
title: "Apache Tika on Platform.sh"
tags:
    - development
    - devops
    - drupal
    - serundeputy
author: "Geoff St. Pierre"
date: "2017-11-10"
summary: "Apache Tika allows you to index PDF docs for searching with Solr."
id: serundeputy
pic: "/images/people/gff-sm.jpg"
location: Massachusetts
---

Apache Tika on Platform.sh
--------------------------

[Apache Tika](https://tika.apache.org/) is a java library that can extract metadata from documents such as PDF and create a searchable index for [Solr](http://lucene.apache.org/solr/).

In this tutorial we will set up `Drupal 8`, `Apache Solr`, `Search API Solr`, and `Apache Tika` on [Platform.sh](https://platform.sh).

tl;dr: Working example: [platform-tika](https://github.com/thinktandem/platform-tika)

Drupal 8 + Solr
---------------

Install Drupal 8 on Platform.sh. Getting the search modules: the full documentation for setting up Solr and Drupal 8 can be found here: [Using Solr with Drupal 8.x](https://docs.platform.sh/frameworks/drupal8/solr.html). I won't replicate that excellent documentation here but the quick and dirty of it is you need to install and configure `search_api` and `search_api_solr`:

```bash
composer require drupal/search_api
composer require drupal/search_api_solr
```

Search API Attachments
----------------------

The additional piece that you need for `tika` is the `search_api_attachments` module.

```bash
composer require drupal/search_api_attachments
```

Search API Attachments lets you point at the `tika` jar file to index your PDF documents. Before we can point at the jar file we have to grab and install it on Platform.sh project instance.

Getting the Tika jar on Platform.sh
-----------------------------------

Platform offers two `hooks` where you can manipulate your app at two stages of the deploy `build` and `deploy`.  The difference is that `build` is run while the file system is still writable and `deploy` runs after the container is started and the file system is frozen as read only. You can read the full docs on hooks here: [Platform Hooks](https://docs.platform.sh/configuration/app/build.html#hooks).

We will use the `build` hook to bring in the Tika jar file while we can still write to the file system. Open your `.platform.app.yaml` file and either add a new `build` hook or add to it if you already have one:

```yaml
# The hooks executed at various points in the lifecycle of the application.
hooks:
    build: |
      mkdir -p /app/srv/bin
      cd /app/srv/bin && curl -OL http://download.nextag.com/apache/tika/tika-app-1.16.jar
```

This creates the directory `/srv/bin` and downloads the tika jar executable `tika-app-1.16.jar` into it. Here is the full file for reference: [.platform.app.yaml](https://github.com/thinktandem/platform-tika/blob/master/.platform.app.yaml).

Configure Search API Attachments
--------------------------------

Now that we have the `tika-app-1.16.jar` file in place we are ready to configure the `search_api_attachments` module. Visit `/admin/config/search/search_api_attachments` in your browser and add the method, java executable, and tika paths configuration:

<img src="/images/articles/tika/tika-config.jpg" alt="Search API Configuration Screen" />

These paths correspond to the paths you entered in the `.platform.app.yaml` file for the `build` step.

Adding Tika to Lando
--------------------

You can add `tika` to [Lando](https://docs.devwithlando.io) in a similar fashion. Open up your `.lando.yml` file and add the following `extras` step to Install `tika`:

```yaml
services:
  appserver:
    extras:
      # Apache Tika
      - apt-get update -y
      - apt-get install -y openjdk-7-jre-headless
      - apt-get install -y openjdk-7-jdk
      - mkdir -p /app/srv/bin && cd /app/srv/bin
      - cd /app/srv/bin && curl -OL http://download.nextag.com/apache/tika/tika-app-1.16.jar
      - apt-get remove openjdk-7-jdk -y
```

Here is the full file for reference: [.lando.yml](https://github.com/thinktandem/platform-tika/blob/master/.lando.yml).

Conclusion
----------

Voila! Now you have all the power of `tika` to index and search your docs and a local dev stack to match and test on! Happy searching 🔍🕵🔎.
