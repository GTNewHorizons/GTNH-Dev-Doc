---
title: Treat rendering and block bounds as shared state
description: Keep Minecraft 1.7.10 renderers and block bounds isolated, balanced, and predictable.
---

:::caution[Render state is shared]
Minecraft 1.7.10 shares mutable rendering state between draws. Unrestored
bounds, lighting, blending, color, or matrix state affects later renderers.
:::

## Restore everything you change

Restore every changed value on normal returns, cache hits, and exceptions. Use
`try`/`finally` for balanced state.

Typical shared state includes:

- `RenderBlocks` bounds and override textures.
- Matrix-stack pushes and transformations.
- Blend enablement and blend functions.
- Lighting, culling, alpha, depth, and light-map state.
- The current color.

## Treat block bounds as scratch state

A registered `Block` instance is shared by every position using that block. Its
six bounds fields are mutable fields on that shared instance, not per-position
state. Set all six bounds on every path before calling inherited collision,
selection, or ray-tracing behavior, and do not expect them to retain a meaning
after the call. Prefer local `AxisAlignedBB` values where the API permits them.

A zero-volume `AxisAlignedBB` is not the same as no collision: 1.7.10's
intersection test does not reject equal minimum and maximum coordinates. Return
`null` when a block has no collision box; otherwise use correctly ordered bounds
with the intended positive extent.

## Make caches preserve the full contract

A cached path must leave the same state as an uncached path. Prefer caching
immutable geometry or calculated data over mutable renderers.

Include every result-changing input in the cache key, including resource,
metadata, and render pass. Clear the cache on the required resource-reload or
lifecycle event.

## Keep per-frame work small

Avoid per-frame helper allocation, static-geometry rebuilding, unchanged
resource lookups, and duplicate opaque draws. Their cost scales with visible
instances and render passes.

Profile the actual heavy view, such as a large NEI page or many visible
machines, and include cache construction and resource reloads.

## Test alongside other renderers

Render the object beside unrelated blocks, items, GUIs, and translucent
geometry. Exercise every early return and cached branch.
