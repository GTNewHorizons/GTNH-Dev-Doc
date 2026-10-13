---
title: IntelliJ problems
description: Diagnose Gradle imports, missing generated sources, and unresolved editor symbols.
---

Check the failing operation through the Gradle wrapper before repairing IDE
state. For unresolved Java symbols in a standard mod project, open a terminal
in the repository root containing `gradlew` and run:

```sh
./gradlew compileJava --stacktrace
```

On Windows PowerShell, use `.\gradlew.bat`. For a test, run configuration, or
subproject failure, use the corresponding task from the checkout's README.
If it also fails in the terminal, follow
[Gradle problems](/GTNH-Dev-Doc/troubleshooting/gradle/) or
[Java problems](/GTNH-Dev-Doc/troubleshooting/java/). If it succeeds, compare
the IDE's imported model and environment with the working terminal build.

## Gradle synchronization fails

1. Confirm that the linked project is the repository root containing
   `settings.gradle` or `settings.gradle.kts`.
2. In the linked project's
   [Gradle settings](https://www.jetbrains.com/help/idea/gradle-settings.html),
   select the checked-in wrapper. Compare **Gradle JVM** or **Gradle JVM
   Criteria** with the terminal's `./gradlew --version` output. For a mismatch,
   use the [Java selection checks](/GTNH-Dev-Doc/troubleshooting/java/).
3. Read the first error in the Build or Sync output. For a download failure,
   compare offline mode and Gradle user home with the terminal; different user
   homes can contain different properties and initialization scripts. Repair
   the reported dependency or network failure.
4. Sync or reload the project from the Gradle tool window. Wait for
   synchronization and indexing to finish, then confirm that tasks and source
   sets appear without import errors.

## Gradle compiles, but the editor cannot resolve symbols

Once indexing finishes, check the affected file's module and source set, the
Project SDK, and the language level. For a dependency symbol, confirm that the
dependency belongs to that source set's Gradle configuration. Correct the
declaration in the build and reload Gradle; a jar added manually in Project
Structure can disappear at the next import.

Try navigating to the unresolved class. If only generated classes or
Minecraft/Forge sources are missing, check the generation step below.

## Generated classes or Minecraft sources are missing

Read the import output for the task that failed to generate sources.
GTNHGradle's
[IDE integration](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/IdeIntegrationModule.java)
makes `processIdeaSettings` depend on `injectTags` and `setupDecompWorkspace`.
Inspect the plugin version used by your checkout when comparing behavior.

For a failure in Minecraft workspace setup, rerun:

```sh
./gradlew setupDecompWorkspace --stacktrace
```

Use that command only when the checkout provides the task. For another build
system, use its documented generation task. If generation fails, retain the
first download, decompilation, or compilation error and follow
[Gradle problems](/GTNH-Dev-Doc/troubleshooting/gradle/).
If it succeeds, reload Gradle and check that the missing sources resolve.
Remove generated files only when the error or repository guidance identifies
them as the cause.

## IntelliJ's build or run fails while Gradle's succeeds

Check **Build and run using** in Gradle settings. If the IDE compiler is
missing configuration or generation supplied by Gradle, delegate the build
to **Gradle** and retry. For Single Hotswap, follow its specific
[compiler setup](/GTNH-Dev-Doc/how-to/in-game-testing-tools/#reload-one-edited-file-with-single-hotswap).

For a run failure, compare the IDE configuration's task, game JVM, classpath,
arguments, and working directory with the terminal launch. Correct the
configuration that differs from the intended run, then repeat the launch.

## Indexing or navigation remains broken

After a successful import, generation, and terminal compilation, restart
IntelliJ. If indexing still fails, use
[File → Invalidate Caches](https://www.jetbrains.com/help/idea/invalidate-caches.html)
and let the IDE restart and reindex. This repairs IDE caches; a failed Gradle
download or missing generated file needs its own correction.

Reopen a previously unresolved class and check symbol resolution and navigation.
Repeat the original IDE operation too. If the problem persists, collect
[IntelliJ's log](/GTNH-Dev-Doc/how-to/locate-logs/#intellij-import-and-internal-failures).
