---
title: Test a change in the full pack
description: Verify a modified mod or pack file in an assembled GTNH development build.
sidebar:
  order: 5
---

Use this procedure when a change affects other mods, recipes, pack
configuration, saved data, or startup order. Test mod code in its development
environment or run the relevant checks for pack files in their owning repository
first. Then check that the assembled pack loads the intended change and behaves
as expected.
Choose test cases from the
[testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/).

## Prepare a daily build

1. Open the [GTNH Daily Builds releases](https://github.com/GTNewHorizons/GTNH-Daily-Builds/releases)
   and choose a release that does not already include your change. Record its
   release tag. Under **Assets**, download the `mmcprism-java8.zip` or
   `mmcprism-java17-26.zip` client archive for the game Java version you will
   test. The [daily build workflow](https://github.com/GTNewHorizons/DreamAssemblerXXL/blob/master/.github/workflows/daily-modpack-build.yml)
   defines the current asset names. Check the release if they change.
2. In Prism Launcher, choose **Add Instance → Import** and select the downloaded
   ZIP. Give the instance a recognizable test name, select a compatible Java
   runtime for that archive, and launch it once before changing any files.
   Use a disposable world, or a copy of an existing world when testing save
   compatibility. Keep your regular play instance and world out of the test.
3. If the change affects server behavior, download the `server-java8.zip` or
   `server-java17-26.zip` asset from the **same release and Java variant**.
   Extract it to a separate directory. The Java 8 package uses
   `startserver.sh` or `startserver.bat`. The modern-Java package uses
   `startserver-java9.sh` or `startserver-java9.bat`. Run the script for your
   operating system. If startup stops for the Minecraft EULA, read it and set
   `eula=true` in `eula.txt` if you agree, then restart. Wait for `Done` in the
   server log and join it with the matching client. Record both archive names.

## Record the unchanged behavior

For a bug fix, try the reproduction steps in the unchanged pack. Record what
happened and the affected mod version or pack file contents. For a new feature,
record the starting behavior. If the chosen build already contains the change,
use a baseline that does not. Close the client and server before installing the
modified files.

## Install the change

Open the test instance's game directory from Prism Launcher. Make client changes
there. Make server changes in the extracted server directory.

For a mod change:

1. Build the owning mod with the task specified by its README or CI workflow.
   With RetroFuturaGradle's standard jar tasks, the **unclassified** reobfuscated
   jar in `build/libs` is the runtime artifact. The `-dev` jar is for development
   classpaths. Its [task reference](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/master/docs/mcp-forge.md)
   explains the distinction. Check the target repository's build instructions
   for other jar layouts. Record the jar name, source commit, and whether the
   working tree has uncommitted changes.
2. Close the client and server. Move the packaged version of that mod out of
   each relevant `mods` directory, then copy in the built runtime jar. Confirm
   that only one version of the mod remains in each directory. Install a
   client-only mod only on the client.

If the change needs another unpublished mod version, install the matching
runtime jars together and record every replacement. Use
[cross-repository testing](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
first to verify that the dependent mod built against the intended API.

For a pack configuration or resource change, copy the changed files to their
corresponding paths in the relevant client or server instance. Record those
paths and keep an unchanged copy for comparison and reset.

## Run and report the test

1. Start the pack and check its startup log or mod list to confirm the changed
   mod loaded. If the displayed version does not distinguish the local build,
   compare the installed jar's checksum with the built jar. For pack files,
   confirm the changed values or assets appear in the running pack.
2. Repeat the same steps used for the baseline. When the change affects server
   state, join the matching dedicated server and check the behavior from the
   connected client. Exercise any affected reload, restart, dependency-presence,
   or existing-world case from the
   [testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/).
3. Record the pack build, installed jar names and commits or changed pack-file
   paths, and the baseline and modified results. For a failure, capture the
   first useful exception with [Locate logs](/GTNH-Dev-Doc/how-to/locate-logs/).
   Follow the [testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/#report-reproducible-evidence)
   for what to include in the pull request.

**Expected result:** the pack loads the intended jars or files, and the changed
behavior matches the expected result without new startup failures.

Restore the original jars and files before reusing the test instance, or discard
the instance.
