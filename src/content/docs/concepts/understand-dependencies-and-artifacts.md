---
title: Understand dependencies and artifacts
description: Choose dependency visibility and distinguish a development jar from a pack runtime artifact.
---

A dependency declaration chooses an artifact and the classpaths that can use
it. When you publish the mod, you also decide which dependencies a consumer
inherits. Adding a jar to a development run doesn't necessarily publish it as
part of your mod's dependency contract.

## Choose the required visibility

| Configuration | Your main code | A normal Gradle consumer |
| --- | --- | --- |
| `api` | Compile and runtime | Compile and runtime |
| `implementation` | Compile and runtime | Runtime |
| `compileOnly` | Compile | Not inherited |
| `compileOnlyApi` | Compile | Compile |
| `runtimeOnly` | Runtime | Runtime |
| `runtimeOnlyNonPublishable` | Runtime | Not published |
| `devOnlyNonPublishable` | Compile and runtime | Not published |

The last two are GTNH conventions, not universal Gradle configurations.
The [ExampleMod declarations](https://github.com/GTNewHorizons/ExampleMod1.7.10/blob/master/dependencies.gradle)
describe their intended uses; GTNHGradle's
[toolchain module](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/ToolchainModule.java)
wires them into the classpaths.

Use `api` when consumers need dependency types exposed by your public API.
Use `implementation` for an internal dependency that is still needed at
runtime. A development-only inspection mod or test framework often belongs
in a non-published configuration. `compileOnly` requires another source for
the dependency at runtime, or an
[optional integration boundary](/GTNH-Dev-Doc/development-practices/isolate-optional-mod-integrations/).

The [Java Library plugin](https://docs.gradle.org/current/userguide/java_library_plugin.html#sec:java_library_configurations_graph)
defines the standard configurations. Use modern names for new declarations;
legacy `compile` compatibility depends on the checkout's build support.

## Read the artifact coordinates

For the usual `group:artifact:version:classifier` notation, the group and
artifact identify the published module, the version selects a publication,
and the optional classifier selects a variant such as `dev` or `sources`.
A coordinate refers to a published file, not the source checkout next to yours.

In standard RFG packaging, the `-dev` jar uses development names and the
unclassified reobfuscated jar is the pack runtime artifact. The
[RFG task reference](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/master/docs/mcp-forge.md)
describes those tasks. Custom shaded, API, or runtime layouts need their own
repository instructions.

## Follow an API change into its consumer

Suppose a library adds a method and an addon calls it. The addon must compile
against an artifact containing that method, and its game run must load a
compatible runtime artifact. A neighboring checkout or successful library
build doesn't change the version the addon selects.

Use [Maven Local](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
for unpublished local work and `dependencyInsight` to verify selection.
For CI and reviewers, publish an online pre-release through the authorized
release process. Then
[test the coordinated runtime jars in the pack](/GTNH-Dev-Doc/how-to/test-a-change-in-the-full-pack/).
