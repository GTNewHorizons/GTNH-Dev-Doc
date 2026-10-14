---
title: Treat rendering and block bounds as shared state
description: Preserve caller-visible render state and prevent one block position from leaking bounds into another.
---

Minecraft 1.7.10 reuses mutable renderer and block state. A draw that leaves
a color, texture override, or bound changed can affect a later object.
Treat the renderer's entry and exit state as part of its contract, including
cached paths and early returns.

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

## Block bounds belong to the shared block instance

A registered `Block` instance represents every position using that block.
Its six bounds fields are mutable instance fields, not values owned by the
tile or position being queried.

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

## Check interactions, not only the isolated object

Render beside unrelated blocks, items, GUI elements, and translucent geometry.
Exercise cold and warm caches, early returns, alternate metadata, and a
resource reload. For bounds, query two differently shaped positions in both
orders.

A correct isolated screenshot cannot show whether the renderer contaminates
the next draw or whether one position changes another's collision.
