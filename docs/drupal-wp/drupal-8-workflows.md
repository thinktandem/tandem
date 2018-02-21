---
description: Various workflows for Drupal 8.
---
Drupal 8 Workflows
==================

Git + Drush + Config Management
--------------------------------

The typical workflow has changed very much in Drupal 8.  We now need to use Config Management to export config with our commits.  The process is fairly simple and just adds an extra step.

To commit config changes along with git do the following on your local:

```bash
git add -A
lando drush cex --commit --messsage="Commit Message"
git push
```

Then on the dev branch, test, live you will do the following:

```bash
drush cim -y
```

This workflow makes it so you should not be adding config changes on test or live.  If you are using a localhost, then you shouldn't be doing config changes on dev either.
_Note: on platform.sh you can add the drush cim step into your deploy hooks_

## Switching branches

When switching branches, you will need to refresh your config to the new branch.  Just use:

```bash
drush cim -y
```

Note that you will wipe out any uncommitted config in your other branches. Make sure you have your config committed in your branch you are switching from.
