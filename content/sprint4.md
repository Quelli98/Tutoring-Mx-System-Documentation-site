## Final status — Sprint 4 is complete on main

Sprint 4 is no longer a future plan. The supplied final repository shows the complete Member 1 → Member 6 sequence merged into `main`, ending at release commit **`361954e`** (`361954ec510c624c5f2a0f3d0940c2f7cb769d2e`) on 7 October 2026. The implementation follows the 30 September handbook's sequential handoff rule: each Member builds on the already-integrated work before them, and the advanced planning layer is added last.

The 30 September handbook remains the design/acceptance baseline. Pages 34–41 define the Member order and final release behaviour, while the final code and release evidence below show what was actually delivered.

## Completed Member 1–6 delivery

| Member | Final Sprint 4 result | Main merge evidence |
| --- | --- | --- |
| M1 | Shared Profile-owned `TimeSlot`; Student **My timetable**; manual/CSV/ICS entry; Once/Weekly/Fortnightly; term/exception reuse; session/stale-target hardening; actionable notifications and recent/favourites | `02887af` merged the updated Member 1 work |
| M2 | Draft Scenarios, locks, Compare with Live, Publish, optimistic version conflicts, Organiser presence/library, Student/Tutor mutual availability | `62c2fb6` merged Member 2 |
| M3 | Tutor swap request/response/Organiser decision; transactional Student tutoring bookings; both calendars; cancellation/history/notifications | `5e9680c` merged Member 3 |
| M4 | Student sick-note request + Organiser decision; Excused/Skipped attendance behaviour; race/conflict and notification polish; compact/list accessibility alternatives | `83f3289` merged Member 4 |
| M5 | Cross-system audit timeline; allocation history/restore preview and checked restore; audit filters/export; new Student mutation hardening | `d920879` merged Member 5 |
| M6 | Whole-school deterministic proposal engine; Balanced/Strongest Match/Fair Workload/Budget Aware presets; Why this Tutor?/Why not? cockpit; strategy impact comparison and Scenario handoff | final reviewed fixes merged at `361954e` |

### Member 6 reviewed completion

The final proposal engine reuses the existing hard rules instead of inventing a second allocator. Mark, clash and selected-week capacity remain mandatory. Confirmed Student tutoring bookings count as Tutor busy time. Existing Scenario items and locks are preserved, partial existing requirement coverage is handled correctly, and removed/changed live assignments are evaluated against the draft rather than lingering as false blockers.

The proposal cockpit explains both chosen and skipped Tutors. A suggested Tutor shows hard-rule state, soft score and factors; skipped Tutors distinguish a hard failure from a lower soft score. A manual replacement is allowed only when the replacement remains eligible and the Organiser supplies a reason. Proposal metadata records the chosen preset and the exact engine-generated Scenario item IDs.

Strategy comparison runs the four presets against the same planning window and starting Draft/locks. Side-by-side results include new assignments, total draft allocated hours, shortage hours, projected cost and workload. Choosing a result saves a normal **DRAFT Scenario**. It never publishes directly to live `Allocation` rows.

## Student scheduling — implemented end to end

The final schema generalises the existing schedule owner rather than creating a second Student timetable system. Student and Tutor schedules use the same `TimeSlot`, recurrence, term, exception, import and weekly-calendar infrastructure.

The full path is now:

1. Student records Class/Unavailable time manually or through CSV/ICS import.
2. The backend intersects Student and Tutor busy intervals and returns privacy-safe shared free times.
3. Student books one of those times; the server rechecks availability transactionally.
4. The confirmed `TutoringBooking` appears on both calendars and blocks later clashes.
5. Student or Tutor can cancel an allowed future booking without deleting history.
6. Student can submit a sick note against their own eligible booking; an Organiser approves/rejects it and the timetable keeps the attendance history.

Private timetable labels are not exposed merely because two people are checking mutual availability. Tutoring bookings remain scheduling records; they do not replace Organiser `Allocation` or Tutor payroll.

## Advanced planning — implemented end to end

Scenarios isolate draft allocation plans from live staffing. Locks preserve deliberate Organiser choices. Optimistic versions prevent silent overwrite, while short-lived Organiser presence is collaboration information rather than permission authority. Publish remains explicit and rechecks current hard rules.

Tutor swaps retain request/accept/decline/approve/reject/cancel history and recheck eligibility before changing the live assignment. Audit events record important successful committed mutations with redacted before/after details. Allocation restore creates a **new** checked mutation and audit event rather than erasing history.

The final Organiser planning path is:

**Generate Proposal → Why these Tutors? → Save as Scenario → Compare with Live → Publish**

## Final release evidence supplied on 7 October

The final source of truth in the supplied repository is `main` at **`361954e`**. The Render dashboard screenshot shows the `tutor-mx-api` web service **Live** on that commit. The Codecov screenshots show the same latest commit and these source-root coverage values:

| Coverage root | Tracked lines | Covered | Partial | Missed | Coverage |
| --- | ---: | ---: | ---: | ---: | ---: |
| `frontend/src` | 5,650 | 4,574 | 474 | 602 | **80.96%** |
| backend `src` | 4,683 | 3,994 | 352 | 337 | **85.29%** |
| Combined tracked roots | 10,333 | 8,568 covered | 826 partial | 939 missed | **82.92% covered lines** |

![Final Render deployment on commit 361954e](evidence/sprint4-render-final-2026-10-07.png)

![Final Codecov overview on commit 361954e](evidence/sprint4-codecov-overview-final-2026-10-07.png)

![Final frontend coverage detail](evidence/sprint4-codecov-frontend-final-2026-10-07.png)

![Final backend coverage detail](evidence/sprint4-codecov-backend-final-2026-10-07.png)

### Gitea Actions handover evidence

The supplied Actions screenshot shows **ci.yml #115** green for reviewed Member 6 branch commit **`2f62311`** (`fix: complete reviewed Sprint 4 Member 6`). The final merge commit `361954e` has `2f62311` as a parent, so this is direct evidence that the reviewed branch passed remote CI before integration. The same screenshot also preserves earlier red Member 6 merge attempts, which were fixed rather than hidden. A separate green Actions screenshot for the merge commit `361954e` itself was not supplied, so the site does not claim one.

<figure class="doc-evidence"><a href="evidence/sprint4-gitea-actions-reviewed-member6-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-gitea-actions-reviewed-member6-2026-10-07.png" alt="Gitea Actions list with green reviewed Member 6 CI run and earlier failed Member 6 attempts"></a><figcaption><strong>Reviewed Member 6 CI before final merge.</strong> The green run is commit 2f62311; final main 361954e merges that reviewed commit.</figcaption></figure>

The stable production endpoints remain **https://tutor-mx.pages.dev** for the frontend and **https://tutor-mx-api.onrender.com** for the backend. The final manual Cloudflare deployment performed from the approved frontend build produced deployment URL **https://06d22424.tutor-mx.pages.dev**; the stable project URL should be used for demonstrations.

## Final Sprint 4 source footprint

The final supplied source now contains **120 registered HTTP operations, 30 Prisma application models, 14 enums, 30 migration directories, 52 backend test files and 77 frontend test files**. The technical reference pages and downloadable route/schema inventories are updated to this final source.

See [Feature register](#features), [Student scheduling](#student-scheduling), [API](#api), [Database](#database), [Testing](#testing) and [Deployment](#deployment) for the final Sprint 4 state.
