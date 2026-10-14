---
title: Understand the GTNH build-system stack
description: Identify which build layer owns a setting, task, or failed operation.
---

A GTNH mod's build combines the checkout's settings with shared Gradle plugins
and Minecraft tooling. Follow the task through those layers to find where a
setting comes from or which implementation to inspect when it fails.

## Follow one build from the checkout

When you run `./gradlew runClient`, the **Gradle wrapper** first starts the
distribution selected by `gradle/wrapper/gradle-wrapper.properties`. Gradle
reads the repository's settings and build files, which select plugins and
describe the project. Properties, dependency declarations, and supported
add-on scripts configure the build.

[GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle) applies shared
conventions through configurable modules: versioning, toolchains, formatting,
IDE runs, and publication are examples. It builds on
[RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle),
which prepares the legacy Minecraft/Forge development environment and the
mapped and reobfuscated artifacts. The configured client task can then launch
Minecraft in its own JVM. That game's Java selection can differ from the one
running Gradle.

In CI, a repository workflow invokes the build's tasks in GitHub Actions. Some
repositories call the shared
[GTNH Actions Workflows](https://github.com/GTNewHorizons/GTNH-Actions-Workflows);
the caller selects the revision, environment, inputs, and permissions.

## Locate the control that affects your problem

| Observation or desired change | Inspect first |
| --- | --- |
| Which Gradle distribution starts | Wrapper properties and wrapper launch output. |
| Which plugin version or module is active | Settings/build files and `gradle.properties`. |
| Which mod version is resolved | Dependency and repository declarations, then `dependencyInsight`. |
| Which Java installation compiles or runs code | [Java and runtime selection](/GTNH-Dev-Doc/build-tools/understand-java-and-runtime-selection/). |
| How a Minecraft task or remapped jar works | The matching RFG task and its configured inputs. |
| Why local and CI behavior differ | The caller workflow, called workflow, and their exact revisions. |

A missing task can mean the checkout uses another plugin version or disables
the module that registers it. A dependency-resolution error can occur during
configuration before any requested task executes. Identify the failed
operation before applying a fix from another project.

## Customize through the supported inputs

Use the repository's README and
[task/property discovery](/GTNH-Dev-Doc/build-tools/work-with-gradle-tasks/)
to find the intended entry point. GTNHGradle's `propertiesHelp` describes
its configurable properties. Use repository-supported local add-on files for
personal run tweaks.

A build-system update can replace shared files, so you may need to adjust
your customizations afterward. Review the diff and rerun the repository's
checks to confirm that the updated build still does what the project needs.

Pack assembly is a separate process:
[DreamAssemblerXXL selects published mod artifacts](/GTNH-Dev-Doc/releases-and-maintenance/understand-the-gtnh-release-pipeline/)
rather than running each mod checkout's development client.

## Inspect the legacy implementation

After development setup and IDE import, use **Navigate → Class** to open the
Minecraft or Forge class named by an internals guide. Confirm the checkout's
Minecraft and Forge versions before comparing it with newer documentation.

RFG's [source-preparation tasks](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/e3eaceff02413a6a5e8ac23faa604fee6c91b537/docs/mcp-forge.md)
decompile, patch, and remap the game sources. The standard output is
`build/rfg/mcp_patched_minecraft-sources.jar`. If the IDE cannot resolve those
sources, follow [IntelliJ problems](/GTNH-Dev-Doc/troubleshooting/intellij-problems/)
and the setup task output instead of using an unrelated source version.
