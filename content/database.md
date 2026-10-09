## What is actually stored

The supplied final Sprint 4 Prisma schema contains **30 application models, 14 enums and 30 migration directories**. The 30 September baseline had 20 models and 25 migrations; Sprint 4 adds ten application models and five versioned migrations. `_prisma_migrations` is Prisma bookkeeping, separate from the 30 application models.

A **model** describes an application entity. A **column** is a stored scalar value such as `email` or `courseId`. A Prisma **relation field** such as `tutor` or `allocations` describes navigation between records; it is not an extra JSON column. The dictionary below makes that distinction explicit.

## Schema development across Sprint 1–4

The database is a single PostgreSQL database managed on Neon and accessed through **Prisma on the backend only**. It grew over the full project rather than being introduced in Sprint 4:

| Sprint | Database purpose | Representative tables |
| --- | --- | --- |
| **1 — foundation** | Role identity, courses, marks, Tutor capacity, availability, allocations and initial work tracking. | `Profile`, `Course`, `TutorMark`, `TimeSlot`, `Allocation`, `WorkLog` |
| **2 — Basic journeys** | Persisted volunteer/overflow outcomes, timesheet submission, review state and integration safeguards. | `VolunteerClaim`, `OverflowWork`, `Timesheet`, `Excuse`, `ApiWriteReceipt` |
| **3 — Intermediate workflows** | Staffing demand, term/recurrence exceptions, reporting, timesheet correction/declaration/dispute and notification state. | `StaffingRequirement`, `AcademicTerm`, `OccurrenceException`, `TimesheetRevision`, `TimesheetDispute`, `Notification` |
| **4 — Advanced completion** | Scenario collaboration, two-party bookings, Tutor swaps, Student sickness, audit and replay-safe mutations. | `Scenario`, `ScenarioItem`, `ScenarioPresence`, `TutoringBooking`, `TutorSwap`, `StudentSickNote`, `AuditEvent`, `MutationReceipt` |

This is a functional grouping of the **final schema**, not a claim that each table was first created on an exact date without checking its migration. The expanded, searchable **30-model dictionary below** remains the authoritative definition of columns, keys, relations and stored enums.

## What every table is for

| Domain | Prisma models in the final application |
| --- | --- |
| Identity, applications and messaging | `Profile`, `OrganiserApplication`, `Notification` |
| Courses, availability and staffing | `Course`, `TutorMark`, `AcademicTerm`, `TimeSlot`, `OccurrenceException`, `TutorHourLimit`, `Allocation`, `StaffingRequirement` |
| Timesheets, absences and work logs | `Timesheet`, `TimesheetRevision`, `TimesheetDeclaration`, `TimesheetDispute`, `WorkLog`, `Excuse` |
| Student overflow | `OverflowWork`, `VolunteerClaim` |
| Planning and collaboration | `Scenario`, `ScenarioItem`, `ScenarioPresence` |
| Student bookings, swaps and history | `TutoringBooking`, `TutorSwap`, `BookingEvent`, `SwapEvent`, `StudentSickNote` |
| Tracking and retry safety | `ApiWriteReceipt`, `AuditEvent`, `MutationReceipt` |

Use the interactive/searchable **Complete table dictionary** later on this page to open any of these models, view the exact fields and foreign keys, or search by a column name.

## Master Organiser: which tables are involved?

**There is no separate `MasterOrganiser` table in the supplied final Prisma schema.** The Master Organiser is an existing approved Organiser with the **additional `MASTER_ORGANIZER` privilege in Auth0**. A new SQL table would falsely describe how the application actually works.

- **[`Profile`](#database/model-profile)** — stores the application's linked user, Auth0 subject, email, name and normal `UserRole` (`ORGANISER`, `TUTOR` or `STUDENT`). A Master Organiser uses an Organiser Profile; the extra permission comes from Auth0, not another `Profile.role` value.
- **[`OrganiserApplication`](#database/model-organiserapplication)** — records the lecturer's registration request and `PENDING`, `APPROVED` or `REJECTED` status, along with `motivation`, `reviewReason`, `reviewedAt` and the optional `reviewerProfileId` foreign key to the reviewing Organiser's `Profile`.
- **Auth0 permissions** — the backend requires a signed-in Organiser **and** the trusted Master claim before allowing approval/rejection. Pending applicants do not receive an Organiser Profile merely by submitting an application.

**The screenshot supplied on 9 October shows a single approved application record in `OrganiserApplication`**, which is evidence of that specific visible record, not a complete count of all database tables. [See the user-facing Master Organiser workflow](#master-organiser) and [security/roles](#security).

## Public, marker-friendly database verification

The documentation deliberately **does not link to a private Neon administration console**. A reader without the project's credentials cannot view production tables by following a console URL. Instead, every marker can inspect the **complete 30-model field dictionary and relationships below**, the ERD, source-derived migration list and the redacted production database screenshots. No credentials or production personal data are published.

The [read-only SQL evidence script](downloads/database-evidence.sql) is provided for an authorised reviewer who already has database access; running it is optional and does not turn the admin database into a public endpoint. For external application data, the safe route is the [handwritten HTTP API](#api), with applicable authentication and permissions. The available screenshots show table existence but **do not prove final production row counts or their test/real breakdown**.

## Production Neon evidence — 7 and 9 October 2026

The previously supplied Neon screenshots identify project **`tutor-mx-system`**, default branch **`production`**, one PostgreSQL database/compute and the production table browser. The table list visibly includes Sprint 4 structures such as `AuditEvent`, `BookingEvent`, `OrganiserApplication` and `OccurrenceException`, alongside established entities such as `AcademicTerm`, `Allocation`, `Course`, `Excuse` and `Notification`. This proves the production branch exposes the expected relational schema; it does **not** establish row counts.

The production DDL supplied with the screenshots stores the physical `TimeSlot` ownership column as `tutorId`. The final Prisma model deliberately maps its generic field as `ownerId @map("tutorId")`. That preserves the existing database column while letting Student and Tutor schedules use the same Profile-owned model; the naming difference is therefore intentional compatibility, not a second Student table.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-neon-production-overview-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-overview-2026-10-07.png" alt="Neon production branch overview for tutor-mx-system"></a><figcaption><strong>Neon production branch</strong><span>The project/branch overview confirms the `production` branch and managed PostgreSQL compute used by the deployed backend.</span></figcaption></figure>
<figure><a href="evidence/sprint4-neon-production-tables-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-tables-2026-10-07.png" alt="Neon production table browser showing Tutor MX application tables"></a><figcaption><strong>Production table browser</strong><span>The visible table list includes both established workflow tables and Sprint 4 additions. No private row data is shown.</span></figcaption></figure>
</div>

## Keys, constraints and relational design

`Profile.auth0Id` and `Profile.email` are unique. `TutorMark` has a composite Tutor/course uniqueness rule. Foreign keys connect the identity, teaching, allocation and work-submission records. Indexes support common owner/date/status lookups. Decimal fields store marks, hours and money with explicit precision. TimeSlot recurrence is stored independently of its display label, and `OccurrenceException` changes one occurrence without corrupting the parent series.

The source uses restrictive deletion where historical workflow evidence needs protection and cascade/set-null where the declared relationship allows it. The exact `@relation`, `@@unique` and `@@index` annotations are shown in the dictionary. Migrations add further PostgreSQL constraints/triggers; the Prisma schema alone is not the entire database integrity story.

