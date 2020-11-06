---
title: "Custom Post Type Permissions via the Members Plugin"
summary: "With the Members Plugin, you can fine tune your CPT permissions per roles in WordPress."
id: johno
author: "John Ouellet"
pic: "/images/people/john-sm.jpg"
location: Florida
date: "2020-11-06"
tags:
  - member-portals
  - development
  - wordpress
  - php
  - johno
---

## Overview

Recently we rebuilt one of our non profit client's WordPress website.  One of the requirements was to have a better member experience for their subscribers.  When we rebuilt the site, we split out various functionality based content into different custom post types.  Since their members have different roles that have varying levels of permissions on these CPT's, we needed a granular permission structure.  

We are able to achieve this with the [Members plugin](https://wordpress.org/plugins/members/) and a little bit of coding.  In this post I will go over how we setup the Members plugin and the code we used to add the permissions we needed.  So, let's get right into it.

## Members Plugin Overview

The Members plugin allows us to add a level of granularity that is not easily available in WordPress core.   We can add roles via the UI, set their permissions via the UI, allows us to set multiple roles on a user, and much more.  This plugin makes it easy for a non development type admin to manage all these settings.  I could of used WordPress core hooks and filters to do this, but we don't build sites for developers when it is all said and done.

When you [add a Custom Post Type](https://developer.wordpress.org/reference/functions/register_post_type/) in WordPress, it inherits the basic Post type permissions.  On most sites we build, the Post type is typically blog like content.  So in our case, everyone can access the Blog, but not everyone should access a certain CPT.  This is where the Members plugin comes in handy on top of a little bit of coding.  

## Register Post Type Tweaks

There are 3 additional arguments we need to add when we setup our CPT via ```register_post_type``` function.  Let's go over each one:

### map_meta_cap

The [map_meta_cap](https://developer.wordpress.org/reference/functions/register_post_type/#map_meta_cap) argument allows us to map a meta capability to one of the several primitive capabilities.  What these capabilities do is adjust various permissions like editing or reading your cpt.  We will want to set this to true in our case.

### capability_type

The [capability_type](https://developer.wordpress.org/reference/functions/register_post_type/#capability_type) argument allows us to basically set which CPT the capabilities (aka permissions) apply to.  This argument does automatically set the capabilities argument for us, but we will set those ourselves.  Also note, the docs say map_meta_cap needs to be false or null.  However, since we are defining the capabilities, we need map_meta_cap to be true for it to work.

### capabilities

As mentioned above, the [capabilities](https://developer.wordpress.org/reference/functions/register_post_type/#capabilities) argument allows us to granularly define all our primitive capabilities.  You technically don't have to do this if you just set the capability_type argument. However, in order for this to work well with the Members plugin, you do need to set this up in this use case.

### Altering register_post_type()

So now that you understand what we need to setup, here is a slimmed down version of the arguments we passed into our register_post_type() function:

```php
$slug = 'open-submission'
$slug_plural = $slug . 's';

$args = [
  // All our other args for this CPT.
  'map_meta_cap' => true,
  'capability_type' => $slug,
  'capabilities' => [
    'create_posts' => 'create_' . $slug_plural,
    'delete_others_posts' => 'delete_others_' . $slug_plural,
    'delete_post' => 'delete_' . $slug,
    'delete_posts' => 'delete_' . $slug_plural,
    'delete_private_posts' => 'delete_private_' . $slug_plural,
    'delete_published_posts' => 'delete_published_' . $slug_plural,
    'edit_post' => 'edit_' . $slug,
    'edit_posts' => 'edit_' . $slug_plural,
    'edit_others_posts' => 'edit_others_' . $slug_plural,
    'edit_private_posts' => 'edit_private_' . $slug_plural,
    'edit_published_posts' => 'edit_published_' . $slug_plural,
    'publish_posts' => 'publish_' . $slug_plural,
    'read_private_posts' => 'read_private_' . $slug_plural,
    'read' => 'read',
    'read_post' => 'read_' . $slug,
  ];
];

register_post_type($slug, $args);
```

So as you can see, I am setting the arguments as I spelled out in the above sections.  As noted in the docs, there are 15 primitive types total in WordPress.  Seven of those are defined in WordPress Core and eight others are added via the [map_meta_cap](https://developer.wordpress.org/reference/functions/map_meta_cap/) function.  

This gives us the base structure needed for our CPT to register their respective permissions.  This also adds a new permission group within our Members plugin as well.  However, it is not formatted well as you can see from this image:

![Members Permissions Before](/images/articles/cpt-perms/perms-before.jpg)

Let's fix these labels up so they are much more readable.

## Adjusting Permission Labels

The members plugin comes with a [variety of actions, filters, and functions](https://github.com/justintadlock/members/tree/master/inc) for us to use.  We will achieve re-labeling our permissions with the action ```members_register_caps``` and the function ```members_register_cap```.  Here is the code we used to handle the task at hand:

```php
/**
 * Add CPT Members restriction capabilities.
 */
function register_cpt_members_caps() {
  $caps = [
    'create_',
    'delete_others_',
    'delete_',
    'delete_private_',
    'delete_published_',
    'edit_',
    'edit_others_',
    'edit_private_',
    'edit_published_',
    'publish_',
    'read_private_',
  ];

  $cpts = [
    'open-submissions',
  ];

  foreach ($cpts as $cpt) {
    foreach ($caps as $cap) {
      $slug = $cap . $cpt;
      $label = ucwords(str_replace("_", " ", $cap) . ' ' . str_replace("-", " ", $cpt));
      members_register_cap(
        $slug,
        [
          'label' => __( $label, 'our-theme' ),
        ]
      );
    }
  }
}
add_action( 'members_register_caps', 'register_cpt_members_caps' );
```

What this code is doing is basically re-registering the labels via the not so well formatted slugs we saw in the image above.  What this code does is change the permission group to look like this now:

![Members Permissions Before](/images/articles/cpt-perms/perms-after.jpg)

So now, when the no developer admin goes in, they can easily edit and change permissions for that specific role. 

## Conclusion

The Members plugin is a great plugin used to create gated content in your member portals.  It allows a lot of flexibility and granularity to handle any type of permission based goals you need for your site.  If your org needs help setting up your member portals, please reach out and get in touch.


