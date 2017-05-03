Horoscope
=========

This is a repository that contains non-billable tasks and [internal documentation](https://docs.thinktandem.io) for Tandem. Here is a non-exhaustive list of some task titles that might live here:

  1. Spin up a spreadsheet to track productivity
  2. Launch internal documentation site for Tandem
  3. Document roles and responsibilites
  4. Q2 sales initiatives
  5. Solctice party planning
  6. Hiring laravel developer
  7. Google hangout whiskey tasting?

There is a GitHub issue template that you can follow but at the very least stub out a title.

Documentation
-------------

Documentation currently lives at [https://docs.thinktandem.io](https://docs.thinktandem.io) and it has user/pass auth:

```bash
user: tandem
pass: tandem
```

### Running Locally

It may be desireable to serve documentation locally so you can check out edits before submitting a pull request. To do so you will want to make sure you are pre-equipped with:

1. [SSH keys to access this repo](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
1. [node/npm](https://nodejs.org/en/)
2. [lando](http://docs.lndo.io) (optional)

And then the following CLI magix:

```bash
# Pull repo
git@github.com:thinktandem/horoscope.git
cd horoscope

# Install npm dependencies
npm install

# Install dependencies and build out the GitBook
npm run-script gitbook

# Serve via lando or fallback to GitBook's native server
npm run-script serve
```

**NOTE:** If you rebuild the GitBook you may need to restart Lando for your changes to show up. This is because GitBook removes the entire webroot on a rebuild which causes Lando's file syncing to halt.

Task Workflow
-------------

Horoscope uses [ZenHub](https://www.zenhub.com/) to organize tasks in a nice Kanban style board. Tasks should fit into one of the following colums:

  * **NEW ISSUES:** Task just showed up on the scence (OTS).
  * **FUTURE CONSIDERATIONS:** Meta task or future food for thought.
  * **WITHIN THE QUARTER:** Tasks that should be completed within the quarter.
  * **WITHIN THE MONTH:** Tasks that should be completed within the month.
  * **IN PROGRESS:** Tasks that are currently being worked on.
  * **IN REVIEW:** Tasks that are candidates for closure.
  * **CLOSED:** Tasks that are complete.

Here are some general guidelines for dealing with tasks:

  * Tasks should all receive story point estimates via the ZenHub `Estimate` field.
  * Tasks do not currently track against milestones.
  * Tasks can be organized into epics as needed.
  * Tasks move from NEW ISSUES to CLOSED.
  * Tasks can be created by any member of the Tandem organization and at any time.
  * Tasks will be managed and assigned as a team during regularly scheduled standups.

Inspiration
-----------

[Click here](https://www.youtube.com/watch?v=gqwuYX3fZZc) for some inspiration on how to slay tasks like a pro.
