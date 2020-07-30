---
layout: Post
title: 'Lando Share ~ Sharing is Caring'
tags:
    - development
    - localdev
    - testing
    - drupal
    - wordpress
author: 'Geoff St. Pierre'
private: false
mainImage: /images/articles/lando-share/ipad-lappy-phone.jpg
img-src: /images/articles/lando-share/ipad-lappy-phone.jpg
byline: 'Use the `lando share` command to expose a URL of your local Lando site. For example to view it on actual mobile devices for browser testing before you release it to the world!'
date: '2018-01-03'
meta:
    - { name: description, content: 'Use the `lando share` command to expose a URL of your local Lando site. For example to view it on actual mobile devices for browser testing before you release it to the world!' }
    - { name: keywords, content: 'development,localdev,testing,drupal,wordpress' }
---

Why?
----------------------

We all know the amount of work it takes to get a site working and looking great across all browsers and screen sizes. The struggle is real. Pushing things up to staging for review only to find out that the Safari fix broke the mobile Firefox view; ugh. Enter `lando share`. With `lando share` you can expose a public URL to your local Lando app and use that URL to view the site on real phones, tablets, and desktops. Now you can iterate fast on the actual site and share the URL with Project Managers, other Developers, and stakeholders to get immediate feedback!

Lando Share
-----------

When you start a Lando app you can see all the commands you have at your finger tips with the `lando` command without any arguments.

```bash
(master) $ lando
Usage: /usr/local/bin/lando <command> [args] [options] [-- global options]

Commands:
  composer                 Run composer commands
  config                   Display the lando configuration
  db-export [file]         Export a database. Resulting file: {DB_NAME}.TIMESTAMP.gz
  db-import [file]         Import into database.
  destroy [appname]        Destroy app in current directory or [appname]
  drush                    Run drush commands
  gulp                     Run gulp commands
  info [appname]           Prints info about app in current directory or [appname]
  init [method]            Initialize a lando app, optional methods: github, pantheon
  list                     List all lando apps
  logs [appname]           Get logs for app in current directory or [appname]
  mysql                    Drop into a MySQL shell
  node                     Run node commands
  npm                      Run npm commands
  php                      Run php commands
  poweroff                 Spin down all lando related containers
  rebuild [appname]        Rebuilds app in current directory or [appname]
  restart [appname]        Restarts app in current directory or [appname]
  share [appname]          Get a publicly available url
  ssh [appname] [service]  SSH into [service] in current app directory or [appname]
  start [appname]          Start app in current directory or [appname]
  stop [appname]           Stops app in current directory or [appname]
  version                  Display the lando version

Global Options:
  --help, -h  Show help
  --verbose, -v, -vv, -vvv, -vvvv  Change verbosity of output

You need at least one command before moving on

```

Tucked away in this list is the `lando share` command. Perhaps you've never noticed it or have not had the time to explore it. Well now is the time.

```bash
  share [appname]          Get a publicly available url
```

In general the way to get help for a Lando command is `lando [command] -- -h`; here is the help for the `share` command:

```bash
(master) $ lando share -- -h
/usr/local/bin/lando share [appname]

Options:
  --url, -u  Url to share. Needs to be in the form http://localhost:port
```

From this output we can see that `lando share` takes an optional `[appname]` argument and a required `--url` option. If you are already in a working Lando app then you don't need to provide the appname, but need to provide a URL to share out to [localtunnel.me](https://localtunnel.me). To get the URL to provide as the `--url` option use the `http://localhost:port` you see after starting your app. If you've already started your app and are working in the app directory you can get the URLs for your app at any time with `lando info`.

```bash
(master) $ lando info
{
  "appserver": {
    "type": "php",
    "version": "7.0",
    "via": "apache",
    "webroot": "www",
    "config": {
      "conf": "/Users/USER/.lando/services/config/backdrop/php.ini"
    },
    "urls": [
      "https://localhost:32937",
      "http://localhost:32938",
      "http://MYSITE.lndo.site",
      "https://MYSITE.lndo.site"
    ]
  },
```

Use the http version of your localhost URL; in this case `http://localhost:32938`. Now putting it all together for this app the share command:

```bash
(master) $ lando.dev share --url http://localhost:32938

YOU ARE NOW SHARED WITH THE WORLD!!!

A local tunnel to your app has been established.

Here is your public url:
https://MYSITE.localtunnel.me

Press any key to close the tunnel.
```

Now you can visit `https://MYSITE.localtunnel.me` in the browser of your phones, tablets, or desktops to see what the developer sees with Project Managers, clients, or any stakeholder in a meeting or anytime.


Gotcha!
-------

One gotcha that I ran into with Drupal 7 and Backdrop sites is if you have a `$base_url` specified in either `settings.php` or `settings.local.php` the https URL provided by localtunnel.me can not load the CSS and assets as it is trying to load http content over an https connection. The solution is to just comment out the `$base_url` when using the `lando share` command.

Conclusion
----------

After all the hard work your team puts in to make beautiful sites utilize the `lando share` to make it easy for your Developers, Project Managers, and stakeholders  to QC/view progress on all the devices!
