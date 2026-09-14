# Tutor Mx System

Tutor Mx is a tutoring-management system built around a handwritten Node.js and Express API, Prisma migrations, and Neon PostgreSQL. Browser code must call the Express API; it must never connect directly to Neon or receive external-service credentials.

The integrated Sprint 2 source contains the Basic workflow database, safe demo data, allocation queries and mutations, organiser/Tutor/Student workflow routes, the production public-holiday adapter, PostgreSQL verification, deployment smoke tooling, and Gitea Actions quality gates.

## Requirements

- Node.js 24
- npm 11 or later
- PostgreSQL 17 for real database verification (Neon is used by deployed environments)

## Local setup

1. Copy `.env.example` to `.env` and replace the local `DATABASE_URL` placeholder.
2. Install dependencies with `npm ci`.
3. Generate the Prisma client with `npm run generate`.
4. Apply migrations with `npm run db:migrate`.
5. Load non-personal demo records with `npm run db:seed`.
6. Start the API with `npm run dev`.

For a disposable development database, `npm run db:reset` rebuilds the schema and then runs the explicit Prisma 7 seed command. Do not run a reset against shared or production data.

## Automated checks

| Command | Purpose |
| --- | --- |
| `npm test` | Unit tests plus in-memory PostgreSQL migration, constraint, seed and query tests |
| `npm run coverage` | Backend tests with HTML and LCOV coverage |
| `npm run db:verify` | Real PostgreSQL checks for migrations, seed cases, constraints and allocation queries |
| `npm run lint` | TypeScript lint checks |
| `npm run typecheck` | Strict TypeScript checks |
| `npm run build` | Production TypeScript build |
| `npm run security:check` | Reject tracked environment files/common secrets and verify AI attribution |
| `npm run check` | Complete local quality rehearsal except the real database check |
| `SMOKE_BASE_URL=https://... npm run smoke` | Verify deployed `/health` and `/ready` responses |

## Basic database workflow

The Prisma schema and ordered SQL migrations provide profiles/roles, courses, marks, time slots, weekly limits, allocations, work logs, timesheets, excuses, overflow work, and volunteer claims.

PostgreSQL enforces:

- primary, foreign, compound ownership and uniqueness relationships;
- tutor/student/organiser role relationships;
- mark, time-period and hour ranges;
- one claim per student/work item and at most one accepted claim per work item;
- allocation, timesheet, excuse, overflow and volunteer status transitions;
- draft/returned timesheet editing and weekly work-log limits;
- query indexes for dashboards, allocation candidates and open-work boards.

`prisma/seed.sql` uses only reserved `*.example` addresses and `demo|...` identifiers. It includes eligible, low-mark, clash, hour-limit, open-work and closed-work cases and is safe to rerun.

## Member 6 query handoff

`src/services/allocation-queries.ts` exports parameterised queries for:

- allocation candidates with marks, clashes, used/remaining hours and stable reason codes;
- a tutor's weekly used/remaining hours;
- the student-safe open-work projection.

Member 5 can call these functions with the exported `queryClient` from `src/database.ts`. Member 5 remains responsible for authentication, role/ownership middleware, transactions and HTTP routes.

## External public-holiday integration

`src/integrations/public-holidays.ts` is server-only. It provides timeout cancellation, safe response decoding, caching/freshness behaviour and controlled fallback reasons for invalid payloads, rate limits, upstream unavailability, HTTP failures and network errors. Express exposes only the approved Tutor MX response; browser code does not call the provider directly.

Unit tests mock the upstream response and time so test reliability does not depend on the live provider. Before assessment, the public API documentation must also identify the provider, terms/rate limits, exact hosted route and a dated success-or-fallback smoke result.

## CI, coverage and deployment

`.gitea/workflows/ci.yml` runs backend and frontend quality/coverage plus a clean PostgreSQL migration, seed, constraint/query verification and local API smoke. Coverage is uploaded under separate `backend` and `frontend` flags. The shared lecturer runners may queue; wait for completion and retain the run link/status.

The GitHub deployment mirror runs supplementary quality and PostgreSQL smoke jobs and uploads the two reports to Codecov. `.gitea/workflows/deployment-smoke.yml` verifies deployed health when its administrator-managed URL is configured. No secret belongs in the repository, and Gitea main remains the official source of truth.

See `docs/member-6-handoff.md` for completed evidence and dependency-owned follow-ups.

## AI declaration

This repository makes use of AI code generation using the following tools: Codex[GPT-5].

This repository does not use AI in-line editing tools.

This repository makes use of AI code-review using the following tools: Codex[GPT-5].

The preceding document was generated and reviewed with the assistance of the following: Codex[GPT-5].
