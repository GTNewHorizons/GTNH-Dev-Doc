---
title: Understand tile entity state
description: Follow a machine value through server ownership, saving, synchronization, and client presentation.
---

A machine's mode can work correctly until the world restarts, or change on the
server while its GUI still shows the old value. The field needs separate paths
for saving and synchronization. Follow the mode from the server accepting a
GUI request, through saving it, to sending the state clients need to display.

## Decide what the value belongs to

| Value | Owner and lifetime |
| --- | --- |
| A machine's operating mode | Server-owned world state; persist it if it must survive reload. |
| Progress shown in an open GUI | Server state copied through the GUI's synchronization mechanism. |
| A rendered state visible outside the GUI | Server state sent to the clients tracking the tile. |
| A player's display preference | Client configuration or player-scoped data, according to the feature. |
| A derived cache | Recompute or invalidate it when its inputs or lifecycle change. |

Putting a personal preference in machine NBT makes it shared by every user
of that machine. Decide whether a value belongs to the machine, the player,
or the client before choosing where to store it.

## Persist the authoritative value

For the machine mode, add the value to the owning class's save and load hooks.
Keep the superclass's serialization behavior: an ordinary `TileEntity` writes
its identity and coordinates in `writeToNBT`, and subclasses add their own
values alongside that data.
[Evolve those keys as a schema](/GTNH-Dev-Doc/minecraft-forge-internals/treat-nbt-as-a-persistent-schema/)
when released worlds already contain them.

When the server accepts a new mode, call the relevant dirty-marking path so
the changed state will be saved.
In Minecraft 1.7.10, `TileEntity.markDirty()` marks its chunk for saving and
performs related world notifications. It does not serialize and send an
arbitrary field to clients. You can inspect that implementation in the
[Forge development sources](/GTNH-Dev-Doc/build-tools/understand-the-gtnh-build-system-stack/)
generated for your checkout.

Read the saved mode without assuming that neighbors or external networks are
ready. Reconnect to those objects through the owning lifecycle after loading.

## Send the state needed by the audience

Ordinary 1.7.10 Forge tiles can use `getDescriptionPacket()`,
`S35PacketUpdateTileEntity`, and `onDataPacket(...)`.
`worldObj.markBlockForUpdate(xCoord, yCoord, zCoord)` requests the update
path; it is useful only when that path carries the value.
The [Forge tile hooks](https://github.com/MinecraftForge/MinecraftForge/blob/1.7.10/patches/minecraft/net/minecraft/tileentity/TileEntity.java.patch)
define the legacy callbacks.

In GT5, a metatile entity is the machine implementation hosted by a base tile.
It participates in persistence and synchronization through that owning tile.
Follow [BaseMetaTileEntity's lifecycle](https://github.com/GTNewHorizons/GT5-Unofficial/blob/master/src/main/java/gregtech/api/metatileentity/BaseMetaTileEntity.java)
and the affected machine's existing hooks instead of adding vanilla tile
callbacks to a metatile entity.

Choose who needs the mode. If it only changes a label in the open GUI, use the
GUI's synchronization mechanism. If it changes the machine's appearance in the
world, send it to clients tracking the tile. Include initial state for a client
that begins tracking, then send later changes; a change-only update leaves a
newly joined client without the current value.

Use a focused packet when the audience or lifecycle does not fit those paths.
The client's copy is for presentation. The server still owns the value used
to run the machine.

## Use symptoms to find the missing boundary

| Observation | Investigate |
| --- | --- |
| Mode resets after unload or restart | Written NBT, read defaults, and dirty marking. |
| Server mode changes but the display stays stale | The update trigger and payload reaching the client. |
| Existing client is correct but a newly joined client is wrong | Initial tracking or GUI synchronization. |
| One player's display choice affects another | Preference ownership and storage. |

Repeat the checks on a dedicated server. Close and reopen the GUI, leave and
return to tracking range, unload/reload the chunk, and restart the world.
These observations help you find the missing mechanism, but you still need to
inspect the relevant path to confirm the cause.
