# Invoicing (For Fun and Profit)

Whether you're making them or receiving them, no one really loves invoices. That's why we try to...

1. Make the invoice creation process as easy as possible by **automating grunt work.**
2. Have **clear invoicing standards** so clients know *when* they'll be billed and understand *what* they're getting billed for.

## Typical Tandem Invoice

The typical Tandem invoice provides the total amount of time spent on different types of tasks:

![Fake Invoice](/images/fakeInvoice.png "Fake Invoice")

The core of all Tandem invoices is a list of development tasks completed linked to their corresponding Github issue numbers. We believe that meetings, QA, project management, and other line items are all intimate pieces of developing features. They shouldn't be presented as separate items on an invoice.

Some clients will request greater detail, which we can provide. However, invoice creation time should be considered. Creating a consolidated, line-item detail invoice can take 3+ hours for even a project with one or two developers. It's usually better to find out the client's business reason for needing that level of detail, and creating a report to address those concerns.

## Invoice Process

**Invoice Setup**

 In Harvest, every Tandem client should have...

* A *Client* entry
* Essential client contacts (especially their billing department!) entered as *People*
* One or more *Projects* to bill against. Projects should be configured with our hourly rate (if applicable) and any necessary notes on billing process.


**1. Project Manager Reviews Billing Period Hours**

Most Tandem clients are either on a semi-monthly or monthly billing period. Set a recurring calendar event on the day the billing period ends as a reminder to go through all your clients' detailed hour reports in Harvest and make sure...

* Hours are billed to the correct projects.
* All hours tracked are associated with a Github issue.
* Any potential issues (ex: a surprising amount of time tracked to a minor issue) are investigated.

This should take < 30 minutes for each client. If it takes more, you probably need to address issues with your team members.

**2. Administrative Assistant Creates Reports or Consolidates Line Items (Optional)**

In the case that a client requires a special billing report or line-item detail, an Administrative Assistant should help consolidate hours. By default, Harvest will simply transcribe ALL the time entries for a project into the invoice. That's super confusing! Combine tasks that have the same Github issue number and/or similar task descriptions underneath a single line item to make the invoice legible.

Account managers should be careful to record special instructions (like line-item detail requirements) in the Harvest project description.

**3. Account Manager Reviews and Sends Invoice**

The account manager is responsible for the final check. A meeting with the project manager may be required to review project budget and consider client needs.

Project and account managers should be proactive!!! Warn clients when project burn has increased. Tell them about features that have taken more budget to develop. Transparency ensures that no invoice is a surprise.
