---
title: Understand Java and runtime selection
description: Distinguish the JDK that runs Gradle from the runtime being tested.
sidebar:
  order: 3
---

A GTNH checkout can involve several Java selections: the shell's `java`, the
JDK that runs Gradle, IntelliJ's Gradle JVM, a Gradle toolchain, and a generated
Minecraft run configuration. They are not automatically the same.

Read `.java-version`, build scripts, the Gradle wrapper, generated run
configurations, and CI workflow in the exact repository. Align the shell and
IntelliJ Gradle JVM first; then choose a generated client or server configuration
for the runtime compatibility you intend to test.

An IDE import succeeding does not prove the game runs on the target runtime,
and a game launch does not prove CI uses the same JDK. Record both when reporting
a Java-specific failure.
