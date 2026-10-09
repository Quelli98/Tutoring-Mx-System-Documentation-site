## What the finished Tutor MX system does

Tutor MX is a tutor-management and tutoring-scheduling platform for the Wits School of Computer Science and Applied Mathematics. It brings together **Students, Tutors and Organisers** in one system: Organisers allocate eligible Tutors to course work; Tutors manage availability, teaching sessions, timesheets and absences; and Students volunteer for available work and arrange tutoring appointments. A designated **Master Organiser** can also approve lecturer registrations. This is an additional permission inside the Organiser role, not a fourth public user account type.

This chapter is the **complete user guide to the product**, not just the Sprint 4 booking features. It follows the four-sprint history and then describes what each role can do in the finished application. For implementation detail, use [Frontend](#frontend), [Backend](#backend), [API](#api) and [Database & ERD](#database).

## How the experience grew across Sprints 1–4

| Sprint | What users gained | What changed in the underlying system | Follow the original work |
| --- | --- | --- | --- |
| **Sprint 1 — Foundation** | Auth0 sign-in and three role-based workspaces; Organiser course/Tutor management and rule previews; Tutor dashboard, availability, work-log and excuse forms; a Student overflow **prototype**. | Separate React/Express applications, initial Prisma/Neon schema, identity guards and mark/clash/weekly-capacity checks. | [Sprint 1 roadmap](#sprint1) |
| **Sprint 2 — Basic** | Real Organiser allocation saving and approval queues; Tutor timesheet submission and decision status; Student volunteer claims and visible outcomes. | Replaced the earlier allocation/overflow placeholders with persistent API operations and workflow statuses. | [Sprint 2 roadmap](#sprint2) |
| **Sprint 3 — Intermediate and late stabilisation** | Staffing shortages, ranking and bulk allocation; reports and Command Centre; Tutor timetable import and recurring classes; timesheet corrections/disputes/export; Student withdrawal and Organiser overflow management; search and notifications. Lecturer application approval was introduced during late stabilisation. | Extended existing models and services, added term/recurrence and exceptions, stronger validation and approval/review flows. | [Sprint 3 roadmap](#sprint3) |
| **Sprint 4 — Advanced** | Student timetables, safe mutual availability, tutoring bookings and sick notes; Tutor swaps; Organiser scenarios, collaboration, audit/restore, explainable proposals and strategy comparison. | Extended the existing Tutor timetable and allocation rules instead of creating a second scheduling engine; added versioning and historical records. | [Sprint 4 roadmap](#sprint4-roadmap) |

**Important distinction:** a feature's first appearance in a sprint is not a claim that its final version existed then. The [feature register](#features) separates original foundations from later enhancements.

## Student — from volunteering to personal tutoring

A Student creates an account using Auth0 and enters the protected Student workspace. The Student can:

| Function in the finished site | What the Student actually does | Introduced |
| --- | --- | --- |
| Browse overflow work | View suitable open/unclaimed opportunities, volunteer, see acceptance/rejection and withdraw where allowed. | Prototype **Sprint 1**; live requests **Sprint 2**; withdrawal **Sprint 3** |
| Maintain My Timetable | Add Class or Unavailable entries manually, or preview/import CSV/ICS; choose Once, Weekly or Fortnightly recurrence within academic terms. | **Sprint 4**, reusing the Tutor calendar built in earlier sprints |
| Find a tutoring time | Select a relevant Tutor/course and view intervals when **both** are free, without seeing the Tutor's private class titles. | **Sprint 4** |
| Book a tutoring session | Confirm a free time; view the appointment on the Student calendar; review history and cancel an eligible future booking. | **Sprint 4** |
| Report sickness | Select an eligible own booking, submit a reason, see Pending/Approved/Rejected and the Organiser's decision. | **Sprint 4** |
| Use the shared interface | Receive notifications, follow permitted links, search and manage the signed-in session. | Shared shell **Sprint 1**; richer discovery **Sprint 3–4** |

**Example Student journey:** sign in → open My Timetable → add a Monday class → search for a Tutor's mutually free intervals → request a booking → check that it appears on the Student calendar. The same booking appears on the Tutor calendar. A second Student cannot override a confirmed busy time just because an old search result was still on screen.

## Tutor — managing teaching availability, work and payments

The Tutor signs in to their own workspace; the backend identifies the Tutor from the authenticated account rather than accepting an arbitrary Tutor ID from the browser.

| Function in the finished site | What the Tutor actually does | Introduced |
| --- | --- | --- |
| Dashboard and work summary | See own course allocations, work status and hours; handle the no-work or no-limit case safely. | **Sprint 1**, refreshed in **Sprint 2** |
| Personal timetable | Record class/unavailable time; manage recurring entries, imports, terms and exceptions in one weekly calendar. | Forms **Sprint 1**; full import/recurrence **Sprint 3** |
| Work logs and timesheets | Log eligible completed teaching, submit a timesheet, see review status, and use correction, declaration, dispute and export workflows. | Logs **Sprint 1**; submit/review **Sprint 2**; revisions **Sprint 3** |
| Excuse a teaching session | Submit an absence/excuse request and view the Organiser decision and preserved attendance history. | Request **Sprint 1**; decision **Sprint 2**; Excused/Skipped behaviour during **Sprint 3** stabilisation |
| Tutor replacement / swaps | Propose a replacement, obtain the replacement Tutor's response and await Organiser approval after eligibility rechecks. | **Sprint 4** |
| Student tutoring appointments | See confirmed Student appointments on the Tutor calendar, with busy-time protection. | **Sprint 4** |

**Example Tutor journey:** add university busy periods → see a confirmed Organiser allocation → complete the session → submit a work log and timesheet → read the Organiser's returned or approved status. A Student booking is **not** a payroll allocation; it represents a tutoring appointment and contributes to the calendar's busy intervals.

## Organiser — managing courses, staffing and decisions

An approved lecturer opens the Organiser workspace. It combines day-to-day administration with more advanced workforce planning:

| Function in the finished site | What the Organiser actually does | Introduced |
| --- | --- | --- |
| Courses and registered Tutors | Create/edit courses, locate self-registered Tutors, manage Tutor marks and review work availability without entering Auth0 subject IDs. | **Sprint 1**; hardened **Sprint 2** |
| Allocate teaching work | Compare mark thresholds, timetable clashes and selected-week hours; save/edit/remove valid allocations. | Rule previews **Sprint 1**; live writes **Sprint 2** |
| Process requests | Approve/return timesheets, approve/reject volunteer claims and excuses, then decide Student sick notes. | **Sprint 2**; extended **Sprint 3–4** |
| Staffing and overflow | Define staffing requirements, view shortages, rank candidates, allocate in bulk, post/edit/close overflow work and review volunteers. | **Sprint 3** |
| Operations and reporting | See budget, course hours, fairness/workload, notifications, search and Command Centre attention indicators. | **Sprint 3** |
| Explore plans safely | Create draft Scenarios, lock assignments, compare to live allocations and publish only after rechecking hard rules. | **Sprint 4** |
| Handle changes transparently | Approve Tutor swaps, inspect the redacted audit timeline, preview/restore valid allocations and review strategy-based proposals. | **Sprint 4** |

**Example Organiser journey:** select a course requiring Tutors → review candidate rule results → create an eligible allocation → examine the Tutor's updated dashboard. In a later staffing exercise, use ranking and shortage reports to create a Scenario; compare it with live data before pressing Publish. A proposal **does not directly publish** staffing changes.

## Master Organiser approval — part of Organiser administration

A Master Organiser is an **already approved Organiser** with the additional `MASTER_ORGANIZER` claim in Auth0. It is not a separate signup role or fourth `Profile.role`. This workflow was added in **late Sprint 3 stabilisation** and carried into Sprint 4.

| Stage | Visible behaviour | API/database responsibility |
| --- | --- | --- |
| Lecturer registration | Lecturer uses **Register as organiser**. | Auth0 verifies identity; Tutor MX creates a **PENDING** `OrganiserApplication`, not an immediate Organiser Profile. |
| Review queue | Trusted Master Organiser sees pending lecturer applications. | Protected route requires both Organiser access and the extra Master permission. |
| Approval | Lecturer sees Approved, then signs in with an updated role. | Server provisions the Organiser role via Auth0, records the decision and creates/links the `Profile`. |
| Rejection | Lecturer sees Rejected; the review decision is retained. | `OrganiserApplication` records status/review note; no Organiser Profile is granted through that rejected application. |
| Normal Organiser | Can perform staffing and approvals, **but cannot review lecturer access**. | Backend returns **403** for requests to the protected Master queue. |

The designated trusted Master account is configured once by an authorised administrator in Auth0; ordinary applicants must use the approval process. Auth0 provisioning and the Neon database decision are **two different systems**, so a failed cross-system operation may require reconciliation; a single database transaction cannot undo an external Auth0 role grant. [Role security](#security) · [Relevant `Profile` and `OrganiserApplication` models](#database).

## How scheduling and booking work behind the screens

The same `TimeSlot` system stores both Student and Tutor personal timetable entries. Manual entries and CSV/ICS imports share the recurrence, term and exception rules developed in Sprint 3. A Tutor's confirmed `Allocation` is separate from a Student's `TutoringBooking`; both can contribute busy time.

**Mutual availability = Student free time ∩ Tutor free time.** For instance, if the Student is free 11:00–14:00 but the Tutor is busy 12:00–13:00, the available gaps are 11:00–12:00 and 13:00–14:00. A 90-minute request fits neither gap. The backend calculates the intersection and checks again when saving; React does not implement a second independent clash engine. One person's private event labels are not disclosed to the other.

A Student sick note is attached to the Student's own `TutoringBooking` and reviewed by an Organiser. Pending requests keep the appointment; rejected requests preserve it; an approved in-advance absence can release future busy time as **Excused**, while later approvals preserve **Skipped** history. Tutor excuses remain their own established flow. Neither history nor an Organiser's decision should be silently deleted.

## Where a marker can verify each role

Use separate Student, Tutor, Organiser and trusted Master Organiser **test accounts** for the appropriate actions. The [four-sprint work tracker](#work-tracker) links to the real issue boards and acceptance specifications; the [feature register](#features) identifies initial sprint ownership; [testing evidence](#testing) and [release evidence](#sprint4) identify what was actually observed. Never present a handbook acceptance test as proof that the test was executed. The official [rubric mapping](#milestone4) connects these experiences to the assessment requirements.
