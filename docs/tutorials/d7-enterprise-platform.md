Platform.sh Enterprise Drupal 7 Vanilla Workflow
================================================

This is how to setup a Github to Platform.sh on an existing Enterprise Vaniall Drupal 7 Platform.sh Site.

It is easiest to use the [Killer Drupal 8 Workflow for Platform.sh](https://github.com/thinktandem/platformsh-example-drupal8) boilerplate for now and cherry pick out what we need for now.

* Edit your .lando.yml file to mirror the config, services, events & tooling sections of [the example file](https://github.com/thinktandem/platformsh-example-drupal8/blob/master/.lando.yml)
  * Change the php version to whatever your platform site is using
  * Change the the web root to public
  * If you don't use composer, remove the following lines:
    * ```cd $LANDO_MOUNT && composer install``` in the services section
    * Remove the events section

* [Grab the .travis.yml file](https://github.com/thinktandem/platformsh-example-drupal8/blob/master/.travis.yml) and add it to your repo, then:
  * Change the php version
  * At the bottom change the cd from web to public
  * change drush cr to drush cc all

* [Copy the .lando.travis.yml](https://github.com/thinktandem/platformsh-example-drupal8/blob/master/.lando.travis.yml) Into your repo and make a few tweaks:
  * Do the same changes you did in the .lando.yml above
