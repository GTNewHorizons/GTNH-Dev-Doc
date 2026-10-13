---
title: Testing expectations
description: Choose checks that observe the behavior and boundaries changed by a GTNH contribution.
sidebar:
  order: 4
---

Test the behavior your change affects, then the boundaries it crosses.
A build checks source and configured tests; a game launch, saved-world check,
or pack integration test answers a different question. Choose the evidence
that can expose the failure you are fixing.

## Establish a comparison

For a bug fix, reproduce the problem on the unchanged version and retain that
setup. Repeat the same action after the change. For new behavior, define the
expected result before testing so a successful launch is not the only
acceptance condition.

Run the repository's relevant build and validation commands. Add a focused
automated regression test when it can observe the behavior reliably.
[Horizon-QA](/GTNH-Dev-Doc/how-to/use-horizon-qa/) can preserve server-side
in-game checks; client appearance and some interactions still need manual
inspection.

## Select the relevant cases

| Changed behavior | Evidence to collect |
| --- | --- |
| Documentation or generated configuration | Build or validate the files and inspect the rendered or generated result. |
| Isolated logic | A focused automated test and the repository's build checks. |
| Rendering, input, or GUI | Exercise the affected client path; show comparable screenshots or video for visual changes. |
| Server state or networking | Connect a client to a dedicated server and check validation, authority, and synchronization. |
| Saved state | Change the value, unload/reload its owner, and restart the world. Load data written by the previous version when compatibility is affected. |
| Optional-mod integration | Start with the mod absent and present; exercise supported API versions and the unsupported-version behavior. |
| Cross-mod behavior, recipes, or startup order | Test coordinated artifacts in a full development pack with the relevant configuration. |
| Tick or rendering performance | Repeat the same workload and compare measurements before and after the change. |

Several rows can apply to one change. A machine-mode fix, for example, may
need both a connected-client check and a saved-world check. Singleplayer does
not exercise the same physical class-loading boundary as a dedicated server.

Use [cross-repository testing](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
when an addon needs an unpublished API change, then
[test the artifacts in the full pack](/GTNH-Dev-Doc/how-to/test-in-full-pack/)
when pack interactions matter. Confirm the loaded versions so the test
actually exercises the intended code.

## Report enough to repeat the check

Include the commands or run configurations, relevant JDK and mod/pack versions,
test setup, action, expected result, and observed result. Identify any important
case left untested and explain the limitation.

For a manual check, “joined a dedicated server, changed the machine mode, and
verified it on a second client and after restart” is more useful than “tested
in game.” Screenshots support that evidence but cannot establish persistence
or synchronization on their own.
