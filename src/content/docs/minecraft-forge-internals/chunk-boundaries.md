---
title: Work safely across chunk boundaries
description: Avoid forced chunk loads, false air results, and stale tile references.
---

:::caution[Coordinates do not imply a loaded chunk]
Coordinates do not guarantee that a chunk is loaded or that a previously found
object is still valid.
:::

## Check before reading

In Minecraft 1.7.10, `World#getBlock` and `World#getTileEntity` load the target
chunk if necessary. Before calling them, use the repository's non-loading check,
commonly `blockExists` or `chunkExists`, when loading the chunk is not intended.

Unchecked packet coordinates can generate arbitrary chunks. Validate that the
target is loaded before accessing it
([Forge SimpleImpl documentation](https://docs.minecraftforge.net/en/1.12.x/networking/simpleimpl/)).

## Do not trust cached tile instances forever

A tile entity reference becomes stale after unload, replacement, or
invalidation. Store dimension and coordinates for persistent relationships,
then resolve the current object only while its chunk is loaded.

Before using a cached instance, check its validity and confirm that the expected
block or tile still occupies the location. Clear the cache when an endpoint
unloads or is destroyed.

## Account for neighbor updates loading chunks

In Minecraft 1.7.10, a neighbor update loads the neighboring chunk when
necessary, and the neighbor receives the update. Do not add recovery polling on
the assumption that the notification is discarded at an unloaded chunk
boundary; account for the chunk-loading cost instead.

## Test partial loading

Build the feature across a chunk border, then test these states separately:

- both ends and the connecting chunks loaded;
- only one endpoint loaded;
- endpoints loaded while a middle chunk is absent;
- unload followed by reload;
- removal or replacement while the other endpoint is unloaded.

Confirm that non-loading paths do not generate a chunk or reuse an invalid
object. Separately verify that a neighbor update reaches a neighbor whose chunk
was initially unloaded.
