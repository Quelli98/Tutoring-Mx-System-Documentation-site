## A handwritten HTTP API

`src/server.ts` loads configuration and wires real dependencies. `src/app.ts` builds Express middleware and registers the 82 operations in the current source archive. Feature services implement allocation, timesheet, timetable, overflow, reporting and other domain rules. Authentication modules verify access tokens; the database module provides Prisma/pg connectivity.

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

Timesheet and volunteer decisions enforce legal state transitions. Import/overflow creation use durable write receipts for selected retry-prone operations. A matching idempotency key/payload replays the recorded result; reusing the key with different content returns a conflict. This is not a promise that every POST endpoint supports that header. Bulk allocation commits have item-level outcomes; they are not the future scenario all-or-nothing publish workflow.

## Tutor sickness is already implemented

`Excuse` now stores review metadata, `absenceReason` and `occurrenceStatus`. A successful decision preserves the allocation and attendance history. Work-log eligibility reflects approved sickness.

The current helper uses Johannesburg calendar days: it returns `EXCUSED` when the request was submitted on a calendar day before the session starts **and** approval occurs before the session ends; otherwise it returns `SKIPPED`. This is more specific than the handbook's shorthand “in advance”. Student sickness remains a Sprint 4 target and must define/test its timing boundary when implemented.

## Master approval crosses two systems

Approval checks the application is pending, calls Auth0 role provisioning, then uses a database transaction to claim the pending application and create/update the Organiser Profile. The database decision uses a pending-state condition to reject stale review attempts.

Auth0 and PostgreSQL are separate systems. The Auth0 grant occurs before the database transaction, so this is **not one atomic distributed transaction**. The final review should exercise provider failure, database failure after a grant, competing approve/reject and retry/reconciliation. A database transaction alone cannot roll back an Auth0 role change.

## Request limits and failure contract

The inspected source sets 120 requests/minute on `/api`, 10 sensitive authentication attempts per 15 minutes, and a 32 KiB JSON limit. It validates IDs, pagination and bounded result sizes. The stable public failure envelope is `{ error: { code, message } }`; internal SQL, stack traces and credentials are not intended client responses. See [API contracts](#api) for status meanings and copyable calls.
