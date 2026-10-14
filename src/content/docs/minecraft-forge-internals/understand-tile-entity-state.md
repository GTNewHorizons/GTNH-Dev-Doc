---
title: Understand tile entity state
description: Follow a machine value through server ownership, saving, synchronization, and client presentation.
---

A tile entity field isn't saved or sent to clients automatically.
Consider a machine mode selected in a GUI: the server owns the mode, saving
keeps it across reloads, and synchronization sends a copy to the client.
Saving and synchronization handle different parts of that lifecycle.

## Decide what the value belongs to

| Value | Owner and lifetime |
| --- | --- |
| A machine's operating mode | Server-owned world state; persist it if it must survive reload. |
| Progress shown in an open GUI | Server state copied through the GUI's synchronization mechanism. |
| A rendered state visible outside the GUI | Server state sent to the clients tracking the tile. |
| A player's display preference | Client configuration or player-scoped data, according to the feature. |
| A derived cache | Recompute or invalidate it when its inputs or lifecycle change. |

Putting a personal preference in machine NBT makes it shared by every user
of that machine. Choose ownership before selecting a convenient storage hook.

## Persist the authoritative value

Use the owning class's serialization hooks and preserve its superclass
contract. An ordinary `TileEntity` writes its identity and coordinates in
`writeToNBT`; subclasses add their own values alongside that data.
[Evolve those keys as a schema](/GTNH-Dev-Doc/minecraft-forge-internals/treat-nbt-as-a-persistent-schema/)
when released worlds already contain them.

Call the relevant dirty-marking path when persistent state changes.
In Minecraft 1.7.10, `TileEntity.markDirty()` marks its chunk for saving and
performs related world notifications. It does not serialize and send an
arbitrary field to clients. You can inspect that implementation in the
[Forge development sources](/GTNH-Dev-Doc/concepts/understand-the-gtnh-build-system-stack/)
generated for your checkout.

Read saved values without assuming that neighbors or external networks are
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

Include initial state for a client that begins tracking, then send changes
afterward. Use a GUI sync value when only the open panel needs the data.
Use a focused packet when the audience or lifecycle does not fit those paths.
Keep client-side presentation separate from the server's authoritative value.

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
