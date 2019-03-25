---
description: Methods on how to setup tooling for a Drupal 8 Migration.
---
Drupal 8 Migration Setup & Toolings
====================================

Resources
---------

* [Preparing a site for upgrade to Drupal 8](https://www.drupal.org/node/2350603)
* [Upgrade using Drush](https://www.drupal.org/docs/8/upgrade/upgrade-using-drush)
* [Drush Migrate commands](https://www.drupal.org/node/1561820)

Toolings
--------

* [Lando](https://github.com/lando/lando)

Modules
-------

* [Migrate Drupal](https://www.drupal.org/project/migrate_drupal)
* [Migrate Plus](https://www.drupal.org/project/migrate_plus)
* [Migrate Tools](https://www.drupal.org/project/migrate_tools)
* [Migrate Upgrade](https://www.drupal.org/project/migrate_upgrade)


Lando 2 DB Based Migration
--------------------------

1. Setup your [Drupal 7 site in Lando](https://docs.devwithlando.io/tutorials/drupal7.html).
2. Setup your [Drupal 8 site in Lando](https://docs.devwithlando.io/tutorials/drupal8.html).
3. In your .lando.yml of your Drupal 8 site add an additional DB service as such and run a ```lando rebuild```:

    ```yml
    services:
      d7db:
        type: mariadb
        creds:
          user: drupal7db
          password: drupal7db
          database: drupal7db
    ```

4. Create a custom module in your Drupal 8 site that uses Modules listed above as dependent.
5. Export your Drupal 7 site's DB with ```lando db-export dump.sql.gz```
6. Add a settings.local.php into your Drupal 8 site:

    ```php
    $databases['migrate']['default'] = array(
      'database' => 'drupal7db',
      'username' => 'drupal7db',
      'password' => 'drupal7db',
      'prefix' => '',
      'host' => 'd7db',
      'port' => '3306',
      'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
      'driver' => 'mysql',
    );
    ```

7. Copy your DB dump into the root of your Drupal 8 site.
8. Import the Drupal 7 DB into your Drupal 8 site with:

    ```bash
    lando db-import --host=d7db --user=drupal7db dump.sql.gz
    ```

9. In your D8 site run the following:

    ```bash
    lando drush migrate-upgrade --legacy-db-key=migrate --configure-only
    lando drush config-export --destination=/tmp/migrate
    lando ssh
    cp /tmp/migrate/migrate_plus.* /app/path/to/custom-migrate-module/config/install
    ```

10. Remove any files you don't want to migrate.  Make sure to read the required dependencies at the bottom of each yml file.
11. Change the group config if it isn't already: In your files named migrate_plus.migration_group.GROUP-NAME.yml, edit the last line: shared_configuration: null to the following:

    ```yml
    shared_configuration:
      source:
        key: migrate
    ```

12. Run ```lando drush ms``` to see the status of the migration.  Use the migration commands as you need from this point on.
