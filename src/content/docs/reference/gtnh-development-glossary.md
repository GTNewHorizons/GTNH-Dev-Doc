---
title: GTNH development glossary
description: Look up the build, runtime, and collaboration terms used by the developer guides.
---

Use these definitions to identify a term, then follow its guide for the
mechanism or procedure. Version-specific settings come from the target
checkout.

## Build and source terms

| Term | Meaning |
| --- | --- |
| Artifact | A built or published file, such as a mod jar, source jar, or pack ZIP. |
| Classifier | The optional artifact label in a dependency coordinate, such as `dev` or `sources`. |
| Deobfuscated / deobf | Code or an artifact using developer-readable Minecraft names. Tooling maps runtime names for development. |
| Development jar | A jar intended for a development classpath; standard RFG packaging uses the `dev` classifier. |
| Gradle wrapper | The checkout's launch scripts and wrapper properties that select its Gradle distribution. |
| GTNHGradle | GTNH's shared build conventions for mod repositories, applied through configurable modules. |
| RetroFuturaGradle (RFG) | The plugin preparing the legacy Minecraft/Forge development environment and mapped artifacts. |
| Reobfuscation | Converting development references to the names required by the target game runtime. |
| Source set | A Gradle grouping of source and resources, such as `main`, `test`, or a project-specific generated set. |
| Task | A named Gradle operation registered by the project's build and plugins. |
| Toolchain | A selected compiler or Java installation used by a task; it can differ from the JDK running Gradle. |

See [build layers](/GTNH-Dev-Doc/concepts/understand-the-gtnh-build-system-stack/),
[Java selection](/GTNH-Dev-Doc/concepts/understand-java-and-runtime-selection/), and
[dependencies and artifacts](/GTNH-Dev-Doc/concepts/understand-dependencies-and-artifacts/)
for the relationships between these terms.

## Minecraft and mod-development terms

| Term | Meaning |
| --- | --- |
| Access transformer (AT) | Configuration that changes access to selected Minecraft/Forge members through the build or loading machinery. |
| Development client | A game launched from a mod's configured development run with its selected dependencies and working directory. |
| Integrated server | The logical server running inside a physical client process for singleplayer. |
| Logical side | The client presentation/input role or the server's authoritative game-state role. |
| Physical side | The actual graphical client or dedicated-server process and its available classes. |
| Mixin | A bytecode transformation used to alter a target class without editing its source directly. |
| Metatile entity (GT5) | A machine implementation hosted by a base tile entity and using that tile's world lifecycle. |
| NBT (Named Binary Tag) | The typed tag format used for saved and transmitted Minecraft data. |
| Tile entity | A world object associated with a block position that can hold state and participate in its lifecycle. |

See [client/server boundaries](/GTNH-Dev-Doc/minecraft-forge-internals/understand-client-and-server-boundaries/),
[NBT schemas](/GTNH-Dev-Doc/minecraft-forge-internals/treat-nbt-as-a-persistent-schema/), and
[mixins and transformers](/GTNH-Dev-Doc/troubleshooting/mixins-and-transformers/).

<span id="collaboration-and-pack-build-terms"></span>

## Git and collaboration terms

| Term | Meaning |
| --- | --- |
| Base branch | The branch a PR asks to merge into, such as the project's requested `master` or `main` branch. |
| Branch | A named line of development. Create a contribution branch from the intended base so its commits describe one change. |
| Clone | A local copy of a repository and its Git history. Cloning a public repository doesn't require permission to push to it. |
| Commit | A recorded checkpoint with an ID and message. A local commit saves selected changes in Git; pushing publishes it to a remote. |
| Diff | A comparison showing what changed between files or revisions. |
| Fetch | Download remote history and update remote-tracking references without changing the files in your current working tree. |
| Fork | A GitHub repository copy under another account, commonly used for contribution branches. |
| Git | The version-control system that records file history and manages branches and commits. |
| GitHub | The platform hosting GTNH's Git repositories, issues, pull requests, and reviews. |
| GitHub Desktop | An application providing graphical controls for Git and GitHub operations. |
| Local / remote | Local work is on your computer. A remote is another repository reached through a configured connection, often hosted on GitHub. |
| Merge | Combine another branch's changes into a branch. A local merge doesn't publish the result by itself. |
| Origin | The usual remote name for the repository you cloned. In the fork workflow, it points to your fork; remote names can be changed. |
| Pull | Fetch and integrate a remote branch into the current local branch. This is different from opening a pull request. |
| Pull request (PR) | A proposal to merge a branch's changes into a chosen base branch. GitHub provides the discussion, review, and checks around it. |
| Push | Send local commits to a remote repository and update its branch. Pushing to your fork doesn't merge the change into GTNH's repository. |
| Repository (repo) | A project's files and Git history, with copies on your computer or hosted elsewhere. |
| Upstream | For a fork, the original project; a remote named `upstream` conventionally points there. A branch's tracking upstream is a separate setting for synchronization. |
| Working tree | The files you're currently editing in a checkout, including changes that haven't been committed. |

Use [GitHub Desktop](/GTNH-Dev-Doc/how-to/contribute-with-github-desktop/) or the
[command-line setup](/GTNH-Dev-Doc/start-here/set-up-your-workspace/)
for the contribution workflow. Git's [glossary](https://git-scm.com/docs/gitglossary)
and [fetch](https://git-scm.com/docs/git-fetch) and
[pull](https://git-scm.com/docs/git-pull) references explain the underlying operations.

## Publication and pack-build terms

| Term | Meaning |
| --- | --- |
| Maven Local | A machine's local Maven repository used for unpublished artifact testing. |
| Manifest | The pack build's recorded selection of mod versions and related assembly data. |
| Shared workflow | A reusable GitHub Actions workflow called by a repository's own workflow. |
| Pre-release | A version published for development or coordinated testing; its tag convention and destination depend on the repository. |

Use [cross-repository testing](/GTNH-Dev-Doc/how-to/test-cross-repository-changes/)
and [the release pipeline](/GTNH-Dev-Doc/concepts/understand-the-gtnh-release-pipeline/)
to follow an artifact into its consumer or pack.
