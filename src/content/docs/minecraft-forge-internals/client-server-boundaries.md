---
title: Understand client and server boundaries
description: Separate physical class loading from logical state ownership in Minecraft 1.7.10.
---

Two boundaries matter when a change works in singleplayer but fails on a
dedicated server: which classes the process can load, and which side owns the
game state. Singleplayer puts both logical sides in the physical client
process, so it can hide either error.

## Identify the boundary

| Environment or side | Role |
| --- | --- |
| Physical client | The graphical process, including the integrated server in singleplayer. |
| Physical server | The dedicated server process, where physical-client classes are unavailable. |
| Logical client | Presents received state and collects player input. |
| Logical server | Owns game rules and authoritative world state, on either server type. |

When you have a world, `world.isRemote` identifies its logical side:
`false` is server and `true` is client. An integrated server also has a
server world where this value is false.

For example, a GUI requests a machine-mode change. The client sends the
request, the server validates and changes the mode, and synchronization
returns the result to clients. A static field shared in singleplayer is not
a network synchronization mechanism and can race between its two threads.

## Load client code through a physical-side boundary

Keep renderers, key bindings, audio, and client GUI classes in a client
implementation. Common classes should expose an interface that uses only
types available on both physical sides.

FML 1.7.10's [SidedProxy](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/SidedProxy.java)
selects an implementation by physical environment. In an illustrative mod
with `CommonProxy` and `ClientProxy` classes, the declaration is:

```java
@SidedProxy(
    clientSide = "example.ClientProxy",
    serverSide = "example.CommonProxy")
public static CommonProxy proxy;
```

The common proxy and its public signatures must remain loadable on the
dedicated server. A conditional around a call cannot protect a common class
whose superclass or interface already requires a client-only type.

`@SideOnly` is a declaration for FML's transformer, not a runtime guard.
The [legacy transformer](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/asm/transformers/SideTransformer.java)
removes annotated members or rejects a class on the opposite physical side.
It does not remove every use or initializer referring to that member.
Follow an annotated API's contract and keep callers behind the appropriate
physical-side boundary.

## Use the world or event for logical ownership

Use the world or the event's documented side when deciding whether to change
game state. The
[1.7.10 effective-side helper](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/FMLCommonHandler.java)
infers its result from the thread name. It is not a substitute for the world
associated with an operation, especially on a network or worker thread.

Keep processing, inventory mutation, damage, and entity spawning on the
logical server. The client may predict or display behavior, but the server
must validate the authoritative operation.

## Validate and dispatch network requests

A handler's target side does not make its input trusted. In SimpleImpl,
the [indexed codec](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/network/FMLIndexedMessageToMessageCodec.java)
creates the message and
[SimpleIndexedCodec](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/network/simpleimpl/SimpleIndexedCodec.java)
calls `fromBytes` before the handler runs.

Check readable bytes, identifiers, and length limits before allocation or
loops during decoding. In the handler, check permission, dimension,
[loaded location](/GTNH-Dev-Doc/minecraft-forge-internals/chunk-boundaries/),
and current state before applying the requested action.

The [handler wrapper](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/network/simpleimpl/SimpleChannelHandlerWrapper.java)
calls `onMessage` from its network channel. A side value does not establish
that the game thread is executing the handler. Use the repository's
network-to-game-thread mechanism for world work; do not copy a scheduler API
from newer Minecraft documentation.

Verify the feature in a client and with a client connected to a dedicated
server. Check both successful requests and invalid or stale requests.
An invalid-side class-loading error points toward a reference crossing the
physical boundary; stale state needs a separate synchronization investigation.
