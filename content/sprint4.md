## Completed baseline: do not rebuild it

The 30 September handbook marks Sprint 3 complete and replaces the old future roadmap. Keep notifications/search, guided Tutor setup, staffing/ranking/bulk, budgets/reports/workload, timesheet revision/declaration/dispute/export, overflow, API receipts/hardening and Command Centre. Keep the unified Tutor calendar, fortnightly recurrence, terms/import exceptions, sickness attendance and Master Organiser approval.

The current source still lacks the new Student timetable/booking/sick-note workflow and the Advanced scenario/swap/audit/proposal features. Inspect actual main before beginning each card; if later merged work has already solved part of a card, narrow it to the remaining gap.

## Chronological Member plan

| Member / branch | Three assigned cards | Acceptance emphasis |
| --- | --- | --- |
| M1 `s4/m1/completion` | Shared TimeSlot ownership + Student My Timetable; session/stale-target hardening; actionable notifications + palette recent/favourites | Preserve Tutor rows; reuse import/calendar; own-record access; safe expired/deleted targets; keyboard usable shortcuts |
| M2 `s4/m2/completion` | Draft scenarios/locks/Compare/Publish; optimistic concurrency/presence/scenario library; mutual availability + read-only booking-time panel | Drafts do not change live allocations; publish rechecks atomically; stale version conflicts; short-lived presence; privacy-safe bounded free times |
| M3 `s4/m3/completion` | Tutor swap request/replacement/Organiser decision; Student booking from mutual slot; booking cancellation/history/notifications | Recheck hard rules; save booking transactionally; both calendars agree; prevent double booking; preserve history |
| M4 `s4/m4/completion` | Student sick-note + Organiser decision; two-session race/conflict/notification polish; responsive/accessibility/table alternatives | Own booking only; one active request; advance release versus skipped history; no medical upload; legal concurrent outcomes; focus recovery |
| M5 `s4/m5/completion` | Shared audit timeline; allocation restore preview/restore as new change; audit filters/export + new API hardening | Audit successful changes only; redact secrets; restore rechecks current rules/version; bounded role-safe history; retry/concurrency tests |
| M6 `s4/m6/completion` | Whole-school proposal engine/presets; Why this Tutor?/Why not? cockpit; strategy comparison/impact lab | Deterministic draft output; preserve locks/hard constraints; include Student bookings as busy; metrics reconcile; never publish directly |

After **every** Member: hand over → Integration Lead review/test/merge → affected regression → next Member pulls main. All three cards stay on that Member's one sprint branch. Every card includes the supporting schema/API/UI it needs; no waiting for a later Member to make an earlier feature work.

## Advanced planning model

Scenarios isolate draft allocations from live `Allocation` records. Locks preserve Organiser-chosen assignments. Compare with Live explains added/removed/changed assignments and impact on shortages, workload and budget. Publish is explicit and rechecks rules against current data. Presence signals recent activity; it is not permission authority. Optimistic versions prevent silently overwriting newer work.

Tutor swaps have a requesting Tutor, a replacement Tutor's accept/decline and an Organiser's final decision. Creation does not immediately modify live allocation. Final approval rechecks eligibility/version and applies the change atomically, retaining history.

Audit/restore creates one cross-system timeline of successful changes. A restore previews differences and creates a new checked mutation and audit entry; it does not erase the old history. Proposal presets—Balanced, Strongest Match, Fair Workload and Budget Aware—change soft priorities only. They never override mark, clash, selected-week capacity or locks.

## Final demonstration path

1. Lecturer registers → Pending → Master approves → approved Organiser signs in; normal Organiser cannot access the queue.
2. Student adds/imports classes with shared recurrence/term rules.
3. Student selects a Tutor and sees private-label-free mutual times.
4. Book a mutual time; both calendars update; a competing booking is rejected.
5. Student sickness request → Organiser decision → visible status/attendance history.
6. Show existing Tutor sickness, overflow, reports, timesheets and Command Centre still working.
7. Create/compare scenarios, demonstrate locks/presence/stale conflicts, and complete a Tutor swap.
8. Generate and explain proposals, compare strategies, save a Scenario, Compare with Live, then Publish.
9. Inspect audit history and preview/perform a valid allocation restore as a new event.
10. Show actual approved release SHA, CI/coverage, migration evidence, `/health` and `/ready` plus clean-browser role smoke results.

This is the required end-state demonstration, not a claim that every step is already available in the 30 September archive. See [feature status](#features) and the [rubric evidence map](#milestone4).
