## What is actually stored

The inspected 30 September Prisma schema contains **20 application models, 14 enums and 25 migration directories**. The earlier source contained 19 models and 22 migrations. `OrganiserApplication` is the new model; schedule deduplication and Tutor sickness/reviewer fields are also added. `_prisma_migrations` is Prisma bookkeeping, separate from the 20 application models.

A **model** describes an application entity. A **column** is a stored scalar value such as `email` or `courseId`. A Prisma **relation field** such as `tutor` or `allocations` describes navigation between records; it is not an extra JSON column. The dictionary below makes that distinction explicit.

## How to show tables professionally

| Audience / need | Recommended view | Does this need Auth0? |
| --- | --- | --- |
| Marker understands structure | Public dictionary, ER relationship map, keys and migration history on this page | No; schema metadata contains no private rows |
| Marker sees the application working | Approved demo Tutor/Student/Organiser account and the relevant UI/API workflow | Yes, normal application access |
| Team inspects real database administration | [Neon project/branch console](https://console.neon.tech/app/projects/morning-rice-90086270/branches/br-rapid-term-b2gq2rx2) with authorised Neon membership | Neon account access; Auth0 does not sign someone into Neon |
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
| All current migrations applied | Source contains 25; production status not supplied | Compare `_prisma_migrations` with the source list |

## Keys, constraints and relational design

`Profile.auth0Id` and `Profile.email` are unique. `TutorMark` has a composite Tutor/course uniqueness rule. Foreign keys connect the identity, teaching, allocation and work-submission records. Indexes support common owner/date/status lookups. Decimal fields store marks, hours and money with explicit precision. TimeSlot recurrence is stored independently of its display label, and `OccurrenceException` changes one occurrence without corrupting the parent series.

The source uses restrictive deletion where historical workflow evidence needs protection and cascade/set-null where the declared relationship allows it. The exact `@relation`, `@@unique` and `@@index` annotations are shown in the dictionary. Migrations add further PostgreSQL constraints/triggers; the Prisma schema alone is not the entire database integrity story.

## Updated tables and planned tables

| Entity | Status | Meaning |
| --- | --- | --- |
| `OrganiserApplication` | Current source | Pending/approved/rejected lecturer request; identity and email unique; reviewer points to Profile |
| `TimeSlot.dedupeKey` | Current source | Optional unique stored key for schedule identity/deduplication |
| `Excuse` attendance/review fields | Current source | Preserved Tutor sickness outcome and reviewer/time |
| General Profile-owned `TimeSlot` | Sprint 4 M1 target | Migrate the existing Tutor-named owner, preserving existing rows |
| `TutoringBooking` | Sprint 4 M3 target | Student/Tutor scheduling appointment; independent from Allocation/payroll |
| `StudentSickNote` | Sprint 4 M4 target | Reason/status/review linked to the Student's own booking |
| Scenarios, swaps and audit snapshots | Sprint 4 M2/M3/M5 target | Extend current models with versioned planning and traceability |

The target names come from the handbook; fields beyond the handbook's conceptual contract are not presented as an implemented schema.
