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

In this exercise you'll swap the order of two lines in the Programmed
Circuit's tooltip. Along the way you'll trace text you see in game back to
the code that shows it, make a small Java edit, and check the result.

This is practice only: don't open a pull request for it. When you have a real
change, follow [Make your first pull request](/GTNH-Dev-Doc/start-here/make-your-first-pull-request/).

## Before you start

You need:

- A GT5-Unofficial checkout set up as in the
  [workspace example](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#worked-example-gt5-unofficial).
- The unchanged client [built and launched once](/GTNH-Dev-Doc/start-here/build-and-run/).
- No existing edits to
  `src/main/java/gregtech/common/items/ItemIntegratedCircuit.java`.

Run the commands from the GT5 repository folder. On Windows PowerShell,
type `.\gradlew.bat` instead of `./gradlew`.

The source links on this page point to
[revision `b7fc37e18719`](https://github.com/GTNewHorizons/GT5-Unofficial/tree/b7fc37e18719b3829cc4752542b5b298e205e457).
If your checkout is newer, the code may have moved a little; compare it with
the linked version before editing.

## See the original tooltip

1. Set the game language to English (US).
2. Create a throwaway singleplayer world with cheats enabled.
3. Open chat and enter:

   ```text
   /give @p gregtech:gt.integrated_circuit 1 1
   ```

   This gives you one Programmed Circuit set to configuration 1. If your
   inventory is full, it drops at your feet; pick it up.
4. Open your inventory and hover over the circuit. You should see these lines:

   ```text
   Configuration == 1
   Right click to reconfigure
   Needs a screwdriver or programming tool
   ```

Keep the world so you can check again after your edit, then quit the game.

## Find and change the code

The text in game doesn't appear in the Java code directly. The code uses a
*translation key*, and a language file maps the key to the English text. So
you search in two steps.

1. In IntelliJ, open **Edit → Find → Find in Files** and search for
   `Right click to reconfigure`. It's found in the
   [English language file](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/resources/assets/gregtech/lang/en_US.lang#L4455-L4457),
   next to the key `GT5U.item.programmed_circuit.tooltip.1`.
2. Search for that key in `src/main/java`. It leads to
   `src/main/java/gregtech/common/items/ItemIntegratedCircuit.java`, in the
   [`addAdditionalToolTips` method](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/items/ItemIntegratedCircuit.java#L200-L213).
   The method adds the configuration line first, then hint `.1`, then hint `.2`.

Swap the two hint lines so they read:

```java
aList.add(StatCollector.translateToLocal("GT5U.item.programmed_circuit.tooltip.2"));
aList.add(StatCollector.translateToLocal("GT5U.item.programmed_circuit.tooltip.1"));
```

Leave the configuration line above them alone. The text itself doesn't change;
only the order does.

## Build and check the result

Save the file and build:

```sh
./gradlew build
```

When you see `BUILD SUCCESSFUL`, start the client:

```sh
./gradlew runClient
```

Open the same world and hover over the circuit again. You should now see:

```text
Configuration == 1
Needs a screwdriver or programming tool
Right click to reconfigure
```

The two hints have swapped, and the configuration line is unchanged. If you
still see the old order, see
[The game runs, but your change is absent](/GTNH-Dev-Doc/troubleshooting/development-client-and-server-problems/#the-game-runs-but-your-change-is-absent).

## Review and undo the exercise

Look at what you changed:

```sh
git diff -- src/main/java/gregtech/common/items/ItemIntegratedCircuit.java
```

The diff should show only the two hint lines trading places. For a real pull
request, this is also the moment to write down what you did: the commands you
ran, the item you checked, and the tooltip before and after. That lets a
reviewer repeat your check.

To undo the exercise, run:

```sh
git restore -- src/main/java/gregtech/common/items/ItemIntegratedCircuit.java
```

This discards every uncommitted change in that file, so only run it if the
swap is the only edit there. Rebuild and relaunch if you want to see the
original order again.
