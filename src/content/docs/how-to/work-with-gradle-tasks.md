---
title: Work with Gradle tasks
description: Discover a checkout's tasks, inspect their options, and choose a supported local override.
---

Run these commands from the repository root containing its checked-in wrapper,
`gradlew`. On Windows PowerShell, replace `./gradlew` with `.\gradlew.bat`.

For a known operation, start with the README or CI command. In a GTNHGradle
mod, the usual entry points are `build`, `runClient`, and `runServer`;
[Build and run](/GTNH-Dev-Doc/start-here/build-and-run/) explains that workflow.
If you're unfamiliar with the task or its options, look them up below.

## List the tasks

```sh
./gradlew tasks
```

Expect a grouped list of the project's main tasks. Include additional tasks
with:

```sh
./gradlew tasks --all
```

Use the checked-in wrapper to keep the intended Gradle version. Listing tasks
configures the build, so configuration can fail before the report appears.
Listing tasks doesn't compile the mod or show that the game can launch. If the
build fails before the report appears, follow
[Gradle problems](/GTNH-Dev-Doc/troubleshooting/gradle-problems/).

## Inspect the task and its inputs

Replace `TASK-NAME` with a listed task:

```sh
./gradlew help --task TASK-NAME
```

The report identifies the path, type, options, and available description.
For a multi-project build, use the qualified path, such as `:module:task`.
For another supported game runtime, use its generated Java-specific task.

The [Gradle task reference](https://docs.gradle.org/current/userguide/command_line_interface.html#sec:listing_tasks)
describes these reports. GTNHGradle also provides `propertiesHelp` to list
its configurable properties:

```sh
./gradlew propertiesHelp
```

Use the [plugin README](https://github.com/GTNewHorizons/GTNHGradle)
and your checkout to determine whether a property or module applies.

## Use local overrides

Prefer a documented property to changing shared build logic. The
[ExampleMod advanced guide](https://github.com/GTNewHorizons/ExampleMod1.7.10#advanced)
supports `addon.local.gradle[.kts]` for local tweaks and
`addon.late.local.gradle[.kts]` for tweaks that need later buildscript values.
Confirm support and Git ignore rules in the target repository before adding
one. Keep personal paths and run arguments out of committed configuration.

When a known task fails, keep its command and first failing task.
Add `--stacktrace` for the exception chain and `--info` when dependency or
execution details remain unclear. Use
[Locate logs](/GTNH-Dev-Doc/how-to/locate-logs-and-useful-errors/)
to collect the output needed for diagnosis.
