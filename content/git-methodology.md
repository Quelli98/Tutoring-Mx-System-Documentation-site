## Official source control and rationale

The team developed Tutor MX in **Gitea**, using `main` as the authoritative integrated branch. [The project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) record planned work and ownership; [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions) records CI runs (both may require Wits credentials). A separate GitHub mirror supports application deployment, and this documentation site is maintained in its own GitHub repository. We did **not** use a `develop` branch or treat the mirror as a second independent source of truth.

This procedure was chosen because six Members changed overlapping API routes, database schema, calendars and allocation rules. A common branch and review gate provided a reproducible basis for integration. Our process **changed during the semester**; the final chronological rule should not be retroactively described as having operated unchanged in every sprint.

## Git methodology and observed lessons — Sprint 1 through Sprint 4

| Sprint | Method as used by the group | Difficulty or improvement | Evidence and review significance |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Members worked on separate feature/issue branches from shared Gitea `main`, with review and Integration Lead handover. Work on UI, API, schema and Auth0 ran with significant overlap; implementation order was **not a strict Member 1–6 sequence**. | Parallel work helped establish prototypes quickly, but interfaces/ownership changed across branches, increasing handover and integration coordination. | [Sprint 1 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) · [Handbook pp. 13–20](documents/tutor-mx-handbook-30-september-2026.pdf#page=13). Historical branches in the handbook illustrate intended issue ownership, not a claim that every branch name is still available. |
| **Sprint 2 — Basic** | Again reviewed feature branches were integrated to `main`, but Member progress was not consistently sequenced. Basic features depended on changes to endpoints, roles and migrations being implemented in other branches. | The team encountered overlapping changes and inconsistent integrated behaviour; post-sprint production stabilisation was required. Concrete examples include an omitted `clashDetails` response field, allocation refreshing as a clash with itself, confusing availability ownership, and a failing Organiser integration reverted rather than released. | [Sprint 2 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39) · [Handbook p. 29](documents/tutor-mx-handbook-30-september-2026.pdf#page=29) · [Bug history](#bug-tracker). |
| **Sprint 3 — Intermediate** | Changed to **chronological integration**: one branch per Member containing that Member's sprint cards. Member 1 finished and handed over; the Lead reviewed/tested/merged to `main`; only then did Member 2 branch from updated `main`, continuing through Member 6. | This gave each Member an approved dependency baseline and reduced conflicting simultaneous edits. The trade-off was waiting for a previous review/merge, so handovers and readiness checks became important. | [Sprint 3 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) · [Handbook pp. 31–38 of 18 Sep edition, preserved in source history](#work-tracker). |
| **Sprint 4 — Advanced** | Reused the chronological one-branch-per-Member method, `s4/m1/completion` through `s4/m6/completion`. The Lead integrated after each Member, with final combined checks and release after Member 6. | The no-forward-dependency rule kept new Student timetable, booking, sickness and advanced-planning features individually complete at handover rather than leaving incomplete work for later Members. | [Sprint 4 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) · [Handbook pp. 34–41](documents/tutor-mx-handbook-30-september-2026.pdf#page=34). |

### Why we changed to chronological integration

During Sprints 1 and 2, overlapping branches frequently depended on the same route contracts and schema changes. A Member could finish a screen against an API snapshot while another Member was changing the API or database. That created late merge conflicts, mismatched frontend/backend expectations and extra work stabilising the combined application. The group discussed these issues and adopted a **single sequential integration queue** for Sprints 3 and 4. Once the Integration Lead approved a handover, the next Member built from that exact merged main state. This made integration easier to review and regressions easier to attribute, although it reduced parallelism. The method is a deliberate adaptation, not a claim that the first two sprints were chronologically integrated.

## Role selection and allocation of Member responsibilities

At sprint planning, the group reviewed the handbook's six Member responsibility areas, discussed each Member's preferred roles and voted on the allocation. The resulting role determined which Gitea issue cards, user stories, acceptance checks and handover responsibilities a Member owned. The **Integration Lead** was a separate integration responsibility, not an additional feature card or permission for Members to merge their own work. [Team process](#process) · [Work tracker](#work-tracker).

## Branch, review and merge flow

| Stage | Member responsibility | Reviewer / Integration Lead responsibility |
| --- | --- | --- |
| Start | Pull approved Gitea `main`, create or switch to the Member sprint branch. | Confirm prerequisites are merged and branch scope matches the handbook. |
| Implement | Complete that Member's **three sprint cards** and any small supporting route, migration or UI change needed for them. | Remain available for contract/requirement clarification. |
| Verify | Run issue acceptance checks, role/permission cases, local build/test and relevant coverage; inspect the changed files. | Review changed code, reproduce acceptance tests and check completed Gitea Actions results. |
| Handover | Push branch; provide issue IDs, commands and results, known limitations, relevant screenshots and AI attribution. | Resolve conflicts with author, integrate into `main`, rerun affected combined regression. |
| Advance | Next Member pulls the **new** `main` only after Lead approval. | Confirm main CI and tell the next Member that the baseline is ready. |
| Release | No Member releases production directly from their normal feature branch. | Validate full combined main, mirror approved code and release to hosting. |

The handbook allows carefully reviewed Integration Lead repository-maintenance changes through the Lead's integration workflow; this exception does not turn `main` into a normal feature-development branch.

## Sprint 3–4 chronological sequence

`M1 branch → local checks → Gitea push/CI → Lead review → main merge/regression → M2 pulls new main → … → M6 → final release gate.` Each Member has **one sprint branch**, not three branches for the three cards. The next Member does not branch from the previous Member's feature branch.

```powershell
# Example: a Member starts only after the previous approved merge.
git switch main
git pull origin main
git switch -c s4/m3/completion
# Implement all Member 3 sprint cards and run the project gate.
npm run check
npm run coverage
git diff --check
# Stage intended files only, commit and push the Member branch.
git push -u origin s4/m3/completion
```

The actual issue/PR/commit identifiers, review discussions and final integration order must be verified in the real Gitea history. Documentation of the procedure does not by itself establish that every review was conducted. [Gitea project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) · [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions).

## CI and acceptance gate

Local `npm run check` includes Prisma generation, lint, TypeScript checks, tests, builds and a repository security check; `npm run coverage` produces code-coverage reports. After push, Gitea Actions runs on lecturer-managed shared runners. **Queued** means waiting for capacity, not a passing or failing test. The reviewer should retain completed logs and Codecov output for the relevant commit. If tests fail, investigate and rerun; if runners are unavailable, document the external blocker and local evidence without claiming a green remote run. [Testing and performance](#testing).

## What this demonstrates against the rubrics

Sprint 1 assesses whether Git was **used**, not just named. Milestone 4 assesses how well the **chosen method** was followed. The four-sprint history, board links, role assignment process, merge protocol, CI process and retrospective change are therefore presented together. The principal lesson is that the team adapted its methodology when parallel development created avoidable integration effort—while retaining branch isolation, review, explicit handovers and an authoritative `main` throughout.
