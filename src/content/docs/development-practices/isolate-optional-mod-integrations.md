---
title: Isolate optional-mod integrations
description: Keep optional API references behind a boundary that can stay unloaded when the dependency is absent.
---

Keep optional-mod code in an implementation that the common startup path can
leave unloaded. A presence check controls whether a call executes; it does
not make an absent superclass or interface safe to resolve. The
[JVM loading and resolution rules](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html#jvms-5.4)
explain why class loading can fail before the guarded operation runs.

## Keep the common entry point independent

Put imports and calls to the optional API in a dedicated compatibility class
or package. The common entry point should use your own types or always-present
types. Avoid optional types in its superclass, interfaces, public signatures,
fields, annotations, and static initialization.

For example, a common interface can describe the operation your mod needs,
while an optional implementation calls the other mod's API. The common startup
path can then choose whether to construct that implementation without requiring
the optional API in the interface itself.

Check availability before constructing or registering the integration.
FML 1.7.10 provides
[Loader.isModLoaded](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/Loader.java)
for presence. That check doesn't tell you whether an API version, method, or
capability is available.

Catching `ClassNotFoundException` inside an integration method cannot protect
a class that already failed to load because of its type hierarchy.

## Check the capability and lifecycle

When supported versions have different APIs, check the version or probe for
the required class or method at the compatibility boundary. Keep reflection
and its failure handling there. Disable the unsupported integration or report
a specific startup error according to the mod's intended dependency contract.

Use the lifecycle phase and dependency ordering appropriate to the
registration. Finding the mod doesn't mean its registry is ready. Avoid registry
access in static initializers, and inspect the mod's initialization path before
choosing where to register.

## Exercise the combinations

Test with the dependency absent and with each API version your code handles.
Include the minimum and newest supported versions, and confirm the intended
failure or disabled-feature behavior for an unsupported combination.

Run the absence case on both a client and dedicated server. An integration
that also uses client-only classes crosses another
[class-loading boundary](/GTNH-Dev-Doc/minecraft-forge-internals/understand-client-and-server-boundaries/).
