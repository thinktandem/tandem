---
title: "Writing a Custom Drupal 8 Module Upgrade Path"
tags:
  - development
  - drupal
  - migrations
  - johno
author: "John Ouellet"
date: "2018-07-24"
summary: "There are a few occasions where a contrib module may not have an upgrade path written yet in Drupal 8.  It is a fairly easy and straight forward task to create these to win all your migration efforts."
id: johno
pic: "/images/people/john-sm.jpg"
location: Florida
---

Migrating The Workflow Module
---------------------

We have a client that utilizes Drupal in a unique way. They use Drupal as a proposal management system for their philanthropic efforts.  We recently migrated their site from Drupal 7 to Drupal 8.   It was a complex and very different when compared to other Drupal 8 migrations our team has performed.  One of the module they use on their site is [Workflow](https://www.drupal.org/project/workflow).  It is used to handle various states of the proposal throughout the grant process.

Workflow is a great module and simplifies their workflow tremendously.  One issue though, is there is no migration built yet for their Drupal 8 version.  We did need to migrate all the proposal workflow history as a requirement for legal reasons, so we knew we had to handle this on our own.  Fortunately, it is very easy to do, so keep reading and we will show you how to handle writing the module upgrade path.


Investigating what to move
---------------------

I know that in both the Drupal 7 and Drupal 8 version of Workflow, all data is stored in the database.  I also know in the Drupal 8 version, Workflow has its on Content Entities.  With this knowledge in hand, I can begin investigating what needs to be migrated.

### Drupal 7 Database Investigation

I fired up the Drupal 7 version of the site and drop into the MySQL CLI via ```drush sql-cli```.  I then run ```SHOW TABLES;``` to list all the tables in the database.  I can see eight tables that pertain to the Workflow module.  Since we are only moving the workflow history, the ```workflow_node_history``` table seemed to be our winner.  I then ran ```DESCRIBE workflow_node_history;``` and the output is as such:

```sql
mysql> describe workflow_node_history;
+-------------+------------------+------+-----+---------+----------------+
| Field       | Type             | Null | Key | Default | Extra          |
+-------------+------------------+------+-----+---------+----------------+
| hid         | int(11)          | NO   | PRI | NULL    | auto_increment |
| entity_type | varchar(255)     | NO   | MUL |         |                |
| nid         | int(10) unsigned | NO   |     | 0       |                |
| revision_id | int(10) unsigned | YES  |     | NULL    |                |
| field_name  | varchar(32)      | NO   |     |         |                |
| language    | varchar(32)      | NO   |     |         |                |
| delta       | int(10) unsigned | NO   |     | 0       |                |
| old_sid     | int(10) unsigned | NO   |     | 0       |                |
| sid         | int(10) unsigned | NO   |     | 0       |                |
| uid         | int(10) unsigned | NO   |     | 0       |                |
| stamp       | int(10) unsigned | NO   |     | 0       |                |
| comment     | longtext         | YES  |     | NULL    |                |
+-------------+------------------+------+-----+---------+----------------+
12 rows in set (0.00 sec)
```

These are all the fields that contain the data I need.  I figured this out via a simple MySQL query: ```SELECT * FROM workflow_node_history``` and it showed all the history data.  With this discovery, I now to figure out how to map the data to the Drupal 8 side.

### Drupal 8 Database Investigation

On the Drupal 8 side, workflow is already installed and set up.  We manually migrated the workflow states and everything pertaining to that setup.  So that just leaves looking into the database for how the workflow history is stored now.  Using the ```SHOW TABLES;``` command, I could see that there were only two Workflow tables and one was ```workflow_transition_history```.  I ran my describe command and it showed the following:

```sql
MariaDB [drupal8]> describe workflow_transition_history;
+-------------+------------------+------+-----+---------+----------------+
| Field       | Type             | Null | Key | Default | Extra          |
+-------------+------------------+------+-----+---------+----------------+
| hid         | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| wid         | varchar(32)      | NO   | MUL | NULL    |                |
| langcode    | varchar(12)      | NO   |     | NULL    |                |
| entity_type | varchar(32)      | YES  |     | NULL    |                |
| entity_id   | int(10) unsigned | YES  | MUL | NULL    |                |
| revision_id | int(10) unsigned | YES  |     | NULL    |                |
| field_name  | varchar(32)      | YES  |     | NULL    |                |
| delta       | int(10) unsigned | YES  |     | NULL    |                |
| from_sid    | varchar(255)     | YES  | MUL | NULL    |                |
| to_sid      | varchar(255)     | YES  | MUL | NULL    |                |
| uid         | int(10) unsigned | YES  | MUL | NULL    |                |
| timestamp   | int(11)          | YES  |     | NULL    |                |
| comment     | longtext         | YES  |     | NULL    |                |
+-------------+------------------+------+-----+---------+----------------+
13 rows in set (0.00 sec)
```

The data is very similar; there is a new column (wid) and some are named different.  Luckily for us, it is very straight forward to map data to whatever column we need.

### Drupal 8 Entity Investigation

I need to be able to map this data to an entity for ease of use.  I am not 100% sure if you can do a database to database migration, but there may be.  However, for the purpose of the task at hand, we will need an entity to migrate to. I use [Drupal Console's](https://drupalconsole.com/) debug entity command: ```drupal de``` to list out all the entities on the site.  I can see 2 Workflow content entities and it looks like ```workflow_transition``` is our winner.

I double check this by searching the code base for the workflow_transition plugin that declares this entity id.  I find it the Content Entity defined in the WorkflowTransition class.  The class has all the properties that are in the Drupal 8 database and so we know this is the entity to use.

Writing The Migration Path
----------------------------

So with the investigation complete, it is time to get our hands dirty and write this migration path.  We will need two items to make this happen: a class defining the migration source and a YAML config file mapping that source.  Let's start with the migration source class:

### The Migration Source Class

So here is the Workflow migration class that we came up:

```php
namespace Drupal\YOUR_MODULE\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;

/**
 * Obtains the D7 Workflow fields to migrate to Drupal 8.
 *
 * @MigrateSource(
 *   id = "workflow_migrate"
 * )
 */
class WorkflowMigrate extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $fields = [
      'hid',
      'entity_type',
      'nid',
      'revision_id',
      'field_name',
      'delta',
      'old_sid',
      'sid',
      'uid',
      'stamp',
      'comment',
    ];
    return $this->select('workflow_node_history', 'w')
      ->fields('w', $fields);
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    $fields = [
      'hid' => $this->t('Unique ID of the Workflow'),
      'entity_type' => $this->t('Entity Type'),
      'nid' => $this->t('Entity ID'),
      'revision_id' => $this->t('The Revision ID'),
      'field_name' => $this->t('Field name on the entity'),
      'delta' => $this->t('The workflow delta.'),
      'old_sid' => $this->t('Original Workflow SID'),
      'sid' => $this->t('Workflow SID transition to'),
      'uid' => $this->t('Author Id that did the workflow'),
      'comment' => $this->t('Workflow Comment'),
    ];

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    return ['hid' => ['type' => 'integer']];
  }

}
```

So as you can see, this class has 3 methods: query, fields, and getIds.  The query is used to grab all our fields that contain the data we will be mapping.  The fields method declares the fields we laid out in the query methods.  The getIds seems to be the index for this whole setup.  Pretty simple and straight forward.  All our fields are now identifiable as source fields for the migration.  Now we just link this up to the migration config file.

### The Migration Config File

Now that we have the source class written, we can link it up with what was listed in the Drupal 8 table identified above.  The result of that is the following:

```yaml
langcode: en
status: true
dependencies:
  enforced:
    module:
      - YOUR_MODULE
id: workflow
class: null
field_plugin_method: null
cck_plugin_method: null
migration_tags: null
migration_group: workflow
label: 'Workflow Migration'
source:
  plugin: workflow_migrate
process:
  wid:
    plugin: default_value
    default_value: proposal
  langcode:
    plugin: default_value
    default_value: en
  entity_type: entity_type
  entity_id: nid
  revision_id: revision_id
  field_name: field_name
  delta: delta
  from_sid:
    plugin: static_map
    source: old_sid
    bypass: true
    map:
      1: proposal_creation
      2: proposal_draft
      3: proposal_summary_submitted
      4: proposal_summary_in_committee
      5: proposal_summary_expired
      6: proposal_summary_declined
      7: proposal_full_proposal_requested
      8: proposal_full_proposal_in_committee
      9: proposal_funded
      10: proposal_declined
      11: proposal_withdrawn
      12: proposal_rescinded
  to_sid:
    plugin: static_map
    source: sid
    bypass: true
    map:
      1: proposal_creation
      2: proposal_draft
      3: proposal_summary_submitted
      4: proposal_summary_in_committee
      5: proposal_summary_expired
      6: proposal_summary_declined
      7: proposal_full_proposal_requested
      8: proposal_full_proposal_in_committee
      9: proposal_funded
      10: proposal_declined
      11: proposal_withdrawn
      12: proposal_rescinded
  uid: uid
  timestamp: stamp
  comment: comment
destination:
  plugin: 'entity:workflow_transition'
migration_dependencies: {  }
```

Let's break this down a little to make it easier to understand.  We identified the source as the plugin we created ```workflow_migrate```.  That links this YAML file to that class via the YAML discovery plugin process.  From there we just mapped the entity / database fields to the Drupal 7 source fields.

One item that stands out is the wid field.  This was not in the Drupal 7 database and after digging, it is the workflow id.  This is the id of the workflow we manually setup.  Since we have just one workflow on this site, we just used a default value for it as it is the same for all the entries.

We also used the ```static_map``` to handle the fact the Drupal 7 state ids were numeric and are not in Drupal 8.  The rest of this is just a one to one mapping of the source fields.

We also did not migrated the hid field since it was an auto increment field.  I left it in the migration source class as it is the index for the Drupal 7 database table.

Finally, we use the entity mapping we discovered during our investigation.  This will automatically align all our fields as we defined and inject them into the database while creating the content entities.

Conclusion
----------

The Drupal 8 migration system is a very powerful mechanism.  You can use the migration upgrade path I outlined for any database to entity type migration within Drupal 8.  It is simple yet fairly straight forward once you handle a few custom migrations.
