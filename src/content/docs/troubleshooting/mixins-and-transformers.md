---
title: Mixins and transformers
description: Enable focused diagnostics for failed mixins and transformed classes.
sidebar:
  order: 6
---

:::note[Patch ownership]
GTNH keeps mixin-based fixes and tweaks for Minecraft, Forge, and bundled mods
whose source cannot be changed directly in
[Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge). Change a
GTNH-maintained mod at its source when possible.
:::

Add diagnostic flags only to a local development run and remove them after
capturing the failure:

- `-Dmixin.debug=true` enables Mixin diagnostics.
- `-Dmixin.debug.verbose=true` raises verbose Mixin messages to the visible log.
- `-Dmixin.debug.export=true` exports classes after mixins are applied.
- `-Dmixin.debug.countInjections=true` turns an unexpected injection count into
  an error.
- `-Dfml.debugAccessTransformer=true` logs access-transformer application.
- `-Dlegacy.debugClassLoading=true` enables legacy class-loading diagnostics.
- `-Dhodgepodge.dumpClass=true` dumps classes transformed by Hodgepodge.

Start with the flag matching the symptom; class dumps can be large.
See the [Development wiki's JVM flag reference](https://wiki.gtnewhorizons.com/wiki/Development#JVM_flags)
for advanced flags and their code references.
