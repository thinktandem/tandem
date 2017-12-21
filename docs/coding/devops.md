---
description: Setting Up a Project - If you are charged with setting up a project we typically want.
---
Setting Up a Project
====================

If you are charged with setting up a project we typically want:

* Git repo
* CI: Usually Travis-CI or CircleCI
* Githooks to deploy to test envs (CD)

You can look at examples of setting this up for:

* Pantheon: <https://github.com/thinktandem/pantheon-workflow-demo>
* Platform: <https://github.com/thinktandem/platform-workflow-demo>

The `.travis.yml` or `circle.yml` files will give you an idea of things that are
needed to provide the automated tests, QC and CD.

Tests
-----

For PHP/Composer based projects we usually configure the `composer.json` file
with a `scripts` key to run the test suites.

*   The command `lando composer test` runs:
*   php linting as configured in `.phplint.yml`
*   php code style checks against the PSR2 standard
*   phpunit tests
