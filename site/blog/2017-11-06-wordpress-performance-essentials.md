---
title: "WordPress Performance Essentials"
tags:
  - development
  - php
  - wordpress
  - performance
  - johno
author: "John Ouellet"
date: "2017-11-06"
summary: "How to make WordPress run fast and smooth.  A few tips and tricks to make sure your visitors don't get frustrated waiting on pages to load."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

::: byline
How to make WordPress run fast and smooth.  A few tips and tricks to make sure your visitors don't get frustrated waiting on pages to load."
:::

Making Your WordPress Site Super Duper Fast
-----------------------------------------

Having a fast running site is a great feeling.  Your visitors will be happy, Google will be happy, and most of all you will be happy.  So much happiness all around can be achieved with just a little elbow grease and some TLC.  Let me show you some tips and tricks to get your WordPress site performing well.

You can use free resources to test your progress while you are trying these tips.  [KeyCDN](https://tools.keycdn.com/speed) and [Pingdom](https://tools.pingdom.com/) both provide good speed benchmark tools that are fairly straightforward to understand and use.

CloudFlare
----------

[CloudFlare](https://www.cloudflare.com/) is a no brainer when it comes to quick and easy performance setup.  CloudFlare is a Content Delivery Network service that also takes over the DNS of your site.  So this means you will need access to your site's registrar.  CloudFlare's free plan is more than enough to get a feel for how awesomesauce this service is.

Once you go through and [setup your site with Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-Cloudflare-account-and-add-a-website) then you are ready to unleash the fury.  *Note: There is a [CloudFlare WordPress plugin](https://wordpress.org/plugins/cloudflare/), but you don't need it if you follow this whole guide.  Most caching plugins come with a CloudFlare (or any CDN) plugin.*

Here are the settings you should have on each of the sections/apps of CloudFlare:

### DNS

  * Click the orange cloud (http proxy) on all A and CNAME records.
  * You should utilize CNAME flattening as well. To do this create a new CNAME record and put www in the name and then @ in the domain name fields.

:::thumbnail
![Cloudflare DNS Screen - CNAME Flattening](/images/articles/cname-flat.jpg "Cloudflare DNS Screen - CNAME Flattening")
::: caption
Cloudflare DNS Screen - CNAME Flattening
:::

### Crypto

  * Dependent on your hosting providers settings, you will chose Flexible or Full in the SSL setting.  Start with Flexible, change all the settings below and then try Full.  If Full causes a 5xx error on your site, change back to Flexible, purge the caches in the Caches app and give it a minute.
  * Go down to Always use HTTPS and click it to on.  Also head down to Automatic HTTPS Rewrites and click it to on. All of these settings will enable https on your site, for free!  Just go back through your site to make sure you have no assets stuck on http.  You will see the mixed content message in the console.  Usually it is one or two assets, but easy enough to fix real quick.

### Speed

  * In the Auto Minify settings, check all 3 boxes for CSS, JS, and HTML.  This will reduce the page size on top of any other plugins you may be using.
  * You can also try enabling the RocketLoader, but I have always had mixed results with it.  Test it out to see if it helps any.

### Caching

Here is where you can purge the CloudFlare cache manually if need be.  It comes in handy when applying these settings or when something goes awry with the cache.

  * In the Caching Level Area, select the Standard option.
  * Browser Cache Expiration can be set to what you feel seems good.  I would recommend at least 14 days, I usually do a month.
  * Make sure Always Online is set to On.

### Page Rules

This is where you can really customize things.  There are numerous articles out there for different settings.  *Note: a few months ago CloudFlare made https redirection free for all accounts, so you don't need a rule for it anymore.*

The one basic rule I usually add to all WP sites is this one for the files directory:

  * URL: `*YOURSITE.com/wp-content/uploads*`

  * Settings:
    * Browser Cache TTL = 14 days +
    * Security Level = High
    * Cache Level = Cache Everything
    * Edge Cache = 1 month +

Since we only have 3 rules to play with on the free site, use the other 2 as you please.  Some articles suggest disable cache for admin pages.  The url for those patterns would be: `*YOURSITE.com/wp-content/wp-admin/*` and `*YOURSITE.com/wp-login.php*`.  This is useful if you are caching the base url and things are getting "stuck".  However when you only have 3 rules to play with, the first one I listed is the most important.  If you want to buy a couple extra rules, it would help in this area.

CloudFlare is super simple to setup and the performance gains are quite nice.  Considering this tool is free and only takes a few minutes to setup, it would be unwise not to use it.


Nginx
-----

> Apache is like Microsoft Word, it has a million options but you only need six.  Nginx does those six things, and it does five of them 50 times faster than Apache.
> - Chris Lea

There are numerous articles out there they weigh the advantages of Nginx over Apache.  We could go on and on about the two of them, but if you want performance, go with Nginx. If you are still curious, [here is an article from the Nginx Community Wiki](https://www.nginx.com/resources/wiki/community/why_use_it/) on the advantages of Nginx.

Most hosting environments come with Nginx ready to go. For example [Pantheon](https://pantheon.io/) and [Platform](https://platform.sh/) both use Nginx. If you are hosting through a do it yourself provider (like [Digital Ocean](https://www.digitalocean.com/), then here are a couple tips and tricks.


### Cache All Of Your Static Resources

Caching static assets like CSS, JS, images, etc has a huge benefit for your site.  You will deliver these assets faster to your end user while reducing the load on the server.  It is a win-win to set this up.  It is pretty simple and easy to do.

Go to `/etc/nginx/sites-available` folder on your server.  Edit the file which corresponds to your site (usually the default file).  You can do this with the command ```sudo nano default``` or whatever CLI editor you use.  Add the following settings to the file:

```bash
server {
  // Other settings up here

  location ~ \.php$ {
    // more settings in here
  }

  location ~* .(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg
                  |jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid
                  |midi|wav|bmp|rtf)$ {
    expires max;
    log_not_found off;
    access_log off;
  }
}

```

### Enable FastCGI

FastCGI is a caching mechanism that helps with all the behind the scenes CGI processes on the server. It only take a few seconds to set this up, but is quite powerful.  Here is the recommended method using the same config file from the static resource example:

```bash
fastcgi_cache_path /var/run/nginx-cache levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";

server {
  // Other settings up here

  set $skip_cache 0;

  # POST requests and urls with a query string should always go to PHP
  if ($request_method = POST) {
    set $skip_cache 1;
  }
  if ($query_string != "") {
    set $skip_cache 1;
  }

  # Don't cache uris containing the following segments
  if ($request_uri ~* "/wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml") {
    set $skip_cache 1;
  }

  # Don't use the cache for logged in users or recent commenters
  if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in") {
    set $skip_cache 1;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~ \.php$ {
    try_files $uri =404;
    include fastcgi_params;

    fastcgi_pass unix:/var/run/php5-fpm.sock;

    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;
    fastcgi_cache WORDPRESS;
    fastcgi_cache_valid  60m;
  }

  location ~ /purge(/.*) {
    fastcgi_cache_purge WORDPRESS "$scheme$request_method$host$1";
  }

  location ~* .(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg
                  |jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid
                  |midi|wav|bmp|rtf)$ {
    expires max;
    log_not_found off;
    access_log off;
  }
}

```

Enabling Nginx, caching your static resources, and enabling FastCGI will yield great gains in your site performance.  There are many other tweaks you can do to Nginx beyond this.  If you are Google savvy enough, you can squeeze out even more milliseconds of performance than what I listed above.


PHP 7.x
--------

PHP 7 comes with numerous new bells and whistles.  However the hands down best improvement is nearly twice the speed.  As you can see from this infographic below taken from [Zend.com PHP 7 Blog Post](https://www.zend.com/en/resources/php7_infographic):

::: thumbnail
![WordPress PHP 7 Speed Metrics Graph](/images/articles/wp-php-speed.jpg "WordPress PHP 7 Speed Metrics Graph")
::: caption
WordPress PHP 7 Speed Metrics Graph
:::

On managed hosting platforms like [Pantheon](https://pantheon.io/) and [Platform](https://platform.sh/), there are simple settings to change the PHP version.  However, if you are on your own, then I would do the following to install PHP 7.x:

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.1-fpm php7.1-curl php7.1-gd php7.1-xml php7.1-mysql php7.1-json php7.1-mbstring php7.1-opcache php7.1-zip
```

Then go into your Nginx sites at /etc/nginx/sites-available/YOURSITE and edit the fastcgi_pass line as follows:

```bash
#fastcgi_pass unix:/var/run/php5-fpm.sock;
fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
```

Restart the php service or the server and voila, your site is now using PHP 7!


OpCache
-------

When PHP is executed, OpCache will store this code into memory on the first execution.  This eliminates the need to for PHP to load and parse scripts on each request.  So, this means more performance gains for you, yay!

Once you have PHP 7.x installed, OpCache is included with it.  If you are on a managed server, then you can skip this as it should be setup for you.  If you are not, then go to your php-fpm/php.ini file and replace the OpCache code with the following:

```bash
[opcache]
; Determines if Zend OPCache is enabled
opcache.enable=1

; Determines if Zend OPCache is enabled for the CLI version of PHP
opcache.enable_cli=0

; The OPcache shared memory storage size.
opcache.memory_consumption=128

; The amount of memory for interned strings in Mbytes.
opcache.interned_strings_buffer=8

; The maximum number of keys (scripts) in the OPcache hash table.
; Only numbers between 200 and 100000 are allowed.
opcache.max_accelerated_files=32531

; The maximum percentage of "wasted" memory until a restart is scheduled.
opcache.max_wasted_percentage=5

; When this directive is enabled, the OPcache appends the current working
; directory to the script key, thus eliminating possible collisions between
; files with the same name (basename). Disabling the directive improves
; performance, but may break existing applications.
opcache.use_cwd=1

; When disabled, you must reset the OPcache manually or restart the
; webserver for changes to the filesystem to take effect.
opcache.validate_timestamps=1

; How often (in seconds) to check file timestamps for changes to the shared
; memory storage allocation. ("1" means validate once per second, but only
; once per request. "0" means always validate)
opcache.revalidate_freq=2

; Enables or disables file search in include_path optimization
opcache.revalidate_path=0

; If disabled, all PHPDoc comments are dropped from the code to reduce the
; size of the optimized code.
opcache.save_comments=1

; If enabled, a fast shutdown sequence is used for the accelerated code
opcache.fast_shutdown=1

; Allow file existence override (file_exists, etc.) performance feature.
opcache.enable_file_override=0

; A bitmask, where each bit enables or disables the appropriate OPcache
; passes
opcache.optimization_level=0x7FFFBFFF

opcache.inherited_hack=1
opcache.dups_fix=0

; The location of the OPcache blacklist file (wildcards allowed).
; Each OPcache blacklist file is a text file that holds the names of files
; that should not be accelerated. The file format is to add each filename
; to a new line. The filename may be a full path or just a file prefix
; (i.e., /var/www/x  blacklists all the files and directories in /var/www
; that start with 'x'). Line starting with a ; are ignored (comments).
;opcache.blacklist_filename=

; Allows exclusion of large files from being cached. By default all files
; are cached.
opcache.max_file_size=0

; Check the cache checksum each N requests.
; The default value of "0" means that the checks are disabled.
opcache.consistency_checks=0

; How long to wait (in seconds) for a scheduled restart to begin if the cache
; is not being accessed.
opcache.force_restart_timeout=180

; OPcache error_log file name. Empty string assumes "stderr".
opcache.error_log=

; All OPcache errors go to the Web server log.
; By default, only fatal errors (level 0) or errors (level 1) are logged.
; You can also enable warnings (level 2), info messages (level 3) or
; debug messages (level 4).
opcache.log_verbosity_level=1

; Preferred Shared Memory back-end. Leave empty and let the system decide.
;opcache.preferred_memory_model=

; Protect the shared memory from unexpected writing during script execution.
; Useful for internal debugging only.
opcache.protect_memory=0

; Allows calling OPcache API functions only from PHP scripts which path is
; started from specified string. The default "" means no restriction
;opcache.restrict_api=

; Mapping base of shared memory segments (for Windows only). All the PHP
; processes have to map shared memory into the same address space. This
; directive allows to manually fix the "Unable to reattach to base address"
; errors.
;opcache.mmap_base=

; Enables and sets the second level cache directory.
; It should improve performance when SHM memory is full, at server restart or
; SHM reset. The default "" disables file based caching.
;opcache.file_cache=

; Enables or disables opcode caching in shared memory.
opcache.file_cache_only=0

; Enables or disables checksum validation when script loaded from file cache.
opcache.file_cache_consistency_checks=1

; Implies opcache.file_cache_only=1 for a certain process that failed to
; reattach to the shared memory (for Windows only). Explicitly enabled file
; cache is required.
;opcache.file_cache_fallback=1

; Enables or disables copying of PHP code (text segment) into HUGE PAGES.
; This should improve performance, but requires appropriate OS configuration.
opcache.huge_code_pages=0

; Validate cached file permissions.
; opcache.validate_permission=0

; Prevent name collisions in chroot'ed environment.
; opcache.validate_root=0

opcache.file_update_protection=2
opcache.lockfile_path=/tmp
```

Restart the php service or the server and now your site is utilizing OpCache!


Redis
-----

Redis is a fast in-memory key-value data structure storage mechanism.  When placed in "front" of a database, it creates a high performance in-memory cache.  This will then aid in increasing throughput and decreasing access latency.  This is great for MySQL driven CMS's like WordPress.

Most managed servers, as mentioned above will do this for you.  Usually you just need the [WP-Redis Plugin](https://wordpress.org/plugins/wp-redis/) to get started and another setting I will mention below.  If you are not on a managed service, you will also need your server IP address as well.  Wait to enable the plugin until the end though.

If you are not on a managed server do the following:
  * `sudo apt-get install redis-server php-redis`
  * `sudo nano /etc/redis/redis.conf`
    * Find the bind command and add your IP to it: `bind 127.0.0.1 YOUR_IP_ADDRESS`
  * At the end of the same file add these two entries:
    * `maxmemory 256mb`
    * `maxmemory-policy allkeys-lru`
  * In your php.ini find and replace `session.save_handler = whatever the default setting` with `session.save_handler = redis`
  * Also in your php.ini in the also uncomment this line and add your ip to it as follows: `session.save_path = "tcp://YOUR_IP_ADDRESS:6379"`

Now you can enable the WP-Redis Plugin plugin in WordPress.  Once that is turned on, create a file object-cache.php in the wp-content folder.  Copy [this gist](https://gist.github.com/labboy0276/92b91b9cae164da26bc13bdaec69d9b2) into the file.  Verify the file was created by going to wp-admin/plugins.php?plugin_status=dropins.

There, you now have Redis running on your server!

Varnish
-------

Varnish is a HTTP accelerator which is also known as a caching HTTP reverse proxy.  Varnish acts as a sort of middleman between the end user and the backend.  With Varnish, it will cache all first responses for a certain piece of content.  So when future users hit the same content, it will serve it from its cache.  Whats this means is a giant increase in performance because you are not hitting PHP and MySQL every time.

As before, most managed hosting environments have this setup for you.  However, if you need to set this up for your server, here is what to do:

  * Run these commands to install Varnish on your server:
  ```bash
  sudo apt-get install apt-transport-https
  curl http://repo.varnish-cache.org/debian/GPG-key.txt | sudo apt-key add -
  sudo sh -c 'echo "deb https://repo.varnish-cache.org/ubuntu/ trusty varnish-4.0" >> /etc/apt/sources.list.d/varnish-cache.list'
  sudo apt-get update
  sudo apt-get install varnish
  ```
  * Edit the Varnish config with `sudo nano /etc/default/varnish`
    * Then change the setting from `DAEMON_OPTS="-a :6081 \` to `DAEMON_OPTS="-a :80 \`
  * Edit the VCL file with `sudo nano /etc/varnish/default.vcl`
    * Copy [this gist](https://gist.github.com/labboy0276/51a4f12e7db556133824baee7e060cc6) into the file.
  * Edit your Nginx host file `sudo nano /etc/nginx/sites-available/default`
    * Change the Listen port to 8008

Reboot your server now.  You should have varnish all set and serving content.  You can check with if your site is serving Varnish [with this link](http://www.isvarnishworking.com/). If you are having issues, [see this issue to edit](https://support.cloudflare.com/hc/en-us/articles/200169376-Can-I-use-Cloudflare-and-Varnish-together-) your VCL if need be.

WP-Rocket Plugin
----------------

The standard go to for caching within WordPress seems to be W3 Total Cache.  However, there is a new kid on the block that can beat it in a fight.  [WP-Rocket](https://wp-rocket.me/) is a paid plugin, but it is totally worth the $49 you pay for it.  Unlike many of its competitors, WP-Rocket is extremely easy to setup.  Only caveat is if you are on a GIT controlled server you need to add wp-config.php and .htaccess to the .gitignore to allow it to set itself up properly.

Here are some basic settings I use with most sites:

### Basic Tab

Check the following options:
  * Enable caching for mobile devices
  * Enable caching for pages with https://
  * Use default emoji of visitors’ browser instead of loading emoji from WordPress.org
  * Disable WordPress Embeds
  * Set Cache lifespan to at least 7 days.

### Static Files Tab

Check the following options:
  * HTML
  * Google Fonts

### CDN Tab
  * Enable the CloudFlare settings tab

You can then setup the CloudFlare settings in its respective tab and purge the caches from the WordPress site!  That's it for the settings, really simple yet quite powerful in nature.  Play around with other settings if you want to see what results you may get.

Autoptimize Plugin
------------------

The [Autoptimize](https://wordpress.org/plugins/autoptimize/) plugin is used to aggregate css / js and inline css on your site.  I mainly use this plugin to inline the CSS, but use its optimize options as well.  It is lightweight and very easy to setup.

To set this up, do the following:

  * Make sure you click the show advanced settings at the top of the config page.
  * Under JavaScript Options, check the following:
    * Optimize JavaScript Code?
    * Also aggregate inline JS?
  * Under CSS Options, check the following:
    * Optimize CSS Code?
    * Inlining all CSS can improve performance for sites with a low pageviews/ visitor-rate, but may slow down performance otherwise.
    * Make sure admin-bar.min.css, dashicons.min.css is in the Exclude CSS from Autoptimize
  * Under Misc Options, check both options there.

That's it, now your CSS is inlined and aggregated and your JS is aggregate as well.  Q'Plah


Conclusion
----------

It is important to have a performant site for your clients, visitors and yourself.  There is no negative consequence from doing all the points I outlined above.  Spend an hour or two and go through and set this up.  You will be amazed at what a difference you will see once you do.
