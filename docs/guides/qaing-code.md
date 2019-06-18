# QAing and deploying code

Reviewing code is a task that is generally handled by both the developer themselves and a reviewer(s). Broadly speaking the developer will take things as far as they can on their own with the goal of minimizing the reviewers time and energy. On the flip side, the reviewer(s) will provide a second set of eyes to validate acceptance tests and code quality.

The specific action items assigned to a developer and reviewer can differ from project to project and are generally enumerated in a given project's [pull request template](https://help.github.com/en/articles/creating-a-pull-request-template-for-your-repository). For example, [here is the template](https://github.com/thinktandem/tandem/blob/master/.github/PULL_REQUEST_TEMPLATE.md) for this repo. You can read more about how that works [above](/guides/process.md#_4-open-a-pull-request).

That said here are the two general flows you'd take depending on your role.

## Developer Flow

### 1. Housekeeping

On a high level this means making sure the PR is as ready to go as possible. It could include making sure your code has pulled in the latest from `master`, that any relevant doc changes have been reflected or that you've written an acceptance test.

If a reviewer has to remind a developer they've missed basic things on their checklist it _vastly_ impacts team flow.

### 2. Automated Tests

The developer is also responsible for making sure all automated status checks contained in the PR have passed before they request a review. _Generally_, these tests will handle things like:

* Code linting and code standards enforcement
* Unit and functional tests
* Code analysis and review

> [If the light is green then the trap is clean!](https://www.youtube.com/watch?v=aLwKMkdVMnQ&feature=youtu.be&t=25).

![PR status checks](/images/light-is-green.png)

## Reviewer Flow

### 1. Acceptance Tests

Each pull request will automatically [spin up a separate QA environment](https://docs.platform.sh/administration/integrations/github.html) on [Platform.sh](https://platform.sh/). This enables a manual acceptance testing flow by stepping through a user journey on the QA environment and verifying it does what it is supposed to do.

It also allows us to compare user journeys between the QA environment and some control environment (usually dev or production) to test bug fixes.

Every pull request template will generally have an [example acceptance test](https://github.com/thinktandem/tandem/blob/master/.github/PULL_REQUEST_TEMPLATE.md#acceptance-test) for the **_developer_** to flesh out. This means that **_the reviewer is not responsible for writing this test_**, only verifying it does what it says it does.

### 2. Code Review

The final responsibility of the reviewer is to ensure the code is _good enough_ to be merged. _Generally_, this means

* Looking out for any low hanging logic errors or cheap improvements
* Ensuring the code fits into the projects architectural plan
* Ensuring the code is not defining a new way to do something we already have a pattern for
* Reviewing relevant code analysis feedback eg a [Code Climate Report](https://codeclimate.com/)

If you are unfamiliar with GitHub's pull request review system then check out [these docs](https://help.github.com/en/articles/about-pull-request-reviews
).

### 3. Client review

**@TODO:** Dustin and MM?

### 4. Deploying Code

Once the PR template checklist is complete and both the client and reviewer are feeling good about things you [may press the button](https://help.github.com/en/articles/merging-a-pull-request)

