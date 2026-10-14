---
title: Find where a change belongs
description: Trace a game symptom, recipe, or build failure to the source that owns it.
---

Start with evidence you can search: a registry name, translation key, exact log
message, configuration key, or stack-trace class. A pack symptom can originate
in a mod, a pack override, or tooling. Use the
[repository map](/GTNH-Dev-Doc/concepts/repository-map/) to choose candidate
checkouts, then confirm ownership in their source.

## Capture an identifier

For an item or recipe, use
[in-game inspection](/GTNH-Dev-Doc/how-to/in-game-testing-tools/)
to record its registry identity and inputs, outputs, machine, and quantities.
A display name may be translated, and a different mod may register the recipe
for that item.

For a crash, keep the first relevant exception and its stack trace.
For a build failure, keep the task and dependency coordinates. Use
[Locate logs](/GTNH-Dev-Doc/how-to/locate-logs/) when the visible error is only
a summary.

## Find the code or data that produces the behavior

1. Search the exact identifier or message in the candidate checkout. With
   ripgrep installed, run this from its root, replacing `EXACT-TEXT`:

   ```sh
   rg -n -F 'EXACT-TEXT' .
   ```

   Your IDE's **Find in Files** is another way to search. If the match is a
   language-file value, find its key's Java references. If it is configuration,
   find the code that reads the key.
2. Follow the matching registration, caller, or consumer to the behavior.
   A wrapper or addon may delegate to another mod. Search pack scripts and
   configuration when the behavior differs from the mod's default.
3. If the implementation comes from a dependency, inspect the dependency
   declaration and imports. Confirm the matching source repository and version
   before editing a similarly named local class.
4. Read nearby tests, history, and linked issues to understand the contract.
   Use blame to find that context. Code isn't wrong merely because it's old.

For tooling, distinguish the repository's configuration from the plugin or
workflow implementing it. The
[build-system overview](/GTNH-Dev-Doc/concepts/build-system-stack/)
shows where GTNHGradle, RetroFuturaGradle, shared CI, and pack assembly fit.

## Confirm the owner before editing

You should be able to name the repository, relevant file or call path,
reproduction, and check that will verify the change. Read that repository's
contribution instructions and inspect existing issues and pull requests.

If the evidence still points to several owners, share the reproduction and
locations you checked in the relevant issue or
[GTNH Discord](https://discord.gg/EXshrPV). For coordinated work, identify
separate changes and their dependency order rather than opening competing
fixes in several repositories.
