# **UX/UI Accessibility Quick Checklist**

## ❏ Textual Color Contrast:
WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.
  - Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
  -  **TOOL:** [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
  -  **TOOL:** [http://contrastchecker.com/](http://contrastchecker.com/)

## ❏ Non-Text Contrast (WCAG 2.1):

The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):

**❏ User Interface Components**

Visual information required to identify user interface components and states, except for inactive components or where the appearance of the component is determined by the user agent and not modified by the author;

**❏ Graphical Objects**

Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

  - **TOOL:** [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

## ❏ Line Height &amp; Spacing (WCAG 2.1):
In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property:
  - Line height (line spacing) to at least 1.5 times the font size;
  - Spacing following paragraphs to at least 2 times the font size;
  - Letter spacing (tracking) to at least 0.12 times the font size;
  - Word spacing to at least 0.16 times the font size.

## ❏ Links:

All links need multiple ways of determining that they are links: More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.

  - i.e. Bold + Underlined, Color + Bold, etc.


## ❏ Fonts:

Avoid all capital letters as this makes it difficult for those with dyslexia (&amp; some older screen readers or those in compact mode may read them as acronyms).

## ❏ Known Development Issues:

In some cases modules/plugins/add-ons may not already be accessible and therefore will require custom code. If the contract&#39;s scope of work does not include budget for the custom coding than showing alternative functionality at the mockup stage may save many hours of development and improve the overall profitability of the project.

  - i.e. the D8 Mega Menu Module is not compliant as is ([see issues](https://www.drupal.org/project/issues/we_megamenu?text=accessibility+&amp;status=All))
