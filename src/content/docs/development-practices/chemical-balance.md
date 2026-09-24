---
title: Balance chemical recipes
description: Apply GTNH's material-equivalence rules to recipe inputs and outputs.
---

GTNH chemical balance keeps recipes with chemical formulas internally
consistent. It uses game units rather than strict physical chemistry. Expand
each material into its formula components, then compare the total components
on both sides of the recipe. A closed chain of balanced recipes should not
create material from nothing. A deliberate material loss is unusual and needs
an explanation.

## Convert formula parts to game units

| Material being converted | Rule | Example |
| --- | --- | --- |
| Solid compound | Sum the formula's component counts. That sum is the number of compound dusts exchanged for those components. Replace a component dust with 1,000 L when that component is a fluid or gas. | `A₂B₃C` has six parts: six dusts of the compound correspond to two dusts of A, three of B, and one of C. If B is a fluid, use 3,000 L of B. |
| Fluid or gas compound | Treat 1,000 L of compound as one formula unit. Each component count contributes 1,000 L if fluid or gas, or one dust if solid. | For fluid `A₂B`, 1,000 L corresponds to 2,000 L of A and 1,000 L of B when both components are fluids. |

A molten material that also has a solid form follows the **solid** material's
formula rule. For a parenthesized group, count the group as one component at
its outer multiplier, then expand its contents if the recipe requires the
individual ingredients. For example, `A₂(X)₃` is five parts of the solid
compound: two A and three X before expanding X.

For a concrete grouped formula, five dusts of potin (`Pb₂(SnCu₃)₂Sn`)
correspond to two dusts of lead, two dusts of bronze (`SnCu₃`), and one dust
of tin. Expand bronze only if the recipe needs its separate tin and copper.

## Check a proposed recipe

1. Write down each input and output formula and whether each material is a
   solid, fluid, or gas in the recipe.
2. Convert both sides using the rules above. Scale whole recipe batches until
   their component totals can be compared without fractions.
3. Compare every component. If an output contains more of one than the inputs,
   adjust the quantities or identify the missing source. If material is
   intentionally lost, document where and why.

For example, one unit of water (`H₂O`) is 1,000 L: its component totals are
2,000 L of hydrogen and 1,000 L of oxygen. Nine dusts of tantalite
(`MnTa₂O₆`) correspond to one dust of manganese, two dusts of tantalum, and
6,000 L of oxygen.

For balance-affecting pull requests, use the `Affects Balance` label and
answer the required questions about goal and tier, side effects, supporting
measurements, and related planned changes. The current
[GTNH contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md)
also require two approvals, including one from the Balance Review team, and
a flowchart for a new recipe chain.
