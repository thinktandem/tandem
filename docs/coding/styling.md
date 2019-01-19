---
description: Tandem likes to make things look pretty.
---
Sass
=============
There are a bevy of ways to style web projects however we prefer the feature set offered by [Sass](http://sass-lang.com) to compile css. Modular, reusable, component based workflows are of most interest to as this enables us to _write once, use everywhere_™.

Extends vs Mixins — The Battle Royale
-------
Sass extends (`@extend`) are often maligned for causing code bloat however they can be used effectively to gain quick wins while developing without big drawbacks. You still need to exercise discretion because things can easily snowball. 

Take the following examples:

If this exists:
```scss
.my-style {
  font-weight: 500;
  text-align: center;
}

@mixin my-style {
  font-weight: 500;
  text-align: center;
}
```

...and then we did this...

```scss
.my-div {
  @extend .my-style;
  background-color: blue;
  font-size: 2rem;
}
```
..as well as this...
```scss
.my-div {
  @include my-style();
  background-color: blue;
  font-size: 2rem;
}
```

Both of these examples will acheive the same thing visually however the code that they produce is distinctly different. Here is the CSS that would be output:

*Extend*
```css
.my-style,
.my-div {
  font-weight: 500;
  text-align: center;
}

.my-div {
  background-color: blue;
  font-size: 2rem;
}
```

*Mixin*
```css
.my-style {
  font-weight: 500;
  text-align: center;
}

.my-div {
  font-weight: 500;
  text-align: center;
  background-color: blue;
  font-size: 2rem;
}
```

Whilst this might not seem too different for this one example, there is danger in using the extend version many times over across many different selectors. The list of selectors to apply the clearfix rules will grow exremely long as the clearfix class is extended in hundreds of intstances across your site. Do this too much and you can run afoul of [Internet Explorer's rules-per-file limit](https://blogs.msdn.microsoft.com/ieinternals/2011/05/14/stylesheet-limits-in-internet-explorer/).

"But wouldn't the mixin add the `.my-style` rules many times across multiple selectors?" I hear you say—and you would be correct. Technically this can output larger amounts of raw CSS in our example however the way in which gzip compresses files (and I hope you are compressing your css) means that larger repeated chunks of text can be compressed more efficiently than non-repeated strings—thereby giving you more bang for your buck when it comes to file bloat. 

It helps to be congnitive of the relationship between the selectors that you are extending. If there is no real relationship between the components that the selectors represent then you probably shouldn't be extending. Two types of buttons that have some shared styles is a great use case for extends. However two random elements that both need a blue background is not a great use case.

If you have a lot of rules that you want to apply to only a small amount of selectors then you are better off using an extend because this means building a single ruleset with multiple selectors. A card or tout component with a couple of different variations is a good use case. Like so:

```css
.my-card {
  position: absolute;
  top: calc(100% - 3.7rem);
  bottom: 0;
  transition: top 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1rem;
  background-color: var(--gray-darkest);
  border-bottom: 3px solid var(--green);
  font-size: 1.25rem;
  color: var(--white);
  opacity: 0.9;
}

.my-card--variation-a {
  @extend .this-div;
}

.my-card--variation-b {
  @extend .this-div;
}

```

...will compile to:

``` css
.my-card, 
.my-card--variation-a, 
.my-card--variation-b {
  // Lots of rules.
  position: absolute;
  top: calc(100% - 3.7rem);
  bottom: 0;
  transition: top 0.25s ease-in-out;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1rem;
  background-color: var(--gray-darkest);
  border-bottom: 3px solid var(--green);
  font-size: 1.25rem;
  color: var(--white);
  opacity: 0.9;
}
```

If we used a mixin for the same example above we would end up with that same large ruleset repeated for 3 different selectors—which would result in more lines of CSS overall but no real gzipping advantage because it's only been repeated 3 times.

This means that mixins are better suited to adding smaller amounts of rules to existing selectors and we can avoid seeing these sorts of 'extended' rulesets in our compiled CSS:

``` css
// Lots of selectors.
.this-div, 
.that-div, 
.another-div,
.your-div, 
.my-div, 
.his-div,
.her-div, 
.blah-div, 
.thing-div {
  background-color: red;
}
```

Whilst not being an exhaustive explaination about the caveats of the different approaches, this should hopefully set you on the path to righteousness. For further reading on the matter see the following articles: 

- [https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/
)
- [http://fredparke.com/blog/ditto-making-good-use-sass-extends-and-placeholder-selectors](http://fredparke.com/blog/ditto-making-good-use-sass-extends-and-placeholder-selectors)
