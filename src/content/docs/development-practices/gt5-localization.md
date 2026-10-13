---
title: Add localized text to GT5
description: Choose a GT5 translation API, preserve language keys, and apply the proposed naming convention where appropriate.
---

Start from the text's display destination and preserve any existing key whose
meaning still fits. These API choices apply to GT5-Unofficial. The naming and
file layout below come from the **proposed** guide in
[PR #7643](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7643), which remains
open; check its review before a broad language-file migration.

Community translations belong in
[GTNH-Translations](https://github.com/GTNewHorizons/GTNH-Translations).
This page covers English source strings and their Java call sites.

## Choose the API by display destination

| Destination | API |
| --- | --- |
| Client-rendered name, tooltip, GUI, NEI, or WAILA text | `StatCollector.translateToLocal(key)` |
| Client-rendered text with arguments | `StatCollector.translateToLocalFormatted(key, args...)` |
| Simple chat sent from server code | `GTUtility.sendChatTrans(player, key, args...)` |
| Chat with separately styled components | An `IChatComponent` sent with `GTUtility.sendChatComp` |
| ModularUI 2 widget or tooltip | `IKey.lang(key, args...)` |

Pass the key to `sendChatTrans`, not a string already translated by the server.
Its [implementation](https://github.com/GTNewHorizons/GT5-Unofficial/blob/master/src/main/java/gregtech/api/util/GTUtility.java)
sends a `ChatComponentTranslation` so the recipient translates it.
For new text, use the translation APIs above rather than adding
`GTLanguageManager.addStringLocalization` calls.

Server logs may reuse player-facing text, but do not add translation keys solely
for logging. The proposed guide describes the dedicated server's English
fallback and the integrated server's use of its host client's language.

## Choose placeholders that preserve the sentence

Use placeholders instead of concatenating translated fragments. For new GT5
chat keys, follow the proposed guide's plain `%s` convention. The underlying
chat API also accepts indexed string placeholders, as its documentation
states, but the proposal intentionally uses the narrower convention.
Numeric conversions such as `%d` or `%f` are not chat formatting operations.

For client text, indexed string placeholders such as `%1$s` and `%2$s` let
translations reorder arguments. Format displayed numbers with the
[shared number utility](/GTNH-Dev-Doc/development-practices/localized-display-text/)
before substitution. Minecraft 1.7.10's standard language loaders normalize numeric
placeholders to string placeholders, so a key containing `%.2f` does not
guarantee two decimal places. You can inspect `Locale` and `StringTranslate`
in the generated Minecraft sources.

Prefer `translateToLocalFormatted` to applying `String.format` to translated
text yourself; its implementation returns a format-error result for an invalid
format. Test each translated value with the arguments actually passed by its
call site.

Use `\n` within a tooltip key when its lines always appear together.
Use numbered `.tooltip.1`, `.tooltip.2`, and subsequent keys when lines can
be displayed independently. Use `EnumChatFormatting` for formatting in Java;
language-file values may contain section-sign codes.

## Apply the proposed naming convention

For new keys using this convention, start with:

```text
gt.<category>.<subcategory>.<identifier>
```

Use lowercase categories and identifiers, `.` between segments, and
`snake_case` within a segment. Put suffixes such as `.name`, `.tooltip`,
`.title`, `.structure_error`, `.shutdown_reason`, and `.recipe_result` last.

A key used by one source file includes a class scope after the category.
Remove common `MTE`, `GT`, or `GT5U` prefixes and use `camelCase` for this
scope:

```properties
gt.infodata.basicBatteryBuffer.stored_items=Stored: %s / %s EU
```

Drop the class scope for keys shared by several files:

```properties
gt.infodata.average_input=Avg. Input: %s EU/t
```

Creative-tab keys use the generated `itemGroup.` naming instead of this prefix.
All loaded language keys share a namespace, so the key must identify its GT5
purpose.

## Place and preserve the source values

Edit `src/main/resources/assets/gregtech/lang/en_US.lang`.
The [proposal's layout](https://github.com/GTNewHorizons/GT5-Unofficial/blob/21fa3f9687c3a5cb0da7655fed151a711d1bbebb/docs/Localization.md)
puts new keys near the bottom, below the new-system marker, under functional
headings such as GUI, Tooltips, Chat, or Scanner & Info Data. Class scope is
part of a key's name, not a separate functional section.

Check whether your checkout has that structure before using it. If the marker
and sections are absent, follow the current file layout and coordinate the
migration separately. Keep unrelated legacy entries in place.

Never reuse a key for a different meaning. If a shipped key is intentionally
renamed or removed, update its references and all shipped language files in
the same change so another locale does not silently retain the old meaning.

## Verify the result

Check the key, English value, references, and placeholders together.
Exercise the actual UI, including multiline or conditional text.
For server chat, connect a non-English client to a dedicated server and verify
that the recipient displays the translation.

[GTNH-Lang-utils](https://github.com/GTNewHorizons/GTNH-Lang-utils) provides
optional VS Code assistance for `.lang` highlighting and section navigation.
Use its current README for installation and supported features; source files
and the localization guide determine correctness.
