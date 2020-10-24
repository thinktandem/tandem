---
title: "Building a Lando Plugin"
tags:
  - development
  - lando
  - nodejs
  - dustin
author: "Dustin LeBlanc"
date: "2020-10-07"
summary: "Creating a Lando Plugin is Way Easier than it looks"
id: dustin
pic: "/images/people/dustin-sm.jpg"
location: Ithaca
---

I've been helping out with maintenance of Lando since before I joined Tandem. The project has grown quite a bit since it's inception, and we've discovered that we've more than exceeded the limits of how much awesome can be crammed into the brains of a small handful of core maintainers. 



We want to see Lando continue to grow and more and more developers get the benefits of the [conceptual compression](https://m.signalvnoise.com/conceptual-compression-means-beginners-dont-need-to-know-sql-hallelujah/) that Lando allows. For that to happen, we need to start distributing the knowledge of how Lando works, and let the community create using the tools without oversight or interference.

Because of this, Lando's plugin ecosystem is going to be a big part of growing the project going forward. We've hinted at this on Slack, we talk about it constantly in our maintainers meetings, and the entire maintainers group is aligned that this needs to be the next big thrust of the project.

## Cool, So We Need Mo Plugins, So?

There are a ton more specifics of what we're thinking for the future, but in order to take the next step, we need to start educating people about what they can do, and frankly, how easy it is to accomplish some pretty awesome results with some fairly minimal javascript.

## The Future is Here Already

Lando has had a plugin system since before it was Lando in the Kalabox days. Lando also internally uses plugins for a ton of it's core features that you know and love. The [plugin documentation](https://docs.lando.dev/contrib/contrib-plugins.html#plugins) does a really good job of showing you the bones of a plugin and it gives you some good indications of what you can do and how to do it, but until recently, we were missing a pretty key component, a plugin scaffold that can get folks started on their custom plugin. 

## Just Shut Up and Give me the Code!

We're developers, we know a lot of people aren't going to RTFM (especially since there is so much to learn and you just wanna make shit!), so having code they can grab and fiddle with provides a much more satisfying experience. I've started an [example plugin on GitHub](https://github.com/lando/lando_example_plugin) that contains everything you need to get started. 

Lets take it for a spin to create a recipe for Ruby on Rails, a sorely missing recipe in Lando's stable.

## Creating a Recipe for Lando

Rails is a stack of moderate complexity. Typically you have an appserver (ruby), a database (MySQL/Postgres), and potentially a cache server (Redis/Memcached), and you might add more services like service workers depending on your app.

### Scaffolding the Plugin

Lets get started by creating a fresh plugin in a folder that gets auto-loaded by lando:

```sh
mkdir -p ~/.lando/plugins
git clone git@github.com:lando/lando_example_plugin.git ~/.lando/plugins/lando-rails
```

Now we want to really make it OURS:

```sh
cd ~/.lando/plugins/lando-rails
rm -rf .git && git init
git add . && git commit -m "Initial commit"
```

Now we've got a fresh plugin based on the scaffold repo, we've removed all trace that you copied this initial code, and we've got a nice solid base for our own plugin committed. You can now push that repo to your favorite git repo provider like GitHub, Bitbucket, GitLab, etc.

### BAM! Making a Recipe Like Emeril

Now that we've got our brand spankin new plugin, its time to get crackin on our recipe. 

Let's start by creating a `builder.js` file, which is the main file that defines a recipe in Lando:

```sh
mkdir -p recipes/rails && touch recipes/rails/builder.js
```

We're going to copy the [example from the docs](https://docs.lando.dev/contrib/contrib-plugins.html#recipes) and strip it down to the essentials:

```javascript
'use strict';

// Modules
const _ = require('lodash');

module.exports = {
  name: 'rails',
  parent: '_recipe',
  config: {
    confSrc: __dirname,
    ruby: '2.4',
  },
  builder: (parent, config) => class LandoRails extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      options.services = _.merge({}, options.services);
      options.tooling = _.merge({}, options.tooling);
      super(id, options);
    };
  },
};
```

This skeleton shows you the basics we need for a recipe. We have a name, a parent, some config (with overrideable defaults), and a builder function that accepts the parent recipe and any configuration being passed along from the user's landofile. The builder function returns a class that extends the parent recipe.

This looks uber fancy because we're extending classes and stuff, but in general, we're creating a fairly bare bones recipe that extends Lando's barest of bones recipes, specifying some configuration, and then performing the ceremony of creating an empty set of services and tooling entries, then handing off recipe construction to the parent class.

After creating the builder.js file, before running our plugin, we need to make sure to add lodash with `yarn add lodash` which should also handle the yarn install for us.

This recipe currently does nothing, we've got to give it some ingredients!

### Services are the Start of Any Good Recipe

Our Rails recipe needs a couple of services. To keep it simple, we're just going to have an appserver and database for now, and we're going to go with Postgres because MySQL sucks.

```javascript

```

## Conclusion
