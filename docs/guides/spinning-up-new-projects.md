# Spinning Up New Projects

Use this guide to start all new projects in Tandem.  I could also be used to massage existing code bases into our workflow as well.

## 1. Choose a start state

[Drupal 8 Template](https://github.com/thinktandem/template-drupal8)

This is a base Drupal 8 start state.  It integrates all our testing, utilizes a composer workflow, and integrates with platform.sh.  Utilize this start state if you want a to build a completely custom site from the ground up.

[Drupal 8 Minimis Template](https://github.com/thinktandem/template-minimis)

This is similar to the Drupal 8 Template above, but uses the [Minimis Distribution](https://github.com/thinktandem/minimis).  This start state is typical for most small to medium sized projects.       

[ContentaCMS Template](https://github.com/thinktandem/contentacms-platformsh)

This is similar to the Drupal 8 Template above, but uses the [Contenta CMS Distribution](https://github.com/contentacms/contenta_jsonapi).  Utilize this start state only if you are building a decoupled Drupal 8 site.

## 2. Create a new repo

1. [Create a new repo for the new project](https://help.github.com/en/articles/create-a-repo) 
2. [Mirror your chosen start state](https://help.github.com/en/articles/duplicating-a-repository#mirroring-a-repository)

## 3. Record the new repo

Add the new repo to the [list of current projects](https://docs.google.com/spreadsheets/d/12zfVOBGhCA3dX9Wm5_e0fCbUTPO1_XRnAKNmepQLi2s/edit#gid=0).

## 4. Spin up platform.sh site

1. Contact Alec Reynolds to spin up a small site on platform.sh.
    * Only Alec has the powers to do this. 

## 5. Spin up site locally

1. Change the name of the site in .lando.base.yml
2. Change the project ids in .lando.base.yml to match your platform.sh project id.
3. Run ```lando start```

## 6. Integrate with platform.sh

1. Add the platform.sh git repo as a remote in your local.  You can grab the git repo from the dashboard of your project.  The run the following commands:

     ```bash
     git remote add platform PLATFORMID@git.us.platform.sh:PLATFORMID.git
     git push platform master
     git remote remove platform
     ```

2. Run ```lando platform``` to login to the platform.sh cli
3. Generate a [GitHub user token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).
4. Integrate GitHub with platform.sh via (obviously change the variables):

    ```bash
    lando platform integration:add \
      --type=github \
      --project=PROJECT_ID \
      --token=GITHUB-USER-TOKEN \
      --repository=USER/REPOSITORY \
      --build-pull-requests=true \
      --fetch-branches=true
    
    ```
5. Run ```lando pull``` to pull the site on platform.sh locally into yours.

## 6. Platform.sh variables

1. [Generate a platform.sh token](https://docs.platform.sh/development/cli/api-tokens.html)
2. In your local repo, create a .env file and add the token like:

    ```yaml
    PLATFORMSH_CLI_TOKEN: token-hash
    ```
3. In the platform.sh settings add the variable with the token
    * The url should be something like <https://console.platform.sh/USER_NAME/PLATFORM_ID/settings/variables> where you add it.  Don't add it to the master branch settings.

## 7. Setup Travis

1. Connect the repo to travis if it isn't already.
2. [Setup the travis variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings):

    ```bash
    PLATFORMSH_CLI_TOKEN=TOKEN_FROM_STEP_6
    PLATFORMSH_PROJECT_ID=PLATFORM_PROJECT_ID
    ```
  
