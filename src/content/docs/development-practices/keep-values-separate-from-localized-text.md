---
title: Keep values separate from localized text
description: Preserve numbers and identifiers through computation and translate only at the player's display boundary.
---

Calculate, store, compare, and transmit numbers and identifiers in their
original forms. Format and translate them when a player-facing API displays
the result. A machine's stored energy value, for example, should remain a
number even when its tooltip uses grouping separators.

## Format the value at the display boundary

Use the owning mod's supported utility or GTNHLib's
[NumberFormatUtil](https://github.com/GTNewHorizons/GTNHLib/blob/master/src/main/java/com/gtnewhorizon/gtnhlib/util/numberformatting/NumberFormatUtil.java).
Its `formatNumber` handles number presentation, while `formatFluid` appends
the configured fluid unit. `getFluidUnit` supplies the unit when an API needs
it separately.

A formatted value can contain locale-specific grouping and decimal separators.
Keep the original number for further calculation. If you parse the display
string back into a number, the calculation depends on presentation settings.
Machine-readable text must use the representation required by its protocol.

## Let the receiving client translate

For a message sent from server code, send a translation key and arguments
through the mod's translated-message API. Each recipient can then display it
in their own language. Pre-translating with the server's language loses that
choice.

In Minecraft 1.7.10, `ChatComponentTranslation` represents translated chat.
GT5's [sendChatTrans implementation](https://github.com/GTNewHorizons/GT5-Unofficial/blob/master/src/main/java/gregtech/api/util/GTUtility.java)
wraps that component; pass it the key and arguments. Use the relevant UI
framework's translation API for client-rendered labels and tooltips.

Translation keys are identifiers, not program logic. Keep an existing key
when its meaning remains the same, and use placeholders so a translation
can rearrange a complete sentence. For GT5 API choices, placeholder limits,
and the proposed key layout, see
[Add localized text to GT5](/GTNH-Dev-Doc/development-practices/add-localized-text-to-gt5/).

## Check presentation and delivery

Try large and fractional values, a different locale, and both configured
fluid-unit labels. For server-originated text, connect a non-English client
to a dedicated server. Confirm that the recipient translates the message and
that changes in presentation do not alter stored or calculated values.
