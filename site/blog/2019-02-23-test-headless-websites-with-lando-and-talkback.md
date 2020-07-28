---
title: 'Test Headless Websites with Lando and Talkback'
tags:
    - development
    - api
    - drupal
    - javascript
author: 'Dustin LeBlanc'
private: false
mainImage: images/articles/headless-testing/headless_horseman.jpg
img-src: images/articles/headless-testing/headless_horseman.jpg
byline: 'Run end to end javascript tests on a decoupled frontend'
date: '2019-02-23'
---

Building on Geoff's posts about [setting up Lando, Contenta, and Nuxt](/blog/2019/01/25/lando-contenta-cms-nuxt-pt-1/), and subsequently [fetching resources](/blog/2019/02/01/lando-contenta-cms-nuxt-pt-2/), today we're going to take a look at ensuring this process works and continues to work for the rest of the development project by writing some automated tests for the front end. **Warning:** I'm assuming prior knowledge of Lando, Nuxt, and general "decoupled" architecture. If those words sound like something a Star Trek writer made up, read the aforementioned posts!

Testing decoupled sites is a novel problem space, especially inside a CI environment. Standing up a full API backend on your CI server would be quite complex, especially when the backend of the site lives in a separate repository.

## The Strategy
With a decoupled site, the front end is mostly going to be responsible for consuming API endpoints and transforming that data into the markup that matches your desired design. The typical pattern of acceptance testing with a tool like [Behat](http://behat.org) applies here. We want to run a headless browser that is pretending to be a user running the site in a browser. We'll use [CodeceptJS](https://codecept.io/) to handle the actual testing, and a utility very similar to [VCR](https://github.com/vcr/vcr) for mocking the API responses for calls to our API backend called [Talkback](https://github.com/ijpiantanida/talkback/).

Talkback boots up a proxy server that sits between our API backend and our frontend, intercepting all requests and storing them for later playback. When the site is bootstrapped on the CI server, Talkback can playback the responses that we recorded in development.

## The Setup
If you've been following along with the previous posts, you should have something like the following in your `.lando.yml`
```yaml
name: mynuxt
proxy:
  appserver:
    - mynuxt.lndo.site
services:
  appserver:
    type: node:10
    command: "yarn dev --hostname 0.0.0.0 --port 80"
    install_dependencies_as_me:
      - yarn install
tooling:
  yarn:
    service: appserver
  npm:
    service: appserver
  node:
    service: appserver
  nuxt:
    cmd: /app/node_modules/.bin/nuxt
    service: appserver
```
We need to add an additional couple of services that will run our tests and Talkback proxy:
```yaml
name: mynuxt
proxy:
  appserver:
    - mynuxt.lndo.site
  talkback:
    - mytalkback.lndo.site
services:
  appserver:
    type: node:10
    command: "yarn dev --hostname 0.0.0.0 --port 80"
    install_dependencies_as_me:
      - yarn install
  talkback:
    type: node:10
    command: node /app/proxy.js
    install_dependencies_as_me:
      - yarn install
  codeception:
    type: compose
    services:
      image: codeception/codeceptjs
      command: /codecept/docker/entrypoint
tooling:
  yarn:
    service: appserver
  npm:
    service: appserver
  node:
    service: appserver
  nuxt:
    cmd: /app/node_modules/.bin/nuxt
    service: appserver
  # Run tests
  test:
    cmd: yarn test
    service: codeception
  # Run Codeception directly
  codecept:
    cmd: /app/node_modules/.bin/codeceptjs
    service: appserver
```
We've also added some tooling entries so we can run the tests easily from our local machine with `lando test` or `lando codecept`.
We now need to add our new JS dependencies:
```bash
lando yarn add talkback codeceptjs puppeteer --dev
```
and add the following script to our `package.json` scripts section:
```json
"test": "codeceptjs run"
```
Setup CodeceptJS by running the initializer:
```bash
lando codecept init
# select the puppeteer helpers
```
Generate your first test:
```bash
lando codecept gt
```
Edit the generated test file to something like the following if you followed Geoff's previous posts:
```js
Feature('Posts Page');

Scenario('Should List posts', (I) => {
  I.amOnPage('/posts');
  I.see('{ my first post }');
});
```
This is a really basic and brittle test, but it will suffice for this exercise. In reality, you'll want to either be seeding data that you can test against or asserting the presence of things on the page that are content agnostic.
The last thing we should have to do to get this working locally is to ensure that codeception is properly configured to hit our site within Lando. Your `./codecept.json` should look something like this:
```json
{
  "tests": "./test/*_test.js",
  "timeout": 10000,
  "output": "./test/output",
  "helpers": {
    "Puppeteer": {
      "url": "http://appserver",
      "chrome": {
        "args": ["--no-sandbox"]
      }
    }
  },
  "include": {
    "I": "./test/steps_file.js"
  },
  "bootstrap": false,
  "mocha": {},
  "name": "mynuxt"
}
```

This is pretty vanilla from what the init command will generate, but notice that we've told Codecept to look for the site based on Docker's internal hostname for our appserver container. This keeps things contained inside Lando's network to rule out funky network issues messing with test execution.

You should now be able to run your test with `lando test` and it should come back green if your front end and backend are up and running. The app will probably take a bit to run this as it has to pull the new codeception container.

## Mocking the Backend
Things should be going swimmingly for local development now when the backend is up and running, but our goal is to make this CI testable, so let's mock the backend with Talkback. We've required the project and we've setup a container to run it, but we need to write the actual server code to run the proxy:

```js
// ./proxy.js

const talkback = require("talkback");

const opts = {
  host: process.env.DRUPAL_URL,
  port: 80,
  path: "./test/tapes",
  record: process.env.RECORD_REQUESTS,
  ignoreBody: true,
  ignoreHeaders: [
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-port",
    "x-forwarded-proto",
    "x-forwarded-server",
    "x-real-ip",
    "set-cookie",
    "date",
    "cookie",
    "if-none-match",
    "user-agent",
    "upgrade-insecure-requests",
    "cache-control",
    "referer",
    "connection"
  ],
  fallbackMode: "proxy"
};

const server = talkback(opts);

server.start(() => console.log("Talkback started!"));

```
You should be able to copy/paste this directly. What we're doing here is requiring the Talkback package, setting some options, creating a NodeJS HTTP server using Tsalkback, and then booting that server up to listen on port 80.

We're doing a few things to note in the options:

1. We're setting some ignore headers and ignoring the body. Your mileage may vary on what headers to ignore, but the set I picked here seemed to give me reliable results.
2. We've set some environment variables to allow some control of the proxy without having to modify the proxy itself.

Make sure the "tapes" directory is set up by running `mkdir -p test/tapes`. Once that is done, we need to alter our `.env` file and rebuild.
```ini
APP_ENV=lando
API_URL=http://mytalkback.lndo.site
DRUPAL_URL=http://myapi.lndo.site
RECORD_REQUESTS=true
```

Notice that we're using HTTP URLs for everything, and that we're running through the proxy still. We're only doing this because Talkback doesn't seem to be able to handle HTTPS requests very well and Nuxt does some client-side requests which don't have access to the docker network, and therefore have to route through the proxy.

After we've got this all set up, run `lando rebuild -y` to rebuild the project. This should reload the changed environment variables and boot up our two extra services. Once everything is back up and running, try running `lando test` again. If everything worked out well, you should now be able to see a new JSON file in `tests/tapes`. Go ahead and read it. The file should be quite parsable and will contain the request made to the API, and it's response.

We should now have a perfectly reproducible request. For giggles, try turning off the API project. you should be able to `lando stop` the API and keep loading your site frontend.

The proxy now acts as a stand-in for our API backend, making it possible to develop the frontend application without the backend running, at least until you need to consume a new API endpoint that has not yet been captured by Talkback.

This whole process is made significantly easier with Lando. Adding the second container to run the proxy, and a third container dedicated to running our javascript tests was only a few lines of yaml. Since Lando can also run on our CI server, we can use the same setup to ensure a working site on every pull request.

How do you handle testing for decoupled projects? Get in touch with me on Twitter @DustinLeblanc to let me know what you're doing and make sure to follow @devwithlando and @ThinkTandem for more posts like this one about decoupled Drupal, VueJS, testing, DevOps and more!
