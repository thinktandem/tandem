Platform.sh Enterprise Drupal 7 Vanilla Workflow
================================================

This is how to setup a Github to Platform.sh on an existing Enterprise Vanilla Drupal 7 Platform.sh Site.

It is easiest to use the [Killer Drupal 8 Workflow for Platform.sh](https://github.com/thinktandem/platformsh-example-drupal8) boilerplate for now and cherry pick out what we need for now.  You can also utilize the readme on that repo to see the workflow, etc.  I have supplied what I did for one site.

_NOTE: You will need to install composer onto the site to do unit testing.  You can do this either via [composer manager for Drupal](https://www.drupal.org/project/composer_manager) or just staright up add a compoer.json to the project root and install the required vendor libraries.  You can then uncomment what you want to test in the yml files after that._

**Edit your .lando.yml file to look like this:**

  ```yml
  name: YOURSITE
  recipe: drupal7
  config:
    webroot: public
    xdebug: true
    php: '5.6'

  # The following additional build step will install the Platform CLI
  services:
    appserver:
      build:
        - "curl -sS https://platform.sh/cli/installer | php"
  #      - "cd $LANDO_MOUNT && composer install"
      overrides:
        services:
          environment:
            BEHAT_PARAMS: '{"extensions" : {"Behat\\MinkExtension" : {"base_url" : "http://nginx/"}, "Drupal\\DrupalExtension" : {"drush" :   {  "root":  "/app/web" }}}}'

  # Ensure `composer install` also happens every time you start your site
  # events:
  #  post-db-import:
  #    - appserver: "cd $LANDO_MOUNT && composer install"

  # The following entry creates a `lando platform` command that will run
  # any Platform CLI command from inside the container if desired.
  tooling:
    platform:
      service: appserver
      description: Run Platform CLI commands
      cmd: /var/www/.platformsh/bin/platform
  #  phplint:
  #    service: appserver
  #    cmd: /app/vendor/bin/phplint
  #  phpcs:
  #    service: appserver
  #    cmd: /app/vendor/bin/phpcs
  #  phpunit:
  #    service: appserver
  #    cmd: /app/vendor/bin/phpunit
  #  behat:
  #    service: appserver
  #    cmd: /app/vendor/bin/behat
  #  git:
  #    service: appserver
  ```

**Add a .travis.yml file and copy this in:**

  ```yml
  language: php

  # This can be set to whatever you want since Lando is taking care of your deps
  php:
    - 5.6

  services:
    - docker

  before_install:

    # Install Lando
    - sudo apt-get -y update
    - sudo apt-get -y install cgroup-bin curl
    - curl -fsSL -o /tmp/lando-latest.deb http://installer.kalabox.io/lando-latest-dev.deb
    - sudo dpkg -i /tmp/lando-latest.deb

    # Sanity check to make sure we are rolling
    - lando version

  script:

    # Switch the lando files and start
    - rm -f .lando.yml
    - cp -rf .lando.travis.yml .lando.yml
    - lando start -- -v

    # Run non-db required tests eg linting/code standards/unit tests
    # Lint the codez
    # - lando phplint

    # Check code standards
    # lando phpcs --config-set installed_paths /app/vendor/drupal/coder/coder_sniffer
    # lando phpcs -n --report=full --standard=Drupal --ignore=*.tpl.php --extensions=install,module,php,inc web/modules web/themes web/profiles

    # Unit tests
    # cd web
    # lando phpunit -c core --testsuite unit --exclude-group Composer
    # cd ..

    # Do platform stuff
    # Verify we are logged in
    - lando platform auth:info

    # Generate and post an ssh key and then wait because Platform seems to
    # refresh keys every 90 seconds
    # NOTE: If you are getting consistent DB pull failures then you might want to increase the sleep
    - lando platform ssh-key:add -y
    - sleep 200

    # Dump and import the database
    - lando platform db:dump --gzip --file=dump.sql.gz --project=$PLATFORMSH_PROJECT_ID --environment=master --identity-file=/var/www/.ssh/id_rsa
    - lando db-import dump.sql.gz
    - rm -f dump.sql.gz

    # This could be potentially problematic if someone adds their own ssh key after we generate one above
    # and before we run the below
    - lando ssh -c "/var/www/.platformsh/bin/platform ssh-key:delete \$(/var/www/.platformsh/bin/platform ssh-keys --format=csv | tail -1 | cut -d ',' -f 1)"

    # Check to see if we succeeded
    - cd public
    - lando drush status && lando drush cc all
    - cd ..

    # Run db required tests eg behat
    # - lando behat --config=/app/tests/behat-lando.yml

  ```

**Make a .lando.travis.yml and add copy this in:**

  ```yml
  name: poets
  recipe: drupal7

  # Configure the D8 recipe to match up closer to a vanilla platform.sh stack
  config:

    # Lando defaults to Apache. Switch to nginx to match Platform.sh.
    via: nginx

    # Set the webroot to match your .platform.app.yaml.
    webroot: public

    # Set this to match the version in your .platform.app.yaml.
    php: 5.6

    # Lando defaults to the latest MySQL release, but Platform.sh uses MariaDB.
    # Specify the version to match what's in services.yaml.
    database: mariadb:10.1

  # The following additional build step will install the Platform CLI
  services:
    appserver:
      build:
        - "curl -sS https://platform.sh/cli/installer | php"
  #      - "cd $LANDO_MOUNT && composer install"
      overrides:
        services:
          environment:
            PLATFORMSH_CLI_TOKEN: $PLATFORMSH_CLI_TOKEN
            PLATFORMSH_PROJECT_ID: $PLATFORMSH_PROJECT_ID
            BEHAT_PARAMS: '{"extensions" : {"Behat\\MinkExtension" : {"base_url" : "http://nginx/"}, "Drupal\\DrupalExtension" : {"drush" :   {  "root":  "/app/web" }}}}'

  # Ensure `composer install` also happens every time you start your site
  # events:
  #  post-db-import:
  #    - appserver: "cd $LANDO_MOUNT && composer install"

  # The following entry creates a `lando platform` command that will run
  # any Platform CLI command from inside the container if desired.
  tooling:
    platform:
      service: appserver
      description: Run Platform CLI commands
      cmd: /var/www/.platformsh/bin/platform
  #   phplint:
  #     service: appserver
  #     cmd: /app/vendor/bin/phplint
  #   phpcs:
  #     service: appserver
  #     cmd: /app/vendor/bin/phpcs
  #   phpunit:
  #     service: appserver
  #     cmd: /app/vendor/bin/phpunit
  #   behat:
  #     service: appserver
  #     cmd: /app/vendor/bin/behat
  #   git:
  #     service: appserver
  ```
