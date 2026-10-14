---
title: Development client and server problems
description: Diagnose failed game launches, mod-loading errors, and changes absent from a running game.
---

A failed run task can mean Gradle never launched Minecraft, or that the game
started and then crashed. Keep the complete launch output and find the first
relevant exception before acting on the final exit message.

In a terminal at the mod repository root containing `gradlew`, repeat the
failed run with `--stacktrace`. For a standard GTNHGradle client:

```sh
./gradlew runClient --stacktrace
```

On Windows PowerShell, use `.\gradlew.bat`. For a dedicated server, use
`runServer`; for a Java-specific run configuration, use its corresponding
task. Follow the checkout's README for specialized or older projects. If the
task is missing, [look up the available tasks](/GTNH-Dev-Doc/build-tools/work-with-gradle-tasks/).

## Minecraft never starts

If the first failed task downloads dependencies, prepares the workspace, or
compiles code, follow [Gradle problems](/GTNH-Dev-Doc/troubleshooting/gradle-problems/).
A game window cannot appear until those prerequisites succeed.

If the game JVM (Java Virtual Machine) starts, inspect the logs and crash
reports in its working directory using
[Locate logs](/GTNH-Dev-Doc/troubleshooting/locate-logs-and-useful-errors/). **`Process ... finished with
non-zero exit value`** reports the exit; an earlier game exception explains
its cause.

- For a class-file version error, check the **game JVM** with
  [Java problems](/GTNH-Dev-Doc/troubleshooting/java-problems/).
- For **`OutOfMemoryError`**, identify whether Gradle or Minecraft ran out of
  memory. Record that process's heap arguments before adjusting them and
  repeating the run.
- For LWJGL (Lightweight Java Game Library), native-library, or OpenGL errors,
  compare the selected JVM, launch arguments, and working directory with the
  generated run configuration. Try an unchanged checkout on the same machine.
  If it also fails, investigate the named library or graphics error in that
  environment.

## Forge rejects a mod or startup crashes

Use the first mod-loading error to select a check:

- **Duplicate mod:** inspect runtime dependencies and the game working
  directory's `mods/` and `mods/1.7.10/` folders. Keep one intended copy across
  those sources; remove the duplicate jar or declaration.
- **Missing mod or minimum version:** compare the required version with the
  loaded mod list and resolved dependency. Supply the required version. If
  your own mod reports only a commit hash, check
  [fetched Git tags](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#check-git-based-mod-versions)
  before changing version requirements.
- **`NoSuchMethodError` or `NoSuchFieldError`:** compare the class used for
  compilation with the class loaded at runtime. Check the
  [resolved dependency](/GTNH-Dev-Doc/troubleshooting/gradle-problems/#gradle-selects-an-unexpected-version)
  and any manually installed jar for a different API version.
- **Mixin application or injection failure:** keep the mixin and target names,
  then use [Mixins and transformers](/GTNH-Dev-Doc/troubleshooting/mixins-and-transformers/).

Read nested causes before treating a later missing-class or shutdown message
as a separate failure. An earlier initialization or patch error can produce
those messages.

## A server stops or refuses connections

For an RFG development server's first run, answer its online-mode and Minecraft
End User License Agreement (EULA) prompts as described in
[Build and run](/GTNH-Dev-Doc/start-here/build-and-run/#test-on-a-dedicated-server).
The default development client's test identity needs offline mode. If existing
server settings reject that identity, inspect `online-mode` in the test server's
`server.properties`.

For a full-pack server that stops for EULA acceptance, read the EULA and set
`eula=true` in its `eula.txt` only if you agree, then rerun. For a port-bind
error, stop the other test server using that port or choose another port in
the test server's `server.properties`.

Wait for `Done` in the server log before joining, then connect to the
configured port. A missing `net.minecraft.client...` class on the dedicated
server points to a client-only reference or dependency loaded on the server.
Check the [client/server boundary](/GTNH-Dev-Doc/minecraft-forge-internals/understand-client-and-server-boundaries/).
For a full-pack connection test, use matching client and server builds and
mod replacements from [Test in the full pack](/GTNH-Dev-Doc/testing/test-a-change-in-the-full-pack/).

## The game runs, but your change is absent

Confirm that you launched the intended instance, world, and runtime:

- In a pack instance, compare the installed jar with the artifact you built
  and confirm that only the intended mod version remains. Follow
  [runtime jar selection](/GTNH-Dev-Doc/testing/test-a-change-in-the-full-pack/).
- In a development run, confirm that compilation succeeded and the run uses
  the changed classes. If only the IntelliJ run misses the change, compare
  its configuration with the terminal launch.
- In a HotSwap session, check that recompilation and reload succeeded in the
  process running the changed code. Reloading does not repeat initialization
  or registration; use a full restart for those changes. Existing world state
  may also need a fresh test fixture. See
  [In-game testing tools](/GTNH-Dev-Doc/testing/in-game-testing-tools-and-tricks/).

After correcting the cause, repeat the launch and the action that failed.
For a client, load the test world as well as reaching the main menu. For a
server, wait for `Done`, join with the matching client, and repeat the affected
action. For an absent change, confirm its behavior after a full restart.
