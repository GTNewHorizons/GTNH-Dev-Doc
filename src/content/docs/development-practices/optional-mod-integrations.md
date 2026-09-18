---
title: Isolate optional-mod integrations
description: Keep GTNH mods loadable when an optional dependency is absent or has a different API.
---

:::caution[The JVM can resolve types before your guard]
The JVM may resolve an optional mod's types while loading the containing class,
before an installation check inside a method runs.
:::

## Put integration code behind a boundary

Keep optional-mod imports and calls in a dedicated compatibility class or
package. Its GTNH-owned entry point must not expose optional types in fields,
method signatures, annotations, or static initializers.

Load that implementation only after the repository's compatibility check. FML
1.7.10 provides
[`Loader.isModLoaded`](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/Loader.java),
but presence alone establishes neither API version nor feature support.

## Detect the capability you require

For version-dependent APIs, check the version or probe for the required class or
method at the compatibility boundary. Keep reflection there. Disable the
integration or report a clear startup error for unsupported combinations.

`ClassNotFoundException` inside a method cannot protect an optional type in the
containing class's signature; that class may fail before the method runs.

## Respect loading order

Register the integration after the dependency has initialized. Avoid optional
registry access from static initializers and class constructors.

Verify at least these configurations:

1. The optional mod is absent.
2. The minimum supported version is present.
3. The newest supported version is present.
4. An unsupported version fails or disables the feature clearly.

Run the absence case on a client and dedicated server; client-only integrations
add a separate class-loading boundary.
