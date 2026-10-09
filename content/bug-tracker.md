## Defect management throughout Sprints 1–4

Defects and regressions are managed using the **same Gitea issue tracker** as feature work, with CI failures and acceptance testing used as additional discovery channels. [Project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) record issue state and ownership; [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) records automated build/test outcomes. These are different evidence sources: a completed card records workflow status, whereas a completed CI run shows the tests executed for a particular commit.

The Sprint 2 and final rubric evaluate whether a bug tracker is **actively used**, not just described. Our approach connects reproduction, severity, owner, change, review, regression and release impact. A screenshot of the board does not establish zero remaining defects, and a failed CI job should not be labelled a product bug until the failure is diagnosed.

## Examples of issues and regressions across all sprints

| Stage | Recorded problem area | Corrective action / lesson | Retest to preserve |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Early role-route/identity and prototype-to-API contract risks during parallel UI, auth and API setup. | Establish automatic onboarding, protected role routes, own-Tutor data and shared error contracts. These are handbook acceptance categories; individual resolved bug IDs were not independently supplied. | Fresh and returning sign-in, unverified email, wrong-role route, Tutor own-data tests. |
| **Sprint 2 — Basic** | Organiser integration failure during 15 September stability pass. | Failing change was **reverted rather than shipped**; retest course deletion, timetable/candidate response and timesheet state. | Combined organiser flow after reverted merge. |
| **Sprint 2 → 3 stabilisation** | `clashDetails` returned by data query but omitted by response mapper. | Map the missing field so the candidate frontend receives the expected contract. | Valid and conflicting candidate responses, optional recurrence fields. |
| **Sprint 2 → 3 stabilisation** | A just-saved allocation displayed as conflicting with itself. | Pass `excludeAllocationId` when refreshing saved allocation candidates; continue blocking genuine overlaps. | Create/edit followed by immediate refresh and independent competing clash. |
| **Sprint 2 → 3 stabilisation** | Marks and calendar failed together due to coupled UI loading; Tutor capacity ownership was unclear. | Independent fetches; Tutor-owned unavailable time/capacity and Organiser read-only view. | Missing timetable still shows valid marks; cross-role ownership remains protected. |
| **Sprint 3 — Intermediate** | Greater risk from import duplicates, reminder retries, concurrent bulk writes and timesheet correction states. | Added scoped API permission, transaction, idempotency and race protections under Sprint 3 Member 5; actual failed test/issue references must be checked in the board. | Retry same payload, duplicate import, stale decision and state-transition tests. |
| **Sprint 4 — Advanced** | Stale scenarios, competing bookings, swap decisions, stale search links and sick-note approvals become cross-user integrity risks. | Version/conflict rechecks, server-side availability validation, audit/restore and role-based ownership. A regression matrix is retained with final test evidence. | Two-browser booking race, stale version, scenario publish, audit rollback and booking/sick-note history. |

The explicitly dated corrections above are from the handbook's post-Sprint 2 stabilisation record (p. 29). Sprint 1 and later Sprint 3/4 rows identify documented risk/test areas where unique Gitea defect IDs were not provided; they must **not** be counted as individual closed defect records.

## Reproducible bug record and workflow

| Field in Gitea issue | Information retained | Value to the process |
| --- | --- | --- |
| Identification | Issue title/ID, discoverer, date, sprint and affected role | Repeated reports can be linked to one defect. |
| Reproduction | Starting account and permissions, environment, ordered steps, expected vs actual result | Allows a reviewer to reproduce the fault rather than guessing. |
| Severity | Critical security/data loss; major blocked core journey; moderate workaround; minor cosmetic | Helps decide whether integration/release is blocked. |
| Root cause and fix | Focused branch, PR/review, relevant test, commit SHA | Associates the resolution with actual source. |
| Regression | Automated or manual retest outcome on *integrated main*, plus completed Actions/Codecov links | Prevents a branch-only fix from being mistaken for a released fix. |

**Decision flow:** discover → record and reproduce → prioritise → assign owner → fix on an appropriate branch → reviewer retests → Integration Lead merges → combined regression and CI → close with evidence. Critical security/data-integrity or major blocking defects stop release pending resolution or a formally recorded decision. A CI runner queued for another group is **not** a failed test; completion status is checked before reporting results.

## Quality evidence and known limits

- [Original issues and project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) — operational source; login may be needed.
- [Gitea Actions workflow history](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) — per-commit CI outcomes, separate from bug issues.
- [Testing and performance](#testing) — measured results and changed-feature regression matrix.
- [Git methodology](#git-methodology) — review/merge order, including the Sprint 1–2 retrospective.

A complete current unresolved-bug total cannot be asserted without a timestamped issue export. This document supplies the tracking method and documented examples; it does not invent issue numbers, fixes or zero-defect statistics.
