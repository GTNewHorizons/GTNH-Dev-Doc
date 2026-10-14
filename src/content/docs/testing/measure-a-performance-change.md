---
title: Measure a performance change
description: Compare a repeatable workload, measure server or client behavior, and capture Java work with Flight Recorder.
---

Keep an unchanged build and a modified build, then run the same workload in
each. Measure the behavior you want to improve: server tick time for machine
processing, or client frame rate for a renderer. A profile helps locate the
Java work behind those measurements.

The server command below follows Minecraft **1.7.10 / Forge 10.13.4.1614**.
The Flight Recorder commands use a full **JDK 25**, including `jcmd` and
`jfr`, on the machine running the game. Use that section with a supported
Java 25 game run; the [Gradle daemon's Java version](/GTNH-Dev-Doc/build-tools/understand-java-and-runtime-selection/)
does not establish which JVM runs Minecraft. Repeat measurements on other
runtimes before making performance claims about them.

## Prepare a repeatable workload

1. Build both revisions and record their commits, jar versions, game JVM,
   heap arguments, mod list, and relevant configuration. Use
   [full-pack testing](/GTNH-Dev-Doc/testing/test-a-change-in-the-full-pack/)
   when other mods affect the work.
2. Copy the same test world for each run. Define the setup precisely: for
   example, 64 copies of the affected machine processing the same recipe with
   continuous inputs, output space, and energy. Keep the same chunks loaded.
   A machine that runs out of inputs changes the workload.
3. For a client comparison, keep the position, camera direction, window size,
   render distance, resource pack, and graphics settings identical. For a
   frame-rate throughput comparison, turn VSync off and set **Max Framerate**
   to **Unlimited** in both runs so the cap does not hide a difference.
4. Allow the world and Java compilation to warm up before recording. Choose
   a fixed warm-up and capture interval, such as 60 seconds each, and use them
   for both builds. Keep startup or a cold-cache test as a separate scenario.
   Run without debugger pauses or HotSwap during measurement.

Repeat each scenario at least three times. Keep the individual results so a
single unusually fast or slow run does not determine the conclusion.

## Measure server tick time

Connect an operator account to the dedicated test server. In game, run:

```text
/forge tps
```

In the server console, omit the leading slash. Read the **Overall** mean tick
time and TPS (ticks per second); the dimension entries describe individual
worlds. Take several readings during the active workload. The
[legacy Forge command](https://github.com/MinecraftForge/MinecraftForge/blob/9274e4fe435cb415099a8216c1b42235f185443e/src/main/java/net/minecraftforge/server/command/ForgeCommand.java#L100-L140)
averages the server's recent timing arrays and caps the displayed TPS at 20.

For example, these illustrative results would show lower average tick cost
even though the server maintains its target rate in both cases:

| Build | Mean tick time | TPS |
| --- | --- | --- |
| Unchanged | 24 ms | 20 |
| Modified | 12 ms | 20 |

Record values from your own runs. An average cannot show the worst tick or
establish that a periodic spike disappeared. Use the
[JDK 25 tick-duration recording](#measure-server-tick-durations) below to compare
the minimum, average, maximum, and invocation count. Keep the claim limited
to average cost when only averages were measured.

## Compare a client view

Open the same scene in both client builds and press **F3**. Record the FPS
(frames per second) counter over the chosen interval, including any visible
stalls. Higher uncapped FPS supports an improvement in that scene. A stable
counter at the configured cap does not show how much work remains below it.

Repeat a resource reload or cold-cache scenario separately when the change
affects cache construction. For a GUI or recipe page, use the same open page,
items, and mouse position in both runs. Confirm that the displayed result
and interactions remain correct.

## Capture Java work with Flight Recorder

Use `jcmd` and `jfr` from the game JDK's `bin` directory, or put that directory
on your terminal's executable path. In PowerShell, the executables are
`jcmd.exe` and `jfr.exe`. Run the tools as the same operating-system user that
launched Minecraft, as required by the
[JDK 25 attachment rules](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jcmd.html#description).

1. List Java processes:

   ```sh
   jcmd -l
   ```

   Choose the Minecraft client or server, then replace `GAME-PID` below with
   its numeric process ID. Confirm its launch command:

   ```sh
   jcmd GAME-PID VM.command_line
   ```

   RFG runs commonly show `GradleStart` or `GradleStartServer`. Select the
   game process rather than `GradleDaemon`. For singleplayer, both logical
   sides share the client JVM.
2. Create a writable recording directory. Replace `ABSOLUTE-PATH` below with
   its absolute path, such as `/tmp/gtnh-profile` or `C:/gtnh-profile`, using
   a path without spaces for these commands. Start a 60-second recording:

   ```sh
   jcmd GAME-PID JFR.start name=gtnh_before settings=profile duration=60s filename=ABSOLUTE-PATH/before.jfr
   ```

   Expect `Started recording`. Exercise the workload for the capture interval
   and keep Minecraft running until the file is written. The JDK's
   [`JFR.start` options](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jcmd.html#commands-for-jcmd)
   define the duration, destination, and `profile` settings. If attachment
   fails, check the PID, operating-system user, and game JDK before retrying.
3. Inspect the completed recording:

   ```sh
   jfr summary ABSOLUTE-PATH/before.jfr
   jfr view hot-methods ABSOLUTE-PATH/before.jfr
   jfr view gc-pauses ABSOLUTE-PATH/before.jfr
   ```

   Check the duration and `jdk.ExecutionSample` count in the summary. The
   hot-methods view identifies frequently sampled Java methods; the GC view
   shows garbage-collection pauses. `No events found` in the GC view can be a
   valid result when no pauses were recorded. To see sampled stacks and threads:

   ```sh
   jfr print --events jdk.ExecutionSample --stack-depth 20 ABSOLUTE-PATH/before.jfr
   ```

   Follow the affected method's callers on the relevant game thread. Empty
   samples can mean the workload was idle or the wrong process was recorded.
   The [JDK 25 `jfr` reference](https://docs.oracle.com/en/java/javase/25/docs/specs/man/jfr.html)
   describes these views and filters.
4. Restart with the modified build and the matching world copy. Repeat the
   warm-up and capture, using `gtnh_after` and `after.jfr`. Keep the capture
   duration and settings identical.

Sampling points to work worth investigating; its percentages are not elapsed
time saved. Corroborate them with tick-time or client measurements. These
sampled stacks do not measure GPU execution or individual frame and tick
durations. Keep the recorded scene and workload with each file,
and confirm the timing difference in a run without profiling enabled.

### Measure server tick durations

JDK 25 can time a selected method with Flight Recorder's `method-timing`
option. In a mapped RFG development server, `MinecraftServer.tick()` is the
complete server tick. After selecting the game PID as above, capture it:

```sh
jcmd GAME-PID JFR.start name=gtnh_ticks settings=profile duration=60s filename=ABSOLUTE-PATH/ticks-before.jfr method-timing=net.minecraft.server.MinecraftServer::tick
```

After the recording finishes, read the timing view:

```sh
jfr view method-timing ABSOLUTE-PATH/ticks-before.jfr
```

Expect a row for the selected method with its invocation count and minimum,
average, and maximum duration. Repeat the same scenario with the modified
build and `ticks-after.jfr`. Compare the maximum as well as the average when
evaluating work that spikes every few ticks. Keep counts and capture durations
with the results so a short or incomplete run is visible.

These are elapsed durations: garbage collection or an operating-system pause
can lengthen a tick too. Use the CPU and GC views to investigate the cause.
The timing view aggregates calls; it does not locate the worst tick in time.

A full-pack runtime can use different mapped method names. Inspect its loaded
stack before choosing the filter. An empty timing view does not establish
that ticks were fast; check the method name and the game JVM's support with
`jcmd GAME-PID help JFR.start`. Keep the filter narrow because instrumenting
additional methods changes the recording's cost.

## Report the comparison

Include both revisions, the repeatable setup, warm-up and capture durations,
each run's measurements, and the recordings or relevant stacks. Explain
whether the result changes average cost, throughput, or observed stalls, and
name any timing claim the collected evidence cannot establish.

After the optimization, repeat the affected functional checks from
[Testing expectations](/GTNH-Dev-Doc/testing/testing-expectations/), including
save/reload and synchronization when relevant.
