---
title: Repair Maven repository metadata
description: Confirm metadata corruption, limit the Nexus repair scope, and verify resolution afterward.
---

Use this recovery procedure only if you have Nexus administration access,
have confirmed metadata corruption, and know the exact hosted-repository path.
A missing artifact, wrong coordinate, or client cache problem needs a different
correction.

Sonatype's [task reference](https://help.sonatype.com/en/tasks.html#types-of-tasks)
documents **Repair - Rebuild Maven repository metadata (maven-metadata.xml)**.
It is a manual repair, not routine scheduled maintenance.

## Establish the affected scope

Fetch the damaged `maven-metadata.xml` and compare its version entries with
the published artifacts and affected consumer's request. Record the hosted
repository, group, artifact, and any relevant base version.

Inspect an existing repair task before reusing it. Its name doesn't tell you
what it will repair, so check the repository and filters. Check the current
GTNH tasks in Nexus rather than relying on a list of names in documentation.

## Configure and run the repair

In Nexus **Settings → Tasks**, reuse a correctly scoped task or create one
of the documented metadata-repair type. Select the affected hosted repository
and the narrowest scope that repairs the damaged metadata.

The [task descriptor](https://github.com/sonatype/nexus-public/blob/main/public/common/components/formats/nexus-repository-maven/src/main/java/org/sonatype/nexus/repository/maven/tasks/RebuildMaven2MetadataTaskDescriptor.java)
defines the filters and their dependencies:

| Setting | Scope consideration |
| --- | --- |
| Repository | Select the affected hosted repository rather than all repositories. |
| GroupId | Limits the repair to that group. |
| ArtifactId | Narrows the group; it is used only when GroupId is set. |
| Base Version | Narrows the artifact; it requires both preceding filters. |
| Cascade rebuild | Controls rebuilding nested components; omitted filters can broaden the operation. |
| Rebuild checksums | A separate optional action that can increase the work required. |

Check these controls against the installed Nexus version. For an artifact's
version-list metadata, the intended scope can include all its versions; do not
choose a base-version filter that excludes the damaged metadata.

Set the schedule to **Manual**, save, and review the complete scope before
running once. Follow its task log to completion. If the available fields
can't limit the task to the intended scope, resolve that with the repository
administrator before running a broader task.

## Verify recovery

Fetch the same metadata again and confirm the intended version entries and
checksums. Repeat the affected consumer's resolution check against the
repaired repository, refreshing its cache if necessary.

Record the task, scope, and result. If corruption recurs, investigate the
publishing or storage cause. Scheduling repeated rebuilds hides that failure.
