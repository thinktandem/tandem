---
layout: Post
title: 'Handling Dynamic Routes in Drupal 8'
tags:
    - development
    - drupal
author: 'John Ouellet'
private: false
mainImage: images/articles/dynamic-routes.jpg
img-src: images/articles/dynamic-routes.jpg
byline: 'Handling a dynamic route in Drupal 8 is much different than it was in previous versions of Drupal.  A little more foot work is needed since the routing layer is now Symphony based.'
date: '2017-12-03'
meta:
    - { name: description, content: 'Handling a dynamic route in Drupal 8 is much different than it was in previous versions of Drupal.  A little more foot work is needed since the routing layer is now Symphony based.' }
    - { name: keywords, content: 'development,drupal' }
---

The issue I faced with my module
--------------------------------

I have been on a journey to get all my [Drupal Contrib Modules](https://www.drupal.org/u/labboy0276) ported over to Drupal 8.  Usually the code structure is fairly close to its predecessor, but with just a little added flavor.  However, when I was converting my [Blackbaud SKY API](https://www.drupal.org/project/blackbaud_sky_api) module I ran into a coding dilemma.  My module has a path that is defined by a system variable and is not static.  It is not taking a wildcard argument from the path either.  How do you do this when your routing layer is driven by YAML and not PHP?  A little Google fu and some Drupal API magic helped me get there. Now I will show you.

The Routing Layer has changed
-----------------------------

For as long as I can remember, all paths / routing was handled through ```hook_menu()```.  However in Drupal 8, this is done though [Symfony's Routing Layer](https://symfony.com/doc/current/routing.html).  You can also [checkout this article on Drupal.org](https://www.drupal.org/docs/8/api/routing-system/routing-system-overview) that gives a brief overview.

In the Drupal 7 version of my Blackbaud SKY API module, as mentioned previously, there is a callback path that is derived from a variable.  This module's only purpose is to establish a connection via OAuth to the Blackbaud SKY API.  When utilizing OAuth, having a callback URI is a fairly customary practice.  If you ever used the [Twitter](https://www.drupal.org/project/twitter) module, you know you needed to setup a callback uri in your application.  The Blackbaud SKY API application is no different.  I made this path configurable so the end user could change it in their respective application.

The code for this in Drupal 7 was fairly straight forward:

```php
/**
 * Implements hook_menu().
 */
function blackbaud_sky_api_menu() {
  $items = array();

  // Oauth Redirect URI
  $items[variable_get('blackbaud_sky_api_redirect_uri', BLACKBAUD_SKY_API_REDIRECT_URI)] = array(
    'title' => 'Blackbaud Redirect URI',
    'access callback' => TRUE,
    'page callback' => 'blackbaud_sky_api_redirect_uri_callback',
    'type' => MENU_CALLBACK,
    'file' => 'includes/blackbaud_sky_api.admin.inc',
  );

  return $items;
}
```

As you can see, this route is defined by either the variable blackbaud_sky_api_redirect_uri or the constant BLACKBAUD_SKY_API_REDIRECT_URI as a default.  It then went to the page callback blackbaud_sky_api_redirect_uri_callback that did whatever magic I needed.  I also threw the logic in another file because clean code = happy code.

Here is the callback function in the Drupal 7 module:

```php
/**
 * Blackbaud Oauth Redirect URI Callback.
 */
function blackbaud_sky_api_redirect_uri_callback() {
  // Instantiate the BlackBaud request and Authorize.
  $bb = new BlackbaudOauth();
  if (isset($_GET['code'])) {
    $bb->getAuthCode('init', $_GET['code']);
  }
}
```

YAML, Controllers and Routes, OH MY!
------------------------------------

One of the main driving force behind the framework change in Drupal 8 is to create a structure that is decoupled and interchangeable.  Drupalize.me's [overview of decoupling](https://drupalize.me/tutorial/decoupling-explained?p=2360) is a good starting point to understand what is going on now.  By making changes like this to the framework we are making Drupal be less "Drupaly".  We can now easily add in additional classes, interfaces, or whatever to our routes now if we needed to.

To generate a dynamic route, we start off with the route_callbacks method.  This was [introduced right](https://www.drupal.org/node/2177901) before the stable release of Drupal 8.  Previously you had to do this with an event subscriber and RouteSubscriberBase class.  You may still see an article or three floating around with this info still.  I would just ignore them as it is no longer needed.

To begin, you just throw the method in your routing.yml with the callback to your class and method:

```yaml
route_callbacks:
  - '\Drupal\blackbaud_sky_api\Routing\BlackbaudRoutes::routes'
```

Then you just need to make a Routing class and slap in your logic.  Basically you are creating the YAML version of the typical route in PHP in the routes method.  Here is the _non-Dependency Injection_ way of converting the ```hook_menu``` portion to Drupal 8:

```php
namespace Drupal\blackbaud_sky_api\Routing;

use Symfony\Component\Routing\Route;

/**
 * Defines a dynamic path based off of the redirect uri variable.
 */
class BlackbaudRoutes {

  /**
   * Returns an array of route objects.
   *
   * @return \Symfony\Component\Routing\Route[]
   *   An array of route objects.
   */
  public function routes() {
    $routes = [];

    // Grab the Config form option or the constant for the path.
    $path = \Drupal::config('blackbaud_sky_api.settings')->get('blackbaud_sky_api_redirect_uri') ?: BLACKBAUD_SKY_API_REDIRECT_URI;

    $routes['blackbaud_sky_api.oauth_redirect_uri'] = new Route(
      '/' . $path,
      [
        '_controller' => '\Drupal\blackbaud_sky_api\Controller\DefaultController::redirectUriCallback',
      ],
      [
        '_access' => 'TRUE',
      ]
    );
    return $routes;
  }

}
```

As you can see this is basically adding another layer between the routing.yml and the Controller.  Here is what our Controller looks like this:

```php
namespace Drupal\blackbaud_sky_api\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\blackbaud_sky_api\BlackbaudOauth;

/**
 * Default controller for the blackbaud_sky_api module.
 */
class DefaultController extends ControllerBase {

  public function redirectUriCallback() {
    // Instantiate the BlackBaud request and Authorize.
    $bb = new BlackbaudOauth();
    if (isset($_GET['code'])) {
      $bb->getAuthCode('init', $_GET['code']);
    }
  }

}
```

Dependency Injection + You = Electric Boogaloo
----------------------------------------------

One of the major design patterns in Drupal 8 is dependency injection.  Dependency injection is a design pattern that eliminates hard coding dependencies.  This makes your code more modular and maintainable.  When I was first converting this module to Drupal 8, I did it the fastest and easiest way.  Which is totally fine, I got it working.  I then knew I needed to go back and remove as many ``` \Drupal::``` static type calls as possible.   Why is this important and why should I do this?

Imagine if the core developers changed the static call from ```\Drupal::config``` to ``` \Drupal::config-a-licious```.  You would have to change every single function in your code. While that is fairly easy to do, it is not desirable.  The ``` \Drupal::config``` is a wrapper for the config factory service.  We should be injecting this into our constructor instead.  I could go over all of the Dependency Injection scenarios, but that is not the point of this article.  I recommend reading this straight forward and easy to follow [article on Dependency Injection](https://code.tutsplus.com/tutorials/drupal-8-properly-injecting-dependencies-using-di--cms-26314).

Down to the nitty gritty, here is the Dependency Injected version of my previous Routing class:

```php
namespace Drupal\blackbaud_sky_api\Routing;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Route;

/**
 * Defines a dynamic path based off of the redirect uri variable.
 */
class BlackbaudRoutes implements ContainerInjectionInterface {

  /**
   * The Config.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $config;

  /**
   * Class constructor.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory interface service.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->config = $config_factory->get('blackbaud_sky_api.settings');
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * Returns an array of route objects.
   *
   * @return \Symfony\Component\Routing\Route[]
   *   An array of route objects.
   */
  public function routes() {
    $routes = [];
    // Grab the Config form option or the constant for the path.
    $path = $this->config->get('blackbaud_sky_api_redirect_uri') ?: BLACKBAUD_SKY_API_REDIRECT_URI;

    $routes['blackbaud_sky_api.oauth_redirect_uri'] = new Route(
      '/' . $path,
      [
        '_controller' => '\Drupal\blackbaud_sky_api\Controller\DefaultController::redirectUriCallback',
      ],
      [
        '_access' => 'TRUE',
      ]
    );
    return $routes;
  }

}
```

By extending the ContainerInjectionInterface class, I am giving this object all the magic it needs to inject all the dependencies.  The concept takes a little bit to really grasp, but once you get it, you will be happy.


Conclusion
----------

Doing things the Drupal 8 way can sometimes be a little more arduous.  However, there are several reasons why this is happening.  In the not so distant future I see Drupal as a powerful, decoupled backend.  We will be able to plug in any front-end device or front-end language easily.  By injecting our dynamic route properly, we can make that reality happen.
