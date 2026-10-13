---
title: In-game testing tools and tricks
description: Inspect items and recipes, debug Minecraft, and iterate with Single Hotswap.
sidebar:
  order: 7
---

Use these tools to inspect game state and test a code change. Start in a
disposable development world with the machine, items, recipe, or GUI you need
to reproduce the behavior. Record the starting result, then repeat the same
action after each change. Follow [Build and run](/GTNH-Dev-Doc/start-here/build-and-run/)
to prepare and launch the development environment.

## Inspect items, NBT, and recipes

NBT (Named Binary Tag) stores item, entity, and tile-entity data. Not Enough
Items (NEI) provides the item and recipe inspection shortcuts below.

Check that the named provider is loaded before using a tool. A minimal
development run may need additional development dependencies. Use versions
supported by your checkout. ServerUtilities' NBT editor needs the mod on both
the client and server, and editing requires operator permissions. `/iih` runs
on the client without operator permissions; `/mt hand` requires operator
permissions on the server. Check configured keybindings if a shortcut differs.

Hold the stack before using `/iih`, `/mt hand`, or `/nbtedit item`. `/iih`
reports the registry name, metadata, class, and fluid contents, and copies the
script identifier. `/mt hand` copies the script identifier and lists the
OreDictionary entries. To inspect a tile entity or entity with `/nbtedit`,
aim at that target. Use a copy of the test world when editing tags.

| Tool and provider | Command or shortcut |
| --- | --- |
| NBT editor — [ServerUtilities](https://github.com/GTNewHorizons/ServerUtilities/blob/master/src/main/java/serverutils/command/CmdEditNBT.java) | `/nbtedit item`<br />`/nbtedit` |
| Held-item information — [GTNHLib](https://github.com/GTNewHorizons/GTNHLib/blob/master/src/main/java/com/gtnewhorizon/gtnhlib/commands/ItemInHandCommand.java) | `/iih` |
| Held-item script identifier — [MineTweaker3](https://github.com/stanhebben/MineTweaker3/blob/master/MineTweaker3-API/src/main/java/minetweaker/MineTweakerImplementationAPI.java) | `/mt hand` |
| [NEI clipboard shortcuts](https://github.com/GTNewHorizons/NotEnoughItems/blob/master/src/main/java/codechicken/nei/api/ShortcutInputHandler.java) | Hover an item: `Ctrl+C` copies its name, `Ctrl+X` its registry identifier, and `Ctrl+D` its OreDictionary entries. |
| NEI recipe-handler widget | [Inspect and reset a recipe handler](#inspect-and-reset-a-recipe-handler) to test layout adjustments. |
| Minecraft advanced tooltips | `F3+H` shows extra item information. |

An NBT edit can create a reproduction case; verify that ordinary gameplay also
produces the expected state. For save-related changes, check
[NBT schemas](/GTNH-Dev-Doc/minecraft-forge-internals/nbt-schema/) and repeat the
test after saving and reopening the world.

## Inspect and reset a recipe handler

The NEI widget applies handler edits immediately and saves them to
`config/NEI/handlers.patch` in the client's game directory. Those edits persist
after a restart, so keep a copy of any existing file before changing values.
The [widget implementation](https://github.com/GTNewHorizons/NotEnoughItems/blob/master/src/main/java/codechicken/nei/recipe/debug/DebugHandlerWidget.java)
defines the saved settings and its reset action.

1. In NEI settings, enable **Inventory → Recipes GUI → Handler Info Widget**.
   Open the affected recipe view and press `Shift+D` to show the widget.
2. Inspect the handler ID, dimensions, and offsets. Change a value when you need
   to test a layout adjustment, then check the recipe view for the result.
3. Use the widget's **Reset** button to undo the selected handler's override
   during the session.
4. To restore your pre-test configuration, close the client and restore the
   saved `handlers.patch`. If no file existed before the test, remove the file
   created by the widget. Restart the client and confirm the original layout.

## Attach the debugger to Minecraft

HotSwap needs a debugger connection to the **game JVM**. Gradle launches
Minecraft in a separate process, so enable debugging for that process before
attaching IntelliJ. After completing the build setup, close your existing test
client or stop the test server before launching a debug run. For a
RetroFuturaGradle development client, use this procedure:

1. In IntelliJ, open **Run → Edit Configurations**, add a **Remote JVM Debug**
   configuration, and choose **Attach to remote JVM**. Set the host to
   `localhost`, the port to `5005`, and the module classpath to your mod's main
   module. Give the configuration a name such as **Minecraft client debug**.
2. Open a terminal in the mod repository root containing `gradlew`. On Windows
   PowerShell, replace `./gradlew` with `.\gradlew.bat`. Start the game with:

   ```sh
   ./gradlew runClient --debug-jvm
   ```

   The game JVM prints `Listening for transport dt_socket at address: 5005`
   and waits for the debugger before starting Minecraft. This wait is expected.
3. Select your remote configuration and click **Debug**. Once Minecraft starts,
   put a breakpoint in the mod method you are testing and trigger that action
   in game. IntelliJ should stop at the breakpoint and show the game's stack
   and variables. Resume execution before continuing the test.

The [RetroFuturaGradle run task](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/master/plugin/src/main/java/com/gtnewhorizons/retrofuturagradle/minecraft/RunMinecraftTask.java)
inherits Gradle's [JavaExec debugging options](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.JavaExec.html).
Use `runServer` in the same procedure to debug a dedicated server.

### Use an enhanced Hotswap runtime

Select the generated configuration for the game Java version you are testing.
For example, current GTNHGradle generates **1f. Run Client (Java 25, Hotswap)**
and **2f. Run Server (Java 25, Hotswap)** when modern-Java runs are enabled.
Its [IDE integration source](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/modules/IdeIntegrationModule.java)
defines these names.

For the Java 25 client, the terminal equivalent with an explicit debugger
connection is:

```sh
./gradlew runClient25 --hotswap --debug-jvm
```

Attach using the remote configuration above. The `--hotswap` option enables
enhanced class reloading; `--debug-jvm` enables the debugger connection. See
GTNHGradle's [modern-Java run task](https://github.com/GTNewHorizons/GTNHGradle/blob/master/src/main/java/com/gtnewhorizons/gtnhgradle/tasks/RunHotswappableMinecraftTask.java)
for the supported options. Use the corresponding supported run when testing
another Java version.

### Debug a client and server together

Give the two game processes different debug ports. With the client already
using `5005`, create another remote configuration for the server on `5006`.
For a modern-Java server, run this from the same repository root:

```sh
./gradlew runServer25 --hotswap --mcJvmArgs=-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=127.0.0.1:5006
```

Attach the server configuration to let it finish startup, then join from the
client. This command supplies the Java Debug Wire Protocol (JDWP) option
through `--mcJvmArgs`; leave off `--debug-jvm` when supplying that option so the
game loads one debug agent.

For a game started outside Gradle, choose the game JDK version in the remote
configuration and copy its suggested JDWP option into the game's JVM arguments
before launching. JetBrains' [process attachment guide](https://www.jetbrains.com/help/idea/attach-to-process.html)
describes the setup.

Use conditional breakpoints to stop at the affected item or tile, and watches
to inspect its state. For a path that runs every tick, a non-suspending
breakpoint can log an expression without repeatedly pausing the game; see
[JetBrains' breakpoint options](https://www.jetbrains.com/help/idea/using-breakpoints.html).

## Reload one edited file with Single Hotswap

[Single Hotswap](https://plugins.jetbrains.com/plugin/14832-single-hotswap) is
an optional IntelliJ plugin for selecting the edited source file to reload.
It is useful when iterating on a method that runs repeatedly, such as a GUI
callback or machine update.

1. Install the plugin from **Settings → Plugins → Marketplace** and restart
   the IDE if prompted.
2. For the GTNH workflow, clear **Use Built-In Compiler** under **Settings →
   Build, Execution, Deployment → Debugger → Single Hotswap** so the plugin uses
   the project's build configuration.
3. Start or attach the game debugger and reproduce the starting behavior.
4. Edit the method and keep that Java source file open. Click the plugin's blue
   hammer, or use **Find Action → Single Hotswap**. Check the HotSwap output for
   compilation or reload failures, then repeat the in-game action.

With that compiler setting, the plugin uses your project's build configuration
and reloads the selected file's class and generated inner classes. Compilation
may cover a wider scope than the reload. The plugin's
[action](https://github.com/LabyStudio/singlehotswap/blob/master/src/main/java/net/labymod/intellij/singlehotswap/actions/SingleHotswapAction.java)
and [default compiler](https://github.com/LabyStudio/singlehotswap/blob/master/src/main/java/net/labymod/intellij/singlehotswap/compiler/impl/DefaultCompiler.java)
define this behavior.

Recent IntelliJ versions also provide **Compile And Reload File** through
**Find Action**, described in the [built-in HotSwap guide](https://www.jetbrains.com/help/idea/altering-the-program-s-execution-flow.html#reload_classes).

## Know when to restart

On an ordinary JVM, HotSwap supports changes inside existing method bodies.
Adding or removing fields or methods, or changing method signatures, requires
a restart. A method already on the call stack continues using its old body
until it returns. These are [JVM HotSwap limitations](https://www.jetbrains.com/help/idea/altering-the-program-s-execution-flow.html#hotswap-limitations);
the Single Hotswap plugin alone does not remove them. A repository's enhanced
Hotswap runtime may support more changes; follow that repository's setup.

Reloading code does not repeat startup registration or recreate existing world
objects. Restart for recipe registration, initialization, and changes to
mixins or transformers; use the repository's documented reload mechanism for
resources or configuration if it has one. For a dedicated-server test, reload
the changed server code in the server JVM and client code in the client JVM.
Singleplayer's integrated server shares the client process, but still has
[separate logical sides](/GTNH-Dev-Doc/minecraft-forge-internals/client-server-boundaries/).

Before reporting success, rebuild and restart with the final code, then repeat
the reproduction without debugger-only state changes. Follow the
[testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/) for
dedicated-server and save/reload cases, and
[test in the full pack](/GTNH-Dev-Doc/how-to/test-in-full-pack/) when other mods,
recipes, or pack configuration affect the result.
