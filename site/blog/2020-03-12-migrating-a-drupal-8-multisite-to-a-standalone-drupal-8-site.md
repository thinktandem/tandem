---
title: "Migrating a Drupal 8 Multisite to a Standalone Drupal 8 Site"
tags:
    - development
    - drupal
    - migration
    - johno
author: "John Ouellet"
date: "2020-03-12"
summary: "A straighforward guide to doing a  Drupal 8 to Drupal 8 migration."
id: johno
pic: "https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33"
location: Florida
---

## Overview

One of our health care clients has an older Drupal 8 multisite that needed some TLC.  They wanted to rebrand and relaunch the main site of the bunch as a stand alone version.  We also only needed to move some of the content, but not all.  Finally, we needed a repeatable process as new content would be added the whole time we were retheming the new site.  The right choice it seemed for the project was to use the Drupal 8 Migrate module suite to get the job done.

If you have done a D6/D7 migration to D8, then the process is very similar in nature.  However, there are some twists to the process that I will go over below.  

## Getting Started

To get started, you will need the [Migrate Plus](https://www.drupal.org/project/migrate_plus), [Migrate Tools](https://www.drupal.org/project/migrate_tools), & [Migrate Drupal D8](https://www.drupal.org/project/migrate_drupal_d8) modules with this project. Take note that we are not using the [Migrate Upgrade](https://www.drupal.org/project/migrate_upgrade) module as it is only intended for D6/D7 migrations.  

You can install these modules via:

```bash
composer require 'drupal/migrate_plus:^4.2' 'drupal/migrate_tools:^4.5' 'drupal/migrate_drupal_d8:1.x-dev'
```

On top of this, I ended up using two patches for the Migrate Drupal D8 module.  Here is the composer.patches.json I used with the project:

```bash
{
    "patches": {
        "drupal/migrate_drupal_d8": {
            "https://dgo.to/3026875 Taxonomy Migration won't work since taxonomy_term_hierarchy table does not exists anymore.": "https://www.drupal.org/files/issues/2019-01-18/3026875-migrate_drupal_d8-taxonomy-fix-tablenames.patch",
            "https://dgo.to/3027251 Not all fields are being mapped": "https://www.drupal.org/files/issues/2019-01-21/migrate_drupal_d8-3027251-2.patch"
        }
    }
}
```


### Migrate Drupal D8 Module

Since I will be using an external database to migrate the old Drupal 8 site, the Migrate Drupal D8 module is the right choice for the job.  What the module includes is a set of Source plugins that can be used to grab Drupal 8 data to use in our migrations.  Just like any other other source plugin in the migration universe.  Take note that there is a core plugin at ```core/modules/migrate_drupal/src/Plugin/migrate/source/ContentEntity.php``` that can be used for internal migrations.  So say if you needed to move data in the current site to another entity type, you can easily do that now.  However, like I mentioned we will have an external database and so we will be using the contrib module.

If you look in the module, you will see 5 plugins, 3 of which are deprecated.  All of the Drupal 8 source classes extend the ContentEntity class.  The ContentEntity class contains all the goodness we need to get it done.  You can identify an entity_type and bundle, and it does the rest.  Pretty easy and straight forward.

## Migrating the old Drupal 8 site structure

Since we can't use the Migrate Upgrade module, there is no quick and easy way to get the Vocab, Node Types, etc onto the new Drupal 8 site.  So we have a few choices here:

1. Manually recreate everything.
2. Use this [issue patch](https://www.drupal.org/project/migrate_drupal_d8/issues/2934082) to just move the node types via migration.  Then do the rest manually.
3. Use the [Config Development](https://www.drupal.org/project/config_devel) module to identify and move config manually.
4. Use our good old friend [Features](https://www.drupal.org/project/features).

I decided to go with option #4 as it seemed up front that I could quickly and easily grab what I needed and go.  While this probably was the best choice for this use case, I ran into some weird issues with the Features module in general.  I was able to get all the config I needed over fairly easily.  However, Features in Drupal 8 did some weird things like: not include the field storage config, add blocks and views config when I selected a node, and added erroneous config in general.  

There was a lot of back and forth initially to figure out why I kept getting red messages of config sadness.  However, I ended up winning it in the end, but it was an interesting journey thats for sure. Regardless, features did get the job done, it took way longer than it should of though due to those issues I listed.

## Setting up the migration.

Now that the old Drupal 8 config was in the new Drupal 8 site, the fun could begin.  One downside to using the Migrate Drupal D8 Module is that there are no example config yamls provided.  My inner lazy child was sad that I had to manually create these files.  However since I have done dozens of migrations, I had plenty of examples to pull from.  

To get started, we need to name our migrations yaml files like this: ```migrate_plus.migration.migration_ENTITY_BUNDLE```.  This way the config importer knows how to basically assign these files to Migrate Plus and all our migration magixs will work gloriously.  

When I do migrations, I always do them in groups in the following order:

1. Files
2. Users
3. Taxonomy
4. Paragraphs
5. Nodes
6. Misc Entities

We have no paragraphs or misc entities in this migration.  If you do have have custom entities, and need to know what destination to choose, run ```drupal dpl migrate.destination```.  So now lets truck forward with the files migration.  

### Migrating the Files

Since this was a Drupal 8 multisite, the public files directory was different.  The normal file migration yaml I used, didn't end up working right.  I had to use a [Migrate Plus str_replace process plugin](https://git.drupalcode.org/project/migrate_plus/blob/HEAD/src/Plugin/migrate/process/StrReplace.php) to do a little magic on the file names.  Here is the files migration yaml I ended up going with:

```yaml
langcode: en
status: true
dependencies: {  }
id: migration_files
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: files
label: 'Files Migration'
source:
  plugin: d8_entity
  entity_type: file
  constants:
    source_base_path: 'https://www.LIVESITE.com'
process:
  fid: fid
  filename: filename
  filepath:
    -
      plugin: str_replace
      source: uri
      search: 'public://'
      replace: sites/MULTSITE_DIR/files/
  source_full_path:
    -
      plugin: concat
      delimiter: /
      source:
        - constants/source_base_path
        - '@filepath'
    -
      plugin: urlencode
  uri:
    plugin: file_copy
    source:
      - '@source_full_path'
      - uri
  filemime: filemime
  status: status
  created: timestamp
  changed: timestamp
  uid: uid
  alt: alt
destination:
  plugin: 'entity:file'
migration_dependencies: null
```

As you can see I am using the ```d8_entity``` source plugin from the Migrate Drupal D8 module.  Also, in Drupal 8, there is no filepath MySQL field, so I had to simulate  one to get this done.  So that's it for the field migration, let's move into the users.

### Migrating the Users

When I migrated the users initially, I noticed there were no roles getting ported over.  I had a one to one roles key in my process, but after investigated, they didn't exist from the source.  To combat this, I extended the ContentEntity source plugin and created my own Drupal 8 user source plugin that included the roles:

```php
namespace Drupal\THE_SITE\Plugin\migrate\source;

use Drupal\migrate_drupal_d8\Plugin\migrate\source\d8\ContentEntity;
use Drupal\migrate\Row;

/**
 * Drupal 8 custom user source from database.
 *
 * @MigrateSource(
 *   id = "d8_custom_user",
 *   source_provider = "migrate_drupal_d8"
 * )
 */
class CustomUser extends ContentEntity {

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    $uid = $row->getSourceProperty('uid');
    $roles = $this->getRoles($uid);
    if (!empty($roles)) {
      $row->setSourceProperty('roles', $roles);
    }
    return parent::prepareRow($row);
  }

  /**
   * This allows obtaining all the user roles..
   *
   * @param int $uid
   *   The user id.
   *
   * @return array
   *   The roles of the user.
   */
  protected function getRoles($uid) {
    /** @var \Drupal\Core\Database\Query\SelectInterface $query */
    $query = $this->select('user__roles', 'r')
      ->fields('r', ['roles_target_id'])
      ->condition('entity_id', $uid);
    return array_column($query->execute()->fetchAll(), 'roles_target_id');
  }
}
```

As you can see, I am just grabbing all the role ids from the roles tables and slapping them into their own source property.  With that hurdle out of the way, I was able to successfully migrate the users with:

```yaml
langcode: en
status: true
dependencies: {  }
id: migration_users
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: users
label: 'Users Migration'
source:
  plugin: d8_custom_user
  entity_type: user
process:
  uid: uid
  name: name
  pass: pass
  mail: mail
  created: created
  access: access
  login: login
  status: status
  timezone: timezone
  init: init
  roles: roles
destination:
  plugin: 'entity:user'
migration_dependencies: null
```

That finished up the users migration, now onto the Taxonomy migration.

### Migrating the Taxonomy

The only other non deprecated plugin in the Migrate Drupal D8 module is the Taxonomy source plugin.  Now that we have done this two times, this is fairly straight forward.  This site relied heavily on taxonomy and they had some interesting taxonomy fields happening.  One note is that the data manipulation with a Drupal 8 to Drupal 8 migration is non existent.  So there is really no super fancy process magics needed, even for entity reference fields.  Here is one the migration yamls that got the job done:

```yaml
langcode: en
status: true
dependencies: {  }
id: migration_taxonomy_blog_author
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: taxonomy
label: 'Taxonomy Blog Author Migration'
source:
  plugin: d8_taxonomy_term
  entity_type: taxonomy_term
  bundle: blog_author
process:
  tid: tid
  vid: vid
  parent_id: parent
  name: name
  field_author_title: field_author_title
  field_author_profile:
    -
      plugin: sub_process
      source: field_author_profile
      process:
        target_id: target_id
  field_author_bio: field_author_bio
  field_author_headshot:
    -
      plugin: sub_process
      source: field_author_headshot
      process:
        target_id: target_id
        alt: alt
        title: title
        width: width
        height: height
destination:
  plugin: 'entity:taxonomy_term'
  default_bundle: tags
migration_dependencies:
  required:
    - migration_users
  optional: {  }
```

This vocab had a user and a file entity reference on it.  Like I mentioned, everything is almost a one to one line up so writing these yaml files was pretty quick and easy.  Now it is on to your final migration, the nodes.

### Migrating the Nodes

The nodes were fairly quick to setup.  We were only moving half a dozen types and there weren't anything crazy about them in general.  Here is what I used for their Article type:

```yaml
langcode: en
status: true
dependencies: {  }
id: migration_node_article
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: nodes
label: 'Node Article Migration'
source:
  plugin: d8_entity
  entity_type: node
  bundle: article
process:
  nid: nid
  langcode: language
  title: title
  uid: uid
  status: status
  created: created
  changed: changed
  promote: promote
  sticky: sticky
  revision_uid: revision_uid
  revision_log: revision_log
  revision_timestamp: revision_timestamp
  body:
    -
      plugin: sub_process
      source: body
      process:
        value: value
        summary: summary
        format: format
  field_news_external_url: field_news_external_url
  field_meta_tags: field_meta_tags
  field_news_publication: field_news_publication
  field_tags:
    -
      plugin: sub_process
      source: field_tags
      process:
        target_id: target_id
destination:
  plugin: 'entity:node'
  default_bundle: article
migration_dependencies:
  required:
    - migration_users
    - migration_files
    - migration_taxonomy_tags
  optional: {  }
```

So with these migrations all setup and working, we were able to have a repeatable process in place for the task at hand.  It didn't take all that long and everybody won in the end.

## Conclusion

When I was writing these migrations I came to realize that the core Drupal 8 source plugin solves an age old issue.  When you have a site that is architected poorly and you need to move data to a new type, you can easily achieve this now.  You can use the same methods I did above and have whatever site you are working on in better position.  This is why the migrate module suite is so powerful.  You can move data from anywhere very easily and effortlessly.

If you need help with your Drupal migration, fill out the form below and we can talk.
