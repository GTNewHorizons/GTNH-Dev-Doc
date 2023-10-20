# Definitions

1) # [What is GT:NH?](#1-what-is-gtnh)
2) # [What is a tier?](#2-what-is-a-tier)
3) # [What should be Magic](#3-what-should-be-magic)
4) # [What should be space exploration?](#4-what-should-be-space-exploration)
5) # [What is the place of combat in the pack?](#5-what-is-the-place-of-combat-in-the-pack)
6) # [What is Tedium?](#6-what-is-tedium)
7) # [What is QoL?](#7-what-is-qol)
8) # [What's our policy to add new mods?](#8-whats-our-policy-to-add-new-mods)
9) # [What is the deprecation policy on removed or "nerfed" recipes?](#9-what-is-the-deprecation-policy-on-removed-or-nerfed-recipes)
10) # [Miscellaneous Development Principles](#10-miscellaneous-development-principles)

# 1. What is GT:NH?
<div align="justify">
You are looking at a large, progressive, highly integrated expert mode pack for Minecraft 1.7.10 centered around the mod GregTech.

With over 8 years of development (and still going) GT:NH has formed a balance and refinement that only a handful of packs can keep up with. We are talking about many thousands custom recipes, a massive questbook with a custom reward system, unique world generation, custom mods coded for the pack, custom Thaumonomicon pages, and many more.

The main intentions of the pack are a long-lasting experience and tying mods together in a progressive fashion, making it feel more like a single game than a compilation of mods thrown together.

To reach this goal, GT New Horizons is using the tiers (basically ages of technology) from GregTech and allocates content of other mods to a fitting point within the progression.

Starting in the stone age you will barely be able to survive until you get your first steam machines and, eventually, reach electricity. Later on, you will have to visit other planets and dimensions to gather important resources and fight mighty bosses to channel their magical power.

If you are a fan of expert mode packs and want to take it to the next level this pack will be your friend!
</div>

# 2. What is a tier?
<div align="justify">
Large parts of the content in GT:NH is structured around the voltage tiers of GregTech. The questbook also has separate tabs following these tiers. They represent the main progression in the pack.

When you reach a new tier, you often unlock new machines and new processes, and maybe new blocks and items that can help you with automation, exploration, or survival. The tiers then (often) culminate in a new dimension/planet you visit or a new complicated machine or process that allows you to get new materials to build the requirements for the next tier.

Circuit tiers are relatively well defined but don’t really correspond to voltage tiers in a one-to-one way (a machine may have an LV hull and take an MV circuit, and in HV you build IV circuits).

Another common theme is materials that are hard to get in one tier (for example, only available as small ore, need strange processing, etc) become easier to obtain in a later tier. Tungsten for example. However, it is likely that  the “easier” path needs an appropriate line - you can get small amounts of platinum but you’re going to need a platline eventually.

Tier materials are used to gate content, by requiring a titanium plate, for example, a thaumcraft item can be restricted until you can obtain at least some titanium.
</div>

# 3. What should be Magic?
<div align="justify">
Magic is concepts and mechanisms tailored under a magic theme. Independent of how the code works in the background, these mods should have a magic feel and look. Instead of the “tech” they focus more on utility than progressing through the tiers. Examples are armor, tools, survival, teleport and whatnot.

Magic can assist in progressing through the tiers, but it should not be the primary gating mechanism of any tier. In simpler terms, one should be able to reach the end of the tech tree without doing any magic.

Advancement in Tech should assist in the development of magic, e.g. a ZPM player should receive some kind of boost to speed up/catch up development in magic if he wanted to. But the boost in this direction should be somewhat limitted. It should not eventually give birth to the meme of "Hold off doing magic until UHV when you get to one click unlock everything".

Magic Mods should be kept relatively distinct, with optional cross-over instead of treating everything as a Thaumcraft Addon and requiring Infusion (as an example). However it is nice to have everything integrated into the Thaumcraft research mechanisms. 
</div>

# 4. What should be space exploration?
<div align="justify">

Currently you mainly go to space to get plans for the next rocket, to get ores and to pump certain fluids and gases. Only a few planets have additional interesting mechanics, like obtaining certain extraterrestial plants.

Playing through the pack without space exploration is not an officially supported game mode. But we do not stand in the way of contributions to the pack to make it doable as long as they don't shift the progression of the pack. That means such alternatives need to be clearly more difficult/expensive than the main rocket progression.
</div>

# 5. What is the place of combat in the pack?
<div align=justify>
The main focus of combat in the pack is in the early game. The world is harsh and dangerous and you need to defend yourself and work on becoming strong yourself. There many defensive and offensive options for the player to invest to and, if you do so, after a few tiers regular mobs should no longer be a concern.

Later on, the main combat are specific boss fights. 
</div>


# 6. What is Tedium?
<div>
In short, a process that is required but is not fun. Something can be a lot of fun to figure out the first time (redstone anti-void for a multiblock) but soon becomes tedious the fifty-seventh time you have to set it up on an LCR. This can be solved by tiering (for example, maintenance hatches go from manual to duct tape to toolboxes to automated to fully automated).

Crucially, "not fun" is not about any one individuals opinion, but about more objective aspects. A big example are very repetitive manual task without any option for automation.

A process that is long and RNG filled. Crops for example are generally considered more tedious than bees, because you have to babysit them and wait for RNG. Splitting up the steps necessary may help (many people don’t do anything crop or bee until they NEED something) - so making it desirable to do some of the basics earlier could reduce that load.

A process that only prevents a negative aspect. Warp, for example, is balanced by the good things you’re getting (and can be avoided by avoiding those things or by using the mitigation/reduction options), but pollution scrubbing has “no advantage” except reduction of negative effects, so it is not currently considered to be in a good state.

A process that encourages extensive AFK or large machine spam so that things can be crafted. In fact these two go hand in hand as you could either build little and wait or build a lot and suffer from bad performance and the tedium of repetitive building. This part doesn't not mean that the player should expect to just have a single machine of any type, but things should not get too extreme.

A repetitive process the user has to do to get the best gameplay, but isn’t directly part of the game. For example, marking waypoints for ores, nodes, etc.

A boss fight that is extremely long but without any skill, damaging them for three points a hit for five hours.

Should tedium be accepted/permitted for situations “outside of normal gameplay” - for example, is tedium associated with a no-rocket-run acceptable?
</div>

# 7. What is QoL?
<div align="justify">
Quality of Life is often using the pack code to automate “tedium” away - for example before VisualProspecting almost everyone would manually waypoint ore locations - something that is handled by VisualProspecting.

Tools like NEI are an important part of QoL as it helps you find what you need.

Additional QoL items include the questbook which lets you know about new things that can help your playthrough, along with UI improvements that reveal functionality.

Some QoL should be available immediately at all times (Questbook, NEI, Journeymap, nice and functional GUIs, etc.).

But there are other types of improvements and items sometimes labelled 'QoL' that simplify gameplay and bypass game mechanics (hatches and busses that integrate AE with GregTech, advanced ore scanners, automatic mining, mobility like flight/teleportation, etc.). Usually these should not be available immediately but should be seen as progressive upgrades to simplify things after the player has already done something dozens of times. These then also can be placed in the progression as nice rewards for unlocking a tier or making a complicated new machine (First EBF/Assembling Line/DTPF) or even promote the use of a otherwise optional mod.
</div>

# 8. What's our policy to add new mods?
<div align="justify">
All new mods must be FOSS (Free and Open Source Software) with no exceptions.
Large mods must not only be “thematically appropriate” but also have a champion willing to work with the team both on development and balance, to fix issues and integrate the mod into the pack.
Unless (and perhaps even) if actively under development, a fork shall be created in our repo.
</div>

# 9. What is the deprecation policy on removed or changed machines and recipes?
<div align="justify">
Many if not most players don’t follow GitHub development closely, and can be surprised by changes such as new lines or removed machines. This can result in already existing lines having to be revisited, which can be tedious.

For removal of machines the process should be to first only remove the recipe and add a deprecation warning to the tooltip. And to only fully remove them at least one stable release after that.

For recipe changes or removals, something like that is not feasible.

However, in both cases the changes should be listed on the Breaking Changes page on the wiki (https://gtnh.miraheze.org/wiki/Upcoming_Features#Breaking_Changes). One should also check if there is an associated quest and change that as needed.
</div>

# 10. Miscellaneous Development Principles
- Avoid small/tiny dusts if possible - percentage chance of full dusts instead. (See https://colab.research.google.com/drive/1hItspIDUBAAnNW4zJ1rMesAEiRytNWLh for some maths on how to do that)
- Avoid making new features that encourage spamming laggy setup.