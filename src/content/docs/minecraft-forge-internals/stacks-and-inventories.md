---
title: Understand stacks and inventory contracts
description: Handle mutable item and fluid stacks without duplication, loss, or automation conflicts.
---

`ItemStack` and `FluidStack` contain identity, metadata, optional NBT, and a
mutable amount. Inventory and fluid APIs may retain, copy, or mutate them.

## Decide who owns each stack

Copy a stack when the receiver needs an independent value. Mutate a stack from
an inventory, recipe, cache, or API result only when its contract transfers
ownership.

Choose whether the operation compares item identity, damage, NBT,
ore-dictionary membership, or fluid identity. No equality helper covers every
case.

Forge's
[`FluidStack` implementation](https://github.com/MinecraftForge/MinecraftForge/blob/1.7.10/src/main/java/net/minecraftforge/fluids/FluidStack.java)
exposes mutable `amount`, copy, NBT, and fluid-equality operations.

## Respect entity lifecycle

Before taking a stack from an `EntityItem`, especially one retained across
ticks, require `!entity.isDead` and a positive stack size. A dead item entity may
still expose its old stack data after pickup or merging; that data no longer
represents items available for transfer.

Perform the transfer on the logical server and update the source and destination
as one operation.

## Use the amount the operation performed

Transfers may be simulated or partial. Update accounting from the returned
accepted, rejected, extracted, or drained amount.

Simulation must not mutate state. Test full, partial, and rejected transfers,
including a state change between simulation and execution.

## Query the inventory you received

Query the inventory instead of inferring its slots or limits from machine tier:

- Iterate up to `getSizeInventory()`.
- Respect both the inventory limit and the item's own maximum stack size.
- Apply sided insertion and extraction rules for the requested face.
- Preserve reserved, circuit, phantom, and output-slot semantics.

## Test affected automation surfaces

GTNH machines expose vanilla inventories, sided inventories, fluid handlers,
covers, pipes, and storage-network integrations. Identify which paths reach the
changed logic and apply the same restrictions to them.

Test each changed path and one representative unchanged path that shares the
logic. Exercise the relevant full, partial, rejected, filtered, or tagged cases,
and assert that every transfer conserves the combined amount.
