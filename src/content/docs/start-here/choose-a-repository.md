---
title: Choose a repository
description: Identify the owner of your change and the contribution path to follow.
---

Find the repository that owns the change before setting up a development
workspace. GTNH includes mod source, pack data, translations, and tooling in
separate repositories; their build requirements differ.

## Start from the change

If you have not chosen a change yet, browse the
[GTNH issue tracker](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/issues)
for a problem you can reproduce in an area of the pack you know.

For an existing issue, check its linked source and pull requests. If you
start from a bug in game, keep the reproduction steps and relevant log,
recipe, item, or class name. Use
[Find where a change belongs](/GTNH-Dev-Doc/contributing/find-where-a-change-belongs/)
to trace that evidence to the code or data responsible.

## Match the change to its owner

GTNH's pack is assembled from many independently maintained projects.
The place where a symptom appears and the repository that controls it can
differ. Use this table to identify candidates, then trace the behavior to
its source.

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
| This developer documentation | [GTNH-Dev-Doc](https://github.com/GTNewHorizons/GTNH-Dev-Doc). |
| In-game server regression tests | [Horizon-QA](https://github.com/GTNewHorizons/Horizon-QA). |

Read the candidate repository's README, then inspect the relevant source.
For example, an item can come from one mod while a pack script or another mod
registers its recipe. Likewise, a Gradle error can be caused by the checkout's
configuration even when the failing task belongs to a plugin. Names and
dependency lists help you find candidates. Follow the registration and
execution paths to work out which repository owns the behavior.

Hodgepodge centralizes patches applied through mixins and class transformation.
When GTNH maintains the target mod's source, prefer fixing the behavior in
that repository when possible.

If ownership remains unclear, ask in the
[official GTNH Discord](https://discord.gg/EXshrPV) with the reproduction and
repositories you have checked.

## Separate ownership from support

Being in the organization doesn't tell you a mod's support level. Check the
[mod support spreadsheet](https://docs.google.com/spreadsheets/d/1LHd8c4FLLHiJqsuTppF2XFTE6bh-mXE7afVwGbzOKms)
and its current legend. A consumed upstream mod may have no GTNH source fork.
Check with maintainers who should own the fork before creating one.

## Check the contribution requirements

Read the [GTNH contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
and the repository's own instructions before implementation. Check existing
issues and pull requests so you can build on work already underway.

Major new content must be discussed with the team before implementation.
For balance or progression changes, consult people familiar with the affected
area and follow the current balance requirements. Use
[Before you start coding](/GTNH-Dev-Doc/contributing/before-you-start-coding/)
for the policy links, including the AI usage policy.

Note the branch the repository asks you to target. You will use it when
creating your working branch and opening the pull request.

## Choose the setup you need

- **Mod code:** continue to
  [Set up your workspace](/GTNH-Dev-Doc/start-here/set-up-your-workspace/),
  then [Build and run](/GTNH-Dev-Doc/start-here/build-and-run/).
- **Documentation, translations, assets, or pack data:** fork and clone the
  repository with [GitHub Desktop](/GTNH-Dev-Doc/contributing/contribute-with-github-desktop/)
  or the [command-line Git setup](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#fork-and-clone).
  Follow its README for the editor, generators, and validation it needs.
- **A new standalone mod:** use the
  [ExampleMod1.7.10 starter](https://github.com/GTNewHorizons/ExampleMod1.7.10#getting-started).
  The project provides a starter archive; do not fork the example repository
  to create your mod.

## Follow the artifact as well as the source

Mod source, a published mod jar, and an assembled pack are different outputs.
[GTNH Maven](https://nexus.gtnewhorizons.com/) hosts dependency artifacts;
DreamAssemblerXXL selects versions and builds pack archives.

For coordinated changes, identify the producer, consumer, and pack selection.
Plan separate, linked pull requests and their dependency order. A merge in one
repository does not immediately update the others; the
[release pipeline](/GTNH-Dev-Doc/releases-and-maintenance/understand-the-gtnh-release-pipeline/)
explains the boundaries to verify.
