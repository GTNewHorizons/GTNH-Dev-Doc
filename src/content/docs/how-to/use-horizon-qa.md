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

Follow the consumer repository's existing convention. A typical dependency is:

```groovy
devOnlyNonPublishable('com.github.GTNewHorizons:Horizon-QA:VERSION:dev')
```

Use the version selected by the repository or pack. Test methods use
`@GameTest`, are `public static void`, and receive `GameTestHelper` first. Poll
observable state instead of using fixed delays. Label fixture positions and
register cleanup before global mutations.

## Run the exact test on a server

Inspect the repository for its server task, then pass each HQA property through
its own `--mcJvmArgs`:

```console
./gradlew runServer \
  --mcJvmArgs=-Dhorizonqa.mode=ci \
  --mcJvmArgs=-Dhorizonqa.tests=modid:Holder.method \
  --mcJvmArgs="-Dhorizonqa.reportDir=${PWD}/build/horizonqa"
```

Check the exit code, `TEST-horizonqa.xml`, and `horizonqa-result.json`. Exit `1`
means a test failure; exit `2` means an infrastructure, discovery, fixture,
cleanup, selection, or reporting error.
