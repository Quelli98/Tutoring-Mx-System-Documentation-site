## The React frontend — from first prototype to the final application

The application frontend uses **React + Vite**, `Auth0Provider` in `frontend/src/main.jsx`, role/route protection in `frontend/src/routes/` and `frontend/src/auth/`, reusable feature components in `frontend/src/features/` and an API client in `frontend/src/api/client.js`. It does not contain Prisma database access or perform authoritative allocation checks: those belong on the Express backend.

The same frontend grew through **Sprint 1, Sprint 2, Sprint 3 and Sprint 4**. The register below explains when each user journey was first available and how it was expanded. [Open all feature histories](#features).

## Frontend delivery chronology

| Sprint | Shared user interface | Student | Tutor | Organiser / Master Organiser |
| --- | --- | --- | --- | --- |
| **Sprint 1 — foundation** | Role selection, Auth0 login, protected navigation, loading/empty/error states and responsive baseline. | Protected overflow list and volunteer confirmation **prototype** (mock contract). | Personal dashboard, busy-time forms, work-log and excuse entry. | Initial board, course/registered-Tutor management and pass/fail eligibility messages. |
| **Sprint 2 — Basic workflows** | Error recovery, account lifecycle, cross-role protection and refresh after mutations. | Live open-work and persisted volunteer requests with outcome statuses. | Live allocation refresh, timesheet submit/status and excuse decision/status. | Persistent allocation create/edit/remove, timesheet approval and volunteer decision queues. |
| **Sprint 3 — Intermediate workflows** | Search/Ctrl+K, notifications, reminders, better keyboard/mobile behaviour and guided Tutor setup. | Volunteer withdrawal and richer open-work states. | CSV/ICS/paste timetable import, calendar/recurrence/terms, corrections, disputes and payroll. | Staffing requirements, suitability ranking, bulk allocation, reports, overflow management and Command Centre. Late stabilisation introduced Master Organiser applications. |
| **Sprint 4 — Advanced workflows** | Safer session/stale links, notification actions, recent/favourite destinations, better conflict and focus handling. | Shared personal timetable, mutual free slots, booking/history/cancellation and sickness requests. | Appointment projections and replacement-swap workflow. | Scenarios/locks/presence, Compare with Live/Publish, audit/restore, whole-school proposal and strategy comparison. |

An early mock or placeholder is **not** described as a completed persisted workflow: in particular Sprint 1 Student volunteering became a live database/API feature in Sprint 2, and the Sprint 1 allocation board obtained real save/edit/remove actions in Sprint 2.

## Complete role-specific frontend journeys

| Workspace | Primary screens/components in final source | Purpose and continuity |
| --- | --- | --- |
| Student | `StudentOverflow.jsx`, `MyTimetable.jsx`, `MutualAvailability.jsx`, `BookingPanel.jsx`, `StudentSickNoteForm.jsx` | Progresses from volunteer prototype → live claims → student-owned schedule and bookings; access restricted to own data. |
| Tutor | `TutorDashboard.jsx`, `AvailabilityForm.jsx`, `TimetableImport.jsx`, `TimesheetSection.jsx`, `ExcuseStatusSection.jsx`, `SwapWorkspace.jsx` | Progresses from own dashboard/forms → submitted timesheets → import/corrections → swaps and booked tutoring projections. |
| Organiser | `CourseManagement.jsx`, `TutorManagement.jsx`, `OrganiserApprovals.jsx`, `StaffingRequirements.jsx`, `BulkAllocation.jsx`, `OrganiserReports.jsx`, `CommandCentre.jsx`, `ScenarioPlanning.jsx`, `AuditTimeline.jsx`, `ProposalLab.jsx` | Progresses from course and allocation validation → Basic approvals → Intermediate reporting/bulk → Advanced collaboration and proposals. |
| Master Organiser | `MasterOrganiserApplications.jsx` within Organiser navigation | Additional approval capability for the trusted Organiser account, **not** a separately selectable role or workspace. |

## HTTP connection and protected routing

`frontend/src/api/client.js` uses the public `VITE_API_BASE_URL`; production is `https://tutor-mx-api.onrender.com` and local development ordinarily uses `http://localhost:3000`. The client acquires a bearer token for the configured Auth0 API audience, sends requests through Express, handles HTTP failures and supports CSV response downloads. It never talks directly to Neon.

The supplied final `frontend/src/main.jsx` uses Auth0 `cacheLocation="localstorage"` and `useRefreshTokens={false}`; earlier documentation that said the cache is memory-only is outdated. Local storage persistence does not bypass token expiry, role changes or backend checks. The source's protected routes and access handling must still be verified independently.

## Scheduling components reused instead of duplicated

The Tutor calendar and import tools came from Sprint 1–3. Sprint 4 **generalised the existing `TimeSlot` ownership** so Student entries use the same manual/import, term, recurrence and exception rules. The Student has no Tutor weekly-capacity control. The server, not React, calculates mutual bookability; a confirmed `TutoringBooking` appears on both calendars.

## Accessibility, usability and responsive behaviour across the project

- **Sprint 1:** keyboard-reachable labels and navigation; explicit empty, loading, error, confirmation and colour-independent rule messages.
- **Sprint 2:** regression of failed requests, no-work states, refresh, duplicates and wrong-role navigation.
- **Sprint 3:** shared calendar/list accessibility, searchable workflows, guided setup and more complex reports.
- **Sprint 4:** conflict banners with refresh/retry, focus recovery, compact responsive views and text/table alternatives for dense planning visuals.

These are the documented intended behaviours and final source areas. For **dated automated results and limitations**, use [Testing & Codecov](#testing), not a blanket unverified assertion that every accessibility audit has passed. For each sprint's requirements and user stories, follow [Sprint 1](#sprint1), [Sprint 2](#sprint2), [Sprint 3](#sprint3) or [Sprint 4](#sprint4-roadmap).
