---
title: Contribute to this documentation
description: Choose a useful developer topic, verify its claims, and submit a documentation change.
sidebar:
  order: 5
---

Write for a developer who needs to complete a task, choose an approach,
understand a GTNH mechanism, or look up a fact. Shared developer workflows
belong here; player guides belong on the
[GTNH wiki](https://wiki.gtnewhorizons.com/), and an individual mod's API manual
belongs with its source.

## Decide what the page contributes

Start with the reader's situation and the result they need. Find existing
coverage before adding a page. A better change may be a missing example,
a merged procedure, or removal of duplicated guidance.

Keep material that explains a GTNH convention, a shared workflow, a recurring
failure, or the relevance of Minecraft 1.7.10 behavior to GTNH. A standalone
tour of one mod's implementation belongs with that mod. A shared choice it
demonstrates can belong here with a source link.

## Put the content where readers need it

| Section | Reader's goal |
| --- | --- |
| Start Here | Prepare a workspace and submit a first contribution. |
| Contributing | Understand contribution, review, and testing expectations. |
| Development Practices | Choose an implementation approach GTNH expects or recommends. |
| How-to Guides | Complete a specific development task. |
| Concepts | Understand repositories, build layers, runtimes, and releases. |
| Maintainer Procedures | Perform an authorized build, publication, or recovery operation. |
| Troubleshooting | Diagnose a symptom and verify recovery. |
| Minecraft & Forge Internals | Understand a legacy platform mechanism that affects a change. |
| Reference | Look up a term or authoritative resource. |

Link related material rather than explaining the same mechanism in several
sections. A procedure can link background without interrupting its main path.

## Verify advice before publishing it

Check consequential claims against the owning source, README, build
configuration, workflow, or version-matched documentation. Existing prose and
a related link are leads to investigate, not proof.

Minecraft 1.7.10 advice needs evidence for that version and the relevant GTNH
implementation. Newer Forge guides can suggest a model, but their API names
and behavior are not a substitute for legacy evidence. Identify the scope of
version-specific examples and label proposals as proposals.

Preserve the strength of approved policies. Explain recommendations as
recommendations; do not turn an editorial preference into a project rule.

## Write and format for the task

Lead with the useful conclusion. Give necessary context before the action it
affects, explain non-obvious choices, and show how to recognize success.
Commands need a working directory, required inputs, and suitable shell syntax.

Use headings, paragraphs, lists, tables, and code blocks first. Use
[Starlight components](https://starlight.astro.build/components/using-components/)
when they expose sequence, alternatives, priority, or navigation. Steps are
ordered actions; tabs are mutually exclusive alternatives; cards are
destinations. Essential actions belong in the main flow.

Pages importing components use `.mdx` and import from
`@astrojs/starlight/components`. Retain the basename when changing a page's
extension so its route stays stable.

## Build and review the result

Edit `src/content/docs/` and register new pages in `astro.config.mjs`.
When merging or removing a page, update its inbound links and sidebar entry.
Add a redirect to an equivalent successor when one exists. Check fragments
when changing headings.

From the documentation checkout root, install dependencies when needed and
build:

```sh
npm ci
npm run build
```

Inspect the rendered result, especially when changing components or layout.
Check desktop readability and use a narrow viewport for changes that could
affect responsive behavior. Review the diff for altered facts, missing useful
material, and broken links.

Follow the [AI usage policy](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/AI_POLICY.md)
for assisted text. In your pull request, explain the reader's problem, the
resulting improvement, and the checks you completed.
