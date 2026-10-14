---
title: Gradle problems
description: Separate wrapper, configuration, and task failures, then repair the reported cause.
---

Start with the command that failed and its first relevant exception, including
any nested cause. Which stage failed tells you whether to look at Gradle
startup, project configuration, or an individual task.

Run this page's commands from the repository root containing the checked-in
wrapper. On Windows PowerShell, replace `./gradlew` with `.\gradlew.bat`.

## Find the failing stage

If an IntelliJ import fails or the output does not identify a task, run:

```sh
./gradlew --version
./gradlew help --stacktrace
```

- If `--version` fails, investigate wrapper startup or the Gradle distribution
  download below.
- If `--version` succeeds but `help` fails, read the reported Java, build-script,
  plugin, or repository error. `help` configures the project without compiling
  the mod or launching Minecraft.
- If both succeed, repeat the original task with `--stacktrace`. A successful
  configuration check does not exercise every compilation or runtime dependency.

This distinction follows
[Gradle's build diagnostics](https://docs.gradle.org/current/userguide/troubleshooting.html#sec:troubleshooting_installation).
If the same operation succeeds in the terminal, continue with
[IntelliJ problems](/GTNH-Dev-Doc/troubleshooting/intellij-problems/).

## The wrapper does not start

For **`Permission denied`** on Linux or macOS, make the script executable with
`chmod +x gradlew` and retry. On Windows, use `gradlew.bat`.

For an invalid `JAVA_HOME` or an incompatible JVM, follow
[Java problems](/GTNH-Dev-Doc/troubleshooting/java-problems/).

If downloading Gradle fails, compare the failed URL with `distributionUrl` in
`gradle/wrapper/gradle-wrapper.properties`. Check access to that host and the
reported network error. Review any changes to the wrapper files and restore
accidental edits. The
[wrapper reference](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
explains this download. Use the checkout's wrapper to keep the intended
Gradle version.

## A dependency or plugin cannot be resolved

Keep the requested `group:artifact:version`, classifier when present, and
failed repository URL. Choose the correction from the error:

- **Timeout, unknown host, or HTTP 5xx:** check the named service, connectivity,
  and proxy settings. Retry a transient outage once service access returns.
- **`PKIX path building failed` or another TLS error:** inspect the certificate
  chain, including any proxy certificate, in the trust store of the JDK
  running Gradle.
- **HTTP 401/403:** check the repository's access requirements and the build's
  credentials.
- **Artifact not found or HTTP 404:** compare the version, classifier, and
  declared repositories with the published artifact. For an unpublished mod
  change, use the
  [cross-repository workflow](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/).
- **No cached version in offline mode:** disable offline mode in the invoking
  tool and resolve again with network access.

### Gradle selects an unexpected version

Inspect the selected version and the reason for that selection:

```sh
./gradlew dependencyInsight --dependency GROUP:ARTIFACT --configuration runtimeClasspath
```

Replace `GROUP:ARTIFACT` with the affected dependency. For compilation, use
`compileClasspath`; for a customized build, use the resolvable configuration
named in the error. Qualify the task for a subproject, for example
`:module:dependencyInsight`. Use the
[selection report](https://docs.gradle.org/current/userguide/viewing_debugging_dependencies.html#sec:identifying-reason-dependency-selection)
to locate the declaration or rule responsible before editing it.

When an artifact has been republished or repository contents have changed,
rerun the failing command with
[`--refresh-dependencies`](https://docs.gradle.org/current/userguide/dependency_caching.html#sec:refreshing-dependencies).
This refreshes resolution and checks cached artifacts. Fix coordinates or
service access first. Remove a cached file only when the error identifies it
as corrupt; deleting all caches loses evidence and forces unrelated downloads.

## A task is missing

For **`Task ... not found`**, check the task's spelling, repository root, and
subproject path. Use
[Work with Gradle tasks](/GTNH-Dev-Doc/how-to/work-with-gradle-tasks/) to find the task
provided by that checkout, then repeat the intended operation.

## The daemon disappears

For **`Gradle build daemon disappeared unexpectedly`**, open the daemon log
named in the error. Logs normally live under `~/.gradle/daemon/GRADLE-VERSION/`,
or the corresponding directory in the configured Gradle user home. Look for
an out-of-memory error, JVM crash report, or operating-system process kill
before changing memory settings.

After correcting the cause, `./gradlew --stop` stops that Gradle version's
daemons so the next build starts a new one. See
[daemon diagnostics](https://docs.gradle.org/current/userguide/gradle_daemon.html#sec:troubleshooting_the_daemon)
if the log does not explain the exit.

Repeat the original failed command to verify recovery. For a run task, check
that Minecraft reaches the expected startup state as well. Keep any remaining
exception and the command in your
[failure report](/GTNH-Dev-Doc/how-to/locate-logs-and-useful-errors/).
