---
title: Understand the GTNH release pipeline
description: Trace a merged change through a tagged mod artifact, pack manifest, and assembled download.
---

If a fix has merged but your daily build still shows the bug, check how far
the change reached. A merge updates source; players receive an assembled pack
containing selected mod artifacts and pack data. Trace the commit through its
tag, published jar, and the pack build's manifest to find what was included.

## Follow one mod change

1. The change lands on the owning repository's target branch.
2. A tag selects a commit for publication. Some mods use coordinated
   MergeMasterXXL tagging; others need an authorized manual release.
3. In repositories using the standard
   [tag workflow](https://github.com/GTNewHorizons/GTNH-Actions-Workflows/blob/master/templates/release-tags.yml),
   pushing the tag calls the shared
   [release build](https://github.com/GTNewHorizons/GTNH-Actions-Workflows/blob/master/.github/workflows/release-tags.yml).
4. The release build produces jars and publishes to its configured destinations.
   GitHub Releases and Maven are separate outputs; verify the destination
   needed by the consumer.
5. DreamAssemblerXXL records selected mod versions in a pack manifest,
   assembles their artifacts with pack data, and produces downloads.
6. The build's published archive is the artifact the player or tester installs.

Mod and pack versions are separate. A new mod release can exist before a pack
selects it, and a pack can change configuration without changing that mod.

## Understand development pack selection

[DreamAssemblerXXL](https://github.com/GTNewHorizons/DreamAssemblerXXL)
owns manifests and assembly. Its daily and experimental workflows generate
their corresponding manifests and packages. Inspect the manifest from the
run you're checking. A later update to `master` doesn't tell you what an
earlier archive contains.

Daily packages are published in
[GTNH Daily Builds](https://github.com/GTNewHorizons/GTNH-Daily-Builds/releases).
Experimental packages are available through the experimental workflow's
artifacts. Their
[daily](https://github.com/GTNewHorizons/DreamAssemblerXXL/blob/master/.github/workflows/daily-modpack-build.yml)
and [experimental](https://github.com/GTNewHorizons/DreamAssemblerXXL/blob/master/.github/workflows/experimental-modpack-build.yml)
workflows define the current selection and publication steps.

## Interpret a pack version in context

Names such as `2.9.0-beta-1`, `2.9.0-rc-1`, and `2.9.0` distinguish
beta, release-candidate, and stable builds. Maintenance releases use names
such as `2.9.1`. Use the
[modpack release notes](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/releases)
for the changes and migration instructions attached to the specific build.

The version label alone doesn't tell you whether saves are compatible or a
particular bug is fixed. Check the included artifacts and test affected
existing data when necessary.

## Find the boundary where a change stopped

| Evidence | What it establishes |
| --- | --- |
| Merged commit | The source branch contains the change. |
| Tag containing that commit | That version selects source containing the change. |
| Published mod artifact | The relevant publication completed. |
| Manifest selecting that version | The pack build selected the artifact. |
| Matching archive and startup/mod list | The installed test contains the intended version. |
| Repeated reproduction | The changed behavior works in the tested setup. |

Start at the earliest stage you cannot verify: for example, a tag without the
required Maven artifact, or a released mod version absent from the pack
manifest. A green mod CI run alone does not establish that the fix reached
the pack. Maintainers can use
[release operations](/GTNH-Dev-Doc/releases-and-maintenance/release-operations/)
or [daily builds](/GTNH-Dev-Doc/releases-and-maintenance/run-a-daily-modpack-build-manually/)
for the corresponding operations.
