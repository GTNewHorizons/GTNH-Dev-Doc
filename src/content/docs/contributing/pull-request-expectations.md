---
title: Pull request expectations
description: Prepare a focused GTNH pull request with reviewable evidence.
sidebar:
  order: 3
---

- Keep one feature or coherent change in each pull request. Use separate linked
  pull requests for dependent changes.
- Explain what changes, why it changes, and which part of the pack it affects.
- Write the title with changelog readers in mind.
- Link the issue, prior discussion, and dependent pull requests.
- Include a flowchart when required for a new recipe chain.
- State exactly how the change was tested.
- Target the branch named by the repository's current contribution instructions.

:::tip[Show visual changes]
For a visual change, include before-and-after screenshots taken from a comparable view. For a new visual implementation with no previous state, include screenshots showing the result. Add video when motion or interaction cannot be reviewed clearly in still images.
:::

Exclude unrelated cleanup because it complicates review and rollback.

Maintainers may include a pull request temporarily in a development build. The
author remains responsible for problems found there.
