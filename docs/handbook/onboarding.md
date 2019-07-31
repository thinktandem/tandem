# Onboarding Checklist

Hi there! We're very glad you're working with us. Tandem strives to make the world better by creating simple solutions to BIG, complex problems.

In order to begin getting yourself oriented within this elite cadre of problem solvers, here's what you'll need to do...

[[toc]]

## 1. Setup your Tandem email account

The first thing you'll want to do is get set up with your Tandem email account since this will be a dependency of subsequent steps. You will have received an email invite for this so just go ahead and follow the instructions there.

::: tip PRO TIP
Your Tandem email account will also come with `lando.dev` and `devwithlando.io` aliases
:::

## 2. Explore the Google Apps

Log in to your new Tandem email account and take a second to [explore the studio space](https://youtu.be/cVsQLlk-T0s?t=105) that is Google Apps. Beyond email you should get familiar with the [calendar](https://calendar.google.com/calendar/r/week) and [drive](https://drive.google.com/drive/my-drive).

The calendar will have all of your and company-wide meetings. You can also add other people's calendars to have visibility into their schedule. All scheduled events and meetings come with [Google Meet](https://meet.google.com) links. This is our default video conferencing tool unless otherwise specified in the event.

The drive contains various company, HR and client materials.

## 3. Get added to Tandem services

You should have invites in your new email inbox for the below applicable services. If you do not have invites for the various things then ping someone!

* [Your new email added to our Harvest account (for time tracking)](https://thinktandem.harvestapp.com/team)
* [Your new email added to our Gusto service (for getting paid)](https://manage.gusto.com/kalabox-inc)
* [Your new email added to our Slack channel(s)](https://thinktandem.slack.com)
* [A PeopleKeep account created for you (for benefits)](https://tandem.peoplekeep.com)
* [An Expensify account for reimbursements](https://www.expensify.com)
* [Have your GitHub Account added to Tandem’s GitHub org](https://github.com/orgs/thinktandem/people)
* [Have your GitHub Account added to the Lando GitHub org](https://github.com/orgs/lando/people)
* Tandem's per-client password folders shared with your personal LastPass account as needed.

If you do not already have a GitHub account make sure you [create one first](https://github.com/join).

### Optional (for now)

If you are a developer you may also want to set up accounts with your Tandem email for the following services:

* [Pantheon](https://pantheon.io)
* [Platform.sh](https://platform.sh)
* [TravisCI](https://travis-ci.org)
* [CircleCI](https://circleci.com)

If you don't do it now you will likely do it later when it inevitably comes up in project work.

## 4. Get the tools you need

You're here so you've got the talent but now you need [the tools](https://getyarn.io/yarn-clip/0d992b79-8cf0-4da3-8e3b-6cbcdaecf9fb).

Tandem standardizes its process around a few core tools. This provides predictability and consistency between developers and projects. Note that given your role at Tandem not all of these tools may be neccessary.

### A Good Computer

We are only as good as our tools and Tandem is only as good as its people. This means that having a powerful and reliable machine is good not only for you but for the organization as a whole.

Tandem is primarily a macOS based shop. While you can still write the codes with ~~Windows~~ (no) and Linux, these boxes are currently unsupported and [YMMV](http://www.urbandictionary.com/define.php?term=ymmv). We recommend you have a macOS based machine that _feels fast_.

If you are a Tandem employee or contractor we offer a [tech stipend](./../onboarding/benefits.md#computer--equipment-purchase) that can be used to purchase a new machine.

### Git

Every Tandem project uses [`git`](https://git-scm.com/) for [version control](https://en.wikipedia.org/wiki/Version_control). This provides easy collaboration between developers, interfaces well with [GitHub](https://github.com) and keeps a nice record of who has done what. If you are unfamiliar with `git` we recommend [Pro Git](https://git-scm.com/book/en/v2) as a reference.

If you are unsure whether `git` is installed on your system please [click here](https://git-scm.com/downloads).

For other helpful `git` commands we recommend the [our git training](https://docs.google.com/presentation/d/1tPKnFcOC-HBQy9Za8jCyRbXFXxNQUU7xE9JJSIA6a2k/edit?usp=sharing) presentation.

### ZenHub

Tandem uses [agile](https://en.wikipedia.org/wiki/Agile_software_development) as its development philosophy. Specifically we do regular [stand ups](https://en.wikipedia.org/wiki/Stand-up_meeting) and utilize a [kanban board](https://en.wikipedia.org/wiki/Kanban_board) to track [story points](http://wiki.openbravo.com/wiki/Scrum/Story_points) and project [burndown](https://en.wikipedia.org/wiki/Burn_down_chart). This provides a way to:

* Create project issues and milestones
* Determine the status of particular issues and milestones
* Assign issues to particular developers
* Communicate between developers, project managers and relevant stakeholders
* See which developers are working on which issues
* Track the progress of a current [sprint](https://en.wikipedia.org/wiki/Scrum_Sprint)

[ZenHub](https://www.zenhub.com/) provides these tools to GitHub. You will want to [install the browser extension](https://www.zenhub.com/) from the ZenHub site. Once you do so you should see [Board](https://github.com/thinktandem/horoscope#boards) and [Reports](https://github.com/thinktandem/horoscope#reports) tabs on GitHub.

### Lando

Tandem uses (and is the creator and maintainer of) [Lando](https://github.com/lando/lando) for local development and DevOps. Lando eliminates the need for managing your own, or multiple versions of, common software packages like `php`, `nodejs`, `apache` or `memcache` and can also:

* Easily mimic your production environment locally.
* Standardize your teams dev environments and tooling on OSX, Windows and Linux.
* Integrate with hosting providers like Pantheon
* Store all of the above in a version controlled config file called `.lando.yml`
* Easily customize or extend tooling, deployment options and basically any other functionality.
* Free yourself from the tyranny of inferior local development products.

::: tip PRO TIP
Use [Hyperdrive](https://github.com/lando/hyperdrive) to get spun up with all the things you need quickly!
:::

All project repositories at Tandem should contain a [`.lando.yml`](https://docs.devwithlando.io/config/lando.html) that does the above.

After [installing Lando](https://docs.devwithlando.io/installation/installing.html) we highly recommend doing a pass on the [Lando documentation](https://docs.devwithlando.io/).

### Text Editor

A generic text editor that is geared towards writing code is also a good idea. Tandem recommends using one of the following:

* [Atom](https://atom.io/) (We also have our own [theme](https://atom.io/themes/atom-tandemic-syntax))
* [Sublime Text 2/3](https://www.sublimetext.com/)
* [Vim](http://www.vim.org/)
  * [dotfiles](https://github.com/serundeputy/dot-files) ~ a nice `.vimrc` starting point with some great plugins.
