---
title: Contribute with GitHub Desktop
description: Prepare a contribution branch, review files, and open a pull request through GitHub Desktop.
---

Use GitHub Desktop for graphical Git operations and your editor for the
change. You need command-line Git for the upstream/tag step below, plus the
owning repository's build and validation tools.
Start with [the repository and its target branch](/GTNH-Dev-Doc/start-here/choose-a-repository/).

## Fork and clone

1. Create a fork under your GitHub account using the original repository's
   **Fork** button.
2. Sign in to [GitHub Desktop](https://desktop.github.com/). Choose
   **File → Clone Repository**, select your fork, choose a local path, and
   clone it. Use the **URL** tab if the fork is absent from the list.
3. In the cloned repository, open a terminal through Desktop and complete
   [the upstream and branch setup](/GTNH-Dev-Doc/start-here/fork-clone-and-import/#fork-and-clone),
   starting at step 3. Fetch upstream history and tags, then create the branch
   from the original repository's requested base. GitHub's branch-copy checkbox
   is not the step that fetches version tags.
4. Return to Desktop and confirm the current repository and branch.
   For mod code, continue with
   [Java and IDE setup](/GTNH-Dev-Doc/start-here/fork-clone-and-import/#select-java-and-import-the-mod).

GitHub maintains the
[cloning and forking reference](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)
for interface changes.

## Review and commit the change

Make one focused change and run the repository's checks. For a mod, use
[Build and run](/GTNH-Dev-Doc/start-here/build-and-run/) to set up and test
the environment.

In Desktop's **Changes** view, inspect every changed file and select the
intended files or hunks. Leave build output, run directories, test worlds,
IDE state, and private configuration out of the commit.

Enter a descriptive **Summary** in your own voice and commit to the
contribution branch. Check that the commit contains the intended
change, then choose **Publish branch**. For subsequent commits, use
**Push origin**.

## Open and revise the pull request

Use **Preview Pull Request** when available, then **Create Pull Request**.
On GitHub, confirm the original base repository and requested branch.
Fill out its template with the problem, result, dependencies, and test
evidence; use a draft for unfinished work.

Follow [Pull request expectations](/GTNH-Dev-Doc/contributing/pull-request-expectations/).
Make review revisions on the same branch, repeat the affected checks, and
commit and push them. Check the updated pull request's files and status.
