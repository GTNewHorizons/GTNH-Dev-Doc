---
title: Understand ticks and updates
description: Schedule recurring GTNH work without creating tick spikes or stale state.
---

The server targets 20 ticks per second. All loaded worlds, entities, tile
entities, and scheduled work share about 50 milliseconds per tick. Longer ticks
reduce the effective tick rate.

## Know which tick you are handling

FML exposes server, world, player, client, and render events with `START` and
`END` phases. The
[1.7.10 `TickEvent` source](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/gameevent/TickEvent.java)
shows the available contexts and their sides.

Choose whether work runs once per server, world, or player tick. Registering it
at multiple levels multiplies its executions. Keep authoritative work on the
logical server and rendering or input on the logical client.

## Prefer invalidation over constant polling

Use inventory changes, block updates, configuration changes, or a dirty flag to
invalidate cached results. Recompute on demand or in a later controlled tick.

Poll only when no reliable change signal exists. Choose its interval from the
required response time and cost. Use a cheap change trigger plus a bounded
fallback check.

## Spread periodic work

Spread periodic instances across stable buckets derived from dimension and
coordinates. Running every instance on the same twentieth tick creates a spike.

Do not derive the bucket from the first loaded tick because objects in one chunk
often load together.

## Preserve units and behavior

Name units as ticks, seconds, operations, or rates. Decide whether a feature
follows game time or wall-clock time; 20 completed ticks take more than one
second when the server lags.

When optimizing tick code, verify both cost and behavior:

- Profile in a representative full development pack.
- Test many loaded instances, not one machine in an empty world.
- Exercise insertion, removal, chunk reload, and neighbor changes that should
  invalidate cached state.
- Confirm that the new schedule does not make all instances run together.
