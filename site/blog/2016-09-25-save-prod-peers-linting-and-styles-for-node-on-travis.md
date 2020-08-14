---
title: 'Save Prod & Peers: Linting and Styles for Node on Travis'
tags:
    - deployment
    - development
    - localdev
    - support
    - testing
    - pirog
author: 'Mike Pirog'
date: '2016-09-25'
summary: 'Don''t be the person that breaks production because of a typo or searches endlessly for that missing closing bracket. Level up with Travis, grunt and node.'
id: pirog
pic: 'https://www.gravatar.com/avatar/dc1322b3ddd0ef682862d7f281c821bb'
location: 'New Hampshire'
---

A Variation on a Theme
----------------------

You've been up all night pouring your heart and soul into the **NEXT BIG FEATURE** of that **SUPER AWESOME PROJECT EVERYONE USES**. Your mental capacity diminishes by the second but you must stay the course. Rome might not have been built in a day but this [npm](http://npm.org) module sure as hell will.

You're on the final stretch. The code is done. You commit to the repo. You lay on your bed and you are feeling pretty **QUOD ERAT DEMONSTRANDUM.** *"Seriously, I wrote that code like some sort of 24th century android!"*, you think as you drift to sleep.

<div class="row">
  <div class="col-md-4">
    ![data-winning](images/articles/linter-is-coming/data.gif "I AM ALL THAT IS ANDROID")
  </div>
  <div class="col-md-4">
    ![data-winning](images/articles/linter-is-coming/data.gif "I AM ALL THAT IS ANDROID")
  </div>
  <div class="col-md-4">
    ![data-winning](images/articles/linter-is-coming/data.gif "I AM ALL THAT IS ANDROID")
  </div>
</div>

> YES! TOTAL CODE VICTORY!
  <small>Commander Data as YOU</small>

The sad news is that you didn't write that code like an android and **SPOILER ALERT** you missed that pesky but kind of super critical closing bracket. Now the thousands of people relying on your project are getting fatal errors. They are not impressed. What should have been your finest hour, your finest expression of code art to the world is instead a shameful display of what the code elders call *n00batronix*. Might as well have climbed to the top of a big ole mountain and declared *"I HAVE NO IDEA WHAT I AM DOING!!!"* Certainly looks like you don't.

**Done something like this before?** Yeah, Me too.

Luckily, there is an alternative to pretending you code like an android. It's called using the robots. By bending [Travis](http://travis-ci.org), [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com) to your will you can make your code safe to distribute once again.

Of course this is not the only reason to set up basic automatic code quality procedures. Preventing the total nuclear meltdown of your build is great but do you or your team also desire any of the following?

  1. Finding dev-killing missing parentheses in seconds, not **hours**
  2. Getting rave reviews for how pro and clean your code looks
  3. Quenching Sally's rage because your **TABS** fetish wipes out her **SPACES**  on every commit
  4. Commiting diffs that are clean and unspoiled of non-essential dev drivel
  5. Developing good coding habits based on well defined standards.

Interested in going from CodeZero to CodeHero in less than 30 minutes? Yes, you say? Then please read on.

<div class="text-center">
  ![anakin-wants-to-know](images/articles/linter-is-coming/anakin.gif "NOT FOR A JEDI!")
</div>

Yes! Now that we are in 2016 it's relatively easy and straightforward to set up basic automated testing both to cover code-based nuclear meltdowns and to ensure your entire team is writing high quality code. If you are familiar with the basics of [Github](http://github.com), [Travis](http://travis-ci.org), [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com) you can probably skip ahead to the next section. If not here are the essentials you need to get started:

  1. An open source NodeJS project on GitHub [like this](https://github.com/thinktandem/metalsmith-swig-helpers)
  2. A linked project on Travis CI [like this](https://travis-ci.org/thinktandem/metalsmith-swig-helpers)

Generally, you will want to follow the [GitHub flow](https://guides.github.com/introduction/flow/) development pattern. However, there is one major difference. When you commit code to your feature branch/pull request Travis will make sure your code is both neccesary and proper. If neither of the two aforementioned conditions are met you will get a visually obvious indication of this.

<div class="text-center">
  ![pull-request-failed](images/articles/linter-is-coming/prfail.png "ALL PULL REQUESTS MUST DIE")
</div>

Travis will report what changes you need to make to your code. Fix those mistakes, push your code again, wait for the build to complete successfully and profit from having great code quality.

See [tips and tricks](#tips-and-trickz) below to learn how to setup GitHub and Travis.

OK! Now that I'm a believer give me an example.
-----------------------------------------------

We want to set up some basic checks on our new [metalsmith-swig-helpers](https://github.com/thinktandem/metalsmith-swig-helpers) project to make sure the project does not have any fatal syntax errors and it conforms with some NodeJS code standards.

**Let's begin!!!**

#### 1. Get the project

```bash
# Clone the codes
git clone git@github.com:thinktandem/metalsmith-swig-helpers.git && \
  cd metalsmith-swig-helpers

# Install the deps
npm install
```

#### 2. Install Grunt and the needed code linting and styling tasks

```bash
# Install the grunt-cli globally if you haven't already
npm install -g grunt-cli

# Install the grunt tasks we need
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-jscs --save-dev

# Get some prettier output for linting
npm install jshint-stylish --save-dev

# This helps us load grunt tasks
npm install matchdep --save-dev
```

**NOTE:** Make sure you are setup to [install node modules globally without sudo](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

#### 3. Create a `Gruntfile.js` in your projects root directory and configure it

If you are unfamiliar with setting up the `Gruntfile` please check out [the documentation](http://gruntjs.com/getting-started#the-gruntfile).

Here is a basic `Gruntfile.js` that does not do anything.

```js
module.exports = function(grunt) {

  // Load all grunt plugins
  require('matchdep').filterAll('grunt-\*').forEach(grunt.loadNpmTasks);

  // Create the Grunt configuration
  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),
  };

  // Initialize the configuration.
  grunt.initConfig(config);

  // Register tasks
  grunt.registerTask('default', []);

};
```

Here is a `Gruntfile.js` task that checks your code for syntax errors. Please refer to the documentation on the [`grunt-contrib-jshint`](https://github.com/gruntjs/grunt-contrib-jshint) plugin. Notice that we are delegating our linting rules to the `.jshintrc` file. You can read more about the rules of this file [here](http://jshint.com/docs/options/).

```yaml
jshint: {
  options: {

    # Use a config file for our linting rules
    jshintrc: '.jshintrc',

    # Use a custom reporter so we get pretty output for lint reports
    reporter: require('jshint-stylish')
  },

  // This uses normal GLOB syntax. In this case scanning all JS files in ./ and lib/
  files: [
    '\*.js',
    'lib/\*.js'
  ]
}
```

Here is a `Gruntfile.js` task that makes sure we are following NodeJS coding standards. Please refer to the documentation on the [`grunt-jscs`](https://github.com/jscs-dev/grunt-jscs) plugin. Notice that we are delegating our linting rules to the `.jscsrc` file. You can read more about the rules of this file [here](http://jscs.info/overview).

```yaml
jscs: {

  # Use a config file for our code standards config
  options: {
    config: '.jscsrc'
  },

  # This uses normal GLOB syntax. In this case scanning all JS files in ./ and lib/
  files: [
    '\*.js',
    'lib/\*.js'
  ]
}
```

Here is a complete `Gruntfile.js` that defines checks for basic syntax errors and adherence to code standards laid out in `jscsrc` (Google standards in this case). We also register a task called `grunt test` that will check these things.

```js
module.exports = function(grunt) {

  // Load all grunt plugins
  require('matchdep').filterAll('grunt-\*').forEach(grunt.loadNpmTasks);

  // Create the Grunt configuration
  var config = {

    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),

    // Lint relevent files based on .jshintrc
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      files: [
        '\*.js',
        'lib/\*.js'
      ]
    },

    // Enforce code standards found in .jscsrc
    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: [
        '\*.js',
        'lib/\*.js'
      ]
    },

  };

  // Initialize the configuration.
  grunt.initConfig(config);

  // Register tasks
  grunt.registerTask('default', []);
  grunt.registerTask('test', ['jshint', 'jscs']);

};
```

Now you should be able to run the linting and standards enforcement locally with `grunt test`.

```bash
grunt test
Running "jshint:files" (jshint) task

✔ No problems

Running "jscs:files" (jscs) task
disallowMultipleVarDecl: Multiple var declaration at lib/index.js :
     5 |'use strict';
     6 |
     7 |var swig = require("swig"),
--------^
     8 |    _str = require("underscore.string"),
     9 |    debug = require("debug")("metalsmith-swig-helpers"),
validateQuoteMarks: Invalid quote mark found at lib/index.js :
     5 |'use strict';
     6 |
     7 |var swig = require("swig"),
---------------------------^
     8 |    _str = require("underscore.string"),
     9 |    debug = require("debug")("metalsmith-swig-helpers"),
validateQuoteMarks: Invalid quote mark found at lib/index.js :

    # And so on and so forth...

    86 |           // randomly choose an element from the array
    87 |           var index = [Math.floor(Math.random() * input.length)];
validateIndentation: Expected indentation of 10 characters at lib/index.js :
    84 |             return input;
    85 |           }
    86 |           // randomly choose an element from the array
--------^
    87 |           var index = [Math.floor(Math.random() * input.length)];
    88 |           return input[index];

>> 50 code style errors found!

Warning: Task "jscs:files" failed. Use --force to continue.

Aborted due to warnings.
```

Obey the suggestions in the run output to achieve code cleanliness.

#### 4. Automate the testing with a `travis.yml` file.

Here is a basic `.travis.yml` file that you can drop in your projects root directory. This will automate the testing of your code. If you are interested in learning more about configuring this file you should check out the [Travis Starter Guide](https://docs.travis-ci.com/user/getting-started/).

```yaml
language: node_js
node_js:
- '4'
sudo: false
script:
  - grunt test
cache:
  directories:
  - node_modules
  - assets/vendor
notifications:
  email: dukat@freebajor.org
```

#### 5. Push your code, fix your errors and profit

```bash
# Commit and push code that fails grunt test
git add .
git commit -m "LINTER IS COMING"
git push origin nuclearLinter
```

Here is a closed pull request that goes from a failed build to happy.
https://github.com/thinktandem/metalsmith-swig-helpers/pull/1

Conclusion
----------

Take 15-30 minutes to set up basic linting and code standards enforcement and save time and money in the long term!

###  Tips, Trickz and References

* If you have a private GitHub repo you will want to set up Travis on their paid-for service [travis-ci.com](http://travis-ci.com)</small>
* [Here](https://github.com/mbonaci/mbo-storm/wiki/Integrate-Travis-CI-with-your-GitHub-repo) are some instructions on settings up Travis in general.
* Most of the above also works using [Gulp](http://gulpjs.com)
* You can check out the code we used for this article over [here](https://github.com/thinktandem/metalsmith-swig-helpers)
