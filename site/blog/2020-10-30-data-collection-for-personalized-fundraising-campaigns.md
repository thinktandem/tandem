---
title: "Collecting and Sanitizing Data for Personalized Campaigns"
summary: "How to use personalization for more effective fundraising campaigns that target your donors' unique interests."
id: alecr
author: "Alec Reynolds"
pic: "/images/people/alecr.png"
location: California
date: "2020-10-30"
tags:
  - non-profit
  - strategy
  - user-research
  - personalization
---

## Overview

In my [last post on digital fundraising personalization](/blog/2020/10/10/data-collection-for-personalized-fundraising-campaigns), I outlined how personalization can take your fundraising campaigns to the next level. But now that you're excited to start personalizing campaigns, where to start? With data!

## What Data Do You Need for Personalization?

In our first post, we introduced the concept of a three-tiered approach to personalization in a "crawl, walk, run" model. Each step involves deeper, more complicated personalization tactics that require more data:

:::::: col-wrapper
::: col-third
![Image of Regular Fish](/images/articles/better-digital-fundraising/fish.png)
**Crawl: Drip Campaign**
Sequence of emails, sent in bulk but appearing like a personal communication.

**Minimum Data Required:** Email + name.
:::

::: col-third
![Image of Walking Fish](/images/articles/better-digital-fundraising/walking-fish.png)
**Walk: Segmented Campaign**
Campaign variations sent to different types of prospects based on their interests.

**Minimum Data Required:** Details on donor interests, location, or other information that can be used to segment your donors.
:::

::: col-third
![Image of Running Fish](/images/articles/better-digital-fundraising/running-fish.png)
**Run: Deep Personalization**
Personalizes a donor's experience based on their actions.

**Minimum Data Required:** Real-time collection of donor actions like what web pages they viewed on your site or which of your Facebook posts they've "liked".
:::
::::::

The bar for data starts low: a simple for collecting an email and the donor's name. But how do you start collecting more information about your donors without annoying them with endless forms?

## Data Collection

### Data Collection Tip #1: Making Better Forms

Badly designed forms disincentivize your donors from giving you information. The length of a form can be a good proxy for form design. After all, who likes filling out a multi-step form that's 3 pages long? However, length sometimes matters less than quality. [One study](https://cxl.com/blog/reduce-form-fields/) showed a form with 6 fields got 14% *less* conversions than a form with 9 fields. The difference? The shorter form removed fields that visitors were engaged with. Even though it was an "easier" form to fill out, completing the shorter form didn't provide as much value to visitors.

> The number of form fields isn’t the only factor that contributes to ease and simplicity.
> - [CXL](https://cxl.com/blog/reduce-form-fields/)

One way to think of form design is as a value proposition to the donor: by giving you a specific piece of information, what value am I getting? If the sign-up form is for a newsletter, the donor is interested in your organization. They *want* to give you their email, because they know that'll mean they'll get updates. They *want* to give you information on what they're interested in, so they can receive more relevant updates. They may feel ok about giving you their name, but the value proposition starts to fade after this point. Why would I give you my address or phone number for an email newsletter signup? The donor doesn't see benefit from providing those pieces of information in this context; in fact, they probably see them as red flags that they'll be receiving junk mail.

Good form design demands that we try to collect data from users where it makes sense to *their* interests. This means that we can't collect ALL the data we want from them in a single form.


### Data Collection Tip #2: Progressive Profiling

To collect more usable data for running personalized fundraising campaigns, we need to use progressive profiling. Progressive profiling is the process of collecting more pieces of information throughout a donor's journey with our organization. An example of progressive profiling might look like this:

**Touch #1:** Collect email address for a newsletter signup and one or two interests.

**Touch #2:** Collect their name and telephone from a volunteer form we send to them based on the interests we collected.

**Touch #3:** Collect their address upon donating.

Each step only requires a small investment on the part of the donor. For each step, the information they give us *makes sense* as part of accomplishing the donor's goals. They *want* to hear more about our non-profit, so they give us their email. They *want* to volunteer, so they give us contact info to coordinate. They *want* to give us money, so they provide us billing info or an address so we can send a thank-you note.

> We’ve reported as much as 42% increase in form submissions by implementing progressive lead forms.
> - [Magnetic Creative](https://www.magneticcreative.com/journal/progressive-profiling/)

The key is having a technology system that allows you to integrate information from all these "touches" into a single record. Fortunately, many donor management systems and marketing automation systems have good tools for accomplishing this. However, before we worry about executing our data collection strategy, we need to make sure that our donor database is in fighting shape.

## Data Quality: Good Data vs. Bad Data

Fundraising campaigns rely on quality data. Without it, you'll have high bounce rates, lower conversions, and risk offending potential donors by sending them incorrect information that's artificial or "canned" feeling.

So how do we recognize good data from bad data? With thousands of donor entries, it can be difficult!

![Data and Lore from Star Trek](/images/articles/better-digital-fundraising/good-data-bad-data.png)

Fortunately, there are three elements we can use to audit our donor database and separate out data from mere lore.

### 1. Good Data is **Correct**.

Correctness means factual accuracy. Is your basic contact information correct? Do you get a high bounce rate when sending out email campaigns?

Completeness is an important related concept to correctness. If you only have an email address for a prospective donor, it's going to be hard to run any sort of personalized fundraising campaign.

> Over 62% of [non profits] indicated that their biggest fundraising challenge was incomplete constituent data.
> - [Little Green Light](https://www.littlegreenlight.com/blog/how-to-improve-the-health-of-your-donor-database-in-one-hour/)

### 2. Good Data is **Fresh**.

![Photo of Fresh Prince of Bel-Air.](/images/articles/better-digital-fundraising/fresh-prince.png)

Fresh data is up-to-date.

Ok, your data doesn't have to be *quite* as fresh as '90s Will Smith (can anyone truly be *that* fresh?), but regularly updated donor contacts ensures that your information is current. Sending campaigns to old addresses can waste resources. Using old names shows a donor that their relationship with you might be stale. Re-affirming a donor's interest in your organization is also valuable; how often do you get communications from non-profits that serve a cause you no longer follow, or are geographically focused in an area you no longer live in?

To keep contacts fresh, you should...

- **Have a policy for updating old contacts.** If a contact hasn't been updated for longer than X time, it should be reviewed.
- **Encourage donors to update their info.** This could mean sending out "Catching Up" campaigns to stale donors, asking them if you still have their correct info or probing for new interests.
- **Have a policy for discarding contacts.** If a contact is stale and hasn't responded to campaigns for a certain amount of time, then it's time to delete them from your donor database.

Freshness also applies to donor database fields. If you have legacy fields that are no longer used in campaigns, delete them. Think of old data as sunk cost; even though you want to retain the value of that data collection you did years ago, it's time to recognize that the data is now worthless at best, and at worst is wasting your time or annoying your donors. Marie Kondo your donor management system and let go!

### 3. Good Data is **Standardized**.

Standardization means that your data is in a format that can be easily filtered by a machine.

Let's take an easy example: storing a donor's interests. With a free text field or a "free tagging" system (one that allows you to create new labels at will), you'll have lots of variations of a single term. Think of "Sports" vs. "Sport" vs. "Outdoor Games". All of them may mean practically the same thing, but you'll have to remember all these variations and do some creative filtering to get a list of donors for a campaign centered around those interests. And woe becomes you if you're storing addresses, donation records, or other complicated data in a non-structured text field!

In contrast, a structured field would have a set number of options for donor interests. If your options for donor interests are "Sports", "Hiking", "Bird Watching", and "Bicycling", your campaign lists will be accurate and easy to create. Address information stored in standardized formats will be easy to geocode so you can target certain locations. Donation records stored as structured data can be aggregated or targeted for certain frequencies of giving easily.

## Data is Your Friend

Data is rarely a fundraiser's favorite topic. Many fundraising professionals are people-focused; we're hired because we're good at creating in-person relationships and like learning more about our donors.

However, any professional fundraiser (or for that reason, any professional marketer or sales person) knows that you're only as good as your data. You can't manage relationships with thousands, even hundreds of donors without having a system. The quality of the data in your donor management system controls your fundraising success. Personalized campaigns reemphasize this importance.


## Next Steps

We've established the [importance of personalization](/blog/2020/10/10/data-collection-for-personalized-fundraising-campaigns) as a digital fundraising tactic, and now we've seen how we can prepare for personalized campaigns through better data collection and sanitization. Our next steps are to...

1. Develop a personalized campaign strategy.
2. Understand available personalization tools.

If you have more questions regarding collecting data or want help with an audit of your current donor database, give us as shout-out on our [contact form](/contact). We don't bite, promise.

Happy fundraising!
