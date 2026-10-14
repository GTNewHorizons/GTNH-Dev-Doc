---
title: Pull request expectations
description: Give GTNH reviewers the scope, context, and evidence needed to assess your change.
---

A reviewer should be able to understand the problem, see how your change
affects the behavior, and repeat the relevant checks from your pull request.
Follow the
[contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
and fill out the owning repository's template.

## Make the change reviewable

Keep one feature or coherent change in a pull request. Put unrelated cleanup
in another change, because it makes the behavior harder to review and the
change harder to roll back.
Use clear commits that describe the work they contain.

Target the branch requested by the repository. For work spanning several
repositories, use separate linked pull requests and explain their dependency
and merge order. Fill out the template's dependency and AI-usage fields where
applicable.

## Explain the problem and result

Write a title that will make sense in a changelog. For example,
“Fix battery charge display after reconnecting” tells readers which behavior
changes; “Fix GUI” leaves that work to the reviewer.

In the description, explain what changes, why, and which part of the pack is
affected. Link the issue and any design discussion. Explain important changes to
behavior, compatibility, or progression so reviewers don't have to work them
out from the code.

For balance changes and new recipe chains, include the
[required balance answers and flowchart](/GTNH-Dev-Doc/contributing/before-you-start-coding/#for-a-balance-change).

## Show the evidence

Include the tested revision or artifacts, relevant environment, setup, action,
and what you observed. Make clear which checks you completed and which important
cases you couldn't test. [Testing expectations](/GTNH-Dev-Doc/testing/testing-expectations/)
helps you select those cases.

For visual changes, use comparable before-and-after screenshots. For new
visual behavior, show the result. Add video when motion or interaction can't
be assessed from still images.

## Keep the review current

Check the pull request's files and commits after pushing. Resolve failing
checks, respond to questions, and push revisions to the same branch. Rerun
checks affected by each revision and describe any change to the scope or
behavior in the description.

If you are reviewing another contributor's work, approve only what you
understand well enough to assess. Questions and constructive findings are
useful even when you cannot judge the whole change. The contribution guidelines
describe the project's review expectations.
