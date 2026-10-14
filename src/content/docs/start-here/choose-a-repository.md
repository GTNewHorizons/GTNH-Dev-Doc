---
title: Choose a repository
description: Identify the owner of your change and the contribution path to follow.
prev:
  link: /GTNH-Dev-Doc/start-here/
  label: Make your first contribution
---

GTNH isn't one big repository. Mods, pack configuration, translations, and
build tools each live in their own repository, with their own setup. Find
the right one before you set anything up.

## Start from the change

No change in mind yet? Browse the
[GTNH issue tracker](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/issues)
for a problem you can reproduce, ideally in a part of the pack you know.

If you start from an issue, check whether it already links to code or a pull
request. If you start from something you saw in game, write down how to
reproduce it and note anything you can search for: an item or class name, a
recipe, or a log message.
[Find where a change belongs](/GTNH-Dev-Doc/contributing/find-where-a-change-belongs/)
shows how to turn those clues into the code or file responsible.

## Match the change to its owner

Where you see a problem isn't always where it's caused. A recipe for a
GregTech item, for example, might be added by a different mod. Use this
table to pick likely repositories, then confirm by finding the code.

| What you want to change | Where it probably lives |
| --- | --- |
| How a mod behaves (Java or Scala code) | That mod's repository in the [GTNewHorizons organization](https://github.com/GTNewHorizons). |
| Pack-specific code or recipes | The affected mod or [NewHorizonsCoreMod](https://github.com/GTNewHorizons/NewHorizonsCoreMod). Find where the recipe is registered to be sure. |
| Pack configuration, scripts, and bundled resources | [GT-New-Horizons-Modpack](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack). |
| Patches to Minecraft, Forge, or mods GTNH doesn't maintain | [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge). |
| Shared utility code used by many mods | [GTNHLib](https://github.com/GTNewHorizons/GTNHLib), or the library the calling code imports. |
| Shared build settings for GTNH mods | [GTNHGradle](https://github.com/GTNewHorizons/GTNHGradle). |
| Minecraft decompilation, mappings, and reobfuscation | [RetroFuturaGradle](https://github.com/GTNewHorizons/RetroFuturaGradle). |
| A template for a new mod | [ExampleMod1.7.10](https://github.com/GTNewHorizons/ExampleMod1.7.10). |
| Shared CI and release workflows for mods | [GTNH Actions Workflows](https://github.com/GTNewHorizons/GTNH-Actions-Workflows). |
| Merging and tagging across repositories | [MergeMasterXXL](https://github.com/GTNewHorizons/MergeMasterXXL). |
| Which mod versions go into a pack build | [DreamAssemblerXXL](https://github.com/GTNewHorizons/DreamAssemblerXXL). |
| Community translations | [GTNH-Translations](https://github.com/GTNewHorizons/GTNH-Translations). |
| This developer documentation | [GTNH-Dev-Doc](https://github.com/GTNewHorizons/GTNH-Dev-Doc). |
| In-game server regression tests | [Horizon-QA](https://github.com/GTNewHorizons/Horizon-QA). |

Once you have a candidate, read its README and look at the relevant code. A
mod's name or dependency list is a good hint, but the code that registers or
runs the behavior is what confirms it.

Hodgepodge holds patches for code GTNH can't change directly. If GTNH
maintains the mod you want to patch, fix it in that mod's repository instead.

Still not sure? Ask in the [official GTNH Discord](https://discord.gg/EXshrPV).
Say how to reproduce the problem and which repositories you've already checked.

## Check how well the mod is supported

A repository in the GTNewHorizons organization isn't necessarily actively
maintained. Check the
[mod support spreadsheet](https://docs.google.com/spreadsheets/d/1LHd8c4FLLHiJqsuTppF2XFTE6bh-mXE7afVwGbzOKms)
and its legend. Some mods in the pack come straight from upstream releases,
with no GTNH fork. If your fix needs a new fork, agree with the maintainers
on where it should live before creating one.

## Check the contribution rules

Before you write code, read the
[GTNH contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
and the repository's own instructions. Search its issues and pull requests too:
someone may already be working on the same thing.

Some changes need agreement first:

- **Major new content** must be discussed with the team before you build it.
- **Balance or progression changes** need input from people who know that part
  of the pack, and must meet the current balance requirements.

[Before you start coding](/GTNH-Dev-Doc/contributing/before-you-start-coding/)
explains both, and links the AI usage policy.

Finally, note which branch the repository wants pull requests to target. You'll
need it when you create your branch and when you open the pull request.

## Next steps

- **Mod code:** continue to
  [Set up your workspace](/GTNH-Dev-Doc/start-here/set-up-your-workspace/),
  then [Build and run](/GTNH-Dev-Doc/start-here/build-and-run/).
- **Translations, assets, pack data, or a repository's own docs:** clone it with
  [GitHub Desktop](/GTNH-Dev-Doc/contributing/contribute-with-github-desktop/)
  or [command-line Git](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#fork-and-clone),
  then follow its README.
- **This documentation:** use
  [Contribute to this documentation](/GTNH-Dev-Doc/contributing/contribute-to-this-documentation/).
- **A brand-new mod:** start from the
  [ExampleMod1.7.10 instructions](https://github.com/GTNewHorizons/ExampleMod1.7.10#getting-started).
  Download its starter archive; don't fork the example repository.

## Changes that span several repositories

Some changes touch more than one repository. Say an addon needs a new method
in a library. The library has to publish a version with that method, the addon
has to depend on that version, and the pack has to include both.

Merging in one repository doesn't update the others, so plan a separate pull
request for each repository, link them, and say which order they need to merge
in. To test them together before anything is published, see
[Test cross-repository changes](/GTNH-Dev-Doc/testing/test-cross-repository-changes/).
[The release pipeline](/GTNH-Dev-Doc/releases-and-maintenance/understand-the-gtnh-release-pipeline/)
explains how merged code ends up in published mods and pack builds. Published
mod files are hosted on [GTNH Maven](https://nexus.gtnewhorizons.com/), and
DreamAssemblerXXL picks which versions go into each pack.
