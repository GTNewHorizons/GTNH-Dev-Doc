---
title: Use Horizon-QA GameTests
description: Add and run focused in-game integration tests for GTNH mods.
sidebar:
  order: 6
---

Use [Horizon-QA](https://github.com/GTNewHorizons/Horizon-QA) for server behavior:
lifecycle, ticks, structures, GregTech machines, and cross-mod integration. Keep
it on development and CI classpaths, never as a gameplay dependency. Use the
[official Horizon-QA documentation](https://www.gtnewhorizons.com/Horizon-QA/)
for the complete API and configuration reference.

## Add one focused test

Follow the consumer repository's existing test layout and use the HQA version
selected by the repository or pack. For a new setup, follow
[Add Horizon-QA to your mod](https://www.gtnewhorizons.com/Horizon-QA/getting-started/mod-setup/)
for the dependency and source layout. Its
[test discovery requirements](https://www.gtnewhorizons.com/Horizon-QA/getting-started/mod-setup/#test-discovery)
include `@GameTestHolder` on the holder class as well as `@GameTest` on methods.

Choose a test that observes the changed server behavior. Use HQA's
[getting-started path](https://www.gtnewhorizons.com/Horizon-QA/getting-started/)
for authoring, fixtures, and execution details.

## Run the exact test on a server

Inspect the repository for its server task, then pass each HQA property through
its own `--mcJvmArgs`:

```console
./gradlew runServer \
  --mcJvmArgs=-Dhorizonqa.mode=ci \
  --mcJvmArgs=-Dhorizonqa.tests=modid:Holder.method \
  --mcJvmArgs="-Dhorizonqa.reportDir=${PWD}/build/horizonqa"
```

Check the process exit code, `TEST-horizonqa.xml`, and `horizonqa-result.json`.
Use HQA's [CI and report guide](https://www.gtnewhorizons.com/Horizon-QA/guide/ci/)
to interpret test failures and infrastructure errors. Report the selector and
results with your pull request.
