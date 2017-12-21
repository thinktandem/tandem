---
description: These are all the GitHub PR based QA mechanism that we use.
---
Quality Control
===============

These are all the GitHub PR based QA mechanism that we use

GitHub Based Manual Code Review
-------------------------------

After working on a feature linked to an issue.

* Push up your feature branch and file a Pull Request (PR)
* Assign the PR to your deploy lead
* The deploy lead will look at the PR either:
  * Approve and merge it to `test` for client QA from there the deploy will handle getting the feature to production
  * Find some issues or improvements that can be made; then
    * These findings can be discussed in daily project standup to determine next action steps
    * Findings requests for remediation can be made in text against the PR and developer takes action on them

QA Environments
---------------

* Each feature branch that is filed as a PR spins up a QA environment on Platform.sh
* Once you file the PR
  * Update the GitHub issue
    * Paste in the PR URL
    * Paste in the Platform.sh QA env URL
    * Describe what the feature does
      * If special steps are required for testing/review indicate them
    * Assign to a team deploy lead
    * Move issue card on ZenHub to the Needs Review / Ready for QA column geoff

Automated Travis/Circle Testing
-------------------------------

* Linting/Code Standards
  * For Drupal projects we follow the [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards/coding-standards)
  * For Laravel and PHP we follow [PSR2 Standard](http://www.php-fig.org/psr/psr-2/)
  * For NodeJS we follow [Node.js Style Guide](https://github.com/felixge/node-style-guide)
* Unit Testing
* Functional testing
* Tests can and should be run locally and clean up any outstanding issues reported
  * This can usually be done with `lando composer test`
  * In the event that you file a PR and it does not pass tests.  Take the initiative to fix it up and push up the cleaned up code

In-Development QA mechanisms
----------------------------

* Peer review
  * If you are unsure of requirements, best path forward, or you find yourself in a rabbit hole reach out to another developer on the team to get plan and a path forward
* Pair programming
  * If you are working on a new tech stack or new problem you might choose to pair up and work on a problem together
