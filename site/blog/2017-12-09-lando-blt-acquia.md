---
layout: Post
title: 'Lando + BLT + Acquia'
tags:
    - development
    - devops
    - drupal
author: 'Geoff St. Pierre'
private: false
mainImage: images/articles/lando-blt-acquia/lando-blt-acquia.jpg
img-src: images/articles/lando-blt-acquia/lando-blt-acquia.jpg
byline: 'Pro workflow with Lando, BLT, and Acquia cloud.'
date: '2017-12-09'
---

Introduction
------------

[Acquia BLT](https://blt.readthedocs.io/en/latest/) is the Acquia Build Launch Tool (BLT). It can be a paradigm shift for many Drupal developers, but the idea is that your [`production` environment is an artifact of development](https://slides-production-artifact.herokuapp.com/#/). In brief, that is to say you need different things in your `dev` environment than what you need to run the `production` web application. BLT helps us embody this workflow by providing a build and deploy pipeline where we have all the tools we need and love in `dev` and with a simple `lando blt deploy` command the `production` artifact is generated, sanitized, and delivered to the Acquia Cloud. Awesome!

Init the Lando BLT Lightning App
--------------------------------

Make a directory for your new app and `cd` into it. Then, use the `lando init` command to get going:

```bash
lando init -r drupal8
```

Edit the resulting `.lando.yml` file and add the `tooling` key. This will make Lando aware of the `blt` command inside the app.

```yaml
name: lando-lightning
recipe: drupal8
config:
  webroot: lightning/docroot

tooling:
  blt:
    service: appserver
    cmd: /usr/bin/blt
```

Start the app.

```bash
lando start
```

Get a BLT Lightning App Codebase
--------------------------------

Install a BLT Lightning project with `composer`.

```bash
lando composer create-project --no-interaction acquia/blt-project lightning
```

Change directories into the new `lightning` app.

```bash
cd lightning
```

Tell BLT about your Acquia Cloud app by setting the `machine_name` in the `blt/project.yml` file to match the `machine_name` of your Acquia app from the dashboard. Also, make sure to use the `lightning` profile by checking that the line `name: lightning` indicates the `lightning` distribution. It should by default, but if it does not you should change it.

```yaml
project:
  machine_name: landolightning
  prefix: BLT
  human_name: 'Lando BLT Lightning'
  profile:
    name: lightning
```

Hook up the Lando command we defined earlier in `.lando.yml` to the `blt` executable cli tool wyth a symlink:

```bash
lando ssh -u root -c "ln -s /app/lightning/vendor/acquia/blt/bin/blt /usr/bin/blt"
```

Check that Lando has access to run `blt` commands

```bash
lando blt help
```

You should see `help` output similar to:

```bash
decoupled (master) $ lando blt help
[warning] The xDebug extension is loaded. This will significantly decrease performance.
Usage:
  help [options] [--] <command> [<command_name>]

Arguments:
  command               The command to execute
  command_name          The command name [default: "help"]

Options:
      --format=FORMAT   The output format (txt, xml, json, or md) [default: "txt"]
      --raw             To output raw command help
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -y, --yes             Answer all confirmations with "yes"
  -D, --define=DEFINE   Define a configuration item value. (multiple values allowed)
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Help:
  The help command displays help for a given command:

    php /usr/bin/blt help list

  You can also output the help in other formats by using the --format option:

    php /usr/bin/blt help --format=xml list

  To display the list of available commands, please use the list command.
```

Install Drupal via `blt`
------------------------

First, you have to change your database credentials. Open the file `sites/default/settings/local.settings.php` and update the creds like so:

```php
/**
 * Database configuration.
 */
$databases = array(
  'default' =>
  array(
    'default' =>
    array(
      'database' => 'drupal8',
      'username' => 'drupal8',
      'password' => 'drupal8',
      'host' => 'database',
      'port' => '3306',
      'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);
```

Now that the database creds are set, we are ready to install the site. Run:

```bash
lando blt setup
```

During this step, `drush` will output a random `username` and `password`. Make note of those so you can use them to login to your new site, or you can login with `lando drush uli` to generate a one-time login link.

Pro Tip
-------

Create or edit the `sites/default/local.drushrc.php` file to get nice URL output from `drush uli` add this line:

```php
$options['uri'] = "https://[LANDO-BLT].lndo.site";
```

Replace `LANDO-BLT` with the name of your app from the `.lando.yml` file.

Configure BLT `project.yml` to Deploy to Acquia Cloud
-----------------------------------------------------

Open the `lightning/blt/project.yml` file. Find the `git` key and add your Acquia git URL as a remote. Should look similar to this:

```yaml
git:
  default_branch: master
  remotes:
    - landolightning@svn-6488.devcloud.hosting.acquia.com:landolightning.git
```

Replace the `git` URL with a URL from your Acquia Cloud dashboard.

<center>
  <img src="images/articles/lando-blt-acquia/acquia-dash.jpg" alt="Acquia Cloud Dashboard Screenshot" />
</center>

Deploy to Acquia Cloud
----------------------

Now deploying to Acquia cloud is as simple as one command: `lando blt deploy`. This will run the build process, generate your production artifact, and push it to Acquia Cloud! 💯;

It will prompt you for a few options:

```bash
lightning (master) $ lando blt deploy
[warning] The xDebug extension is loaded. This will significantly decrease performance.
Typically, you would only create a tag if you currently have a tag checked out on your source repository.
 Would you like to create a tag? (y/n) n
 Enter a valid commit message [Adding memow module to landolightning.]
 Enter the branch name for the deployment artifact [master-build] master
```

By default the Acquia Cloud dev instance is on the `master` branch so in the above prompts you specify that (if you want it to deploy out to that environment).

Some Useful BLT Commands at your Finger Tips
--------------------------------------------

Try any or all of these commands:

```bash
# list targets
lando blt

# validate code via phpcs, php lint, composer validate, etc.
lando blt validate

# run phpunit tests
lando blt tests:phpunit

# ssh into vm & run behat tests
lando blt tests:behat

# diagnose issues
lando blt doctor

# download & require a new project
lando composer require drupal/ctools:^8.3.0

# build a deployment artifact
lando blt deploy:build

# build artifact and deploy to git.remotes
lando blt deploy

# update BLT
lando composer update acquia/blt --with-dependencies
```

Visit the [Acquia BLT Documentation](https://blt.readthedocs.io/en/latest/) to see the full power of the BLT system.

Conclusion
----------

⚡ Selecting the right tools can make your life easier; your app more stable; your clients happier. Everyone is a winner! Combine the best-in-breed tools from local dev with Lando to powerful scalable hosting with Acquia Cloud. ⚡
