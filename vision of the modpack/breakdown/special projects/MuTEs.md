**<span style="text-decoration:underline;">Inspiration</span>**

Inspired from: GT6, Advanced Rocketry, Advanced Generators, Modular Multiblocks, and The Mod Which Shall Not Be Named

**Goal**:  Move away from PAs being the default goto for scaling, and OP magic multiblocks that scale too easily by switching out the energy hatch.

**<span style="text-decoration:underline;">What MuTEs can do:</span>**



* Get more expensive as tiers go up
* Upgradable through special blocks
* Having the possibility of doing multiple different recipes at once
* Won't void when power voiding (debatable if it will stay might be removed, but its kind of like this rn)
* 3D Multi Rendering without the lag of TESR (tile entity special renderer)
* No more ticking busses/hatches

**<span style="text-decoration:underline;">What MuTEs can’t do:</span>**



* Improve TPS: We are just moving tps usage to the controller, but we are also reducing the ticking of casings and other tile entities.
* Fix any parts of the game
* Stop the spamming of multiblocks: this will always be a thing, but we can hopefully reduce it with proper OCing and parallels

**<span style="text-decoration:underline;">Casings</span>**

**Basic Casings** - Simpleish casings made from base materials - Steel, Aluminium, Stainless Steel, Titanium, Tungstensteel, etc.  These form the bulk of the casings for a multiblock.  Based on the structure of the multiblock, they can perform any of the basic behaviors: Item/Fluid/Energy Input or Output.

**Advanced Casings** - Similar to Basic Casings, but would allow for more advanced casing replacements (lasers etc).  Currently unimplemented. Being given a second thought if they should be a thing or not (personally - Blue) If they are to be implemented it would need to be in TechTec

**Functional Casings** - These will control the "tier" of the multiblock.  They will be similar to Advanced Rocketry blocks, but from GT materials.  Motor, Pump, Conveyor, Robot Arm, Emitter Blocks - balanced around the use of the correct tier materials, and evaluating how much materials would be required to build an equivalent PA setup.

**Upgrade Blocks** - These will "upgrade" the behavior of the multi block and are optional.  Examples include - Expand the inventory, Expand the Fluid containers.  Inspired from Advanced Generators - "Fluid Filtration System" - Speed up the multiblock by X%, but reduce the number of parallels.

**<span style="text-decoration:underline;">Tiering</span>**

No more tiering determined by energy hatches!  See the functional casings above.  A formula will be figured out to determine the tier of the multiblock based on the underlying function casings tier.  It is more of a voltage scale, instead of a strict step function.

**<span style="text-decoration:underline;">Tileentities</span>**

Almost every block in the multiblock will be a tile entity.  The controller is however the brains of the operation and should be the only TE that ticks, or does any work.  Every casing will be a non ticking tile entity, and will proxy any input/output/behaviors to the controller.  This will allow every casing in the multiblock structure to have a functional cover that the controller handles!

**<span style="text-decoration:underline;">Inventory</span>**

The controller will hold a collection of inventories  Each inventory will have a unique key, a mode (INPUT/OUTPUT), and a name.  A DEFAULT input & output inventory will be added by the controller itself.

Additional upgrade blocks (likely tiered similarly to the current buses/hatches) will be available to expand the inventory size of the Multiblock. Casings playing the role of an input/output hatch/bus will be able to either view an entire "virtual input/output inventory", or pick a specific inventory on the controller to interact with (to mimic the current input bus isolation feature).

When the inventory upgrade block is added to the multiblock, it is given a unique key and added to the multiblock inventory.  TBD: It will default to input inventory, but can be changed to output inventory. The key is only saved on world restart and not in replacing the block. As when the block is broken the inventory will be dropped either in a “spatial” inventory which can be picked with a command or just drop the items on the ground (TBD)

**<span style="text-decoration:underline;">Types (Incomplete)</span>**



* Stackable - Similar to the Assembly Line - A variable length/height multiblock that you can add additional "stacks/slices" to.  Depending on the multiblock, will influence speed/parallels/etc. These mutliblocks usually grow in only 1 direction (their stacking direction)
*  "Growable" (for lack of a better name).  Similar in vein to the current chem plant but less annoying, you'd start with an initial structure, and add to it, to expand it. Something more similar in vein would be the PCB Factory and Nano Forge as those multiblock grow in size when going up a tier.

**<span style="text-decoration:underline;">What needs to be done (in no particular order)</span>**



* ❌  texture system (WIP)
* ❌  multi pass rendering updates
* ❌  builder/factory vs giant constructors
* ❌  GUI class separate from the multiblock class itself
* ❌  Structure class separate from the multiblock itself
* ❌  Fix generating a new MuTE on Waila look, ect
* ❌  Rework a part of StructureLib to make seeing the  MuTE block possible (instead of a white cube) - Not High priority, but good to have
* ❌  Make sure recipe input consumption and finding is done with Action.ACTIONABLE(reality) and not Action.MODULATE(in theory) when thinking about AE2 (even then we should always go for ACTIONABLE imo, currently it may have been done, but not 100% certain, needs to be looked into)
* ❌  Better packet system. We should make the packet as the tick goes and send it when it's done. This will save on many problems with the current system of sending everything possible at once. Also would allow one to only  send a packet when needed of certain information and stop needing to send packet on a conveyor moving items
* ❌ Move away from voltage step function and turn “Tier” into a float that influences how much EU/t a machine can run.  32 -> 64 -> 96 -> 128, etc.  Chochem had a formula that should worki
* ❌ Upgrade blocks/module (plural, not singular) that lets you push into the next tier at a cost of extra energy, extra pollution, etc (other negatives) to discourage continuous usage.  No magic block (energy hatch) that magically uptiers you
