---
title: Keep values separate from localized text
description: Format and translate GTNH values only when presenting them to a player.
---

Keep numbers and identifiers language-neutral during calculation, storage,
comparison, and networking. Format and translate them only for display.

## Format only for display

Use GTNH's shared number-formatting utilities for player-facing values. Use
`formatFluid` and `getFluidUnit` where applicable so fluid units follow the
player's configuration.

:::caution[Do not parse display text]
Never parse a localized result back into a number. Grouping and decimal
separators differ by locale.

Calculate with the original number. For a machine-readable text format, use the
locale-independent representation required by its protocol.
:::

## Translate for the receiving player

Send translation keys and arguments to the client that will display them. Text
localized on the server uses the server's language instead of each player's.
Forge's
[localization documentation](https://docs.minecraftforge.net/en/1.12.x/concepts/internationalization/)
explains this distinction and warns against using translation keys for logic.

Use translation keys instead of hard-coded English when the API supports them.
Changing a key also invalidates translations that use the old key.

## Use the shared GTNH utility

Before adding `String.format`, `DecimalFormat`, or a unit helper, check the
owning repository and GTNHLib. Current GTNH code uses
[`NumberFormatUtil`](https://github.com/GTNewHorizons/GTNHLib/blob/master/src/main/java/com/gtnewhorizon/gtnhlib/util/numberformatting/NumberFormatUtil.java)
for this purpose.

Test a large value, a fractional value, configurable units, and a locale with
different grouping or decimal separators.

For GT5-specific API, key-naming, placeholder, and language-file layout rules,
see [Add localized text to GT5](/GTNH-Dev-Doc/development-practices/gt5-localization/).
