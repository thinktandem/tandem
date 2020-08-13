---
title: 'Debugging with New Relic, BlazeMeter, strace & more'
tags:
    - development
    - support
    - drupal
    - johno
author: 'John Ouellet'
date: '2017-11-22'
summary: 'This is a start to finish mini case study surrounding a site crashing bug.  I will detail how I found the problems and then how I fixed them.'
id: johno
pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33'
location: Florida
---

The Issue Before Us
-------------------

Not that long ago, we brought on a well known non profit Drupal 7 site into our mix.  They are also a top 5000 ranking site based off of [Alexa](https://www.alexa.com/siteinfo).  At times they can have hundreds of thousands of page views in a given month.  The site was not built that well at the theming layer and had numerous performance issues.  We moved the site to [platform.sh](https://platform.sh/) and that seemed to put a band aid on said issues.

Last week, the band aid fell off and we nicked an artery.  While pushing up a suite of modules and enabling them on production, the site went down and it wasn't coming back up.  We had tested everything locally and on staging, so what went wrong?  I will layout the journey from hair pulling madness to pure zen.


The Site is stuck in a loop
----------------------------

We incorporate a fairly intricate testing regiment between [Lando](https://github.com/lando/lando), [Travis](https://travis-ci.com/) and Platform.  So anything code based would of caused the CI to fail.  We normally did not push a lot of code to the site, small fixes here and there, adding to features, etc.  This effort was the first big multi-feature / multi-module initiative we had done.  Just enabling modules, shouldn't crash a site, so something was definitely amiss.

After the site went into Cloudfront's 500 WSOD, I contacted Platform's support to try and get a cache clear on the CDN.  They informed me that my php workers on the site were in a racing condition.  I have yet to see this before and since they don't provide application support, they pointed me to [strace](https://linux.die.net/man/1/strace).  Learning new debugging mechanisms while a site is in failure is always a fun adventure!  (That's sarcasm kids)

It is actually a great tool to look at whats going on behind the scenes.  I read a few posts expeditiously and put together this command:

```bash
strace -f -tt -s 1024 -o /tmp/trace -p `pidof 'php5-fpm' | sed -e 's/ /,/g'`
```

What this command is doing is searching for all the current active php processes and their ids.  It will then spit them out to the trace file I specified. After a solid 30 seconds running that command, I stopped it with Ctrl+C.  I then pulled the log file down and searched through it for Timeout entries.  I kept seeing this fun tidbit throughout the file:

```bash
23:47:18.304181 poll([{fd=8, events=POLLIN|POLLPRI}], 1, 0) = 0 (Timeout) <0.000035>
23:47:18.304320 sendto(8, "D\0\0\0\0\0\0@\0\0\0\3SELECT expire, value FROM semaphore WHERE name = 'menu_rebuild'", 75, 0, NULL, 0) = 75 <0.000060>
```

It seemed the site was stuck trying to rebuild the menu, which can happen on init or cache clears.  I had seen this once before, many moons ago, so I knew how to debug it.  I opened up the includes/menu.inc file and added a debug statement below the opening of menu_rebuild:

```php
function menu_rebuild() {
  dd(debug_backtrace());
```

The site luckily did have devel enabled on it so I could call dd or drupal_debug.  If your site doesn't have devel enabled, just recreate the drupal_debug function and place it in the file and call it directly. What this will do is run the command you specify and spit it out to a file in your drupal tmp directory called drupal_debug.txt.  I then pulled that file down and saw that they site was getting stuck on the tracking_code_init() function over and over.  Was that the problem? [Tracking code](https://www.drupal.org/project/tracking_code) ran fine forever and I use it on numerous sites with zero problems.

I opened up the code base and looked at the tracking_code_init() function.  I noticed it called menu_get_object() and injected the header scripts for the site.  The call to menu_get_object() will eventually call menu_rebuild() in certain situations.  This site did not utilize any header scripts with this module.  I [submitted a patch](https://www.drupal.org/project/tracking_code/issues/2925281) to adjust the code to skip checking if there are no head scripts.

_As a side note, in the interim I changed the DNS to the staging server and the site was operating off a backup and functional._

The site also used [Redis](https://www.drupal.org/project/redis) and I decided to not have it cache the menu for the site as well. I wanted to eliminate any chance of the system get stuck again.  I added this to the [section of settings.php that had the Redis settings](https://docs.platform.sh/frameworks/drupal7/redis.html#via-settingsphp):

```php
$conf['cache_class_cache_menu'] = 'DrupalDatabaseCache';
```

I pushed up the code and saw that the caches cleared. It seemed this fixed the problem.  It did not feel right though to me.  Something felt dirty about this fix.  We moved the site back to production and switched the DNS.  I had to dig deeper and figure out what actually caused this, not just fix the symptom.


Blazemeter
----------

As I mentioned previously, all our testing prior worked famously on local and staging.  It only imploded on the production server.  So what is the main difference between the two I asked myself?  The answer is users, and a lot of users hitting the site at once.  How can I simulate a quasi live environment? This is where [BlazeMeter](https://www.blazemeter.com/) and it's [Drupal module](https://www.drupal.org/project/blazemeter) come into play.  BlazeMeter is a great tool to simulate load testing and it has a few other bells and whistles as well.

To provide a little more insight with what we were working with, caching was a problem with this site.  The people who built it decided in their infinite wisdom to build the site with 2 themes.  One for mobile and one for desktop.  Why would someone do this and not build a responsive site is beyond me.  However, due to this, page caching and other caching mechanisms would cache the wrong version of the page.  The site only used the basic Drupal configuration for caching and Redis (plus Varnish on the platform side).

Anywho, I knew this information going in but didn't realize how huge of an issue this was until I started the load testing.  BlazeMeter allows a free site to test 50 users at once 10 times before having to pay.  This is all I needed in this given testing situation.  The module provides an easy to use interface and you can simply load a test from within the site.  Kudos to [Tamer Zoubi](https://www.drupal.org/u/tamerzg) for making this module easy to use.

I made a test that 50 anonymous users that would view about 10 pages on the site with an extreme load.  I hit start and I sat back and watched it run for 20 minutes.I was amazed at how much data it was spitting out.  You can see the results below, but they were not good as you could imagine.  The site performed horribly under load and this is no bueno.

<img src="/images/articles/debugging-with-stuff/blazemeter-before.jpg" alt="BlazeMeter Before Tweaks Results">


New Relic
---------

While we we running the BlazeMeter tests, I had [New Relic](https://newrelic.com/) running in the background as well.  New Relic does have a trial account and I utilized their [APM Product](https://newrelic.com/application-monitoring).  Also, if you are on platform.sh, [here is how to setup New Relic](https://docs.platform.sh/administration/integrations/new-relic.html) for your environments.

New Relic works well with Drupal out of the box.  You can get a general sense of why a site is sad with the free account as well.  So I plugged in the site and watched the Drupal monitor as the site was getting pummeled by BlazeMeter.  No surprise here, the site did not perform well with little caching.  As you can see from the results, the site was taking a long time to do basic page loading:

<img src="/images/articles/debugging-with-stuff/newrelic-before.jpg" alt="New Relic Before Tweaks Results">

I knew I had to add more caching and fix the issues at hand.  I needed to roll up my sleeves and start fixing some of the backend issues that was preventing the site from caching.  Client gave the thumbs up to spend the extra time and off I went.


Cloudfront Issues
-----------------

While I was in the middle of this journey, the site went down two more times when cron kicked in and a cache clear was called.  When we initially moved the site, we experienced a few small downtime issues due to Cloudfront's 30 second time out rule.  We were able to band aid that and keep the site going for quite sometime.

Cloudfront also uses a mobile redirection header that we used in settings.php.  Odd thing was, sometimes it would cache this so it made mobile switching troublesome.  Another reason why the caching situation was what it was.

Another fun issue with Cloudfront was when the site went down, even though the site was fine, Cloudfront was still rendering a 500 error.  I was told they don't cache a 500 response, but it seemed to me they do.  There were times when i ran the ```top``` command it there was not a heavy load on the server, no logs were filling up, yet the site was still "down".

I have never really had good experiences with Cloudfront on other sites, so it was time to cut the cord.  Platform provides two CNAME urls when on boarding an enterprise client.  We had been using [Cloudflare](https://www.Cloudflare.com/) to manage their DNS only and not the http proxy.  I switched all the CNAMEs for the site and set up Cloudflare Pro account.  We enabled mobile redirection and about 10 page rules and a few other settings.  Instantly the site was exponentially happier.  No more time out issues, mobile rendering was perfected, I could clear the cache without fear!  Switching to Cloudflare I believe solved a bulk of the site's issues.


Modules & Low Hanging Fruit
---------------------------

To get the site up to snuff with everything but page caching, I used a few modules to help us out.  These are some, but not all modules I use on a majority of sites we support or build.

**Entity cache**

[Entity cache](https://www.drupal.org/project/entitycache) is a no brainer if your site is using Redis or Memcache. It works right out of the box and there is zero config to mess with.  Since this site also uses the [Bean](https://www.drupal.org/project/bean) module, I enabled their entity cache submodule as well.

**Views Cache Bully**

[Views Cache Bully](https://www.drupal.org/project/views_cache_bully) forces caching on all views throughout the site.  Their is a config page if you want to exclude certain views based on name or tags.  As you could see from the New Relic output, views were a major issue with the site.

**Advanced CSS/JS Aggregation**
[Advanced CSS/JS Aggregation](https://www.drupal.org/project/advagg) is a robust solution with numerous submodules that provide a wide array of advanced caching mechanisms. On managed platform like [platform.sh](https://platform.sh/) or [Pantheon](https://pantheon.io/) the module can't fully be used due to not having full server access. That is ok though, you can just do what I did: enable the base module and the bundler.  Set the bundler to the recommended settings based on your http protocol and that's it.  Also in your settings.php throw these config settings in as well:

```php
$conf['advagg_skip_far_future_check'] = TRUE;
$conf['advagg_skip_404_check'] = TRUE;
```

**Other things to check**

The site uses [Xautoload](https://www.drupal.org/project/xautoload) in some of its custom functionality.  If you go to your Performance page under Config you will see this module as additional caching options.  I enabled all of them except the Replace core class loader option.

I also went to the status page and fixed a few red lined items that had to do with missing libraries and advagg warnings.  I updated core and all modules that had critical releases as well. If you are looking to stay on top of module updates for all your sites, I highly recommend [Evercurrent](http://www.evercurrent.io/).  It gives you a dashboard to show all your sites and their modules that need updates.

I usually like to use the [Asynchronous Prefetch Database Query Cache](https://www.drupal.org/project/apdqc) module to add another layer of database caching on top of Redis.  However, it wasn't playing well on platform.sh.  My tests kept failing due to a max children error and I couldn't figure out the cause.  However, I did use some of it's database init_commands:

```php
$databases['default']['default']['mysql_db_type'] = 'mariadb';
$databases['default']['default']['init_commands']['join_buffer_size'] = "SET SESSION join_buffer_size = 8388608";
$databases['default']['default']['init_commands']['mrr_buffer_size'] = "SET SESSION mrr_buffer_size = 8388608";
$databases['default']['default']['init_commands']['innodb_lock_wait_timeout'] = "SET SESSION innodb_lock_wait_timeout = 25";
$databases['default']['default']['init_commands']['isolation'] = "SET SESSION tx_isolation='READ-COMMITTED'";
```

With all of this said and done.  I reran the tests (this was pre moving to Cloudflare) on the staging server with my fixes and changes.  As you can see from the BlazeMeter tests, things became exponentially better:

<img src="/images/articles/debugging-with-stuff/blazemeter-after.jpg" alt="BlazeMeter After Tweaks Results">

Here is the full New Relic testing graph.  The two little blips at 8 am and 9 am are when I tested the site again.  As you can see the site drastically improved:

<img src="/images/articles/debugging-with-stuff/newrelic-after.jpg" alt="New Relic After Tweaks Results">

So that solved a majority of the issues except the page caching and mobile switching.


Mobile switching & page caching.
--------------------------------

There seems to be a long standing issue with theme switching on the seem url while the page is cached.  I found dozens upon dozens of issues in core and in various modules.  There wasn't really a solid easy to use solution. I would of never built the site like this and we had to work with what we had.  I did more digging and found that they were starting to address the issue in Drupal 8.  While that isn't relevant to what I was doing, it gave me a starting point.

I thought about it long and hard and the only way to fix this was to issue a patch to core. I usually never ever touch core as I was trained that way.  However, this is an open source project and its contributors are what make this thing thrive.  So I tried a few different scenarios and came up with my [first core patch](https://www.drupal.org/project/drupal/issues/2924665).  I created a way for developers to hook into the page cache cid mechanism and add what they needed.  This solved the issue at hand.

I then created a module to inject a user agent based response into the cid:

```php
/**
 * Implements hook_page_cache_cid_alter().
 */
function THE_MODULE_page_cache_cid_alter(&$cid_bits) {
  // A good chunk of phone based user agents.
  $agents = array(
    'iphone','ipod','nexus','bb10','blackberry','sm-','ppc6800', 'kv6800',
    'bahamas','desire','dream','evo','hero','incredible','legend','magic',
    'sensation','st7377','tattoo','lg-lx550','polaris','lg-gc900','mda pro',
    'droid','mot-l7','milestone','motorizr','mot-v9mm','mot-v177','xoom',
    'nokia','palm'
  );

  // Check the user agent.
  foreach ($agents as $agent) {
    $check = strtolower($_SERVER['HTTP_USER_AGENT']);
    if (strpos($check, $agent) !== FALSE) {
      variable_set('is_mobile_site', TRUE);
      $cid_bits[] = $agent;
    }
  }

  // Just return desktop otherwise.
  $cid_bits[] = 'desktop';
}
```

This is a quick and simple way of doing this.  I went through a chunk of the user agents [I found from this gist](https://gist.github.com/enginnr/ed572cf5c324ad04ff2e) and added as many as I could.  It is not the most elegant solution, but it does work.  I was thinking about tinkering around with [this parser library](https://github.com/ThaDafinser/UserAgentParser), but I am not sure how autoloading and boot will work.  More to follow on that one.

I also noticed that on a lot of pages, page caching wasn't kicking in after my fixes above.  They have a newsletter sign up form on a majority of their pages.  We also used [honeypot](https://www.drupal.org/project/honeypot) to help with SPAM protection.  When you have the time restriction enabled in the module config, it disables page caching.  So I changed the time restriction setting to 0 and all the pages started to cache.  The mobile redirection was working and all seemed well.

I ran one more BlazeMeter staging with everything fixed and Cloudflare enabled.  It is like night and day from where I started:

<img src="/images/articles/debugging-with-stuff/blazemeter-final.jpg" alt="BlazeMeter Final Results">


cache_form issue
----------------

Once the site was running optimally, I went to move the database to staging and noticed it was massive.  That is odd, when I ran a [mysql command to find the largest tables](https://www.percona.com/blog/2008/02/04/finding-out-largest-tables-on-mysql-server/), I discovered cache_form was a bloated beast.  I did some research and this is also a long standing issue as well.  It is fixed in Drupal 8, but that doesn't help me on this Drupal 7 site.

I did some research and came across the [OptimizeDB](https://www.drupal.org/project/optimizedb) module.  It is a robust module that does a lot.  I really just needed a small chunk of its functionality without all the flare around it.  The site justs needs to clear out the expired cache_form entries on cron runs.

So, I just wrote a simple little cron and queue mechanism to do this:

```php
/**
 * Implements hook_cron_queue_info()
 */
function THE MODULE_cron_queue_info() {
  // Set up the worker queue.
  $queues['THE MODULE_queue'] = array(
    'worker callback' => 'THE MODULE_queue_process',
    'time' => 600,
  );
  return $queues;
}

/**
 * Implements hook_cron()
 */
function THE MODULE_cron() {
  // Load up our worker queue.
  $queue = DrupalQueue::get('THE MODULE_queue');

  // Set up the query for expired results.
  $sql = "SELECT cid FROM {cache_form} WHERE expire < :time";
  $query = db_query($sql, array(':time' => REQUEST_TIME));
  $results = $query->fetchAll(PDO::FETCH_ASSOC);

  // Split this into chunks for safety and speed.
  $chunks = array_chunk($results, 5000);
  foreach ($chunks as $chunk) {
    // Add the chunk to the queue worker.
    $queue->createItem($chunk);
  }
}

/**
 * Worker callback defined in hook_cron_queue_info().
 *
 * @param array $data
 *   The array of cids we want to delete.
 */
function THE MODULE_queue_process($data) {
  db_delete('cache_form')
    ->condition('cid', $data, 'IN')
    ->execute();
}

```

I use [Elysia Cron](https://www.drupal.org/project/elysia_cron) on the site as I do on all my sites.  Platform.sh also allows us to [set up cron runs via their .platform.app.yaml file](https://docs.platform.sh/configuration/app/cron.html).  If you don't use platform.sh, I recommend using an external cron service like [EasyCron](https://www.easycron.com/).  The site cron runs every 5 minutes in my setup for this site.  I made the cron for this mechanism run every 10 minutes and the queue run every 30 minutes.  this keeps the cache_form table from getting bloated and cumbersome.


Conclusion
----------

When dealing with systemic issues, trust your gut.  Cloudfront was a major factor in this site not working optimally.  I was told but various people it was the site.  They were correct, but not 100% accurate.  Once I switched the site to Cloudflare, along my fixes I did on the backend, true nirvana was reached.  It is a long process to solve something like this, but never give up, never surrender!
