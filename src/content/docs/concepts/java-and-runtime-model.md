---
title: Understand Java and runtime selection
description: Distinguish the Gradle launcher, daemon, compiler, and Minecraft runtime.
---

A successful build can use several Java installations. The Java version that
starts Gradle does not by itself identify the compiler's target or the runtime
used by Minecraft.

## Identify the four roles

| Role | What selects it | What it controls |
| --- | --- | --- |
| Wrapper launcher | The shell's `JAVA_HOME` or executable path, or the IDE's launch settings. | Starting the wrapper and connecting to Gradle. |
| Gradle daemon | Daemon JVM criteria when configured; otherwise supported Gradle Java settings. | Buildscript and plugin execution. |
| Compiler toolchain and target | The repository's toolchain, language, release, and compatibility settings. | Source features, compiler APIs, and output bytecode. |
| Minecraft runtime | The selected client/server task or generated run configuration. | The JVM that loads the game and mods. |

IntelliJ's Project SDK also affects its code model and IDE compilation.
It is not a substitute for the Gradle model imported from the repository.

[Daemon JVM criteria](https://docs.gradle.org/current/userguide/gradle_daemon.html#sec:daemon_jvm_criteria)
in `gradle/gradle-daemon-jvm.properties` take precedence over
`JAVA_HOME` and `org.gradle.java.home` for daemon selection.
A `.java-version` file can guide a version manager or CI setup; it does not
override every process automatically.

## Why a modern build can test an older game runtime

A project can run Gradle on a newer JDK and compile for another target.
Some GTNH builds also use JVM bytecode downgrading to make modern source
features compatible with their supported game runtimes. The build
configuration determines that transformation; installing a newer JDK does
not add it.

GTNHGradle's
[toolchain module](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/ToolchainModule.java)
and [modern-Java runs](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/ModernJavaModule.java)
configure these roles separately. Follow your checkout's selected versions
and enabled modules.

For example, the
[GT5 workspace example](/GTNH-Dev-Doc/start-here/fork-clone-and-import/#worked-example-gt5-unofficial)
pins its daemon to Java 25. That pin does not establish which Java-specific
client or server run you exercised, or that every installed pack artifact
supports the same runtime.

## Diagnose and report the relevant selection

Use `java -version` and `./gradlew --version` to inspect the shell and
wrapper/daemon context. Inspect the compile task for its toolchain and target,
and the launch output for the Minecraft executable and version.

When reporting a Java-specific failure, name the failing process and record
both the build and game selections. An IDE import proves that a project
model loaded; runtime compatibility needs the matching game launch.
[Java problems](/GTNH-Dev-Doc/troubleshooting/java/)
provides the diagnostic checks.
