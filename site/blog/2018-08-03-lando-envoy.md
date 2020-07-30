---
layout: Post
title: 'Lando + Envoy'
tags:
    - development
    - drupal
    - wordpress
    - laravel
author: 'Geoff St. Pierre'
private: false
mainImage: images/articles/envoy-linode/lando-y-envoy-y-linode.jpg
img-src: images/articles/envoy-linode/lando-y-envoy-y-linode.jpg
byline: 'Learn to automate deploy steps with envoy on affordable hosting.'
date: '2018-08-03'
meta:
    - { name: description, content: 'Learn to automate deploy steps with envoy on affordable hosting.' }
    - { name: keywords, content: 'development,drupal,wordpress,laravel' }
---

Why Envoy
---------

<a href="https://laravel.com/docs/5.6/envoy">Envoy</a> is a task runner put together by the <a href="https://laravel.com">Laravel</a> team. When I can I like to use hosts like Pantheon and Platform.sh that give me a wealth of tools, containers in production, and a lot less DevOps headaches when something like <a href="http://heartbleed.com/">Heartbleed</a> happens 😱. 

That said not all clients can afford the hosting costs of these providers 💸. And then <a href="https://linode.com">Linode</a>, <a href="https://www.digitalocean.com">Digital Ocean</a>, or <a href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=ACQ-P%7CPS-GO%7CBrand%7CSU%7CCore%7CCore%7CUS%7CEN%7CText&sc_content=sitelink&sc_detail=aws&sc_category=core&sc_segment=what_is_cloud_computing&sc_matchtype=e&sc_country=US&s_kwcid=AL!4422!3!280392801017!e!!g!!aws&ef_id=WgzYSgAAAGNYiE_V:20180729121503:s">AWS</a> become good choices starting at as little as $5/mo. So when working on your family member or friends website with affordable hosting we can use `envoy` to automate our deploy steps and get some of that deploy consistency that we know and love from the big hosting providers.

This post will show you how to add `envoy` as tooling to <a href="https://docs.devwithlando.io">Lando</a>. The particular app in this example is <a href="https://backdropcms.org">Backdrop CMS</a>, but any PHP app can take advantage of Envoy, really any app (but non PHP devs prolly not looking for ways to add PHP to the mix 😈).  Apps like WordPress, Symfony, Backdrop, Drupal, and of course Laravel are a perfect fit.

Install Envoy
-------------

To add `envoy` tooling to your `.lando.yml` file add the following `run` step:

```yaml
services:
  appserver:
    run:
      - cd $LANDO_MOUNT && composer install
      - composer global require laravel/envoy
```

And a corresponding `tooling` entry:

```yaml
# See: https://docs.lndo.io/config/tooling.html
tooling:
  envoy:
    service: appserver
```

Now we are ready to start using Envoy, but first let's configure it.

Configure Envoy
---------------

To use Envoy you will set up a file in the root of your project called: `Envoy.blade.php`. Here is mine:

```php
@servers(['web' => ['USER@SERVER_IP']])

@task('ll', ['on' => 'web'])
  cd /var/www/serundeputy
  ls -alh
@endtask

@task('deploy', ['on' => 'web'])
  cd /var/www/serundeputy
  @if ($branch)
    git pull origin {{ $branch }}
  @endif
  composer install
  cd /var/www/serundeputy/www
  drush updb -y
  drush bcim -y
  drush cc all
@endtask
```

The `Envoy.blade.php` file uses Laravel blade syntax and in it we define `servers` array and some `task`s.  In this example you'll want to replace `USER` with a user that has `ssh` access to the server in question and `SERVER_IP` with the `ip address` of the server you are deploying to.

In the `deploy` task we simply write the shell commands that we want to happen for our app.  In this case move to the app directory, run composer install, and some drush commands. That is it, so simple! 

You don't have to worry about different people doing different steps, forgetting steps, or typing something incorrectly. Consistency and peace of mind ☮️.

You can define as many or few `task`s as you need. For example you could break out the deploy task to separate `deploy-staging` and `deploy-production` tasks.

Run an Envoy Deploy
-------------------

Now that we have our tasks set up in our `Envoy.blade.php` file we can run them. For example to `deploy` run:

```bash
lando envoy run deploy --branch=master
```

Running this one command runs all the tasks in the `deploy` task!

Conclusion
----------

Consistency. No need to ssh into the server. No danger of running unwanted commands on the server. No leaving the shell open on a production server session for your cat to walk across your keyboard 🐈. Just the things you want and need to happen for your app.

Tools and Resources:
<ul>
<li><a href="https://laravel.com/docs/5.6/envoy">Envoy</a> ~ Run tasks on your remote servers.</li>
<li><a href="https://docs.devwithlando.io">Lando</a> ~ A flexible local dev environment based on docker.</li>
</ul>

This post originally appeared on <a href="https://serundeputy.io">serundeputy.io</a>

