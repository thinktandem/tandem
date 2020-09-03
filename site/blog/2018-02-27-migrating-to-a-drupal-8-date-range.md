---
title: "Migrating to a Drupal 8 Date Range"
tags:
  - development
  - drupal
  - php
  - migrations
  - johno
author: "John Ouellet"
date: "2018-02-27"
summary: "Migrating a date range to Drupal 8 is a lot easier now than it was a year ago.  Below I will show you how to transform the data to get the date ranges to migrate to Drupal 8 properly."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

::: byline
Migrating a date range to Drupal 8 is a lot easier now than it was a year ago.  Below I will show you how to transform the data to get the date ranges to migrate to Drupal 8 properly.
:::

The Situation before us
---------------------

Right now we are using the [Migrate Source CSV](https://www.drupal.org/project/migrate_source_csv) module to handle the migration.  In the CSV that we used, dates were exported form the old site as Unix timestamps.  Which worked great for single date migration in Drupal 8.

Our data is currently coming from this source field:

```yaml
source:
  column_names:
    0:
      date_ranges: 'The date range'
```

However, our date ranges though were showing up like this in the CSV:

```bash
1285905600 to 1317355200
```

When we tried to import it like this, the migration would explode and cause a black hole in time.  We needed to transform the data before it went through the process mechanisms during the migration.  We found two ways to do this and both are quite easy to do this.  This solutions are specific to this use case.  However, you can apply the same principles to your data in whatever format your data is in.


Method 1: Plugin Only
---------------------

This method utilizes the vast array of plugins that come with a Drupal 8 migration.  Our string needs to manipulated to get the proper dates for the date range values.  We can do this with the ```explode``` and ```extract``` plugins.  It is pretty straightforward as you can see:

```yaml
process:
  field_date_ranges/value:
    -
      plugin: explode
      source: date_ranges
      delimiter: ' to '
    -
      plugin: extract
      index:
        - '0'
    -
      plugin: format_date
      from_format: U
      to_format: Y-m-d
  field_date_ranges/end_value:
    -
      plugin: explode
      source: date_ranges
      delimiter: ' to '
    -
      plugin: extract
      index:
        - '1'
    -
      plugin: format_date
      from_format: U
      to_format: Y-m-d
```

So basically we are taking the string and exploding it just like php's explode function.  We then grab the perspective start and end dates from the array.  Finally we are formatting the date as needed in our case.

Method 2: Some php + plugins
----------------------------

### Setting up the data.

So we are going to transform this data first.  We can easily do this via ```hook_migrate_prepare_row()```.  Here is how we set this up for later use in our ```process``` plugin.

```php
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Plugin\MigrateSourceInterface;
use Drupal\migrate\Row;

/**
 * Implements hook_migrate_prepare_row().
 */
function YOUR_MODULE_migrate_prepare_row(Row $row, MigrateSourceInterface $source, MigrationInterface $migration) {
  switch ($migration->id()) {
    case 'YOUR_MIGRATION_ID':
      // Use your source id from the range you are trying to migrate form the yml.
      if ($values = $row->getSourceProperty('date_ranges')) {
        $value = explode(' to ', $values);
        $row->setSourceProperty('Date Start', $value[0]);
        $row->setSourceProperty('Date End', $value[1]);
      }

      break;
  }
}
```

### Processing the data.

Now that we have the date fields split out, we can then use the created source properties in the ```process``` plugin key on our migration yaml.  On top of that, the ```format_date``` plugin can be utilized to change the date as we needed.

```yaml
process:
  field_date_ranges/value:
    plugin: format_date
    from_format: U
    to_format: Y-m-d
    source: 'Date Start'
  field_date_ranges/end_value:
    plugin: format_date
    from_format: U
    to_format: Y-m-d
    source: 'Date End'
```

Conclusion
----------

The Drupal 8 migration API is very customizable.  Once you start handling more advanced tasks, you can migrate just about anything.  I prefer the first method in our example, but showed you both.  As you can see, you can do a lot of cool things with the process plugin system and the migration API.
