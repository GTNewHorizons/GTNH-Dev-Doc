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

- `README.md` and contribution files for repository-specific workflow;
- `.java-version` and Gradle toolchains for the expected JDK;
- `gradle/wrapper/gradle-wrapper.properties` for the Gradle version;
- `.github/workflows/` for the tasks and environment used by CI; and
- `gradle.properties` and dependency files for project settings.

Treat checked-in files as repository facts, not universal GTNH policy.
Next, [fork, clone, and import it](/GTNH-Dev-Doc/start-here/fork-clone-and-import/).
