---
title: "Devsigner 2017 Takeaways"
tags:
    - conferences
    - alecr
author: "Alec Reynolds"
date: "2017-09-22"
summary: "Highlights from Portland's Devsigner Conference."
id: alecr
pic: "https://www.gravatar.com/avatar/f274dbe2c9fbaac8339c01d918ba50b5"
location: California
---

The following are notes from the 2017 Devsigner Conference in Portland. We're updating this live as we attend sessions.

Big thanks to the organizers, sponsors, and fellow attendees for making this a fun interactive event!

## Writing Great Tickets

How do you communicate all the steps to take a task from conception through deployment? Rose Hart, currently a product manager at ThinkShout, shared some of her strategies to write complete tickets.

### Source Material for Tickets

Referencing existing resources can provide essential context for tickets without necessitating excessive detail. User stories, feature specifications, or design documentation (ranging from wireframes to complete mockups and prototypes) give the ticket reader a broad overview of _why_ this ticket is important and _how_ other people have been thinking about it.

### Who Should Write the Tickets?

Anyone! Designers can write great tickets because they have user insights. Technical architects and engineers can write great tickets, particularly if they have been embedded in the discovery process so they can combine deep technical knowledge with the big picture goals of the project. Even a junior engineer straight out of code school have valuable insights that can be translated into great tickets.

Collaborative ticket writing can help combine these perspectives to form the ideal ticket. At Tandem, we like having one lead stakeholder write the original ticket, then review with the team during standup to incorporate these other perspectives.

Clients are important in the process, but their energy should be focused towards writing user stories and feature specifications. Whether or not you give clients access to the ticketing system is a choice; Tandem promotes this as a matter of transparency, but many people in this session at Devsigner had misgivings on the subject.

### What Goes in a Ticket?

Tickets include...

- Implementation tasks for Design, Development, Theming
- Checklist defining ticket completion
- Time estimates
- Labels to show priority, whether an issue is blocked, and other statuses

### How Big Should Tickets Be?

Rose believes a maximum of 8hrs of work should be included in a ticket. Beyond that you should start creating multiple tickets. Broadly we agree at Tandem, although we emphasize that concise feature-focused tickets are ideal.

### Ticketing Tooling

I was extremely happy to hear that ThinkShout, like Tandem, is using Zenhub for managing projects. Zenhub provides a Kanban interface, estimation tools, and analytics overlays for Github's native issue management.

## Lando overview

Curious on how to get developers started, from pulling down a new project repository all the way through getting it running on their computer? Our very own Mike Pirog presented Tandem's new Local Development tool, [Lando](https://docs.lndo.io), to show the Devsigner crowd how to cut hours from developer onboarding.

Getting a project started with Lando is a simple process:

1. Clone a project repo that includes a .lando.yml file.
2. Run `lando start`
3. Lando will install all dependencies and launch your site.
4. Run `lando` to see available tooling commands.

### Quick Setup w/ `lando init`

If you want to quickly get started with lando, running `lando init` in an existing project will give you options for using pre-made Lando recipes to spin up your project infrastructure.

### Defining Infrastructure with .lando.yml

Lando spins up local development environments using Docker. Mike showed what a typical .lando.yml file looks like, defining the various pieces of your local infrastructure.

A basic way of doing this is accomplished with *recipes*, which are pre-defined sets of infrastructure for common usecases, like running a Drupal application, a WordPress application, a generic LAMP stack, and many more options. A .lando.yml file using a recipe looks something like this:

```bash
name: mysite
recipe: lamp
```

Further customizations can be made to match the versions of services on your production environment:

```bash
name: mysite
recipe: lamp
config:
	php: 5.6
	webroot: web
	database: mariadb:10.0
```

There are many more options available to customize available tooling, infrastructure, and even build-steps to automate the setup of your app.

### Tools Available on Lando

Upon installing a recipe, Lando can make common tools like composer, grunt, gulp, drush, and many more available. If you run `lando` within your project directory, it'll show all the available commands.

## Aesthetics: The Hidden Force That Rules Your World

Sedona Rigsby works in the Design Services Department at Phase2, where everyday she is applying aesthetics. After finishing her degree at the Art Institute, she says if she had a thesis, it'd be on aesthetics.

### Aesthetics is a sensory language.

Aesthetics is a tool of design, but it itself is _not_ design. Design solves a problem. Aesthetics is part of the solution.

**Exercise:** looking at different images and decoding how they make use feel.

Survival dictates us recognizing certain images as harmful, helpful, or eliciting other emotions that help us appraise the situation. Looking at rotting flesh gives us a much different feeling than looking at a ripe peach. We evolved to appreciate environments conducive to our survival.

### Beauty is instinctual.

Public parks, our ideas of "paradise"; most of these center around lush, varied landscapes with water and territory for game animals.

A sensitivity to aesthetics in humans, displayed by capacity to create art (and perhaps to appreciate it), demonstrates a greater level of fitness. This is a popular theory on how art (and aesthetics) plays a role in sexual selection.

**Exercise:**

1. Pick a cell on the [spreadsheet](https://docs.google.com/document/d/1NQGw_f8kxmawUhsBcpeJO6XL_AAqc5GkRqWrdpaPMRs/edit)
2. Fill in an image you feel is appropriate.

Group analysis of the images and why they were chosen.

### Aesthetics communicates meaning through visual cues.

A horizontal line may be stabilizing and serene, while diagonal lines may introduce more dynamism.

Colors are a great example of this as well.

**Exercise:**

1. Look at a color collage for one minute.
2. Write down 3-5 words to describe it.
3. Choose a single word you like the best for the color

Collect all the words associated with each color and arrange in a color wheel. Quickly we'll see common associations with these images and their dominate colors.

> Design is a strategy, and aesthetics are the players.

All of our design work is viewed through different aesthetics heavily influenced by culture. We have to respect the aesthetics of our intended audience and incorporate that understanding into our design strategy.

## Engineering Experience: Coding Magical Moments in Virtual Reality

Gabe Paez from WILD explained his vision for the new frontiers of our digital world, where the pioneers will be design-thinking developers who can bridge the gaps between highly technical subjects and the emotive.

Spatial designers: people who design things that will be built. Landscape architects, building architects, installation artists; all of these are spatial designers. Gabe wants to empower these people with VR tools so they can show their ideas earlier in the process to prevent late-in-the-game client surprises and denials.

### Introducing Wildspace

Ability to share a virtual reality experience online. Allows multiple people to collaborate around a massing study (architectural mockup). You can see the other person, hear them talking...the ultimate Google Hangout.

You can create shapes interactively to modify and create massing studies. Teleport down to the scale of the study. Take images at different scales and arrange them in the virtual space. Take a "portal" between various workspaces.

> There is no barrier between "creative" and "production".

Creative decisions are made throughout the pipeline. We should encourage that.

### Tips for Coders

- Intelligently compartmentalize your code
- Don't be afraid to refactor
- Use events
- Simplify everything (goes hand-in-hand with refactoring)
- For Unity people: coroutines != threads
- Make it stable
- Make it pretty (maybe the most important thing!)

Taking pride in your work is the essential thread. Your code is a piece of artwork. Respect your craft!

The current challenge of VR: show that it can solve REAL WORLD problems, not VR-exclusive curiosities ("wouldn't it be cool if we could do X in VR?").

## Creating Digital Products for Passive Income

Dustin Lee, founder of Retro Supply Co., shared how creating digital products helped change his life for the better. Starting with $50K of personal debt and with a child on the way, Dustin committed himself to passive recurring revenue. Now he grosses nearly a quarter million dollars per year, happily running his business from his house and enjoying watching his daughter grow up.

### Finding a problem

- What stuff annoys you and other people you work with?
- What are common obstacles in your project?

Example of Dustin's friend, who noticed that people making "retro" logo styles had difficulties creating the small text around the main logo. He built a font that was well-suited for that use case, and made more than $20K off selling that font alone.

> Don't feel like you need to develop a new skillset!

Think about the thing people refer work to you for. Capitalize on those valuable skills you currently have.

Checkout existing platforms for selling products/classes. Places like Creative Market, Gumroad, Skillshare, Patreon, and Product Hunt are wonderful resources.

### Marketing

> The most powerful concept in marketing is owning a word in the prospect's mind.

Two companies can't own the same word in the prospect's mind. You need to either own a different word or have a distinct audience for that same word than your competitors.
