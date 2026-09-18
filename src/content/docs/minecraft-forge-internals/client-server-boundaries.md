---
title: Understand client and server boundaries
description: Keep game logic authoritative and client-only code safe on dedicated GTNH servers.
---

:::note[Single player hides side errors]
Single player runs client and server logic in one process. Code can therefore
work there but desynchronize in multiplayer or crash a dedicated server.
:::

## Separate physical environments from logical sides

| Term | Meaning |
| --- | --- |
| **Physical client** | The graphical Minecraft process. In single player it contains both a logical client and an integrated logical server. |
| **Physical server** | The dedicated server process. Client-only Minecraft classes are unavailable here. |
| **Logical client** | Handles player input and presents state received from the server. |
| **Logical server** | Owns game rules and authoritative state. It runs on both dedicated and integrated servers. |

The official Forge
[sides guide](https://docs.minecraftforge.net/en/1.12.x/concepts/sides/)
describes this model using the same `world.isRemote`, `@SidedProxy`, and
`FMLCommonHandler` APIs used by 1.7.10.

## Choose the check that matches the question

When you have a `World`, use `world.isRemote` to identify its **logical** side:

```java
if (!world.isRemote) {
    // Change authoritative game state here.
}
```

`false` means logical server and `true` means logical client. The integrated
server also has a world where `isRemote` is `false`.

Use the physical side when loading renderers, key bindings, or other
physical-client code. The usual 1.7.10 mechanism is `@SidedProxy`:

```java
@SidedProxy(
    clientSide = "example.ClientProxy",
    serverSide = "example.CommonProxy")
public static CommonProxy proxy;
```

FML creates one proxy for the physical environment. The
[GTNH example mod](https://github.com/GTNewHorizons/ExampleMod1.7.10/blob/master/src/main/java/com/myname/mymodid/MyMod.java)
uses this pattern, and its
[client proxy](https://github.com/GTNewHorizons/ExampleMod1.7.10/blob/master/src/main/java/com/myname/mymodid/ClientProxy.java)
is the intended home for client-only registration.

Use a `World` or event instead of
`FMLCommonHandler.instance().getEffectiveSide()` when possible. Its
[1.7.10 implementation](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/FMLCommonHandler.java#L147-L162)
result is inferred from the thread name.

## Isolate client-only classes

Keep rendering, input, audio, GUI, and other client-only references inside
client implementation classes. Common code should call through an interface or
proxy that contains no client-only types in fields, signatures, or static
initializers.

A side check around a call is insufficient because class loading can resolve
client references before the branch runs. A proxy prevents the server from
loading the client implementation. Forge's 1.7.10
[`@SidedProxy` source](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/SidedProxy.java)
documents this purpose directly.

## Keep game state on the logical server

Run machine processing, inventory changes, entity spawning, damage, and other
state changes on the logical server. Use the client for presentation and input,
and synchronize through packets or existing update mechanisms.

Static fields do not synchronize logical sides. They fail across a network and
can race between integrated client and server threads.

## Treat `@SideOnly` as a declaration, not a guard

`@SideOnly` causes FML's transformer to remove annotated members or reject an
annotated class on the opposite physical side. It does not perform a runtime
side check, and annotating a field does not protect code in its initializer.

It is reasonable to annotate code that is inherently client-only and would fail
on a dedicated server anyway, such as a method that calls another client-only
method. The annotation makes that restriction explicit. It is also appropriate
when required by the surrounding API, such as an already annotated vanilla
override.

Code loaded on both physical sides must still guard calls to annotated members
with the appropriate side check, or route them through a sided proxy. The
annotation does not make an unguarded call safe. Its
[1.7.10 documentation](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/relauncher/SideOnly.java)
also notes that it is primarily intended for Forge and FML internals.

## Verify both environments

For any change that touches side-specific behavior:

1. Exercise it in a development client.
2. Start and join a dedicated development server.
3. Verify that the server owns the state and connected clients receive it.

An `Attempted to load class ... for invalid side SERVER` error usually means a
common class still has a direct or indirect reference to client-only code.
