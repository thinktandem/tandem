---
title: Platform.sh Lando Integration Launch
metaTitle: Platform.sh Lando Integration | Lando
description: If you use Platform.sh and are looking for better local development, check out the new Lando integration.
summary: If you use Platform.sh and are looking for better local development, check out the new Lando integration.
date: 2020-11-19

author: "Alec Reynolds"
id: alecr
pic: "/images/people/alecr.png"
location: California

tags:
  - devops
  - development
  - lando
  - workflows
  - platform
  - alecr
---

Back in April we had [a big announcement](/blog/2020/04/21/platform-sh-lando-sponsorship) that may have flown under your radar as you stocked up on toilet paper and learned how to put on your biohazard suit: Platform.sh partnered with us to create a Lando integration!

<iframe src="https://giphy.com/embed/3o7abldj0b3rxrZUxW" width="480" height="368" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

After months of hard work with the Platform.sh team, we've emerged from our code dungeon with a shiny new integration that allows you to mirror your Platform.sh environments on Lando.

## What's In The New Integration?

If you're a developer at an agency or a large organization, chances are you're switching between different projects using different application frameworks. Even if you're lucky enough to only have a single hosting provider like Platform.sh, juggling tooling and provisioning new developers who may be using different operating systems is a tall order. Chances are, these are the reasons you've adopted Lando.

In building the Platform.sh integration, we wanted to meld the best features of Lando and Platform.sh to start breaking down the barriers between "local" development and your "hosting" environment. After all, it's 2020. We have reusable rockets, flying cars, and most of our computing power is distributed in data centers across the globe. Jumping from your laptop to production should be seamless.


1. **Parity with Production Services:** When you build one of your P.sh projects with Lando, it looks at your `.platform.app.yaml` and installs the same services with the same Docker images that Platform.sh uses in production.
2. **Pulling/Pushing Sites:** Authenticate with a P.sh access token and you can pull down any of your project. If you need to get new testing data, running `lando pull` allows you pull databases and files from your P.sh environments.
3. **Platform.sh CLI Pre-installed:** Windows users and anyone else who has had issues installing the Platform.sh CLI, rejoice: it's installed alongside your P.sh project within Lando.


## Getting Started With Platform.sh on Lando

To pull down a pre-existing project from Platform.sh, start by creating a new folder (`mkdir platform-test && cd platform-test`) and then initialize your project with Lando:

```
lando init --source platformsh
```

You'll need to authenticate with Platform.sh using an API token. If you don't have one handy, loginto Platform.sh on your browser and create a new API token by going to your account page (click on your name in the upper right-hand corner of the Platform.sh dashboard) then clicking on the "API Tokens" item in the navbar:

![Image of how to create an API token in Platform.sh](/images/articles/platformsh-lando-integration.jpg)

Now that you're successfully authenticated, you should be able to select the Platform.sh project you want to clone.

Running `lando init` creates the basic Landofile that tells Lando how to run your Platform.sh project, but to bring it to life we need to start the application:

```
lando start
```

This will actually pull down all the Docker images, code, and other infrastructure that runs your website. Once that's finished you'll see a series of URLs where you can access your website, but if you click on one, you'll probably get a CMS installation page. Time to get a fresh database and other assets!

```
lando pull
```

After you've followed the prompt in `lando pull` and fetched an up-to-date database, copies of file mounts associated with your project, and data for other services, then your project should be [fully armed and operational](https://www.youtube.com/watch?v=g7-tskP0OzI)!



## Caveats

### Only PHP Applications Are Currently Supported

Platform.sh supports a HUGE number of application frameworks and services. Unfortunately, that meant we had to limit the scope of the "MVP" integration to PHP applications like Magento, WordPress, Drupal, and EZ Platform. That doesn't mean you can't run Node frontends or Python apps using Lando's stock application types, but you won't get the nifty integration with `.platform.app.yaml` files and other features.

### Beta Means Beta

After testing the integration for a month we know it's ready for primetime, but there are still kinks to work out. We appreciate you kicking the tires; if you think you've found a problem, first check [the docs](https://docs.lando.dev/config/platformsh.html) thoroughly to make sure, then ping the [Lando Slack](https://launchpass.com/devwithlando) to see if others are also experiencing the problem.

## What's Next?

We look forward to continuing to offer deeper support for more application frameworks on Platform.sh and improving the stability of the Lando integration. Contributions from Platform.sh and our other sponsors is what helps make Lando successful for all of us. We rely upon you to support Lando's continued growth; [sponsor today](https://github.com/sponsors/lando) if you haven't already!
