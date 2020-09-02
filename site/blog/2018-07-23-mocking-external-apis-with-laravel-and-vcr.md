---
title: "Mocking External APIs with Laravel and VCR"
tags:
    - development
    - laravel
    - dustinl
author: "Dustin LeBlanc"
date: "2018-07-23"
summary: "Winning unit tests with PHP VCR and Laravel"
id: dustinl
pic: "/images/people/dustin-sm.jpg"
location: "New York"
---

Development of multi-service applications is a complex task. Outside of the potential technical difficulties and inherent complexity of wiring up multiple isolated and discrete applications to communicate in production and staging, you also have to replicate that setup in your development environment (we use [Lando](https://docs.devwithlando.io) for that!) and find a way to handle these dependencies in your testing environment as well.

## You Just Can't Depend on Anyone

When dealing with an HTTP accessible service that is outside your locus of control, it is unwise to depend on that service when running automated tests for a variety of reasons.

### The API may have rate-limiting

Depending on the API, you could run into some rate-limiting. This problem gets worse the larger your development team and the number of QA and/or branch environments that are created by your process. Ideally, every commit pushed from a developer is going to test that the application works, including the parts that touch the API. That can add up to a lot of requests, pushing you ever closer to the limits of what an API will allow.

### The API may be unstable

Just like our own code, the services we rely on were made by humans, and sometimes things break. While we've generally agreed to trust our dependencies, either because a client requires it, or because it may be the only way to do what we need to do, we don't want to constantly be at the mercy of the world continuing to work as intended. Being able to understand what external services offer us and trust that it will be there on game day is liberating, and it helps us to focus on our job, without worrying about everyone else doing theirs.

### The API may be only accessible via specific circumstances

The APIs we depend on may only be accessible from certain IP addresses, your client may have whitelisted your office IP addresses for development, and the production server, but what about Travis or CircleCI? Most cloud based services can't even guarantee an IP address.

### You may not want to alter the API data (side-effects)

Frequently you may be writing data to the external services that you rely on. Constantly modifying the state of these external services during test runs is a sure way to create a headache for your colleagues as the data they are expecting to be present in the API gets mutated because you need to rest some write requests.

## Winning API Dependency with Sweet Sweet Mocking

A common practice when unit testing any class in an application is to mock any class dependencies so that we don't have to worry about their implementation or side effects of running our code in a testing environment. Fortunately, this concept is also available to us at the HTTP/Service level via an awesome tool called [PHP-VCR](https://github.com/php-vcr/php-vcr).

Using VCR, we're able to record interactions with external HTTP services and store the data in a fixture, and then play that transaction back on future test runs.

For extra bonus amazingness, we're able to make use of VCR's integration with PHPUnit to make the entire ordeal quite easy to wire up to boot. Here's the dirty details on getting it all wired up:

1. Pull in the PHPUnit VCR test listener: `composer require --dev php-vcr/phpunit-testlistener-vcr
`
2. Create a fixture directory if you don't already have one: `mkdir -p tests/fixtures`

3. Tag your tests with a cassette name:
```php
/**
 * @vcr some_unique_name_that_makes_sense
 */
public function testSomethingThatUsesTheWhizBangService()
{
    $thing = new Thing();
    $data = $thing->getDataFromApi();
    return $this->assertEqual(json_decode($data), $someDataToMatch);
}
```

The first time you run this test, it is going to act like normal and make an HTTP request to your `WhizBang` service. Once that request is complete, VCR is going to quietly tuck away the request and response into a file in `ROOT/tests/fixtures/some_unique_name_that_makes_sense` to use the next time you run the suite. You'll want to review that file to make sure it doesn't store any sensitive data from the API and potentially edit the contents in a manner that would still create a valid test result. Commit the fixture along with your test and the new dependency to your repository.

We now have a solid pattern for mocking external services so they don't cause a headache during development. One potential downside to this procedure is that it isn't often a good fit for complete end to end tests as your test runner will be running in a separate process from the web server that is serving the project, making it hard for VCR to hook into the test process and mock the HTTP requests.

Go forth and test!
