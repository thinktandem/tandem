---
title: 'Lando is ready for the masses with RC2 release'
tags:
    - development
    - devops
    - api
    - drupal
    - localdev
    - wordpress
    - testing
author: 'Mike Pirog'
private: false
mainImage: images/articles/lando-space.jpg
img-src: images/articles/lando-space.jpg
byline: 'We''ve waited, we''ve bided our time, we''ve gathered data and now we are ready to smite traditional local dev to ruin by unleashing the true power of Lando'
date: '2019-01-31'
---

Holla!!! We are super pumped to announce the release of [Lando 3.0.0-rc.2](https://github.com/lando/lando/releases)!.

About midway through 2018 we reached a few of the milestones we were looking for:

* Over 5,000 monthly active users
* Breaking more things than we were fixing on each release
* High levels of technical debt
* More support requests than we could handle

While the amount of monthly active users and support requests were *very surprising* (and encouraging) to us the other two were not because **SPOILER ALERT:**  our `beta` releases were essentially proof of concepts; prototypes hacked together to demonstrate whether people actually wanted something like Lando or not. Our conclusion from this data was that not only do the people want something like Lando but they **crave it.**

Since then we've been listening to users and heeding their advice as we try to lock down the core set of Lando's functionality and figure out what we needed to do to take Lando to the next level. This has been a very enlightening process, aided by the [lessons learned](https://thinktandem.io/blog/2017/10/24/journey-to-lando-mistakes-pivots-and-vindication/) during the [Kalabox](https://github.com/kalabox/kalabox) project and culminating in this release.

At time of writing Lando has peaked *very close* to 9,000 monthly active users and has averaged around 8,000 for the last quarter or so.

![rc2-active-montly-users](images/rc2users.png "Monthly active users before RC2 release")

We never dreamed we'd have this many users **before a stable release** and have been working *very hard* to cut a release that lays the foundation for more growth and adoption in the future.

Speaking of new foundations we'd like to tell you all what we've done to prep Lando for a stable release and beyond...

Reducing Techincal Debt
-----------------------

Hitherto, and as mentioned above, Lando has been essentially a prototype. We've been haphazardly pushing up new code while leaving no thought for the morrow as we try to confirm the features users need to be successful developing their projects. That process, while important and illuminating, resulted in a massive amount of techincal debt.

Lando RC2 is in many ways a bottom-up rewrite to address this problem; to consolidate code around an emergent set of community-agreed-upon features.

But [you don't have to take my word for it](https://www.youtube.com/watch?v=vAvQbEeTafk). Here is a [Code Climate](https://codeclimate.com/) analysis of technical debt over the last 6 months.

![rc2-tech-debt](images/rc2techdebt.png "Pre RC2 technical debt ratio")

Believe it or not the technical debt ratio at the beginning of 2018 was actually around **60%!**.

While this reduction has been much needed we've implemented CI tests to make sure no new code introduced into Lando increases its technical debt beyond an unacceptable threshold.

Locking Down the API
--------------------

Refactoring the code to reduce technical debt and getting a better sense of the core features means we can now also provide better docs and API stability. To that end you can now [read our lips](https://www.youtube.com/watch?v=0MW44jsYi0g) when we say *no new breaking changes*.

This means that RC2, while still not a stable release, will not be changing its core syntax and will guarantee backwards compatibility here on out.

Unlike the late [George H.W. Bush](https://en.wikipedia.org/wiki/George_H._W._Bush) we want to [fight for the users](https://www.youtube.com/watch?v=8kcgosLwPDE) and win that second term.

You can take the following docs to the bank.

### Recipe Docs

*   [Backdrop](http://docs.devwithlando.io/tutorials/backdrop.html)
*   [Drupal 6](http://docs.devwithlando.io/tutorials/drupal6.html)
*   [Drupal 7](http://docs.devwithlando.io/tutorials/drupal7.html)
*   [Drupal 8](http://docs.devwithlando.io/tutorials/drupal8.html)
*   [Joomla](http://docs.devwithlando.io/tutorials/joomla.html)
*   [Laravel](http://docs.devwithlando.io/tutorials/laravel.html)
*   [MEAN](http://docs.devwithlando.io/tutorials/mean.html)
*   [LAMP](http://docs.devwithlando.io/tutorials/lamp.html)
*   [LEMP](http://docs.devwithlando.io/tutorials/lemp.html)
*   [Pantheon](http://docs.devwithlando.io/tutorials/pantheon.html)
*   [WordPress](http://docs.devwithlando.io/tutorials/wordpress.html)

### Services Docs

*   [dotnet](http://docs.devwithlando.io/tutorials/dotnet.html)
*   [go](http://docs.devwithlando.io/tutorials/go.html)
*   [node](http://docs.devwithlando.io/tutorials/node.html)
*   [php](http://docs.devwithlando.io/tutorials/php.html)
*   [python](http://docs.devwithlando.io/tutorials/python.html)
*   [ruby](http://docs.devwithlando.io/tutorials/ruby.html)
*   [apache](http://docs.devwithlando.io/tutorials/apache.html)
*   [elasticsearch](http://docs.devwithlando.io/tutorials/elasticsearch.html)
*   [mailhog](http://docs.devwithlando.io/tutorials/mailhog.html)
*   [mariadb](http://docs.devwithlando.io/tutorials/mariadb.html)
*   [memcached](http://docs.devwithlando.io/tutorials/memcached.html)
*   [mongo](http://docs.devwithlando.io/tutorials/mongo.html)
*   [mssql](http://docs.devwithlando.io/tutorials/mssql.html)
*   [mysql](http://docs.devwithlando.io/tutorials/mysql.html)
*   [nginx](http://docs.devwithlando.io/tutorials/nginx.html)
*   [phpmyadmin](http://docs.devwithlando.io/tutorials/phpmyadmin.html)
*   [postgres](http://docs.devwithlando.io/tutorials/postgres.html)
*   [redis](http://docs.devwithlando.io/tutorials/redis.html)
*   [solr](http://docs.devwithlando.io/tutorials/solr.html)
*   [tomcat](http://docs.devwithlando.io/tutorials/tomcat.html)
*   [varnish](http://docs.devwithlando.io/tutorials/varnish.html)

### Config Docs

*   [CLI](http://docs.devwithlando.io/cli/usage.html)
*   [Landofiles](http://docs.devwithlando.io/config/lando.html)
*   [Environment](http://docs.devwithlando.io/config/env.html)
*   [Events](http://docs.devwithlando.io/config/events.html)
*   [Networking](http://docs.devwithlando.io/config/networking.html)
*   [Proxy](http://docs.devwithlando.io/config/proxy.html)
*   [Recipes](http://docs.devwithlando.io/config/recipes.html)
*   [Services](http://docs.devwithlando.io/config/services.html)
*   [Tooling](http://docs.devwithlando.io/config/tooling.html)
*   [SSH Keys](http://docs.devwithlando.io/config/ssh.html)
*   [SSL/TLS](http://docs.devwithlando.io/config/security.html)
*   [Shared Files](http://docs.devwithlando.io/config/files.html)
*   [Global Config](http://docs.devwithlando.io/config/config.html)

### API Docs

*   [Lando](http://docs.devwithlando.io/api/lando.html)
*   [App](http://docs.devwithlando.io/api/app.html)
*   [Plugins](http://docs.devwithlando.io/dev/plugins.html)

We've put in a **ton** of effort to document and test the above so there is a considerable amount of inertia required to substantially change any of them. This means that you can count on our laziness for future stability.

Testing
-------

While reducing techincal debt was important to make things simpler, more stable, more mangeable and more maintainable, good testing was equally critical to identify regressions and ensure that things remain simple, stable, manageable and maintainable.

To that end we've implemented both unit and functional tests.

### Unit Tests

We don't have 100% coverage yet but we are covering the most important things.

![rc2-unit-tests](images/rc2unit.png "RC2 unit test sample")

### Functional Tests

We wrote our own functional testing framework called [leia](https://github.com/lando/leia) to help us do functional testing. Leia helps us ensure that Lando is the real hero we all know him to be. Leia uses `markdown` files and `bash` commands to do functional testing.

Here is a sample screenshot of one part of one test we run on one of the 10 concurrent CircleCI machines that run on every build.

![rc2-functional-tests](images/rc2func.png "RC2 functional test sample")

This allows us to test all of the things in Lando's [examples directory](https://github.com/lando/lando/tree/master/examples) and by extension most of the code in our [documentation](https://docs.devwithlando.io/).

This means that you should be able to `git clone` the examples folder and succesfully run any of them. If you are interested in checking what these tests look like on CircleCI you can [go here](https://circleci.com/gh/lando/lando).

So what did we change?
----------------------

While a consequence of RC2 has been some annoying breaking changes we've prepared an [update guide](https://docs.devwithlando.io/guides/updating-to-rc2.html) to help you update your Landofiles.

Breaking changes aside, here are all the awesome improvements in RC2.

### Better Images

We've rebased a lot of our images on [Bitnami's](https://hub.docker.com/u/bitnami/) because they are more "local dev" ready. This has provided a bunch of extra stability.

A downside of this is that [some supported Lando versions](https://docs.devwithlando.io/guides/updating-to-rc2.html#service-versions) have gone away.

### Build Steps

[Build steps](https://docs.devwithlando.io/config/services.html#build-steps) can now run **before** and **after** your application starts. That means you can now install node dependencies or install php extensions before your application starts up.

**Install node deps before app starts**

```yaml
services:
  node:
    type: node:10
    build:
      - yarn
```

**Install a php extension and then composer install**

```yaml
services:
  appserver:
    type: php:7.1
    build_as_root:
      - apt-get update -y && apt-get install -y libmemcached-dev
      - pecl install memcached
      - docker-php-ext-enable memcached
    build:
      - composer install
```

### Tooling

[Tooling](https://docs.devwithlando.io/config/tooling.html) is more powerful than ever.

#### Native command emulation

One of the most common uses of tooling is to emulate native commands like `php`, `composer` or `yarn`.

```yaml
tooling:
  php:
    service: appserver
```

The above will run `php` inside of the `appserver` and also pass in any additional args or options you specify. That means that you can run `lando php` in the *exact* same way as `php`. This greatly reduces the hassle involved in invoking said commands directly with `docker`, `docker-compose` or even `lando ssh`. See below:

```bash
# OMG WHYYYYY
docker exec -it mysite_appserver_1 /bin/sh -c "/path/to/my/php -e \"phpinfo();\""

# Hmm ok that's a bit better
lando ssh -c "php -e \"phpinfo();\""

# Oh so nice!
lando php -e "phpinfo();"
```

#### Consolidated command tooling

You may also wish to consolidate a complex command into a simpler one. This is useful because it can help prevent human error and reduce documentation.

```yaml
tooling:
  update-deps:
    service: database
    description: Updates the installed packages on my database service
    cmd: apt update -y && apt install -y
    user: root
```

```bash
lando update-deps
```

#### Multi-command tooling

`cmd` can also be an array. This allows you to chain an indefinite amount of commands together.

```yaml
tooling:
  fire-everything:
    service: node
    description: Runs a seemingly random assortment of commands
    cmd:
      - source ~/.bashrc
      - npm install "$DEP_SET_BY_ENVVAR_SOURCED_BEFORE"
      - /helpers/my-custom-script.sh --max-power
      - ls -lsa
      - env | grep LANDO_
```

```bash
lando fire-everything
```

Note that each line of the above runs in a separate subshell so if you `source` a file in the first command like we unwisely did above it's not going to be available in any of the others. If you need that sort of behavior consider something like this instead

```yaml
tooling:
  fire-everything:
    service: node
    description: Runs a seemingly random assortment of commands
    cmd:
      - source ~/.bashrc && npm install "$DEP_SET_BY_ENVVAR_SOURCED_BEFORE"
      - /helpers/my-custom-script.sh --max-power
      - ls -lsa
      - env | grep LANDO_
```

#### Multi-service Multi-command tooling

You can also omit the `service` and define `cmd` as an array of objects where the `key` is the service and the `value` is the command. This can allow you to consolidate complex testing and build steps that need to happen across many different services.

It also allows you to reuse a common interface across many different Landofiles, eg `lando test` may differ from project to project but it's always what we use to run our tests.

```yaml
tooling:
  build:
    description: Manually invokes all our build steps
    cmd:
      - appserver: composer install
      - node: yarn install
      - node: yarn sass
  test:
    description: Run ALL THE TESTS
    cmd:
      - appserver: composer test
      - node: yarn test
```

```bash
lando test && lando build
```

#### Dynamic service commands

Sometimes you have, need, or want a single command that can be used on a user-specified service. In these situations you can tell Lando to set the service with an option.

Note that the `:` prefix is what tells Lando to use an option instead of a literal string. Also note that you should be careful to avoid collisions between options *you* specify and options the *underlying command* does.

```yaml
tooling:
  php-version:
    service: :service
    cmd: php -v
    options:
      service:
        default: appserver
        describe: Run php in different service
```

```bash
# Get the version in the appserver
lando php-version

# Get the version in the second appserver
lando php-version --service appserver2

# Get the version in the third appserver
lando php-version --service appserver3
```

This can help avoid the following messy and hard-to-scale implementation

```yaml
tooling:
  php-version:
    service: appserver
    cmd: php -v
  php-version2:
    service: appserver2
    cmd: php -v
  php-version3:
    service: appserver3
    cmd: php -v
```

#### Options driven tooling

You can also define your own options for use in tooling. These options follow the same spec as [Lando tasks](http://docs.devwithlando.io/dev/plugins.html#tasks) and are generally used in combination with an underlying script.

Note that the options interface just provides a way to define and then inject options into a given command. It is up to the user to make sure the underlying command or script knows what to do with such options. Note that if you use interactive options you need to set `level: app` as below.

```yaml
tooling:
  word:
    service: web
    cmd: /app/word.sh
    level: app
    options:
      word:
        passthrough: true
        alias:
          - w
        describe: Print what the word is
        interactive:
          type: input
          message: What is the word?
          default: bird
          weight: 600
```

```bash
# This will prompt for the word
lando word

# This will not
lando word --word=fox
```

We've also improved how tooling commands are escaped so you can now also do things like this

```bash
lando php -e "phpinfo();"
lando terminus remote:drush "$SITE.$ENV" -- cr --all -y
lando mysql -e "show variables;"
```

### More Landofiles

You can now use pre and post [Landofiles](https://docs.devwithlando.io/config/lando.html) to set base and overrides configurations. You can do the following things:

#### Base File

If you are developing a project start state or have a set of Lando configurations you'd like to ship with all your projects you can use a "base" file with defaults that can then be overriden by your usual `.lando.yml`. By default Lando will detect any of the following files automatically and load them before your `.lando.yml`

```bash
.lando.base.yml
.lando.dist.yml
.lando.upstream.yml
```

#### Override File

On the flip side you might have some user-specific configuration you'd like to use **on only your computer**. For these situations Lando similarly offers an "override" file that will be loaded **AFTER** all base files and your `.lando.yml`. Generally you will want to `.gitignore` this file.

```bash
.lando.local.yml
```

### Restart vs. Rebuild

If you change your Landofiles you now need to explicitly run `lando rebuild` instead of running `lando restart`. This helps to provide stability between restarts until you explicitly ask for things to change and vastly speeds up stops and starts.

**old**

*changed .lando.yml*

```bash
lando restart
```

**new**

*changed .lando.yml*

```bash
lando rebuild -y
```

### Lando init

We've completely reworked [`lando init`](https://docs.devwithlando.io/cli/init.html) to be more modular and intuitive. This means if you've got scripts relying on `lando init` you will likely need to make some changes. While there are many changes the biggest are the removal of the "init method" in favor of the `--source` option.


**old**

```bash
lando init pantheon
```

**new**

```bash
lando init --source pantheon
```

### No Registry

There is no longer a register of apps stored at `~/.lando/cache/registry`. As a consequence you can no longer do things like `lando start MYAPP`

**old**

```bash
lando start MYAPP
```

**new**

```bash
cd /path/to/MYAPP
lando start
```

### Environment Files

You now have to explicitly set the top level [`env_file`](./../config/env.md#environment-files) if you want to load a `env` file.

**old**

*Had a `.env` file in Lando root directory*

**new**

```yaml
env_file:
  - .env
```

### Drush Handling

We've vastly simplified our [Drush handling](https://docs.devwithlando.io/tutorials/drupal8.md#using-drush). You can now only set `drush` to a particular version for global installation. If you've installed `drush` via `composer` then Lando will use that version instead of the one in your Landofile.

**old**

```yaml
recipe: drupal8
config:
  drush: none
```

```yaml
recipe: drupal8
config:
  drush: composer
```

```yaml
recipe: drupal8
config:
  drush: /path/to/my/drush
```

**new**

```yaml
recipe: drupal8
```

```yaml
recipe: drupal8
config:
  drush: 8.1.15
```

### Global Opts

Lando no longer uses [`--`](https://github.com/lando/lando/blob/v3.0.0-rc.1/docs/cli/usage.md#global-options) to differentiate between its options and tooling options.

**old**

```bash
# Verbose modes
lando start -- -v
lando start -- -vv
lando start -- -vvv
lando start -- -vvvv

# Lando help
lando start -- --help
```

**new**

```bash
# Verbose modes
lando start -v
lando start -vv
lando start -vvv
lando start -vvvv

# Lando help
lando start --lando
```

A nice consequence of this is you can now use `--` in other tooling commands and have more predictable tooling results

```bash
# Use -- in a command
lando terminus remote:drush "$SITE.$ENV" -- cr --all -y

# Worry less about escaping crap
lando php -e "phpinfo();"
```

### Plugins

If you have written your own custom plugins

1. Sorry!! :/
2. Once you see the new format you'll feel better :)

We've finally locked down a [Plugin System](http://docs.devwithlando.io/dev/plugins.html) that uses the [Lando](http://docs.devwithlando.io/api/lando.html) and [App](http://docs.devwithlando.io/api/app.html) APIs and while we still don't have a great way to manage the installation and management of these plugins, it is going to be the defining feature of `3.1.0`.

### Bug Fixes

Here is the complete list of changes in RC2.

* Added a `LANDO_HOST_USER` envvar [#1082](https://github.com/lando/lando/issues/1082)
* Added `inquirer-autocomplete-prompt` to select inquirer prompts [#1017](https://github.com/lando/lando/issues/1017)
* Added configurable support for `pre` and `post` `.lando.*.yml` source files eg `.lando.[#local|dist].yml` [#759](https://github.com/lando/lando/pulls/759) [#1154](https://github.com/lando/lando/pulls/1154)
* Added support for `elasticsearch` `6` [#1114](https://github.com/lando/lando/pulls/1114)
* Added support for multiple, user-defined `env` files [#994](https://github.com/lando/lando/pulls/994) [#1045](https://github.com/lando/lando/pulls/1045) [#1265](https://github.com/lando/lando/pulls/1265) [#1242](https://github.com/lando/lando/pulls/1242)
* Added support for `ruby` `2.5` [#1068](https://github.com/lando/lando/pulls/1068)
* Added `pcntl` extension to all PHP images [#910](https://github.com/lando/lando/pulls/910)
* Added `leia` to help keep `lando` the real hero we all know he is [#1296](https://github.com/lando/lando/issues/1296)
* Added a better message if users arrive at an "impossible" place [#1158](https://github.com/lando/lando/issues/1158)
* Bumped `xdebug.max_nesting_level` to `512` [#1094](https://github.com/lando/lando/issues/1094)
* Changed `rebuild` events to fire on the outside [#1352](https://github.com/lando/lando/issues/1352)
* Changed `ssh` key loading to also load passphrase protected keys by default [#1288](https://github.com/lando/lando/issues/1288) [#1143](https://github.com/lando/lando/issues/1143) [#808](https://github.com/lando/lando/issues/808)
* Changed default `http_resp_hdr_len` for `varnish` to `64000` [#1142](https://github.com/lando/lando/issues/1142)
* Changed `xdebug: false` to actually disable the `php` extension [#760](https://github.com/lando/lando/issues/760)
* Changed update warning to print to `stderr` [#1000](https://github.com/lando/lando/issues/1000)
* Changed `wordpress` recipe to download `wp-cli` version `1.5.1` if using php 5.3 [#1334](https://github.com/lando/lando/issues/1334)
* Changed PHP to have unlimited memory for CLI ops [#732](https://github.com/lando/lando/issues/732)
* Fixed `postgres` config loading preventing outside connections [#1379](https://github.com/lando/lando/issues/1379)
* Fixed busted auto-naming on Windows deploy [#1375](https://github.com/lando/lando/issues/1375)
* Fixed busted `drush` global-local handoff on Pantheon [#1375](https://github.com/lando/lando/issues/1375)
* Fixed regression in `LANDO_INFO` causing services to be index values instead of names [#1376](https://github.com/lando/lando/issues/1376)
* Fixed regression causing databases to report as unhealthy after a restart [#1381](https://github.com/lando/lando/issues/1381)
* Fixed tooling on Windows to not always run as root [#1362](https://github.com/lando/lando/issues/1362)
* Fixed annoying recoverable php error `Cannot set 'user' save handler by ini_set()` on php 7.2 [#747](https://github.com/lando/lando/issues/747)
* Fixed bug where files `rsync`ed from Pantheon were being set to `750` [#1325](https://github.com/lando/lando/issues/1325) [#1067](https://github.com/lando/lando/issues/1067) [#1330](https://github.com/lando/lando/issues/1330)
* Fixed longstanding permissions bug with legacy `solr` version `3.6` [#692](https://github.com/lando/lando/issues/692)
* Fixed bug where not-owned-by-me `.ssh` config was blowing up `ssh` key loading [#1203](https://github.com/lando/lando/issues/1203)
* Fixed bug causing `mysql`, `mariadb` and `postgres` services to intermittently crash on `lando restart` [#1381](https://github.com/lando/lando/issues/1381)
* Fixed regression in `events` caused by "multi word" tooling eg `command [something]`
* Fixed regression in `lando logs --service SERVICE` not actually filtering [#1386](https://github.com/lando/lando/issues/1386)
* Fixed long-standing race condition causing build fail perimission errors on `linux` [#1227](https://github.com/lando/lando/issues/1227) [#1197](https://github.com/lando/lando/issues/1197) [#1170](https://github.com/lando/lando/issues/1170)
* Fixed bug where `docker-compose` files were not loading correctly outside of the app root [#1007](https://github.com/lando/lando/issues/1007)
* Fixed bug where `node` services were not getting the `gid` correctly on `linux` [#1240](https://github.com/lando/lando/issues/1240)
* Fixed bug where cyclical `app -> app` symlink was being create in `pantheon` recipes [#1043](https://github.com/lando/lando/issues/1043)
* Fixed various `solr` config bugs [#1249](https://github.com/lando/lando/issues/1249) [#1350](https://github.com/lando/lando/issues/1350) [#1319](https://github.com/lando/lando/issues/1319) [#1351](https://github.com/lando/lando/issues/1351)
* Increased events `maxListeners` to `64` [#1097](https://github.com/lando/lando/issues/1097)
* Improved tooling is-service-already-running delegation [#1378](https://github.com/lando/lando/issues/1378)
* Improved `drush` handling, fixes [#1315](https://github.com/lando/lando/issues/1315) [#1317](https://github.com/lando/lando/issues/1317) [#1318](https://github.com/lando/lando/issues/1318)
* Improved `ssh` key loading to use the `LANDO_HOST_USER` by default [#1082](https://github.com/lando/lando/issues/1082)
* Improved handling when an unknown service is used with the `proxy` [#1389](https://github.com/lando/lando/issues/1389)
* Removed `lando` "global options", fixes [#1173](https://github.com/lando/lando/issues/1173)
* Upgraded `terminus` to version `1.9.0` [#1259](https://github.com/lando/lando/issues/1259)
* Upgraded `docker` to version `18.09.0/2.0.0.2` [#1297](https://github.com/lando/lando/issues/1297) [#1316](https://github.com/lando/lando/issues/1316)
* Upgraded `docker-compose` to version `1.23.2` [#1297](https://github.com/lando/lando/issues/1297) [#1316](https://github.com/lando/lando/issues/1316)

How do I update to use all the magix in RC2?
--------------------------------------------

https://docs.devwithlando.io/guides/updating-to-rc2.html

Conclusion
----------

![yes-winning](https://media.giphy.com/media/jNdw5Qmy5MOpq/giphy.gif "take a break take a drink")
