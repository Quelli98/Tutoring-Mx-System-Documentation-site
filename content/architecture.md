## Architecture at a glance

Tutor MX uses a **separately deployed React/Vite single-page frontend** and a **handwritten Node.js/Express HTTP backend**. Auth0 manages identities; Express validates bearer tokens and applies application-specific permissions; Prisma accesses Neon PostgreSQL. Gitea `main` is the official integrated codebase, while Cloudflare Pages and Render host the independently running browser application and API. The public documentation website is a separate static publication, not the Tutor MX application or an API server.

**Architectural decision.** The React application handles presentation and user interaction, while Express owns rules, authorisation and writes. This directly addresses the project brief's non-monolithic frontend/backend and handwritten-API requirements. The frontend cannot bypass mark, timetable-clash or hour-capacity rules by changing a form or URL. [API contracts](#api) · [Database and ERD](#database) · [Security](#security).

## Architecture diagram and request flow

![Tutor MX deployed components and their trust boundaries](diagrams/deployment.svg)

The deployment diagram distinguishes five responsibilities: the browser renders the Cloudflare-served frontend; Auth0 authenticates users; Render hosts the Express API; Prisma is the backend's data-access layer; and Neon stores persistent relations. Browser-to-API traffic crosses an HTTP trust boundary, so the API independently verifies identity and permissions. Backend database credentials and Auth0 Management credentials are never sent to React.

A typical allocation request takes this path:

1. An Organiser signs in using Auth0 and opens the React allocation board.
2. React calls the protected Express endpoint with an access token and proposed allocation details.
3. The API verifies the token, resolves the Organiser role, validates course/Tutor/time inputs and checks marks, clashes and selected-week capacity.
4. The API performs the allowed write through Prisma/Neon and returns a JSON result or a controlled error.
5. React refreshes the affected allocation, timetable and workload displays from the server response.

**Interpretation:** the same business constraints are applied regardless of whether the request originates from the UI or an external HTTP client. The sequence illustrates architectural responsibility, not a claim that every HTTP response has a measured latency.

## Four-sprint architectural evolution

| Sprint and tier | What was established or extended | Why this mattered | Supporting material |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | Role-based React navigation; Auth0 sign-up and onboarding; separate Express server with `/health`; role-checked core routes; Prisma schema/migrations for profiles, courses, marks, capacity, availability and allocation foundations; initial CI and deployment. | Created the required independently hosted frontend/backend and a single authentication and database boundary rather than a browser-to-database shortcut. Some Student and allocation actions were still mock/placeholder flows. | [Sprint 1 roadmap](#sprint1) · [Handbook pp. 13–20](documents/tutor-mx-handbook-30-september-2026.pdf#page=13) |
| **Sprint 2 — Basic** | Real allocation create/edit/remove, Student open-work and volunteer writes, Tutor timesheet submission, Organiser approvals, persisted status and transition rules; production public-holiday adapter and more complete cross-role security tests. | Replaced Basic prototypes with persistent workflows that share the Sprint 1 API and data model. | [Sprint 2 roadmap](#sprint2) · [Handbook pp. 21–29](documents/tutor-mx-handbook-30-september-2026.pdf#page=21) |
| **Sprint 3 — Intermediate** | Notifications and secure search, staffing demand/ranking, bulk allocation, budget/workload/report data, CSV/ICS timetable import with academic terms, timesheet corrections/disputes/export, overflow management, Command Centre, and API limits/idempotency/race hardening. Late stabilisation added shared timetable improvements and Master Organiser approval. | Added operational depth without rewriting the Core API or duplicating calendars, allocations or identity flows. | [Sprint 3 roadmap](#sprint3) · [Work tracker](#work-tracker) |
| **Sprint 4 — Advanced** | Shared Student/Tutor `TimeSlot` ownership, mutual availability and booking, Student sickness, Tutor swaps, draft scenarios with locks/versions, audit/restore, whole-school explainable proposals and strategy comparison. | Extended the same scheduling/eligibility services into more complex cross-role transactions while protecting existing Basic and Intermediate behaviour. | [Sprint 4 roadmap](#sprint4-roadmap) · [Feature register](#features) |

The September handbook was a plan and baseline audit; the implementation register and final-source catalogue record the resulting delivered code. A planned feature is not evidence of a successful deployed user journey unless accompanied by source, tests and/or a demonstration.

## Component responsibilities and rationale

| Boundary | Implemented responsibility | Design implication |
| --- | --- | --- |
| **React/Vite on Cloudflare** | Student, Tutor, Organiser and additional Master Organiser administration screens, calendars, tables, form validation feedback and error/loading states. | One reusable frontend; backend never trusts the visible role navigation as security. |
| **Auth0** | Universal Login, password recovery, verification and identity/role claims. | Avoids implementing password storage and cryptographic login ourselves. |
| **Handwritten Express on Render** | HTTP route contracts, middleware, ownership checks, business/domain services, external integration and safe errors. | Satisfies handwritten API criterion; database models do not automatically become public endpoints. |
| **Prisma + Neon PostgreSQL** | Relational models, migrations, constraints and transactional state. | Source-controlled schema and predictable linked records for assignments, timesheets, booking and audit. |
| **Gitea Actions + Codecov** | Branch and main CI, automated test reporting, coverage evidence and review gates. | Links quality checks to reviewed source rather than relying on unverified developer statements. |

## Architectural trade-offs and limitations

The Express API is a **modular application**, not a collection of independent microservices. That reduces deployment complexity and keeps related tutoring rules close together, but it requires discipline to avoid tightly coupling route handlers to database queries. Domain services and shared validators mitigate that risk. The Auth0 role grant and Neon database transaction are separate operations; Organiser approval needs failure handling and reconciliation rather than assuming one atomic transaction spans both providers. Confirmed bookings are scheduling appointments and do not replace Organiser-assigned `Allocation` records for workload/payroll. 

**Verification against the final rubric:** non-monolithic components are documented above; the 120-operation inventory provides the source-derived API design record; the 30-model dictionary/ERD documents persistent structure; [Testing](#testing) analyses dated coverage, accessibility and performance results; and [Deployment](#deployment) connects release SHA, public probes and hosted services. These are distinct forms of evidence and should not be treated as interchangeable.
