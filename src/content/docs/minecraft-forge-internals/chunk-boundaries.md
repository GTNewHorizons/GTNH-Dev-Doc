---
title: Work safely across chunk boundaries
description: Avoid forced chunk loads, false air results, and stale tile references.
---

:::caution[Coordinates do not imply a loaded chunk]
Coordinates do not guarantee that a chunk is loaded or that a previously found
object is still valid.
:::

## Check before reading

Some world lookups load or generate an unavailable chunk; others return an
absence-like result. An unavailable result does not prove that the block is air.

Before reading a block or tile entity, use the repository's non-loading check,
commonly `blockExists` or `chunkExists` in 1.7.10. Do not load a chunk merely to
check whether a remote endpoint exists.

A GT5 review caught a line-of-sight check interpreting an unloaded chunk as air
and asked for the removed `chunkExists` guard to be restored
([PR #7022](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7022#discussion_r3478348307)).

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

## Design for missed notifications

Neighbor and block updates are not queued for unloaded chunks. A connected
structure can therefore miss a change at another endpoint.

Use notifications for fast response and a bounded recheck when an endpoint
loads or becomes active. A laser-pipe review found that avoiding chunk loads
also allows unloaded segments to miss state changes
([PR #7682](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7682#discussion_r3886688814)).

## Test partial loading

Build the feature across a chunk border, then test these states separately:

- both ends and the connecting chunks loaded;
- only one endpoint loaded;
- endpoints loaded while a middle chunk is absent;
- unload followed by reload;
- removal or replacement while the other endpoint is unloaded.

Confirm that no case generates a chunk or reuses an invalid object.
