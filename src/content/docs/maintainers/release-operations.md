---
title: Release operations
description: Determine who creates the tag, select its commit, and verify each publication destination.
---

Pushing a version tag can publish mod jars consumed by other mods and pack
assembly. Use this procedure only for an authorized release of the target
repository. Confirm its release process and intended commit before creating
a tag.

## Determine whether automation owns this release

Some mods use MergeMasterXXL coordinated tagging. Inspect recent tags,
releases, and Actions runs, then confirm with the release coordinator whether
automation is expected to handle the target commit.

The [tagging implementation](https://github.com/GTNewHorizons/MergeMasterXXL/blob/master/src/tag_dev.ts)
orders inter-repository dependencies and handles development tags.
Its [tag helper](https://github.com/GTNewHorizons/MergeMasterXXL/blob/master/src/requests/tags.ts)
increments the last numeric part of the existing format. Those sources
describe how tagging works. They don't tell you the production schedule or
every current exception.

The repository's `.github/workflows/release-tags.yml` describes what happens
after a tag is pushed. It does not decide who should create the tag.

## Verify the target and name

Run these commands from the mod checkout. This example assumes `origin`
is the authorized release repository; inspect its URL first. Replace
`TARGET-COMMIT` with the exact commit and `TAG` with the chosen version name.

```sh
git remote -v
git fetch origin --tags
git show --no-patch --oneline TARGET-COMMIT
git tag --points-at TARGET-COMMIT
git tag --list TAG
```

Confirm the commit contains the intended changes and required checks have
passed. Existing tags on that commit may mean publication already occurred.
The proposed new name should not be in use.

Follow the repository's tag pattern and coordinated dependency order.
Use `-pre` only where its process calls for it. In the
[shared release workflow](https://github.com/GTNewHorizons/GTNH-Actions-Workflows/blob/master/.github/workflows/release-tags.yml),
tags ending in `-pre` are withheld from Modrinth and CurseForge but ordinarily
remain public GitHub releases without GitHub's prerelease flag for pack
assembly compatibility.

## Create and push the authorized tag

Once the repository's release checks have passed and you have authorization:

```sh
git tag TAG TARGET-COMMIT
git push --dry-run origin refs/tags/TAG
git push origin refs/tags/TAG
```

The first command creates a local tag. The dry run reports the proposed remote
update; the final command publishes it. If the dry run identifies an
unexpected destination or existing tag, resolve that before the push.
Do not force-move a published tag.

## Verify publication separately

Follow the tag's **Release tagged build** run, or the owning repository's
equivalent. Check the GitHub release assets and each required Maven or other
destination for the exact version.

The shared workflow allows several publication steps to continue on error.
Even if the job completes, some destinations may not have received the
artifact. Inspect the relevant steps and files.

Before retrying a partial release, coordinate the repair. The shared workflow
can delete and recreate an existing GitHub release during a rerun.
Finally, confirm the intended version in the relevant pack manifest before
expecting it in an [assembled build](/GTNH-Dev-Doc/concepts/release-pipeline/).
