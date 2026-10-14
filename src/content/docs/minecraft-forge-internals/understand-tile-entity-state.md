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

## Example: the World Accelerator's mode

In [this GT5 revision](https://github.com/GTNewHorizons/GT5-Unofficial/tree/b7fc37e18719b3829cc4752542b5b298e205e457),
the World Accelerator stores its server-owned mode in
`MTEWorldAccelerator.mMode`. A screwdriver action changes the mode, and the
client uses its copy to select the block's texture. Follow the value through
these paths:

1. **Change and dirty marking.**
   The [base tile's right-click path](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/BaseMetaTileEntity.java#L1428-L1466)
   invokes the screwdriver callback on the logical server.
   The [machine callback](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/tileentities/machines/basic/MTEWorldAccelerator.java#L303-L331)
   toggles `mMode` between `0` and `1` when the player is not sneaking, then
   calls `markDirty()`.
   [The metatile's method](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/MetaTileEntity.java#L609-L613)
   delegates to [the owning tile](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/BaseTileEntity.java#L560-L570),
   which marks the chunk modified.
2. **Save and load.**
   The machine's [`saveNBTData` and `loadNBTData` hooks](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/tileentities/machines/basic/MTEWorldAccelerator.java#L215-L244)
   write and read `mMode` as a byte under `mAccelMode`.
   The [owning base tile](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/CommonBaseMetaTileEntity.java#L315-L368)
   invokes those hooks.
3. **Initial client state.**
   [`getUpdateData()`](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/tileentities/machines/basic/MTEWorldAccelerator.java#L120-L128)
   returns `mMode` as the machine's custom byte.
   [`BaseMetaTileEntity.tileWriteToStream`](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/BaseMetaTileEntity.java#L677-L697)
   puts that byte in the description payload, and
   [`CommonBaseMetaTileEntity`](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/CommonBaseMetaTileEntity.java#L489-L532)
   owns the description packet and its receive path.
4. **Later changes.**
   Server ticks [detect custom-byte changes](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/CommonBaseMetaTileEntity.java#L292-L298)
   and emit a `CHANGE_CUSTOM_DATA` event.
   At this revision, [the event tracker](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/data/GTBlockEventTracker.java#L38-L57)
   batches later events at server tick END, and
   [`GTNetwork.sendToWorld`](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/GTNetwork.java#L143-L150)
   broadcasts them to players in that world/dimension.
5. **Client presentation.**
   [The client's base-tile callback](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/metatileentity/BaseMetaTileEntity.java#L724-L727)
   calls `onValueUpdate(byte)`, which assigns the client's copy of `mMode`.
   [`getTexture`](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/tileentities/machines/basic/MTEWorldAccelerator.java#L192-L200)
   uses that copy to select the mode's texture.

The World Accelerator's load hook reads a raw byte. When you add or change
persistent fields, follow the
[NBT schema guidance](/GTNH-Dev-Doc/minecraft-forge-internals/treat-nbt-as-a-persistent-schema/)
for defaults and validation.

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
