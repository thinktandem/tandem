---
title: 'Migrating from Toolset Types to Advanced Custom Fields'
tags:
    - development
    - wordpress
    - johno
author: 'John Ouellet'
date: '2020-07-07'
summary: 'A straight forward guide on moving your fields data from Toolset to ACF.'
id: johno
pic: 'https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33'
location: Florida
---

## Overview

We recently finished a project where we had to take a legacy WordPress site and retheme it.  On top of the retheme, the site needed a lot of love in the admin experience arena.  Typically, when we build out new WordPress sites, [Advanced Custom Fields](https://www.advancedcustomfields.com/) (ACF) is one of our go to plugins for every single project.  The site we were fixing up used [Toolset Types](https://toolset.com/home/types-manage-post-types-taxonomy-and-custom-fields/) for their Custom Post Types (CPT) and Fields.  We had never seen this plugin before in action.

After playing around with Toolset, we decided to ditch the Toolset plugin and go with our typical setup.  After a little Google-fu and trial / error, I found a fairly straight forward way to handle this data migration.

## Setup

When we did this project, we had created a new WordPress site and migrated the tables we needed over.  We have an internal plugin we use that utilizes multiple database containers via [Lando](https://lando.dev/) and [WP CLI](https://wp-cli.org/) to do our magic.  One day I will turn this into a public plugin.  However, you can use any migration plugin you choose.  I recommend [Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro) if you don't have a go to plugin.

All the data we will need is stored in the ```wp_postmeta``` table.  We will be recreating the CPTs manually, so any standalone Toolset tables are not needed.  Obviously you will move other tables if you are rebuilding the site.  Theoretically, you could do this on the original website that has Toolset.  However, I didn't try it that way, so tread with caution if you do.

## Create CPTs Manually

The first thing we need to do is recreate the CPTs manually.  When you create these, the slugs have to be exactly how they are in Toolset.  I noticed that Toolset uses hyphens instead of underscores.  It could be just this instance, but do take note how they slugs are.  We use a pretty standard action hook for ours throughout our projects:

```php
/**
 * Register Custom Post Types.
 */
function register_cpts() {
  $types = [
    'type' => [
      'icon' => 'dashicons-location-alt',
    ],
    'stuff' => [
      'icon' => 'dashicons-admin-site-alt',
      'slug_base' => '/stuff/'
    ],
    'things' => [
      'icon' => 'dashicons-format-status',
      'plural' => 'things',
      'has_archive' => 'things'
    ],
  ];

  foreach ($types as $type => $data) {
    $slug = str_replace(["/", "  ", " "], ["", " ", "-"], $type);
    $plural = isset($data['plural']) ? $data['plural'] : $type . 's';
    $labels = [
      'name' => ucwords($plural),
      'singular_name' => ucwords($type),
      'add_new_item' => 'Add New ' . ucwords($type),
      'edit_item' => 'Edit ' . ucwords($type),
      'new_item' => 'New ' . ucwords($type),
      'view_item' => 'View ' . ucwords($type),
      'search_items' => 'Search ' . ucwords($plural),
      'not_found' => 'No ' . strtolower($plural) . ' found',
      'not_found_in_trash' => 'No ' . strtolower($plural) . ' found in Trash',
      'parent_item_colon' => 'Parent ' . ucwords($type) . ':',
      'all_items' => 'All ' . ucwords($plural),
      'archives' => ucwords($type) . ' Archives',
    ];

    $args = [
      'labels' => $labels,
      'description' => 'Sortable/filterable ' . $plural,
      'public' => true,
      'has_archive' => isset($data['has_archive']) ? $data['has_archive'] : false,
      'show_ui' => isset($data['show']) ? $data['show'] : true,
      'show_in_nav_menus' => isset($data['show']) ? $data['show'] : true,
      'show_in_menu' => isset($data['show']) ? $data['show'] : true,
      'show_in_admin_bar' => isset($data['show']) ? $data['show'] : true,
      'menu_position' => 20,
      'menu_icon' => $data['icon'],
      'hierarchical' => true,
      'rewrite' => [
        'slug' => isset($data['slug_base']) ? $data['slug_base'] . $slug : $slug,
        'with_front' => false,
        'feeds' => true,
      ],
      'query_var' => true,
      'show_in_rest' => true,
      'taxonomies'  => [
        'category',
        'post_tag'
      ],
      'supports' => [
        'title',
        'editor',
        'author',
        'thumbnail',
        'excerpt',
        'revisions',
        'custom-fields',
        'page-attributes'
      ],
    ];

    register_post_type($slug, $args);
    flush_rewrite_rules();
  }
}
add_action('init', 'register_cpts');
```

As you can see in the ```$types``` array we are defining the slug name and then some options.  We found that you really only need to tweak a couple settings typically on a CPT. I used some generic examples so you get a gist of whats going on.  Also note in the str_replace function, we are using a hyphen there instead of an underscore.

Also note, we set ```show_in_rest``` to true.  Since [Gutenberg](https://wordpress.org/gutenberg/), developers like to set that to false to turn off Gutenberg.  While it works, it isn't technically correct.  You are turning off the [REST API](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-rest-api-support-for-custom-content-types/) for that CPT and that could hurt you down the road.  The correct way to turn off Gutenberg for CPTs is as follows:

```php
/**
 * Turns off Gutenberg for custom post types.
 */
function turn_off_gutenberg($use_block_editor, $post_type) {
  switch ($post_type) {
    case 'type':
    case 'stuff':
      return false;
      break;
  }
  return $use_block_editor;
}
add_filter('use_block_editor_for_post_type', 'turn_off_gutenberg', 10, 2);
```

As you can see, I am turning off Gutenberg for the type and stuff CPTs.  The things CPT will have Gutenberg on in this example.  With that, our CPTs are setup as they were with Toolset's Types.  Just make sure your settings are the same and you are ready to move onto the next step.

## Create ACF Groups & Fields

The next step in this journey is to manually recreate your Toolset Fields and Groups in ACF.  This is more tedious than anything, especially if you have a bunch of fields. While there are programmatic ways to generate ACF fields, it is better to just do this manually.

The first thing I did was create the groups and made sure they were named the same as the CPT's.  I then added the Location rules so they were mapped to their respective CPT's.  Pretty straight forward and easy to do.

So the next part was going through and creating all the fields within those groups.  The biggest take away from this is to ***make sure your field name has wpcf- before it***.  For example: If the field slug on the Toolset config was ```contact-type```; the ACF field name will be ```wpcf-contact-type```.  That is the magic that will line up the ```wp_postmeta``` correctly.

Make sure all your fields data is exactly the same.  Especially in checkboxes, radios, selects, etc.  If you don't then the data won't match up properly and you will have empty fields.

With that, we are almost done.  The only thing left to do is some data cleanup on specific field types.

## Fixing Certain Field's Meta Values

ACF stores some field types meta values different in the ```wp_postmeta``` table.  For our use case, the two field types we came across were checkboxes and files.  The checkboxes.  The checkboxes were stored in a serialized multidimensional array that had wpcf-fields-checkboxes-option as a key.  While the files stored the whole file url as a meta value.  ACF only stores the serialized checkbox values and the attachment post id for files.

The easiest way to fix this is either via WP CLI or through a settings form.  I whipped up a standard settings form so you can just slap this in place:

```php
/**
 * Used to cleanup the checkboxes/files on the toolset types to acf migration.
 */

/**
 * Class MigrationCleanup
 */
class MigrationCleanup {

  /**
   * WordPress DB class.
   *
   * @var wpdb
   */
  protected $wpdb;

  /**
   * The checkbox fields.
   *
   * @var array
   */
  protected $fields = [
    'wpcf-field-one',
    'wpcf-field-two',
    'wpcf-field-three',
  ];

  /**
   * MigrationCleanup constructor.
   */
  public function __construct() {
    global $wpdb;
    $this->wpdb = $wpdb;
    add_action('admin_menu', [$this, 'createSettingsPage']);
  }

  /**
   * Sets up the settings sub page.
   */
  public function createSettingsPage() {
    $parent_slug = 'options-general.php';
    $page_title = 'Migration Cleanup';
    $menu_title = 'Migration Cleanup';
    $capability = 'manage_options';
    $slug = 'migration cleanup';
    $callback = [$this, 'settingsPageRender'];
    $position = 100;
    add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $slug, $callback, $position );
  }

  /**
   * Renders our settings page.
   */
  public function settingsPageRender() {
    ?>
      <div class="wrap">
        <h2>Migration Cleanup</h2>
        <p>This page is used to fix the typeset checkboxes that do not work within ACF.</p>
        <?php
          if (isset($_POST['submit'])) {
            $this->fixCheckboxes();
            $this->fixFiles();
          }
        ?>
        <form method="POST" action="options-general.php?page=migration+cleanup">
          <?php submit_button( 'Fix Migrations' ); ?>
        </form>
      </div>
    <?php
  }

  /**
   * Fix our checkboxes.
   */
  public function fixCheckboxes() {
    // Formats our IN query properly.
    $final = array_map(function($field) {
      return "'" . esc_sql($field) . "'";
    }, $this->fields);

    // Grabs all our post meta by the fields.
    $query = sprintf("SELECT * FROM `%s` WHERE meta_key IN (%s)",
      $this->wpdb->postmeta,
      implode(",", $final)
    );

    // Now lets go through the results.
    foreach ($this->wpdb->get_results($query) as $postmeta) {
      $results = [];
      $meta_data = unserialize($postmeta->meta_value);

      // If no data, then continue
      if ($meta_data === false || empty($meta_data)) {
        continue;
      }

      // Now populate our array to reuse.
      foreach ($meta_data as $key => $data) {
        // Only process sad ones.
        if (strpos($key, 'wpcf-fields-checkboxes-option') !== false) {
          foreach ($data as $datum) {
            $results[] = $datum;
          }
        }
      }

      // Engage.
      if (!empty($results)) {
        update_post_meta($postmeta->post_id, $postmeta->meta_key, $results);
      }
    }
  }

  /**
   * Fixes our file fields.
   */
  public function fixFiles() {
    $query = sprintf("SELECT * FROM `%s` WHERE meta_key = '%s'",
      $this->wpdb->postmeta,
      'wpcf-associated-file'
    );

    foreach ($this->wpdb->get_results($query) as $postmeta) {
      $meta = str_replace('https://YOUR-OLD-SITE-URL/wp-content/uploads/', '', $postmeta->meta_value);
      $id = attachment_url_to_postid($meta);
      if ($id !== 0) {
        update_post_meta($postmeta->post_id, $postmeta->meta_key, $id);
      }
    }
  }
}
new MigrationCleanup();
```

Outside of the typical settings form setup, the code does a few things.  First, in our fields property, we are defining the field names that are checkboxes.  In our constructor, we are hooking into our database via ```$wpdb``` and setting it as a property.  When we hit submit on the settings form, we are then doing the magic that fixes the data.  Also note, in the fixFiles method, make sure you update the url in str_replace to match the data in your old site.

You can see by the code that we are just massaging the data to fit how ACF stores the meta values.  If you come across any other field types that need some TLC, then just use this code to add your own method.

## Conclusion

While there is a small amount of heavy lifting, migrating from Toolset to ACF isn't impossible.  If you have any questions on this post or need help with complex WordPress work, please fill out the form below.
