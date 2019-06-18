I just submitted code and now I want to make sure it's ready for primetime!!!

In order to do that I need to [request a review](https://help.github.com/en/articles/requesting-a-pull-request-review). However, before I do that I want to do some self-checks because I respect my reviewers time and want us to maximize throughput at the highest quality.

## For me

### Bare minimum self-checks

> [What do you think of a person who only does the bare minimum?](https://getyarn.io/yarn-clip/dcf80710-425e-478b-bde1-c107bd11e849)

- [ ] I've read the [Contributing Code Guide](https://docs.thinktandem.io/guides/process.html#contributing-code/)
- [ ] I've updated this PR with the latest code from `master`
- [ ] I've done a cursory QA pass of my code locally
- [ ] I've written an acceptance test below for the reviewer
- [ ] I've ensured all automated tests pass

### Pieces of flare

- [ ] I've written a unit or functional test for my code
- [ ] I've updated this repo's README if my code changes it
- [ ] I've updated relevant documentation it my code changes it

### Finally

- [ ] I've [requested a review](https://help.github.com/en/articles/requesting-a-pull-request-review)

## For the reviewer

### Acceptance Test

THE PERSON WHO SUBMITS THE PR SHOULD PUT THEIR ACCEPTANCE TEST HERE.

The acceptance test should detail the steps the reviewer can take to

1. Replicate the "issue" on the mainline site
2. Showcase the "fix" on the PR environment spun up on platform.sh.

Here is a _very simple_ example you can follow

#### Steps to replicate

1. Navigate to the production homepage, see that the background is neon green

#### Fix

1. Navigate to the platform.sh PR environment homepage and see that the background is blue

### Reviewer checks

I've completed the following tasks and requested changes from the submitter if changes were needed before a :+1: could be given.

- [ ] I've read the [QAing Code Guide](https://docs.thinktandem.io/guides/process.html#qaing-code/)
- [ ] I've manually reviewed the code and it checks out
- [ ] I've manually validated the acceptance test passes
