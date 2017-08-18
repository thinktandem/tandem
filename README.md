Horoscope
=========

This is a repository that contains non-billable tasks and [internal (but public) documentation](https://docs.thinktandem.io) for [Tandem](https://thinktandem.io). Here is a non-exhaustive list of some task titles that might live here:

1.  Spin up a spreadsheet to track productivity
2.  Launch internal documentation site for Tandem
3.  Document roles and responsibilites
4.  Q2 sales initiatives
5.  Solctice party planning
6.  Hiring laravel developer
7.  Google hangout whiskey tasting?

There is a GitHub issue template that you can follow but at the very least stub out a title.

Documentation
-------------

Documentation lives at [https://docs.thinktandem.io](https://docs.thinktandem.io) and **IS PUBLIC** so try not to include any potentially sensitive information such as:

*   Client names or information
*   Employee names or information
*   Any Tandem related usernames or passwords

If you aren't sure whether something should be in the docs **ASK SOMEONE!!!**

Workflow
--------

The Tandem [dev workflow](https://docs.thinktandem.io/coding/dev-workflow.html) is dogfooded for this repository as well. No sense in repeating it here!

Development
-----------

It may be desireable to serve documentation locally so you can check out edits before submitting a pull request. To do so you will want to make sure you are pre-equipped with:

1.  [SSH keys to access this repo](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
2.  [lando](http://docs.lndo.io) (optional)

### Get Running

```bash
# Pull repo
git clone git@github.com:thinktandem/horoscope.git
cd horoscope

# Install npm and gitbook dependencies
lando npm install

# Start up the docs
lando start

# Tail the doc logs
# This will allow you to watch for auto reload events when you change a file
lando logs -f --services appserver
```

Inspiration
-----------

[Click here](https://www.youtube.com/watch?v=gqwuYX3fZZc) for some inspiration on how to slay tasks like a pro.
