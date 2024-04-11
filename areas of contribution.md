If you are thinking to contribute to the modpack, here is a list of topics we need people to contribute to. This list can evolve at any time, feel free to check it from time to time.

# Quests
We need some quests to be reworked, fact checked, or simply new quests for undocumented features/mechanics/multis/etc.
Better ask in the channel #quest-dev in our Discord server ([here](https://discord.com/channels/181078474394566657/949447391587733504)).

# Translations
We need the pack to be translated in as many languages as possible. For more information, check [this page](https://github.com/GTNewHorizons/GTNH-Translations) or [this channel](https://discord.com/channels/181078474394566657/1211323236260778124).

# Website
Our current website [www.gtnewhorizons.com](http://www.gtnewhorizons.com) is ancient and uses bootstrap 4. Main need here would be to have a full website in pure HTML5/CSS without any additional lib, matching the look of the current one. It should be responsive and developped with the mobile first approach.

# Wiki
We need people to maintain and write articles for the modpack. For instance, a good series of tutorial about AE2, or how to properly do admin stuff on a NH server.

# Modpack
## Documenting all the modpack
We need to have a documentation for at least all the chemical lines, and powergens, for future balance purposes.
How to perform this is still to be determined for now.

## balancing stuff
Globally, the powercreep becomes too high in LuV+, so to counter this time gates are added, so players need to spam multis in their infrastructure. The same feeling of progression could be achieved without all of this via clever rebalances.
This cannot be done on stuff that hasn't been documented previously.

## rendering optimisations
We need the modpack to be polished in term of performances, and rendering code is the most significant part of this. Angelica achieves a great job at doing this, but we still need to do a lot of work before reaching a decent experience even on the most modest computers.

## ram allocation optimisations
We need to reduce silly memory allocation spam and memory leaks in various part of the pack, as this can decrease user experience over time on a playing session.

## reduce pack booting time
We dramatically increased the loading speed of the pack over 9 years of modpack updates, but let's go even further!

## AE2
AE2 is one of the central mods of this modpack. It would be cool if we could get some QoL stuff on it, or bug fixes.

## bees
The bees in the pack are full of bloat and too many bees are overlapping with others. We need to deduplicate bees so we can have a more clear progression through bees.

## crops
Right now, crops are a pain to breed, as you have 90% of getting one of the parents, then the rest is more or less splitted with all the crop species. This is rng based mechanic is terrible. We would like to migrate to a system of breeding, just like the bees have. But to do this, we need to move the crops from IC2 to a standalone mod. An attempt has been made [here](https://github.com/GTNewHorizons/CropsNH).
We also need to review the different mass production methods for crops, the current balance seems odd.

## nukes
The current IC2 nukes are fun and all, but the fact it's in IC2 limits us to only add items to place in the reactor, more complex changes requires us to use ASM/mixins. It would be cool if we could have those reimplemented in a more modern way in a standalone mod.

## GT5U and their Addons
- We need to break down all the relevant APIs into standalone mods, like we did with structurelib, this will allows for easier usage outside of GT5U and their addons.
- We need to merge GT5U and their addons together, so no more pain while doing dev work on GT5U or an addon.
- We need people to work on MuTEs, this will allow use to perform better evolutive multis, as well as removing hatch costs in a multi.
- We need people to work on Material API, we have too many material loaders competiting against each other. 
- We need someone to untangle recipes in GT5U and NHCore (especially the recipes added in constructors), ideally moving all the recipes in NHCore.

## space exploration
As it is right now, the planets are borring. We wouldn't be against some interesting ideas to make them more interesting without increasing the tedium.

## Magic
Most of the thaumcraft content is irrelevant at the tier it's unlocked. A rework of some recipes as well as a warp reduction in the thaumonomicon could be done. Also witchery needs to be looked at, because it has very nice features that could be judged too powerful at the tier it's currently unlocked at.