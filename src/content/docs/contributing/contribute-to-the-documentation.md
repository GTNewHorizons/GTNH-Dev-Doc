---
title: Contribute to this documentation
description: Decide what belongs in the GTNH Developer Documentation and submit a focused change.
sidebar:
  order: 5
---

This documentation records GTNH development knowledge and shared decisions.

## Decide whether the topic belongs here

A topic needs a clear GTNH development purpose. Check:

- Is it useful to developers working on GTNH repositories?
- Is it shared across repositories, or likely to help contributors beyond one
  mod?
- Does it describe a GTNH convention, agreed practice, workflow, or recurring
  pitfall?
- Does it explain how relevant Minecraft 1.7.10 or Forge knowledge applies to
  GTNH development?
- Is it stable enough that maintaining the page is practical?

For example, document which shared color utility preserves resource-pack
compatibility, when to use it, why, and where to verify its current API.

## Choose where it belongs

Choose the section from the reader's goal:

| Section | Use it for |
| --- | --- |
| **Start Here** | The ordered path a new contributor follows to prepare a development environment and make a first change. |
| **Contributing** | Contribution policies, review expectations, testing expectations, and guidance for improving this documentation. |
| **Development Practices** | Shared GTNH conventions, preferred APIs, style decisions, and compatibility practices. |
| **Minecraft & Forge Internals** | Minecraft 1.7.10 and Forge mechanisms explained through their relevance to GTNH development. |
| **How-to Guides** | Steps for completing a specific development task with a clear outcome. |
| **Concepts** | Explanations of GTNH repository structure, build tooling, dependencies, and release systems. |
| **Maintainer Procedures** | Release, build, and recovery operations performed by GTNH maintainers. |
| **Troubleshooting** | Diagnosing a symptom, finding its cause, and recovering from it. |
| **Reference** | Information readers look up, such as terminology, repositories, and authoritative resources. |

For overlapping topics, put shared choices in **Development Practices**,
platform mechanisms in **Minecraft & Forge Internals**, and procedures in
**How-to Guides**. Link instead of duplicating explanations.

## Keep these topics elsewhere

- Put player guides and gameplay information on the
  [official GTNH wiki](https://wiki.gtnewhorizons.com/).
- Include Minecraft 1.7.10 or Forge material only when it explains its relevance
  and application to GTNH development.
- Keep documentation of an individual mod's implementation with that mod,
  close to the source it describes.

A walkthrough of `RenderForgeOfGods` would duplicate one mod's source and become
outdated. Document any reusable convention it demonstrates and link the class
as an example.

Link repository-dependent claims to the relevant source, build script, or
documentation. Do not copy implementation details that can change separately.

## Write a useful page

- Start with the task, decision, or convention the reader needs to understand.
- State the useful conclusion before its background.
- Keep only sentences that define, instruct, explain a reason, or provide
  evidence.
- Explain which repositories or situations it applies to.
- Include the reason behind an agreed practice so readers know when it matters.
- Prefer short procedures and concrete examples over broad introductions.
- Link to current source material for details that may change.
- Use the same concise, task-oriented style as the existing pages.

## Use formatting to expose structure

Use standard Markdown by default. Use [Starlight components](https://starlight.astro.build/components/using-components/) when they make the existing information easier to scan or apply:

| Format | Use it for |
| --- | --- |
| [Asides](https://starlight.astro.build/components/asides/) | A note, tip, warning, or danger that must stand apart from the surrounding explanation. Give custom titles specific meaning, such as `Signs`, `Maintainer operation`, or `Do not parse display text`. |
| [Steps](https://starlight.astro.build/components/steps/) | An ordered procedure whose sequence matters. Do not use it for an unordered checklist. |
| [Tabs](https://starlight.astro.build/components/tabs/) | Parallel alternatives such as operating systems, tools, or mutually exclusive workflows. Keep information outside the tabs when it applies to every alternative. |
| [Cards and card grids](https://starlight.astro.build/components/cards/) | A small set of destinations or categories that readers choose between. Use `LinkCard` when the whole card leads to one destination. |
| Tables | Comparisons, mappings, compatibility matrices, and compact reference data. |
| Code blocks | Commands, configuration, output, and examples that readers need to copy or recognize. |

Do not add components only for decoration. A component should reveal priority, sequence, alternatives, or navigation. Keep dense technical explanations as plain headings and paragraphs when no component improves their structure.

Pages that import Starlight components must use `.mdx`. Import components from `@astrojs/starlight/components`, and keep the page's route unchanged when renaming a file from `.md` to `.mdx`.

## Submit the change

Use **Edit page**, or edit `src/content/docs/` locally. Register new pages in
`astro.config.mjs`.

Before opening a pull request, run:

```sh
npm ci
npm run build
```

Review the rendered page on desktop and mobile when changing components or layout. Check the final diff for altered facts, lost links, and unrelated edits.

Keep the pull request focused and explain what problem the new or updated
content solves for GTNH developers.
