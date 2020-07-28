---
title: 'Working with Postgres Databases and Platform.sh'
tags:
    - localdev
    - devops
author: 'Geoff St. Pierre'
private: false
mainImage: 'https://thinktandem.io/images/articles/postgres-platform.png'
img-src: 'https://thinktandem.io/images/articles/postgres-platform.png'
byline: 'How to work with Postgres Databases on Platform.sh'
date: '2017-05-09'
---

Sharpen your tools!

Requirements
----

* An app setup on Platform.sh using a postgres database.
* A database management application. I will use <a href="http://www.psequel.com/">PSequel</a> in this post.

User Story
----

If you need to import a new clean database to a Platform.sh environment (not master). In my case I was running migrations and needed to ensure that the order of operations was going to apply cleanly to the production copy of the database.

Commands
----

* Make a backups and restore points of `master` and `test` environments.
  * Create a restore point through the Platform.sh dashboard

  <center>
    <img alt="sequel-pro-connection-screen" src="images/articles/platform-restore-point.png" width="433" align="center" />
  </center>

Navigate to your app's Platform.sh dashboard get into the environment you want to replace the DB for, in my case `test`.  Clicking on the `snapshots` icon in the top right of the dashboard will create a snapshot restorable backup point for your app in case something goes horribly wrong ;).

Here are the `platform` cli commands to make a backup of the databases of the environments in question.  First I take a DB dump of the `master` environment to refresh the data from and then a backup of the `test` environment in case I need to get back to it.
* platfrom cli commands:
  * `platform --environment=master --relationship=pgdatabase db:dump`
  * `platform --environment=test --relationship=pgdatabase db:dump`

* Drop the `main` database tables (to start with a clean slate):
  * `platform --environment=test --relationship=pgdatabase sql`
    * This command will drop you into a `psql` shell so you can examine and manipulate the databases.
  * `\c postgres` (just connect to any database besides main)
  * `drop owned by main` (this will drop the tables not the DB)
    * NOTE: Dropping the DB will leave you in a bad state; as your user does not
    have permission to recreate the `main` DB.  If you do get into this state use
    the restore point you created in the Platform.sh dashboard.

* Import the backup or fresh DB you need.
  * `platform --environment=test --relationship=pgdatabase sql < {YOUR_PROJECT_ID--master--dump}.sql`
    * Be sure to replace `YOUR_PROJECT_ID` with your Platform apps ID.  This should already be in the filename if you are following along!

    <center>
      <img alt="sequel-pro-connection-screen" src="images/articles/psequel-dropdown-schema.png" width="433" align="center" />
    </center>
If you see tables in the freshly imported data that don't seem to make sense make sure to check your schema
(in PSequel top left dropdown) and make sure it is set to the correct schema and that should
have the tables you expect.

Conclusion
----

Get to know your tools to save time!  A little exploring of your toolsets everyday goes a long long way.
