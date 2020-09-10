---
title: "Legacy Tech Rescue"
id: outsell-tethys
client: outsell
summary: "We helped Outsell remove third-party vendor dependency with a new Laravel-powered API to feed an ecosystem of Drupal sites."
link: https://outsellinc.com
logo: /images/logos/outsell.png
logoHeight: 1.5

header:
  title: "Refinancing<br /> technical<br />debt"
  image: /images/work/osdata.png
  background:
    background-color: "#55c2b8"
    background-image: url(/images/work/outsell-bg2.png)
    background-position: 100% 20%
    background-size: cover
    background-repeat: no-repeat

theme:
  background: "#55c2b8"
  headerColor: white
  headerHover: black
  headerActive: black
  text: white

date: "2016-09-23"
tags:
  - docker
  - node
  - api
  - drupal
  - javascript
  - magic
  - wordpress
  - tech
  - dreamfactory
  - auth0
  - sso
  - development
---

::: point Summary.
Outsell’s Intelligence Platform relied upon a proprietary platform from a 3rd party vendor which made it hard to add new features and troubleshoot issues. With mere months until the vendor’s contract expired, the clock was ticking: should Outsell renew the expensive contract or break the chain and empower themselves? Fortunately, Tandem had a plan.
:::

> Tandem has been instrumental in helping us find a better path forward with our technology.
> - Ben Sampson, Head of Product

::: important Unlocking vender lock-in.
In our analysis we found that Outsell relied upon their external vendor for two primary services: a Salesforce integration that helped them authenticate users and an API that provided access to Outsell's powerful research database.

After replacing the convoluted [Salesforce-tied login with Auth0](/work/outsell-auth0), we chose to expose Outsell’s primary PostgresDB via the open source DreamFactory API. Working in concert with Outsell's development team, we refactored the Intelligence Platform to pull data from this new API.

When their contract expired they seamlessly switched over to their new system without a hitch.
:::

:::::: col-wrapper
::: col-half Plug-and-play API:
DreamFactory provided an easy way to expose Outsell's legacy database via a modern API, no licensing fees required.
:::

::: col-half Content Migrated:
:::big
30k+ items
:::
::::::
