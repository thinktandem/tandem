Postgres DB on Platform.sh
----

If you need to import a new clean database to a Platform.sh environment (not master); here is how:

* Make a backup of master and {environment}.
  * Create a restore point through the Platform.sh dashboard
  * `platform --environment=master --relationship=pgdatabase db:dump`
  * `platform --environment={environment} --relationship=pgdatabase db:dump`

* Drop the `main` database tables (to start with a clean slate):
  * `platform --environment={environment} --relationship=pgdatabase sql`
  * `\c postgres` (just connect to any database besides main)
  * `drop owned by main` (this will drop the tables not the DB)
    * NOTE: Dropping the DB will leave you in a bad state; as your user does not
    have permission to recreate the `main` DB.  If you do get into this state use
    the restore point you created in the Platform.sh dashboard.

* Import the backup or fresh DB you need.
  * `platform --environment={environment} --relationship=pgdatabase sql < {eexfnw4wjjady--master--dump}.sql`

If you see tables in the freshly imported data make sure to check your schema
(in PSequel top left dropdown) and make sure it is set to `automatic` that should
have the tables you expect.
