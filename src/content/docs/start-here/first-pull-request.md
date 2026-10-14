---
title: Make your first pull request
description: Make one tested change, review the commit, and submit it to the owning GTNH repository.
---

Submit one change that you can explain and verify. Before editing, confirm
[the owning repository and contribution requirements](/GTNH-Dev-Doc/start-here/choose-a-repository/).
For mod code, start from a [working development environment](/GTNH-Dev-Doc/start-here/build-and-run/).

These steps use command-line Git from the cloned repository root. For the
same process in a graphical client, use
[GitHub Desktop](/GTNH-Dev-Doc/how-to/use-github-desktop/).

## Create a branch and make the change

If you already have a contribution branch, use it. Otherwise, start from a
clean working tree, fetch the target branch, and create a branch from it.
Replace `BASE-BRANCH` with the branch requested by the repository, and
`describe-your-change` with a short name for your work:

```sh
git fetch upstream --tags
git switch -c describe-your-change upstream/BASE-BRANCH
```

Keep the change focused on the problem you chose. For a bug fix, reproduce
the failure first and keep that setup as the test case. After the edit, repeat
the same action and compare the result. Include a focused automated test
when it can catch the regression in future changes.

Run the repository's relevant build and validation commands, then exercise
the changed behavior. Use
[Testing expectations](/GTNH-Dev-Doc/contributing/testing-expectations/)
to select dedicated-server, save/reload, or full-pack checks. Capture comparable
before-and-after screenshots for visual changes.

## Review and commit

Inspect the working tree before staging:

```sh
git status --short
git diff
```

Check every changed file, including new files that `git diff` does not show.
Keep build output, run directories, test worlds, IDE state, and secrets out of
the commit. Review formatter changes for unrelated edits too.

Replace `path/to/changed-file` with a reviewed file. Add further paths when
needed, then inspect exactly what the commit will contain:

```sh
git add -- path/to/changed-file
git diff --cached
```

Once the staged diff contains only the intended change, commit it. Replace the
message below with a description of your change in your own voice, and use
your branch name in the push command:

```sh
git commit -m "Describe the change"
git push -u origin describe-your-change
```

## Open the pull request

On GitHub, open a pull request from your fork's contribution branch to the
original repository. Check the base repository and target branch before
submitting. GitHub's
[fork pull request guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
covers the interface.

Fill out the repository's template and follow
[Pull request expectations](/GTNH-Dev-Doc/contributing/pull-request-expectations/).
Explain the problem, resulting behavior, and test results. Link the issue,
prior discussion, and any dependent pull requests. Include the relevant
environments and versions, and say which important cases you couldn't test.
Use a draft pull request for unfinished work or early feedback.

Confirm that the pull request shows your intended files and commits. Watch the
checks for that revision; if a local build and GitHub Actions disagree, follow
[CI problems](/GTNH-Dev-Doc/troubleshooting/ci/).

## Respond to review

Make requested revisions on the same branch, rerun the affected checks, and
commit and push the updates. Ask for clarification when feedback is unclear.
Describe what changed and re-request review when the feedback is addressed.
A new pull request is not needed for each revision.
