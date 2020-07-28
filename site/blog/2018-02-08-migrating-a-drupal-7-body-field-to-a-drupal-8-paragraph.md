---
title: 'Migrating a Drupal 7 Body Field to a Drupal 8 Paragraph'
tags:
    - development
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/d7-d8.jpg
img-src: images/articles/d7-d8.jpg
byline: 'Migrating A Drupal 7 long text field to a Drupal 8 nested text field in a paragraph is a two step process.  It is quick and easy once you get the basic grasp of the mechanisms involved.'
date: '2018-02-08'
---

Why are we doing this?
----------------------

We were hired on to act as consultants for one of our University clients migration from Drupal 7 to Drupal 8.  One of the tasks their development team was stuck on was migrating their Drupal 7 body fields to a Drupal 8 paragraph.  There were a few examples and blog posts out their in the universe, but they just did not seem to work right when applied.  After some Google-fu and a lot of trial and error, I was able to find a replicable working solution.  Once I solved this dilemma, it was actually quite easy to understand the moving parts.

The migration mechanisms at work
---------------------------------

The basic theory behind this is that we will be migrating the body field alone to its own entity reference based migration first.  Then we will take that paragraph and migrate with the content type.  We can chain these events together via the ```migration_dependencies``` key in the yaml file.

Another factor in this equation is that we are using the [Migrate Source CSV](https://www.drupal.org/project/migrate_source_csv) module to handle the migration. The client was using [Open Atrium](https://www.drupal.org/project/openatrium) in their Drupal 7 site.  If you are familiar with the project, it is a panels heavy based approach.  There is no Drupal 8 solution for Open Atrium and they decided against a panels approach in the migration.  So, it was easier for them to grab all the panels content and node content in a spreadsheet in one due to this.

Seems pretty straight forward, but it took a hot minute to figure how to actually pull this off based on all these factors.

This is how we do it
---------------------

### Migrating the body field to a paragraph

So the first step is to grab the body field and migrate it into a paragraph on the Drupal 8 site.  What I did was create a new paragraph bundle with the name migrate.  Within the migrate paragraph bundle I created a long formatted text named field_migrate_test.  This is the field we will be testing the migration to.  Once I had this I began dissecting the yaml file I had for migrating the whole Drupal 7 node.  I ripped out all the irrelevant pieces and changed it to look like this below:

```yaml
id: body_to_paragraph
label: Import a D7 body to a D8 paragraph
langcode: en
status: true
dependencies:
  enforced:
    module:
      - custom_migration
migration_group: null
source:
  plugin: csv
  path: "public://your-mom-goes-to-college.csv"
  delimiter: ','
  enclosure: '"'
  header_row_count: 1
  keys:
    - id
  column_names:
    0:
      id: Identifier
    1:
      url: Alias
    2:
      title: Title
    3:
      body: Body

process:
  type:
    plugin: default_value
    default_value: migrate
  'field_migrate_test/value': body
  'field_migrate_test/format':
    plugin: default_value
    default_value: full_html

destination:
  plugin: 'entity_reference_revisions:paragraph'

migration_dependencies:
  required: {  }
  optional: {  }
```

If you are not familiar with Migrate Source CSV module, Lucas Hedding [wrote a great how to article](https://www.mtech-llc.com/blog/lucas-hedding/migrating-using-csv) on it.  The main two things to take away from the first part of this migration are the ```process``` and the ```destination``` keys in the yaml.

Within the ```process``` key, I am only migrating the body column into the field_migrate_test field.  Also, for me, wrapping the fields in single quotes was the only way this could work.  I am not 100% sure why, but maybe I will figure that out one day.  Also defined in there is the ```type``` key which uses the migrate bundle as it's ```default_value```.

The ```destination``` key shows that we are migrating this body to the paragraph we created prior to the migration tasks.  In the next part, we will use this paragraph as the migration source.

### Migrating the node type with the paragraph

This next part of the migration was the part that took me the longest to unravel.  A lot of posts out there steered me in the wrong direction and I kept going down the wrong rabbit hole.  The common misconception was that we are migrating a body field in the paragraph to a body field on the node type.  Sorry Charlie, but that is not the way.  We are migrating a paragraph entity to a paragraph entity on the node type.

What I did was create a paragraph field on the Basic Page node type called field_migrate_final.  I linked it up to the migrate paragraph bundle I used before.  Once I set that up, I could tweak the yaml file to reflect this new destination.  Check out the example below to see how this works:

```yaml
id: csv_pages
label: Import all the csv to the basic page type
langcode: en
status: true
dependencies:
  enforced:
    module:
      - custom_migration

source:
  plugin: csv
  path: "public://your-mom-goes-to-college.csv"
  delimiter: ','
  enclosure: '"'
  header_row_count: 1
  keys:
    - id
  column_names:
    0:
      id: Identifier
    1:
      url: Alias
    2:
      title: Title
    3:
      body: Body

process:
  type:
    plugin: default_value
    default_value: page
  id: id
  title: title
  path: url
  field_migrate_final/target_id:
    -
      plugin: migration
      migration: body_to_paragraph
      no_stub: true
      source: id
    -
      plugin: extract
      index:
        - '0'
  field_migrate_final/target_revision_id:
    -
      plugin: migration
      migration: body_to_paragraph
      no_stub: true
      source: id
    -
      plugin: extract
      index:
        - 1
destination:
  plugin: entity:node

migration_dependencies:
  required:
    - body_to_paragraph
```

So the big take aways again are in the ```process`` key for this migration.  As you can see I have some fun things going on with the field_migrate_final portion.  Let's break this down a little so it makes more sense:
1. The ```plugin:migration``` (which is now called [migration_lookup](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins/process-plugin-migration_lookup-formerly-migration)) grabs the value of the paragraph from our previous step.
1. The ```migration``` key we are using the id of the previous step.
1. The ```no_stub``` key set to true means we want the whole actual entity.  A stub entity is a partially populated entity that stands in for the real thing as a FYI.
1. The ```source``` key (source_ids in the new nomenclature) is the id key field from our previous step as well.
1. The ```plugin:extract``` key is a way to exract ids from a field that is an array.  [Here is the documentation](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21Extract.php/class/Extract) on this migration plugin.
1. The ```index``` key is equivivoal to something like ```field_name[und][0][value]``` in a Drupal field array.

The final part of this equation is the ```migration_dependencies``` which lists the first step as a requirement.

### Running the migration

Now that this is all setup, it is your typical method to run the migration.  I went ahead and ran this drush command to do the import:

```bash
drush mim csv_pages --feedback="1 seconds"
```

I like to add the feedback to show me what is going on within the migration.  A stagnant cursor is always a worrisome sign to me.  I could of also added this to a migration group if I wanted to.  However, for this example, just migrating with the 2nd parts key was good enough.


Conclusion
----------

Now that you have the basics behind doing a more complicated migration, you can begin to imagine how this can be used in other mechanisms as well.  Migrating various types of entities to new and improved entities in Drupal 8 is quite a common thing now.
Take the lessons from this and win every migration task that is given to you.
