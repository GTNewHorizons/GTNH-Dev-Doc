---
title: Locate logs and useful errors
description: Capture the first actionable failure from Gradle, IntelliJ, or a development client.
sidebar:
  order: 3
---

## Start where the failure occurred

### Gradle

From `BUILD FAILED`, read upward to the first failing task and `Caused by`.
Rerun that task with `--stacktrace` if needed. Use `--info` only for unresolved
dependency or task-selection details.

Capture:

- The command and working directory.
- The first failing task.
- The first meaningful exception and nested cause.
- The JDK and Gradle versions printed by the build.
- The relevant repository commit.

### Development client or server

Keep the terminal or IntelliJ Run output and follow its log or crash-report path.
Look for `logs` and `crash-reports` under the run working directory.

Use `latest.log` for the startup sequence and a timestamped crash report for a
shorter exception view. Include the earliest relevant stack trace.

### IntelliJ IDEA

Separate an IDE-model failure from a code failure:

- Gradle synchronization errors appear in the Build or Sync output.
- Compiler errors appear under the task or IDE build that produced them.
- IDE internal failures belong in IntelliJ's own log, available through its Help
  menu. JetBrains documents the current location in
  [Locating IDE log files](https://www.jetbrains.com/help/idea/locating-ide-log-file.html).

## Share a useful report

Redact access tokens, usernames in paths if desired, server addresses, and any
private repository URLs. Do not remove task names, dependency coordinates,
exception types, or the lines immediately around the first cause.

Paste short excerpts and attach or link long logs. Follow the target repository's
issue template. The organization also provides a central
[GTNH issue tracker](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/issues),
but a confirmed repository-specific bug should be reported where its maintainers
request.

Next: diagnose a [development-client failure](/GTNH-Dev-Doc/troubleshooting/development-client/)
or a [local/CI mismatch](/GTNH-Dev-Doc/troubleshooting/ci/).
