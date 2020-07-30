---
layout: Post
title: 'Lando Migration Webinar Part 2 Followup'
tags:
    - development
    - drupal
    - localdev
    - devops
author: 'John Ouellet'
private: false
mainImage: /images/articles/drupal-migration.jpg
img-src: /images/articles/drupal-migration.jpg
byline: 'This webinar dove into Source, Process, & Destination Plugins for Drupal 8/9 Migrations.'
date: '2020-05-12'
meta:
    - { name: description, content: 'This webinar dove into Source, Process, & Destination Plugins for Drupal 8/9 Migrations.' }
    - { name: keywords, content: 'development,drupal,localdev,devops' }
---

## Recap

Thank you for everyone again who attended our second migration webinar.  For those of you who missed it, here is the [YouTube video](https://www.youtube.com/watch?v=C1lhgObpHd8) of the webinar:

<iframe width="750" height="422" src="https://www.youtube.com/embed/mz0ZeeDEVVQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The [slidedeck](https://docs.google.com/presentation/d/1EFoW58JEqpuq7DiSr916DZr3WHlbkVdHeddi62TRHA0/edit?usp=sharing) is available for all those who want to go through it.  The [GitHub repo's branch](https://github.com/thinktandem/migration-webinar/tree/webinar-2-final) has been updated for this webinar with all the examples I showed you during this webinar.

Here is a quick recap going over all the topics I did for the webinar.  It is best to watch the video as it goes more in depth and has live explanations and examples.

## Source Plugins

In this portion of the webinar, I went over Drupal 8/9 [Source Plugins](https://www.drupal.org/docs/8/api/migrate-api/migrate-source-plugins) and their role in the migration ecosystem.  Some of the topics I covered were:

- Various types of Source plugins that I use regularly.  Also how to find them by searching the code base via: ```id = "plugin_name```.
- Went over [prepareRow](https://www.drupal.org/node/1132582#prepareRow) / [hook_migrate_prepare_row](https://api.drupal.org/api/drupal/core%21modules%21migrate%21migrate.api.php/function/hook_migrate_prepare_row/8.2.x) and their importance on massaging data for process plugins.
  - I also talked about getting and setting the source data via these methods.
- I went over extending and replacing Source plugins such as:
  - Removing [setting the language](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/source/NodeNoLanguage.php) at the source.
  - Using [multiple node types](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/source/NodeMultipleTypes.php) in a source.  I also included an [example YAML](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/example_yamls/multiple_types_example.yml) for the multiple types example as well.
  - Running the Node migrations in [descending order](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/source/NodeDesc.php).
- Finally, I went over writing your own [Source plugin for a table to table migration](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/source/SuperTrillTable.php).
  - I wrote a [good blog post previously](https://thinktandem.io/blog/2018/07/24/writing-a-custom-drupal-8-module-upgrade-path/) on doing a typical entity migration that doesn't have a migration path yet.  I didn't go over this during the webinar.

## Destination Plugins

I skipped ahead next and went over destination plugins as there wasn't too much to go over here.  The likelihood that you will tweak or extend these plugins is almost non existent.  I did go over:

- Using ```drupal de``` to find what content entities to migrate to.
- Using the [table destination plugin](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.super_trill_table.yml) provided by Migrate Plus.

I had previously written a blog post on the [table to table migration](https://thinktandem.io/blog/2019/03/22/writing-a-drupal-8-table-to-table-migration-path/).  Check it out as it is a good reference.

## Process Plugins

This is where I spent a good chunk of the webinar talking.  I went over a variety of process plugins that I use typically.  While this isn't every single process plugin I use during migration. It does however encompass about 99% of the use cases I have encountered.  The plugins I went over were:

- [get](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21Get.php/class/Get)
  - Probably the most common plugin used, literally just gets the value from your field. Can be substituted with just the destination field name as well.
- [sub_process](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21SubProcess.php/class/SubProcess)
  - Allows for the processing of arrays through another process plugin’s workflow.  Commonly used to process data in reference fields, dates, body fields, etc.
- [static_map](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21StaticMap.php/class/StaticMap)
  - Maps one value on the D7 side to what you want it on the D8 side.  Commonly used with WYSIWYG formats and transforming select field options
- [format_date](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21FormatDate.php/class/FormatDate)
  - Does what you think it does.
- [migration_lookup](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21MigrationLookup.php/class/MigrationLookup)
  - Used when you need to map one entity migration to another via an id.  Commonly used in paragraph / reference migrations
- [skip_on_empty](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21SkipOnEmpty.php/class/SkipOnEmpty)
  - Skips processing that entity row of the field is empty. I have used those for various reasons, usually bad data like a broken title or missing file id
- [default_value](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21DefaultValue.php/class/DefaultValue)
  - Apply a default value when the field is empty or NULL.
- [extract](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Plugin%21migrate%21process%21Extract.php/class/Extract)
  - Used to extract entity ids typically in single reference based fields or used in a chain not in sub_process

I then went over commonly requested data transformations:

- Migrating fields to a single paragraph
  - Here is the [paragraph yaml](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.paragraph_image_text.yml) and the [field it maps to](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.upgrade_d7_node_type_one.yml#L129) via migration_lookup.
- Migrating files to media
  - [File Source Plugin](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/source/FileTypeDecide.php) to filter by mime-type.
  - [The file (image) to media yaml](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.image_to_media.yml).
  - Finally the [field mapping](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.upgrade_d7_node_type_one.yml#L149).
- Migrating multiple paragraphs
  - The [process plugin](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/web/modules/custom/migration_boilerplate/src/Plugin/migrate/process/MultipleMigrationLookup.php) used.
  - [Hooking it up to your paragraph field](https://github.com/thinktandem/migration-webinar/blob/webinar-2-final/config/sync/migrate_plus.migration.upgrade_d7_node_type_one.yml#L155).

## Wrap Up

Thank you again for attending this webinar.  For easy reference, here are all the blog posts I have written on migrations:

- [Migrating a Drupal 7 Body Field to a Drupal 8 Paragraph](https://thinktandem.io/blog/2018/02/08/migrating-a-drupal-7-body-field-to-a-drupal-8-paragraph/)
- [Migrating to a Drupal 8 Date Range](https://thinktandem.io/blog/2018/02/27/migrating-to-a-drupal-8-date-range/)
- [Migrating Drupal 7 Organic Groups to Drupal 8 Group](https://thinktandem.io/blog/2018/03/30/migrating-drupal-7-organic-groups-to-drupal-8-group/)
- [Handling Post Migration Events in Drupal 8](https://thinktandem.io/blog/2018/04/20/handling-post-migration-events-in-drupal-8/)
- [Changing a Content Type Name During a Drupal 8 Migration](https://thinktandem.io/blog/2018/07/18/changing-a-content-type-name-during-a-drupal-8-migration/)
- [Writing a Custom Drupal 8 Module Upgrade Path](https://thinktandem.io/blog/2018/07/24/writing-a-custom-drupal-8-module-upgrade-path/)
- [Writing a Drupal 8 Table to Table Migration Path](https://thinktandem.io/blog/2019/03/22/writing-a-drupal-8-table-to-table-migration-path/)
- [Migrating a Drupal 7 File To a Drupal 8 Media Entity](https://thinktandem.io/blog/2019/04/04/migrating-a-drupal-7-file-to-a-drupal-8-media-entity/)
- [Migrating a Drupal 7 AddressField To a Drupal 8 Address](https://thinktandem.io/blog/2019/07/17/migrating-a-drupal-7-addressfield-to-a-drupal-8-address/)
- [Migrating a Drupal 8 Multisite to a Standalone Drupal 8 Site](https://thinktandem.io/blog/2020/03/12/migrating-a-drupal-8-multisite-to-a-standalone-drupal-8-site/)

Our next webinar will be held on May 29, 2020; more details to follow on what we will be presenting on.  

In the interim, if your organization has any questions with a migration you are performing, please fill out the form below so we can chat more.
