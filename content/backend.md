## The backend developed through all four sprints

The backend is the **handwritten Node.js/Express application** in `src/app.ts` and `src/server.ts`, backed by Prisma and Neon. It owns HTTP contracts, Auth0 verification, roles, domain rules, safe errors, database writes and selected external integration. Its final code is not a new Sprint 4 backend: Sprint 4 extends services built in Sprints 1–3.

| Sprint | Backend changes introduced | Final source locations / reference |
| --- | --- | --- |
| **Sprint 1 — foundation** | Separate Express API and `/health`; Auth0 bearer verification, own-profile/course/Tutor/Tutor-workflow routes; mark/clash/weekly-hour validators; Neon/Prisma structure and public-holiday spike. | `src/server.ts`, `src/app.ts`, `src/auth/`, `src/database.ts`; [Sprint 1 roadmap](#sprint1) |
| **Sprint 2 — Basic workflows** | Real allocation save/edit/remove, timesheet submission/review, volunteer/overflow and excuse decision APIs; consistent statuses, protected ownership, safe conflict responses, live public-holiday adapter. | `src/services/timesheet-workflows.ts`, `src/services/student-workflows.ts`, allocation handlers; [Sprint 2 roadmap](#sprint2) |
| **Sprint 3 — Intermediate workflows** | Requirements, shortages, candidate ranking/bulk allocation, reports and Command Centre; timetable import/term/recurrence, notification and search, corrections/disputes/export; stronger validation, idempotency and query handling. Master approval arrived in late stabilisation. | `src/services/staffing-requirement-service.ts`, `reporting-service.ts`, `timetable-import-service.ts`, `command-centre-service.ts`; [Sprint 3 roadmap](#sprint3) |
| **Sprint 4 — Advanced workflows** | Shared Student/Tutor schedule ownership, mutual availability, bookings, Student sickness and Tutor swaps; scenario/version/lock/presence, audit/restore, deterministic proposals and comparison; existing permissions/rules reused. | `src/services/mutual-availability.ts`, `booking-service.ts`, `scenario-service.ts`, `swap-service.ts`, `audit-service.ts`, `proposal-service.ts`; [Sprint 4 roadmap](#sprint4-roadmap) |

The source register includes **120 HTTP operations** and **30 Prisma models** in the final supplied archive. Those are final-source counts, not Sprint 1 counts. [Browse every route](#api) · [Browse every model](#database) · [See complete feature origins](#features).

## A handwritten HTTP API

`src/server.ts` loads configuration and wires real dependencies. `src/app.ts` builds Express middleware and registers the **120 operations** in the supplied final Sprint 4 source. Feature services implement allocation, timesheet, timetable, overflow, reporting and other domain rules. Authentication modules verify access tokens; the database module provides Prisma/pg connectivity.

| Boundary | Job | Why it exists |
| --- | --- | --- |
| Middleware | Headers, CORS, JSON limits, rate limits and authentication | Apply common request protections consistently |
| Route | Parse input, select access policy, call a dependency, shape the response | Keep the HTTP contract explicit |
| Service / domain logic | Ownership, eligibility, state transitions, reports and retries | Enforce the same rules for every frontend or external client |
| Persistence | Prisma queries, selected SQL, constraints and transactions | Keep committed state consistent when requests compete |
| External adapters | Auth0 Management API and public holidays | Contain credentials and provider failures on the server |

This is not an automatically exposed database REST API. A new Prisma model does not automatically create a public endpoint. Every exposed operation is deliberately registered and guarded.

## Identity, roles and ownership

The verifier checks Auth0 RS256 signatures/JWKS, issuer, audience and token time/subject claims. Middleware resolves the Neon profile after authentication, detects conflicting known roles and rejects a mismatch. The three stored roles are `ORGANISER`, `TUTOR` and `STUDENT`.

Master routes require a resolved Organiser profile **and** the extra Auth0 `MASTER_ORGANIZER` privilege. The token's full Auth0 role list carries that capability; `Profile.role` does not gain a fourth value. An authenticated applicant can query their own application before they have a Profile.

Tutor and Student services derive the current owner from the verified subject. A path resource ID selects a record; it does not grant access to it. Organiser routes deliberately have broader administrative access. UI menu visibility is never the security boundary.

## Business rules and safe changes

Allocation eligibility keeps mark, timetable clash and selected-week capacity as separate hard checks. All required checks must pass; a strong mark cannot compensate for a real clash. A post-save candidate refresh can exclude the just-saved allocation so it does not clash with itself.

Timesheet and volunteer decisions enforce legal state transitions. Import/overflow creation use durable write receipts for selected retry-prone operations. A matching idempotency key/payload replays the recorded result; reusing the key with different content returns a conflict. This is not a promise that every POST endpoint supports that header. Bulk allocation commits have item-level outcomes. Sprint 4 Scenario publishing is a separate explicit workflow that rechecks the current draft/version and hard rules before live changes.

## Tutor sickness is already implemented

`Excuse` now stores review metadata, `absenceReason` and `occurrenceStatus`. A successful decision preserves the allocation and attendance history. Work-log eligibility reflects approved sickness.

The current helper uses Johannesburg calendar days: it returns `EXCUSED` when the request was submitted on a calendar day before the session starts **and** approval occurs before the session ends; otherwise it returns `SKIPPED`. This is more specific than the handbook's shorthand “in advance”. Student sickness is now implemented separately through `StudentSickNote`: an approved request before the booking starts releases active busy time as Excused, while an approval at/after the start is retained as Skipped history.

## Master approval crosses two systems

Approval checks the application is pending, calls Auth0 role provisioning, then uses a database transaction to claim the pending application and create/update the Organiser Profile. The database decision uses a pending-state condition to reject stale review attempts.

Auth0 and PostgreSQL are separate systems. The Auth0 grant occurs before the database transaction, so this is **not one atomic distributed transaction**. The final review should exercise provider failure, database failure after a grant, competing approve/reject and retry/reconciliation. A database transaction alone cannot roll back an Auth0 role change.

## Request limits and failure contract

The inspected source sets 120 requests/minute on `/api`, 10 sensitive authentication attempts per 15 minutes, and a 32 KiB JSON limit. It validates IDs, pagination and bounded result sizes. The stable public failure envelope is `{ error: { code, message } }`; internal SQL, stack traces and credentials are not intended client responses. See [API contracts](#api) for status meanings and copyable calls.
