---
title: Testing expectations
description: Match GTNH test evidence to the risk and integration surface of a change.
sidebar:
  order: 4
---

Run the repository's relevant build checks and exercise the changed behavior in
its development environment. Start with the narrowest test that can fail for
the changed behavior, then cover the boundaries the change crosses.

## Match evidence to the change

| Change | Minimum useful evidence |
| --- | --- |
| Documentation or configuration | Build or validate the affected files and inspect the rendered or generated result. |
| Isolated Java logic | Run the focused automated test and the repository's normal build. |
| Client rendering, input, or GUI behavior | Exercise the changed path in a development client and capture comparable screenshots or video when the result is visual. |
| Server-owned state or networking | Start a dedicated server, connect a client, and verify authority, validation, and synchronization. |
| Saved world or tile state | Change the state, unload and reload it, restart the world, and test data written by the previous version when compatibility is relevant. |
| Optional-mod integration | Test with the dependency present and absent; test supported version differences when the integration handles them. |
| Cross-mod behavior, recipes, or startup order | Test the coordinated artifacts together in a current full development pack. |
| Tick, rendering, or other performance-sensitive code | Confirm behavior under representative load and compare measurements before and after the change. |

Use [Horizon-QA](/GTNH-Dev-Doc/how-to/use-horizon-qa/) when an in-game server
test can preserve the regression as an automated check. A manual test is still
appropriate when automation would not observe the behavior reliably.

## Test the relevant boundaries

Do not treat a successful compilation as evidence that runtime behavior works.
Check each boundary the change affects:

- client and dedicated-server class loading;
- logical client and server ownership;
- save, unload, reload, and restart behavior;
- dependency presence, version, and startup order;
- clean checkout and CI behavior; and
- existing worlds or configurations that must remain compatible.

Use a current full development pack for changes involving other mods, pack
configuration, recipes, world data, or startup order. Test coordinated artifact
versions together with
[Maven Local](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/) or
an online pre-release that CI can resolve.

## Report reproducible evidence

In the pull request, state:

- the exact commands or run configurations used;
- the tested JDK, environment, and relevant mod or pack versions;
- the setup and action performed;
- the expected and observed result; and
- any important case that was not tested, with the reason.

:::tip[Report reviewable evidence]
Screenshots complement behavioral tests; they do not replace them.
:::
