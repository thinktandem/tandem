---
description: This is a non-exhaustive list of things to test Laravel. Tandem uses testing to save QA time and maintain high quality code with a minimum of regressions ruining our days.
---
Automated Testing in Laravel
============================

Compared to Drupal and Wordpress, writing automated tests for Laravel applications is almost like a vacation. Laravel is setup with both unit and application testing helpers out of the box, and with each major release of Laravel, the tooling only gets better.

For an overview of what Laravel provides for testing, see the [Laravel testing documentation](https://laravel.com/docs/testing). Select the appropriate minor version for your app's current state.

Generators
----------
 
Laravel ships with PHPUnit configured to run tests out of the box, and even includes `artisan` commands to generate them:

```bash
lando artisan make:test MyClassTest
```

With this simple magic command, a new test class that extends Laravel's base testing class is created in the appropriate `<root>/tests/` folder, pre-configured with the appropriate autoloading and access to all of Laravel's testing helpers.

Application / Feature Testing
-----------------------------
 
Laravel has included Application testing helpers since version 5.1. All Tandem applications, client or otherwise are using a version of Laravel newer than this, so we have access to these helpers to write application tests. The features available vary by framework minor version, but there are sort of 'two eras' to be aware of, pre-dusk (5.1-5.4) and post-dusk (5.5+). The main difference between the pre and post dusk era, is that Dusk is configured to handle Javascript testing out of the box.

These tests run via PHPUnit and allow for testing HTTP interactions as well as asserting that records are created in the database, etc. Any mission critical features of an application should have a application/feature test.

Tandem specific flavorings
--------------------------

In addition to what Laravel provides out of the box, here are some handy extra credit ideas:

### PHP-VCR

When testing applications that make HTTP requests to external APIs, we want to be able to mock those calls so that we can force test cases down specific routes. This makes testing and developing our applications less dependent on client in-house services, the internet constantly working, and it also allows us to not constantly be writing/reading data to APIs, pushing the numbers higher on rate limited endpoints. Bonus: it can make some tests a lot faster too!

Since Laravel uses PHPUnit to run it's tests, you can use the [phpunit vcr test listener](https://github.com/php-vcr/phpunit-testlistener-vcr) to control cassettes for tests that need them:

```php
<?php
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class SubscriberClientTest extends TestCase
{
    /**
     * @var  GuzzleHttp\Client
     */
    private $client;
    
    public function setUp()
    {
        $this->client = new Client();
        parent::setUp();
    }
    /**
     * @vcr foo_client_bad_id
     */
    public function testGetReturnsObjectWithBadInput()
    {
        $this->assertInstanceOf(
          stdClass::class,
          $this->client->getInfo('fakeID')
        );
        Log::shouldReceive('error');
        Session::shouldReceive('flash');
    }
}
```

This test will automatically create the fixture `foo_client_bad_id` in the `tests/fixtures` directory if it does not already exist. Future tests will play-back that request/response pair until the file is removed. If you need to get a fresh response, delete the fixture.

### Lando and ChromeDriver

When you need to get deep and dirty with Javascript tests, Laravel's Dusk (or alternatives such as Behat or Codeception) can make use of ChromeDriver to run the headless server for testing. This is fairly trivial to implement using Lando:

```yaml
services:
  chromedriver:
    type: compose
    services:
      image: robcherry/docker-chromedriver:latest
      expose:
        - "4444"
      environment:
        CHROMEDRIVER_WHITELISTED_IPS: ""
        CHROMEDRIVER_URL_BASE: "/wd/hub"
      security_opt:
        - seccomp:unconfined
      command: ["/usr/local/bin/supervisord", "-c", "/etc/supervisord.conf"]
```

ChromeDriver will then live at `http://chromedriver:4444/wd/hub` and it can access the appserver at `https://nginx` as needed. Be sure to configure Dusk or your other testing framework to use these host:port combinations for this to work.

The super cool thing about doing this with Lando, every member on the team can run these tests this way, and that includes the CI server.


#### Cool bro, I know you like writing tests, but what if my project is already rocking and doesn't have any? What if I don't have time???

The reality of life is that no project is 'perfect', and [aiming for 100% test coverage is a trap!](https://youtu.be/iDP_tfmKVE4)



Sometimes, you may have already written a lot of code and haven't written any tests. While it's great to use any extra time we have on a project to catch up on that and cover as many features as you can, that isn't always possible, so what should you do?

Start today!

Since Laravel ships with all this testing magic, there is very little holding you back from getting started with testing. If the application is using decent OO design standards, and making good use of Laravel's IOC container, dependency injection, facades, and the like, you can jump right in and write tests for the bug you are fixing, or the feature you've been asked to write. Don't let yesterday's mistakes keep you from putting one foot in front of the other today.

If you think you don't have time to write tests, you may sort of be right, but there is a catch. Testing itself is a skill like any other in programming, and you are typically HORRIBLE at it at first. Getting into the mindset of writing good tests takes time, and if you haven't done it before, it can take a long time to be useful. This means that your first sets of tests may take a long time to write, and not be particularly useful for the specific project. If you are here, reach out to your colleagues with more experience for help!

We're overall betting on the long game here. Learning to write tests is an investment that should bring the quality of our organization's code up year over year. You may have some short term setbacks in terms of productivity on today's project, but we're running a marathon, not a single sprint. Investment in testing skills pays dividends for Tandem long term. Keep in touch with your project manager on your concerns with testing, but don't let your current level of efficiency stop you from making progress. Testing is faster and less expensive the more you do it. You may not be able to invest the entire farm today, but fight consisently for improvement, no matter how small.  

The goal here is to leave the code better than you found it, if testing isn't in a good spot on the project, try to make small improvements on each issue as you can, and discuss with your project manager about any potential adjustments that will need to be made to compensate for the investment. Sometimes the ask is going to be too big and we'll have to punt, but always have the conversation before assuming you can't make progress.