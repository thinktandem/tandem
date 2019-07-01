I just submitted code and now I want to make sure it's ready for primetime!!!

In order to do that I need to first go through the below checklist entitled "For Me" because I respect my coworkers and want to get this PR into the best place possible before i ask for their time. When i am done i will then summon reviewers for feedback and comment. These reviewers will have about a week to complete their review.

If they do not review in the time alloted or have no change requests or blocking concerns _**the person who opened the pull request**_ will apply the "Ready to merge" label which will ping the Keepers of Faith to press the merge button.

## For me

### Bare minimum self-checks

> [What do you think of a person who only does the bare minimum?](https://getyarn.io/yarn-clip/dcf80710-425e-478b-bde1-c107bd11e849)

- [ ] I've read the [Contributing Code Guide](https://docs.thinktandem.io/guides/contributing-code.html)
- [ ] I've updated this PR with the latest code from `master`
- [ ] I've made sure my code [fits into the right place](https://docs.thinktandem.io/guides/improve-tandem.html#understanding-the-structure)
- [ ] I've done a cursory QA pass of my code locally
- [ ] I've written an acceptance test below for the reviewer
- [ ] I've ensured all automated tests pass
- [ ] I've [connected this PR to an issue](https://help.zenhub.com/support/solutions/articles/43000010350-connecting-pull-requests-to-github-issues)
- [ ] I've gone into that issue and if it is a task with a linked "next task" i've gone into that task and made its next task or prompted a discussion there about what its next task should be

### Pieces of flare

- [ ] I've written a unit or functional test for my code
- [ ] I've updated this repo's README if my code changes it
- [ ] I've updated relevant documentation it my code changes it

### Finally

- [ ] I've [requested a review](https://help.github.com/en/articles/requesting-a-pull-request-review) with relevant people
- [ ] I've moved this ticket into the "Ready for review" swimlane

## For the reviewer

### Acceptance Test

THE PERSON WHO SUBMITS THE PR SHOULD PUT THEIR ACCEPTANCE TEST HERE.

The acceptance test should detail the steps the reviewer can take to

1. Replicate the "issue" on the mainline site
2. Showcase the "fix" on the PR environment spun up on platform.sh.

Here is a _very simple_ example you can follow

#### Steps to replicate

1. Provide a link to the prod or dev site
2. Navigate to the homepage, see that the background is neon green

#### Fix

1. Provide a link to the QA environment
2. Navigate to the homepage and see that the background is blue

### Reviewer checks

I've completed the following tasks and requested changes from the submitter if changes were needed before a :+1: could be given.

- [ ] I've read the [QAing Code Guide](https://docs.thinktandem.io/guides/qaing-code.md)
- [ ] I've verified the developers QA checklist eg "For me" has been completed to a level i am ok with
- [ ] I've manually reviewed the code and it checks out
- [ ] I've manually validated the acceptance test(s)
- [ ] I've summoned an additional reviewer if I need a second (or third, or fourth, ... or nth) opinion

## For the Keeper(s) of the Faith

- [ ] We've attempted to find a follow up issue if needed and if needed we've requested it be created
- [ ] We've verified this does not wildly diverge from our mission, goals, roadmap, values etc

