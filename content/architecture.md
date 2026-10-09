## Tutor MX architecture — built incrementally from Sprint 1 to Sprint 4

Tutor MX is one system with **separate, independently running frontend and backend applications** inside the application repository. React renders the UI in the browser, a handwritten Express API enforces identity, ownership and business rules, Prisma accesses PostgreSQL on Neon, and Auth0 provides identity. The frontend is deployed through Cloudflare Pages and the backend through Render. This GitHub Pages documentation website is a different repository and a separate static website.

The **original architecture was introduced in Sprint 1 and extended, not replaced, through Sprint 4**. The final source still uses the same API boundary, underlying roles, database and deployment shape. See the [full four-sprint feature register](#features) and [roadmap index](#roadmap).

## Evolution of the engineering architecture

| Sprint | Architectural milestone | Components and important decisions | Review reference |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Decouple browser, API, identity and storage. | React/Vite entry and role pages; Auth0 Universal Login; protected Express routes and `/health`; `Profile`, course, marks, availability, allocations and initial migrations; Gitea and first deployment. | [Sprint 1](#sprint1) · [Security](#security) |
| **Sprint 2 — complete Basic journeys** | Replace placeholders with persisted, guarded actions. | Real allocation writes and approvals; live Student overflow and volunteer outcomes; timesheet/absence state transitions; role/ownership checks, database constraints, holiday adapter and stable HTTP errors. | [Sprint 2](#sprint2) · [API](#api) |
| **Sprint 3 — Intermediate operations** | Extend the shared domain, reporting and operational safeguards. | Staffing requirements, shortage/ranking/bulk allocation, Command Centre, notifications/search, timetable import/terms/exceptions, timesheet corrections/payroll, overflow management, idempotency and transaction checks. Late stabilisation added the Master Organiser approval workflow. | [Sprint 3](#sprint3) · [Testing](#testing) |
| **Sprint 4 — Advanced completion** | Reuse existing services for collaborative planning and Student appointments. | Profile-owned shared TimeSlot, mutual availability, bookings and Student sick notes; scenarios, optimistic concurrency, swaps, audit/restore, proposal presets and explanations. No second Student timetable engine or database service was created. | [Sprint 4](#sprint4-roadmap) · [Scheduling](#student-scheduling) |

The handbook's **30 September snapshot** predates the later Sprint 4 implementation. The supplied **7 October source** includes the subsequent features. Where a story crosses multiple sprints, the register identifies its foundation and later extensions rather than attributing the whole system to Sprint 4.

## Final running components and trust boundaries

| Layer | Representative source | Execution location | Role across Sprints 1–4 |
| --- | --- | --- | --- |
| React/Vite frontend | `frontend/src/main.jsx`, `frontend/src/routes/`, `frontend/src/features/`, `frontend/src/api/` | Browser; static assets on Cloudflare Pages | Role-aware screens, status messages, calendars, accessible actions and API requests |
| Auth0 | `frontend/src/auth/`, `src/auth/` | Managed identity provider + verified server tokens | Passwords, email verification, bearer identity and privileged Organiser role claims |
| Handwritten Node/Express API | `src/server.ts`, `src/app.ts`, `src/http/` | Render-hosted Node process | HTTP validation, authentication, permissions, safe responses and rate limiting |
| Business services | `src/services/` | Render server | Mark/clash/capacity, allocation, work logs, timesheets, scheduling, proposals and audit; shared across every UI |
| Persistence | `src/database.ts`, `prisma/schema.prisma`, `prisma/migrations/` | Prisma on server, PostgreSQL on Neon | Relations, transactions, workflow statuses, history, constraints and migrations |
| External integration | `src/integrations/public-holidays.ts` | Render server → external provider | South African holiday data and safe cached/fallback responses |
| CI and delivery | Gitea Actions, Codecov, Cloudflare, Render | Build and deployment systems | Tests, coverage, reviews, merge checks and release evidence throughout the four sprints |
| Documentation | This website | GitHub Pages | Canonical explanations, original sprint stories, rubrics and public artefacts |

**Security boundary:** a browser never accesses Prisma/Neon or the Auth0 Management API directly. The Express API verifies tokens and permissions *before* accessing protected records. A logged-in Student cannot obtain private Tutor event labels through mutual availability.

## Example request paths — foundation through advanced

1. **Sprint 1 sign-in:** a Tutor registers in Auth0; Express links their authenticated subject to a `Profile`, then the frontend opens the authorised Tutor dashboard using `/api/me`.
2. **Sprint 2 allocation:** an Organiser selects a Tutor; React sends the action to Express, which rechecks the mark, time overlap and weekly hours, then saves through Prisma. Tutor summaries refresh from the server.
3. **Sprint 3 timetable/import:** the Tutor previews CSV/ICS entries; backend import and recurrence services validate terms, duplicates and exception handling against the existing TimeSlot design.
4. **Sprint 4 booking:** a Student views mutually free intervals calculated by Express; booking rechecks the time inside the mutation, persists `TutoringBooking`, then both Student and Tutor calendar projections refresh.
5. **Sprint 4 proposal:** the Organiser compares deterministic proposals based on staffing requirements and the **same existing hard rules**. Saving creates a draft Scenario; only explicit, revalidated Publish changes live allocations.

## Backend style: modular monolith, not microservices

The API is one deployable Node/Express service with multiple domain modules. Its design is **layered/modular**, not a set of separately deployed microservices and not a generated database REST interface. A single service helps enforce shared allocation rules and transactional updates; its large route composition (`src/app.ts`) remains a maintainability trade-off.

Auth0 authenticates; the Tutor MX API authorises. `MASTER_ORGANIZER` is an extra **Auth0 permission held by an Organiser**, not a fourth stored `Profile.role`. Auth0 provisioning plus a Neon write is not one distributed transaction, so failure/retry/reconciliation must be tested.

See [Frontend across four sprints](#frontend), [Backend across four sprints](#backend), [database dictionary and ERD](#database), [UML diagrams](#diagrams), [deployment](#deployment) and [every sprint's issues](#work-tracker).
