---
title: GTNH development glossary
description: Look up the build, runtime, and collaboration terms used by the developer guides.
---

Use these definitions to identify a term, then follow its guide for the
mechanism or procedure. Version-specific settings come from the target
checkout.

## Build and source terms

| Term | Meaning |
| --- | --- |
| Artifact | A built or published file, such as a mod jar, source jar, or pack ZIP. |
| Classifier | The optional artifact label in a dependency coordinate, such as `dev` or `sources`. |
| Deobfuscated / deobf | Code or an artifact using developer-readable Minecraft names. Tooling maps runtime names for development. |
| Development jar | A jar intended for a development classpath; standard RFG packaging uses the `dev` classifier. |
| Gradle wrapper | The checkout's launch scripts and wrapper properties that select its Gradle distribution. |
| GTNHGradle | GTNH's shared build conventions for mod repositories, applied through configurable modules. |
| RetroFuturaGradle (RFG) | The plugin preparing the legacy Minecraft/Forge development environment and mapped artifacts. |
| Reobfuscation | Converting development references to the names required by the target game runtime. |
| Source set | A Gradle grouping of source and resources, such as `main`, `test`, or a project-specific generated set. |
| Task | A named Gradle operation registered by the project's build and plugins. |
| Toolchain | A selected compiler or Java installation used by a task; it can differ from the JDK running Gradle. |

See [build layers](/GTNH-Dev-Doc/concepts/build-system-stack/),
[Java selection](/GTNH-Dev-Doc/concepts/java-and-runtime-model/), and
[dependencies and artifacts](/GTNH-Dev-Doc/concepts/dependencies-and-artifacts/)
for the relationships between these terms.

## Minecraft and mod-development terms

| Term | Meaning |
| --- | --- |
| Access transformer (AT) | Configuration that changes access to selected Minecraft/Forge members through the build or loading machinery. |
| Development client | A game launched from a mod's configured development run with its selected dependencies and working directory. |
| Integrated server | The logical server running inside a physical client process for singleplayer. |
| Logical side | The client presentation/input role or the server's authoritative game-state role. |
| Physical side | The actual graphical client or dedicated-server process and its available classes. |
| Mixin | A bytecode transformation used to alter a target class without editing its source directly. |
| Metatile entity (GT5) | A machine implementation hosted by a base tile entity and using that tile's world lifecycle. |
| NBT (Named Binary Tag) | The typed tag format used for saved and transmitted Minecraft data. |
| Tile entity | A world object associated with a block position that can hold state and participate in its lifecycle. |

See [client/server boundaries](/GTNH-Dev-Doc/minecraft-forge-internals/client-server-boundaries/),
[NBT schemas](/GTNH-Dev-Doc/minecraft-forge-internals/nbt-schema/), and
[mixins and transformers](/GTNH-Dev-Doc/troubleshooting/mixins-and-transformers/).

## Collaboration and pack-build terms

| Term | Meaning |
| --- | --- |
| Fork | A GitHub repository copy under another account, commonly used for contribution branches. |
| Upstream | The original repository, or a remote pointing to it; remote names are local configuration. |
| Maven Local | A machine's local Maven repository used for unpublished artifact testing. |
| Manifest | The pack build's recorded selection of mod versions and related assembly data. |
| Shared workflow | A reusable GitHub Actions workflow called by a repository's own workflow. |
| Pre-release | A version published for development or coordinated testing; its tag convention and destination depend on the repository. |

Use [cross-repository testing](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
and [the release pipeline](/GTNH-Dev-Doc/concepts/release-pipeline/)
to follow an artifact into its consumer or pack.
