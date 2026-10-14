---
title: Understand stacks and inventory contracts
description: Track ownership, actual transfer amounts, and inventory restrictions without duplicating or losing material.
---

An `ItemStack` or `FluidStack` is a mutable value: identity and optional
NBT travel with an amount. Inventory and transfer APIs can retain, copy,
or modify it. Before changing a stack, check who owns it and what the API
promises to return.

## Copy when you need an independent value

Minecraft 1.7.10's `ItemStack.copy()` copies the stack and its NBT.
Forge's [FluidStack](https://github.com/MinecraftForge/MinecraftForge/blob/1.7.10/src/main/java/net/minecraftforge/fluids/FluidStack.java)
also exposes mutable amount, copy, and equality operations.

Copy an inventory, recipe, or cache value before treating it as independently
owned. For example, assigning a recipe's template stack to another variable
does not copy it. Reducing that variable's stack size also changes the template
if both refer to the same object. Use `copy()` when the new value must change
independently, including its NBT. Mutate an API result directly only when the
contract permits that.

Choose the comparison the operation needs: item identity, damage, NBT,
ore-dictionary membership, or fluid identity. Fluid equality, for example,
doesn't by itself tell you whether the amounts match. No single equality helper
settles every recipe or transfer question.

## Account for the amount that actually moved

The [legacy IFluidHandler contract](https://github.com/MinecraftForge/MinecraftForge/blob/1.7.10/src/main/java/net/minecraftforge/fluids/IFluidHandler.java)
allows simulation and partial fill/drain results. If you offer 1,000 L and
the destination accepts 400 L, debit 400 L from the source, not the requested
1,000 L. Item APIs likewise require interpreting their accepted or remainder
result.

Simulation must leave both sides unchanged. It predicts a result; it does
not reserve that result until execution. Recheck or handle a changed
destination and account for the actual execution result.

Perform authoritative transfers on the logical server, keeping source and
destination updates consistent. Test full, partial, and rejected transfers,
and compare the combined amount before and after.

## A retained entity is not necessarily an available item

An `EntityItem` can keep its old stack after pickup, merging, or removal
marks it dead. Before a transfer, require a live entity and a positive
available stack. A saved reference can still contain stack data even when
those items no longer exist in the world.

Inspect `EntityItem` and `ItemStack` in the
[generated development sources](/GTNH-Dev-Doc/build-tools/understand-the-gtnh-build-system-stack/)
when changing pickup or world-item automation.

## Honor the inventory's actual interface

Query `getSizeInventory()` rather than inferring slot count from a machine
tier. Respect the inventory and item stack limits, and the requested face's
sided insertion/extraction rules.

Follow the owner for reserved circuit slots, phantom slots, filters, and
output-only slots. If covers, pipes, or storage integrations reach the same
mutation path, check that they preserve those restrictions too.

Exercise tagged items or fluids, filters, partial capacity, and a state
change between simulation and execution. Include a representative unchanged
automation path sharing the logic so a local fix does not bypass another
caller's contract.
