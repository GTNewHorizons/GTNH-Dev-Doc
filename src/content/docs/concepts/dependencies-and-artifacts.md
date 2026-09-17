---
title: Understand dependencies and artifacts
description: Choose dependency visibility and follow artifacts between GTNH mods.
sidebar:
  order: 4
---

Dependency configuration controls both where a library is available and whether
mods that depend on yours inherit it:

| Configuration | Your mod | Dependent mods |
| --- | --- | --- |
| `api` | Compile and runtime | Compile and runtime |
| `implementation` | Compile and runtime | Runtime only |
| `compileOnly` | Compile only | Not visible |
| `compileOnlyApi` | Compile only | Compile only |
| `runtimeOnly` | Runtime only | Runtime only |
| `runtimeOnlyNonPublishable` | Runtime only | Not visible |
| `devOnlyNonPublishable` | Compile and runtime | Not visible |

Use `api` only when your public classes expose dependency types; otherwise
prefer `implementation`. The old `compile` configuration is deprecated. See the
[ExampleMod dependency declarations](https://github.com/GTNewHorizons/ExampleMod1.7.10/blob/master/dependencies.gradle)
for GTNH-specific examples.

A dependency coordinate identifies a published artifact, not a source checkout.
The repository's dependency declarations are authoritative for group, artifact,
version, classifier, and configuration. Use
[Maven Local](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
when an unpublished change must be consumed by another local repository.
