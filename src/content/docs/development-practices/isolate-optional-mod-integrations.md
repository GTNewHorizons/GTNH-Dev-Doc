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

## Example: register aspects for your own item

This example uses Thaumcraft 4.2.3.5, which
[GT5 declares as a compile-only dependency](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/dependencies.gradle#L89).
Follow your project's dependency setup when compiling against this API.

The example uses three separate source files. The fragments below omit
package declarations and the startup class's imports.
`ExampleItems.widget` stands for an item your mod has already registered.
The FIRE aspect and its amount are example values.

The common interface, `ItemAspectIntegration.java`, uses a Minecraft type that
is available with or without Thaumcraft:

```java
import net.minecraft.item.ItemStack;

public interface ItemAspectIntegration {
    void register(ItemStack ownItem);
}
```

Only `ThaumcraftItemAspects.java` imports the optional API:

```java
import net.minecraft.item.ItemStack;
import thaumcraft.api.ThaumcraftApi;
import thaumcraft.api.aspects.Aspect;
import thaumcraft.api.aspects.AspectList;

public final class ThaumcraftItemAspects implements ItemAspectIntegration {
    @Override
    public void register(ItemStack ownItem) {
        ThaumcraftApi.registerObjectTag(
            ownItem, new AspectList().add(Aspect.FIRE, 2));
    }
}
```

In your common startup class, `ExampleMod.java`, check for Thaumcraft before
constructing the integration:

```java
@Mod(modid = "example", version = "1.0",
     dependencies = "after:Thaumcraft")
public final class ExampleMod {
    @Mod.EventHandler
    public void postInit(FMLPostInitializationEvent event) {
        if (Loader.isModLoaded("Thaumcraft")) {
            ItemAspectIntegration integration = new ThaumcraftItemAspects();
            integration.register(new ItemStack(ExampleItems.widget));
        }
    }
}
```

FML uses `after:Thaumcraft` to order your mod after Thaumcraft when it's
present. The entry leaves Thaumcraft optional; see
[FML's dependency parser](https://github.com/MinecraftForge/FML/blob/a099592d3d1418245e3af65eda195da244287188/src/main/java/cpw/mods/fml/common/Loader.java#L660-L689)
for how it's read. By the time this post-init handler runs, Thaumcraft has
initialized its aspects. The API call sets the supplied item's aspect entry,
so use your own item here.

GT5 uses the same separation in its
[common interface](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/interfaces/internal/IThaumcraftCompat.java#L5-L33),
[guarded construction](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/GTProxy.java#L458-L464),
and [API implementation](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/GTThaumcraftCompat.java#L303-L319).

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
