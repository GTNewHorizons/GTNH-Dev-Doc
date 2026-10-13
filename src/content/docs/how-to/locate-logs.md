---
title: Locate logs and useful errors
description: Capture the command, context, and exception chain that explain a development failure.
---

Collect output from the process that failed. A Gradle task failure, a game
crash, and an IntelliJ import failure can describe different layers of the
same run. Keep the command or run configuration and repository revision with
the logs so the failure can be reproduced.

## Gradle builds and task execution

Start at `BUILD FAILED` and locate the first failed task and its exception
chain. Read the task's earlier output too: a child process may have explained
the cause before Gradle reported its exit code.

From the same checkout and shell, repeat the failing command with
`--stacktrace` when the exception chain is incomplete. Add `--info` for
unresolved dependency or task-execution details. Record the command, working
directory, task, and relevant launcher/daemon Java versions.

Avoid replacing the original log with only the last `Caused by` line.
A low-level exception needs the surrounding operation and call path to be
interpreted.

## Development clients and servers

Keep terminal or IntelliJ **Run** output, then inspect the game working
directory shown by that launch configuration. The game writes logs and crash
reports relative to it; the repository root is not necessarily that directory.

Use `logs/latest.log` for the startup and activity sequence, and the relevant
file under `crash-reports/` for the crash summary and environment. GTNHGradle
normally separates client and server runs into `run/client` and `run/server`,
but repository overrides and full-pack instances have their own directories.

For a full-pack run, open the instance's game directory in your launcher.
For a dedicated server, inspect the extracted server directory. Match the
report's timestamp to the run you are investigating.

## IntelliJ import and internal failures

Gradle synchronization output belongs in the IDE's **Build** or **Sync** view.
Compare it with the wrapper command when deciding whether the failure is in
the IDE model or the build itself.

For an IntelliJ internal failure, collect the IDE log through its **Help**
menu. JetBrains maintains
[the log-location guide](https://www.jetbrains.com/help/idea/troubleshooting-materials.html#locate_log_files).
An IDE log does not replace the game log for a crash in a launched client.

## Share a reproducible report

Follow the owning repository's issue template. Include the revision, command,
environment, reproduction steps, and expected and observed behavior.
Use excerpts for the important exception and attach or link the full log
when needed.

Remove tokens or private connection details before sharing. Retain exception
types, dependency coordinates, task names, and the surrounding cause chain;
those are the evidence the maintainer needs.

Continue with the matching
[Java](/GTNH-Dev-Doc/troubleshooting/java/),
[Gradle](/GTNH-Dev-Doc/troubleshooting/gradle/),
[game-launch](/GTNH-Dev-Doc/troubleshooting/development-client/), or
[CI](/GTNH-Dev-Doc/troubleshooting/ci/) diagnostic.
