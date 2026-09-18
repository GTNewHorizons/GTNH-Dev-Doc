---
title: Treat rendering state as shared state
description: Keep Minecraft 1.7.10 renderers isolated, balanced, and inexpensive per frame.
---

:::caution[Render state is shared]
Minecraft 1.7.10 shares mutable rendering state between draws. Unrestored
bounds, lighting, blending, color, or matrix state affects later renderers.
:::

## Restore everything you change

Restore every changed value on normal returns, cache hits, and exceptions. Use
`try`/`finally` for balanced state.

Typical shared state includes:

- `RenderBlocks` bounds and override textures;
- matrix-stack pushes and transformations;
- blend enablement and blend functions;
- lighting, culling, alpha, depth, and light-map state; and
- the current color.

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
