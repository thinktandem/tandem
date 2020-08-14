---
title: 'Running Legacy Versions of Drupal on Lando'
tags:
    - development
    - drupal
    - johno
author: 'John Ouellet'
date: '2019-09-10'
summary: 'This guide is how we got a Drupal 4.6 Site to run on Lando.  You can use this as a guide to run any legacy architecture as well.'
id: johno
pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33'
location: Florida
---

Use Case
--------

We had recently been contracted by a non-profit to migrate their legacy Drupal 4.6 site to [VuePress](https://vuepress.vuejs.org/).   Yes, you read that right, Drupal 4.6.  We needed to get the site setup in [Lando](https://lando.dev/) so that we could get the content out to use in the new static site.  However, the oldest recipe in Lando is the [Drupal 6 recipe](https://docs.lando.dev/config/drupal6.html).  On top of this, the oldest [PHP version](https://docs.lando.dev/config/php.html) that is "supported" is 5.3.  Finally, Lando only supports [MySQL versions 5 & 8](https://docs.lando.dev/config/mysql.html#supported-versions) out of the box.  Considering the [requirements for Drupal 4.6](https://api.drupal.org/api/drupal/INSTALL.txt/4.6.x) are of a time long forgotten, what are we to do? 

> With the constraints of recipes and versions in Lando, how do we get this legacy Drupal site to work?

The answer to our dilemea is to utilize a [custom compose service](https://docs.lando.dev/config/compose.html) in Lando.

What is the Compose Service in Lando?
------------------------------------

As the [documentation states](https://docs.lando.dev/config/compose.html#compose), this is a "catch all" service for something that does not exist in Lando.  This service basically allows us to utilize the [Docker Compose](https://docs.docker.com/compose/) architecture directly.  What this all means is we can use any docker image we want within Lando.  This opens the door to utilizing legacy versions of PHP, Apache, MySQL, etc.  So let's jump in and see how this all works.

Finding the right Docker Images
--------------------------------
  
Based on the requirements of Drupal 4.6, we knew we had to find a PHP 4.x and a MySQL 4.x image.  The easiest way to do this is to hop over to [https://hub.docker.com](https://hub.docker.com) and use their search bar.  I slapped "php4" into the search and filtered through the results until I came upon [this image](https://hub.docker.com/r/misryan/php4).  After looking at the [Dockerfile](https://hub.docker.com/r/misryan/php4/dockerfile) I could see that it it was a Debian based setup that utilized Apache and PHP 4.4.9.  A [Debian based](https://help.ubuntu.com/lts/installation-guide/s390x/ch01s02.html) container is a requirement for this to work easily in Lando.

> Originally when we tried to get this Drupal 4.6 site to work in Lando, we used a PHP 5.2 docker image.  It "worked" but the site did not render properly [due to this fun issue](https://www.drupal.org/forum/support/upgrading-drupal/2006-02-21/drupal-46-on-php5).

I then followed the same method to find a [MySQL 4 Image](https://hub.docker.com/r/tommi2day/mysql4) as well.  With the basic structure intact in theory, I can truck forward with hooking this all together.

Building the .lando.yml
------------------------

This site will not utilize any [recipes](https://docs.lando.dev/config/recipes.html#usage) that Lando comes with out of the box.  So that means all the usual config overrides do not apply here.  We are basically building our own legacy recipe to get this Drupal 4.6 site to run locally.  

Every compose service needs 3 keys to function properly: image, ports,  and command.  The image key is just the name of the docker image itself.  The port key is what port you want to expose.  The command key is the entrypoint for the docker image.  I will explain what that is a little more below.

**Setting up the appserver service**

I [git cloned](https://git-scm.com/docs/git-clone) the Drupal 4.6 site locally.  I created a basic version of the appserver in .lando.yml that looked like this:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
```

The command key for this is easy to pinpoint on this [Dockerfile](https://github.com/achih/docker-php4/blob/master/Dockerfile#L167).  It is just the concated version of the ENTRYPOINT command in the Dockerfile.  If a Dockerfile does not have a ENTRYPOINT defined then just use the CMD command.  The rest of this config is fairly straight forward to what I talked about before.

When we started this instance up, the appserver failed to start.  After running ```lando logs -s appserver```  I could see that it was trying to use ```/var/www/html``` as the app root.  Lando uses ```/app``` for all the things and so we need to fix this.  I also noticed the [vhost file](https://github.com/achih/docker-php4/blob/master/apache/000-default) was not really Drupal compatible.  Luckily, we can just map our own vhost file via volumes in the setup.  

To do this, I changed the .lando.yml to this:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default
```

The vhost file I added to ```./lando/apache``` looked like this:

```bash
<VirtualHost *:80>
  ServerAdmin webmaster@localhost

  DocumentRoot /app
  <Directory /app>
    Options +FollowSymLinks
    AllowOverride All
    order allow,deny
    allow from all
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/error.log

  # Possible values include: debug, info, notice, warn, error, crit,
  # alert, emerg.
  LogLevel warn

  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Finally, to see where this should be mapped, I noticed [this COPY command](https://github.com/achih/docker-php4/blob/master/Dockerfile#L163) instruction of the Dockerfile.  When I rebuilt the lando app, it started!  However, when I went to the localhost url, I got a 500 apache error.  After running ```lando ssh -s appserver -u root``` I then ran ```cd /var/log``` and looked at the apache error logs.  I could see that the site did not have rewrites enabled and the .htaccess of my Drupal 4.6 site needed it.

Luckily, lando has [build steps](https://docs.lando.dev/config/services.html#build-steps) for services that will allow me to enable the packages I need when this app starts up.  I the build_as_root step into my .lando.yml:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default
```

So after a rebuild, this appserver is working.  I get missing database like error on the screen and I know I must setup the DB service now.

**Setting up the database service**

Using my knowledge from the previous steps, I went ahead and built the database service as follows:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      environment:
        MYSQL_ROOT_PASSWORD: mysql4
```

As mentioned before, I used the ENTRYPOINT form the [Dockerfile](https://github.com/Tommi2Day/mysql4/blob/master/Dockerfile#L36) to allow the compose service to start this up.  When I rebuilt the lando app, the database service did start, so that was great.  

I ran ```lando ssh -s database``` and then tried to utilize the mysqladmin command to create a database.  I got a weird MySQL error and after some Google-fu, I figured out that the volume mount was only owned by root which cause the command to fail.  So we needed to change that.  Using the build steps from before I did the following to the .lando.yml:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    run_as_root:
      - chown -R mysql:mysql /db
    build:
      - mysqladmin -u root -pmysql4 create database | true
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      environment:
        MYSQL_ROOT_PASSWORD: mysql4
```

I changed the ownership of the volume mount after the database had started to allow the service to work properly.  I also threw the database creation in the config as well.  I piped in true to basically tell lando to keep trucking ahead even if it tries to create this table again if it exists on rebuild or restart.  I am also using the default root username and passwords provided by the docker image to make life easier.

All I need to do now is to import this database backup I have into this service.  I could just always do this via the command line, or have lando do it for me via its powerful [tooling](https://docs.lando.dev/config/tooling.html) setup.  My DB file is aptly named DB.sql and I just need to import it via the usual MySQL import command.  Here is the .lando.yml config with some tooling commands:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    run_as_root:
      - chown -R mysql:mysql /db
    build:
      - mysqladmin -u root -pmysql4 create database | true
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      environment:
        MYSQL_ROOT_PASSWORD: mysql4

tooling:
  php:
    service: appserver
  mysql:
    service: database
    cmd: mysql -u root -pmysql4 database
  db-import:
    service: database
    cmd: mysql -u root -pmysql4 database < /app/DB.sql
```

What I did here was create toolings to run php commands like ```lando php --version```.  I also create a way to drop into the database easily with ```lando mysql```.  Finally, I added the tooling needed to import my database via ```lando db-import```.  Obviously the biggest fallback of the last command is the backup will always need to be called DB.sql.  I can let that slide for now since we just need to get this rolling.

When I run the ```lando db-import``` command, the database goes in successfully.  I double check by running ```lando mysql``` and ```SHOW TABLES``` when I am in the mysql shell.  I also change the db connection string in settings.php to the following: ```$db_url = 'mysql://root:mysql4@database/database';```.  

The should allow Drupal 4.6 to connect to the database.  When I go to the localhost url, I get this fun error:

```bash
Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

Fun times.  So after more Google-fu, I come across this [handy article](https://www.digitalpeer.com/blog/mysql).  Since I am using a MySQL 4.1.25 instance with PHP 4.x, I need to run a few commands on the database to make it all work per that article.  I hook that up like so:

```yaml
name: legacy-drupal

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    run_as_root:
      - chown -R mysql:mysql /db
    build_as_root:
      - mysql -u root -pmysql4 -e "UPDATE mysql.user SET password=OLD_PASSWORD('mysql4') WHERE USER='root'"
      - mysql -u root -pmysql4 -e "FLUSH privileges"
    build:
      - mysqladmin -u root -pmysql4 create database | true
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      environment:
        MYSQL_ROOT_PASSWORD: mysql4

tooling:
  php:
    service: appserver
  mysql:
    service: database
    cmd: mysql -u root -pmysql4 database
  db-import:
    service: database
    cmd: mysql -u root -pmysql4 database < /app/DB.sql
```

I go ahead and rebuild and then visit my localhost url and it is working!  Probably one of the few times a 15 year old Drupal site got setup on a modern docker based localhost.

Final Touchups
---------------

Now that this is all working, I wanted to have a clean url to visit every time I use this site locally.  I also found on rebuild, the database can get nuked.  So, to fix this, here is the **FINAL** version of my .lando.yml:

```yaml
name: legacy-drupal

proxy:
  appserver:
    - legacy-drupal.lndo.site

services:
  appserver:
    type: compose
    build_as_root:
      - a2enmod rewrite
    services:
      image: misryan/php4
      command: /usr/sbin/apache2ctl -D FOREGROUND
      ports:
        - '80'
      volumes:
        - ./lando/apache/000-default:/etc/apache2/sites-enabled/000-default

  database:
    type: compose
    run_as_root:
      - chown -R mysql:mysql /db
    build_as_root:
      - mysql -u root -pmysql4 -e "UPDATE mysql.user SET password=OLD_PASSWORD('mysql4') WHERE USER='root'"
      - mysql -u root -pmysql4 -e "FLUSH privileges"
    build:
      - mysqladmin -u root -pmysql4 create database | true
    services:
      image: tommi2day/mysql4
      command: /root/start.sh mysqld_safe
      ports:
        - '3306'
      volumes:
        - data_database:/db
      environment:
        MYSQL_ROOT_PASSWORD: mysql4

tooling:
  php:
    service: appserver
  mysql:
    service: database
    cmd: mysql -u root -pmysql4 database
  db-import:
    service: database
    cmd: mysql -u root -pmysql4 database < /app/DB.sql
```

I utilized the [proxy](https://docs.lando.dev/config/proxy.html) tooling within Lando to give me a consistent clean url when using this locally.  I also mapped a lando volume to the database volume defined in the Dockerfile.  I figured this part out by going to ~/.lando/compose/legacydrupal and looking at each of the database yml files in there.  

Finally, a big thanks to Mike Pirog, creator of Lando and our CTO for helping me get this setup.  

Conclusion
-----------

Lando is the #1 local development solution in Drupal and you can see why with this post.  We can easily spin up any version of PHP, MySQL, etc with not too much effort.  You can use this guide to create any type of service within Lando as well.  It is pretty cool to run something locally that very few servers can these days.

If you need help with your Lando setup, [Contact Tandem](/contact) today!