---
title: 'Fixing Stagnant Inline Entity Forms in the Search Index'
tags:
    - development
    - support
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/inline-search.jpg
img-src: images/articles/inline-search.jpg
byline: 'When using inline entity form to render nodes on a parent node, it can pose a minor problem with the Search API.'
date: '2017-12-07'
---

The Issue Before Us
-------------------

One of our Drupal 7 client uses [Inline Entity Form](https://www.drupal.org/project/inline_entity_form) to render nodes on a parent node.  In days past, we would use [Nodequeue](https://www.drupal.org/project/nodequeue) with [Views](https://www.drupal.org/project/views) typically to do this.  This just happens to be the way the client requested this functionality when the site was being built.

The client regularly updates these parent nodes and changes out the child nodes.  When they do this, the search index does not update itself for some strange reason.  I tried using the [Entityreference backreference](https://www.drupal.org/project/entityreference_backreference) module to address the issue but it did not resolve it.  With a little Google Fu I came up with a custom method instead.


The Solution
------------

So what needed to be done was to clear the node form the index when the node was saved.  On the next scheduled ```search_cron``` run, the new node would be picked up.  The simplified way of doing this was:

```php
/**
 * Implements hook_node_presave().
 */
function YOUR_MODULE_node_presave($node) {
  if ($node->nid) {
    search_reindex($node->nid, 'node');
  }
}
```

Basically this will delete the node from the index on save every time.  However, I don't want to do this on every node save.  I only want the types that have the inline entity form.  I came up this fun tidbit of code:

```php
/**
 * Implements hook_node_presave().
 */
function YOUR_MODULE_node_presave($node) {
  // Identify Inline Entity Forms fields on nodes.
  $types = node_type_get_types();
  foreach ($types as $type) {
    $fields = field_info_instances('node', $type->type);
    foreach ($fields as $field) {
      if (isset($field['widget']['type'])
          && $field['widget']['type'] === 'inline_entity_form') {
        $final_types[] = $type->type;
      }
    }
  }

  // Remove the duplicates
  $types = array_unique($final_types);

  // Remove the nid from the search.
  if ($node->nid && in_array($node->type, $types)) {
    search_reindex($node->nid, 'node');
  }
}
```
Now nodes with inline entity form fields will be reindexed on node save.  This fixes our issue and all is well.  For safe measure, late at night, I reindexed the whole site.  I used the [Search Wipe Module](https://www.drupal.org/project/searchindex_wipe) module to easily clear the search index.  I also then reindexed the whole site with ```drush search-reindex --immediate --verbose``` which reindexes the site at once instead of doing it slowly with cron.  Problem solved and everybody wins.
