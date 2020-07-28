---
layout: Post
title: '2019 Development Workflow Essentials'
tags:
    - deployment
    - development
    - localdev
    - devops
author: 'Alec Reynolds'
private: false
mainImage: images/articles/workflow.jpg
img-src: images/articles/workflow.jpg
byline: 'Don''t get caught wearing last year''s dev workflow, see all the essentials for 2019.'
date: '2019-02-04'
---

## SVN is so 2009.

Your developers use SFTP because it's the fastest way to edit a site. Version control seems like a good idea, but it's been hard to find the right workflow that doesn't require shelling out money for Github accounts, managed hosting providers, and other accessories. You've heard of Docker and containers, but it's hard to think about moving off of hosting that's worked for years.

As the creators of [Lando](https://docs.devwithlando.io) and organizers of the Bay Area Drupal Camp DevOps Summit, we often hear from teams like yours. Often they're a bit afraid of being left behind, but also curious to see how other teams are handling the process of writing, testing, and deploying code.

If you're afraid that you're behind or even if you're just curious to see what other teams are doing, we're hear to give you a window into the basic best practices of web development in 2019. Keep in mind, this is a quick run-through of the BASICS, the fundamental components we recommend to all teams. Beyond these fundamentals you can accessorize to your hearts content, but make sure you have these pieces down!

## Basics

### 1. Version Control

Put all projects under **Git version control** and use that for deploying code changes. (Optional: Adopt Github as the central repository for better team-collaboration features like pull requests/issue management linked to code commits/etc.)

### 2. Configuration Management

Adopt an **"all in code"** approach on as many projects as practical. Modern professional CMSs should have configuration management tools available to do this; Drupal 7 had Features, WordPress has WP-CFM, and Drupal 8 has configuration management as a core feature.

### 3. Local Development

Use a **Docker-based local development solution** like [Lando](https://www.devwithlando.io). Your local development environment should support all operating systems (Mac/Linux/Windows) and be able to adapt to all the application frameworks you create projects with (Drupal/WordPress/Laravel/NodeJS/etc.), but be simple enough that any new developer can get working within a couple minutes. Integration with professional hosting providers (see below) is a big plus.

### 4. Professional Hosting

Find a provider whose platform has:

- **On-demand environments:** Do you have dev/stage/live environments? Can you spin up a new environment to test a specific new feature?

- **Modern CI features:** Does it allow you to run operations to build and test our application before it is is deployed to an environment? You'll care about this as you adopt more automated testing (see below) and other advanced topics later.

- **Push-button updates:** Can you get updates for your CMSs quickly and easily deployed?

- **Automated backup/restore:** Does the system automatically take backups and can you restore to a specific one quickly without contacting support?

- **Highly dynamic scalability:** Does the system use modern container architecture and reverse proxies to handle large amounts of traffic easily?

We've used [Pantheon](https://pantheon.io) and [Platform.sh](http://platform.sh) in the past, but many other good providers have these features.

Often we hear a cost-based objection: "Our hosting costs $5/month, why would we switch to something 5 or 10 times as expensive?" If you're worried about cost, consider calculating the _true_ cost of your current hosting. If it can save you as little as half an hour a month, a professional hosting service will save money. Try starting with larger projects that likely require these features and moving to smaller ones.

## Your First Accessories

Once you've adopted these components, most teams are curious to hear about more magical concepts like "automated testing" and "continuous integration" that they've been hearing about. It's such a common topic, I couldn't resist adding a few thoughts!

### Automated Testing

When figuring out where to focus testing efforts, you'll want to prioritize testing that shows immediate value to project stakeholders (and hopefully gets you more budget!). Typically, we prioritize...

-   **Visual Regression Testing:** Did the change break something on a given browser/device width?
-   **SEO Testing:** Is your site still optimized for search engines?
-   **Performance Testing:** Did the change make your site slower?
-   **Functional Testing:** Did the change break a mission-critical piece of functionality?
-   **Accessibility Testing:** For a project that needs to be WCAG 2.0 compliant, did a change introduce a compliance issue?

Depending on what you can sell to your stakeholders, you should compare SaaS solutions like SiteImprove and SauceLabs to continuous integration (CI) services like CircleCI/TravisCI (SaaS) and Jenkins (self-hosted). If you support many small sites, testing is probably too expensive to implement for each project individually, but there may be options if you're able to standardize upon a common core of features, for example by using a Drupal distribution. Learning about testing now will help you compete in the future as it becomes a standard offering.

### Package Management

Package managers grab dependencies (think of code like NPM modules, JS libraries, assets like Bootstrap, even CMS modules/plugins) to include in your project. Basically, anything that your team didn't code should ideally be loaded into your project by a package manager.

Why go to all the trouble of managing dependencies with a package manager?

1. **Declutter your Git repository:** You don't want hundreds of kilobytes of code clogging your Git repo. It makes seeing changes harder.
2. **Manage versions + updates:** You can lock to a specific version, or have the package manager update the dependency every time it is run.
3. **Parity between environments:** Helps you download the same dependencies, no matter what environment you're on.

### Continuous Integration + Deployment

Continuous integration is the creation of a system where code is constantly merged, tested, and deployed. In contrast to older workflows, where releases are built over the course of weeks or even months, teams practicing continuous integration should be able to deploy on a weekly, daily, or even more frequent basis.

As a development philosophy, continuous integration knits together most of the tools and concepts we've just talked about. It requires a single repository that everyone merges into. Every team member must be able to have individual local environments and shared test environments that are duplicates of the production environment to adequately test code. When code is pushed to any of these environments, a "build" occurs that pulls together dependencies with NPM/Composer/other package manager. During the build, automated tests will also run; if the tests fail, the build should fail and someone has to get back to work!

Like more development workflow philosophies, continuous integration is applied slightly differently by different teams. You can see the rough outline of a basic continuous integration workflow in our article about creating a [Killer D8 Workflow Using Lando and Platform.sh](/blog/2017/10/23/killer-d8-workflow-using-lando-and-platform-sh/).

## Is Your Team Headed the Right Way?

Upgrading your development workflow can have HUGE productivity gains. If project stakeholders are always breathing down your neck, these tools can give you ways to make them happy by working smarter, not harder. [Reach out if you're interested in getting a kickstart from our experts](/contact)!
