---
title: Contribute with GitHub Desktop
description: Fork, edit, review, and submit a GTNH change with a graphical Git client.
---

Use GitHub Desktop if you prefer a graphical Git workflow. You still need an
editor for the files you change and a terminal for the checks required by the
target repository. For code changes, complete the
[development setup](/GTNH-Dev-Doc/start-here/prerequisites/) first.

## Fork and clone the repository

1. [Choose the repository](/GTNH-Dev-Doc/start-here/choose-a-repository/)
   that owns the change. On its GitHub page, select **Fork** and create a fork
   under your account. If GitHub offers **Copy the master branch only**, leave
   it unchecked so the fork keeps version tags used by GTNH builds.
2. Sign in to [GitHub Desktop](https://desktop.github.com/). Choose
   **File → Clone Repository → GitHub.com**, select your fork, choose a local
   path, and select **Clone**. If the fork is not listed, use the **URL** tab
   with your fork's GitHub URL.
3. Check that Desktop shows your fork as the current repository. Select
   **Current Branch → New Branch** and give the branch a short name describing
   this change.

## Change, test, and submit

1. Open the local repository in your editor, make one focused change, and save
   the files. Follow the target repository's README for its build and test
   commands. For a mod, use [build and run](/GTNH-Dev-Doc/start-here/build-and-run/).
2. In Desktop's **Changes** tab, inspect the diff and select only the files you
   intend to submit. Leave generated build files, run directories, IDE state,
   and secrets out of the commit.
3. Enter a descriptive **Summary**, select **Commit to _your branch_**, then
   select **Publish branch**. For later revisions, use **Push origin** after
   committing.
4. Select **Preview Pull Request**, verify that the base is the branch requested
   by the target repository, then select **Create Pull Request**. On GitHub,
   check that the base repository is the original GTNH repository. Fill in the
   pull request template with the problem, change, and test results. Choose a
   draft pull request if the work needs early feedback.

Continue with the [pull request expectations](/GTNH-Dev-Doc/contributing/pull-request-expectations/)
and respond to review on the same branch. GitHub maintains the
[Desktop interface reference](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
if a menu label changes.
