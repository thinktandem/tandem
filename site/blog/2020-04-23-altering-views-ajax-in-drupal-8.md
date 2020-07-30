---
layout: Post
title: 'Altering Views Ajax in Drupal 8'
tags:
    - development
    - drupal
    - support
author: 'John Ouellet'
private: false
mainImage: images/articles/ajax.jpg
img-src: images/articles/ajax.jpg
byline: 'A straight forward guide on how to have your JavaScript fire after each Drupal 8 Views AJAX call is made.'
date: '2020-04-23'
meta:
    - { name: description, content: 'A straight forward guide on how to have your JavaScript fire after each Drupal 8 Views AJAX call is made.' }
    - { name: keywords, content: 'development,drupal,support' }
---

## Overview

We have a client that had a unique situation with one of their views exposed filters setup.  We had a set of checkboxes with a set of corresponding images (that were checkboxes with images for labels) that could also be used in the form.  One you pressed either the checkbox or the image, the reciprocating element was also was selected.  Different flow, but it was quite interesting to set up.  

The form used an autosubmit via [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) as well.  The issue I kept running into was after the first time you selected a checkbox or image, they didn't stay paired on subsequent clicks.  After a little research, using the typical [Drupal.behavoir](https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview) based JavaScript wouldn't cut it in this scenario.  The JS wouldn't fire again after each AJAX call from the view.  I believe this was due to the DOM already having been loaded on initial page setup and the behavior not getting called when AJAX rebuild the page.  

The only way to remedy our dilemma was to have a [Drupal 8 AJAX prototype command](https://www.drupal.org/node/2019879) that can fire after each Views AJAX call.  After some digging, I was able to accomplish this with a combination of [Event Subscribers](https://www.drupal.org/docs/8/creating-custom-modules/subscribe-to-and-dispatch-events) and a [Command Interfaces](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Ajax%21CommandInterface.php/interface/CommandInterface/8.2.x).  Let me show you how I got it all to work.

## Setup the Event Subscriber Interface

Event Subscribers are an extremely useful tool in Drupal 8.  They can be used for a variety of situations like responding to [when a user logs in](https://www.drupal.org/forum/support/module-development-and-code-questions/2013-08-18/how-to-redirect-user-after-login-in#comment-12645463) or [altering data post migration](https://thinktandem.io/blog/2018/04/20/handling-post-migration-events-in-drupal-8/).  Always check your contrib modules to see if they define their own Events.  It will definitely come in handy when you need to do some advanced winning.

So, let's cut to the good stuffs.  After a little trial and error mixed in with some Google-fu, I came up with the following Event Subscriber:

```php
namespace Drupal\YOUR_MODULE\EventSubscriber;

use Drupal\views\Ajax\ViewAjaxResponse;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\YOUR_MODULE\Ajax\AfterViewsAjaxCommand;

/**
 * Alter a Views Ajax Response.
 */
class ViewsAjaxResponseSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::RESPONSE][] = ['onResponse'];
    return $events;
  }

  /**
   * Allows us to alter the Ajax response from a view.
   *
   * @param \Symfony\Component\HttpKernel\Event\FilterResponseEvent $event
   *   The event process.
   */
  public function onResponse(FilterResponseEvent $event) {
    $response = $event->getResponse();

    // Only act on a Views Ajax Response.
    if ($response instanceof ViewAjaxResponse) {
      $view = $response->getView();

      // Only act on the view to tweak.
      if ($view->storage->id() === 'MY_VIEW') {
        $response->addCommand(new AfterViewsAjaxCommand());
      }
    }
  }
}

```

As you can see, I am tapping into the [Kernel Response Event](https://api.drupal.org/api/drupal/vendor%21symfony%21http-kernel%21KernelEvents.php/class/KernelEvents/8.4.x) at normal priority.  Lucky for us, Views has a [special Response class](https://api.drupal.org/api/drupal/core%21modules%21views%21src%21Ajax%21ViewAjaxResponse.php/class/ViewAjaxResponse/8.2.x) that extends [Drupal's Ajax Response](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Ajax%21AjaxResponse.php/class/AjaxResponse/8.2.x) class.  That Ajax Response class in turn then extends [Symfony's base Response class](https://symfony.com/doc/current/components/http_foundation.html).  So what all that means is that we have a special response type that we can tap into while using AJAX within Views.  

In the Views Response class, they add a couple methods so that you can get or set the view.  What this does is allows us to grab the current view object and then slap our special sauce onto it.  So from here, I am checking for my view, then adding our [Ajax Command](https://www.drupal.org/docs/8/api/ajax-api/core-ajax-callback-commands) that will do our magic.  When we use the addCommand method on the AJAX Response, it adds the command to the end of the command chain.  This solves our issue of using something after Drupal Views AJAX command fires.

Before I dive into the command, always remember to define your service as well in the file ```your_module.services.yml```:

```yaml
services:
  YOUR_MODULE.view_ajax_subscriber:
    class: Drupal\YOUR_MODULE\EventSubscriber\ViewsAjaxResponseSubscriber
    tags:
      - { name: event_subscriber }
```

## Defining the AJAX Command

So the next part was defining the AJAX command that would contain the command I would use in my own Drupal AJAX prototype command.  Also, I needed to figure out a way to pass the clicked item into the command since I was not using this in a typical fashion like in a form submit handler.  I solved that by setting a cookie whenever an item was clicked on the page.  I will get into that in a little bit. 

For now, here is the command interface I ended up with:

```php
namespace Drupal\YOUR_MODULE\Ajax;

use Drupal\Core\Ajax\CommandInterface;

/**
 * Adds in the custom after Ajax Command.
 */
class AfterViewsAjaxCommand implements CommandInterface {

  /**
   * {@inheritdoc}
   */
  public function render() {
    return [
      'command' => 'afterViewsAjaxCall',
      'clicked' => $_COOKIE["STYXKEY_Checkbox_Clicked"] ?? NULL,
    ];
  }
}
```

If you have used [AJAX commands in Drupal 7](https://api.drupal.org/api/drupal/includes%21ajax.inc/group/ajax/7.x), this isn't all the dissimilar.  It is just a different design system with the same methodology as before.  The command key is what we will use in our AJAX prototype.  The clicked key is what I mentioned before, this will be in the response and will help us with our task.  The clicked key is extra and you can technically call it whatever you want.  You can add as many different parameters as key value pairs as well.  For what I have though, it will show up in the JS part as ```response.clicked```.  

So that is it for the Command Interface.  The next part is setting up the JS for this example.  

## Setting up the Prototype

### The Library

The first part is to add our library to the module and into the view.  This is all setup for this use case, but yours will be very similar.  We define our ```your_module.libraries.yml`` to look like this:

```yaml
views_ajax_tweaks:
  js:
    js/views-ajax-tweaks.js: {}
  dependencies:
    - core/jquery
    - core/drupal
    - core/drupal.ajax
    - core/jquery.once
    - core/jquery.cookie
```

When setting up a Drupal AJAX prototype, you need to use the drupal.ajax library, otherwise it won't work.  I found that out the hard way when my stuff wouldn't load right.  So now that we have our library setup, we need to attach it to the view.  We can do this via the ```hook_pre_render``` like this:

```php
/**
 * Implements hook_views_pre_render().
 */
function YOUR_MODULE_views_pre_render(ViewExecutable $view) {
  if (isset($view) && ($view->storage->id() === 'YOUR_VIEW')) {
    // Throw in our js that helps with the focus of the autosubmit.
    $view->element['#attached']['library'][] = 'YOUR_MODULE/views_ajax_tweaks';
  }
}
```

Pretty straight forward stuffs.  As a note, always remember to try and attach JS, CSS, and libraries the proper way in Drupal 8.  Just use Google and you will easily find the right way for your use case.

### The JS file

As I mentioned previously, we need to do 2 things with our JS file:

1. Set a Cookie when our checkbox / image is checked.
2. Setup the AJAX prototype to fire and do its magic after each image / checkbox click.

With all that said, here is the final step for this use case:

```javascript
/**
 * @file
 * After Ajax Call.
 *
 */
(function ($, Drupal) {

  /**
   * Sets the cookie to use for identifying the element that is clicked.
   */
  Drupal.behaviors.checkboxesSync = {
    attach: function (context, settings) {
      // Uses a cookie to pass which checkbox was hit.
      // We then use that in the Ajax Response Subscriber.
      $('#regular-checkboxes input, #image-checkboxes input').once().on('click touchstart', function() {
        var id = $(this).attr("data-drupal-selector");
        $.cookie('STYXKEY_Checkbox_Clicked', id);
      });
    }
  };

  /**
   * Proper input mirroring after AJAX is finished.
   */
  Drupal.AjaxCommands.prototype.afterViewsAjaxCall = function (ajax, response) {
    // Our Default items.
    var equipment = "edit-field-event-or-equipment-rental-target-id-2";
    var event = "edit-field-event-or-equipment-rental-target-id-1";
    var equipment_image = "edit-field-event-or-equipment-rental-target-id-1-2";
    var event_image = "edit-field-event-or-equipment-rental-target-id-1-1";

    var $mirror = null;
    switch (response.clicked) {
      case equipment:
        $mirror = $('input[data-drupal-selector="' + equipment_image + '"]');
        break;
      case event:
        $mirror = $('input[data-drupal-selector="' + event_image + '"]');
        break;
      case equipment_image:
        $mirror = $('input[data-drupal-selector="' + equipment + '"]');
        break;
      case event_image:
        $mirror = $('input[data-drupal-selector="' + event + '"]');
        break;
    }

    if ($mirror !== null) {
      if ($mirror.is(':checked')) {
        $mirror.prop("checked", false);
      }
      else {
        $mirror.prop("checked", true);
      }
    }

  };
})(jQuery, Drupal);
```

The first part of the JS file is your typical Drupal behavior setup.  I decided to use drupal-selector data attribute because the element's id changed on every AJAX submit.  This way we have a static id we can check against.  I am then just setting the cookie to that attribute so I can than use it in the AJAX Command Interface which then sends it to my AJAX prototype.

In my AJAX prototype, I am using the defined command afterViewsAjaxCall that I set in the Command Interface.  This allows us to do whatever we need to the DOM post Views AJAX.  As you can see from the code, I am setting my checkbox and image data selectors.  I am then checking the corresponding element based on which element was clicked.  Not too bad when you look at it all.  

## Conclusion

The AJAX system in Drupal has always been a powerful tool set to know.  You can use this same logic to do cool things with forms as well.  Always remember to check if your module extends the AJAX response system if you intend on writing your own commands.  If you have an interesting AJAX based use case that needs help, please fill out the form below and we can talk more.
