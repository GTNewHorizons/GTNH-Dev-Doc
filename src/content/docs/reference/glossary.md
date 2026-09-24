---
title: GTNH development glossary
description: Concise definitions for terms encountered while contributing to GTNH repositories.
sidebar:
  order: 1
---

## Build and source terms

**Deobfuscated / deobf**
: Code or an artifact using developer-readable Minecraft names. Dependency
  handling is part of the tooling. Do not manually copy a player jar into a
  development classpath. See
  [RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle).

**Gradle wrapper**
: The checked-in `gradlew`, `gradlew.bat`, and `gradle/wrapper/` files that select
  the repository's Gradle distribution. Use it instead of assuming a global
  Gradle version.

**GTNHGradle**
: GTNH's plugin containing shared build logic for many 1.7.10 mod repositories.
  Its [README](https://github.com/GTNewHorizons/GTNHGradle) describes the scope
  and available property help.

**RetroFuturaGradle (RFG)**
: A Gradle plugin for Minecraft 1.7.10 mod development. Its
  [repository](https://github.com/GTNewHorizons/RetroFuturaGradle) documents the
  supported build-tooling role and task references.

**Source set**
: A Gradle grouping of source and resource directories, commonly `main` or
  `test`. Ask the Gradle project model where generated and custom sources belong.

**Task**
: A named Gradle operation. Available tasks depend on the plugins and modules in
  the current repository. List them before relying on a name.

## Minecraft mod-development terms

**Access transformer (AT)**
: Configuration that changes access to Minecraft or Forge members during
  development/build processing. ExampleMod documents its current
  [AT support and caveats](https://github.com/GTNewHorizons/ExampleMod1.7.10#forges-access-transformers).

**Mixin**
: Runtime bytecode transformation used to inject or redirect behavior without
  editing the target class directly. ExampleMod links current
  [GTNH-oriented examples](https://github.com/GTNewHorizons/ExampleMod1.7.10#mixins).

**Development client**
: A game instance launched from the repository's development configuration. It
  is not a normal player installation and may use generated assets, arguments,
  and a repository-specific working directory.

**Reobfuscation**
: The build step that converts developer-readable references into the names
  expected by the target Minecraft runtime. RFG handles this as part of its
  1.7.10 toolchain.

## Collaboration terms

**Fork**
: Your GitHub copy of a repository, commonly used to push contributor branches.
  The GTNewHorizons repository remains the upstream source.

**Upstream**
: The original repository or a Git remote pointing to it. Check `git remote -v`
  instead of assuming remote names.

**Shared workflow**
: A reusable GitHub Actions workflow invoked by another repository. Follow the
  referenced file and revision to see the real build steps. The
  [GTNH Actions Workflows repository](https://github.com/GTNewHorizons/GTNH-Actions-Workflows)
  contains current organization-wide examples.
