---
title: "How My Agency uses Kalabox to Win all the Local"
tags:
    - deployment
    - localdev
    - testing
    - alecr
author: "Alec Reynolds"
date: "2016-09-29"
summary: "Onboarding new team members to your web project can be complicated with even the most integrated DevOps team. Say hello to Kalabox."
id: alecr
pic: "https://www.gravatar.com/avatar/f274dbe2c9fbaac8339c01d918ba50b5"
location: California
---

## The Woes of Local Web Development

There's a common phrase heard throughout the web development community and feared by all in our office here at [PAIRODIME](http://www.pairodime.com):

> Well...it worked on my machine.
  <small>Every developer ever</small>

Over the years my team and I have tried to settle on common web development tools that would both allow us all to collaborate on digital products and minimize headaches and redundant speach patterns. Local web development environments were especially difficult to master. Even if we all installed MAMP, XAMP, VirtualBox or native web server stacks we could not guarantee we were all working under the same development conditions. Eventually one of us would wind up with the colloquial WSOD. Maybe it was RAM allocation, maybe it was MySQL tuning for large databases, maybe it was my version of SASS that was not the same as my co-workers. Then there was the dreaded moment of truth: pushing changes to our web hosting service. Or, on the flip side of that coin; pulling a website's code, assets and database from our web host to local and the inevitable next half a day trying to get everything working correctly.

When we started exchanging 'my.conf' and 'php.ini' files over slack (yes - that just happended), we finally find solace. No more WSOD. Onto slaying code like galdiators. All shall rejoice!

But wait! Don't celebrate just yet; that was just for one team member. Everybody has their own stack preference, so be prepared to know that you will never be fully prepared to handle every computer setup that hits the sprint conference table.

## Say Hello to Kalabox

[Kalabox](http://www.kalabox.io/) standardizes and optimizes local development for Drupal, WordPress, and other web apps. It is easy to install, works on Mac, Windows and Linux. It is easy to use for developers who love GUI apps (looking at you [Devsigners](https://www.devsignercon.com)!), and powerful enough for even the most seasoned command line veterans. It is epsecially awesome when we pair Kalabox with their Pantheon plugin which allows us to create identical clones of our entire Pantheon hosting site environments (including MultiDev environments). Being a Pantheon partner agency this has become especially helpful as we can now use Kalabox to create site-by-site localized replication of Pantheon's advanced suite of tools: Nginx, Redis, Varnish, SOLR, PHP, MySQL, terminus CLI and Drush.

## Understanding How Kalabox Works

First let me say, I do not claim to be an expert on how Kalabox works. Although Kalabox is open source, I have never forked the repo, commited a patch, or added to the [documentation](http://docs.kalabox.io/) (yet!). I have, however, read all the documentation (at least a couple of times), posted questions on the github issue que, posted replies in the issue queue, posted a message or two on the Pantheon Power User Group thread, and have experimented relentlessly trying to vet Kalabox as a drop in replacement for our team's preferred localized development tool.

**Below are some Kalabox basics.**

#### Installation

  * Download the Kalabox Application from [GitHub](https://github.com/kalabox/kalabox/releases)
  * Install as you would any native app
  * Installer creates a virtual machine on your computer using [VirtualBox](https://www.virtualbox.org/) (which comes pre bundled with the application)

#### Creating or Pulling a Site

* Use Kalabox from the GUI or CLI to create a new app from scratch or pull directly from an exisiting app on Pantheon

  ![alt text](images/articles/digital-agency-onboarding-with-kalabox/kalabox-pantheon-plugin.png "Kalabox GUI Pantheon Plugin")

* If you pull an app from Pantheon, you have the option of pulling database and files as well as code

#### Configuration

* Kalabox uses a series of .yml files in the newly created app to describe the virtualized machine and local computer data sharing as well as other plugins and development tools
* The virtual machine uses [Docker](https://www.docker.com/) for awesome container stacking of things like Redis, MySQL, Drupal, [etc.](https://hub.docker.com/explore/)


#### File Sharing

* Kalabox (along side VirtualBox) creates a shared folder for you to interact with the code in your containers
* On a Mac, the default shared folder is located:

```bash
/Users/yournamehere/.kalabox/apps/
```

* You can now edit files in your apps `/code/` directory
* Kalabox utilizes [Unison](https://www.cis.upenn.edu/~bcpierce/unison/) in combination with VirtualBox shared file system to synchronize the file changes between the virtual machine and your local machine (at a rate of about 1 second)
* Once your changes are made to your code or files, you can use Kalabox to push your changes to your web host (for us that is Pantheon), this includes database and files!
* Rejoice!

## Caveats

While Kalabox provides a pretty decent one-size-fits all solution there are various aspects that you might wish to configure to get the best possible result for your workflow. Here are some of the changes we've made to super charge Kalabox for our agency.

### Working with Large Apps

We build a lot of sites using Drupal (there I said it). Although we use many technologies to power our digital products we are primarily a Drupal shop. Using Kalabox, I love being able to clone my Pantheon website to my local machine, make some code changes, add new image files or update site config using the Drupal GUI (okay maybe not so much love for Drupal config using admin but you get the idea) and then push all my changes (including database and files) back up to Pantheon in one simple action.

This works well for your average brochure website. However, many of our brand websites are made with Drupal Commerce using high quality photo assets, fancy-shmancy JavaScripts, extensive contributed and custom modules and databases that are often over 100mb compressed. Kalabox is able to push and pull these assets without fail, but the process can seem to take a lifetime (in reality about 20+ minutes or so).

### Pro Tips

* If you are creating or working on an app with < 5 MB Database < 70 MB in files => Create, Push and Pull with Kalabox GUI or CLI all day long and enjoy the simple freedom of deploying your app with ease.
* Your site will be created in less than 5 minutes and push to the web in less than 5 minutes.
* Many of our fresh install apps with a handul of updates take less than 1 minute to push code, database and files back up to Pantheon.
* If you are going to be pulling a larger website on Pantheon and want to get working right away - choose to NOT download database and files when using the GUI or...

```bash
# If using Kalabox CLI
$ kbox create pantheon -- -v \
  --site=big-brand-here \
  --env=dev \
  --nodb \
  --nofiles \
  --name=big-brand-here \
  --dir=/Users/yournamehere/.kalabox/apps

# Or to place the App in your Mac OS Sierra 'Documents' Cloud Storage
$ kbox create pantheon -- -v \
  --site=big-brand-here \
  --env=dev \
  --nodb \
  --nofiles \
  --name=big-brand-here \
  --dir=/Users/yournamehere/Documents/Sites
```


* Instead, take advantage of Pantheon's built in backup system and download your database and files as archives and extract them into your app manually

```bash
# By default here
/Users/yournamehere/.kalabox/apps/files/...
```

* After you download your large database from Pantheon, you will need to manually upload into your local Kalabox database
* You can easily get all your Kalabox database connection information from the Kalabox GUI by clicking 'connection info' or using the Kalabox CLI

```bash
# Change directory into your app
$ cd /Users/yournamehere/.kalabox/apps/big-brand-here/
# Get a list of services and connection information for your app
$ kbox services
# ex:
{
  "name": "db",
  "project": "big-brand-here",
  "external_connection_info": {
    "database": "pantheon",
    "user": "pantheon",
    "password": "pantheon",
    "host": "big-brand-here.kbox",
    "port": "32810" # THIS IS THE IMPORTANT INFO!!!
  }
}
```

* Pay close attention to the database port number as this changes everytime you start your app
* You can now use this information in a third party database client like [Sequal Pro](https://www.sequelpro.com/) -> Import DB

## Optimizing File Sharing for Large Drupal Projects

The Drupal community has contributed so many awesome modules to enhanace our websites, but like Uncle Ben said

> "With great power comes great responsibility."
  <small>Uncle Ben</small>

By default, Kalabox will synchronize all code files between your virtual machine and your local shared files directory (one splendid file at a time). Let me repeat that... by default, each file in your virtual machine will be replicated into your local shared files directory, and perhaps more impressively vise-versa.

[add picture of retro hypnosis art here]

Every time a change is made to 1 of those files Unison, VirtualBox and Kalabox play a fun little game called "WTF just happened" and begin to scan each file in our repo to account for all possible changes. For anyone else using Drupal Commerce that can mean over 15 modules alone with a vanilla install, not to mention the other 20 contributed modules and the handful of custom modules you created. You also have all of Drupal Core, Libraries, Node dependencies etc. This can lead to hundreds if not thousands of files for our app to keep track of. At one point in time, I made a change to code on my local machine and waited over 3 minutes for the change to appear in my local Kalabox app web browser (this included multiple refreshes and cach clearing from GUI and Drush). Turns out I was not alone and the Kalabox team has provided some per-site configuration options to alleviate this specific pain point. If you config this well you can end up with a site that both syncs files and loads pages quickly.

### Pro Tips

* Fortunately we can tune Kalabox to not only look for changes in certain file paths, but also exclude certain files such as those used by front end development tools such as the `/node_modules/` in our theme directory or `/vendor/` for Composer deps.
* Simply edit your app's `kalabox.yml` - look for the 'sharing' section and edit these lines

```yaml
sharing:
    share: 'data:/code'
    ignore:
      - Name sites/default/files
      - Name \*node_modules\*
      - Name \*bower_components\*
      - Name \*vendor\*
      - Name \*build\*
    paths:
      - sites/all/modules/custom
      - sites/all/themes/big-brand-theme
```

* If you really want to speed up your app creation process - stop your newly created Kalabox app as soon as it is created by pressing the stop button on the GUI or

```bash
# From the Kalabox CLI
$ kbox stop
```

* This will in effect stop Kalabox from trying to sync all your files from virtual machine to your local shared files directory
* Make sure you tune your app's `kalabox.yml` as described above
* Turn your Kalabox app back on using the power button on the GUI or

```bash
# From the Kalabox CLI
$ kbox start
```

* You will now notice your apps file structure just got a lot smaller, by only synchronizing your allowed paths from the `kalabox.yml`
* This keeps your code base lean and your dev team can focus on their given feature or theme development

## So... What About The Files That Are NOT Synchronized?

There is a bit of a gingerly dance at play here. We are tuning our `kalabox.yml` so that we are developing, making code changes, and seeing the results of those changes in our local containers in near real time, but often times we discover we need to add another contributed module or library that is outside of our designated `kalabox.yml` paths. Trust me - this happens all too often.

Luckily, Kalabox has some awesome built-in dev tools that work directly on the virtual machine such as: git, bower, gulp and drush ([full list of Pantheon Dev tools here](http://pantheon.kalabox.io/en/stable/users/tooling/)). Lets say you wanted to use drush to download and install the `admin_menu` module:

```bash
# From the Kalabox CLI
$ kbox drush en -y admin_menu
```

At this point your Kalabox app will have downloaded and installed the `admin_module` directly to the `/sites/all/modules/contrib/` folder in your virtual machine. The best part here is we don't need to wait for those files to be scynchronized back out to our local before the module will work because `kbox drush` puts them directly into the virtual machine. Drush is amazingly fast, so just wait till it's done and refresh your app in the browser. BOOM! It just works.

### Pro Tips

If you do in fact need to patch that contrib module, you have a few more options:

1. Update your `kalabox.yml` to include the exact path to your module then restart your app

```bash
# From the Kalabox CLI
$ kbox restart
```

2. You can also choose to use Pantheon's built in SFTP connection and upload files like settings files, contrib modules and libraries directly to the server then do a quick pull of those changes back into your local Kalabox app

```bash
# From the Kalabox CLI
$ kbox git pull
```

Most of the time we don't ever change the code of these type of files so we found that it was easier to by-pass file synchronization and just let the virtual machine handle those files. This is also a great way to prevent someone from hacking core or contrib modules!

## Working Pantheon MultiDev and Git Branches

Pantheon's MultiDev environments are awesome for isolating development features, testing out global site changes and working with a team of developers. In reality they are isolated and complete site environments build on git branches. If you wanted the true Pantheon MultiDev experience you would create a new Kalabox app for each Pantheon MultiDev.

We personally think this is overkill for our agency and dev workflow. Most of the time we just create the app from a clone of the `dev` enviroment and use `git` to switch to different branches as needed. We are mainly working on code changes so database and files rarely need to be the most current for us to be able to develop with confidence. A good exception to this rule is for new team members. In this case we recommend they pull their app from a MultiDev environment that we have set up for them. This keeps their work isolated and limits their access to push upstream.

### Pro Tips

* If you are mainly working with code changes - keep it simple and just create ONE APP TO RULE THEM ALL
* Use 'kbox git checkout' to switch between branches

## Front End Web Development with Kalabox

As mentioned before, Kalabox has some great front end dev tools built into the app so that we can take advantage of things like Gulp Sass to be applied directly on the virtual machine. What we came to discover is that there are many factors that will determine the overall performance of your development. Computer age, speed, RAM, RAM Cache, web browsers, gulp procecedures, gulp commands and syncronized 'kalabox.yml' file paths will all greatly effect the performance of your development.

### Pro Tips

* Keep the `gulp` (or `grunt`) procedures to a minimum - if you don't need Babel or Uglify on this project - don't use them
* `gulp watch` is FASTER in the long run than single `gulp` commands such as 'kbox gulp sass'
* The first time you run 'kbox gulp watch' -> it will take a while (close to 30 seconds depending on your gulp procedures)
* After the first `gulp` has completed subsequent `gulps` will be much faster

## Onboarding New Devs to Your Project and Kalabox

This post originally came about as a form of onboarding, to help reduce the time it took to get new team developers up to speed on what Kalabox was and how to best configure it for quick and consistent results. Here are a few takeaways to help your team get up to speed quickly.

### Pro Tips

* Have new devs download Kalabox before they come in
* Setup their Pantheon acccount before the sprint and add them to the project with appropriate organizational role
* Have your team turn off their computers before they walk into the sprint
* This eleviates all the extra background processes that might be lurking in the background wasting ram (we like to call them gremlins)
* Chrome tabs are a RAM killer, have your team be aware of their RAM usage and availability
* We highly recommend ['Memory Clean'](https://itunes.apple.com/us/app/memory-clean-monitor-free/id451444120?mt=12) for Mac - it's free and amazing
* Tune your `kalabox.yml` so that only specific folders are being watched
* If they are a themer - expose the theme path, if they are custom coding a feature or extending a module, expose the `/custom/` module path only
* We found it was best to onboard new devs to Kalabox by having them download the app, install it, open up the GUI for the first time (this helps them associate our project to Kalabox from a visual queue) -> create new app from Pantheon MultiDev without downloading files and database -> once it is done -> turn off the app -> tune the 'kalabox.yml' -> continue app management using the CLI using the manual import of Database and files as described above.

## Live Long and Kalabox

We are super excited for the latest realease of Kalabox. If you are new to Kalabox - go download it now! Trust me. If you ever tried Kalabox 1 or Kalabox 2 while in Beta - go dowload the latest version now! The bugs are gone and it's blazing fast! You're welcome.

- Love Gonz.
