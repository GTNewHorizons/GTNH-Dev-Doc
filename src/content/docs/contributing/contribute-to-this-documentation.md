---
title: Contribute to this documentation
description: Edit a page, add a guide, and preview your changes before opening a pull request.
---

If a guide left you guessing, explain the step you needed. If a command has
changed, update it and check that it works. Corrections, examples, and guides
for tasks you've worked through all help the next contributor.

Changes to this site go to
[GTNH-Dev-Doc](https://github.com/GTNewHorizons/GTNH-Dev-Doc).
It covers developing and maintaining GTNH. Player guides belong on the
[GTNH wiki](https://wiki.gtnewhorizons.com/); a mod's API reference belongs with
that mod, where it can be updated alongside the code.

## Make and preview an edit

The site uses Markdown and MDX, built with Astro and Starlight. For a local
preview, you need Node.js 22.12 or newer and npm 10.8.2 or newer, as listed in
the repository's [README](https://github.com/GTNewHorizons/GTNH-Dev-Doc#local-setup).

1. **Prepare a checkout.** Fork and clone `GTNewHorizons/GTNH-Dev-Doc`, then
   create a branch from `master` for your change. If you prefer graphical Git,
   follow [Contribute with GitHub Desktop](/GTNH-Dev-Doc/contributing/contribute-with-github-desktop/)
   using this repository.
2. **Find the page's file.** The **Edit page** link at the bottom of a published
   page opens its file on GitHub. Use the path shown there to find the same
   file in your checkout. Pages live under `src/content/docs/`.
3. **Start the local preview.** From the checkout root, the folder containing
   `package.json`, install dependencies and start the development server:

   ```sh
   npm ci
   npm run dev
   ```

   Run `npm ci` when setting up the checkout or after its dependencies change;
   editing a page doesn't require reinstalling them. Open the local address
   printed in the terminal and navigate to your page.
4. **Edit, save, and read the result.** Use a text editor to change the file.
   The local preview updates as you save. Follow the affected steps and links
   while reading it, and check that code blocks, lists, and any components
   appear where you intended.

The local preview shows the site's layout and Starlight components. GitHub's
file preview is useful for checking Markdown, but it doesn't reproduce the
published site.

## Add a page

Search the docs first. A missing explanation or example often belongs in the
guide someone is already following. Give a topic its own page when readers
need to find and use it separately, such as a procedure for testing changes
across repositories or an explanation of how tile entity state is saved.

Choose the folder by the topic someone would look for:

| What you're adding | Folder under `src/content/docs/` |
| --- | --- |
| A step in making a first contribution | `start-here/` |
| Finding source, using Git, submitting changes, or editing these docs | `contributing/` |
| Gradle tasks, build configuration, Java runtimes, or dependencies | `build-tools/` |
| Testing expectations, methods, or tools | `testing/` |
| Logs, checks, and fixes for a recognizable failure | `troubleshooting/` |
| A shared implementation convention | `development-practices/` |
| Minecraft 1.7.10 or Forge behavior developers need to understand | `minecraft-forge-internals/` |
| The release pipeline or a build, release, or repair procedure for maintainers | `releases-and-maintenance/` |
| Definitions or resources to look up | `reference/` |

### Create the file

Use a lowercase, hyphenated version of the title as the filename. Use `.md`
for Markdown and `.mdx` when the page imports components. Reserve `index.md`
or `index.mdx` for the home page and section landing pages, where readers
choose a guide or follow a sequence.

Each page starts with a title and description between `---` lines. For
example, `src/content/docs/development-practices/code-style.md` starts with:

```yaml
---
title: Code style
description: Apply the repository's formatter and make the behavioral change readable in review.
---
```

The title becomes the page heading, so start the body with your explanation
rather than another `#` heading. Use `##` for sections and `###` for their
subsections when the material needs them. The description briefly tells
someone what they'll get from the page.

### Make the page reachable

Add the page to the appropriate section's `items` in `astro.config.mjs`.
Sidebar entries use the folder and filename without the extension. The
entry for Code style is:

```js
{ slug: 'development-practices/code-style' },
```

For a section's `index` page, use the folder alone, such as `start-here`.
The order of those entries controls the sidebar. Link to the new page
from a related guide where someone would need it. If you rename or remove a
page, update its sidebar entry and the links to it. When you change a heading,
check links to that section too.

Use previous and next links when pages form a sequence, such as workspace
setup followed by a first build. Set those links explicitly with the
[`prev` and `next` frontmatter fields](https://starlight.astro.build/reference/frontmatter/#prev).
For other guides, link to related pages where they help someone continue
the task.

## Write instructions people can follow

Explain the task as you would to another contributor. Use **you**,
name the tool or file you're talking about, and introduce unfamiliar terms.
Put the context someone needs before the action it affects. For a command,
say which directory to run it from, which values to replace, and what a
successful result looks like. Explain an unusual step so readers know when
it applies.

Check technical advice against the relevant source, README, build
configuration, or workflow. Try runnable examples in the checkout you're
documenting when you have the environment and permissions to do so, and
identify anything you couldn't verify in your pull request.
Include the mod, build plugin, or pack version when the advice depends on it.
Minecraft 1.7.10 and GTNH's implementations can behave differently from newer
Forge versions; check the version the reader will use. Link the source next
to the explanation so someone can follow it or check it later.

Keep recommendations distinct from project requirements. If you're proposing
a convention, say so and link the discussion. For a procedure that needs a
longer explanation, link that background from the relevant step instead of
making the reader work through it first. An example from one mod is useful
here when it explains a problem other contributors face too.

### Links, code, and images

Use a link label that tells someone where it goes. For a link to a regular
page on this site, use `/GTNH-Dev-Doc/` followed by its folder and filename,
without the extension:

```md
[Code style](/GTNH-Dev-Doc/development-practices/code-style/)
```

To link to a section, copy its heading link from the local preview, which
includes a `#` fragment. Use backticks for file paths, commands, and code
identifiers. Put commands and longer examples in fenced code blocks with a
language such as `sh`, `powershell`, `java`, or `text`. Keep copyable commands
separate from their output.

Use a screenshot when it helps someone recognize a screen or compare
behavior. Store it in `src/assets/`, link it with a path relative to the
page's file, and describe the important details in its alt text. Crop out
unrelated parts and explain in the surrounding text what to look for.

Start with ordinary Markdown. If steps, shell alternatives, or navigation
would be clearer with a component, use
[Starlight's component examples](https://starlight.astro.build/components/using-components/).
Pages that import components need `.mdx` and imports from
`@astrojs/starlight/components`; keep the filename when changing the
extension. Keep essential instructions visible, including any conditions
that affect the next step. Starlight's
[Markdown guide](https://starlight.astro.build/guides/authoring-content/)
covers the supported syntax.

## Build and submit the change

From the checkout root, run:

```sh
npm run build
```

Resolve build errors before opening your pull request. Read the changed
pages in the local preview and follow their links, including links to
sections. For layout or component changes, check a desktop width and a
narrower window for clipped text, awkward tables, or unreadable code.

Review the diff for accidental changes to commands or meaning, then commit
and push your branch. Open a pull request against
`GTNewHorizons/GTNH-Dev-Doc`'s `master` branch and fill out its template.
Explain what was missing or confusing, which sources or versions you
checked, and how you tested the result. Use
[Pull request expectations](/GTNH-Dev-Doc/contributing/pull-request-expectations/)
for the review workflow.

Follow the [AI usage policy](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/AI_POLICY.md)
for assisted writing. The substance, intent, and voice of the contribution
must be yours.
