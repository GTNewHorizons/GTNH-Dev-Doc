---
title: Code style
description: Apply the repository's formatter and make the behavioral change readable in review.
---

Use the target repository's checked-in formatter configuration and CI checks
for exact layout rules. Keep formatting changes within the work you're
submitting so reviewers can see what behavior changed.

## Run the configured checks

From the repository root containing `gradlew`, run the build or check command
required by its README. Many GTNHGradle mods use Spotless; the
[code-style module](https://github.com/GTNewHorizons/GTNHGradle/blob/04d5d0f931b569497b00e493a0c9a9f606bd2f60/src/main/java/com/gtnewhorizons/gtnhgradle/modules/CodeStyleModule.java)
applies the shared formatting configuration when enabled.

When a Spotless check fails and the project provides the task, run:

```sh
./gradlew spotlessApply
```

On Windows PowerShell, use `.\gradlew.bat spotlessApply`. Inspect `git diff`
afterward: a formatter can change files outside your intended scope. Keep
the changes that belong to your contribution, then rerun the failed check.
Use [task discovery](/GTNH-Dev-Doc/build-tools/work-with-gradle-tasks/) if the expected task
is absent.

## Make intent visible

Automated formatting doesn't settle naming or structure. Follow the
repository's conventions and choose names that identify the role of a value
or the action of a method. Keep related behavior together and expose
only the interface callers need.

Give a repeated or unexplained value a meaningful name; an ordinary small
literal does not need a constant solely because it is numeric. Comments should
explain intent, constraints, or a non-obvious choice. Update them with the
behavior and remove commented-out code that Git history already preserves.

Review the resulting diff as another contributor would: can they locate the
changed behavior, see why it changes, and distinguish it from formatting?
