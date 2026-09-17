---
title: Map a change to the GTNH repositories
description: Understand the main repository roles before choosing where to work.
sidebar:
  order: 1
---

A change can cross GTNH mod, pack-data, build-tooling, and automation
repositories.

## Identify the owning artifact

| Change concerns | Start with |
| --- | --- |
| Java or Scala behavior inside a mod | That mod's repository in the [GTNewHorizons organization](https://github.com/GTNewHorizons) |
| Mixin-based fixes or tweaks to Minecraft, Forge, or a bundled mod whose source cannot be changed directly | [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge) |
| Pack configuration, packaged resources, or pack-level data | [GT-New-Horizons-Modpack](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack) |
| Pack manifests and assembled downloads | [DreamAssemblerXXL](https://github.com/GTNewHorizons/DreamAssemblerXXL) |
| Shared GTNH Gradle conventions | [GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle) |
| Legacy Minecraft build mechanics | [RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle) |
| New mod starter and example layout | [ExampleMod1.7.10](https://github.com/GTNewHorizons/ExampleMod1.7.10) |
| Shared CI and release workflows | [GTNH Actions Workflows](https://github.com/GTNewHorizons/GTNH-Actions-Workflows) |
| Coordinated merge and tagging automation | [MergeMasterXXL](https://github.com/GTNewHorizons/MergeMasterXXL) |
| Published development artifacts | [GTNH Maven repository](https://nexus.gtnewhorizons.com/) |
| Translation work | [GTNH-Translations](https://github.com/GTNewHorizons/GTNH-Translations) |
| Repeatable in-game integration tests | [Horizon-QA](https://github.com/GTNewHorizons/Horizon-QA) |

Confirm ownership from current source, issues, dependencies, and maintainers.

Hodgepodge is GTNH's central repository and mod for patches that must modify
Minecraft, Forge, or another mod through mixins or class transformation. If
GTNH maintains the target mod's source, fix the behavior in that repository
instead of adding a Hodgepodge patch.

## Separate ownership from support

Organization membership does not define support level. Consult the
[mod support spreadsheet](https://docs.google.com/spreadsheets/d/1LHd8c4FLLHiJqsuTppF2XFTE6bh-mXE7afVwGbzOKms)
and its current legend.

A missing repository link may mean GTNH consumes the upstream mod unchanged.
Confirm in the Discord developer channels before creating a fork.

When a change crosses repositories, identify the dependency order and link every
required pull request. Do not assume merging one repository immediately updates
the assembled pack; follow the
[release pipeline](/GTNH-Dev-Doc/concepts/release-pipeline/).
