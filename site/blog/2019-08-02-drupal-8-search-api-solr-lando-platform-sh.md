---
title: "Drupal 8 Search API Solr + Lando + Platform.sh"
tags:
    - development
    - drupal
    - johno
author: "John Ouellet"
date: "2019-08-02"
summary: "Setting up Solr is quick and fairly painless with Lando. This guide shall bring you to the promise land."
id: johno
pic: "https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33"
location: Florida
---

Why Use Solr?
-------------

We have a large enterprise client that has a tens of thousands of nodes.  We originally setup the site to use [Search API](https://www.drupal.org/project/search_api) via the database.  This worked but it was painfully slow on most searches.  I knew that we had to use a different solution due to this.  We had setup [Solr](https://lucene.apache.org/solr/) numerous times in the past on other sites.   [This issue on drupal.org](https://www.drupal.org/project/search_api/issues/3023662#comment-12925818) also cemented the idea to switch to Solr.  If you need large performance gains and have a humongous search index, then Solr is the way to go.

Getting your Drupal 8 site ready
-------------------------------

So we will need 2 modules to win the task at hand: [Search API](https://www.drupal.org/project/search_api) and [Search API Solr](https://www.drupal.org/project/search_api_solr).  You can install them the usual way with in lando via:

```bash
lando composer composer require 'drupal/search_api_solr:^3.2' 'drupal/search_api:^1.14'
```

Then install the modules with:

```bash
lando drush en search_api search_api_solr -y
```

If you want to install the Search API Views module, you can do that as well.

Configuring Lando for Solr
-----------------------

Lando comes with the ability to have a [Solr service](https://docs.devwithlando.io/tutorials/solr.html) out of the box.  It is just one of the many services that Lando comes with.  So what we are going ot do in a nutshell is setup the service and also setup a proxy url so we can see our Solr instance.  We are also going to point the config of our Solr service to Drupal 8 Search API Solr config.  Your lando.yml will look something like this:

```yaml
name: trill
recipe: drupal8
proxy:
  search:
    - search.trill.lndo.site:8983
services:
  search:
    type: solr:6.6
    portforward: true
    core: drupal8
    config:
      dir: web/modules/contrib/search_api_solr/solr-conf-templates/6.x

```

What this all means is that we are using Solr 6.6 (platform.sh recommends this and we will get into that later), we are [forwarding our ports](https://docs.devwithlando.io/tutorials/solr.html#portforwarding) externally, setting our Solr core, and finally pointing to the drupal config.  We also exposed the service to a url that we can throw into our browser to monitor the service with.  This is useful to check the Solr logs, config, etc.  Run ```lando rebuild -y``` and you will be good to go.

This gets our basic setup, we will need to tweak this most likely in the next steps if Drupal tells us to.

Configuring Drupal 8 Search API
----------------------------

Setup a Search API server via admin/config/search/search-api as you normally would.  However, select Solr as the backend.  Then you will select Standard under Solr Connector.  Finally, put search as the Solr Host and drupal8 as the Solr Core.  The rest you can leave as is.  Your setup should look like this:

<img src="/images/articles/lando-solr/solr-settings.jpg" alt="Drupal 8 Search API Solr Settings" />

Once you hit save, you may see this message:

```bash
You are using an incompatible Solr schema. Please follow the instructions described in the INSTALL.md file for setting up Solr
```

If you get this message, then we need to use a different config then what is supplied by Search API Solr.  Click the config.zip button on the view page of your server.  We then need to slap this config in a folder so we can tell lando to use it.  Run the following: in the root of your project

```bash
mkdir -p config/solr-conf/6.x
```

Then from there, just unzip the config.zip file and slap it into the directory above.  We will then need to change our .lando.yml to this:

```yaml
name: trill
recipe: drupal8
proxy:
  search:
    - search.trill.lndo.site:8983
services:
  search:
    type: solr:6.6
    portforward: true
    core: drupal8
    config:
      dir: config/solr-conf/6.x
```

So another ```lando rebuild -y``` and this will resolve the message.  This will also allow your Solr instance to index items properly.  If you don't do this and ignore the message, you will have funky Solr errors and your search will not work right.

From here setup your index as you need.  If you created a view, then do what you need to there.

Configuring Solr for platform.sh
----------------------------

Platform.sh already has [great documentation on how to setup Solr for Drupal 8](https://docs.platform.sh/frameworks/drupal8/solr.html).  However, it needs some TLC and I let them know as well.  Go ahead and follow the whole guide and setup your platform files and config, etc.  

However we need to do some overrides to make this work on platform.sh. Side Note: to debug your Solr instance on platform.sh, just use the ```platform tunnel:open```.  Then throw whatever port onto the localhost url to see the service in your browser, i.e.: http://localhost:30001.

Here are the tweaks we need to do:

1. We need to change the return part of registerFormatter function in the config settings to the following:

```php
  return [
    'core' => 'maincore',
    'path' => '/',
    'host' => $solr['host'],
    'port' => $solr['port'],
  ];
```

2. If you had to use the config.zip when setting up lando.  Then copy all the files from config/solr-conf/6.x to .platform/solr-conf/6.x.  Then open up solcore.properties and remove the following lines from the end:

```bash
solr.install.dir=../../
solr.install.dir=/opt/solr
```

Push this up and you should be good to go.


Conclusion
-----------

Just a few steps to get a Solr server running on both Lando and platform.sh.  Solr is a great and alternative for sites that need the performance boost and scalability.  By jumping through a few hoops, we got this running fairly quickly and somewhat easily on our localdev and our hosting provider.  

If you need help setting up your Lando installiation or have questions about custom Lando config, [Contact Us](https://thinktandem.io/contact/) to chat more!