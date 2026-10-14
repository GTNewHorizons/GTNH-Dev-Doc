---
title: Use Horizon-QA GameTests
description: Select a server-side regression test, run it in development, and inspect its reported result.
---

Use [Horizon-QA](https://www.gtnewhorizons.com/Horizon-QA/) when a regression
depends on Minecraft server behavior: ticks, structures, machines, or mod
integration. Keep HQA on development and CI classpaths; a gameplay mod's
published dependency contract should remain independent of the test framework.

## Prepare the test

Use the consumer repository's selected HQA version and existing test layout.
For a new integration, follow
[Add Horizon-QA to your mod](https://www.gtnewhorizons.com/Horizon-QA/getting-started/mod-setup/).
That guide covers dependency configuration, structures, and release packaging.

Discovery requires a `@GameTestHolder` class and public static `@GameTest`
methods with the supported signature. Choose a test that observes the
changed behavior, including the failure you want to prevent. Follow HQA's
[first-test guide](https://www.gtnewhorizons.com/Horizon-QA/getting-started/first-test/)
for the fixture and assertion API.

## Run it interactively

Start the consumer's development server and connect its client. Interactive
mode is the default. With an operator account, run the full test ID, replacing
`modid:Holder.method` with yours:

```text
/horizonqa run modid:Holder.method
```

The `/qa` alias also works. Inspect a failed cell, fix the behavior, and use
`/horizonqa runthis` to rerun that cell. HQA's
[debugging guide](https://www.gtnewhorizons.com/Horizon-QA/guide/debugging/)
explains the available evidence and commands.

## Run a reported batch

Use a disposable development server. CI mode selects HQA's void-world policy
by default, runs the selection, and writes reports. From the consumer checkout
root, use its server task and pass each property to the **Minecraft JVM**
through a separate `--mcJvmArgs`.

This Bash example uses an absolute report directory and the test ID you chose:

```sh
./gradlew runServer \
  --mcJvmArgs=-Dhorizonqa.mode=ci \
  --mcJvmArgs=-Dhorizonqa.tests=modid:Holder.method \
  --mcJvmArgs="-Dhorizonqa.reportDir=${PWD}/build/horizonqa"
```

In PowerShell:

```powershell
$reportPath = Join-Path (Get-Location) 'build/horizonqa'
.\gradlew.bat runServer --mcJvmArgs=-Dhorizonqa.mode=ci --mcJvmArgs=-Dhorizonqa.tests=modid:Holder.method --mcJvmArgs="-Dhorizonqa.reportDir=$reportPath"
```

Passing `-Dhorizonqa.mode=ci` directly to Gradle sets it on the wrong JVM.
For a multi-project consumer, use its qualified server task.

Inspect `TEST-horizonqa.xml` and `horizonqa-result.json` in the report
directory. The JSON distinguishes a pass, required-test failure, and
infrastructure error; a missing or unmatched test is not a passing regression
check. Confirm the selected test and counts, then read the failure trace or
infrastructure issue.

Use the [CI and report guide](https://www.gtnewhorizons.com/Horizon-QA/guide/ci/)
for selectors, exit-code meanings, optional tests, and workflow integration.
Report the test ID, relevant versions, and observed result in your pull request.
