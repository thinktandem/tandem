---
layout: Post
title: 'How To Stop An Intelligent Spambot'
tags:
    - development
    - support
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/stop-spam.jpg
img-src: images/articles/stop-spam.jpg
byline: 'Most sites are susceptible to spam bot attacks regardless of what you may have installed.  This little trick will aid in preventing bots from swarming your site.'
date: '2017-12-27'
meta:
    - { name: description, content: 'Most sites are susceptible to spam bot attacks regardless of what you may have installed.  This little trick will aid in preventing bots from swarming your site.' }
    - { name: keywords, content: 'development,support,drupal' }
---

_This article focuses primarily on stopping spammers via PHP and Drupal.  However, the same principle can be applied to any language and CMS._

What are Bots
-------------

Spambots are malicious programs that search for susceptible entry points into a site.  They can do this in a variety of ways: injecting scripts into forms, buying hacked email addresses, known security flaws in certain CMS's, etc.  For quite sometime, spambots were fairly simple and a captcha was a good enough measure for stopping spammers.  However, today, spambots are advanced algorithm based mechanisms that can cause mass havoc on a site.  One prime example of this was the onliner spambot that [hit the internet this past summer](http://www.bbc.com/news/technology-41095606).  It seems that the people who are coding these spambots are one step ahead of us at all times.

Our Client's Issue
------------------

We have a client that is on Drupal 7.  For years, I have used the same method to prevent form spam without a captcha.  Utilizing the [http:BL](https://www.drupal.org/project/httpbl) and [honeypot](https://www.drupal.org/project/honeypot) module prevented spam sign ups and kept all spambots out.  However, last month they started to get several thousand spam user registrations on the site per day.

This client also lets new users create a specific piece of content for their user accounts as well.  So, we began to see spam content for movies, mma fights, etc show up on social sharing platforms.  The spam bots had us pinned down and I tried numerous mechanisms to stop the spam attack to no avail.

I went through various checks to make sure the site wasn't hacked.  I made sure there were no know susceptible entry points that were open.  I tried several contrib modules that other people wrote blogs about.  My efforts only slowed the attack down momentarily it seemed.  Within a short time frame, we were back to hundreds of spam sign ups per hour.  I needed to step back and instead of fighting the symptoms, I needed to treat the cause.

Know your enemy and know yourself
---------------------------------

Nothing I was doing was stopping the spambots.  They were hitting the site like a barbarian horde and I felt powerless to stop it.  The only way I was going to be able to stop the spambots was to think the same way they were.

I began googling various topics from creating a spam bot, to getting past spam measures, to beating captchas. I stumbled across [this presentation](https://www.blackhat.com/docs/asia-16/materials/asia-16-Sivakorn-Im-Not-a-Human-Breaking-the-Google-reCAPTCHA.pdf) from some black hat convention last year.  The transcript from this presentation [is in this pdf](https://www.blackhat.com/docs/asia-16/materials/asia-16-Sivakorn-Im-Not-a-Human-Breaking-the-Google-reCAPTCHA-wp.pdf).  Within this presentation is a treasure trove of information on how hackers get past all our typical anti-spam measures.

I read through the transcript and almost came to the conclusion that spambots have evolved too much.  I almost lost faith until I kept staring at the User Agent section.  A spambot can get around a misconfigured User Agent fairly easily, but nothing is noted about a malformed User Agent.  Was this my thermal exhaust port or was I just guessing here.

I also had to understand the anatomy of the attack in order to stop the spam bots.  I watched the user page for a while and took notes.  I noticed that there were legit human users signing up, then a flood of bot like registrations.  It seemed they were utilizing the token harvesting method of spam attacks.  What if Google invalidated all the cookies / tokens that the legitimate users were passing to the spam bots?  This seemed the best course of action to mitigate this spam attack.

With this knowledge in hand, I believe I have found what may make these spambots susceptible to defeat. If the spambots tried to use their generated token / cookie on a page with a malformed User Agent, it should reissue the challenge and / or use the fallback.  Regardless, the spambot would not get past the challenge easily.

You're all clear kid now let's blow this thing and go home
-----------------------------------------------------------

I setup the [reCaptcha module](https://www.drupal.org/project/google_recaptcha) on the site as a starting point.  My next step was to malform the User Agent before the page cache kicked in.  Since this is a Drupal 7 site, I could do this in settings.php or with ```hook_boot```.  If you are on a Drupal 8 site, you can use settings.php or [use this article](https://chromatichq.com/blog/replacing-hookboot-and-hookinit-functionality-drupal-8) to modularize your spam bot defense.

Here is the code that I used:

```php
// Add random string onto end of User Agent to invalidate all User Agents.
// When hitting the google recaptcha enabled user registration page.
$check = strtolower($_SERVER['REQUEST_URI']);
if (strpos($check, 'user/register') !== FALSE) {
  $_SERVER['HTTP_USER_AGENT'] .= ' ' . bin2hex(openssl_random_pseudo_bytes(20));
}
```

With this code I am malforming the User Agent on the point of the spam attack, which was the user registration page.  In theory and based on my research, this should do the trick.  I ran the following curl requests to check the User Agents against the user registration page:

```bash
curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36" http://SITE.lndo.site/user/register

curl -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36" http://SITE.lndo.site/user/register
```

I also wrote a little script I modified from the ```drupal_debug``` function to get the results.  I put this script right below the User Agent malforming code.

```php
$td = variable_get('file_temporary_path', NULL);
if (!empty($td)) {
  $out = print_r($_SERVER['HTTP_USER_AGENT'], TRUE) . "\n";
  $file = $td . '/user_agents.txt';
  file_put_contents($file, $out, FILE_APPEND);
}
```

To test it, I went into the temporary directory for the site and ran ```cat user_agents.txt```.  The results showed that this was working as expected:

```bash
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36 4fe88001dac059edb824274aa71449904aa8bbbc

Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36 40a6af406455d88088df7f9c168e3d91bc4feb88
```

Within 10 minutes, it seemed there were no more spambot type user registrations.  The human based spam accounts were still getting through, but they weren't the main issue.  Within a day the human spambots gave up and moved on.  The site and indirectly the universe was saved and the client found inner peace.

Conclusion
----------

Spambots have become quite intelligent and will continue to do so.  When traditional methods do not stop spam attacks, you need to invent a new strategy.  Spambots will always try and maliciously harm our sites.  We need to be one step ahead of them at all times to keep the universe in balance.
