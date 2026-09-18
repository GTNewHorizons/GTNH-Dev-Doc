---
title: Understand tile entity state
description: Separate authoritative state, saved state, client synchronization, and player preferences.
---

A tile entity field reaches neither disk nor clients automatically. Classify
each value before choosing its storage and synchronization.

## Identify the state you are adding

| Kind of state | Owner | Typical mechanism |
| --- | --- | --- |
| Authoritative game state | Logical server | A server-side field changed by game logic |
| Persistent world state | Saved chunk or world | NBT, followed by dirty marking when it changes |
| Client-visible state | Server, copied to tracking clients | Description/update packets, GUI sync values, or a focused custom packet |
| Player preference | Individual client or player | Client configuration or player-scoped data |

A machine mode may need three mechanisms: server authority, NBT persistence,
and client synchronization for rendering.

## Persist only world state

Store state that must survive unload or restart in NBT. Call the superclass and
follow the repository's serialization hooks. Mark changed persistent state
dirty so its chunk is saved.

`markDirty()` concerns persistence. It does not by itself tell clients that a
rendered value changed. Forge's
[tile entity documentation](https://docs.minecraftforge.net/en/1.12.x/tileentities/tileentity/)
separates saving, dirty marking, and the available synchronization paths.

Machine NBT makes a value shared by every user and tied to that machine. Store
player-specific accessibility and display choices in client configuration or
player data.

## Synchronize what the client actually needs

Synchronize only the state clients need, using the owning repository's existing
mechanism:

- Include initial state in the tile's description data when a tracking client
  first receives it.
- Send an update when a client-visible value changes after that initial sync.
- Use the GUI framework's sync values for data needed only while a panel is
  open.
- Use a focused packet when the lifecycle or audience does not match those
  mechanisms.

Removing an update call can leave the client stale even when the server field
still changes.

## Verify the complete lifecycle

Test each state boundary:

1. Change the value on a dedicated server and observe it from a connected
   client.
2. Close and reopen the GUI or move out of tracking range and return.
3. Unload and reload the chunk.
4. Restart the world.
5. Connect two players with different client preferences when the feature is
   player-specific.

Each failure identifies a missing boundary: authority, synchronization,
persistence, or preference storage.
