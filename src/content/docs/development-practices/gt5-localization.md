---
title: Add localized text to GT5
description: Choose the correct localization API and name and place new GT5 language keys consistently.
---

These rules apply to new localization work in GT5-Unofficial. They summarize
the localization guide introduced in
[GT5-Unofficial PR #7643](https://github.com/GTNewHorizons/GT5-Unofficial/pull/7643).
Follow the PR's latest guide for a large language-file reorganization.
Keep calculated and stored values locale-neutral as described in
[Keep values separate from localized text](/GTNH-Dev-Doc/development-practices/localized-display-text/).

## Choose the API by where text is displayed

| Text destination | API |
| --- | --- |
| Client-rendered item name, tooltip, GUI, NEI, or WAILA text | `StatCollector.translateToLocal(key)` |
| Client-rendered text with arguments | `StatCollector.translateToLocalFormatted(key, args...)` |
| Simple chat sent from server code | `GTUtility.sendChatTrans(player, key, args...)` |
| Chat with independently styled components | Build an `IChatComponent`, then use `GTUtility.sendChatComp` |
| ModularUI 2 widget or tooltip | `IKey.lang(key, args...)` |

Pass the translation key, not a translated string, to `sendChatTrans`. It sends
a `ChatComponentTranslation` so each receiving client translates the message in
its own language. Chat components support only plain `%s` placeholders; do not
use `%d`, `%f`, precision specifiers, or positional placeholders in chat keys.

For client-side formatted text, prefer `translateToLocalFormatted` over applying
`String.format` to a translated value. It catches an invalid translated format
and returns a format-error result instead of propagating `IllegalFormatException`.

A server may reuse a translated player-facing string in a log. Do not create a
translation key solely for server logging: dedicated servers load `en_US`, while
an integrated server uses its host client's language.

## Name new keys consistently

Use this shape:

```text
gt.<category>.<subcategory>.<identifier>
```

- Use lowercase names.
- Separate segments with `.`.
- Use `snake_case` within a segment.
- Put suffixes such as `.name`, `.tooltip`, `.title`, `.structure_error`,
  `.shutdown_reason`, or `.recipe_result` last.

Creative-tab keys are generated as `itemGroup.<registryName>.<tabName>` and do
not use the `gt.` prefix. All language keys share one namespace across the
loaded game, so a key must identify its GT5 purpose clearly.

If a key is used in one source file, put a class scope immediately after the
category. Remove common `MTE`, `GT`, or `GT5U` prefixes and write the remainder
in `camelCase`:

```properties
gt.infodata.basicBatteryBuffer.stored_items=Stored: %s / %s EU
```

Drop the class scope when multiple files share the key:

```properties
gt.infodata.average_input=Avg. Input: %s EU/t
```

## Preserve translatable structure

Use placeholders instead of concatenating translated fragments. Client-side
formatted text may use `%s`, `%d`, `%f`, and positional placeholders such as
`%1$s`; positional placeholders let translations reorder arguments. Chat keys
remain limited to plain `%s`.

Use `\n` inside one tooltip key when its lines always appear together. Use
numbered `.tooltip.1`, `.tooltip.2`, and subsequent keys when lines can be
shown conditionally, reordered, or extended independently.

Use `EnumChatFormatting` in Java. Section-sign formatting codes are permitted
inside language-file values; keep hard-coded codes in Java for sequences where
constants would make the result less readable.

## Put keys in the functional section

Add new keys at the bottom of `en_US.lang`, below the designated new-language
system marker, under the heading matching where the text is used. GT5's
top-level groups include items, blocks, elements and materials, GUI, tooltips,
scanner and information data, chat, entities, achievements, and configuration.

Use Markdown-style comment depth: `#` for a top-level group, `##` for its child,
then `###` and `####`. Group a file-scoped key by function, not by its Java
class. Text rendered inside a GUI belongs under GUI even when it reports an
error or status; reserve Tooltips for hover text and multiblock tooltip-builder
text.

Do not reorder unrelated legacy keys while the language file is being migrated.
Never reuse an existing key for a different meaning. When intentionally
renaming or removing a key, update every shipped language file in the same pull
request so another locale does not silently keep the old meaning.

## Verify the change

Check that:

1. The selected API translates on the client that displays the text.
2. The key follows the prefix, category, scope, and suffix rules.
3. Every placeholder is supported by the selected API.
4. The key is under the correct functional heading.
5. Server-originated chat works on a dedicated server with a non-English client.

## References and editor tooling

Forge's
[internationalization and localization documentation](https://docs.minecraftforge.net/en/1.12.x/concepts/internationalization/)
explains translation keys, language files, client-side localization, and why
translation keys must not be used for program logic. It targets Minecraft 1.12,
so use it for the localization model and follow the GT5 rules above for 1.7.10
class names and placeholder support.

[GTNH-Lang-utils](https://github.com/GTNewHorizons/GTNH-Lang-utils) provides an
optional VS Code extension for GTNH `.lang` files. Install its `.vsix` from the
[releases page](https://github.com/GTNewHorizons/GTNH-Lang-utils/releases). It
provides:

- Minecraft, Angelica, gradient, rainbow, and formatting-code highlighting.
- Color swatches for inline colors and GTNHLib `ColorResource` values.
- Navigation between Java translation calls and language keys.
- Reference counts and translated-value hover information.
- Section folding and sticky headings based on `#` comment depth.

:::note[AI-generated tool]
The extension is fully AI-generated. Treat its results as editor assistance and verify keys, formatting, and references against the source files and the GT5 localization guide.
:::
