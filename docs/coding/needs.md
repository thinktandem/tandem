What You Need
=============

Tandem standardizes its development around a few core tools. This provides predictability and consistency between developers and projects. We recommend the following to write the best codez for Tandem.

 <!-- toc -->

macOS Computer
--------------

Tandem is primarily a macOS based shop. While you can still write the codes with Windows and Linux, these boxes are currently unsupported and [YMMV](http://www.urbandictionary.com/define.php?term=ymmv). We recommend you have a macOS based machine with at least...

* macOS 10.10+
* x64 processor architecture
* 4GB RAM
* 50GB+ of available disk space
* Modern processor (~last 2 years)

If you are a Tandem employee or contractor we offer a [tech stipend](#TBD) that can be used to purchase a new machine.

Git
---

Every Tandem project uses [`git`](https://git-scm.com/) for [version control](https://en.wikipedia.org/wiki/Version_control). This provides easy collaboration between developers, interfaces well with [GitHub](https://github.com) and keeps a nice record of who has done what. If you are unfamiliar with `git` we recommend [Pro Git](https://git-scm.com/book/en/v2) as a reference.

If you are unsure whether `git` is installed on your system please [click here](https://git-scm.com/downloads).


### Configuring

```bash
git config --global user.name "James T. Kirk"
git config --global user.email kirk@enterprise.mil
```

### Common Commands

```bash
# Clone the git repository for this documentation using an SSH key (preferred)
git clone git@github.com:thinktandem/horoscope.git

# Clone the git repository for this documentation using user/pass auth (less secure)
git clone https://github.com/thinktandem/horoscope.git

# Navigate to the working directory for this repo
cd horoscope

# Fetch all new branches and tags
git fetch --all

# View all local and remote branches
git branch -a

# Checkout a new branch
git checkout -b ISSUENUMBER-DESCRIPTION

# Pull in updates from the default branch (master in this case)
git pull origin master

# Push updates to your current branch
git push origin ISSUENUMBER-DESCRIPTION
```

For other helpful `git` commands we recommend the [our git training](https://docs.google.com/presentation/d/1tPKnFcOC-HBQy9Za8jCyRbXFXxNQUU7xE9JJSIA6a2k/edit?usp=sharing) presentation.

GitHub
------

Tandem uses [GitHub](https://github.com) to store and manage its `git` repositories. If you are unfamiliar with GitHub you can read more about it [here](https://en.wikipedia.org/wiki/GitHub).

Before writing code with Tandem make sure you have...

* [A GitHub Account](https://github.com/join)
* Been added to the [Tandem Org](https://github.com/thinktandem) on GitHub
* And any other orgs with which Tandem is working.

If you are unsure about how to be added to organizations on GitHub please contact your project manager.

ZenHub
------

Tandem uses [agile](https://en.wikipedia.org/wiki/Agile_software_development) as its development philosophy. Specifically we do regular [stand ups](https://en.wikipedia.org/wiki/Stand-up_meeting) and utilize a [kanban board](https://en.wikipedia.org/wiki/Kanban_board) to track [story points](http://wiki.openbravo.com/wiki/Scrum/Story_points) and project [burndown](https://en.wikipedia.org/wiki/Burn_down_chart). This provides a way to:

* Create project issues and milestones
* Determine the status of particular issues and milestones
* Assign issues to particular developers
* Communicate between developers, project managers and relevant stakeholders
* See which developers are working on which issues
* Track the progress of a current [sprint](https://en.wikipedia.org/wiki/Scrum_Sprint)

[ZenHub](https://www.zenhub.com/) provides these tools to GitHub. You will want to [install the browser extension](https://www.zenhub.com/) from the ZenHub site. Once you do so you should see [Board](https://github.com/thinktandem/horoscope#boards) and [Reports](https://github.com/thinktandem/horoscope#reports) tabs on GitHub.

Lando
-----

Pantheon
--------

Platform.sh
-----------

IDE or Text Editor
------------------

CircleCI or Travis (optional)
-----------------------------
