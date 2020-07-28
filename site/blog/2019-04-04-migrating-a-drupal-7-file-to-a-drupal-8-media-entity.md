---
layout: Post
title: 'Migrating a Drupal 7 File To a Drupal 8 Media Entity'
tags:
    - development
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/d7-d8.jpg
img-src: images/articles/d7-d8.jpg
byline: 'Media has been in core since 8.3.  As of this blog post, no migration path exists yet for a Drupal 7 File to a Drupal 8 Media Entity.'
date: '2019-04-04'
---

Use Case
--------

Recently I was involved with migrating a site that had numerous file based widgets on their Drupal 7 site.  The technical stakeholder was aware of the media module in Drupal 8.  The client requested that we migrate all file based items to media entities for better management in the new site.  The file widgets on the entities themselves would also be migrated to Entity Reference Media widgets as well.  This was something I had not done yet, but I knew anything is possible with Drupal 8's Migration API.  The following is how I figured out to handle this and I hope it helps you.


Research and Exploration
--------------------

I started out using Google to see if anyone else had figured this out.  There was a [a blog post by PreviousNext](https://www.previousnext.com.au/blog/migrating-drupal-7-file-entities-drupal-8-media-entities) and a [Drupal StackExchange post](https://drupal.stackexchange.com/questions/247328/how-do-i-migrate-file-entities-into-media-entities) that seemed promising.  After some tinkering, the PreviousNext post didn't fit my use case.  The StackExchange post straight up didn't work due to missing parameters in the migration config.

I also researched [core](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins/list-of-core-migrate-process-plugins) and [contrib](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins/list-of-process-plugins-provided-by-migrate-plus) Migration plugins as well.  I decided to give the [entity_generate](https://www.drupal.org/docs/8/api/migrate-api/migrate-process-plugins/contrib-process-plugin-entity_generate) plugin a try as the name seemed promising.  I have used a lot of migration plugins, but had never tried this one.  Again I hit a brick wall as it seems the ```entity_generate``` plugin is not capable of converting an entity type.  I could of played around with it more and possibly tried to finagle something with default values, but I had already spent 2 hours and did not want to waste more valuable time.

I knew I had to write something custom as I have done many time before.  With the help of my research I was able to accomplish my goal.

Migrating Drupal 7 Files to Drupal 8 Media Entities
----------------

### Writing the Process Plugin

The StackExchange post was the closest thing to what I needed.  So I borrowed some of the code of that to accomplish my task.  Here is the process plugin I came up with that got the job done:

```php

namespace Drupal\YOUR_MODULE\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;
use Drupal\migrate\MigrateException;
use Drupal\migrate\ProcessPluginBase;

/**
 * Generates a media entity from a file and returns the media id.
 *
 * @MigrateProcessPlugin(
 *   id = "media_generate"
 * )
 *
 * To generate the entity it is best to this in a subprocess:
 *
 * @code
 *  field_name:
 *    -
 *      plugin: sub_process
 *      source: field_name
 *      process:
 *        target_id:
 *          -
 *            plugin: migration_lookup
 *            source: fid
 *            migration: upgrade_d7_file
 *          -
 *            plugin: media_generate
 *            destination_bundle: media_bundle
 *            destination_field: field_media_name
 * @endcode
 */
class MediaGenerate extends ProcessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    if (!isset($this->configuration['destination_field'])) {
      throw new MigrateException('Destination field must be set.');
    }
    if (!isset($this->configuration['destination_bundle'])) {
      throw new MigrateException('Destination bundle must be set.');
    }

    $field = $this->configuration['destination_field'];
    $bundle = $this->configuration['destination_bundle'];

    /* @var /Drupal/file/entity/File $file */
    $file = File::load($value);
    if ($file === NULL) {
      throw new MigrateException('Referenced file does not exist');
    }

    // Grab our alt tag.
    $alt = $row->getSourceProperty('alt');
    if (empty($alt)) {
      // Generate alt tag since the didn't exist in the D7 site.
      $alt = "Media Name: " . $file->label();
    }

    $media = Media::create([
      'bundle' => $bundle,
      'uid' => $file->getOwner()->id(),
      'status' => '1',
      'name' => $file->label(),
      $field => [
        'target_id' => $file->id(),
        'alt' => $alt,
      ],
    ]);
    $media->save();

    // @todo uncomment this on the final migration: file_delete($file->id());

    return $media->id();
  }

}
```

As you can see in the ```@code``` brackets in the annotation, I am running this through the ```sub_process``` plugin and after the ```migration_lookup``` plugin.  Obviously you will need to run your file migration prior to this.  I did it this way to handle file fields that have a cardinality greater than one.  I am passing in two config keys which make this universal: the media entity bundle and the field within that media entity.  This site has two different media entity bundles: image and file.  So I can just tweak those fields in the migration's yaml.

The plugin itself is pretty straightforward.  I am passing the fid into the plugin itself then loading the file.  I then use that file to create the Media entity.  Since a lot of the D7 files did not have alt tags on any them, I had to make a pseudo one to fit the bill.  The new media id gets returned to the field's target_id and that gets what we need done.

I also go through and delete the original files as a cleanup task in the end, since there is no reason to keep the original file around once it is converted.  However, I left this code commented out until I ran the final migration, as you would have to rerun the file migration on every re-roll of the migration.


### Handling the Rollback

One thing I noticed after getting this all to work is that the media entities were not deleted on rollback.  That is problematic as we will be re-rolling migrations numerous times throughout this process.  Using my previous migration efforts I knew I had to write a [Migration Event Subscriber](https://api.drupal.org/api/drupal/core%21modules%21migrate%21src%21Event%21MigrateEvents.php/class/MigrateEvents/8.2.x) to do this.  If have used Migration Event Subscriber's numerous times in all the migrations I have done.  I also [wrote a blog post about](https://thinktandem.io/blog/2018/04/20/handling-post-migration-events-in-drupal-8/) them last year.

First you need to register your event subscriber in your modules.services.yml:

```yaml
services:
  migration_subscriber:
    class: '\Drupal\YOUR_MODULE\EventSubscriber\MigrationSubscriber'
    arguments: ['@entity_type.manager', '@entity_field.manager']
    tags:
      - { name: 'event_subscriber' }
```

I knew I had to handle the cleanup via the ```PRE_ROLLBACK``` event.  I needed the entities available to grab their fields before they were deleted.  I tried to make this as universal as possible so any entity type could use this.  Here is what I came up with:

```php

namespace Drupal\YOUR_MODULE\EventSubscriber;

use Drupal\migrate\Event\MigrateEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\migrate\Event\MigrateRollbackEvent;

/**
 * Class MigrationSubscriber.
 *
 * Handles various migrations tasks outside of normal flow.
 *
 * @package Drupal\YOUR_MODULE
 */
class MigrationSubscriber implements EventSubscriberInterface {

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The entity field manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManager
   */
  protected $entityFieldManager;

  /**
   * The entity type.
   *
   * @var string
   */
  protected $entityType;

  /**
   * The entity bundle.
   *
   * @var string
   */
  protected $bundle;

  /**
   * Constructs a new MigrationSubscriber.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity manager.
   * @param \Drupal\Core\Entity\EntityFieldManager $entity_field_manager
   *   The entity field manager.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, EntityFieldManager $entity_field_manager) {
    $this->entityTypeManager = $entityTypeManager;
    $this->entityFieldManager = $entity_field_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[MigrateEvents::PRE_ROLLBACK][] = ['onMigratePreRollback'];
    return $events;
  }

  /**
   * React to rollback start.
   *
   * @param \Drupal\migrate\Event\MigrateRollbackEvent $event
   *   The map event.
   */
  public function onMigratePreRollback(MigrateRollbackEvent $event) {
    $dest = $event->getMigration()->getDestinationConfiguration();
    if (!isset($dest['plugin']) && !isset($dest['default_bundle'])) {
      return;
    }
    // Grab our type and make the magiz happen.
    $this->entityType = ltrim(strstr($dest['plugin'], ':'), ':');
    $this->bundle = $dest['default_bundle'];
    $this->checkFieldsforMediaEntities();
  }

  /**
   * Checks the nodes fields for media entities.
   */
  private function checkFieldsforMediaEntities() {
    // Grab all our fields for this entity type.
    $fields = $this->entityFieldManager
      ->getFieldDefinitions($this->entityType, $this->bundle);

    foreach ($fields as $field_name => $field_definition) {
      /** @var \Drupal\field\Entity\FieldConfig $field_definition */
      if ($field_definition->getTargetBundle() !== NULL) {
        if ($field_definition->getType() === 'entity_reference'
            && $field_definition->getFieldStorageDefinition()->getSetting('target_type') === 'media') {
          $this->removeMediaEntities($field_name);
        }
      }
    }
  }

  /**
   * Remove the media entities for that field and type.
   *
   * @param string $field_name
   *   The field name we are checking.
   */
  private function removeMediaEntities($field_name) {
    // Grab all our nodes to get the media ids.
    $entities = $this->entityTypeManager
      ->getStorage($this->entityType)
      ->loadByProperties([
        'type' => [$this->bundle],
      ]);

    // Go through and load up the target entity ids.
    foreach ($entities as $entity) {
      $media = [];
      $ids = $entity->get($field_name)->getValue();
      foreach ($ids as $id) {
        if (isset($id['target_id'])) {
          $media_check = $this->entityTypeManager
            ->getStorage('media')->load($id['target_id']);
          if ($media_check !== NULL) {
            $media[] = $media_check;
          }
        }
      }
      // Remove the media entites associated with that type.
      if (!empty($media)) {
        // Delete all the medias.
        $this->entityTypeManager
          ->getStorage('media')->delete($media);
      }
    }
  }

}
```

Right before a rollback happens, the Event Subscriber goes through and checks the current migration's entity type and bundle for Media fields.  If the field type exists, then it cycles though the field and grabs all the media ids to delete.  Again, fairly straightforward... there could be other ways to do this, but this is what I ended up with.


Conclusion
---------

Sometimes when doing a Drupal 8 migration existing plugins and other people's posts just don't get the task done.  The Migration API is robust and easy to tap into.  This custom solution took me less than two hours to write and now the world can benefit from it.

If you're ever stuck in a corner on a Drupal 8 migration, [reach out to us](https://thinktandem.io/contact) and we can help you out!
