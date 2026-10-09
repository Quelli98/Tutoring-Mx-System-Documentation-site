## The database — what it stores and why

Tutor MX uses a **relational PostgreSQL database hosted on Neon**, with a schema managed by **Prisma** and versioned migrations. The database preserves registered users, courses, tutoring assignments, availability, timesheets, volunteer requests, decisions, booking history and advanced planning. **Only the Express backend connects to Neon**; React and external clients use protected HTTP endpoints.

The database is not simply a list of 30 unrelated tables. Its foreign-key relationships connect a user (`Profile`) to their courses, schedules, staffing work, requests, approvals and recorded changes. This chapter presents the overall design first, then its ER diagram and model groups, and finally the **complete searchable 30-model dictionary** with exact fields, keys and constraints.

## 1. Schema growth across Sprints 1–4

| Sprint | Database design goal | Representative final models supporting that work |
| --- | --- | --- |
| **Sprint 1 — Foundation** | Link authenticated users to one application role, teaching courses, marks, Tutor availability/capacity and first allocations and work logs. | `Profile`, `Course`, `TutorMark`, `TimeSlot`, `TutorHourLimit`, `Allocation`, `WorkLog` |
| **Sprint 2 — Basic workflows** | Persist actual allocation and approval outcomes; keep Student volunteering and Tutor timesheets rather than leaving them as UI placeholders. | `OverflowWork`, `VolunteerClaim`, `Timesheet`, `Excuse`, `ApiWriteReceipt` |
| **Sprint 3 — Intermediate** | Represent demand/shortages, terms and recurring schedule exceptions, richer timesheet history and notifications. Late stabilisation added lecturer applications. | `StaffingRequirement`, `AcademicTerm`, `OccurrenceException`, `TimesheetRevision`, `TimesheetDispute`, `Notification`, `OrganiserApplication` |
| **Sprint 4 — Advanced** | Support shared Student/Tutor ownership, two-person bookings, replacement approvals, collaborative draft planning and auditable/restorable state. | `TutoringBooking`, `StudentSickNote`, `TutorSwap`, `Scenario`, `ScenarioItem`, `ScenarioPresence`, `AuditEvent`, `MutationReceipt` |

These are **functional groupings of the supplied final schema**, not precise timestamps for every individual migration. The 30 September handbook documents the baseline; the final 7 October source includes **30 Prisma application models, 14 enums and 30 migration directories**. For exact database changes, inspect the versioned migration files linked in the dictionary and [source downloads](#references). [Sprint roadmaps](#roadmap).

## 2. Entity–relationship diagram (ERD) — how the records connect

An **entity** in the diagram corresponds to a Prisma model / database table. A connecting line indicates a relationship: for example, `Allocation` refers to a Tutor `Profile` and a `Course`; `TutoringBooking` connects a Student, Tutor and course; a Student sick note refers to one booking. An arrow is a relationship reference, **not** evidence that HTTP requests flow directly between tables.

<figure class="documentation-erd"><a href="diagrams/erd.svg" target="_blank" rel="noreferrer"><img src="diagrams/erd.svg" alt="Tutor MX database ER diagram showing key relationships from Profile, Course and TimeSlot through allocations, bookings and approval records"></a><figcaption><strong>Final relational overview.</strong> Click the diagram for the full-size SVG. It shows major foreign-key relationships; the complete dictionary below covers every final model and relation.</figcaption></figure>

[Open the full-size ER diagram](diagrams/erd.svg) · [Browse all UML and architecture diagrams](#diagrams).

## 3. Important relationships — explained with real Tutor MX workflows

| Business process | Models connected | Why that relationship matters |
| --- | --- | --- |
| Tutor eligibility | `Profile` → `TutorMark` → `Course`; `Profile` → `TimeSlot` and `TutorHourLimit` | An Organiser checks marks, busy time and weekly capacity before assigning Tutor work. |
| Confirmed teaching work | `Allocation` → Tutor `Profile` + `Course`; `WorkLog` → `Allocation`; `Timesheet` → Tutor `Profile` | Logged work and approvals remain traceable to a valid allocation. |
| Student volunteering | `OverflowWork` → `Course`; `VolunteerClaim` → `OverflowWork` + Student `Profile` | A Student volunteers for an identified open opportunity; requests can be reviewed without losing status. |
| Shared scheduling | `TimeSlot` → owner `Profile`; `OccurrenceException` → `TimeSlot`; `TimeSlot` → optional `AcademicTerm` | One scheduling model supports both Student and Tutor recurrence, breaks and exceptions. |
| Tutoring appointments | `TutoringBooking` → Student `Profile` + Tutor `Profile` + `Course`; `StudentSickNote` → booking | The booking appears to both authorised people; a sickness decision remains linked to the specific appointment. |
| Safe advanced planning | `Scenario` → `ScenarioItem`/`ScenarioPresence`; `TutorSwap` → `Allocation`; `AuditEvent` → actor and changed target | Drafts and historical decisions can be reviewed without silently overwriting live staffing work. |

**Database design principle:** the same `Profile` identity connects user-owned data rather than creating a separate isolated Student database. The final Prisma `TimeSlot.ownerId` maps onto the existing physical `tutorId` column using `@map("tutorId")`. This intentionally preserves earlier data/migration compatibility while sharing the scheduling service in Sprint 4.

## 4. All 30 application models — grouped by purpose

The groups make the schema easier to review. **Click any model name in the searchable dictionary further down** to inspect exact stored scalar fields, optional keys, relation fields, uniqueness and indexes.

| Domain | Tables/models | Main purpose |
| --- | --- | --- |
| **Identity & communication** | `Profile`, `OrganiserApplication`, `Notification` | Registered identities, lecturer approval requests and user messaging. |
| **Teaching, capacity & staffing** | `Course`, `TutorMark`, `TutorHourLimit`, `TimeSlot`, `AcademicTerm`, `OccurrenceException`, `Allocation`, `StaffingRequirement` | Courses, eligibility, repeating busy times, allocation and demand. |
| **Worked time & absences** | `WorkLog`, `Timesheet`, `TimesheetRevision`, `TimesheetDeclaration`, `TimesheetDispute`, `Excuse` | Actual work, approval/revision history and Tutor sickness. |
| **Student overflow** | `OverflowWork`, `VolunteerClaim` | Open additional work and the Student claim lifecycle. |
| **Scenario collaboration** | `Scenario`, `ScenarioItem`, `ScenarioPresence` | Draft staffing changes, locks and collaborative presence. |
| **Student bookings & Tutor swaps** | `TutoringBooking`, `StudentSickNote`, `TutorSwap`, `BookingEvent`, `SwapEvent` | Appointment state, sickness outcomes and replacement history. |
| **Audit & safe retries** | `AuditEvent`, `ApiWriteReceipt`, `MutationReceipt` | Historical changes and repeat/duplicate-request safeguards. |

**Why there is no `MasterOrganiser` table:** this is deliberate, not a missing table. A Master Organiser uses the normal `Profile` with role `ORGANISER`, together with an additional trusted Auth0 `MASTER_ORGANIZER` privilege. `OrganiserApplication` records the lecturer's Pending/Approved/Rejected registration and reviewer fields. This belongs to the **identity and authorisation design**, not a separate fourth database user role. [See the actual user journey](#student-scheduling) · [Review role security](#security) · [Profile fields](#database/model-profile) · [OrganiserApplication fields](#database/model-organiserapplication).

## 5. Keys, indexes, constraints and migrations

A **primary key** (`id`) uniquely identifies a row. A **foreign key** (for example `bookingId` in `StudentSickNote`) references another row, preventing orphaned records according to its declared constraint. Unique values such as `Profile.auth0Id` prevent multiple Profiles using the same Auth0 identity; the Tutor/course uniqueness rule protects duplicate `TutorMark` entries. Indexed owner/date/status fields support common worklist and calendar queries.

Prisma **scalar fields** such as `email` or `bookingId` become stored columns. **Relation fields** such as `student` are navigation declarations rather than extra JSON columns. The dictionary below distinguishes them. The migrations also capture PostgreSQL-level changes and constraints, so a reader should not treat a diagram as a substitute for schema source.

The complete record provides **30 models**, **14 enums** and **30 migration directories**. `_prisma_migrations` (Prisma's migration bookkeeping table) is not counted as an extra Tutor MX application model. [Inspect schema.prisma](downloads/schema.prisma) · [Read-only database checks](downloads/database-evidence.sql).

## 6. Deployment evidence and what can actually be verified

Neon is the **hosted database platform**, not an anonymous public database browser. The private Neon console link was removed because a marker without project credentials cannot use it. Instead, the site provides the source-derived dictionary, ERD, redacted dated production screenshots and a read-only SQL evidence script for an already-authorised reviewer.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-neon-production-overview-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-overview-2026-10-07.png" alt="Neon tutor-mx-system production database branch overview"></a><figcaption><strong>Production Neon branch, 7 October.</strong><span>The screenshot records project/branch configuration for the deployed PostgreSQL database.</span></figcaption></figure>
<figure><a href="evidence/sprint4-neon-production-tables-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-tables-2026-10-07.png" alt="Neon table browser showing Tutor MX workflow tables"></a><figcaption><strong>Production tables, 7 October.</strong><span>Visible established and advanced models, but not a full row-count or test-data audit.</span></figcaption></figure>
</div>

**Rubric evidence limitation:** screenshots show schema and deployment context, **not the exact number of production records or the proportion that are test data**. The final rubric asks for those figures; only publish counts from a dated authorised query and label them accurately. The read-only SQL file is available for that check. [Deployment](#deployment) · [Final submission rubric](#milestone4).

## How to use the complete dictionary below

Below this explanation is the searchable **Complete table dictionary**, followed by the migration register. Search for a model or column, expand the model and inspect the actual data types, keys, relations and constraints. This is the detailed technical reference supporting the design overview above.
