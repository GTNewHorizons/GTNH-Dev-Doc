---
title: Treat NBT as a persistent schema
description: Evolve saved GTNH data without changing existing worlds accidentally.
---

:::caution[NBT is a compatibility contract]
Released NBT keys form a persistent schema that newer code must still read.
:::

## Distinguish missing from zero

For a new key, distinguish an absent key from a stored zero. Check for the key
and assign the old behavior explicitly when it is absent.

Add a data-version key for multi-step migrations. Use a local missing-key check
when it completely describes the old format.

## Preserve the superclass contract

Call superclass read and write methods in the expected order. Review every
subclass when a parent adds serialization. Do not reuse a parent's key.

NBT can load before neighbors, external networks, or players are ready. Read
raw values first and initialize external objects in their lifecycle callback.

## Validate after reading

Treat saved input as old and potentially inconsistent:

- Clamp values to the range the current implementation accepts.
- Reconcile fields that are now mutually exclusive.
- Handle renamed enum members and identifiers deliberately.
- Widen numeric types safely and consider values outside the old range.
- Replace references to removed content with a defined fallback.

Add a new key or migration when a key's unit or meaning changes.

## Test old data

For a persistence change, keep a representative tag or world created by the
previous release and verify:

1. It loads with the same observable behavior.
2. Saving writes the new canonical form.
3. Reloading the migrated data is stable.
4. Missing, malformed, and boundary values follow the chosen fallback.

Also test chunk unload and a process restart; an in-memory field does not test
NBT persistence.
