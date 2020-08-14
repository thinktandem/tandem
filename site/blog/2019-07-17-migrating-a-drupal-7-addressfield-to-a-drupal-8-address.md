---
title: "Migrating a Drupal 7 AddressField To a Drupal 8 Address"
tags:
    - development
    - drupal
    - johno
author: "John Ouellet"
date: "2019-07-17"
summary: "Migrating to a Drupal 8 address field is a lot simplier than it seems."
id: johno
pic: "https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33"
location: Florida
---

Why I Am Writing This
--------

There seems to be a lot of confusion in the forums when you Google "How to migrate an address field".  Some of the posts are much older, so that is acceptable.  However, for well over a year now the [Drupal 8 Address module](https://www.drupal.org/project/address) has their migration process built into the module.  If you are looking for the right and easy way to migrate a [Drupal 7 Addressfield](https://www.drupal.org/project/addressfield) to a Drupal 8 Address, keep on reading.


Quick and Easy
--------------------

When performing migrations for any contrib or core module, always check its src/Plugin directory for a migrate folder.  A lot of time, the solution you are searching for is right there.  In the case of the Drupal 8 Address module, the answer to our problem is in that directory.  

The Drupal 8 Address module has a [MigrateField plugin](https://api.drupal.org/api/drupal/core%21modules%21migrate_drupal%21src%21Annotation%21MigrateField.php/class/MigrateField/8.5.x) in the migrate/source folder named addressfield.  This plugin gets the Drupal 7 addressfield for us to use in our migration.  Then, if you look in the migrate/process folder, you will see the [MigrateProcessPlugin](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins) also named addressfield.  We will utilize that plugin to handle our task at hand. 

The solution is pretty simple now that we have discovered these plugins.  In your migration YAML, all you need to do is this:

```yaml
process:
  field_address:
    -
      plugin: addressfield
      source: field_address
``` 

Pretty straight forward and easy.  Just like any other [process plugin used in a Drupal 8 migration](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins/list-of-core-migrate-process-plugins), this one gets the job done for us.


Conclusion
---------

When doing a migration, always check first in the src/Plugin/migrate folder of the modules / entity you are trying to migrate.  The Drupal 8 migration system has matured a lot over the past 3 years.  More often than not, your solution is already baked in.  If your organization needs help with a Drupal 8 Migration, fill out the form below and we can chat more about it!
