---
layout: Post
title: 'Using Markdown Containers in VuePress'
tags:
    - development
    - vuepress
author: 'John Ouellet'
private: false
byline: 'How to quickly and easily handle Markdown Containers in VuePress'
date: '2020-08-11'
meta:
    - { name: description, content: 'How to quickly and easily handle Markdown Containers in VuePress' }
    - { name: keywords, content: 'development,vuepress' }
---

## Overview

When using the ```vuepress-plugin-container``` plugin for [VuePress](https://vuepress.vuejs.org/), you can easily add themed content without using HTML or components.  This is achieved by just using some special Markdown syntax in your content.  If you are using the [vuepress/theme-blog](https://github.com/vuepressjs/vuepress-theme-blog) package, the plugin comes installed.  For the sake of this blog post, we will assume you do have this plugin installed.

## Basic Example

Your containers will be defined in your index.js within your VuePress theme.  Technically you could put this in your config.js as well.  However, putting it in index.js is cleaner and easier to read.  

The [config for the container plugin](https://vuepress.github.io/en/plugins/container/#usage) is very simple and straight forward.  So, let's get started with a very basic example:

```js
module.exports = {
  extend: '@vuepress/theme-blog',
  plugins: [
    ['container', {
      type: 'quote',
      defaultTitle: '',
    }],
  ],
};
```

The only required key for this plugin is the type key.  What this key does is generate a CSS class with that type in it.  We then call the container in markdown with 3 colons like this:

```bash
::: quote
Hello there
:::
```

This will inturn render a HTML component that looks like:

```html
<div class="custom-block quote">
  <p>Hello there</p>
</div>
```


You may also noticed the key of defaultTitle in our setup.  You can define a title that will get wrapper within the container structure with this.  For our example above, if I changed it to:


```bash
::: quote Hello there
- Obi-Wan Kenobi
:::
```

The output of this would be:

```html
<div class="custom-block quote">
  <p class="custom-block-title">Hello there</p>
  <p>- Obi-Wan Kenobi</p>
</div>
```

What this does is allow us to add a special ```<p>``` tag wrapper on the title so we can style it differently.  That pretty much summarizes a very straightforward and easy to use example.  Let's dive in to more advanced techniques now.  

## Advanced Example

### Containers within containers

One of the more typically used advanced techniques is to use a container within a container.  This is easily done as follows:

```js
module.exports = {
  extend: '@vuepress/theme-blog',
  plugins: [
    ['container', {
      type: 'col-wrapper',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-full',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-half',
      defaultTitle: '',
    }],
    ['container', {
      type: 'col-third',
      defaultTitle: '',
    }],
  ],
};
```

When you have just one container within a container, you can use the following syntax:

```bash
::: col-wrapper
::: col-full
Full column
:::
```

However, if you have more than one container within a container.  Then you need to use a slightly different syntax like this:

```bash
:::::: col-wrapper
::: col-half
Half column
:::

::: col-half
Half column
:::
:::::::::

:::::: col-wrapper
::: col-third
Third column
:::

::: col-third
Third column
:::

::: col-third
Third column
:::
::::::
```

For the half column container, the HTML would render like this:

```html
<div class="custom-block col-wrapper">
  <div class="custom-block col-half">
    <p>Half column</p>
  </div> 
  <div class="custom-block col-half">
    <p>Half column</p>
  </div>
</div>
```

Pretty cool and easy to use.  Then just use whatever styling you need to to wrap that is up nice and you win.

## Conclusion

Containers within VuePress is a straight forward and easy to use feature that make your markdown look much cleaner.  It is also an easy way to have consistent component usage within your content.  