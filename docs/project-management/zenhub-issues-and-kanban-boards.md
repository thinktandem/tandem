Managing Projects
=================

Zenhub: Github Issues + Kanban Boards
-------------------------------------

ZenHub is a browser plugin that allows GitHub issues to be viewed, organized, and tracked on a agile Kanban Board from within GitHub itself.

### The Boards tab vs. the Projects tab

* The Projects tab can be though of as a set of sub-boards which can group and track subsets of issues which are already on the main board.
* Projects functionality is not normally used for client projects, as the main Boards tab can handle all needed Kanban functionality for a single client project.
* Projects functionality may be used for some internal projects

### Establishment of Pipelines (swimlanes)

  Will it be Tandem's standard board layout, or will this particular project need a little something extra? In any case, the typical pipelines for a client project are as follows:

* Backlog
* Current Sprint (with start\stop dates)
* Needs Client Action (optional)
* In Development
* In Internal Review/QA (denotes an open pull request, or a need for another pair of eyes)
* In Client Review (optional, used to denote issues that the Team has completed, but the Product Owner needs to either accept, or file a bug against)
* Closed (means “Done Done", all tests passing, accepted by Client, and deploy-able to production)

### Bug Issues

* Reporting bugs internally
  * If estimate greater than 1 story point, report them into the backlog, else current sprint.
* Client-reported bugs
* Client are allowed, and encouraged, to create Bug issues
* All Client bugs go into the backlog, for inclusion into the next sprint, unless deemed a P1 critical issue by both the Product Owner and the Scrummaster, in which case the bug will be included in the current sprint and velocity-equal amount of task(s) will be traded forward into the next sprint.

### Ticket Types

* Epics
  * Use them to group a series of Issues related to a larger functional feature
  * Not every Issue needs to be underneath an Epic
* Issues
  * May be a Bug, Task, or Feature
  * May or may not have an actual User Story in it
  * Feature issues must contain a User Story

### Handling Pull Requests

GitHub Pull Requests (PRs) are created by developers indicating that the code branch they've created and named after their active issue needs to be QA'ed by someone else on the team before being merged back into the code mainline, or "master" branch.

Since Tandem's development best practices dictate that all code improvements or bugfixes should be done in a side branch, away from the mainline, most issues will be awaiting an approval of their PR during this QA stage.

Approval of a PR will indicate to the project manager that an issue has been reviewed and QA'ed by at least two people on the team. Hence the pipeline for "In Client Review" which indicates the development team has finished with an issue and it's ready for the client's eyes.
