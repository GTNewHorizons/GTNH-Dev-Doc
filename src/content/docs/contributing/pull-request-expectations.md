---
title: Pull request expectations
description: Give GTNH reviewers the scope, context, and evidence needed to assess your change.
---

A reviewer should be able to identify the problem, understand the resulting
behavior, and repeat the relevant checks from your pull request. Follow the
[contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
and fill out the owning repository's template.

## Make the change reviewable

Keep one feature or coherent change in a pull request. Put unrelated cleanup
in another change; it obscures the behavioral diff and complicates rollback.
Use clear commits that describe the work they contain.

Target the branch requested by the repository. For work spanning several
repositories, use separate linked pull requests and explain their dependency
and merge order. Fill out the template's dependency and AI-usage fields where
applicable.

## Explain the problem and result

Write a title that carries useful changelog context. For example,
“Fix battery charge display after reconnecting” tells readers which behavior
changes; “Fix GUI” leaves that work to the reviewer.

In the description, explain what changes, why, and which part of the pack is
affected. Link the issue and any design discussion. Name consequential behavior,
compatibility, or progression changes rather than making reviewers infer them
from the code.

For balance changes and new recipe chains, include the
[required balance answers and flowchart](/GTNH-Dev-Doc/contributing/before-you-code/#for-a-balance-change).

## Show the evidence

State the tested revision or artifacts, relevant environment, setup, action,
and observed result. Separate completed checks from important cases you could
not test. [Testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/)
helps you select those cases.

For visual changes, use comparable before-and-after screenshots. For new
visual behavior, show the result. Add video when motion or interaction cannot
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
