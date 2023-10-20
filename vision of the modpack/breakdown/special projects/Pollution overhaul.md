# What is Pollution?
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

## Proposal: Pollution 2.0
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