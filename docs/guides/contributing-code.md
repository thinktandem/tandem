# Contributing code

Tandem follows a slightly modified [GitHub Flow](https://guides.github.com/introduction/flow/) pattern. The basics are

## 1. Open a new branch from master

::: tip PRO TIP
Construct your branch as `ISSUENUMBER-BRIEFDESCRIPTION`. For example `10-addHomepage`.
:::

```bash
# Checkout a new branch from master
git checkout master && git checkout -b 10-addHomepage
```

Note that you should **NEVER EVER EVER PUSH ANYTHING DIRECTLY TO `master`!!!**

## 2. Add commits and push branch

::: tip PRO TIP
Prefix your commits with the issue number and they will automatically be surfaced in the corresponding issue and PR
:::

```bash
# Add some commits
git add somefile
git commit -m "#10: Added the file"
git add .
git commit -m "#10: Refactored code to obey with our code standards"

# Push the commits and branch
git push origin 10-addHomepage
```

## 3. Test Locally

Do a quick pass locally to make sure things work the way they should. Essentially, you want to catch anything obvious so that the person QAing your code doesn't end up resenting you. ;) At the same time you don't want to spend _tons_ of time making sure it's perfect because that is the point of QA.

**The 80/20 principle is a good rule to use here.**

You should also consult the _Testing_ section of your project's README as it likely contains instructions on how to run automated tests which can be a good way to find unexpected regressions or other errors. _Generally,_ these can be invoked with a simple:

```bash
lando test
```

## 4. Open a pull request

When you are feeling like your code is ready for prime time you will want to [open a pull request](https://help.github.com/articles/creating-a-pull-request/).

![PR branch example](/images/tres-guides.png)

After you submit your pull request you will see a pre-populated opening comment containing a checklist of things for both you and a reviewer to do.

::: warning
Note that the checklists may differ from project to project!
:::

![PR checklist example](/images/pr-checklist.png)

It would be wise to complete at least the required self-checks before [requesting a review](https://help.github.com/en/articles/requesting-a-pull-request-review).

## 5. Discuss, review and modify your code

The next step is taken direcly from the [GitHub Flow Guide](https://guides.github.com/introduction/flow/).

> Once a Pull Request has been opened, the person or team reviewing your changes may have questions or comments. Perhaps the coding style doesn't match project guidelines, the change is missing unit tests, or maybe everything looks great and props are in order. Pull Requests are designed to encourage and capture this type of conversation.
>
> You can also continue to push to your branch in light of discussion and feedback about your commits. If someone comments that you forgot to do something or if there is a bug in the code, you can fix it in your branch and push up the change. GitHub will show your new commits and any additional feedback you may receive in the unified Pull Request view.

Once all the boxes in the PR checklist are checked and the automated status checks pass your code is ready to be deployed! **Congrats!** :boom:!

For more detail on our QA process check out [below](/guides/process.md#qaing-code).
