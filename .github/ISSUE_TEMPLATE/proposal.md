---
name: Proposal
about: A proposal to improve Tandem
labels: proposal
---

Make sure you have read about the [different kinds of tickets](https://tandem-docs.lndo.site/guides/improve-tandem.html#suggesting-a-change) and then complete the following questions

1. Describe the problem and how you think it most impacts [Tandem's goals/mission/values](https://docs.thinktandem.io/manifesto/)

> Example: There is a significant set of tasks/tickets that we should be doing on _all_ of our projects. These include but are not limited to: project spin up checklists, pre-launch SEO audits, etc. Not having at least a list of them means that sometimes we do the same thing many different ways or forget to do something importnat altogehter. This causes significant overhead, confusion, resentment and most importantly diminshes our ability to deliver projects efficienctly.

2. Briefly describe the "fastest" thing we could do to begin to make things right.

> Example: Having a list of common tasks documented and ideally copy/pastable templates that we can use to manually seed new projects.

3. Briefly describe a "better" and more automated/tied in solution and how that would be better than the fastest.

> Example: A lando command that we run as part of a new project checklist that automatically imports common tickets and labels directly into GitHub. This is better because less prone to human error, wayyy less time and probably less chance of forgetting to do it all together.

4. Provide a few sentences about how you see this solution impacting various parts of the business

#### Operations

> Example: Standardization and efficiency gains, solving a big pain point we see in all our projects

#### Marketing

@TODO: we should be able to drop a link here to sales/marketing channels and our audiences so the person making the ticket can explicitly reference various channels and target audiences

> Example: Blog posts about automation and lando for technical people: potential hires, CTO-types. Gawker-style "top ten things you should be doing on all your projects right now!" post to more marketing peoples. Similar dissemention of that content on social. Could definitely drop the automation things in the Lando channels. Definitely could edit website copy to include the common things you get on every project.

#### Sales

@TODO: ditto, we need links to channels and audiences here.

> Example: Nothing immediate beyond the marketing, however, once we start automating some of these common tasks we can begin to "productize" various line items eg get paid for value instead of hours.

#### Feels and Morale

> Example: Removing drudgery, confusion and resentment from our process makes people happy and more productive. Plus its a fun technical problem to solve.

@TODO: Are their other things we should add here?

5. Provide a _best estimate_ about a few things. Use the `better` solution to compute your estimate.

Rank things on a modified-fibonacci scale between 1-40 eg (1, 2, 3, 5, 8, 13, 21, 40).

```yaml
# How urgent is this?
Priority: 1-40

# How well does the proposed solution align with our values
Value Alignment: 1-40

# Story points we think this will take
# NOTE: do not set the actual story points on the ticket itself, we will use the
# points on subsequent action itmes
Effort: 1-40

# Value to various parts of the business
Operational Efficiency: 1-40
Marketing: 1-40
Sales: 1-40
Feels and Morale: 1-40
```

6. Add your entry to this spreadsheet with the above data.

@TODO: let's hold off on making this until we lock down the above a bit

7. How can we best distribute solution so it's in baked into our processes and not lost?

@TODO: maybe link to the "tie things" together part of this process

> Example: We could initially add a checklist entry for the "fastest" version of this into our "starting up a new project" documentation and make sure that doc is references in all our start states so people. Ideally a `lando init --source tandem` command would be how we start all new projects and that automatically stands up the tickets amongst other things.

8. Generate a rough list of action items based on the above, eventually these should become action items

> Example:
> - [ ] Make a list of common tasks we should be doing on all our projects (this doesnt need to be exhaustive since we can add things)
> - [ ] Make a list of common labels for those tickets (assuming we dont have them already? maybe making labels should be a separate proposal we do first)
> - [ ] Start to actually create relevant markdown files we can copy/paste
> - [ ] Get our Lando plugin able to import the issues/labels automatically
> - [ ] Import them into existing projects?
> - [ ] Blog posts mentioned above
> - [ ] Update website copy to reflect we do these things on every project

9. Does anything above require discussion or feedback before this proposal is ready for primetime?

> Examples:
> - [ ] I'm not sure about whether the labels should be a separate thing or not

10. Make sure you complete the following checklist

- [ ] I've selected the label that _best_ describes what part of the business this ticket improves eg `sales`, `dev`, etc

@TODO: other things we should have here?
