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
The mods which have inspired MuTEs are many which have been created in newer versions, but not quite what we want.

Mods which inspired the project:
- GT6
- Advanced Rocketry,
- Advanced Generators,
- Modular Machinery,
- Multiblocked,
- and many others.

## Reason
As GTNH has progressed the current system of controlling a multiblock has gotten unwieldy. It has started to show its problems, multiblocks having a problem forming, input bus/hatch bugs, and it being very hard to tier a multiblock properly. It has made multiblocks easy to upgrade and at almost not cost.

## Goal
The goal of the project will be to make a new system, which allows for the same exponential increase in machine productivity as the cost. Additional upgrades being given to a multiblock, like more amperage, inventory size, etc. Splitting each major part of a multiblock to its own module. Everything being handled by the controller block.

### Sub goals
There are also a few sub goals, which could be completed by implementing the new system.

Sub Goals:
- Internal Redstone control
- Specifying where the multiblock has a problem forming
- Complete AE2 integration - Allow for ae2 to directly access the multiblock and vice-versa

## Plan of action
A project this large will need a plan of action as to how everything should be implemented. Sadly this will mean either major refactoring or starting from 0.

### Assessment of current situation
The project has already been ongoing for a few years. It's been touched by multiple developer, and it has majorly changed from when it was first written. There is still a lot that needs to be done, but its being held back because of the tech debt that the previous implementation currently has. It is making it hard to expand and properly implement the requirement that the system should support and improve on.

Working within the confines of GT5u is nearly impossible as it itself has its own set of problems mainly around its own tech debt. If MuTEs are to be implemented inside GT5u breaking changes inside of it will need to be done, if the same functionality is required as the current multiblock system.

Current major refactor isn't going great. Covers are to not be implemented until a later date, needs MUI2 so that everything can be implemented in one go, a lot more needs to be refactored. And all of this is on one developer (BlueWeabo) and no one is able to help as MuTEs aren't documented as to how they should be implemented, which brought the reason for this document to be rewritten and expanded upon.

With this the situation has been assessed, and we can look into how to improve it.

### Step 1
Full refactor/deletion would be the first step. That is if it still should be in GT5u. It would be much better if the base methods for creating a multiblock were instead put into another mod. The mod wouldn't create new mutliblocks, but would allow for faster testing and an easier implementation of the basics.

### Step 2
As everything has been reset to 0 for the implementation of the system, we will head into the structure of the classes and how they interact with each other.

MultiTileEntityBlock - Our block class, which can contain any MultiTileEntity. Its sole purpose is to direct the player's interactions to be processed by the MultiTileEntity. Holds a reference to the MultiTileEntityRegistry

MultiTileEntityItem - Our Item class with the sole purpose of placing the block and rendering it to the player.

MultiTileEntity - The base class for all. It is extending the minecraft TileEntity class, implements the base methods which are called when the MultiTileEntityBlock is being interacted with. It splits into two versions NonTickable and Tickable MultiTileEntity. Each of them having its own use.

NonTickableMultiTileEntity - Extending MultiTileEntity, this entity will not be ticking and will have no logic of its own. It can be used for normal blocks.

MultiBlockPart - Extending NonTickableMultiTileEntity, it's the base class for a part being connected to a Controller. It holds a reference to the controller's coordinates and transfers any logic that needs to be processed to it. This acts as an extension of the controller. The part can only delegate one thing at a time, by default it will only open the controller's GUI, but it can be made to only access item/energy/fluid input/output or others that are allowed to be chosen. None of the parts can be wallshared by default.

BasicCasing - Extends MultiBlockPart, its only purpose is to be a basic casing allowing for modes to be chosen and build the multiblock.

WallSharableCasing - Extends MultiBlockPart, it has the same purpose as BasicCasing, but can be shared between controllers. If the casing is shared it loses all of its functionality of transferring actions happening on it to the controller as there are multiple controllers it becomes ambiguous to which one it should transfer the action.

TieredCasing - Extends MultiBlockPart, these casings are used to determine the tier of the multiblock, they are to be made from all part components, motors, pumps, etc. The more expensive the component the higher its weight on the tier that it gives.

UpgradeCasing - Extends MultiBlockPart, these casings will give upgrades to the Controller as a way to improve its productivity. They also have a tier, which is used to determine their effect if tiered. An example of an upgrade casing would be an amperage, parallel or inventory upgrade.

TickableMultiTileEntity - Extending MultiTileEntity, as the name implies it is being ticked by the world to execute the logic given to it. By itself it doesn't do much other than implement the base methods, which are ticked every tick. It implements TaskHost, which allows for inserting a new task to be ticked when needed.

BasicMachine - Extending TickableMultiTileEntity, we get to single-block machines, which is where our inventory, GUI, power and processing logic hosts are implemented and used. It holds a reference to each of those logics and uses them to execute its process.

InventoryLogic - This implements the base inventory logic, which will be working on all BasicMachins and what is extending it. It should be able to handle both Fluid and Item into its own classes. It is to be directly used in ProcessingLogic and recipe finding and consumption to use reality, should be similar to the type system of AE2

PowerLogic - Base power logic for all power consuming entities. Should be made so to handle fluid/item burnable logic and electricity consumption.

GUILogic - It isn't correct name, which will likely be used, but for reference. This will hold all the GUI logic that needs to be done, it will have a reference to the BasicMachine as needed to be able to access the other logics to display them to the player. This will handle all the major syncing when the player wants to look at the GUI using MUI2's syncers

ProcessingLogic - Likely the largest part of all multiblocks, it will be ticking the recipe, searching for the recipe and starting the recipe checks itself. It should allow for recipes to start at a different time if it supports running different recipes at the same time.

Controller - Extending BasicMachine we get into the controller block, the brain of the mutliblock. It has a new InventoryLogic specifically made for it as it will need to be able to hold multiple of them. Also implements the basics of a how to check a structure.

ControllerInventoryLogic - Contains a map of the inventory logics associated with the controller. It uses UUID to point to the correct one and is also able to name them for the GUI to show.

MultiTileEntityRegistry - As we explained what each core part is, we will go to how a MuTE is registered. The registry will hold a map of the MultiTileEntityContainers. The map will use an integer as a key to the MultiTileEntityContainer.

MultiTileEntityContainer - This will hold the original TE for caching reasons, be able to create new TEs and will hold all the NBT data, which needs to be given to the MuTE on world load or creation.

Other:
- Other things that need to be taken care of syncing. One will want to send the decoded packet to the MuTE for it to process that itself instead of processing it somewhere else.
- Keep in check to add Sub-Controller parts for multiblocks spanning multiple chunks.
- Don't put too many methods/variables exposed. Only expose what is needed. Overexposing will make future maintainability harder if something needs to be improved or added/removed.
- Don't create too big of an interface interconnection, only connect interfaces with one another if it absolutely needed. InventoryLogicHost doesn't need to care that something is actually a MuTE.
- Don't give the class and instead use an interface if possible.
- Creation through the MultiTileEntityRegistry should be done through a generic (create<T extends MultiTileEntityContainerBuilder>) as to allow for different mods implement their own builder for their own MuTEs.
- Recipe checks should be done using InventoryLogic as the inputs and outputs directly. One shouldn't get the internal itemstacks stored and use them directly for it.
- One should be able to use all system together at once if they desired, so one will have to implement a logic for them in the base class, but its logic of when to send data could still be left where the original mod did it. If possible it should be looked into how one could do this from any mod for any mod without too many dependencies.
- Rendering should be done with a SimpleBlockRenderHandler, unless the multiblock is desired to have a 3d version, which will require a TileEntitySpecialRenderer and for it to only appear when the multiblock has fully formed and hides all casings, the casings showing a transparent texture.

### Step 3
Well everything has been implemented in theory. Next step would be to stress test it to its limits to make sure everything works together. This will mean create a few dev-environment only multiblocks, which will show how MuTEs should be made. There should be one simple one and another, which uses most of the functionality available to it.

Should be tested if their current implementation satisfies what was wanted from the system, see where it could be improved or made simpler for the developer or user if the GUI is unwieldy.

### Step 4
Testing is mostly done, it's possible to create multiblocks and all. Next step would be to start converting the old system to the new one, which is simpler said rather than done. One will have to make more generic casings likely, add new logic where its needed. After quite a bit of the multiblocks have been transferred over or are in the process of, it should be looked into shipping it into dev versions for players to test them out and balance appropriately. This will likely be one of the longest steps towards full use of the system and everything around it. Can be said this is the start of the deprecation of the old system and the new one should be used.

### Step 5
Only minor bugs are left, almost everything is balanced and barely anything is left from the old system. The system is now done. Congrats! We got to the end of the new beginning... Now you can rest until the wave of bugs appears as the system enters stable versions. Good luck soldier.

