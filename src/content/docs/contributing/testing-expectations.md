---
title: Testing expectations
description: Match GTNH test evidence to the risk and integration surface of a change.
sidebar:
  order: 4
---

Run the repository's relevant build checks and exercise the changed behavior in
its development environment.

Use a current full development pack for changes involving other mods, pack
configuration, recipes, world data, or startup order. Test coordinated artifact
versions together with
[Maven Local](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/) or
an online pre-release that CI can resolve.

:::tip[Report reviewable evidence]
Report commands, environment, tested behavior, and result in the pull request.
Screenshots complement behavioral tests; they do not replace them.
:::
