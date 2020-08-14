---
title: "Handling Post Migration Events in Drupal 8"
tags:
    - development
    - drupal
    - migration
    - johno
author: "John Ouellet"
date: "2018-04-20"
summary: "Sometimes we need to alter data after a Drupal 8 migration has finished.  With the migration events system, you can easily accomplish this."
id: johno
pic: "https://www.gravatar.com/avatar/36cf0d0492681818218bb36b6fdd6e33"
location: Florida
---

Why We need to do this
---------------------

One of the university clients we are helping migrate their Drupal 7 to Drupal 8 site had an interesting dilemma.  They use the [Flag module](https://www.drupal.org/project/flag) to mark favorite content within their site.  They also needed to push out a set of default flags as well for all users.  The user would have the ability to unflag defaults they didn't need.  These default flags would be displayed with the users chosen flags as well.  This posed an interesting situation as we couldn't use the global flag option for the defaults.

The solution was to assign the default flag content to all users during the migration.  There were other mechanisms at play for when the site was live, but for the sake of brevity we will only focus on the migration tasks.

The problem was that the users were migrated first, then the node content.  We couldn't flag content post user save because the nodes were not there yet.   We also couldn't apply the flags post node save because all the nodes were not imported yet.  After a little research, we found that flagging the users post node migration was the best option to get this task done.


Writing the EventSubscriber
---------------------

Drupal 8 utilizes the [Symfony Event Components](http://symfony.com/doc/current/components/event_dispatcher.html) system in its core.  Events are similar to the hook alter system in Drupal 7.  Although there is more too it as Events can interact with the lowest level of Symfony easily.

We will be utilizing the Drupal 8 [Migration Process Events](https://www.drupal.org/node/2544874) system for the task at hand.  This gives us a few event hooks we can tie into.  We landed on the POST_IMPORT event to get the job done.

First we wrote our EventSubscriber class as follows:

```php
namespace Drupal\YOUR_MODULE\EventSubscriber;

use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigrateImportEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\user\Entity\User;

/**
 * Class PostMigrationSubscriber.
 *
 * Run our user flagging after the last node migration is run.
 *
 * @package Drupal\YOUR_MODULE
 */
class PostMigrationSubscriber implements EventSubscriberInterface {

  /**
   * Get subscribed events.
   *
   * @inheritdoc
   */
  public static function getSubscribedEvents() {
    $events[MigrateEvents::POST_IMPORT][] = ['onMigratePostImport'];
    return $events;
  }

  /**
   * Check for our specified last node migration and run our flagging mechanisms.
   *
   * @param \Drupal\migrate\Event\MigrateImportEvent $event
   *   The import event object.
   */
  public function onMigratePostImport(MigrateImportEvent $event) {
    if ($event->getMigration()->getBaseId() == 'YOUR_MIGRATION_ID') {
      $this->flagAllUsers();
    }
  }

  /**
   * Updates all default flags on our users.
   */
  private function flagAllUsers() {
    $users = User::loadMultiple();
    foreach ($users as $user) {
      // Do our flagging stuff here.
    }
  }
}
```

As you can see, we are defining our POST_IMPORT function in the method getSubscribedEvents.  This property comes from the parent class that registers all the events we need to get the job done.  Since the Event system uses the YAML discovery method within its plugin system, we need to define our service.  We do this by adding the following to the YOUR_MODULE.services.yml file:

```yaml
services:
  post_migration_subscriber:
    class: '\Drupal\YOUR_MODULE\EventSubscriber\PostMigrationSubscriber'
    tags:
      - { name: 'event_subscriber' }
```

Now, when we run the YOUR_MIGRATION_ID migration, it will then cycle through all our users and flag them when the migration is finished.  In the university client's setup, the YOUR_MIGRATION_ID was the last node migration id that would run so we knew all the nodes would be available.

Conclusion
----------

The Drupal 8 Event system is a great way to use Symfony's core systems to get the job done.  It is easily customizable and there are numerous Events that you can tie into.  I highly suggest you check it out.
