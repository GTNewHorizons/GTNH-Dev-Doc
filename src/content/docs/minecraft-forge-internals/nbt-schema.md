---
title: Treat NBT as a persistent schema
description: Preserve the meaning of released keys and define defaults and migrations for older saved data.
---

A released NBT key becomes part of the data your newer code must read.
Changing a field's name, unit, or interpretation can change an existing world
even when the new code compiles. Decide how your code should handle old data
before changing serialization.

## Distinguish absence from a stored value

Minecraft 1.7.10's `NBTTagCompound.getInteger` returns zero for a missing
key, and `getBoolean` returns false. Those defaults are not necessarily
your feature's legacy behavior. Use `hasKey`, including a type check when
needed, before choosing the fallback.

For an illustrative machine whose old mode is `1` and valid modes are
`0` through `2`, this helper preserves stored zero while giving absent,
wrong-type, and invalid values the defined fallback:

```java
private static int readMode(NBTTagCompound tag) {
    if (!tag.hasKey("mode", Constants.NBT.TAG_INT)) {
        return 1;
    }
    int mode = tag.getInteger("mode");
    return mode >= 0 && mode <= 2 ? mode : 1;
}
```

This is a fragment for the owning read hook, using `NBTTagCompound` and
Forge's [Constants.NBT](https://github.com/MinecraftForge/MinecraftForge/blob/1.7.10/src/main/java/net/minecraftforge/common/util/Constants.java).
Choose the fallback and accepted types from your actual old schema.
For this example, write the canonical value with `setInteger("mode", mode)`.

## Preserve the serialization contract

Call the superclass's read and write methods in the expected order and avoid
keys it owns. For a tile entity, that includes identity and coordinates.
For a parent-class change, inspect subclasses that may override its hooks.

Load raw values before depending on neighbors, players, or external networks.
Use the owning lifecycle to initialize those relationships. Saving a runtime
object reference does not make it a valid relationship after reload.

Validate combinations as well as individual ranges. A numeric value can be
in range while conflicting with another field or referring to removed content.
Define the fallback, migration, or rejected-load behavior for that case.

## Make a format change explicit

Keep the key when its meaning stays the same. For a renamed key, changed unit,
or changed identifier, read the old form deliberately and write the new
canonical form. Accept the older numeric types required by the migration;
merely changing an integer getter to a long getter does not define the
compatibility contract.

A missing-key check can be enough for one additive field. Use a data-version
key when several historical formats require ordered migrations.
Do not reuse a retired key for a different meaning.

## Verify old data through a full save cycle

Keep a representative tag or world from the previous release.
Check that it loads with the intended behavior, saves the canonical form,
and loads that form again without another change.

Include absent keys, wrong types, invalid identifiers, and boundary values.
For world state, test chunk unload and a process restart as well as an
in-memory read. Follow
[the tile lifecycle](/GTNH-Dev-Doc/minecraft-forge-internals/tile-entity-state/)
and record the tested old format in the pull request.
