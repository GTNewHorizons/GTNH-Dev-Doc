---
title: Code style
description: Apply shared GTNH readability practices and the target repository's checks.
---

Use the target repository's formatting files, build tasks, and CI checks for
exact layout rules. GTNH's shared style aims to make changes easy to read and
review across mods. Do not reformat unrelated code while making a focused
change.

## Name and organize code for readers

- Use descriptive `PascalCase` names for classes and interfaces, and
  `camelCase` names for methods and variables. Methods should describe an
  action. Prefer recognizable words over obscure abbreviations.
- Keep related methods near one another so the behavior can be followed
  without jumping around a class. Avoid exposing fields when a narrower
  interface is sufficient.
- Name constants for values whose meaning would otherwise be unclear. An
  obvious small literal does not need a new constant solely to avoid a number.
- Write comments for intent or constraints that code alone cannot explain.
  Remove commented-out code. Git history preserves it. Update comments when
  changing the behavior they describe.

## Run the repository's style checks

1. Read the repository's README and inspect its formatter configuration and CI
   workflow. Many GTNH Gradle projects use Spotless. The available tasks depend
   on the target repository.
2. Run the repository's build or check task. If the output reports a Spotless
   violation and `spotlessApply` is available, run `./gradlew spotlessApply`
   (or `.\gradlew.bat spotlessApply` on Windows).
3. Review `git diff` after formatting. Keep the changes that belong to your
   pull request, then rerun the failed check. If the formatter and this page
   differ, follow the repository's checked-in configuration.

For style decisions the checks cannot settle, follow nearby code and explain
unusual choices in the pull request. The
[GTNHGradle code-style module](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/CodeStyleModule.java)
is a source reference for projects that use that module.
