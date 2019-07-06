# Improving Tandem

_Almost all_ improvements to Tandem should be contributed to the main [Tandem Repository](https://github.com/thinktandem/tandem).

::: tip PRO TIP
Consult [Structure](#structure) below and if you've got an improvement that doesn't fit then [suggest a change!](#suggesting-a-change) In fact, you can submit a change or idea to pretty much anything here!
:::

This repository seeks to build on [the lessons learned from _Horoscope_](https://docs.thinktandem.io/manifesto/history.html#horoscope). As such, its goal is to continually, incrementally, and iteratively improve the business so we can increasingly focus on the things that matter most while maximizing our flow.

This means that _on a high level_ someone should be able to go there with an idea or suggestion and...

1. Put it through a standardized vetting, prioritization and refinement process
2. End up with small, actionable and connected tasks that can be advanced by a team slowly and methodically over some time frame
3. Make contributions into a predefined and obvious structure
4. Have their contributions automatically deployed to the places where they have the most impact
5. Improve Tandem by removing repetition, variables and confusion from our work

## Understanding the specifics

Specifically the repo...

### 1. Is a single source of truth

This repository should hold _anything_ that makes Tandem run better, faster and stronger but it should do so within a well defined structure so its obvious where things should go. In this way it should act as an intuitively organizied single source of truth for our most important assets.

A caveat to this is we don't want to include anything that should _obviously_ be its own repository. For example things like specific project repositories, start states, seeds, modules, plugins, etc should exist on their own but should also be tied to this repository in some way.

Beyond the above caveat its important for this repo to contain _as much stuff as possible_. This reduces cognitive load, increases transparency when important things change and helps maintain company-building momentum.

### 2. Ties things together

Its not enough to have a single source of truth floating in isolation in the aether; it needs to have practical value and be useful. To that end, this repo, like a [good rug to a room](https://www.youtube.com/watch?v=ezQLP1dj_t8), needs to also tie everything we do together. This means that when we add or update this repo with something, that something needs to also surface, ideally via some sort of automation, _someplace else_ where it makes sense and can be put to use.

Here are a few specific examples of how we can tie things together:

* Employee handbook or company documentation changes automatically notify people on Slack
* Project README template improvements automatically open pull requests on downstream repos
* Aforementioned README templates link back to helpful documentation stored here
* Project start states can pull in new scripts and Lando plugins from here

It's difficult for a human to consistently remember to come back here for the things they need. Let's use the robots to make sure we are shipping things from here to the most useful places.

* **@TODO:** Would be great to actually have the above things so we can SHOW instead of TELL
* **@TODO:** the exact engineering mechanisms around parts of the above of this need to be better defined and will likely be one of the first things we tackle

### 3. Provides a resilient process

The final piece of the puzzle here is to define a resilient process we all can use to surface important issues or questions and then work, ideally together, on improving how we do things. The process should be

* Easy to understand and document
* Require minimal oversight
* Mostly asynchronous
* Run on its own inertia.

It should also provide some "objective" prioritization mechanism and encourage tasks be broken into very small chunks that are worked on in teams of two or more.

* **@TODO:** This needs to be defined and fleshed out a bit more.

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

The handbook should be the place for all new employees to get spun up and integrated into the Tandem way with minimal disruption and loss of flow. It may also store other helpful information about the comapny that does not belong as either a Guide or in the Manifesto. For example an enumeration of our sales channels or how our sales process works might fit best in the handbook.

It should contain:

1. The things an employee needs to do on their first day to get rolling
2. Company policies around benefits, pto, etc
3. Other relevant materials that do not fit as Guides or within the manifesto

### Guides

`docs/guides`

Guides should ultimately seek to answer questions like _How do I do X at Tandem?_. They should be written for people trying to do something for the first time. This maximizes team flow by reducing the time spent showing someone how to do something, allows knowledge to be transferred in a standardized way and builds a more resilient and redundant team that more or less does things the same way.

That said, guides should always be just a _starting point_ in the move towards higher levels of automation. We should constantly and continuously be trying to reduce the size, complexity and time spent going through each guide in favor of the robots. To that end we are advantaged if all our guides follow this "Guide Journey":

1. A rough sketch or outline of a process is created
2. The sketch is fleshed out with helpful details, scripts, templates, etc
3. The robots are used so that manual steps like running a script, copying a template or populating a backlog are done automatically

::: tip PRO TIP
Guides are best written with a singular and specific focus and contained within a singular markdown file. This helps to minimize overlap and confusion while maximizing portability and ease of writing, amongst other things.
:::

Some examples of guides are things like:

1. How do I spin up a project?
2. How do I Tandemize an existing project?
3. How do I send out invoices?
4. How do I qualify a sale?

### Templates

`docs/templates`

If Guides serve as a high level view of _how_ something should happen then Templates serve as, at least part of, the _what_. This means that templates should be deployable scaffolding for use in various projects and products. Ideally they can be pulled directly from here and surfaced in downstream repos so we can make changes in one place and then update things downstream.

While there is no strict rule around what kinds of templates can live here, here are a few examples:

1. Project READMEs and related docs eg architectural plans, project briefs, etc.
2. Project tickets or issues that should exist in all our work
3. GitHub issue and pull request templates
4. Metadata for common tags to use across projects
5. DevOps templates like `.travis.yml`, `.lando.yml` etc

In the aim of efficiency many templates _should_ try to connect back to other guides contained within this repo so we can do our best to tie things together.

### Automation scripts

`scripts`

Scripts or Lando automation that can be used on many projects can live here as well.

* **TODO:** We still need a good delivery mechanism for this but it would be great to centralize and distribute useful things like

1. platform.sh DevOps setup
2. Project scaffolding scripts eg automatic population of issues, labels, READMEs, etc
3. Lando commands to pull databases/files from platform.sh

## Suggesting a change

Suggesting a change is _very_ straightforward. [Create a new issue](https://github.com/thinktandem/tandem/issues/new/choose) and select the type of thing that best matches what you are trying to do. Then fill out the pre-populated first comment generated by the [issue template](https://help.github.com/en/articles/creating-issue-templates-for-your-repository). In a nutshell: _**that's it!**_

That said, here is a bit more context about the _kinds of things_ you can suggest.

### 1. Discussion

Discussions are a way for individuals to surface problems, concerns or ideas that should be worked on collectively. Ultimately, a discussion that is worth its salt should spawn actionable tasks that will improve the business.

That said not every task needs to be generated from a discussion. _Generally_ discussions can be used to...

1. Verify a problem
2. Validate an idea
3. Expand or hone thinking on a particular task under consideration
4. Clarify an extant policy or procedure that is confusing
5. Discuss things in a forum-like experience

However, they can and should also be used more broadly for anything that benefits from collective ideation and collaboration.

::: tip PRO TIP
You can prompt a discussion using the template in whatever way you think is best but a good format to follow if you are just starting is something like this.

1. A sentence that best describes how this particular discussion helps advance Tandem
2. A quick sketch of any initial ideas, solutions, etc you may have
3. A question to prompt comments or feedback

> Example: It's not been super reliable copying/pasting our standard set of project tickets into each new project. This is at a minimum causing a lot of internal confusion and duplicate work and at a maximum inconsistent (or nonexistant) deliverables to our clients. I'm guessing we could probably automate this process using our internal Tandem Lando plugin. Do you guys agree that is the right approach? Can you think of how we can make this as bulletproof as possible?
>
:::

### 2. Task

A task is something that is immediately actionable and _generally_ can be completed in 3 story points or less. They should seek to provide the "minimal amount of information required" so that someone else can at least _get started on_ and at most _complete_ the issue without requiring a ton of feedback.

If applicable, they should be created in pairs and linked together so that there is always a "next task" (or discussion!) to do. This ensures that we can slowly and iteratively chain multiple tasks and discussions together towards bigger goals and so that we don't lose momentum or stop improving things prematurely.

Optionally, if you have the [gift of foresight](https://yarn.co/yarn-clip/bdb49678-d85f-42fb-84cb-f48f2610876c) you should feel free to chain as many tasks together as you think makes sense. This could be 7 fully fleshed out tasks that accomplish a larger goal or it could be the minimum 2 tasks where the second task simply sketches out some _ideas_ for the next task. Caveat here is that each task you add to a chain probably diminishes in actionability and accuracy because it's likely things will change as you go through previous tasks. Try to find a good balance.

::: tip PRO TIP
Immediately actionable means that they should provide enough context and detail so that anyone can grab one and see them through to completion with minimal to zero help from others.
:::

To that end tasks can take various forms such as...

* A glorified placeholder with an obvious and simple task so that something can be tracked
* A user story with a list of action items
* A feature with a rough sketch of a technical architecture and/or implementation
* A haiku, limmerick or sonnet

They should seek to be...

* Well defined, scoped and easy to understand
* Require only a few hours of time to complete
* Immediately actionable

### 3. Note

If you just want a public place to dump some notes so that you can use them later to whatever ends then spin up a note.

## Managing the process

The formal management around our improvement process should be relatively low-touch and mostly run on its own inertia. It will primarily feature an _all hands on deck_ meeting run by the Keeper(s) of the Faith (@todo: link to this role and who occupies the role) at the end of every week eastern time and it will last for one hour.

All other collaboration and communication should be async with a sprinkling of ad-hoc meetings as deemed necessary. The Keeper(s) of the faith will be primarily responsible for managing the Kanban board and function as "project managers" (@todo also link to this role when its up) of the "Tandem product".

The content and agenda of our the formal Friday meeting will change based on where we are in a given cycle but should generally follow this pattern:

### 1. Determining focus

We likely will have casually discussed the next focus or milestone of our company building activities beforehand but the first meeting of a _new cycle_ should determine a focus (or two) to advance.

The result of that meeting should be...

* A GitHub milestone (and/or release?) with a start, due date and details about the agreed upon focus
* A populated backlog with a reasonable amount of story points for the milestone
* A few initial issues assigned to everyone

### 2. Working, collaborating and showing

Once a focus has been determined and _tasks_ assigned, subsequent meetings should by run in general standup format until the milestone is completed. This should minimally include normal standup things like progress updates from everyone on in progress issues, unblocking blockers, etc but on occasion it may be appropriate to optionally mix in some combination of these things as well:

* **Milestone management** - Are we on pace to achieve the milestone? Do we need to pivot or alter the plan? Is there another pressing milestone or focus that we need to work on concurrently?
* **Show and tell** - Are their any big ticket things that have been changed that need to be shared in a lunch-and-learn style format?
* **Discussion** - Are their any discussion issues that have gotten WAY out of control and could benefit from a group chat?

* **TODO:** should we have formal meeting agendas and/or note taking to help this process since they could differ a lot from meeting to meeting?

### 3. Retro and Repopulating

Once the milestone is completed we should perform a retrospective on this process and whether we can improve it. If we can then we should spin up a brief cycle with process improvement as the milestone.

* **@TODO**: agenda for this?

## Choosing and working on tasks

Generally and ideally you should be working with at least one other person on any task(s) assigned to you that are also associated with an active and in-progress milestone. There are a few things to expect there

### 1. Responsibility

If you are the only person assigned to an issue then you are singularly responsible for completing that task. If you are assigned to a task with more than one person _it is up to all the people on the task to figure out how the work gets divvied up_ but regardless of how that happens you are all _equally responsible_ for getting the task done.

### 2. Staying active

There will be circumstances where you are not assigned to any tasks but you have time to work on stuff. In these situations you should self-assign a ticket within an in-progress milestone. Ideally, you will also find at least one other person to work on the issue with you. Obviously _ask them_ if they want to work on it with you ;)

In some circumstances there will be no tickets in the current milestone(s) that you can advance either because the milestone is almost done or because you are not sure how to advance the task. In these situations you should select _any_ ticket that you feel capable of advancing. Obviously use your best judgment to select a ticket that will bring value to Tandem as soon as possible. Tasks labeled as `one-off` may be great first candidates.
