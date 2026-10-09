## Product scope: one system, four sprints

Tutor MX helps the Wits School of Computer Science and Applied Mathematics allocate suitable Tutors to courses while enforcing **marks, timetable compatibility and weekly work capacity**. It joins the Organiser's allocation board, the Tutor's working calendar and timesheets, and the Student's volunteering and tutoring-booking journeys through one separately hosted API and relational database.

This is a **complete feature register**, not a Sprint 4 task list. **Introduced in** identifies the sprint in which the handbook first places the capability. Later improvements are shown explicitly; some features evolved in more than one sprint. “In final source” means the capability is represented in the supplied 7 October application code; it is **not** a claim of independent production acceptance testing.

**Go to:** [Sprint 1 roadmap](#sprint1) · [Sprint 2 roadmap](#sprint2) · [Sprint 3 roadmap](#sprint3) · [Sprint 4 roadmap](#sprint4-roadmap) · [All four sprint work boards](#work-tracker).

## Full feature register — authentication, accounts and shared platform

| Feature or user journey | Introduced in | How it evolved through Sprint 4 | Final source / evidence |
| --- | --- | --- | --- |
| Auth0 self-service Student and Tutor registration | **Sprint 1** | Sprint 2 hardened verification and account recovery; Sprint 4 hardened session expiry and stale targets. | `Landing.jsx`, `onboarding.js`, `auth/` |
| Role-specific workspaces and protected navigation | **Sprint 1** | Sprint 2 expanded role/ownership regression; Sprint 3 improved search/navigation; Sprint 4 protects deep links and recent/favourite destinations. | `RoleRouter.jsx`, `ProtectedRoute.jsx` |
| Password reset, account deletion and sign-out | **Sprint 1** | Sprint 2 strengthened error and failure recovery; Sprint 4 reviewed production session behaviour. | `AccountSettings.jsx`, `PasswordReset.jsx`, auth routes |
| Handwritten Express HTTP API and health endpoint | **Sprint 1** | Sprint 2 added end-to-end writes; Sprint 3 expanded services and hardening; Sprint 4 added collaborative planning, booking, audit and proposals. | `src/app.ts`, `src/server.ts`, [API catalogue](#api) |
| Prisma schema, Neon PostgreSQL and migrations | **Sprint 1** | Models and constraints expanded every sprint; final source has 30 application models. | `prisma/schema.prisma`, [database dictionary](#database) |
| Gitea issue tracking, feature branches and CI | **Sprint 1** | Sprint 2 exposed integration problems; Sprint 3–4 adopted chronological integration and one branch per Member each sprint. | [Work tracker](#work-tracker), [Git methodology](#git-methodology) |
| Public frontend and backend deployment | **Sprint 1** | Repeated release smoke checks and regression across Sprints 2–4. | Cloudflare Pages, Render, [deployment record](#deployment) |
| Public-holiday external API research and fallback | **Sprint 1** | Sprint 2 exposed the production adapter and safe fallback; maintained subsequently. | `src/integrations/public-holidays.ts` |
| Lecturer Organiser approval by Master Organiser | **Sprint 3** (late stabilisation) | Replaced open Organiser self-onboarding before Sprint 4; preserved and hardened through the final release. Master is an Auth0 privilege, not a fourth workspace. | `OrganiserApplication`, `MasterOrganiserApplications.jsx` |

## Full feature register — Organiser and allocation management

| Feature or user journey | Introduced in | How it evolved through Sprint 4 | Final source / evidence |
| --- | --- | --- | --- |
| Organiser workspace, course and registered-Tutor management | **Sprint 1** | Sprint 2 completed and hardened live CRUD and refresh behaviour; Sprint 3 expanded reporting; Sprint 4 integrated planning. | `OrganiserDashboard.jsx`, `CourseManagement.jsx`, `TutorManagement.jsx` |
| Tutor marks, timetable-clash and weekly-capacity eligibility | **Sprint 1** | Sprint 2 enforced checks on saved allocations; Sprint 3 improved ranking and shortage explanations; Sprint 4 reused the same rules for swaps and proposals. | Allocation-rule services, `allocation-queries.ts` |
| Persistent allocation create/edit/remove | **Sprint 2** | Replaced Sprint 1 save placeholder; later extended with bulk, scenarios, version conflicts and restore. | Allocation routes, `BulkAllocation.jsx` |
| Organiser timesheet and volunteer approval queues | **Sprint 2** | Sprint 3 expanded correction/dispute/overflow operations; Sprint 4 reused the approval pattern for Student sickness. | `OrganiserApprovals.jsx` |
| Staffing requirements and shortage tracking | **Sprint 3** | Sprint 4 proposal engine reuses the same requirements and shortage calculations. | `StaffingRequirements.jsx`, `staffing-requirement-service.ts` |
| Tutor suitability ranking with understandable reasons | **Sprint 3** | Sprint 4 extends explanations to whole-school proposed and skipped Tutors. | `allocation-queries.ts`, `ProposalLab.jsx` |
| Bulk allocation preview/commit and manual override reasons | **Sprint 3** | Sprint 4 adds alternative draft scenarios, locks and explicit publish. | `BulkAllocation.jsx`, `bulk-allocation-service.ts` |
| Budget, course-hour, workload and fairness reporting | **Sprint 3** | Sprint 4 compares scenario and strategy outcomes using the same metric definitions. | `OrganiserReports.jsx`, `reporting-service.ts` |
| Organiser Command Centre, KPIs and attention/shortage views | **Sprint 3** | Sprint 4 adds audit timeline and richer proposal-impact views. | `CommandCentre.jsx`, `command-centre-service.ts` |
| Draft scenarios, locks, Compare with Live and Publish | **Sprint 4** | Created from existing allocation rules; draft changes do not directly modify live allocations. | `ScenarioPlanning.jsx`, `scenario-service.ts` |
| Organiser presence, scenario library and stale-write conflicts | **Sprint 4** | Collaboration is guarded by versions rather than by UI presence alone. | `Scenario`, `ScenarioPresence`, scenario routes |
| Whole-school deterministic allocation proposals | **Sprint 4** | Reuses Sprint 1 hard rules and Sprint 3 staffing/ranking/metrics; proposal saves as draft Scenario. | `ProposalLab.jsx`, `proposal-service.ts` |
| Why this Tutor?/Why not? and strategy comparison | **Sprint 4** | Balanced, Strongest Match, Fair Workload and Budget Aware outcomes share the same hard rules. | `ProposalLab.jsx`, `proposal-service.ts` |
| Redacted audit timeline, filtering, export and allocation restore | **Sprint 4** | Records committed changes and restores valid historical state as a *new* change. | `AuditTimeline.jsx`, `AllocationRestore.jsx`, audit/restore services |

## Full feature register — Tutor scheduling and administration

| Feature or user journey | Introduced in | How it evolved through Sprint 4 | Final source / evidence |
| --- | --- | --- | --- |
| Tutor dashboard showing own work and weekly-hour information | **Sprint 1** | Sprint 2 improved live refresh and errors; Sprint 3 added reports/notifications; Sprint 4 includes bookings. | `TutorDashboard.jsx` |
| Tutor availability and manual busy-time entry | **Sprint 1** | Sprint 3 unified the calendar/import/recurrence experience; Sprint 4 reused it for Students. | `AvailabilityForm.jsx`, `MyTimetable.jsx`, `TimeSlot` |
| Tutor work logs for completed sessions | **Sprint 1** | Sprint 2 attached timesheet submission; post-Sprint 2 hardening rejected premature entries; Sprint 3 added corrections and disputes. | `WorkLogForm.jsx`, `timesheet-workflows.ts` |
| Tutor excuse submission and review status | **Sprint 1** | Sprint 2 added decision/status; Sprint 3 stabilisation added Excused/Skipped attendance and guards. | `ExcuseForm.jsx`, `ExcuseStatusSection.jsx` |
| Submitted, returned and approved timesheets | **Sprint 2** | Builds on Sprint 1 work logs; Sprint 3 extended declaration, revision, dispute and export. | `TimesheetSection.jsx`, `timesheet-workflows.ts` |
| CSV/ICS/paste timetable import, preview and duplicate protection | **Sprint 3** | Unified with manual schedule and extended to Student ownership in Sprint 4. | `TimetableImport.jsx`, `timetable-import-service.ts` |
| Academic terms, recurrence and exceptions | **Sprint 3** | Once/Weekly/Fortnightly, teaching breaks and occurrence exceptions retained in Sprint 4 shared timetable. | `AcademicTermManagement.jsx`, `OccurrenceException`, `TimeSlot` |
| Timesheet correction, declaration, dispute and payroll-ready export | **Sprint 3** | Remains part of approved Tutor/Organiser workflow in Sprint 4. | `TimesheetCorrectionPanel.jsx`, `payroll-export.ts` |
| Tutor session swap and replacement approval | **Sprint 4** | Rechecks Tutor eligibility and requires replacement and Organiser decisions; retains history. | `SwapWorkspace.jsx`, `swap-service.ts` |
| Tutor view of Student tutoring bookings | **Sprint 4** | Shared record appears on both calendars and contributes Tutor busy time. | `BookingPanel.jsx`, `booking-service.ts` |

## Full feature register — Student journeys, discovery and quality

| Feature or user journey | Introduced in | How it evolved through Sprint 4 | Final source / evidence |
| --- | --- | --- | --- |
| Student overflow work and volunteer confirmation interface | **Sprint 1** | Initial UI/mock boundary intentionally deferred real persistence to Sprint 2. | `StudentOverflow.jsx` |
| Persistent Student volunteer requests and decisions | **Sprint 2** | Added real open-work/claim APIs and approval status; Sprint 3 added withdrawal. | `student-workflows.ts`, `VolunteerClaim` |
| Organiser overflow post/edit/close and Student withdrawal | **Sprint 3** | Reuses the Sprint 2 live claim/decision model and remains active in Sprint 4. | `OrganiserOverflow.jsx`, `StudentOverflow.jsx` |
| Notifications, reminders, secure search and command palette | **Sprint 3** | Sprint 4 adds safe action links, recent/favourite destinations and stale-target checks. | `notifications.js`, `navigation.js`, `search-service.ts` |
| Student personal timetable with shared schedule engine | **Sprint 4** | Extends the Tutor TimeSlot/term/import/calendar model instead of creating a second scheduler. | `MyTimetable.jsx`, `ScheduleEntryPanel.jsx`, scheduling services |
| Mutual Student/Tutor availability and free-time selection | **Sprint 4** | Intersects safe busy periods server-side; hides each person's private event labels. | `MutualAvailability.jsx`, `mutual-availability.ts` |
| Student tutoring booking, cancellation and both calendars | **Sprint 4** | Server rechecks availability transactionally; events and historical states are preserved. | `BookingPanel.jsx`, `TutoringBooking`, `booking-service.ts` |
| Student sickness requests and Organiser decision | **Sprint 4** | Reuses Tutor-like approval pattern without merging Student and Tutor sickness tables. | `StudentSickNoteForm.jsx`, `StudentSickNoteQueue.jsx` |
| Mobile, accessible states, errors and role protection | **Sprint 1** | Regression in Sprint 2, refinement in Sprint 3 and final dense-view/table/focus/race handling in Sprint 4. | React component tests, [testing evidence](#testing) |
| Repeatable tests, coverage and Codecov evidence | **Sprint 1** | Expanded with each sprint's permissions, state transitions, concurrency and new user journeys. | [Testing & performance](#testing) |

## Implementation scope and verification

The supplied final application archive includes **120 registered HTTP operations, 30 Prisma application models and 30 migration directories**. This register groups user-facing functionality rather than assuming that every UI component is a separate feature. A label such as “Sprint 1” marks the original *foundation*; it does **not** imply that its final Sprint 4 behaviour existed in August.

To inspect a feature, follow its sprint's [roadmap](#roadmap) and [work-board evidence](#work-tracker), then its canonical technical chapter: [Architecture](#architecture), [Frontend](#frontend), [Backend](#backend), [Scheduling](#student-scheduling), [API](#api) and [Database](#database). Check the dated [testing evidence](#testing) before asserting that a particular production demonstration or release test passed. Final post-release [user feedback](#user-feedback) remains the unfinished content section.
