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

## Use the amount the operation performed

Transfers may be simulated or partial. Update accounting from the returned
accepted, rejected, extracted, or drained amount.

A GT5 fluid-handling review changed accumulation to use the amount returned by
`drain` after limiting the request to the available fluid
([PR #7792](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7792#discussion_r3805084895)).

Simulation must not mutate state. Test full, partial, and rejected transfers,
including a state change between simulation and execution.

## Query the inventory you received

Query the inventory instead of inferring its slots or limits from machine tier:

- Iterate up to `getSizeInventory()`.
- Respect both the inventory limit and the item's own maximum stack size.
- Apply sided insertion and extraction rules for the requested face.
- Preserve reserved, circuit, phantom, and output-slot semantics.

Reviews caught buses whose actual slot count did not match the tier-derived
count
([PR #7546](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7546#discussion_r3683257234))
and a dispenser path that confused the inventory limit with the item's maximum
stack size
([PR #6908](https://github.com/GTNewHorizons/GT5-Unofficial/pull/6908#discussion_r3783366913)).

## Test every automation surface

GTNH machines expose vanilla inventories, sided inventories, fluid handlers,
covers, pipes, and storage-network integrations. Apply restrictions to every
supported path.

Test each path with empty, partial, full, filtered, tagged, and limited stacks.
Assert that transfers conserve the combined amount.
