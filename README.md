# Tandem 2.0

This repository seeks to build on [lessons learned from _Horoscope_](https://docs.thinktandem.io/manifesto/history.html#horoscope). As such, its goal is to continually, incrementally, and iteratively improve the business so we can increasingly focus on the things that matter most while maximizing our flow.

This means that someone should be able to come here with an idea and...

1. Put that idea through a standardized vetting, prioritization and refinement process
2. End up with small and actionable tasks that can be advanced by a team slowly and methodically over some time frame
3. Make contributions into a predefined and obvious structure
4. Have their contributions automatically deployed to the places where they have the most impact
5. Improve Tandem by removing repetition, variables and confusion from our work

It also means that if you contribute to this repository you are contibuting to the long term growth of the business.

* [Purpose](#purpose)
  * [A single source of truth](#1-single-source-of-truth)
  * [Tying things together](#2-tie-things-together)
  * [A resilient process](#3-a-resilient-process)
* [Structure](#structure)
  * [Manifesto](#manifesto)
  * [Handbook](#handbook)
  * [Guides](#guides)
  * [Templates](#templates)
  * [Scripts](#scripts)
* [Getting Started](#getting-started)
  * [Developing](#develop)
  * [Testing](#test)
  * [Contributing](#contribute)

## Purpose

Specifically the above will be accomplished by making the repository be/do the following three things:

### 1. Single source of truth

This repository should hold _anything_ that makes Tandem run better, faster and stronger but it should do so within a well defined structure so its obvious where things should go. In this way it should act as a intuitively organizied single source of truth for our most important assets.

A caveat to this is we don't want to include anything that should _obviously_ be its own repository. For example things like specific project repositories, start states, seeds, modules, plugins, etc should exist on their own but should also be tied to this repository in some way.

Beyond the above caveat its important for this repo to contain _as much stuff as possible_. This reduces cognitive load, increases transparency when important things change and helps maintain company-building momentum.

### 2. Tie things together

Its not enough to have a single source of truth floating in isolation in the aether; it needs to have practical value and be useful. To that end, this repo, like a [good rug to a room](https://www.youtube.com/watch?v=ezQLP1dj_t8), needs to also tie everything we do together. This means that when we add or update this repo with something, that something needs to also surface, ideally via some sort of automation, _someplace else_ where it makes sense and can be put to use.

Here are a few specific examples of how we can tie things together:

* Employee handbook or company documentation changes automatically notify people on Slack
* Project README template improvements automatically open pull requests on downstream repos
* Aforementioned README templates link back to helpful documentation stored here
* Project start states can pull in new scripts and Lando plugins from here

It's difficult for a human to consistently remember to come back here for the things they need. Let's use the robots to make sure we are shipping things to the most useful places.

**@TODO:** Would be great to actually have the above things so we can SHOW instead of TELL

**@TODO:** the exact engineering mechanisms around parts of the above of this need to be better deifined and will likely be one of the first things we tackle

### 3. A resilient process

The final piece of the puzzle here is to define a resilient process we all can use to surface business improvements. The process should be

* Easy to understand and document
* Require minimal oversight
* Mostly asynchronous
* Run on its own inertia.

It should also provide some "objective" prioritization mechanism and encourage tasks be broken into very small chunks that are worked on in teams of two or more.

## Structure

So while _anything and everything that makes Tandem run better, faster stronger_ is our high level metric around inclusion we _do_ currently have a more concrete and exatant structure.

```bash
./
|-- .github                           GitHub templates and config
|-- .platform                         Platform.sh config
|-- docs                              Docs and templates
  |-- .vuepress                       Vuepress config
    |-- components                    Vue components
    |-- public                        Static assets
    |-- config.js                     Vuepress config file
    |-- enhanceApp.js                 App level customization
    |-- override.styl                 Stylus constant overrides
    |-- style.styl                    Extra styles
  |-- guides                          Tandem guides and how-tos
  |-- handbook                        Tandem employee handbook
  |-- manifesto                       Tandem manifesto and values
  |-- templates                       Tandem templates
  |-- README.md                       Documentation homepage
|-- scripts                           Helpful Tandem scripts
|-- .lando.yml                        The Landofile to power this locally and in CI
|-- .travis.yml                       Travis CI for build, test and deploy
|-- package.json                      Node dependencies and config
```

Note that if you've identified something outside of the above that you think _should_ live in here, open up a ticket to suggest a change to this structure because there is a good change you are right! THere is a good chance this will be in flux a lot early on!

First and foremost this repo contains our manifesto, employee handbook and actionable guides to accomplish specfic things.

### Manifesto

`docs/manifesto`

The manifesto should be our most immutable documentation. That is to say that it should not be modified without significant deliberation and consideration.

It should contain:

1. Why we exist and our mission
2. Our core values
3. A roadmap for growth
4. An overview of how we got here (our history)
5. Roles and responsibilities for Tandem
6. How the above things connect together eg an org chart

### Handbook

`docs/handbook`

The handbook should be the place for all new employees to get spun up and integrated into the Tandem way with minimal disruption and loss of flow.

It should contain:

1. The things an employee needs to do on their first day to get rolling
2. Company policies around benefits, pto, etc

### Guides

`docs/guides`

Guides should ultimately seek to answer questions like _How do I do X at Tandem?_. They should serve as starting points on the path to increased automation eg we should always be considering how guides can be reduced in size by taking advantage of robots. They should also be written so that if you've never done something before you can still follow them and do a specific task reasonably well.

They should contain things like:

1. How do I spin up a project?
2. How do I Tandemize an existing project?
3. How do I send out invoices?
4. How do I qualify a sale?

### Templates

`docs/templates`

Templates should act as starting points we use in our projects and products. Ideally they can be pulled directly from here and surfaced in downstream repos so we can make changes in one place and then update things downstream.

While there is no strict rule around what kinds of templates can live here, here are a few examples:

1. Project READMEs and related docs eg architectural plans, project briefs, etc.
2. Project tickets or issues that should exist in all our work
3. GitHub issue and pull request templates
4. Metadata for common tags to use across projects
5. DevOps templates like `.travis.yml`, `.lando.yml` etc

In the aim of efficiency many templates _should_ try to connect back to other guides contained withint this repo so we can do our best to tie things together.

### Automation scripts

`scripts`

Scripts or Lando automation that can be used on many projects can live here as well. **TODO:** We still need a good delivery mechanism for this but it would be great to centralize and distribute useful things like

1. platform.sh DevOps setup
2. Project scaffolding scripts eg automatic population of issues, labels, READMEs, etc
3. Lando commands to pull databases/files from platform.sh

## Getting Started

Before you begin make sure you [have all the things you need](https://docs.thinktandem.io/handbook/tools.html/) and have a decent idea about [how Lando works](https://docs.devwithlando.io/started.html).

### Developing

You can easily get the site running locally.

```bash
# Clone this repo
git clone git@github.com:thinktandem/tandem.git

# Start it up
cd tandem
lando start

# Get a helpful list of all your lando commands
lando
```

### Testing

```bash
# Run the markdown linter
lando test
```

### Contributing

Contributing can be broken down into three guides...

1. [Improving Tandem](https://docs.thinktandem.io/guides/business.html#improving-tandem)
2. [Contributing code](https://docs.thinktandem.io/guides/process.html#contributing-code/)
3. [QAing code](https://docs.thinktandem.io/guides/process.html#qaing-code/)

## References

* [History of this project](https://docs.thinktandem.io/manifesto/history.html#horoscope)
* [Lando docs](https://docs.devwithlando.io/)
* [Vuepress docs](https://vuepress.vuejs.org)
