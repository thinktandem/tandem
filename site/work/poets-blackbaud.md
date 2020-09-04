---
title: "Blackbaud Integration"
id: poets-blackbaud
client: Poets.org
summary: "We helped The Academy of American Poets centralize their Blackbaud-powered fundraising efforts on their Drupal website."
link: https://poets.org/
logo: /images/logos/poets.png

header:
  title: "Rebuilding<br /> poetry's home on <br />the internet"
  image: /images/poets.png
  background:
    background-color: "#4d9bf3"
    background-image: url(/images/poets-bg.png)
    background-position: 100% 20%
    background-size: auto
    background-repeat: no-repeat

theme:
  background: "#4d9bf3"
  headerColor: white
  headerHover: pink
  headerActive: pink
  text: white

date: "2018-08-28"
tags:
  - drupal
  - non-profit
  - development
---

The Academy of American Poets had been utilizing various Blackbaud products for well over a decade. The academy’s internal staff had the diligent task of maintaining all records within Blackbaud. This ate up considerable time and they needed to find a better way.

A majority of constituents were authorized users of their website poets.org.  This allowed their constituents to create anthologies for display on the website and a few other tasks.   The academy’s hope was to combine the two systems to allow constituents to view and maintain their own data.

Blackbaud’s systems do have various API endpoints that can be plugged into easily.  Tandem’s development team performed research on both Blackbaud’s capabilities and what Drupal could do to connect. At the time, there was no Drupal solution that could integrate with Blackbaud when Tandem began developing this bridge between the two systems. As part of this project, [Tandem developed the Blackbaud SKY API module](https://www.drupal.org/project/blackbaud_sky_api) to provide a universal way to talk with their Blackbaud instance.

Tandem then laid out what endpoints and how data was to be stored and transferred between the two systems by way of a mini discovery.  With that knowledge in hand. a complex framework was constructed that used the API connected abilities of the contrib module that was built.  This framework also met the desired functionality between the two systems.

In the end, all existing Blackbaud users were merged or created with a corresponding Drupal user.  Constituents now had the ability to easily update their information, renew their membership and donate to the academy all within the website.  This, in turn, has saved the academy on internal time while increasing their donations and usability of their constituents.
