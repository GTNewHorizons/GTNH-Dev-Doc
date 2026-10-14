---
title: Official resources
description: Find the policy, source, support channel, or tool reference that owns a development question.
---

Use a mod's source and build configuration to check how it works, and the
maintained policy documents to check project policy and review requirements.

## Contribution and design

| Question | Resource |
| --- | --- |
| What contribution and balance requirements apply? | [GTNH contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md) |
| What conduct is expected? | [Developer's Code of Conduct](https://github.com/GTNewHorizons/.github/blob/master/CODE_OF_CONDUCT.md) |
| What AI assistance is permitted? | [AI usage policy](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/AI_POLICY.md) |
| What is the intended pack design? | [Modpack vision](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/vision%20of%20the%20modpack/original%20vision%20doc.md) |
| How do I edit quests? | [Quest development guide](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/blob/master/config/betterquesting/Readme.md) |
| Which StructureLib APIs define a multiblock? | [StructureLib documentation](https://www.gtnewhorizons.com/StructureLib/) |

The local [contribution guides](/GTNH-Dev-Doc/contributing/before-you-code/)
help you apply these requirements. The linked documents are where the policies
are maintained.

## Source, support, and pack testing

Use the [repository map](/GTNH-Dev-Doc/concepts/repository-map/)
to locate mod code, pack data, libraries, and tooling. The
[GTNewHorizons organization](https://github.com/GTNewHorizons)
contains their source, issues, and repository instructions.

Report pack-level symptoms through the
[central modpack issue tracker](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/issues),
following its template. For a confirmed project-specific bug, follow that
repository's reporting instructions.
[GTNH Discord](https://discord.gg/EXshrPV) provides community and developer
discussion; bring the reproduction, source locations, or relevant logs.

For assembled development packages, use
[GTNH Daily Builds](https://github.com/GTNewHorizons/GTNH-Daily-Builds/releases)
and [full-pack testing](/GTNH-Dev-Doc/how-to/test-in-full-pack/).
For installation, progression, and gameplay, use the
[official GTNH wiki](https://wiki.gtnewhorizons.com/).

## Tool references

| Task or mechanism | Owning reference |
| --- | --- |
| Forks and contribution branches | [GitHub's fork guide](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo) |
| Gradle tasks and configuration | [Gradle user manual](https://docs.gradle.org/current/userguide/userguide.html) |
| IDE import and Gradle selection | [IntelliJ Gradle settings](https://www.jetbrains.com/help/idea/gradle-settings.html) |
| Minecraft development and jar tasks | [RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle) |
| GTNH build conventions and properties | [GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle) |
| In-game server regression tests | [Horizon-QA documentation](https://www.gtnewhorizons.com/Horizon-QA/) |

Use the documentation matching the repository's selected version.
If a general guide and the checked-out implementation disagree, inspect the
difference and ask the owning maintainer before treating it as a shared rule.
