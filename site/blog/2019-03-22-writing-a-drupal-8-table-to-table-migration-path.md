---
title: 'Writing a Drupal 8 Table to Table Migration Path'
tags:
    - development
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/d7-d8.jpg
img-src: images/articles/d7-d8.jpg
byline: 'Occasionally there may be times where you need to migrate a contrib module''s database table or your own schema''s data to Drupal 8.'
date: '2019-03-22'
---

Use Case For This Effort
-----------------------

I previously wrote about [handling an upgrade path for modules that don't have a Drupal 8 migration path yet](https://thinktandem.io/blog/2018/07/24/writing-a-custom-drupal-8-module-upgrade-path/).  That works well when your module has a Drupal 8 entity already setup and good to go.  Sometimes you just need to move info from a database table.  In our case, we need to move the mapped auth data for the [OneAll Social Login](https://www.drupal.org/project/social_login) module.

OneAll Social Login is used by our client to allow people to login via Facebook and Google.  The module has two tables in the database in Drupal 7 that store authorization mappings needed to login.  We need to migrate this info as it is mapped not only in Drupal but in OneAll Social Login's system.  Failure to do so would not let users login that already had their accounts mapped.


Figuring out what to move
-------------------------

After looking through OneAll Social Login's install file, I knew that there were two tables that needed to get migrated.  The Drupal 7 version of the module utilizes the core table of authmap and also their own table called oneall_social_login_identities.  I then looked at the Drupal 8 module's install file and saw that the two tables I needed to migrate to were oneall_social_login_authmap and oneall_social_login_identities.

<em>Note: for the sake of brevity in this blog post, we will only cover migrating the authmap table since it is the more "complicated" one to move.  However, the oneall_social_login_identities mapping is done exactly the same way, in fact all the columns are one to one.</em>

Before we dive in, I am using my typical Drupal 8 migration [lando](https://docs.devwithlando.io/) setup to handle this migration.  If you want an easy and repeatable way to do migrations with lando, check out my [Florida DrupalCamp presentation](https://www.youtube.com/watch?v=lZ1dzZwcHnU&t=1072s).  If you don't use lando, supplement the commands to coincide with whatever setup you are using.   

### Database Investigations

I hop into my Drupal 7 DB in my lando setup via ```lando ssh -s d7db -u root``` and will use ```DESCRIBE authmap;``` to get what I need.  I get the following output:

```sql
MariaDB [drupal7db]> DESCRIBE authmap;
+----------+------------------+------+-----+---------+----------------+
| Field    | Type             | Null | Key | Default | Extra          |
+----------+------------------+------+-----+---------+----------------+
| aid      | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| uid      | int(11)          | NO   | MUL | 0       |                |
| authname | varchar(128)     | NO   | UNI |         |                |
| module   | varchar(128)     | NO   |     |         |                |
+----------+------------------+------+-----+---------+----------------+
```

I then hop over to my Drupal 8 database in another terminal window via ```lando drush sql-cli``` and run ```DESCRIBE oneall_social_login_authmap;```.  The output looks like:

```sql
MariaDB [drupal8]> DESCRIBE oneall_social_login_authmap;
+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| aid        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| uid        | int(10) unsigned | NO   |     | NULL    |                |
| user_token | varchar(48)      | NO   |     | NULL    |                |
+------------+------------------+------+-----+---------+----------------+
```

After creating a test account on the Drupal 8 side, I could see how the data gets injected.  The database mappings are pretty much the same.  The exceptions are the authmap column maps to the user_token table.  Also, the module column is not used, but it identifies what module (obviously) the data map to in the Drupal 7 side.

So now that we know what to do, let me show you how to get this done.


Writing The Source Migration
----------------------------

If you [read my previous article on doing a custom migration](https://thinktandem.io/blog/2018/07/24/writing-a-custom-drupal-8-module-upgrade-path/), setting up the source is very similar.  Basically, all we need to do is grab the columns we need to get all the source data.  Here is the class I came up with:

```php
namespace Drupal\YOUR_MODULE\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;

/**
 * Obtains the authmap rows for OneAll.
 *
 * @MigrateSource(
 *   id = "oneall_auth"
 * )
 */
class OneAllAuth extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $fields = [
      'aid',
      'uid',
      'authname',
    ];
    return $this->select('authmap', 'a')
      ->fields('a', $fields)
      ->condition('module', 'oneall_social_login');
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = [
      'aid' => $this->t('Primary Key: Unique authmap ID.'),
      'uid' => $this->t('User\'s {users}.uid.'),
      'authname' => $this->t('Unique authentication name.'),
    ];
    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    return ['aid' => ['type' => 'integer']];
  }

}
```

You only need these 3 methods to really grab any data in a Drupal 7 database.  The query is straight forward to understand, it just grabs the fields and their respective data.  The fields method exposes these fields so we can use them in our config.  The getIds is our primary key, which seems to be required to do this.  

So with this done, we clear our caches and now we can create our migration yaml.


Writing Migration Config YAML
----------------------------

With any custom migration, the [Migrate Plus](https://www.drupal.org/project/migrate_plus) module is pretty much a requirement.  The module comes with a bunch of extra goodies that I use all the time.  For this use case, we are going to utilize the [table destination plugin](https://cgit.drupalcode.org/migrate_plus/tree/src/Plugin/migrate/destination/Table.php).  This will give us the tool we need to get our data over to just a Drupal 8 database table.  

There really is no documentation on how to use the plugin yet.  Luckily, [I found this issue in their queue](https://www.drupal.org/project/migrate_plus/issues/2981906#comment-12713622) that gave me some headway on how to win this.  Here is the config I came up with after reading through that issue:

```yaml
langcode: en
status: true
dependencies: {  }
id: upgrade_d7_oneall_auth
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: YOUR_GROUP
label: 'OneAll Auth'
source:
  plugin: oneall_auth
process:
  aid: aid
  uid: uid
  user_token: authname
destination:
  plugin: table
  table_name: oneall_social_login_authmap
  id_fields:
    aid:
      type: integer
  fields:
    aid: aid
    uid: uid
    user_token: authname
migration_dependencies: {  }
```

As you can see, in the ```source``` key, I have the class I showed you above.  The ```process``` key is just mapping the field as you would in any Drupal 8 migration.  You can also alter the data here, etc.  Finally, the destination plugin is where all the magic happens.  The ```plugin``` and ```table_name``` keys are self-explanatory.  The ```id_fields``` is required and is your primary keys.  The ```fields``` key is basically the same thing as your process plugin minus any processing plugins you may be using.  

So really that is it.  After you run ```lando drush cim -y``` you can run ```lando drush mim upgrade_d7_oneall_auth``` and all your data will come over your ```drush ms``` will look like this:

```bash
 --------------------------------- ----------------------------------------------------------------- ----------- ------- ---------- ------------- --------------------- 
  Group                             Migration ID                                                      Status      Total   Imported   Unprocessed   Last Imported        
 --------------------------------- ----------------------------------------------------------------- ----------- ------- ---------- ------------- ---------------------                  
  system (system)                   upgrade_d7_oneall_auth                                            Idle        3403    3403       0             2019-03-22 
```


Conclusion
---------

You can do just about anything with a Drupal 6 / 7 to Drupal 8 Migration.  The Migration system is very robust and there really has not been an obstacle or data issue I have not been able to solve.  Using the tools out there you can do cool stuff like migrating a Drupal 7 database table to a Drupal 8 database table with ease.  
