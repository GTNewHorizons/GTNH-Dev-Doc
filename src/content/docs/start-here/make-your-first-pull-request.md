---
title: Make your first pull request
description: Make one tested change, review the commit, and submit it to the owning GTNH repository.
---

A pull request asks the project to take a change from your fork. Keep your
first one to a single change you can explain and test.

Before you start, make sure you've
[chosen the right repository and read its rules](/GTNH-Dev-Doc/start-here/choose-a-repository/).
For mod code, also have a [working development environment](/GTNH-Dev-Doc/start-here/build-and-run/).

Run the commands on this page from the repository folder. Using GitHub
Desktop instead? [Contribute with GitHub Desktop](/GTNH-Dev-Doc/contributing/contribute-with-github-desktop/)
covers the same steps.

## Create a branch and make the change

If you already created a branch in
[Set up your workspace](/GTNH-Dev-Doc/start-here/set-up-your-workspace/#fork-and-clone),
use it. Otherwise, fetch the latest code and create one. Replace `BASE-BRANCH`
with the branch the repository asks you to target, and `describe-your-change`
with a short name for your work:

```sh
git fetch upstream --tags
git switch -c describe-your-change upstream/BASE-BRANCH
```

Keep the change focused on one problem. For a bug fix:

1. Reproduce the bug first, and keep that setup.
2. Make your change.
3. Repeat the same steps and compare the result.

If an automated test could catch the bug coming back, add one.

Run the repository's build and checks, then try the changed behavior in game.
[Testing expectations](/GTNH-Dev-Doc/testing/testing-expectations/) helps you
decide whether you also need a dedicated server, a save-and-reload test, or
the full pack. For visual changes, take before-and-after screenshots from the
same view.

## Review and commit

See what you've changed:

```sh
git status --short
git diff
```

`git status` lists every changed or new file; `git diff` shows the changes
inside files Git already tracks, but not new files. Check both. Leave build
output, run folders, test worlds, IDE files, and anything secret out of your
commit. If a formatter ran, make sure it didn't change unrelated code.

*Stage* the files you want to commit. Replace `path/to/changed-file` with a
file you've reviewed, and add more paths as needed. Then check exactly what
will be committed:

```sh
git add -- path/to/changed-file
git diff --cached
```

When the staged diff shows only your intended change, commit and push it.
Write the commit message yourself, describing what the change does, and use
your own branch name in the push command:

```sh
git commit -m "Describe the change"
git push -u origin describe-your-change
```

## Open the pull request

On GitHub, open a pull request from the branch on your fork to the original
repository. Before you submit, check that the base repository and target
branch are right.
[GitHub's guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
shows where to click.

Fill out the repository's pull request template. In the description:

- Explain the problem and what your change does about it.
- Link the issue, any earlier discussion, and pull requests yours depends on.
- Say how you tested it, with which versions, and what you couldn't test.

[Pull request expectations](/GTNH-Dev-Doc/contributing/pull-request-expectations/)
explains what reviewers look for. If the work isn't finished or you want early
feedback, open it as a *draft* pull request.

After opening it, check that the pull request shows only your files and
commits. Automated checks run on it; if they fail on GitHub but pass on your
computer, see [CI problems](/GTNH-Dev-Doc/troubleshooting/ci-problems/).

To find your pull request again later, see
[Find and follow your pull request](/GTNH-Dev-Doc/contributing/contribute-with-github-desktop/#find-and-follow-your-pull-request).

## Respond to review

Reviewers may ask for changes. Make them on the same branch, rerun the
affected checks, then commit and push. The pull request updates on its own;
you don't need to open a new one. If feedback is unclear, ask. When you've
addressed everything, reply to say what changed and request another review.
