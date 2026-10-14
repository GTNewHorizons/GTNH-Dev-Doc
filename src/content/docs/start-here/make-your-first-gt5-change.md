---
title: Make your first GT5 change
description: Locate a Programmed Circuit tooltip, change its hint order, and verify the result in game.
prev:
  link: /GTNH-Dev-Doc/start-here/build-and-run/
  label: Build and run
next:
  link: /GTNH-Dev-Doc/start-here/make-your-first-pull-request/
  label: Make your first pull request
---

Change the order of two Programmed Circuit tooltip hints. You'll find the code
behind displayed text, make a small Java edit, and check the result in game.

Use this as a local practice exercise. When you have a change the project needs,
follow [Make your first pull request](/GTNH-Dev-Doc/start-here/make-your-first-pull-request/).

## Prepare your workspace

Complete the [GT5-Unofficial workspace example](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#worked-example-gt5-unofficial)
and [build and launch the unchanged client](/GTNH-Dev-Doc/start-here/build-and-run/).
Use a working branch with no existing edits to
`src/main/java/gregtech/common/items/ItemIntegratedCircuit.java`.

Run commands from the GT5 repository root containing `gradlew`. On Windows
PowerShell, replace `./gradlew` with `.\gradlew.bat`.

The source links below use [revision `b7fc37e18719`](https://github.com/GTNewHorizons/GT5-Unofficial/tree/b7fc37e18719b3829cc4752542b5b298e205e457),
the same revision as the workspace example. Compare the method in your checkout
with the linked source before editing.

## Observe the original tooltip

1. Set the client's language to English (US).
2. Create a disposable singleplayer world with cheats enabled.
3. Open chat and enter:

   ```text
   /give @p gregtech:gt.integrated_circuit 1 1
   ```

   This gives you one Programmed Circuit with configuration 1. Pick it up if it
   drops beside you.
4. Hover over it in your inventory. Look for these three lines:

   ```text
   Configuration == 1
   Right click to reconfigure
   Needs a screwdriver or programming tool
   ```

Keep this item and world so you can repeat the check after editing. Exit the
game before you edit the code.

## Find and change the code

In IntelliJ's **Find in Files**, search for `Right click to reconfigure`.
The [English language file](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/resources/assets/gregtech/lang/en_US.lang#L4455-L4457)
maps that text to `GT5U.item.programmed_circuit.tooltip.1`.

Search for that key in `src/main/java`. Open
`src/main/java/gregtech/common/items/ItemIntegratedCircuit.java` and find
[the `addAdditionalToolTips` method](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/items/ItemIntegratedCircuit.java#L200-L213).
It appends the configuration first, then hint `.1`, then hint `.2`.

Swap the two hint calls so this fragment reads:

```java
aList.add(StatCollector.translateToLocal("GT5U.item.programmed_circuit.tooltip.2"));
aList.add(StatCollector.translateToLocal("GT5U.item.programmed_circuit.tooltip.1"));
```

Keep the configuration call above them in place. The existing translation keys
supply the text; this edit changes the display order.

## Build and verify the change

Save the file and build:

```sh
./gradlew build
```

Wait for `BUILD SUCCESSFUL`, then launch a fresh client:

```sh
./gradlew runClient
```

Open the same world and hover over the same circuit. Expect:

```text
Configuration == 1
Needs a screwdriver or programming tool
Right click to reconfigure
```

The two hints should have exchanged places, while the configuration stays
`== 1`. If the old order remains, follow
[The game runs, but your change is absent](/GTNH-Dev-Doc/troubleshooting/development-client-and-server-problems/#the-game-runs-but-your-change-is-absent).

## Review and finish the exercise

Inspect the diff:

```sh
git diff -- src/main/java/gregtech/common/items/ItemIntegratedCircuit.java
```

It should show only the two hint calls exchanging places. Record the commands
you ran, the item you checked, and its tooltip before and after the change.
These details let a reviewer repeat your check.

If you haven't committed the exercise and have no other edits in that file,
you can undo it with:

```sh
git restore -- src/main/java/gregtech/common/items/ItemIntegratedCircuit.java
```

Build and relaunch if you want to confirm the original order again.
