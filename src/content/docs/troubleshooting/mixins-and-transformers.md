---
title: Mixins and transformers
description: Identify a failed runtime patch and choose diagnostics that expose its target and effects.
---

Mixins and class transformers patch classes while Minecraft loads them. For
an application, injection, or transformed-class failure, start with the first
relevant exception. A later missing-class error can be a consequence of the
failed patch.

## Check the patch against the loaded target

Record the mixin configuration and name, or transformer class, along with the
target class and member. Include the loaded versions of both mods and whether
the failure occurs on the client, dedicated server, or both. Keep the surrounding startup
sequence using [Locate logs](/GTNH-Dev-Doc/how-to/locate-logs-and-useful-errors/).

Compare the expected method or field with the source or bytecode of the
version actually loaded. If it is missing or has a different signature,
check the patch's supported target version and selector. If it matches,
inspect the injection point and collect diagnostics for other patches
that affect the same class.

GTNH maintains shared patches in [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge).
Prefer correcting a GTNH-maintained target mod at its source when possible.

## Pass diagnostic flags to Minecraft

Flags belong in the **game JVM**, which can differ from Gradle's JVM. For a
RetroFuturaGradle run, open a terminal in the mod repository root containing
`gradlew`. To enable verbose Mixin logging:

```sh
./gradlew runClient --mcJvmArgs=-Dmixin.debug.verbose=true
```

On Windows PowerShell, use `.\gradlew.bat`. Use the corresponding server or
Java-specific task for that run. Pass each extra flag through its own
`--mcJvmArgs`; the
[run task](https://github.com/GTNewHorizons/RetroFuturaGradle/blob/master/plugin/src/main/java/com/gtnewhorizons/retrofuturagradle/minecraft/RunMinecraftTask.java)
defines this option. In an IntelliJ configuration that launches Minecraft
directly, put the flags in **VM options**.

Choose the option that answers your unresolved question. Keep diagnostic
settings local: exports can be large, and some checks turn warnings or
unexpected injection counts into errors.

## Mixin application or injection fails

- **Trace mixin application.**

  `-Dmixin.debug.verbose=true` promotes Mixin debug messages to info level.
- **Inspect post-mixin bytecode.**

  `-Dmixin.debug.export=true` writes post-mixin classes to `.mixin.out` under
  the run's working directory. To restrict export, add:

  ```text
  -Dmixin.debug.export.filter=com.example.**
  ```

  Replace `com.example.**` with the target class or package pattern. The filter needs
  export enabled, and the output represents the Mixin stage of transformation.
- **Inspect the target of a failed patch.**

  `-Dmixin.dumpTargetOnFailure=true` dumps the target bytecode when application
  fails, which is useful when a successful post-mixin export is unavailable.
- **Check injection counts.**

  `-Dmixin.debug.countInjections=true` enables the injector's `expect` check.
  For [`@Inject`](https://github.com/LegacyModdingMC/UniMix/blob/main/src/main/java/org/spongepowered/asm/mixin/injection/Inject.java),
  `expect` is a minimum count and defaults to one. Compare the target and
  injection point before changing the expected count.

The option definitions are in
[UniMix's `MixinEnvironment`](https://github.com/LegacyModdingMC/UniMix/blob/main/src/main/java/org/spongepowered/asm/mixin/MixinEnvironment.java).
`-Dmixin.debug=true` enables the broader group of debug options, including
exports and additional checks. Check the implementation and version loaded
by your run when comparing diagnostics.

## Access transformation or class loading fails

**Access-transformer rules**

`-Dfml.debugAccessTransformer=true` logs rules
and access changes in
[Minecraft 1.7.10 FML](https://github.com/MinecraftForge/FML/blob/1.7.10/src/main/java/cpw/mods/fml/common/asm/transformers/AccessTransformer.java).
Compare the class, member, and access change with the intended rule.

**LegacyLauncher**

`-Dlegacy.debugClassLoading=true` enables diagnostics in
[`LaunchClassLoader`](https://github.com/GTNewHorizons/LegacyLauncher/blob/master/src/main/java/net/minecraft/launchwrapper/LaunchClassLoader.java).
Use this for runs loading classes through LegacyLauncher.

**Hodgepodge transformers**

`-Dhodgepodge.dumpClass=true`, defined in
[`EarlyConfig`](https://github.com/GTNewHorizons/Hodgepodge/blob/master/src/main/java/com/mitchej123/hodgepodge/core/shared/EarlyConfig.java),
activates dumps from transformers that call
[`HodgepodgeClassDump`](https://github.com/GTNewHorizons/Hodgepodge/blob/master/src/main/java/com/mitchej123/hodgepodge/core/shared/HodgepodgeClassDump.java).
Compare the target's `_PRE` and `_POST` files to see that transformer's change.
[GTNHLib's dump helper](https://github.com/GTNewHorizons/GTNHLib/blob/master/src/main/java/com/gtnewhorizon/gtnhlib/asm/ASMUtil.java)
writes under `ASM_GTNH` in the game directory and logs the file paths.

Save the logs and exported files before another launch. Once you correct the
version, patch, or configuration responsible, remove the diagnostic flags
and restart. Repeat both the failing action and a check of the intended
patched behavior. If the cause remains unclear, include the loaded versions,
target, exception, enabled flags, and relevant dumps in a report to the patch
owner.
