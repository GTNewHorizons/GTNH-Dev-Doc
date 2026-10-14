---
title: Understand the GTNH build-system stack
description: Identify which build layer owns a setting, task, or failed operation.
---

A GTNH mod's build combines repository-specific choices with shared Gradle
plugins and Minecraft tooling. Knowing which part controls a setting helps you
find the supported way to change it, or the implementation to inspect when it fails.

## Follow one build from the checkout

The **Gradle wrapper** starts the distribution selected by
`gradle/wrapper/gradle-wrapper.properties`. The repository's settings and
build files select plugins and describe the project. Properties, dependency
declarations, and supported add-on scripts provide the inputs for that build.

[GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle) applies shared
conventions through configurable modules: versioning, toolchains, formatting,
IDE runs, and publication are examples. It builds on
[RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle),
which prepares the legacy Minecraft/Forge development environment and the
mapped and reobfuscated artifacts.

A repository workflow then runs those tasks in GitHub Actions. Some
repositories call the shared
[GTNH Actions Workflows](https://github.com/GTNewHorizons/GTNH-Actions-Workflows);
the caller selects the revision, environment, inputs, and permissions.

## Locate the control that affects your problem

| Observation or desired change | Inspect first |
| --- | --- |
| Which Gradle distribution starts | Wrapper properties and wrapper launch output. |
| Which plugin version or module is active | Settings/build files and `gradle.properties`. |
| Which mod version is resolved | Dependency and repository declarations, then `dependencyInsight`. |
| Which Java installation compiles or runs code | [Java and runtime selection](/GTNH-Dev-Doc/concepts/understand-java-and-runtime-selection/). |
| How a Minecraft task or remapped jar works | The matching RFG task and its configured inputs. |
| Why local and CI behavior differ | The caller workflow, called workflow, and their exact revisions. |

A missing task can mean the checkout uses another plugin version or disables
the module that registers it. A dependency-resolution error can occur during
configuration before any requested task executes. Identify the failed
operation before applying a fix from another project.

## Customize through the supported inputs

Use the repository's README and
[task/property discovery](/GTNH-Dev-Doc/how-to/work-with-gradle-tasks/)
to find the intended entry point. GTNHGradle's `propertiesHelp` describes
its configurable properties. Use repository-supported local add-on files for
personal run tweaks.

A build-system update can replace shared files, so you may need to adjust
your customizations afterward. Review the diff and rerun the repository's
checks. Even a generated migration needs to preserve the project's behavior.

Pack assembly is a separate process:
[DreamAssemblerXXL selects published mod artifacts](/GTNH-Dev-Doc/concepts/understand-the-gtnh-release-pipeline/)
rather than running each mod checkout's development client.

## Inspect the legacy implementation

After development setup and IDE import, use **Navigate → Class** to open the
Minecraft or Forge class named by an internals guide. Confirm the checkout's
Minecraft and Forge versions before comparing it with newer documentation.

RFG's [source-preparation tasks](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/master/docs/mcp-forge.md)
decompile, patch, and remap the game sources. The standard output is
`build/rfg/mcp_patched_minecraft-sources.jar`. If the IDE cannot resolve those
sources, follow [IntelliJ problems](/GTNH-Dev-Doc/troubleshooting/intellij-problems/)
and the setup task output instead of using an unrelated source version.
