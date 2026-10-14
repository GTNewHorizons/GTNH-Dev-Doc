---
title: Before you start coding
description: Check design, balance, and contribution requirements before committing to a GTNH change.
---

Check whether the change fits GTNH before spending time implementing it. Read
the [contribution guidelines](https://github.com/GTNewHorizons/.github/blob/master/CONTRIBUTING.md),
the target repository's instructions, and the
[Developer's Code of Conduct](https://github.com/GTNewHorizons/.github/blob/master/CODE_OF_CONDUCT.md).
The requirements below help you plan your proposal. The linked policies
define those requirements.

## Discuss the design before substantial work

Major new content must be discussed with the team before implementation.
Explain the problem, intended behavior, progression impact, and how the change
fits the [modpack vision](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/vision%20of%20the%20modpack/original%20vision%20doc.md).
If the vision does not cover the proposal, seek agreement before proceeding.

The guidelines discourage new content below IV because those tiers are already
dense. A proposal with a strong reason needs discussion and general consensus
before serious work starts. Bug fixes and quality-of-life changes follow the
normal contribution process.

If you have not played the area you want to change, get feedback from developers
or players who know it. This matters especially for progression, balance, and
late-game systems. Check existing issues and pull requests to avoid duplicating
work or overlooking a design decision.

## For a balance change

Balance-affecting pull requests must follow the vision, carry the
`Affects Balance` label when appropriate, and keep unrelated changes separate.
Answer the guidelines' required questions:

- What goal does the change serve, and which tier does it target?
- What are the effects on other systems and the wider game meta?
- What measurements, diagrams, or practical setups support it?
- Does it depend on another planned or unmerged change?

At least two approvals are required, including one from the Balance Review
team. A new recipe chain also requires a flowchart. Use
[chemical balance](/GTNH-Dev-Doc/development-practices/chemical-balance/)
to check material quantities. Those quantities can balance even when a chain
doesn't fit progression.

## Read the instructions for the affected content

| Work | Owning guidance |
| --- | --- |
| Java or Scala code | The repository's README, build checks, and [code style](/GTNH-Dev-Doc/development-practices/code-style/). |
| Questbook content | The [quest development guide](https://github.com/GTNewHorizons/GT-New-Horizons-Modpack/blob/master/config/betterquesting/Readme.md). |
| StructureLib multiblocks | [StructureLib documentation](https://www.gtnewhorizons.com/StructureLib/) and examples in the target mod. |
| Textures, GUIs, and pack text | The contribution guidelines' content and design standards, including the mod's identity and language requirements. |

## Before using AI assistance

Read the [AI usage policy](https://github.com/GTNewHorizons/GTNH-Dev-Doc/blob/master/AI_POLICY.md).
You must understand submitted code, review and edit assisted text, and retain
your own voice and intent. Commit messages and pull request descriptions must
read in your own voice. The policy also covers firsthand bug reproduction,
issues, discussions, quests, and prohibited AI-generated media.

Once you understand the proposal and its requirements,
[choose the owning repository](/GTNH-Dev-Doc/start-here/choose-a-repository/)
and prepare the change.
