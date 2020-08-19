---
title: "Lando Migration Webinar Part 1 Followup"
tags:
    - development
    - drupal
    - localdev
    - devops
    - migration
    - johno
author: "John Ouellet"
date: "2020-04-28"
summary: "This webinar shows how to setup and debug a Drupal 8/9 Migration with Lando."
id: johno
pic: "https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33"
location: Florida
---

## Recap

Thank you for everyone who attended our first webinar.  We are extremely appreciative that you decided to spend a Friday afternoon with us.  For those of you who missed it, here is the [YouTube video](https://www.youtube.com/watch?v=C1lhgObpHd8) of the webinar:

<iframe width="750" height="422" src="https://www.youtube.com/embed/C1lhgObpHd8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I also made the [slidedeck](https://docs.google.com/presentation/d/1bEbg0I-lumlvWrjZqMhrtHMgwkLEbi8uB2fBjHFCGFE/edit?usp=sharing) public if you wanted to check those out.  The full repo I used during the webinar is [available on GitHub as well](https://github.com/thinktandem/migration-webinar/tree/webinar-1-final).  Finally, [the boilerplate module](https://github.com/thinktandem/migration_boilerplate) is also available.

Here is a brief overview what was discussed with relevant samples and links per section.

### Setting up a 2nd DB container

In the first part of the webinar, I showed everyone how to setup a 2nd database container in your Lando.  This is so you can run your Drupal 8/9 migrations locally.  Here is the configuration needed to get that going:

**.lando.yml**

```yaml
name: migration-webinar

excludes:
  - drush
  - scripts
  - vendor
  - web/core
  - web/modules/contrib
  - web/profiles/contrib
  - web/sites/default/files
  - web/themes/contrib

recipe: drupal8

config:
  via: nginx
  webroot: web
  php: 7.3
  database: mariadb
  xdebug: false

services:
  d7db:
    type: mariadb
    creds:
      user: drupal7db
      password: drupal7db
      database: drupal7db
    portforward: true
```  

**settings.local.php**

```php
$databases['migrate']['default'] = [
  'database' => 'drupal7db',
  'username' => 'drupal7db',
  'password' => 'drupal7db',
  'prefix' => '',
  'host' => 'd7db',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];
```

Finally, to import the second database with lando, run: ```lando db-import --host=d7db --user=drupal7db dump.sql.gz```.  That's it, you should now have your Drupal 7 database locally andd ready to run migrations.

## Drupal 8/9 Migration Modules to use

In this section, I went over the main modules I use to do migrations.  They were as follows:

**Drupal Core’s Migrate & Migrate Drupal**

Contains all the base functionality & plugins needed for the migration.  You technically only need these two modules, but your life would be exponentially easier if you used all the modules I suggest.

**[Migrate Plus](https://www.drupal.org/project/migrate_plus)**

Adds a lot of widely used plugins, makes migrations config entities, and allows grouping of configs.  This is by far the most useful out of all the contrib modules for migrations.

**[Migrate Tools](https://www.drupal.org/project/migrate_tools)**

Gives you the drush commands needed to run a migration via the CLI.

**[Migrate Upgrade](https://www.drupal.org/project/migrate_upgrade)**

Give you the drush migrate-upgrade command needed to get your initial config over.  You really only use this module one time and then you are done.

## Obtaining the config for the migration

In this section we learned about the config and how to get it out of the Drupal 7 site.  I also had the migration boilerplate enabled by this point.  The steps to obtain the config from your Drupal 7 site are as follows:

```bash
lando drush migrate-upgrade --legacy-db-key=migrate --configure-only
lando drush config-export --destination=/tmp/migrate
lando ssh -s appserver -u root
cp /tmp/migrate/migrate_plus.* /app/path/to/migration_boilerplate/unused_config
chown -R www-data:www-data /app/path/to/migration_boilerplate/unused_config
```

This will get us all the config for our migration.  This also puts all the migration config in active storage within config management.  Since we will be cherry picking our specific items, you will need to nuke your active config with ```lando drush cim -y```.

### Drush commands

In this section, I went over the various drush commands I use on a regular basis.  They are as follows:

**drush ms**

This command lists our all your migrations.  You can use this to see what has been run.  Make sure to slap on the --tag="Drupal 7" flag so you don't get all those red errors from Drupal 6 configs.

**drush mim config_name**

This command allows you to import your migrations based on the config name.  You can also use the --group flag as well to run items within your migration groups all at once.

**drush mr config_name**

This command allows you to rollback your migrations based on the config name.  You can also use the --group flag here as well.

**drush mrs config_name**

This command resets a migration status back to idle.  This is commonly used when a migration has become stuck.  

**drush mmsg config_name**

This is used to display the migration message when a migration fails.  You can also use this as a debugging method via the MigrationSkipRow class and custom messages.

## Debugging Migration with XDebug

This final part I should you how to setup XDebug in PHPStorm, debugging via the UI, and debugging via PHPStorm's console.  It is best to watch through the video, because this is the heftier part of the webinar.  

Here are some quick takeaways from this part:

### If your XDebug session does not start

Check to make sure that XDebug is in your CLI Interpretor.  If it is not, then do the following:

```bash
lando ssh -s appserver -u root
cat /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
```
Then add the output of the cat command to the Debugger extension in the CLI Interpretor.  Hit Apply, then the refresh button next to the PHP executable.  The XDebug version should now be there.  Hit apply and OK and you will be good to go.

### Enabling XDebug via the CLI

To enable XDebug for drush, go into your PHPStorm settings.  Look under Languages, PHP, Server and grab the name of your server.  It should be localhost, if not make note regardless.  Use that to put this part in the services key of your .lando.yml

```yaml
services:
  appserver:
    overrides:
      environment:
        PHP_IDE_CONFIG: "serverName=localhost"
```

Do a lando rebuild, and you should be ready to debug via your PHPStorm's console section.

## Wrap Up

I am very glad that you decided to attend this webinar.  As I mentioned I have written numerous other migration blog posts over the years.  For easy reference, here is the complete list:

- [Migrating a Drupal 7 Body Field to a Drupal 8 Paragraph](https://thinktandem.io/blog/2018/02/08/migrating-a-drupal-7-body-field-to-a-drupal-8-paragraph/)
- [Migrating to a Drupal 8 Date Range](https://thinktandem.io/blog/2018/02/27/migrating-to-a-drupal-8-date-range/)
- [Migrating Drupal 7 Organic Groups to Drupal 8 Group](https://thinktandem.io/blog/2018/03/30/migrating-drupal-7-organic-groups-to-drupal-8-group/)
- [Handling Post Migration Events in Drupal 8](https://thinktandem.io/blog/2018/04/20/handling-post-migration-events-in-drupal-8/)
- [Changing a Content Type Name During a Drupal 8 Migration](https://thinktandem.io/blog/2018/07/18/changing-a-content-type-name-during-a-drupal-8-migration/)
- [Writing a Custom Drupal 8 Module Upgrade Path](https://thinktandem.io/blog/2018/07/24/writing-a-custom-drupal-8-module-upgrade-path/)
- [Writing a Drupal 8 Table to Table Migration Path](https://thinktandem.io/blog/2019/03/22/writing-a-drupal-8-table-to-table-migration-path/)
- [Migrating a Drupal 7 File To a Drupal 8 Media Entity](https://thinktandem.io/blog/2019/04/04/migrating-a-drupal-7-file-to-a-drupal-8-media-entity/)
- [Migrating a Drupal 7 AddressField To a Drupal 8 Address](https://thinktandem.io/blog/2019/07/17/migrating-a-drupal-7-addressfield-to-a-drupal-8-address/)
- [Migrating a Drupal 8 Multisite to a Standalone Drupal 8 Site](https://thinktandem.io/blog/2020/03/12/migrating-a-drupal-8-multisite-to-a-standalone-drupal-8-site/)

Our next webinar will be held on May 8, 2020; [sign up here to attend](https://us02web.zoom.us/webinar/register/WN_xWFjNrQtTNK2ZeAMu6ePmw).  I will be diving into Source, Process and Destination plugins in great detail.  I will also be showing you how to handle some of the usual cases of complex data transformations as well.  

In the interim, if your organization has any questions with a migration you are performing, please fill out the form below so we can chat more.
