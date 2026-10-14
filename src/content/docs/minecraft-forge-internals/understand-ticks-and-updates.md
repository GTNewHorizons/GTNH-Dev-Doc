---
title: Understand ticks and updates
description: Match recurring work to its event context, preserve units, and avoid synchronized workload spikes.
---

Minecraft's server targets 20 ticks per second, leaving about 50 milliseconds
for each tick's game-thread work. A costly machine update shares that budget
with the rest of the loaded world. Rendering has a separate client frame
schedule.

## Choose the event and phase that match the work

FML 1.7.10's
[TickEvent](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/gameevent/TickEvent.java)
defines server, world, player, client, and render contexts with `START`
and `END` phases.

A server-level operation should run once per server tick; a per-world
operation should use its world context. Registering the same work at several
levels, or handling both phases accidentally, multiplies its executions.
Keep authoritative state changes on the logical server.

State the unit of an interval. Twenty completed game ticks represent one
second at the target tick rate; under lag, a tick-based cooldown takes longer
in wall-clock time. Choose the intended clock before replacing a counter
with a real-time deadline.

## An event can describe an attempt

Read the specific event's contract before reacting. A cancelable pre-event
can report an attempted action that another handler later cancels.
The [legacy EventBus](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/eventhandler/EventBus.java)
runs its eligible listeners before returning the final cancellation state.

For example, charging a cost as soon as an attempted placement event arrives
can debit the player even if the action is later canceled. Use a completion
event or verified resulting state when the API provides one. Do not treat
notification order as proof that the operation completed.

## Recompute when the inputs change

For a machine's cached recipe result, identify all inputs: inventory, fluids,
mode, relevant neighbors, and configuration. Invalidate the cache when those
inputs change, then recompute when needed or in controlled tick work.

Use polling when no reliable signal covers an input, with an interval chosen
from response time and cost. A cheap change signal plus a bounded fallback
check can cover missed invalidation without repeating the expensive work on
every tick.

## Distribute periodic work

If every loaded machine performs a large check on tick 20, the average cost
may look acceptable while that tick stalls. A check that runs every 20 ticks
can keep that interval while different machines use different offsets within
it. Derive stable offsets from dimension and coordinates or another persistent
identity so their work is spread across ticks.

A first-load timestamp is a poor offset source because many objects in a
chunk load together. Preserve each instance's required interval and response
time while distributing its work.

## Measure behavior as well as cost

Compare the same representative workload before and after an optimization.
Use many loaded instances or a busy full pack rather than one machine in an
empty world.
Follow [Measure a performance change](/GTNH-Dev-Doc/testing/measure-a-performance-change/)
for the workload, Forge timing command, and Java profile capture. Mean tick
time can show lower average cost. The guide's JDK 25 method-timing example
also measures maximum tick duration, which matters when evaluating periodic
spikes.

Check inventory and neighbor changes, mode changes, unload/reload, and the
periodic fallback. Confirm that the result stays current and that the new
schedule spreads work instead of moving the same spike to another tick.
