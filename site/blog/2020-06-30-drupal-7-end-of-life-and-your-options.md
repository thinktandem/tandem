---
title: 'Drupal 7 End of Life and Your Options'
tags:
    - support
    - drupal
    - alecr
author: 'Alec Reynolds'
date: '2020-06-30'
summary: 'A guide to Drupal 7 end of life and your options.'
id: alecr
pic: 'https://www.gravatar.com/avatar/f274dbe2c9fbaac8339c01d918ba50b5'
location: California
---

The end is near! Drupal 7's official end of life date is November 2022, and if you're one of the over [750,000 Drupal site owners](https://www.drupal.org/project/usage/drupal) who haven't made the leap to Drupal 8/9, you're probably wondering what the next step for your Drupal 7 site should be.

### What Does Drupal 7 "End of Life" Mean?

Come Drupal 7's end of life date in November of 2022, the Drupal community will stop to formally support Drupal 7. Drupal 7's end of life date was actually supposed to occur on November 2021, but the [Drupal Security Team announced](https://www.drupal.org/psa-2020-06-24) that this date would be extended a whole year to 2022 in an effort to help businesses struck by the the COVID-19 economic crisis have more time to make the investment in a migration.

But what does dropping community support actually mean? Drupal 7 end of life will have 3 major impacts:

#### 1. Drupal.org will stop issuing security updates for Drupal 7.

This means any vulnerabilities that are discovered impacting Drupal 7 will no longer receive a formal security announcement and updates.

#### 2. No new modules or updates for existing ones.

You've probably already noticed that there are very few new Drupal 7 modules and that updates for existing modules have slowed to a crawl, with most effort being made to simply put out security fixes. Since the release of Drupal 8 in 2015, development has almost entirely shifted to the module ecosystem around Drupal 8 + 9. Drupal 7 end of life will mean that this trickle of Drupal 7 module development will cease.

#### 3. Reduced Support

Even after Drupal 8's release, for years most Google searches for Drupal questions came up with articles dealing with Drupal 7. That's no surprise; since its release in 2011, Drupal 7 has been the longest serving and most popular Drupal version  in the CMS's nearly two decade history.

This started to change around 2018 as the tide of new development turned towards Drupal 8. There's still tons of great material on building and supporting Drupal 7 websites, but you'll find that support requests on Drupal.org for Drupal 7-specific questions are harder to get answered. By Drupal 7's end of life date in November 2022, expect finding free assistance from the Drupal community for Drupal 7 websites to be nearly impossible.

### What Are My Options?

You've acknowledged that in the near future you'll need to update your Drupal 7 website. This might seem kind of scary; if you've been a long-time Drupal site owner, you may remember that Drupal upgrades can be expensive, as can moving to a new CMS like WordPress. It can be daunting to consider such a project, especially if your departmental budget just got slashed or if you've recently redesigned your existing website.

Fortunately, there are options for managing Drupal 7 end of life that fit every organization's budgetary and strategic needs. We'll look at:

1.  Drupal 7 Long Term Support (LTS)
2.  Archiving Your Site
3.  Migrating to Drupal 9
4.  Migrating to a new CMS (WordPress)

It's worth mentioning that, when Drupal 8 was released, some members in the Drupal community chose to fork Drupal 7 to create Backdrop CMS. Backdrop preserves much of the Drupal 7 admin and developer experience. We've done some migrations to Backdrop and believe it's a good option for siteowners who have some development experience with Drupal and don't want to learn the (significantly different) standards for Drupal 8 and 9. However, because the Backdrop community is much smaller than the Drupal community, we see less active development of modules, which rules it out as an option for most organizations who want to benefit from Drupal's powerful ecosystem of community developed modules.

### Drupal 7 Long Term Support (LTS)

The Drupal security team has vetted several vendors to help produce security patches for Drupal 7 after its formal end of life. These "Drupal 7 LTS" versions will backport applicable fixes from the active Drupal 9 development and apply fixes to Drupal 7-specific reported vulnerabilities.

**Advantages**

-   Cheap: Unless you've had a developer who has hacked your Drupal core (a BIG no-no in Drupal development), this will be your least expensive way of keeping your D7 website secure and running.

-   Fast: Moving to D7 LTS should take a developer under an hour for a healthy Drupal 7 website.

**Disadvantages**

-   Short-term Fix: Expect Drupal 7 LTS to fade out ~2025.
-   Prevents Redesigns/New Development: If you're looking to add more features to your website or give it a facelift, you'll be stuck with whatever modules existed for Drupal 7.
-   Less Secure: Updates won't be available for contributed modules.

We recommend D7 LTS to any organization who wants to "archive" their website for another couple years. If you're happy with your website and won't be working on it for the foreseeable future, then D7 LTS will make sure a security vulnerability doesn't turn your website into a spam server for Viagra. For $200-500 or so, you get a couple more years of life out of your website.

However, for any modern organization that relies on its website to bring in sales, donations, job prospects, or other vital strategic goals, D7 LTS will be unsatisfactory. Your website needs to stay a lean, mean, conversion-generating machine; without new modules you'll find it harder to develop landing pages and features you need.

### Archiving Your Site

Sometimes a website is dead, but you don't want it forgotten. A great example is one of our clients, interACT, who have a legacy domain (ISNA.org) on an old Drupal 5 site(!) that still garnered thousands of visitors each month. interACT had moved on to different advocacy efforts, but the old domain was still an important resource that deserved to exist separate from their new website.

For groups like interACT, we recommend "archiving" the website: using a static site generator like [VuePress](https://vuepress.vuejs.org/) to transform the pages into raw HTML and obviate the need for a CMS.

**Advantages**

-   Inexpensive: While it takes a little bit of configuration, archiving a site typically costs a few thousand dollars at most.
-   Lowest Cost of Ownership: Many sites can be hosted for free on [Netlify](https://www.netlify.com); even larger sites typically only cost $20-40/month.
-   Blazing Fast Performance: With no CMS backend, pages are delivered instantly to the user.
-   No Security Concerns: With no CMS, the "attack surface" (aka, things people can hack) is essentially zero. That means your site will never become a spam server or require maintenance contracts.

**Disadvantages**

-   Not Editable: You gave up the CMS, which means you won't be able to edit/add content as easily.
-   Sacrifice Custom Functionality: If you had custom features on your website that relied on Drupal 7's powerful backend you may not be able to preserve it. Think of special filters, map-based content, search features, etc.

Archiving is a very special case, not suitable for most site owners. However, we still recommend it for those rare cases where you want to keep a site around forever, but you don't really want to pay for it!

### Migrating to Drupal 9

For many Drupal site owners, this is probably the first option you consider.

**Advantages**

-   Future Friendly: Starting with Drupal 8, Drupal changed the way it handles major version upgrades to make them much less expensive.. Previously, migrating from D6 -> D7 or D7 -> D8 was a costly endeavor, akin to building a whole new website. In contrast, moving from Drupal 8 to Drupal 9 is a nearly push-button effort. You can expect your Drupal 9 website to be upgradable to Drupal 10 and beyond, providing a long-term solution to your CMS needs.
-   Huge Amount of Modules: Drupal 9 has a huge number of available community modules, with more being developed every day. It's extremely easy for module maintainers to upgrade their Drupal 8 modules to Drupal 9, meaning that even a few weeks after Drupal 9's launch, there are already thousands of modules to choose from.
-   Established Migration Pathway: Depending on the complexity of your website a Drupal 7 -> Drupal 9 migration can be tricky, but the powerful Migrate module has many tools to help developers migrate even the most complex Drupal 7 website to Drupal 9.
-   Start Fresh: You'll want to consider a website redesign at the same time you migrate to Drupal 9. Make a better website!
-   Push-button Upgrades to Drupal 10+: Once you're on Drupal 9, upgrading in the future will be extremely cost effective.

**Disadvantages**

-   Potentially Costly: An upgrade to Drupal 9 from Drupal 7 will require a developer to create a migration. Even if you want the website to look exactly the same, moving the "theme" over will require custom development. Small, simple websites may be easy to migrate to Drupal 9, but expect most migrations to cost upwards of $10K, with complex migrations often being much more expensive.

We recommend any organization that needs a powerful enterprise CMS to move their Drupal 7 website to Drupal 9. This is usually the best route for larger organizations or those who have complex custom functionality as part of their web experience.

However, we talk to many clients who haven't been served well by Drupal. Maybe the company's last CTO or CMO picked Drupal, but the current marketing staff doesn't have experience with it. Perhaps your website is fairly small and centered around content, without much need for custom features (what some people call a "brochureware" site). In these cases, you're probably already looking at moving to a different CMS, which leads us too...

### Migrating to a New CMS

You might think that moving from Drupal 7 to WordPress or another new CMS is the "nuclear option": throw away the old site, build a new one. While it's definitely true that this type of project shouldn't be taken lightly, it's often more comparable to a Drupal 9 upgrade than you might think.

**Advantages**

-   Find Your Ideal CMS: If Drupal isn't working for you, now you can find a CMS that fits your organization better. At a minimum, any modern CMS you consider should have a module or plugin ecosystem at least as big as Drupal's, as well as a very active community.

**Disadvantages**

-   Increases Complexity of Migration: If you have enough content that manually moving it over (copy-and-paste style) would be impossible, a programmatic migration to another CMS could be more complex than moving to Drupal 9.
-   The Devil You Know: Change for change's sake can produce unexpected results. We've seen organizations choose new CMSs, then end up encountering new pain points or never using the "essential" features that they migrated for. Make sure you know why you're changing CMSs and have gone through extensive hands-on demos, ideally even doing some "proof-of-concept" development to show what the new CMS will mean for your team.

We recommend any organization that isn't using Drupal's strengths to consider a new CMS, most often WordPress. Migrating to Drupal 9 and migrating to WordPress is usually roughly equivalent in cost, so the main consideration should be which CMS is better for your needs.

Smaller organizations can benefit from thinking outside the box of traditional CMSs. Hosted, software-as-a-service (SaaS) CMSs like Webflow, Hubspot CMS, and Shopify (for ecommerce) are very compelling for their low cost of ownership and ease-of-use. "Static" site generators like VuePress and Gatsby are a great option for websites where blinding fast performance is the top priority. Both SaaS CMSs and static site generators are ideal for websites that consist of < 30 pages and a blog, putting the emphasis on content over custom functionality.

### How to Make a Decision

Largely, your migration decision should be a referendum on Drupal and how well it serves your organization. If you need an enterprise-level CMS that's easy to extend with custom functionality, stick with Drupal and go to Drupal 9. If you're more interested in writing blog posts than coding new features, consider moving your legacy content from Drupal 7 into a new CMS like WordPress. If you're undecided and don't need to make an immediate decision, find a provider who can keep your D7 website updated and move you to Drupal 7 LTS (shameless plug: we have great inexpensive maintenance agreements).

For any approach, you'll want to find a partner who understands Drupal, but whose primary goal is finding the best CMS for you. Many developers and agencies have strong preferences for a given CMS; when they see that you have a Drupal 7 website, their migration plan is prewritten. Find a partner who listens to your needs, gives you hands-on demos of different CMSs, and provides recommendations that uncover requirements you hadn't even considered in selecting a CMS.

Contact Tandem and we can start figuring out how to surmount the challenge of Drupal 7 end of life for your organization.
