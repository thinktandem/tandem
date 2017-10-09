Horoscope
=========

This is a repository that contains non-billable tasks and [internal (but public) documentation](https://docs.thinktandem.io) for [Tandem](https://thinktandem.io). Here is a non-exhaustive list of some task titles that might live here:

1.  Spin up a spreadsheet to track productivity
2.  Launch internal documentation site for Tandem
3.  Document roles and responsibilities
4.  Q2 sales initiatives
5.  Solstice party planning
6.  Hiring a Laravel developer
7.  Google Hangout for whiskey tasting?

There is a GitHub issue template that you can follow, but at the very least, stub out a title.

Documentation
-------------

Documentation lives at [https://docs.thinktandem.io](https://docs.thinktandem.io) and **IS PUBLIC** so try not to include any potentially sensitive information such as:

* Client names or information
* Employee names or information
* Any Tandem related usernames or passwords

If you aren't sure whether something should be in the docs **ASK SOMEONE!!!**

Workflow
--------

The Tandem [dev workflow](https://docs.thinktandem.io/coding/dev-workflow.html) is dogfooded for this repository as well. No sense in repeating it here!

Development
-----------

It may be desirable to browse this documentation locally so that you can review your edits before submitting a pull request. To do so, we recommend that you are equipped with:

1.  [SSH keys - to access this Github repo](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
2.  [Lando - localhost development environment](http://docs.lndo.io)

### Get This Site Running Locally

```bash
# Pull repo
git clone git@github.com:thinktandem/horoscope.git
cd horoscope

# Install npm and gitbook dependencies
lando npm install

# Start up the docs
# NOTE: You may need to run this twice
lando start
```

### Watching The Server Logs

This will allow you to watch for auto reload events when you change a file. The app needs to actually be running first.

```bash
# Tail the doc logs
lando logs -f --services appserver
```

### Running Tests

Make sure your `*.md` files COMPLY with our standards.

```bash
lando test || lando npm test
```

Inspiration
-----------

[Click here](https://www.youtube.com/watch?v=gqwuYX3fZZc) for some inspiration on how to slay tasks like a pro.
