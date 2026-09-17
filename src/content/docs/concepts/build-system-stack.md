---
title: Understand the GTNH build-system stack
description: Distinguish repository configuration, shared conventions, Minecraft tooling, and CI.
sidebar:
  order: 2
---

Several layers cooperate when a GTNH mod builds. Knowing which layer owns a
failure prevents copying obsolete fixes between repositories.

## Read the layers from the repository outward

1. **Gradle wrapper:** `gradlew`, `gradlew.bat`, and `gradle/wrapper/` select the
   Gradle distribution for this checkout.
2. **Repository configuration:** settings files, build files,
   `gradle.properties`, dependency declarations, and optional add-on scripts
   describe this project.
3. **GTNHGradle:** shared GTNH build conventions register optional modules and
   project behavior.
4. **RetroFuturaGradle:** supplies the underlying Minecraft 1.7.10 development
   and reobfuscation tooling.
5. **GitHub Actions:** the repository workflow selects the clean CI environment
   and tasks used remotely.

Follow the exact versions and plugins declared by the repository. A task or
property from another GTNH project is not automatically available here.

## Find the supported controls

Start with the repository's README and
[list its Gradle tasks](/GTNH-Dev-Doc/how-to/gradle-tasks/). In a
GTNHGradle project, the documented `propertiesHelp` task lists available
properties and their descriptions.

For repository-supported local customization, see
[Work with Gradle tasks](/GTNH-Dev-Doc/how-to/gradle-tasks/#use-local-overrides).

If a build migration or updater rewrites files, review the resulting diff as
code. Generated output is not evidence that the migration understood every
repository-specific customization.
