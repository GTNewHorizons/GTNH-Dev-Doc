# MultiTileEntities (MuTE)

## Contents

1. [Inspiration](#inspiration)
2. [Reason](#reason)
3. [Goal](#goal)
    1. [Sub goals](#subgoals)
4. [Plan of action](#planofaction)
   1. [Assessment of current situation](#assessmentofcurrentsituation)
   2. [Step 1](#step1)
   3. [Step 2](#step2)
   4. [Step 3](#step3)
   5. [Step 4](#step4)
   6. [Step 5](#step5)

## Inspiration
Many of the mods that have inspired MuTEs have been created in newer versions, but they are not quite what we want.

Mods which inspired the project:
- GT6
- Advanced Rocketry,
- Advanced Generators,
- Modular Machinery,
- Multiblocked,
- and many others.

## Reason
As GTNH has progressed the current system of controlling multiblocks has gotten unwieldy. It has started to show its issues, multiblocks having problems forming, input buses/hatches being buggy and the proper tiering of multiblocks being very difficult (and their upgrades being too cheap and easy in a lot of cases).

## Goal
The goal of the project will be to make a new system which allows for:
- The same exponential increase in machine productivity as in cost
- Adding additional upgrades to multiblocks like more amperage, inventory size, etc.
- Splitting each major part of a multiblock to its own module
- Everything being handled by the controller block

### Sub goals
There are also a few sub goals, which could be completed by implementing the new system.

Sub Goals:
- Internal Redstone control
- Specifying why the multiblock isn't forming, which blocks are wrong/missing and where
- Complete AE2 integration - Allow for ae2 to directly access the multiblock and vice-versa

## Plan of action
A project this large will need a plan of action as to how everything should be implemented. Sadly this will mean either major refactoring or starting from 0.

### Assessment of current situation
The project has already been ongoing for a few years. It's been touched by multiple developers, and it has majorly changed from when it was first written. There is still a lot that needs to be done, but its being held back because of the tech debt of the previous implementation. It is making it difficult to expand and properly implement the functionality that the system should support and improve on.

Working within the confines of GT5u is nearly impossible as it itself has its own set of problems mainly because of its own tech debt. If MuTEs are to be implemented inside GT5u, breaking changes will have to be made to achieve the same or higher level of functionality than the current multiblock system.

The current major refactor isn't going great. Cover implementation is delayed until a later date, so everything can be implemented in one go using MUI2, which will mean a lot more refactoring. And all of this lies on the shoulders of one developer, BlueWeabo, and no one is able to help as the documentation on how the implementation should go is severely lacking, which is the reason for the rewrite of this document.

With this the situation has been assessed, and we can look into how to improve it.

### Step 1
Full refactor/deletion would be the first step, if MuTEs should still be in GT5u that is. It would be much better if the base methods for creating a multiblock were instead put into another mod. The mod wouldn't create new multiblocks, but it would allow for faster testing and an easier implementation of the basics.

### Step 2
As everything has been reset to 0 for the implementation of the new system, let's look into the structure of the classes and how they interact with each other.

MultiTileEntityBlock - Our block class, which can contain any MultiTileEntity. Its sole purpose is to direct the player's interactions to be processed by the MultiTileEntity. Holds a reference to the MultiTileEntityRegistry.

MultiTileEntityItem - Our ItemBlock class with the sole purpose of being a container for our block class as per minecraft's requirements, setting tooltips, placing the block and a few other things.

MultiTileEntity - The base class for everything. It extends the minecraft TileEntity class and implements the base methods which are called when the MultiTileEntityBlock is being interacted with. It splits into two variants, NonTickable and Tickable MultiTileEntity, each having its own uses.

NonTickableMultiTileEntity - Extending MultiTileEntity, this entity will not be ticking and will have no logic of its own. It can be used for regular blocks.

MultiBlockPart - Extending NonTickableMultiTileEntity, it's the base class for parts being connected to a Controller. It holds a reference to the controller's coordinates and transfers any logic that needs to be processed to it. This acts as an extension of the controller. Each part can only delegate one thing at a time, by default it will only open the controller's GUI, but it can be changed to access or create item/energy/fluid input/output or other things that are allowed to be chosen. None of the parts can be wallshared by default.

BasicCasing - Extends MultiBlockPart, its purpose is to be a basic casing that can act as fluid/item/energy I/O and be a part of multiblock structures.

WallSharableCasing - Extends MultiBlockPart, it has the same purpose as BasicCasing, but can be shared between controllers. If the casing is shared it loses all of its transferring functionality as there are multiple controllers it could connect to, so it becomes ambiguous to which one it should transfer the action to.

TieredCasing - Extends MultiBlockPart, these casings are used to determine the tier of the multiblock, they are made from all the machine components (motors, pumps, etc.). The more expensive the component, the higher its weight on the tier formula. These blocks can also act as fluid/item/energy I/O.

UpgradeCasing - Extends MultiBlockPart, these casings will grant upgrades to the controller as a way to improve its functionality in various ways. They also have a tier which is used to determine their effect (if tiered). Some examples for upgrade casings would be amperage, parallel or inventory upgrades.

TickableMultiTileEntity - Extends MultiTileEntity and, as the name implies, is being ticked by the world to execute its set logic. By itself it doesn't do much other than implement the base methods which are ticked every tick. It implements TaskHost which allows for inserting a new task to be ticked when needed.

BasicMachine - Extends TickableMultiTileEntity and allows for the creation of singleblock MuTes which implement and use our inventory, GUI, power and processing logic hosts. It holds a reference to each of those logics and uses them to execute its processing.

InventoryLogic - This implements the base inventory logic which will be used in all BasicMachines and their extentions. It should be able to handle both fluids and items in their own classes. It's meant to be directly used in ProcessingLogic & recipe finding so that real item/fluid amounts can be consumed instead of theoretical ones being calculated first, similar to how AE2 does it.

PowerLogic - Base power logic for all power consuming entities. Should handle burnable fluid/item logic and electricity production/consumption.

GUILogic - It likely isn't its final name, just a reference for now. This will hold all the GUI logic that needs to be done. It will (as needed) have a reference to the BasicMachine to be able to access all the other logic to display it to the player. It will also handle all the major syncing when the player wants to look at the GUI, using MUI2's syncers.

ProcessingLogic - Likely the most important part of all multiblocks. It will be ticking the recipe, searching for it and starting the recipe checks. It should allow for recipes to start at different offsets if it supports running different recipes at the same time.

Controller - Extends BasicMachine and allows the creation of the controller block, the brain of the multiblock. It has a new unique InventoryLogic as it will have to hold multiple inventories. Also implements the basics of how structure check should function.

ControllerInventoryLogic - Contains a map of all the inventory logic associated with the controller. It uses UUIDs to point to the correct one and is also able to name them for the GUI to show.

As we explained what each core part is and does, we will go over MuTE registering:

MultiTileEntityRegistry -  This registry will hold a map of all MultiTileEntityContainers and will use an integer as a key to each MultiTileEntityContainer.

MultiTileEntityContainer - This will hold the original TE for caching reasons and be able to create new TEs. It will also hold all the NBT data which needs to be given to the MuTE on world load or creation.

Other/Misc things:
- For other things that need syncing one will want to send the decoded packet to the MuTE itself for processing instead of processing it somewhere else.
- Keep in check to add Sub-Controller parts for multiblocks spanning multiple chunks.
- Don't expose too many methods/variables, only expose what is necessary. Overexposing will make future maintenance harder if something needs to be improved or added/removed.
- Don't create a large web of interconnected interfaces, only connect interfaces if absolutely needed. InventoryLogicHost doesn't need to care if something is actually a MuTE.
- Don't pass classes and instead use an interface if possible.
- MuTE creation through the MultiTileEntityRegistry should be done through a generic (create<T extends MultiTileEntityContainerBuilder>) to allow for different mods to implement their own builder for their own MuTEs.
- Recipe checks should be done by using InventoryLogic for the inputs and outputs directly. Don't use the internally stored itemstacks for it.
- All systems should be usable at once if desired, so one will have to implement a logic for them in the base class, but the logic of when to send data could still be left where the original mod does it. If possible it should be looked into how this could be done from any mod for any mod without too many dependencies.
- Rendering should be done with a SimpleBlockRenderHandler unless the multiblock is desired to have a 3d version that only appears when the multiblock has fully formed and all casings become transparent (this requires a TileEntitySpecialRenderer).

### Step 3
At this point everything has been implemented (in theory). The next step would be to stress test the system at its limits to make sure everything works as intended. This means that there will have to be a few dev-environment-only multiblocks that show how MuTEs should work and how they should be made. There should be a simple one and one that uses most of the available functionality.

It should be tested if their current implementation satisfies what we wanted to see from the system as a whole, where it could still be improved upon or whether it should be made simpler for developers or players (if the GUI is unwieldy for example).

### Step 4
Now testing is mostly done, it's possible to create multiblocks and all. Next step would be to start converting the old system to the new one which is easier said than done. We will likely have to make more generic casings and add new logic where its needed. After a decent chunk of the multiblocks have been transferred over (or are in the process of being transferred), they should be added into dev versions for players to test their functionality and give feedback on their balance. This will likely be one of the longest and most important steps towards full usage of the system and everything around it. This can be considered to be the start of the old system's deprecation in favor of using the new one.

### Step 5
Only minor bugs are left, almost everything is balanced and barely anything is left from the old system. The system is now done. Congrats! We got to the end of the new beginning... Now you can rest until the wave of bugs appears as the system enters stable versions. Good luck soldier.

