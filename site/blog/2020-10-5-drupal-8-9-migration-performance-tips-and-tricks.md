---
title: "Drupal 8/9 Migration Performance Tip and Tricks"
tags:
  - development
  - drupal
  - migrations
  - php
  - johno
author: "John Ouellet"
date: "2020-10-05"
summary: "Here are some pointers to make your Drupal 8/9 Migration run quicker and efficiently."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

## Overview

I am in the midst of migrating a very large Drupal 7 site to Drupal 8.  The site has hundreds of thousands of nodes and I kept hitting bottlenecks while migrating the site.  My migration processes would slow to an almost stop and it was very frustrating.  We have migrated a lot of sites over the years and never had issues like this.  

After some research and a little elbow grease, the migration runs smoother and exponentially faster.  It was fairly easy to get these items hooked up.  Here is what I recommend you do:

## Migrate Booster Module

When we would migrate Drupal 6 sites to Drupal 7, we used to be able to disable hooks via the [disable_hooks key in your hook_migrate_api()](https://www.drupal.org/node/2136601) declaration.  Unfortunately that type of functionality was not ported To Drupal 8/9.  However, I did find a [sandbox module](https://www.drupal.org/sandbox/onkeltem/2828817) that can do pretty much the same thing for us. 

The Migrate Booster module hadn't been touched in several years, but contained the functionality we needed.  I [ported the repo to our own GitHub](https://github.com/thinktandem/migrate_booster), applied a patch, and then cleaned up the code some.  I also [offered to maintain the project](https://www.drupal.org/project/2828817/issues/3152461#comment-13845607) on drupal.org as well since it hadn't been updated in so long.

The site we were migrating data back and forth to was almost fully built.  There were a lot of modules enabled that were hindering our performance.  Some of the biggest culprits with migrations are any modules that delete or add entities on node delete or save.   When we are migrating a site, or testing a migration, there really is no need for this functionality most of the time.  A lot of these modules have mechanisms to update themselves via cron.  

So, after enabling the Migrate Booster module, I added this to my settings.php:

```php
// Migrate boost settings.
$config['migrate_booster.settings']['modules'] = [
  'admin_toolbar_tools',
  'autosave_form',
  'pathauto',
  'search_api',
  'search_api_solr',
  'xmlsitemap',
];
```

Pathauto and Search API are notorious for being resource hogs during a migration.  Since our site was already setup, we just couldn't uninstall the modules.  Instead, we can just disable them during our migrations when we run them via drush.  This alone gave me an enormous performance boost when running my migration commands.

I added the other modules by searching through my contrib folder for modules with the docblock that contained ```Implements hook_entity_```.  I looked at each hook's functionality and added the modules to the settings array as needed.  

This module alone solved a good chunk of my performance issues.  Keep in mind, this module is only relevant if you are running your migrations via drush.  

## Database Tweaks

While doing my research on migration performance; I came across [this article on database performance during a migration](https://www.drupal.org/node/1994584).  It looks like it is written for Drupal 7, but some of the tips still apply.  Since I do work at Tandem, we are the makers of [Lando](https://lando.dev/).  I use Lando to win all my migrations.  It is much easier to test things locally than on a server in general, especially with migrations. 

After reading through that article, I added a custom MariaDB config to my .lando.yml to adjust some of the settings.  After looking through all the variables manually, here is the custom config I came up with:

```bash
[mysqld]
max_allowed_packet=32M
query_cache_size=128M
join_buffer_size=4M
tmp_table_size=92M
max_heap_table_size=92M
sort_buffer_size=4M
```

A slimmed down version of the Lando file:

```yml
name: the-site
recipe: drupal8
config:
  via: nginx
  database: mariadb:10.4
  webroot: web

services:
  database:
    type: mariadb:10.4
    config:
      database: config/my-custom.cnf
  d7db:
    type: mariadb:10.4
    config:
      database: config/my-custom.cnf
    creds:
      user: drupal7db
      password: drupal7db
      database: drupal7db
    portforward: true
```

This in turn will make our databases perform more efficiently while running a large dataset during a Drupal 8/9 Migration.

## Batching the Migration

If you have ever had a migration that runs of of memory, then keep reading.  In the [SqlBase](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21source%21SqlBase.php/class/SqlBase/8.4.x) class of the core migration module, there is some functionality that can be triggered by setting the ```batch_size``` key in your migration yamls.  This is very useful if you are running your migration on an older laptop or a server with not a ton of memory installed.  Just slap the following to your migration yamls:

```yaml
source:
  plugin: d7_node
  node_type: stuff
  batch_size: 1000
```

Pretty easy and very effective to use.

## Other Tips and Tricks

### Updates

Your site should be updated to the latest versions of core and contrib modules at all times.  The code base of Drupal is constantly getting added to.  By keeping your site up to date, you could be increasing the performance without even realizing it.  It also enables you to easily add patches to your code base that could contain the performance tweaks you need.

### Running in a Script with the --limit flag

If you are having a lot of memory issues, then I recommend creating a bash script and loop your migrations through ith with the --limit flag on your migration. The fine people's over at Chromatiq [created a gist](https://gist.github.com/adamzimmermann/e0f730425d0876991f1891a02bf372a4) that contains a good bash script already.  You can use that and tweak it to your needs.

### Run Migration in Drush

While the UI can be nice for smaller sites, there really is no need to use it from my experience.  Running all your migration via drush allows you to do so much more.  It is also much more performant since you are just doing everything right at the server level.

## Conclusion

It is super frustrating when a migration is slow and you can't do your work properly.  I hope these tips and trick will help you win at a higher level.  If you need help with your migrations, please reach out, we love helping people out.
