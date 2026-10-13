---
title: Map a change to the GTNH repositories
description: Distinguish mod source, pack data, shared tooling, and publication before choosing an owner.
---

GTNH's pack is assembled from many independently maintained projects.
The place where a symptom appears and the repository that controls it can
differ. Use this map to identify candidates, then
[trace the behavior to its source](/GTNH-Dev-Doc/how-to/find-change-location/).

## Match the change to its owner

| Concern | Candidate owner |
| --- | --- |
| Java or Scala behavior in a mod | That mod's source in the [GTNewHorizons organization](https://github.com/GTNewHorizons). |
| Pack-specific code or recipe registration | The affected mod or [NewHorizonsCoreMod](https://github.com/GTNewHorizons/NewHorizonsCoreMod); confirm the registration call site. |
| Pack configuration, scripts, and packaged resources | [GT-New-Horizons-Modpack](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack). |
| Minecraft, Forge, or external-mod patches requiring transformation | [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge). |
| Shared utility APIs | [GTNHLib](https://github.com/GTNewHorizons/GTNHLib) or the library named by the caller. |
| Shared build conventions | [GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle). |
| Minecraft development, mapping, and reobfuscation | [RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle). |
| A new mod's starting build and layout | [ExampleMod1.7.10](https://github.com/GTNewHorizons/ExampleMod1.7.10). |
| Reusable mod CI and release workflows | [GTNH Actions Workflows](https://github.com/GTNewHorizons/GTNH-Actions-Workflows). |
| Coordinated merging and tagging | [MergeMasterXXL](https://github.com/GTNewHorizons/MergeMasterXXL). |
| Pack manifests and assembled archives | [DreamAssemblerXXL](https://github.com/GTNewHorizons/DreamAssemblerXXL). |
| Community translations | [GTNH-Translations](https://github.com/GTNewHorizons/GTNH-Translations). |
| In-game server regression tests | [Horizon-QA](https://github.com/GTNewHorizons/Horizon-QA). |

For example, an item can come from one mod while a pack script or another mod
registers its recipe. Likewise, a Gradle error can be caused by the checkout's
configuration even when the failing task belongs to a plugin. Names and
dependency lists help you find candidates; registration and execution paths
establish ownership.

Hodgepodge centralizes patches applied through mixins and class transformation.
When GTNH maintains the target mod's source, prefer fixing the behavior in
that repository when possible.

## Separate ownership from support

Organization membership does not establish a mod's support level. Consult the
[mod support spreadsheet](https://docs.google.com/spreadsheets/d/1LHd8c4FLLHiJqsuTppF2XFTE6bh-mXE7afVwGbzOKms)
and its current legend. A consumed upstream mod may have no GTNH source fork.
Confirm the intended ownership with maintainers before creating one.

## Follow the artifact as well as the source

Mod source, a published mod jar, and an assembled pack are different outputs.
[GTNH Maven](https://nexus.gtnewhorizons.com/) hosts dependency artifacts;
DreamAssemblerXXL selects versions and builds pack archives.

For coordinated changes, identify the producer, consumer, and pack selection.
Link the required pull requests and their dependency order. A merge in one
repository does not immediately update the others; the
[release pipeline](/GTNH-Dev-Doc/concepts/release-pipeline/)
explains the boundaries to verify.
