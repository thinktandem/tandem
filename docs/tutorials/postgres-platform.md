Postgres DB on Platform.sh
==========================

If you need to import a new clean database to any Platform.sh environment, here's how:

* Make a backup of {export-from} and {import-to} environments.
  * Create restore points through the Platform.sh dashboard
  * `lando platform db:dump -p {export-from-platform} -e {desired-env} -r pgdatabase -f dump.sql`

* Move the DB to the {import-to} environment.
  * `scp dump.sql {import-to-connection}@ssh.us.platform.sh:/app/storage`
  * Note that `/app/storage` is just any public directory you can write to on Platform.

* SSH into {import-to} and import the db.
  * `ssh {import-to-connection@ssh.us.platform.sh`
  * `cd storage`
  * `psql --host=pgdatabase.internal --username=main < dump.sql`

This seems to avoid permissions issues and other problems that have plagued us in the past, even on the Master environments in Platform.sh.
