---
title: "Changing a Content Type Name During a Drupal 8 Migration"
tags:
    - development
    - drupal
    - migration
    - johno
author: "John Ouellet"
date: "2018-07-18"
summary: "Changing a content type machine name during a Drupal Migration requires a little bit of migration knowledge, but is fairly straight forward to do."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

The Use Case
---------------------

It is a typical occurrence when a Drupal site has its content types named one way when it is built.  Then, later on it is changed to better reflect what that type currently does.  You can change the display name of the content type, but the machine name is more difficult to change.  There are not many options in Drupal 7 to rectify this issue.  So usually you just truck ahead with it staying as is.

There are several issues with leaving this as is:

1. If you use content type based templates, it is confusing as to what content type the template belongs to.
2. If you use field naming conventions (i.e field_MACHINENAME_FIELDNAME) they won't match.
3. It can be confusing for new developers to the site.

When you migrate a site to Drupal 8, you will have your chance to rectify this problem.  Below you will see the way I recommend doing this.  I will also show a partial alternate way of handling it as well.


My Recommended Migration Method for changing the content type machine name
---------------------

Every Drupal 8 migration I have done so far needs some custom love to make it work right.  It is common to skip over certain fields, exclude certain entity types, etc.  Every scenario has a reason to do this.  I have found that ```hook_migrate_prepare_row()``` is by far the quickest and easiest way to handle said tasks.  There are also use cases to use the migration classes as well, but this is not one of them.

Below is the final code I used to rename a few content types for this migration.  I will break out each section and explain what is going on after this code snippet.


```php
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateSourceInterface;
use Drupal\migrate\Row;


/**
 * Implements hook_migrate_prepare_row().
 */
function YOUR_MIGRATION_MODULE_migrate_prepare_row(Row $row, MigrateSourceInterface $source, MigrationInterface $migration) {

  // LOGIX FOR SKIPPING FIELDS, CONTENT TYPES, ETC GOES UP HERE.

  // Do various tasks based on the migration id.
  switch ($migration->id()) {

    case 'upgrade_d7_field':
      // Change the content type name.
      $instances = $row->getSourceProperty('instances');
      switch ($instances[0]['bundle']) {
        case 'old_name_1':
          $instances[0]['bundle'] = 'new_name_1';
          $row->setSourceProperty('instances', $instances);
          break;

        case 'old_name_2':
          $instances[0]['bundle'] = 'new_name_2';
          $row->setSourceProperty('instances', $instances);
          break;

        case 'old_name_3':
          $instances[0]['bundle'] = 'new_name_3';
          $row->setSourceProperty('instances', $instances);
          break;
      }
      break;

    case 'upgrade_d7_node_type':
      // Change the content type name.
      switch ($row->getSourceProperty('type')) {
        case 'old_name_1':
          $row->setSourceProperty('type', 'new_name_1');
          $row->setSourceProperty('name', 'New_name_1');
          break;

        case 'old_name_2':
          $row->setSourceProperty('type', 'new_name_2');
          $row->setSourceProperty('name', 'New_name_2');
          break;

        case 'old_name_3':
          $row->setSourceProperty('type', 'new_name_3');
          $row->setSourceProperty('name', 'New_name_3');
          break;
      }
      break;

    case 'upgrade_d7_field_instance':
    case 'upgrade_d7_field_formatter_settings':
    case 'upgrade_d7_field_instance_widget_settings':
      // Change the content type name.
      switch ($row->getSourceProperty('bundle')) {
        case 'old_name_1':
          $row->setSourceProperty('bundle', 'new_name_1');
          break;

        case 'old_name_2':
          $row->setSourceProperty('bundle', 'new_name_2');
          break;

        case 'old_name_3':
          $row->setSourceProperty('bundle', 'new_name_3');
          break;
      }
      break;


  }
}
```

**Field ID**

So as you can see, we are looking for specific source fields that contain our old content type name and are tweaking it during the migration.  One of the main reasons I prefer doing it via this migration api hook is glaringly prevalent in the ```upgrade_d7_field``` migration id.

As you can see from this process, we need to tweak an array key within the instances source field.  This seems to be the identifier for making sure the field is lined up properly with the correct content type.  Failing to change this, makes it so the fields don't get attached post migration.

**Node Type ID**

The node type ID is fairly straight forward and easy to understand.  We are changing both the machine name (type) and the display name (name) during this Drupal 8 migration.  The name was correct on most of the content types we were migrated.  I added it just for extra security during the migration.

**Instance, Widget & Formatter IDs**

Like the node type ID, the identifying factor for these setting lies within the bundle source field.  Fairly straight forward and easy to understand, so I won't go into it further.

So this is fairly easy to do.  It just took a lot of debugging on my part to figure out where the content type machine names were buried in all those associative arrays from the source fields.  There is a partial alternative way of handling this migration and I will go over it below briefly.


Alternate Migration Method for changing the content type machine name
---------------------

Drupal has a robust migration plugin system that uses the yaml discovery process.  Since all our migrations are in config, you can perform some of the tasks above via yaml files instead.  However, you won't fully be able to do the whole task at hand in the yaml files due to the logic that needs to happen with the ```upgrade_d7_field``` id.

**Node Type YAML Changes**

Your node type yaml migration has the type and name key in them.  You can use the [static map](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21StaticMap.php/class/StaticMap) source migration plugin to alter either the name or type during the migration.

```yaml
type:
  plugin: static_map
  bypass: true
  source: type
  map:
    old_name_1: new_name_1
    old_name_2: new_name_2
    old_name_3: new_name_3
```

After you add these changes, just run ```drush cim``` and you should be good to go.  A little bit easier than the php code and it achieves the same thing.

**Instance, Widget & Formatter YAML Changes**

This one is much easier to do as the bundle key already has the static map plugin in it.  So, you just would add to it as such:

```yaml
bundle:
  plugin: static_map
  source: bundle
  bypass: true
  map:
    comment_node_forum: comment_forum
    old_name_1: new_name_1
    old_name_2: new_name_2
    old_name_3: new_name_3
```

Again, very easy to do and straight forward.  If you choose this method, you would still have to use ```hook_migrate_prepare_row()``` for the ```upgrade_d7_field``` id to get this alternate method to work.

Conclusion
----------

You can use either method to achieve your goal of renaming a content type during a Drupal 8 Migration.  I hope this helps someone as it took a few hours of debugging myself to get this to work.  The Drupal 8 Migration API is very easy to use and you can do so much with it.
