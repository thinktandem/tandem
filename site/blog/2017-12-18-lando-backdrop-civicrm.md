---
title: "Lando + Backdrop + CiviCRM"
tags:
  - development
  - devops
  - backdrop
  - civicrm
  - localdev
  - lando
  - serundeputy
author: "Geoff St. Pierre"
date: "2017-12-18"
summary: "Managing multiple databases and dev tooling with Lando"
id: serundeputy
pic: "/images/people/gff-sm.jpg"
location: Massachusetts
---

Introduction
------------

I had a project arise through the [Backdrop 4 Good](https://backdrop4good.org) group where we needed [CiviCRM](https://civicrm.org/) integration. This requires a second database to manage the CiviCRM data. This post will show you how to set up Lando with the second DB and CiviCRM.

The `.lando.yml` File
---------------------

Using a backdrop recipe and adding a `cividatabase` key to add a second database server:

```yaml
name: civi
recipe: backdrop
config:
  webroot: web
  php: '7.0'

services:
  appserver:
    build:
      - "curl -sS https://platform.sh/cli/installer | php"
  database:
    type: mariadb
    portforward: 6618
  cividatabase:
    type: mariadb
    portforward: 6619
    creds:
      user: root
      password:
      database: cividatabase
  node-cli:
    type: node:6.10
    build:
      - cd $LANDO_MOUNT && npm install
    globals:
      gulp-cli: "latest"

# See: https://docs.lndo.io/config/tooling.html
tooling:
  npm:
    service: node-cli
  node:
    service: node-cli
  gulp:
    service: node-cli
  platform:
    service: appserver
    cmd: /var/www/.platformsh/bin/platform

```

Connecting to the Databases
---------------------------

To connect your databases use the `lando info` command to get the details and then plug them into your favorite database management tool. In this example I will use [Sequel Pro](https://www.sequelpro.com/).

Here is a snippet of the `lando info` command output

```json
"database": {
  "type": "mariadb",
  "version": "latest",
  "creds": {
    "user": "backdrop",
    "password": "backdrop",
    "database": "backdrop"
  },
  "internal_connection": {
    "host": "database",
    "port": 3306
  },
  "external_connection": {
    "host": "localhost",
    "port": "6618"
  },
  "config": {
    "confd": "/Users/geoff/.lando/services/config/backdrop/mysql"
  }
},
"cividatabase": {
  "type": "mariadb",
  "version": "latest",
  "creds": {
    "user": "root",
    "password": "password",
    "database": "cividatabase"
  },
  "internal_connection": {
    "host": "cividatabase",
    "port": 3306
  },
  "external_connection": {
    "host": "localhost",
    "port": "6619"
  }
},
```

You can see we have two database keys now: `database` and `cividatabase` these contain the info that we need to connect to the respective databases. I've also used the `portforward` key in the `.lando.yml` file to give the databases static external ports of `6618` for the Backdrop database and `6619` for CiviCRM database.

::: thumbnail
![Sequel Pro Connection Screen](/images/articles/lando-backdrop-civicrm/sqlpro-creds.jpg "Sequel Pro Connection Screen")
::: caption
Sequel Pro Connection Screen
:::

Fill out the database creds with the information from the `cividatabase` key in the output of the `lando info` command.

::: warning WARNING
At the time of this writing the the key `password` in the `.lando.yml` file is not being respected. So regardless of the info in the `lando info` output for `cividatabase` saying `password` I had to use an empty password. I'll file a bug on the [Lando issue queue](https://github.com/lando/lando/issues).
:::

Resources
---------

* [Lando](https://docs.devwithlando.io)
* [Backdrop CMS](https://backdropcms.org)
* [CiviCRM](https://civicrm.org)
  * [Official CiviCRM support for Backdrop CMS](https://backdropcms.org/news/official-civicrm-support-backdrop-cms)
* [Sequel Pro](https://www.sequelpro.com)

Conclusion
----------

There you have it! Two databases configured in their respective service containers in one Lando app. Enjoy the power and goodness of developing apps with Lando!
