---
title: 'Drupal 6 LTS + PHP 7 + Platform.sh'
tags:
    - development
    - support
    - drupal
    - johno
author: 'John Ouellet'
date: '2019-01-22'
summary: 'A quick and easy guide to getting Drupal 6 sites on a stable and secure platform'
id: johno
pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33'
location: Florida
---

Why are we writing about this?
-------------------

Drupal 6 reached end of life on February 24th, 2016.  This means that your Drupal 6 site is no longer receiving security updates, all its modules are now marked unsupported, and all support requests will no longer be responded to.  The problem is that there are still well over 50,000 Drupal 6 sites out there at the time of this blog post.  Smaller organizations may not have the budget to make a major CMS upgrade / migration and have to maintain what they have.  So these sites still need to be kept up to date and safe from any potential hacks.  We have helped a handful of Drupal 6 sites remain secure and it is not that difficult to do.

Drupal 6 Long Term Support
------------------

Fortunately, there are a handful of companies and individuals who are maintaining Drupal 6 core and some modules on their own.  [You can read more about these companies and what they are doing to help out](https://www.drupal.org/project/d6lts).  There is also a [GitHub project page](https://github.com/d6lts) that has not only a LTS version of Drupal 6 core, but other contrib modules that are maintained as well.

These efforts have also let Drupal 6 become compatible with PHP 7.1+.  This is another huge help since PHP 5 and PHP 7.0 just became unsupported on Jan 1, 2019.  You can easily get Drupal 6 working on PHP 7.1 and soon 7.2 as well.  This helps extend the life of your Drupal 6 site for some time.  

As of right now, it seems most of the individuals will be maintaining Drupal 6 LTS until February 2020.  This could change, but this gives you at least another year of security and other maintenance patches for your Drupal 6 site.

Setup your site
-----------------------

#### Migrating To Platform.sh

We chose [platform.sh](https://platform.sh/) to move the Drupal 6 sites we maintain. This is largely due to the fact that our other go-to hosting provider, [Pantheon](https://pantheon.io/) only allows certain vendors to spin up new Drupal 6 sites.  If you have moved a vanilla Drupal site to platform.sh before, the process is pretty much the same.  

We usually like to hook all our platform sites up to github as they are easier to maintain.  Once you have your Drupal 6 site in github, we need to add a couple files to the repo.

1. in the project root, add your .platform.app.yaml file with the following in it:

```yaml
name: drupal6
type: 'php:5.6'

build:
    flavor: drupal

dependencies:
    php:
        "drush/drush": "^8.0"

relationships:
    database: "mysql:mysql"

web:
    locations:
        '/':
            root: ''
            expires: 5m
            passthru: '/index.php'
            allow: false
            rules:
                '\.(jpe?g|png|gif|svgz?|css|js|map|ico|bmp|eot|woff2?|otf|ttf)$':
                    allow: true
                '^/robots\.txt$':
                    allow: true
                '^/sitemap\.xml$':
                    allow: true

        '/sites/default/files':
            allow: true
            expires: 5m
            passthru: '/index.php'
            root: 'sites/default/files'
            scripts: false
            rules:
                '^/sites/default/files/(css|js)':
                    expires: 2w

disk: 2048

mounts:
    '/sites/default/files': 'shared:files/files'
    '/tmp': 'shared:files/tmp'
    '/private': 'shared:files/private'
    '/drush-backups': 'shared:files/drush-backups'

hooks:
    deploy: |
      drush -y updatedb

crons:
    drupal:
        spec: '*/20 * * * *'
        cmd: 'drush core-cron'

```

2. Create a .platform folder in your project root and add a file called services.yaml to that folder with this in it:

```yaml
mysql:
    type: mysql:10.0
    disk: 2048
```

3. Create a routes.yaml file in the .platform folder and add the following in it:

```yaml
"http://{default}/":
    type: upstream
    upstream: "drupal6:http"

"http://www.{default}/":
    type: redirect
    to: "http://{default}/"
```

Push those files up and that gives you everything you need to get your platform instance going.  Notice that I used an older version of MariaDB (MySQL) in my setup.  I have had an issue or two with some Drupal 6 sites on newer versions of MariaDB.  With platform.sh, you can't downgrade your MariaDB, so it is best to test locally before changing this to a newer version.  

Go ahead and spin up your platform.sh and follow the directions to add the code to their repo.  Once the site is spun up, go ahead and run this command to link github to platform.sh:

```bash
platform integration:add \
  --type=github \
  --project=PROJECT_ID \
  --token=GITHUB-USER-TOKEN \
  --repository=USER/REPOSITORY \
  --build-pull-requests=true \
  --fetch-branches=true
```

The [doc by platform.sh](https://docs.platform.sh/administration/integrations/github.html) explains all the flags in this command and what you need to add to the command above.  Once that is done, remove your platform.sh remote and just push to github from now one.

The last thing we need to do is add our DB connection strings to our settings.php.  Throw this at the bottom of your settings.php:

```php
if (!empty($_ENV['PLATFORM_RELATIONSHIPS'])) {
  $db_url = 'mysql://user@database.internal/main';
  $db_prefix = '';
}
```

You should now have a working Drupal 6 site on platform.sh!  Just move your DB and files up and import like any other hosting provider.  

#### Updating Drupal 6 Core and Modules to the Long Term Support Versions.

This next part is the longest and most tedious of this process.  It isn't overly difficult, just more time consuming than anything.  So grab a snack and let's get this done..

First we need to update the core of your Drupal 6 site.  Doing this is fairly straight forward if your core isn't hacked up.  Just go to the root of your project in your CLI and run the following:

```bash
git pull -Xtheirs git@github.com:d6lts/drupal.git --allow-unrelated-histories
```

This will get the core of your Drupal 6 site up to the latest and greatest Drupal 6 LTS version.  You may some some merge conflicts, so just follow normal merge conflict procedures and add those files to your repo.  The most common issues we come across all involve image file conflicts in core.  Those are just resolved by just running a ```git add -A``` and committing the changes.  

The next part is the most manual out of all of this.  We need to update all our modules to their last drupal.org version or the Drupal 6 LTS version.  You can no longer run ```drush up``` in Drupal 6 site as all modules are deemed unsupported now.  What you can do is ```drush dl``` on your code base to get the last Drupal 6 version of a module.  You can blindly go in and grab all your modules names and use some text manipulation to download all your modules at once.  However that is a little cowboy and can cause you more pain.  

I like to update a handful of modules at a time and check the site to make sure everything is ok.  Usually, I either check the module install page to see what version the module is on and sometimes the .info a module as well.  I then check the Drupal 6 LTS repo by using the machine name of the module in the url like: ```https://github.com/d6lts/MODULE_NAME```.  I then check the drupal.org release page doing the same: ```https://www.drupal.org/project/MODULE_NAME/releases?api_version%5B%5D=87``` . Obviously change the MODULE_NAME to the machine name of your modules.  This does take some time, but once it is done, you won't have to do this very often again.

You should now have your site to the latest Drupal 6 LTS versions and you are not only secure, but you can go to a higher version of PHP now.

#### Upgrading to PHP 7.1

The next part usually is pretty quick if you updated all your modules to their LTS versions.  However, sometimes there is a module or two that haven't been patched yet for PHP 7.  Just Google your errors are usually you can pinpoint how to fix these issues really quickly.  

Also, you need to change the MySQL connection strings to use MySQLi as the Drupal 6 MySQL connections strings are no longer functional in PHP 7.  Go into your settings.php and change all of your MySQL string from:


```php
$db_url = 'mysql://user@database.internal/main';
```

To this:

```php
$db_url = 'mysqli://user@database.internal/main';
```

We use [lando](https://github.com/lando/lando) for all our local development, so changing the PHP version is quick and easy.  Most modern localdev solutions allow the same thing.  So, go ahead and bump the php version in your localhost to 7.1.  Test out your site locally and address any issues.  Once that is done, go ahead and just the PHP version in your .platform.app.yaml as well.  That is it basically, your site should be on PHP 7.1 and running fast and happy.

Conclusion
-----------

Keeping your Drupal 6 site maintainable and up to date is crucial if you can not upgrade any time in the near future. By following this guide, you can quickly and easily spin up your site on a reliable and secure host while keeping your Drupal 6 site on the latest and greatest support versions. If you're having trouble or need backup, just let us know - we're here to help.