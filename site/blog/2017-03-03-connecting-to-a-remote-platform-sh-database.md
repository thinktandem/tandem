---
layout: Post
title: 'Connecting to a Remote Platform.sh Database'
tags:
    - localdev
    - devops
author: 'Geoff St. Pierre'
private: false
mainImage: 'https://thinktandem.io/images/articles/connect-to-sequel-pro.png'
img-src: 'https://thinktandem.io/images/articles/connect-to-sequel-pro.png'
byline: 'Connecting to a remote Database on platform.sh is simple (when you know how)!'
date: '2017-03-03'
---

It's not complicated to connect to a platform.sh database; here's how!

Requirements
----

* A database management application. I will use <a href="https://www.sequelpro.com/">Sequel Pro</a> in this post.
* Set up a site on <a href="https://platform.sh/">platform.sh</a>.
  * Add your <a href="https://docs.platform.sh/development/ssh.html">ssh-key</a> to your account settings.

Instructions
----

Open up Sequel Pro and click the `+` in the bottom left corner to create a new connection. You will be prompted for connection settings. At the top there are three tabs. Each type of connection prompts for different settings. Select the `ssh` tab for a platform.sh connection.

<center>
  <img alt="Sequel Pro Connection Screen" src="images/articles/sqp-connect.png" width="433" align="center" />
</center>

Let's break down the rest of the settings.

* `Name:`
  * This can be anything that describes the database you are connecting to. I usually stick to the format: Example Site - Test.
* `MySQL Host:`
  * This will literally be the string `database.internal`
* `Username:`
  * Literally `user`
* `Password:`
  * leave empty
* `Database:`
  * Literally `main`
* `Port:`
  * leave empty

The rest of the settings can easily be obtained through the ssh connection string provided by platform.  To get the string, login to platform.sh, choose your project, hover over the `Access site` link, and copy the `SSH ACCESS` string to your clipboard.

* `SSH Host:`
  * The part of the string after the @ `ssh.us.platform.sh`
* `SSH User:`
  * This is the part of the string before the @ it consists of the platform site ID and the environment.
* Leave the rest of the settings blank but make sure the `Connect using SSL` box is checked.

Sequel Pro should pick up your public key from your computer but if it can't you can browse to your public key to explicitly point to it (usually in `~/.ssh/`).

That's it!  Click `Test Connection` if it connects hit `Save changes` then `Connect`.

Conclusion
----

You now have a new favorite in your Sequel Pro sidebar that you can use to connect to your Platform.sh environment anytime you need it.
