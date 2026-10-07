## What is actually stored

The supplied final Sprint 4 Prisma schema contains **30 application models, 14 enums and 30 migration directories**. The 30 September baseline had 20 models and 25 migrations; Sprint 4 adds ten application models and five versioned migrations. `_prisma_migrations` is Prisma bookkeeping, separate from the 30 application models.

A **model** describes an application entity. A **column** is a stored scalar value such as `email` or `courseId`. A Prisma **relation field** such as `tutor` or `allocations` describes navigation between records; it is not an extra JSON column. The dictionary below makes that distinction explicit.

## How to show tables professionally

| Audience / need | Recommended view | Does this need Auth0? |
| --- | --- | --- |
| Marker understands structure | Public dictionary, ER relationship map, keys and migration history on this page | No; schema metadata contains no private rows |
| Marker sees the application working | Approved demo Tutor/Student/Organiser account and the relevant UI/API workflow | Yes, normal application access |
| Team inspects real database administration | Neon project/branch console with authorised Neon membership | Neon account access; Auth0 does not sign someone into Neon |
| Developer inspects model records locally | `npx prisma studio` from the configured application checkout | Database connection permissions; not a public Auth0 link |
| Public evidence of data volume | Dated aggregate counts and redacted/synthetic screenshots | Generate through authorised access; publish only safe results |

**A Neon console URL is an administrative link, not a public table viewer.** A marker without project access cannot see private tables just because that link appears on a public website. Keep this public schema view available, and use approved demo workflows for actual data. Prisma Studio is a developer/admin tool; it should not be exposed as an unrestricted public website.

The site already includes the complete column/relation dictionaries and a safe read-only SQL download. A public live-row browser would require a deliberately designed backend endpoint, redaction, pagination and access policy. Do not connect React directly with `DATABASE_URL`.

## Production data versus test data

The supplied Neon table screenshot demonstrates a database/table list, not reliable row counts or how many records are real. The source seed/demo data is synthetic evidence; it is not proof that production contains only test data. A ready database is also not proof of realistic data volume.

Run the [read-only evidence SQL](downloads/database-evidence.sql) through an authorised Neon SQL session. Record the environment/branch, date, row counts and applied migration status. Classify demo versus genuine records using the team's known seed/account register. Leave uncertain accounts as **unclassified**; do not guess from a normal-looking email address. Publish aggregate totals, not personal rows.

| Required evidence | Current answer | How to close the gap |
| --- | --- | --- |
| Production record count | Not supplied | Run exact counts for each current table |
| Real versus test records | Not established from source | Reconcile counts with the team's demo account register |
| Database available | Earlier `/ready` check returned 200 | Repeat as part of the actual final release gate |
| All current migrations applied | Final source contains 30; production migration screenshot/status not yet supplied | Compare `_prisma_migrations` with the source list |

## Production Neon evidence — 7 October 2026

The supplied Neon screenshots identify project **`tutor-mx-system`**, default branch **`production`**, one PostgreSQL database/compute and the production table browser. The table list visibly includes Sprint 4 structures such as `AuditEvent`, `BookingEvent`, `OrganiserApplication` and `OccurrenceException`, alongside established entities such as `AcademicTerm`, `Allocation`, `Course`, `Excuse` and `Notification`. This proves the production branch exposes the expected relational schema; it does **not** establish row counts.

The production DDL supplied with the screenshots stores the physical `TimeSlot` ownership column as `tutorId`. The final Prisma model deliberately maps its generic field as `ownerId @map("tutorId")`. That preserves the existing database column while letting Student and Tutor schedules use the same Profile-owned model; the naming difference is therefore intentional compatibility, not a second Student table.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-neon-production-overview-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-overview-2026-10-07.png" alt="Neon production branch overview for tutor-mx-system"></a><figcaption><strong>Neon production branch</strong><span>The project/branch overview confirms the `production` branch and managed PostgreSQL compute used by the deployed backend.</span></figcaption></figure>
<figure><a href="evidence/sprint4-neon-production-tables-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-neon-production-tables-2026-10-07.png" alt="Neon production table browser showing Tutor MX application tables"></a><figcaption><strong>Production table browser</strong><span>The visible table list includes both established workflow tables and Sprint 4 additions. No private row data is shown.</span></figcaption></figure>
</div>

## Keys, constraints and relational design

`Profile.auth0Id` and `Profile.email` are unique. `TutorMark` has a composite Tutor/course uniqueness rule. Foreign keys connect the identity, teaching, allocation and work-submission records. Indexes support common owner/date/status lookups. Decimal fields store marks, hours and money with explicit precision. TimeSlot recurrence is stored independently of its display label, and `OccurrenceException` changes one occurrence without corrupting the parent series.

The source uses restrictive deletion where historical workflow evidence needs protection and cascade/set-null where the declared relationship allows it. The exact `@relation`, `@@unique` and `@@index` annotations are shown in the dictionary. Migrations add further PostgreSQL constraints/triggers; the Prisma schema alone is not the entire database integrity story.

## Sprint 4 tables now implemented

| Entity | Final status | Meaning |
| --- | --- | --- |
| `OrganiserApplication` | Implemented baseline | Pending/approved/rejected lecturer request; identity and email unique; reviewer points to Profile |
| General Profile-owned `TimeSlot` | **Implemented M1** | One shared schedule model for Student/Tutor; legacy Tutor aliases retained |
| `Scenario`, `ScenarioItem`, `ScenarioPresence` | **Implemented M2** | Draft plans, assignments/locks and short-lived collaboration presence |
| `TutoringBooking` | **Implemented M3** | Student/Tutor scheduling appointment, separate from Allocation/payroll |
| `TutorSwap`, `SwapEvent` | **Implemented M3** | Replacement workflow and preserved swap history |
| `BookingEvent` | **Implemented M3** | Booking state/history support |
| `StudentSickNote` | **Implemented M4** | Student absence request/review linked to own booking |
| `AuditEvent` | **Implemented M5** | Redacted committed-change history for important mutations |
| `MutationReceipt` | **Implemented M5** | Retry/idempotency support for mutation workflows |

The five Sprint 4 migrations are `20261007000000_shared_profile_schedule`, `20261008000000_s4_scenario_planning`, `20261009000000_s4_swaps_bookings`, `20261010000000_s4_student_sick_notes` and `20261011000000_s4_audit_restore`.
