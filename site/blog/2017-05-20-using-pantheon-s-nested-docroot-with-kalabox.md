---
title: 'Using Pantheon''s Nested Docroot with Kalabox'
tags:
    - localdev
    - support
    - mikep
author: 'Mike Pirog'
date: '2017-05-20'
summary: 'Learn how to use composer-based workflows with your Pantheon site on Kalabox so you can dev like it''s 2017.'
id: mikep
pic: 'https://www.gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb'
location: 'New Hampshire'
---

Background
----------

If you haven't heard; composer-based build steps and workflows are all the php rage these days. Soon, taking the dive into the underlying build machinery other frameworks have been enjoying for (*cough*) years is no longer going to be for the brave and adventurous but for devs across the entire interwebs.

  > What took you guys so long?
  <small>Every other framework</small>

Best practices around these things are finally starting to converge and as such we are seeing platforms like [Pantheon](http://pantheon.io) add support for [nested docroots](https://pantheon.io/docs/nested-docroot/) and ancilliary tools such as Greg Anderson's amazing [terminus build tools plugin](https://github.com/pantheon-systems/terminus-build-tools-plugin).

All that said, you might be wondering how these new workflows fit into [Kalabox](http://kalabox.io). The answer is two-fold:

  1. Kalabox's not-yet-released-successor project [Lando](http://github.com/kalabox/lando) has support for nested webroots and composer build steps deep in its DNA.
  2. The rest of this post details how you can use nested docroot with the current 2.1.x version of Kalabox.

So, if you are interested in using nested docroot with your current version of Kalabox please read on!

### 1. Create your Pantheon site normally

Start by creating your Pantheon site on Kalabox normally.

If you are using another `git remote` as the canonical upstream (eg GitHub) now is the time to swap out the `code` directory's Pantheon upstream for your remote.

```bash
# Navigate to your Kalabox app
cd /path/to/app

# Remove everything in the code directory
# NOTE: make sure you remove hidden directories like .git
rm -rf code/*

# Add the canonical upstream
git clone git@myrepo.git code
```

### 2. Run any relevant build steps (optional)

If you are using `composer` to build out your nested docroot, you'll want to run that (and any other build steps like `npm install`).

```bash
# Navigate to your Kalabox app's code directory
cd /path/to/app/code

# Ensure composer can write to files directory
kbox . chmod 777 /media

# Install the composer deps
composer install

# Optionally run other build steps
npm install
gulp sassmebro
```

Once this step has completed you should be able to visit your site at `https://mysite.kbox.site/web` although don't get too excited because it's not full functional yet. Also note that it might take a few moments to sync all your build deps into Kalabox.

### 3. Move the webroot

You will need to apply the following changes relative to your Kalabox app's root directory. Please take note that your `nginx` config file may be different depending on the kind of site you pulled down. If you are unsure, check out the `framework` in your app's `kalabox.yml` file. For this example we are assuming a `drupal8` site.

These changes should not only get your site to load but will also allow built in commands like `kbox drush` to function correctly, push/pull operations to succeed and other webroot location specific tasks to succeed.

```diff
diff --git a/config/drush/aliases.drushrc.php b/config/drush/aliases.drushrc.php
index df65354..c2823ff 100644
--- a/config/drush/aliases.drushrc.php
+++ b/config/drush/aliases.drushrc.php
@@ -4,7 +4,7 @@
  */
 $aliases['kbox'] = array(
   'uri' => 'localhost',
-  'root' => '/code',
+  'root' => '/code/web',
   'databases' =>
     array (
       'default' =>

diff --git a/config/nginx/drupal8.conf b/config/nginx/drupal8.conf
index 4782b48..a6721d6 100644
--- a/config/nginx/drupal8.conf
+++ b/config/nginx/drupal8.conf
@@ -8,7 +8,7 @@ server {
   ssl_certificate_key       /certs/appserver.key;
   ssl_verify_client         off;

-  root /code;
+  root /code/web;
   index index.html index.htm index.php;
   port_in_redirect off;
   client_max_body_size 100M;
@@ -91,7 +91,7 @@ server {
       include fastcgi_params;
       # Allow SimpleSamlPHP to work by settig PATH_INFO, etc
       fastcgi_split_path_info ^(.+?\.php)(/.+)$;
-      fastcgi_param SCRIPT_FILENAME /code/$fastcgi_script_name;
+      fastcgi_param SCRIPT_FILENAME /code/web/$fastcgi_script_name;
       # Catch php-fpm timeout errors
       error_page 504 /504.html;
   }
@@ -104,7 +104,7 @@ server {
       include fastcgi_params;
       # Allow SimpleSamlPHP to work by settig PATH_INFO, etc
       fastcgi_split_path_info ^(.+?\.php)(/.+)$;
-      fastcgi_param SCRIPT_FILENAME /code/$fastcgi_script_name;
+      fastcgi_param SCRIPT_FILENAME /code/web/$fastcgi_script_name;
   }

   location ~ /\.ht {

diff --git a/config/php/www.conf b/config/php/www.conf
index 235a28e..65b4478 100644
--- a/config/php/www.conf
+++ b/config/php/www.conf
@@ -23,7 +23,7 @@ pm.max_requests = 100
 ; Chdir to this directory at the start.
 ; Note: relative path can be used.
 ; Default Value: current directory or / when chroot
-chdir = /code
+chdir = /code/web

 ; Set some pantheon thigns
 env['DOCROOT'] = $DOCROOT

diff --git a/config/scripts/ensure-git-dir.sh b/config/scripts/ensure-git-dir.sh
index 790d86f..19376fd 100755
--- a/config/scripts/ensure-git-dir.sh
+++ b/config/scripts/ensure-git-dir.sh
@@ -7,6 +7,6 @@ set -e
 : ${KALABOX_GID:='50'}

 # Set potentially rooted perms back to the correct owner
-if [ -f "/code/.git" ]; then
-  sudo chown $KALABOX_UID:$KALABOX_GID -R /code/.git
+if [ -f "/code/web/.git" ]; then
+  sudo chown $KALABOX_UID:$KALABOX_GID -R /code/web/.git
 fi

diff --git a/kalabox-compose.yml b/kalabox-compose.yml
index a053700..3eb2b4e 100644
--- a/kalabox-compose.yml
+++ b/kalabox-compose.yml
@@ -47,7 +47,7 @@ appserver:
     - data
   entrypoint: /src/config/scripts/php-fpm.sh
   command: --fpm-config /src/config/php/www.conf -c /src/config/php -d xdebug.remote_host=$KALABOX_ENGINE_REMOTE_IP
-  working_dir: /code
+  working_dir: /code/web
   links:
     - db:database
     - redis:redis

diff --git a/kalabox.yml b/kalabox.yml
index cdc4fae..4ee2f03 100755
--- a/kalabox.yml
+++ b/kalabox.yml
@@ -7,7 +7,7 @@ pluginconfig:
   sharing:
     share: 'data:/code'
     ignore:
-      - Name sites/default/files
+      - Name web/sites/default/files
   services:
     web:
       - port: 80/tcp

diff --git a/plugins/kalabox-plugin-pantheon/lib/cmd.js b/plugins/kalabox-plugin-pantheon/lib/cmd.js
index 40a700d..e5ebf68 100755
--- a/plugins/kalabox-plugin-pantheon/lib/cmd.js
+++ b/plugins/kalabox-plugin-pantheon/lib/cmd.js
@@ -332,7 +332,7 @@ module.exports = function(kbox, app) {
    */
   var ensureSymlink = function() {
     // Get the correct filemount
-    var filemount = '/code/' + app.env.getEnv('KALABOX_APP_PANTHEON_FILEMOUNT');
+    var filemount = '/code/web/' + app.env.getEnv('KALABOX_APP_PANTHEON_FILEMOUNT');
     // Force remove the filemount
     return run('rm', ['-rf', filemount], appserverContainer())
     .then(function() {

diff --git a/plugins/kalabox-plugin-pantheon/lib/env.js b/plugins/kalabox-plugin-pantheon/lib/env.js
index 02f42a6..2c1869d 100755
--- a/plugins/kalabox-plugin-pantheon/lib/env.js
+++ b/plugins/kalabox-plugin-pantheon/lib/env.js
@@ -92,7 +92,7 @@ module.exports = function(kbox, app) {
     // Default environmental variables
     var env = {
       framework: framework,
-      docroot: '/',
+      docroot: '/web',
       filemount: frameworkSpec[framework].filemount,
       drupalHashSalt: settings.drupal_hash_salt,
       dbHost: 'database',

diff --git a/cli.yml b/cli.yml
index 137bdd5..972bbe9 100644
--- a/cli.yml
+++ b/cli.yml
@@ -11,7 +11,7 @@
 git:
   service: cli
   description: Run a git command on your codebase
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a rsync command to your Pantheon app.
@@ -27,7 +27,7 @@ rsync:
 terminus:
   service: terminus
   description: Run a terminus command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a wp-cli command to your pantheon app.
@@ -35,7 +35,7 @@ terminus:
 wp:
   service: terminus
   description: Run a wp-cli command on your codebase
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a drush 8 command to your pantheon app.
@@ -43,7 +43,7 @@ wp:
 drush:
   service: drush
   description: Run a version appropriate drush command on your codebase
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a php cli command to your pantheon app.
@@ -51,7 +51,7 @@ drush:
 php:
   service: terminus
   description: Run a php cli command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a redis-cli command to your pantheon app.
@@ -66,7 +66,7 @@ redis:
     - '8161'
   entrypoint: redis-cli
   description: Drop into a redis-cli shell
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a composer command to your pantheon app.
@@ -74,7 +74,7 @@ redis:
 composer:
   service: terminus
   description: Run a composer cli command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a mysql command to your pantheon app.
@@ -84,7 +84,7 @@ mysql:
   precmdopts: -uroot
   entrypoint: mysql
   description: Drop into a mysql shell
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a node command to your pantheon app.
@@ -92,7 +92,7 @@ mysql:
 node:
   service: cli
   description: Run a node command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a npm command to your pantheon app.
@@ -100,7 +100,7 @@ node:
 npm:
   service: cli
   description: Run a npm command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a grunt command to your pantheon app.
@@ -108,7 +108,7 @@ npm:
 grunt:
   service: cli
   description: Run a grunt command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a gulp command to your pantheon app.
@@ -116,7 +116,7 @@ grunt:
 gulp:
   service: cli
   description: Run a gulp command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

 #
 # Adds a bower command to your pantheon app.
@@ -124,4 +124,4 @@ gulp:
 bower:
   service: cli
   description: Run a bower command
-  mapping: <config.sharing.codeDir>:/code
+  mapping: <config.sharing.codeDir>:/code/web

diff --git a/kalabox-cli.yml b/kalabox-cli.yml
index 03c8450..def1653 100644
--- a/kalabox-cli.yml
+++ b/kalabox-cli.yml
@@ -26,7 +26,7 @@ cli:
   volumes_from:
     - data
   environment:
-    WEBROOT: /code
+    WEBROOT: /code/web
     TERM: xterm-color
     COLUMNS: 150
     HOME: /home/$KALABOX_ENGINE_ID
```

Now, in order to seal the deal you will want to restart your app with Kalabox.

```bash
# Navigate to your Kalabox app's code directory
cd /path/to/app/code

# Restart
kbox restart

# Clear any relevant caches
kbox drush cr || kbox drush cc all
```

### 4. Visit your site in the browser

### 5. Continue all the dev

### 6. Profit
