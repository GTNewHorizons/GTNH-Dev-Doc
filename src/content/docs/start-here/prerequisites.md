---
title: Prerequisites
description: Install the basic tools needed to work on a GTNH repository.
sidebar:
  order: 1
---

## Install only the basics

Install:

- Git and a GitHub account.
- For code changes, a JDK matching the selected repository, IntelliJ IDEA with
  Gradle support, and enough free disk space for Gradle caches and a development
  instance.

Asset, configuration, localization, and documentation changes may need only Git
and an appropriate editor. The official
[beginner contribution guide](https://wiki.gtnewhorizons.com/wiki/GTNH_Contribution_Guide_for_Beginners)
covers a GitHub Desktop workflow for contributors who prefer a graphical tool.

Check what your shell will actually use:

```console
git --version
java -version
```

**Expected result:** `git` prints a version; for code changes, `java` does too.
Check the required Java version after choosing a repository. If Java cannot run,
see [Troubleshoot Java](/GTNH-Dev-Doc/troubleshooting/java/).

## Before you continue

[Choose the repository](/GTNH-Dev-Doc/start-here/choose-a-repository/)
that owns the change.
