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
[Find where a change belongs](/GTNH-Dev-Doc/how-to/find-change-location/)
to trace that evidence to the code or data responsible.

Use the [repository map](/GTNH-Dev-Doc/concepts/repository-map/) to work out
whether you're looking for mod code, pack configuration, translations, or build
tooling. Read the candidate repository's README, then inspect the relevant
source. A dependency list tells you that a project is used, but that doesn't
tell you whether the fix belongs there.

If ownership remains unclear, ask in the
[official GTNH Discord](https://discord.gg/EXshrPV) with the reproduction and
repositories you have checked. For a change spanning several repositories,
work out the dependency order and plan separate, linked pull requests.

## Check the contribution requirements

Read the [GTNH contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
and the repository's own instructions before implementation. Check existing
issues and pull requests so you can build on work already underway.

Major new content must be discussed with the team before implementation.
For balance or progression changes, consult people familiar with the affected
area and follow the current balance requirements. Use
[Before you start coding](/GTNH-Dev-Doc/contributing/before-you-code/)
for the policy links, including the AI usage policy.

Note the branch the repository asks you to target. You will use it when
creating your working branch and opening the pull request.

## Choose the setup you need

- **Mod code:** continue to
  [Set up your workspace](/GTNH-Dev-Doc/start-here/fork-clone-and-import/),
  then [Build and run](/GTNH-Dev-Doc/start-here/build-and-run/).
- **Documentation, translations, assets, or pack data:** fork and clone the
  repository using the same [Git setup](/GTNH-Dev-Doc/start-here/fork-clone-and-import/#fork-and-clone).
  Follow its README for the editor, generators, and validation it needs.
- **A new standalone mod:** use the
  [ExampleMod1.7.10 starter](https://github.com/GTNewHorizons/ExampleMod1.7.10#getting-started).
  The project provides a starter archive; do not fork the example repository
  to create your mod.

You're ready to continue once you know which repository and branch to use,
what you want the change to do, and whether you need to discuss it with the team first.
