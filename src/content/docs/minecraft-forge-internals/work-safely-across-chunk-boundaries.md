---
title: Work safely across chunk boundaries
description: Distinguish a loaded location from a coordinate and avoid unintended loads and stale tile references.
---

A coordinate identifies a location, not a loaded chunk or a current tile
instance. Decide whether an operation is allowed to load that location before
asking the world for its block or tile.

## Check availability before a non-loading read

In the standard Minecraft 1.7.10 world path, `getBlock` and `getTileEntity`
can reach the chunk provider's `provideChunk` operation. They are not
non-loading existence checks.

For ordinary world access that must avoid loading, use
`world.blockExists(x, y, z)` with **block coordinates** before the getter.
A provider-level `chunkExists(x >> 4, z >> 4)` takes **chunk coordinates**.
Inspect `World`, the active chunk provider, and any mod overrides in the
[development sources](/GTNH-Dev-Doc/build-tools/understand-the-gtnh-build-system-stack/)
for the actual path.

If the location is unavailable, defer the operation or return the feature's
defined unavailable result. Treating it as air or as an empty inventory can
make a network or multiblock cache record a false conclusion.

Validate packet dimensions and loaded targets before world getters.
A requested coordinate should not cause arbitrary chunk loading simply
because it arrived from a client.

## Resolve current objects after lifecycle changes

An endpoint can retain its coordinates while its tile is unloaded, replaced,
or invalidated. Store dimension and coordinates for persistent relationships,
then resolve the current object only when access is allowed.

For a cached tile, check validity and confirm that the expected object still
occupies the location. Clear the cache on relevant unload or removal signals.
A reference that was valid earlier doesn't tell you whether the endpoint is still there.

## Account for the update path's own loads

In the standard 1.7.10 server path, `notifyBlockOfNeighborChange` calls
`getBlock` before the neighbor callback. That can load the neighboring chunk.
Trace this path before assuming an unloaded neighbor simply missed a
notification and adding continuous recovery polling.

Separate the intended notification behavior from its loading cost.
Wrappers or modded providers can change that path, so verify the actual
configuration your feature uses.

## Exercise partial loading

Place the feature across a chunk border and test both endpoints loaded,
one endpoint loaded, and a missing intermediate chunk. Then unload/reload and
remove or replace an endpoint while the other is absent.

Check that non-loading paths do not generate or load chunks and that caches
resolve the replacement rather than reusing a stale instance.
Separately check notification paths that are intentionally allowed to load.
For saved endpoint data, include
[the persistence checks](/GTNH-Dev-Doc/minecraft-forge-internals/treat-nbt-as-a-persistent-schema/).
