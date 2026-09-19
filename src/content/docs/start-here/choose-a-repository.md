---
title: Choose a repository
description: Find the GTNH repository that owns the change you want to make.
sidebar:
  order: 2
---

Start from the issue or behavior. Search the
[GTNewHorizons organization](https://github.com/GTNewHorizons), then inspect
candidate README files, issues, and recent pull requests. A similarly named
project may only be a dependency.

If unclear, use
[Find where a change belongs](/GTNH-Dev-Doc/how-to/find-change-location/)
or ask in the [official GTNH Discord](https://discord.gg/EXshrPV) with your
findings. Do not open duplicate pull requests across repositories.

For a new standalone 1.7.10 mod, follow the current
[ExampleMod1.7.10 starter instructions](https://github.com/GTNewHorizons/ExampleMod1.7.10#getting-started).
Use its starter archive rather than forking the example repository.

## Read the repository as the specification

Inspect these files when present:

- The `README.md` and contribution files for the repository-specific workflow.
- The `.java-version` file and Gradle toolchains for the expected JDK.
- The `gradle/wrapper/gradle-wrapper.properties` file for the Gradle version.
- The `.github/workflows/` directory for the tasks and environment used by CI.
- The `gradle.properties` and dependency files for project settings.

Treat checked-in files as repository facts, not universal GTNH policy.
Next, [fork, clone, and import it](/GTNH-Dev-Doc/start-here/fork-clone-and-import/).
