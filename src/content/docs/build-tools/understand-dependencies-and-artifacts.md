---
title: Understand dependencies and artifacts
description: Choose dependency visibility and distinguish a development jar from a pack runtime artifact.
---

A dependency declaration chooses an artifact and the classpaths that can use
it. For example, an addon may need a library both to compile and to run, while
an inspection mod is useful only in its development environment. The
configuration also determines which dependencies other projects inherit when
they depend on your published mod.

The GTNH-specific configurations and jar names below follow GTNHGradle
**2.0.34** with RetroFuturaGradle (RFG) **2.0.6**. Check your checkout's selected
plugin versions when comparing another build.

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
[toolchain module](https://github.com/GTNewHorizons/GTNHGradle/blob/04d5d0f931b569497b00e493a0c9a9f606bd2f60/src/main/java/com/gtnewhorizons/gtnhgradle/modules/ToolchainModule.java)
wires them into the classpaths.

Use `api` when consumers need dependency types exposed by your public API.
For example, if a public method returns a library's type, callers need that
library on their compile classpath. Use `implementation` when the library
stays inside your implementation but is still needed at runtime.

A development-only inspection mod or test framework often belongs in a
non-published configuration. `compileOnly` requires another source for the
dependency at runtime, or an
[optional integration boundary](/GTNH-Dev-Doc/development-practices/isolate-optional-mod-integrations/).

These configurations describe classpaths and published dependency metadata.
They don't, by themselves, bundle the dependency's jar inside your mod.

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
[RFG task reference](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/e3eaceff02413a6a5e8ac23faa604fee6c91b537/docs/mcp-forge.md)
describes those tasks. Custom shaded, API, or runtime layouts need their own
repository instructions.

## Follow an API change into its consumer

Suppose a library adds a method and an addon calls it. The addon must compile
against an artifact containing that method, and its game run must load a
compatible runtime artifact. A neighboring checkout or successful library
build doesn't change the version the addon selects.

Use [Maven Local](/GTNH-Dev-Doc/testing/test-cross-repository-changes/)
for unpublished local work and `dependencyInsight` to verify selection.
For CI, the artifact must also be available online and pass the consumer's
dependency checks. The standard shared workflow rejects declarations containing
`-pre`, except `-preshadow`; an online prerelease can resolve successfully and
still fail CI. Follow the
[producer-to-consumer handoff](/GTNH-Dev-Doc/testing/test-cross-repository-changes/#prepare-the-submitted-changes)
to arrange publication of an accepted version and update the consumer. Then
[test the coordinated runtime jars in the pack](/GTNH-Dev-Doc/testing/test-a-change-in-the-full-pack/).
