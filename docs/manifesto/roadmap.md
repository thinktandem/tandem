# Goals & Roadmap

Here are some of the major goals we have over the coming years and quarters.

## 2019

In 2019 we want to minimally realize our promise as agency-incubator.

This means we should end the year with a well-defined and documented agency operation, a product (Lando) that generates some revenue, and a plan for how we can grow that product so that it not only generates more revenue but also improves our agency.

### Q3 July - September

#### Agency Goal: Get the house in order

Before we start to grow and improve our agency operations we need to take a step back and take stock of the things we actually have. This means:

* Documenting our current processes, procedures, and technical assets
* Clarifying roles, responsibilities and expectations
* Create a plan for orienting sales around service products

Concrete examples of the above are things like

* Writing a guide for how to start a new project
* A document that expresses the various phases of the project management life cycle
* A spreadsheet that lists our start states
* Enumerating the responsibilities of each role at Tandem
* A project estimation spreadsheet
* An initial sales campaign for a service product

#### Product Goal: Monetize Lando

Before we invest more time into Lando we need it to start generating some revenue. Minimally it needs to generate enough to sustain _at least_ 10 hours a week of at -cost development. This breaks down into the more granular:

* Get GitHub sponsorships and Patreon rolling for Lando Members
* Switch to Carbon ads and monetize our YouTube page
* Reboot our marketing efforts, leverage community as much as possible
* Throw together a basic marketing site with some service offerings
* Sign a few long term support deals
* Move docs to [Vuepress](https://github.com/lando/lando/issues/1410)

### Q4 October - December

#### Agency Goal: Start to improve, automate and tie things together

At this point this site should paint an accurate-enough picture of our current agency, why it exists, its goals and more-or-less how it works towards them. Now we need to start refining that picture, giving frequent and repeatable tasks to the robots and figuring out how we can leverage our products, chiefly Lando, towards these designs. Specifically this means:

* Adding documentation for any key processes or procedures we don't have yet
* Improving and simplifying key documentation
* Replacing high-value or high-risk repeatable steps in our documentation with automation
* Getting more people using Lando to further these designs (see product goals below)
* Start expressing Tandem values in our explicit marketing and sales materials

Concrete examples of the above are things like

* Finally documenting that thing-you've-wanted-to-for-awhile
* Using `lando init` to automatically spin up new projects from start states
* Simplifying our "Start a new project" guide in light of the above automation
* Making our client qualification and project estimatation processes _even better_
* Running sales campaigns around service products derived from above automation

#### Product Goal: Release Lando and lock down its roadmap

At this point we should have enough incoming revenue to justify a final push towards a Lando stable release and the post-stable-release roadmap.

We've identified a _Lando Hub_ type offering as a subsequent product idea that we could proof of concept in our agency work. This would give us a single thing to work on that advances _in tandem_ both our agency goals of automation and value-over-hours and our desire to quickly bring another product to market. In order to do this we need to:

* Fix remaining major bugs
* Finish implementing [name volume performance feature](https://github.com/lando/lando/issues/1460)
* Finish implementing [better SSH key handling](https://github.com/lando/lando/issues/478)
* Define a _Lando Hub_ roadmap that also solves some of our immediate agency needs in its MVP
* Start working towards the above by slowly and strategically leveraging Lando to automate parts of our agency operation
