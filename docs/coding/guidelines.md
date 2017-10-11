Guidelines
==========

In order for Tandem to quickly and consistently deliver high quality, stable, performant, reproducable, testable and efficient code it's important to follow our high level guidelines of:

<!-- toc -->

### Standarization

Working with other developers can introduce a lot of extra variablity to a given project. Developers often use different development tools, coding standards, debuggers and sets of "go to" extensions, modules or plugins. This can add significant and completely uneeded overhead, stress and existential angst to a given project.

At Tandem we try to reduce these variables for our team and increase the safe assumptions Developer A can make about Developer B's setup.  This helps us:

* Avoid "works on my machine" problems
* Increase team cohesion and lower developer on developer rage
* Get started developing faster
* Reduce guess work for unspecified project requirements
* Transfer work seamlessly between multiple people
* Get things done faster

Specifically, we accomplish this on a project-to-project basis with:

* **[Lando](https://github.com/lando/lando)** - Consistent development dependencies
* **Code Standards** - CI enforced code standards
* **GitHub Flow** - Same process to commit, test and deploy code
* **Hosting** - Hosted on either [Pantheon](https://pantheon.io) or [Platform.sh](https://platform.sh)
* **Docs** - Important steps are well documented

### Minimalism

The shortest path between two points is a straight line! We always try to use the least amount of code and dependencies required to solve a particular problem. Less code and dependencies are almost universally:

* Easier to maintain
* Easier to replace
* More performant
* Easier to debug
* Less prone to regressions
* More stable and reliable
* Easier to show and knowledge transfer to someone else
* Easier to test, comment and document
* More readable

Ultimately these benefits are passed onto clients in the form of reduced cost and faster implementation times.

### Open Source

Tandem builds most of its projects on software with very mature and modular open source ecosystems. If you are doing something that is not unique to a given project there is a **VERY HIGH PROBABILITY** that someone else has already written a helpful and well adopted module, extension or plugin that you can use. Good examples are [lodash](https://lodash.com/docs) as a `nodejs` utility library and [guzzle](http://docs.guzzlephp.org/en/stable/) as a `php` http request library.

That said, relying on open source projects can be frought with its own set of perils. Here are some good questions to help you decide whether to use an upstream dependency or not:

* Did you consult our [common tools section](./common-tools.md)?
* Have you asked other developers at Tandem about what to use?
* Does the project have a lot of recent usage eg downloads or GitHub stars?
* Is the project the most well known and most often used project in its class?
* Is the project actively maintained with a robust issue queue and recent commits?
* Is the project maintained by a developer with a good track record?

It's also important to note that sometimes a project may feel like a good fit when in actuality **IT'S A TRAP!!!**. Here are some telltale signs that you are either squaring the circle or making more trouble for yourself.

* The project claims to address your issue but is lax on specifics or documentation.
* The project solves a much much wider use case than what you need it for.
* The project contains significantly more code than what it would take to write your own.

In these situations it's best to write your own code and open source that code back to ecosystem so everyone can benefit from it in the future.

### Knowledge Sharing

In order for Tandem to deliver results quickly it's super important to be able to plug in the most available developer with the least overhead and impact on other developers time. This means having good passive mechanisms to transfer knowledge, namely:

* Readable and well commented code
* Documentation

All Tandem code should be readable and well commented. This does not necessarily mean following a strict commenting standard but instead means complex logic and obtuse code needs to be commented so a developer with no prior knowledge of the project understands both what the code does and why the implementor wrote it that way. For example, if you were rushed to finish up a piece of functionality and had to cut some corners you should indicate your code may not be ideal.

All Tandem projects should also feature a `README.md` that at the minimum contains:

* Instructions on how to get the project running locally with Lando
* Instructions on how to run any relevant test suites if applicable
* Instructions on how to set up any relevant API keys or third party integrations
* A high level brief about the project (usually in `BRIEF.md`)
* Any additional requirements that are specific to the project

### Testing

@todo: this might not make sense given we have a QA section?
