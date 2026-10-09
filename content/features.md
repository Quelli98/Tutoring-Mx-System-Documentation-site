## What Tutor MX does — the complete product

The School of Computer Science and Applied Mathematics needs to assign qualified Tutors to courses while respecting **marks, timetable clashes and weekly capacity**. Tutor MX provides a single workflow for Organisers to plan work and approve decisions, Tutors to manage schedules and working hours, and Students to volunteer for overflow work and arrange tutoring. Administrative work such as timesheet reviews, sickness, notifications, reporting and change tracking stays connected to the same data and role permissions.

The final system was developed across **all four sprints**: Sprint 1 established secure foundations; Sprint 2 completed core allocation and approvals; Sprint 3 improved scheduling, reporting, automation and usability; Sprint 4 brought shared Student bookings and Advanced collaborative, explainable planning. Explore this progression in the [four-sprint roadmap](#roadmap) without having to read out-of-date implementation notes.

## Final feature register

The site preserves earlier Sprint 1–3 history, but the status below follows the supplied **final Sprint 4 main at `361954e`**. “Implemented” means the feature exists in the supplied source. Production screenshots/role demonstrations remain a separate evidence question.

| Feature area | Final source status | Demonstration / evidence |
| --- | --- | --- |
| Auth0 Student/Tutor onboarding, reset/delete, profile guards | Implemented | Separate accounts, valid/invalid sessions and own-role workspace |
| Master Organiser lecturer approval | Implemented | Pending registration, protected queue, approve/reject and approved sign-in |
| Organiser courses/Tutors/marks and allocations | Implemented | Persisted writes plus mark/clash/capacity results |
| Tutor manual/import timetable | Implemented | Same calendar; Once/Weekly/Fortnightly; terms, breaks and exceptions |
| Tutor sickness attendance | Implemented | Excuse decision, Excused/Skipped history, blocked sick work logs |
| Timesheet correction/declaration/dispute/export | Implemented | Returned/corrected/resubmitted flow and approved export rules |
| Student overflow/volunteer/withdraw | Implemented | Own eligible work, stored outcomes, safe withdrawal/conflict |
| Notifications/search, staffing/ranking/bulk/reports, Command Centre | Implemented | Existing Sprint 3 workflows retained through Sprint 4 |
| Student timetable via generalised TimeSlot | **Implemented in Sprint 4 M1** | Shared own-schedule model/routes/UI; no second timetable engine |
| Mutual Student/Tutor availability | **Implemented in Sprint 4 M2** | Backend intersection, bounded future results, private labels hidden |
| Student bookings | **Implemented in Sprint 4 M3** | Transactional confirmation, both calendars, cancellation/history and clash blocking |
| Student sick notes | **Implemented in Sprint 4 M4** | Own booking → Pending → Organiser decision → preserved attendance/history |
| Scenarios/locks/presence/concurrency | **Implemented in Sprint 4 M2** | Isolated drafts, Compare with Live, version conflicts, explicit Publish |
| Tutor swaps | **Implemented in Sprint 4 M3** | Replacement response and final Organiser rule recheck |
| Shared audit/restore | **Implemented in Sprint 4 M5** | Redacted committed-change timeline, filters/export and checked restore |
| Whole-school proposals/strategy comparison | **Implemented in Sprint 4 M6** | Deterministic eligible draft, explanations, four presets and comparable impact metrics |

## Technical growth and final-source verification

The 30 September audited baseline contained 82 registered operations, 20 models and 25 migrations. The completed Sprint 4 source contains **120 operations, 30 models and 30 migrations**. The ten added models are `Scenario`, `ScenarioItem`, `ScenarioPresence`, `TutoringBooking`, `TutorSwap`, `BookingEvent`, `SwapEvent`, `StudentSickNote`, `AuditEvent` and `MutationReceipt`.

The five Sprint 4 migrations are:

- `20261007000000_shared_profile_schedule`
- `20261008000000_s4_scenario_planning`
- `20261009000000_s4_swaps_bookings`
- `20261010000000_s4_student_sick_notes`
- `20261011000000_s4_audit_restore`

The API catalogue, Prisma dictionary and source downloads on this site now follow the final supplied repository rather than presenting the Sprint 4 cards as future targets.
