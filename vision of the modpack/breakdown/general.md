# Definitions

1) # [What is GT:NH?](#1-what-is-gtnh)
2) # [What is a tier?](#2-what-is-a-tier)
3) # [What is Pollution?](#3-what-is-pollution)
    1) ## [Current Pollution](#3i-current-pollution)
    2) ## [Pollution 2.0](#3ii-pollution-20)
4) # [What is Tedium?](#4-what-is-tedium)
5) # [What is QoL?](#5-what-is-qol)
6) # [What should be Magic](#6-what-should-be-magic)
7) # [What should be space exploration?](#7-what-should-be-space-exploration)
    1) ## [Yannick's suggestion: Leapfrogging](#7i-yannick-suggestion-leapfrogging)
8) # [What is the place of combat in the pack?](#8-what-is-the-place-of-combat-in-the-pack)
9) # [What's our policy to add new mods?](#9-whats-our-policy-to-add-new-mods)
10) # [What is the deprecation policy on removed or "nerfed" recipes?](#10-what-is-the-deprecation-policy-on-removed-or-nerfed-recipes)
11) # [General Principles](#11-general-principles)

# 1. What is GT:NH?
<div align="justify">
You are looking at a big progressive highly integrated expert mode pack for Minecraft 1.7.10 centered around the mod GregTech.

With over 8 years of development (and still going) GT:NH has formed a balance and refinement that only a handful of packs can keep up with. We are talking about thousands of recipe tweaks, a massive questbook with a custom reward system, unique world generation, custom mods coded for the pack, custom Thaumonomicon pages, and many more.

The main intentions of the pack are a long-lasting experience and tying mods together in a progressive fashion, making it feel more like a single game than a compilation of mods thrown together.

To reach this goal, GT New Horizons is using the tiers (basically ages of technology) from GregTech and allocates content of other mods to a fitting point within the progression.

Starting in the stone age you will barely be able to survive until you get your first steam machines and, eventually, reach electricity. Later on, you will have to visit other planets and dimensions to gather important resources and fight mighty bosses to channel their magical power.

If you are a fan of expert mode packs and want to take it to the next level this pack will be your friend!
</div>

# 2. What is a tier?
<div align="justify">
Currently the QB “opens the next tier” usually when you can build the machine hull for that tier (MV opens with an MV Machine Hull). It appears to progress through machines and new processes of that tier, culminating in (often) a new dimension/planet you visit to get new materials to build the requirements for the next tier.

Circuit tiers are relatively well defined but don’t really correspond to “QB” tiers (a machine may have an  LV hull and take an MV circuit, and in HV you build LuV circuits).

Another common theme is materials that are hard to get in one tier (for example, only available as small ore, need strange processing, etc) become easier to obtain in a later tier. Titanium for example. However, it is likely that  the “easier” path needs an appropriate line - you can get small amounts of platinum but you’re going to need a platline eventually.

Tier materials are used to gate content, by requiring a titanium plate, for example, a thaumcraft item can be restricted until you can obtain at least some titanium.
</div>

# 3. What is Pollution?
## 3.i. Current Pollution
<div align="justify">
Pollution should be something that slowly stacks up when a player doesn’t use “green” ways of doing some stuff and decreases when the player uses “green” ways. It’s the result of player interactions with the world. Pollution must also be scaled with the industrialization level reached by the player. That means a stone age player shouldn’t even be able to reach the same levels of pollution as a HV player, unless the stone age player spams the polluting objects in its world.

Pollution must become annoying after the player has reached a certain point, and worsening its effects the more it raises. This annoyingness starts by affecting the landscape: slowly deperishing plants, decaying grass/dirt into sand, impacting the visibility (fog/pollution particles).Then, it starts impacting the living creature themselves by giving them effects randomly: nausea, slowness and poisoning. In the meantime, given that something healing the livings hurts the undeads and vice versa , it should also buff the mobs in the polluted chunks. The strength of the buffs/debuffs should be based on the pollution level.

- But pollution must be something the player can counter by various mechanisms:
- If a player stops his whole industry, the pollution should dissipate more or less fast. If the pollution levels are stable, then it would take more time to dissipate than a burst of pollution. Also, high and stable levels of pollution should dissipate faster than low and stable levels of pollution.
- The player can wear a hazmat suit for low and moderate amounts of pollution to stop getting the debuffs. For high and insane levels of pollution, due to the rarefaction of O2 in the air, the player must also wear equipment to breathe in the polluted environment.
- The player can actively reduce pollution by using Electric air filters to clean the pollution. This multiblock would suck air around it and collect pollution. It would also be possible to hook up pipes to get the air rejections of the multi.
- The player can (to some extent) plant trees to reduce the pollution a bit when it is at a low or moderate level.
- Other new ways of dealing with pollution than by air???

The collected pollution would be available under some kind of dust and also under some kind of mixed gasses. You would need to separate the gasses and the dusts to make them valuable resources (recycling carbon monoxide for some other recipes,getting some rare gasses from the pollution, making some kind of cheap fertilizer from the nitrogen-based byproduct you would get from the dusts, collecting carbon under solid form, ….)

Muffler hatches should have their effect diminish over time when it starts to clog up because of the pollution accumulating on it. That means that it exhausts less and less pollution until it’s totally clogged up. Higher tier mufflers would clog up slower, incentivizing the players to upgrade it. In addition to that, the higher tier the muffler hatch is, the lower the amount of pollution is released in the environment by the actual multi, incentivizing even more the upgrade of them. Also, a player could totally avoid the multi releasing pollution by piping the muffler hatch into new sealed pipes, so the player can deal and reprocess the gasses into valuable resources, but that doesn”t avoid the muffler hatch from clogging up, to really keep the incentive of upgrading the muffler hatches.

Multiblocks using muffler hatches should have an additional maintenance message in addition to the 6 maintenance messages already present in the game. However, while those 6 maintenance messages are totally random and just decrease the efficiency of the multiblock, this one would appear with 5 variants (0%, 25%, 50%, 75% and 100% clogged), indicating in the multiblock GUI the level of clogging. If the 100% threshold is reached, then the multiblock instantly stops, voiding the recipe in the process. Also, the level of clogging would be available by using the tricorder to get more precise levels. A clogging cover could also be made, so players can have an analog redstone signal indicating the level of pollution stuck into the muffler hatch. It would also be possible inside the GUI of the cover to set up the threshold starting from which you emit redstone, like item and fluid detection cover.

Solar panels (block and cover forms) should see their efficiency decreasing over time, due to dust. It would be possible to clean it up when using a bucket of water (or any fluid container holding 1 kL of water) to clean it up. Also, if the solar is exposed to rain, it should clean itself a tiny bit every couple of seconds, making it worth having rain for some time. (applicable also to the solar boilers). The clogging cover would also apply to the solars.

In addition to the tricorder that is able to detect pollution precisely in the chunk but requires the player interaction, the player should have other ways of detecting pollution. This is why a new pollution detection cover should be introduced. It would be available for each tier starting from LV. This would return an analog redstone signal based on the pollution levels. Of course, the full strength redstone signal would be output for the max threshold the cover can detect, saturating after that threshold. So only the threshold would increase. It would also be possible inside the GUI of the cover to set up the threshold starting from which you emit redstone, like item and fluid detection cover.
</div>

## 3.ii. Pollution 2.0
<div align="justify">
Yannick suggested rebrand: Environment crafting. Craft the environment of your choice using side effects from a variety of sources. Each environment combination has cons you can mitigate and pros you can benefit from.

Possible sources of environment:
- Industrial waste
    - At what tier this environment is unlocked:
        - stone age
    - How to get this environment:
        - Run everything that is based on combustion to slowly decrease the air quality
    - What are the advantages of it:
        - One can use a yet to be defined pollution recycling chain to obtain various resources, some of them being easier to get through that route
        - Free buff at negative pollution
            - E.g. Jump Boost at -250000 gibble
            - Definitively no buff at -1 gibble
        - Random “positive” SFX, e.g. bird sing.
    - What are the downsides of it:
        - It impacts the air quality, creating a more or less dense fog
        - It is harder to breath in such environment, so you get various debuffs such as nausea, poison, slowness…
        - it impacts all forms of plant life: crops, tree leaves, flowers, they all will slowly fade away and disappear.
        - It obstructs any solar panels/boilers, making them lose efficiency gradually over time. To clean them, a manual intervention from the player is required, in the form of right-clicking with any fluid container having water inside it (minimum 1 bucket of water?)
    - Visual effects:
        - Fog effect
        - Soot particles
        - Grass based blocks changing colors
        - Skybox got a yellow to brownish tint
    - Ways to deal with such an environment:
        - Air quality:
            - Electric air filter (starting from LV): They exist in 3 forms: one available in LV, one in HV, one in EV/IV. See the quest related to it in multiblock goals for more information
            - Muffler hatches (related to multies, starting from LV): they are filtering more or less the air pollution output by the multi
            - Diffusion (available from stone age): Displace the  waste by piping it in chunks further away, or by funneling it into smokestacks that make released pollution spread (and thus dissipate) faster.
            - Pollution detector covers(starting from LV, not yet implemented):these covers would return an analog signal based on the pollution in the air. Each tier has a detection limit, after which the cover saturates and emits max strength redstone signal. From the cover GUI, one could define a threshold between 0 and the max detected by the cover, working as a high pass/low pass detection, just like the energy cover, item detection cover or the fluid detection cover.
        - How does this scale through tiers?

- Magical environment
    - How to get this environment:
    - What are the advantages of it:
        - Might be required for certain magical rituals
        - Essentia Discount for infusion
    - What are the downsides of it:
        - Taint?
        - Wisps?
    - Visual effects:
    - Ways to deal with such an environment:

- Radioactive environment
    - How to get this environment:
        - Nuclear incident
        - Exploitation costs of a nuclear reactor
        - Usage of a nuke
    - What are the advantages of it:
        - Increased mutation rates for trees/bees/crops/botany flowers
        - Accelerated plant growth
    - What are the downsides of it:
        - Malfunction of non-shielded computing equipment?
        - Getting irradiated without hazmat like protection
        - Chances of decaying a block?
        - Mutation rate boost and growing boosts come at the cost of increasing the chances of dying
    - Visual effects:
        - Blindness? (radiation can turn people blind irl)
            - Yannick: Might this not make someone incapable of resolving a bad radiation situation?
    - Ways to deal with such an environment:

- Electromagnetic environment
    - How to get this environment:
        - Yannick: Could potentially be generated by any sufficiently high tier multi while active, as an "upper tier" alternative to air pollution?
    - What are the advantages of it:
        - Some kinds of low-power devices can draw free passive power from the environment OR DISADVANTAGE: fry or disable low-power devices in the area (Depends on what you're typically trying to achieve when generating this environment)
        - Some magical rituals might be simpler. (Free infusion stability?)
        - Free normal to magnetic metal conversion?
            - Yannick: This is also simultaneously a con since magnetic metal doesn't have the same recipes, and you might not want your metal converted.
        - What are the downsides of it:
            - You can get electrical damages if you are too close to a leak
        - Visual effects:
            - If feasible, electric arcs between metal blocks
        - Ways to deal with such an environment:
</div>

# 4. What is Tedium?
<div>
A process that is required but is not fun. Something may be fun to figure out the first time (redstone anti-void for a multiblock) but soon becomes tedious the fifty-seventh time you have to set it up on an LCR. This can be solved by tiering (for example, maintenance hatches go from manual to duct tape to toolboxes to automated to fully automated).

A process that is long and RNG filled. Crops for example are generally considered more tedious than bees, because you have to babysit them and wait for RNG. Splitting up the steps necessary may help (many people don’t do anything crop or bee until they NEED something) - so making it desirable to do some of the basics earlier could reduce that load.

A process that only prevents a negative aspect. Warp, for example, is balanced by the good things you’re getting (and can be avoided by avoiding those things), but pollution solution has “no advantage” except reduction of negative effects, and so many disable it.

A process that encourages extensive AFK so machines can run. You could survive on a single BBF, but it should be encouraged to instead build more. This can be at odds with other tedium as often you can avoid certain tedium by just setting something up and letting it run AFK.

A process the user has to do to get the best gameplay, but isn’t directly part of the game. For example, marking waypoints for ores, nodes, etc.

A boss fight that is extremely long but without any skill, damaging them for three points a hit for five hours.

Should tedium be accepted/permitted for situations “outside of normal gameplay” - for example, is tedium associated with a no-rocket-run acceptable?
</div>

# 5. What is QoL?
<div align="justify">
Quality of Life is often using the pack code to automate “tedium” away - for example before VisualProspecting almost everyone would manually waypoint ore locations - something that is handled by VisualProspecting.

Tools like NEI are an important part of QoL as it helps you find what you need.

Additional QoL items include the questbook which lets you know about new things that can help your playthrough, along with UI improvements that reveal functionality.

QoL should usually not be gated behind some certain tier. Trying to do so must have a strong rationale behind it to justify it, e.g. the QoL completely eliminates a previous mechanism (though at that point it’d be worth considering if this existing mechanism needs tweaking)
</div>

# 6. What should be Magic?
<div align="justify">
Magic is concepts and mechanisms tailored under a magic theme. Instead of the “tech” they focus more on utility than progressing through the tiers. Examples are armor, tools, survival, teleport and whatnot.

Magic can assist in progressing through the tiers, but it should not be the primary gating mechanism of any tier (unless this tier is solely for more advanced magic). In simpler terms, one should be able to reach the end of the tech tree without doing any magic.

Advancement in Tech should assist in the development of magic, e.g. a ZPM player should receive some kind of boost to speed up/catch up development in magic if he wanted to. Do note these boosts should not eventually give birth to the meme of Hold off doing magic until UHV when you get to one click unlock everything.

Magic Mods should be kept relatively distinct, with optional cross-over instead of treating everything as a Thaumcraft Addon and requiring Infusion (as an example).
</div>

# 7. What should be space exploration?
<div align="justify">
From GitHub: “Later on, you will have to visit other planets and dimensions to gather important resources and fight mighty bosses to channel their magical power.”

Currently you go to space to get plans for the next rocket and to get minerals (no-rocket-runs to the side).

Question: Are no-rocket-runs an intended path for the pack?
</div>

## 7.i. Yannick suggestion: Leapfrogging

<div align="justify">
In order to reach ever further into space, you need to build a network of space stations and ground stations with launch and refueling facilities. Basically encourage having to build some kind of a presence on those worlds. Those outposts could be thought of as a level of complexity above multis because they need to be mini-bases, and each tier should have new requirements to keep the challenge fresh.

You could also gate more mod content behind those planets. Could portals to certain dimensions only be openable from the right planets? Could certain aspects of magic mods also only exist in other worlds? Getting players to play longer on each planet gives you an opportunity to do stuff like having tougher mobs on every tier, to give a use to your ever more powerful offensive capabilities.
.
MandatoryI’vebenveractuallybeentospacedisclaimer.
</div>

# 8. What is the place of combat in the pack?
<div align=justify>

</div>

# 9. What's our policy to add new mods?
<div align="justify">
All new mods must be Open Source with few-to-no exceptions.
Large mods must not only be “thematically appropriate” but also have a champion willing to work with the team both on development and balance.
Unless (and perhaps even) if actively under development, a fork shall be created in our repo.
</div>

# 10. What is the deprecation policy on removed or "nerfed" recipes?
<div align="justify">
Many if not most players don’t follow GitHub development closely, and can be surprised by changes such as new lines (Aluminum, eg). This can result in already existing lines having to be revisited, which can be tedious. 

Perhaps there should be a two step process:
New line is added with additional steps vs current setup (but also advantages of some kind). Previous recipes are hidden in NEI but remain functional. QB is updated (perhaps there should be an in-game QB chapter for major changes?)
Next release the recipes are removed

This wouldn’t apply to unintentional recipes/exploits
</div>

# 11. General Principles
- Avoid small/tiny dusts if possible - percentage chance of full dusts instead
- Avoid making new features that encourage spamming laggy setup.
