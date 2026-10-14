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

**Molten solids:** convert the fluid quantity to the corresponding solid amount,
then use the solid rule. For GT5's standard ingot-based melts, **144 L equals
one material unit**, the amount in one ingot or one full dust. The
[recipe constants](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/api/util/GTRecipeBuilder.java#L63-L70)
define `INGOTS = 144`; the
[standard solidifier registration](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/loaders/oreprocessing/ProcessingIngot.java#L59-L69)
uses that amount for one ingot. Thus 288 L of molten copper represents two
copper units. The 1,000 L formula-unit rule does not apply to that melt.
Check the material's registration for custom conversions.

**Grouped compounds:** treat a parenthesized group as one component,
multiplied by the number outside the parentheses. Five dusts of potin,
`Pb₂(SnCu₃)₂Sn`, correspond to two lead dusts, two bronze dusts (`SnCu₃`), and
one tin dust. Use the group's own formula when checking a recipe that breaks
that component down further.

## Work through an actual recipe

GT5's [water electrolysis recipe](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/loaders/postload/recipes/ElectrolyzerRecipes.java#L27-L37)
at revision `b7fc37e18719` uses circuit configuration 1 and these quantities:

| Input | Output |
| --- | --- |
| 1,000 L water and one empty cell | 2,000 L hydrogen and one oxygen cell containing 1,000 L oxygen |

Water's formula is `H₂O`, so its 1,000 L batch accounts for 2,000 L hydrogen
and 1,000 L oxygen. The oxygen is packaged in a cell rather than returned
through the fluid output. GT5's
[cell registration](https://github.com/GTNewHorizons/GT5-Unofficial/blob/b7fc37e18719b3829cc4752542b5b298e205e457/src/main/java/gregtech/common/fluid/GTFluid.java#L147-L149)
uses 1,000 L per cell. Include that cell's contents when checking the
balance, and account for the empty container supplied as an input. Comparing
only `.fluidInputs` and `.fluidOutputs` would miss the oxygen.

The same rules cover mixed solid/fluid outputs: nine dusts of tantalite,
`MnTa₂O₆`, correspond to one manganese dust, two tantalum dusts, and 6,000 L
oxygen. For potin, keep the bronze group together until a recipe actually
breaks it down further.

## Check the whole recipe

1. Record each material's formula and whether it uses the solid or fluid rule.
2. Convert both sides into comparable components. Scale whole batches to avoid
   fractional dusts.
3. Compare every component. An excess output needs a missing input or a
   quantity correction. A deliberate loss needs an explanation.
4. Check the adjoining recipes in a chain so the comparison covers material
   entering and leaving the system.

Compare the formula components rather than expecting the fluid volumes on
each side to match. Include material supplied by cells and other containers,
and distinguish a consumed input from a reusable mold or circuit.

A chemically balanced chain can still have progression or economic effects.
Follow the [balance contribution requirements](/GTNH-Dev-Doc/contributing/before-you-start-coding/#for-a-balance-change)
and include the required flowchart for a new chain.
