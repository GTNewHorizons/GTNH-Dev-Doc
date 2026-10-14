---
title: Treat rendering and block bounds as shared state
description: Preserve caller-visible render state and prevent one block position from leaking bounds into another.
---

Minecraft 1.7.10 reuses mutable renderer and block state. A draw that leaves
a color changed can tint the next item; a texture override or changed bounds
can leak into later draws too. Preserve the state expected by the calling
renderer on every path, including cache hits and early returns.

## Restore the state the operation changes

Balance matrix pushes and pops, and restore altered blending, lighting,
culling, alpha, depth, light-map, texture, and color state as required by the
calling renderer. A [matrix pop](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glPushMatrix.xml)
restores matrix state; it does not reset unrelated rendering state.

Use a `try`/`finally` boundary or the repository's supported state guard
when an operation can return early or fail. Restore the prior state or the
explicit state required by the caller, rather than assuming a convenient
default is always correct.

`RenderBlocks` also carries mutable bounds and override-texture state.
A cache hit must leave the same caller-visible state as the uncached path.
Cache calculated geometry or immutable data instead of a renderer whose
current fields belong to a draw.

### Example: restore a texture override

For a standard block draw in a Minecraft 1.7.10 client renderer, preserve the
caller's `RenderBlocks.overrideBlockTexture`. Clearing it unconditionally
would discard an override supplied by an outer rendering operation.

This helper uses `net.minecraft.client.renderer.RenderBlocks`,
`net.minecraft.block.Block`, and `net.minecraft.util.IIcon`. Call it where the
renderer already has the correct world access and block bounds:

```java
private static boolean renderWithTexture(
    RenderBlocks renderer, Block block, int x, int y, int z, IIcon icon) {
    IIcon previousOverride = renderer.overrideBlockTexture;
    try {
        renderer.setOverrideBlockTexture(icon);
        return renderer.renderStandardBlock(block, x, y, z);
    } finally {
        renderer.setOverrideBlockTexture(previousOverride);
    }
}
```

The `finally` block restores either the previous icon or `null`, including
when the draw returns early or throws. In the generated 1.7.10 `RenderBlocks`,
`setOverrideBlockTexture` assigns that field directly. This guard covers the
texture override; matrix, OpenGL, and bounds changes still need their own
matching restoration.

Check the helper with both a null starting override and a different starting
icon. After drawing, the field should hold the original reference in each
case. Also render an unrelated block afterward to check for a visible leak.

## Block bounds belong to the shared block instance

A registered `Block` instance represents every position using that block.
Its six bounds fields are mutable instance fields, not values owned by the
tile or position being queried. Two positions with different shapes still
write to the same block instance's bounds.

For metadata- or tile-dependent shapes, set all six bounds on every relevant
path before using inherited collision, selection, or ray tracing behavior.
Otherwise, a query at one position can reuse bounds established by another.
Prefer a local `AxisAlignedBB` when the API permits an independent result.

A zero-volume bounding box is not the same as no collision. The legacy
`AxisAlignedBB.intersectsWith` comparisons can report overlap when a
degenerate box lies inside another box. Return `null` from the collision-box
path for no collision; otherwise return the intended ordered bounds.

Inspect `Block`, `RenderBlocks`, and `AxisAlignedBB` in the
[generated 1.7.10 sources](/GTNH-Dev-Doc/build-tools/understand-the-gtnh-build-system-stack/)
when changing these contracts.

## Invalidate cached data at the right boundary

Include every input that changes the result: metadata, model state, render
pass, and resource generation where applicable. Clear resource-dependent
caches on reload so an old texture or model does not survive a new resource
pack.

Measure the view that makes the renderer expensive, such as many visible
machines or a large recipe page. Include cache construction, misses, and
resource reloads in the comparison. Avoid rebuilding unchanged geometry or
resolving the same resources on every frame.
Use [Measure a performance change](/GTNH-Dev-Doc/testing/measure-a-performance-change/)
to compare the client view and record the Java work behind it.

## Check interactions, not only the isolated object

Render beside unrelated blocks, items, GUI elements, and translucent geometry.
Exercise cold and warm caches, early returns, alternate metadata, and a
resource reload. For bounds, query two differently shaped positions in both
orders.

A correct isolated screenshot cannot show whether the renderer contaminates
the next draw or whether one position changes another's collision.
