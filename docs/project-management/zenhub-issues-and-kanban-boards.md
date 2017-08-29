Managing Projects
=================

Zenhub: Github Issues + Kanban Boards
-------------------------------------

The Boards tab vs. the Projects tab
  * The Projects tab can be though of as a set of sub-boards which can group and track subsets of issues which are already on the main board.
  * Projects functionality is not normally used for client projects, as the main Boards tab can handle all needed Kanban functionality for a single client project.
  * Projects functionality may be used for some internal projects

Establishment of swimlane needs, called "Pipelines". (Will it be Tandem's standard layout, or will this particular project need a little something extra?)
  * Typical pipelines for a client project will be:
    * Backlog
    * Current Sprint (with start\stop dates)
    * Needs Client Action (optional)
    * In Development
    * In Internal QA
    * In Client Review (optional)
    * Closed (means “Done Done, merged, pushed, all tests passing, and accepted by Client)

**Bug Issues**
  * Reporting bugs internally
    * If estimate greater than 1 hr, report them into the backlog, else current sprint.
  * Client-reported bugs
  * Client are allowed, and encouraged, to create Bug issues
  * All Client bugs go into the backlog, for inclusion into the next sprint, unless deemed a P1 critical issue by both the Product Owner and the Scrummaster, in which case the bug will be included in the current sprint and velocity-equal amount of task(s) will be traded forward into the next sprint.

**Ticket Types**
  * Epics
    * Use them to group a series of Issues related to a larger functional feature
    * Not every Issue needs to be underneath an Epic
  * Issues
    * May be a Bug, Task, or Feature
    * May or may not have an actual User Story in it
    * Feature issues must contain a User Story

Handling Pull Requests
