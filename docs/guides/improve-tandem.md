# Improving Tandem

_Almost all_ improvements to Tandem should be contributed to the main [Tandem Repository](https://github.com/thinktandem/tandem).

::: tip PRO TIP
Consult [Structure](#structure) below and if you've got an improvement that doesn't fit then [suggest a change!](#suggesting-a-change) In fact, you can submit a change or idea to pretty much anything here!
:::

This repository seeks to build on [the lessons learned from _Horoscope_](https://docs.thinktandem.io/manifesto/history.html#horoscope). As such, its goal is to continually, incrementally, and iteratively improve the business so we can increasingly focus on the things that matter most while maximizing our flow.

This means that _on a high level_ someone should be able to go there with an idea or suggestion and...

1. Put it through a standardized vetting, prioritization and refinement process
2. End up with small and actionable tasks that can be advanced by a team slowly and methodically over some time frame
3. Make contributions into a predefined and obvious structure
4. Have their contributions automatically deployed to the places where they have the most impact
5. Improve Tandem by removing repetition, variables and confusion from our work and processes

## Understanding the specifics

Specifically the repo...

### 1. Is a single source of truth

This repository should hold _anything_ that makes Tandem run better, faster and stronger but it should do so within a well defined structure so its obvious where things should go. In this way it should act as a intuitively organizied single source of truth for our most important assets.

A caveat to this is we don't want to include anything that should _obviously_ be its own repository. For example things like specific project repositories, start states, seeds, modules, plugins, etc should exist on their own but should also be tied to this repository in some way.

Beyond the above caveat its important for this repo to contain _as much stuff as possible_. This reduces cognitive load, increases transparency when important things change and helps maintain company-building momentum.

### 2. Ties things together

Its not enough to have a single source of truth floating in isolation in the aether; it needs to have practical value and be useful. To that end, this repo, like a [good rug to a room](https://www.youtube.com/watch?v=ezQLP1dj_t8), needs to also tie everything we do together. This means that when we add or update this repo with something, that something needs to also surface, ideally via some sort of automation, _someplace else_ where it makes sense and can be put to use.

Here are a few specific examples of how we can tie things together:

* Employee handbook or company documentation changes automatically notify people on Slack
* Project README template improvements automatically open pull requests on downstream repos
* Aforementioned README templates link back to helpful documentation stored here
* Project start states can pull in new scripts and Lando plugins from here

It's difficult for a human to consistently remember to come back here for the things they need. Let's use the robots to make sure we are shipping things to the most useful places.

**@TODO:** Would be great to actually have the above things so we can SHOW instead of TELL

**@TODO:** the exact engineering mechanisms around parts of the above of this need to be better deifined and will likely be one of the first things we tackle

### 3. Provides a resilient process

The final piece of the puzzle here is to define a resilient process we all can use to surface business improvements. The process should be

* Easy to understand and document
* Require minimal oversight
* Mostly asynchronous
* Run on its own inertia.

It should also provide some "objective" prioritization mechanism and encourage tasks be broken into very small chunks that are worked on in teams of two or more.

## Understanding the structure

So while _anything and everything that makes Tandem run better, faster stronger_ is our high level metric around inclusion we _do_ currently have a more concrete and extant structure.

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

::: tip PRO TIP
Guides are best written with a singular and specific focus and container withing a singular markdown file. This helps to minimize overlap and confusion while maximizing portability and ease of writing, amongst other things.
:::

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

## Suggesting a change

Suggesting a change is _very_ straightforward. [Create a new issue](https://github.com/thinktandem/tandem/issues/new/choose) and select the type of thing that best matches your suggestion or idea. Then fill out the pre-populated first comment generated by the [issue template](https://help.github.com/en/articles/creating-issue-templates-for-your-repository). In a nutshell: _**that's it!**_

That said, here is a bit more context about the _kinds of things_ you can suggest.

::: tip PRO TIP
Note that while `Proposals` oft spawn most `Action Items` they are not fundamentally coupled. Ergo, feel free to submit either!
:::

### 1. Action Items

Action items are tasks that can be done to fufill a [Proposal](#_2-proposals) or they can exist on their own. They should be...

* Well defined, scoped and easy to understand
* Require only a few hours of time to complete
* Immediately actionable

::: tip PRO TIP
Immediately actionable means that they should provide enough context and detail so that anyone can grab one and see them through to completion with minimal to zero help from others.
:::

_Generally_, action items should be able to fit into the following categories

#### Bug/Improvement

A bug/improvement should detail steps to replicate a "problem" and then suggest a "fix" or "improvement".

#### Task

A task is something to be done that does not fit as a bug or an improvement. They follow a much looser structure than `bugs` or `proposals`. They should seek to provide the "minimal amount of information required" so that someone else can _get started_ without requiring a ton of feedback. To that end tasks can take various forms such as ...

* A glorified placeholder with an obvious and simple task so that something can be tracked
* A user story with a list of action items
* A feature with a rough sketch of a technical architecture and/or implementation
* A haiku, limmerick or sonnet

Use your best judgment and do not [choose poorly](https://www.youtube.com/watch?v=Ubw5N8iVDHI).

#### Discussion

If you need to _talk it out_ before you submit a proposal or if a proposal demands further discussion this is the action item for you.

#### Note

If you just want a public place to dump some notes so that you can use them later to submit a more immediately actionable ticket this is the item for you.

### 2. Proposals

Proposals are generally a way to surface a higher level problem, sketch a rough solution, engage in debate and describe the value of that solution to the org vis-a-vis its goals, roadmap and priorities.

They are differ from [Action Items](#_1-action-items) in that they...

* Can be broken down into distinct action items
* Should take many weeks or months to fully resolve
* Require the contribution of many team members
* Require a more formal prioritization matrix

_Generally_, they should be used to surface bigger ideas about...

#### The business

* How this [repo](https://github.com/thinktandem/tandem) works
* Our company [Manifesto](/manifesto/)
* Our [Employee handbook](/handbook/)

#### Its operations

**TODO:** It would be great if we could link the below to somewhere, or validate the list generally

* Sales
* Discovery
* DevOps
* Design
* Project Management
* Engineering
* Misc

:::tip PRO TIP
Operations based proposals are best started as a _Guide_ and then progressively automated away.
:::

#### Its products

**@TODO:** TBD

## Managing the process

The formal management around this process should be relatively low-touch and mostly run on its own inertia. _Generally,_ a few proposals and action items should be selected, advanced and completed over the course of a few months ideally under a single focus like "Improving sales" or "Improving DevOps".

Our primary _all hands on deck_ meeting to make this process happen will be at the end of every week eastern time for one hour. All other collaboration and communication should be async with a sprinkling of ad-hoc meetings as deemed necessary.

The content and agenda of our formale Friday meeting should change based on where we are in the milestone cycle but should generally follow this pattern:

**@TODO:** This is a rough sketch that needs to be fleshed out over time.

**@TODO:** Should we add rough agendas to each of the below sections to help keep the person managing the meeting on task?

**@TODO:** Eventually we will have a 'Keeper of the faith' role and said keepers should be responsible for leading this process, ideally there is a "high sparrow" and their acolyte or a Rule of Two "master/apprectice" model where the master leads and the apprentice provides backup, redundancy and keeps the master on their toes

### 1. Determining focus

We likely will have casually discussed the next focus of our company building activities beforehand but the first meeting of a _new cycle_ should determine a focus, review the spreadsheet and select priority proposals and action items to advance.

The result of that meeting should be...

* A GitHub milestone with a start, due date and details about the agreed upon focus
* Issues assigned to people

::: tip PRO TIP
Every proposal and action item should be assigned to at least two people. This should help ensure momentum via redundancy and also makes sure that at least two people know about the thing @TODO: explain this better
:::

### 2. Working, collaborating and showing

Once a focus has been determined and issues assigned, subsequent meetings should focus on progress updates and a show-and-tell of new contributions if applicable.

This should also include normal standup things like status checks, unblocking blockers, etc.

### 3. Retro and Repopulating

Once the milestone is completed we should take a few weeks to retro and then repopulate the queue with proposals and action items so we can begin anew.

## Choosing and working on issues

Generally you should work on an issue assigned to you that fits within the currently agrees upon _focus_ and cycle. However, _everyone_ should be encouraged to work on any _Action Items_ that are outside of the focus if they are motivated.
