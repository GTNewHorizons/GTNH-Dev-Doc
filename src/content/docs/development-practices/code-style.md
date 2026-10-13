---
title: Code style
description: Apply the repository's formatter and make the behavioral change readable in review.
---

Use the target repository's checked-in formatter configuration and CI checks
for exact layout rules. Keep formatting changes within the work you are
submitting so reviewers can identify the behavioral diff.

## Run the configured checks

From the repository root containing `gradlew`, run the build or check command
required by its README. Many GTNHGradle mods use Spotless; the
[code-style module](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/CodeStyleModule.java)
applies the shared formatting configuration when enabled.

When a Spotless check fails and the project provides the task, run:

```sh
./gradlew spotlessApply
```

On Windows PowerShell, use `.\gradlew.bat spotlessApply`. Inspect `git diff`
afterward: a formatter can change files outside your intended scope. Retain
the changes that belong to your contribution, then rerun the failed check.
Use [task discovery](/GTNH-Dev-Doc/how-to/gradle-tasks/) if the expected task
is absent.

## Make intent visible

Automated formatting does not settle naming or structure. Follow the
repository's conventions and choose names that identify the role of a value
or the action of a method. Keep related behavior near each other and expose
only the interface callers need.

Give a repeated or unexplained value a meaningful name; an ordinary small
literal does not need a constant solely because it is numeric. Comments should
explain intent, constraints, or a non-obvious choice. Update them with the
behavior and remove commented-out code that Git history already preserves.

Review the resulting diff as another contributor would: can they locate the
changed behavior, see why it changes, and distinguish it from formatting?
