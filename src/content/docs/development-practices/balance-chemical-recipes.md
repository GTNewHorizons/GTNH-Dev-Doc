---
title: Balance chemical recipes
description: Compare recipe inputs and outputs using GTNH's solid, fluid, and compound rules.
---

Compare a chemical recipe's inputs and outputs in GTNH material units before
choosing its batch size. The
[chemical-balance rules](https://wiki.gtnewhorizons.com/wiki/Chemical_Balance)
prioritize internal consistency over a physical simulation: a closed chain
should not create material without a source.

## Convert the materials before comparing them

**Solids:** sum the formula's component counts. That many dusts of the compound
correspond to the listed components. For `A₂B₃C`, six compound dusts correspond
to two A, three B, and one C. Replace each component dust with 1,000 L when
that component is a fluid or gas.

**Fluids and gases:** 1,000 L of compound represents one formula unit.
For fluid `A₂B`, that corresponds to 2,000 L of A and 1,000 L of B if both
components are fluids. Use one dust instead of 1,000 L for a solid component.
A molten material with a solid form follows its solid form's rule.

**Grouped compounds:** treat a parenthesized group as one component,
multiplied by the number outside the parentheses. Five dusts of potin,
`Pb₂(SnCu₃)₂Sn`, correspond to two lead dusts, two bronze dusts (`SnCu₃`), and
one tin dust. Use the group's own formula when checking a recipe that breaks
that component down further.

## Check the whole recipe

1. Record each material's formula and whether it uses the solid or fluid rule.
2. Convert both sides into comparable components. Scale whole batches to avoid
   fractional dusts.
3. Compare every component. An excess output needs a missing input or a
   quantity correction. A deliberate loss needs an explanation.
4. Check the adjoining recipes in a chain so the comparison covers material
   entering and leaving the system.

For water, 1,000 L of `H₂O` corresponds to 2,000 L of hydrogen and 1,000 L of
oxygen. Compare the formula components rather than expecting the fluid volumes
on each side to match.

A chemically balanced chain can still have progression or economic effects.
Follow the [balance contribution requirements](/GTNH-Dev-Doc/contributing/before-you-start-coding/#for-a-balance-change)
and include the required flowchart for a new chain.
