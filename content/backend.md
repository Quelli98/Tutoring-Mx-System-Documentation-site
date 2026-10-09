## What the backend does — and why Tutor MX needs it

The backend is the server-side part of Tutor MX. **React is what a Student, Tutor or Organiser sees; the backend decides whether each requested action is allowed, carries out the work and saves it.** Without that boundary, somebody could bypass a disabled button and make an invalid allocation or read another user's records.

Tutor MX uses a **handwritten Node.js/Express HTTP API**, separate from its React/Vite frontend. Express runs on Render; Prisma accesses PostgreSQL on Neon; Auth0 verifies identity. This layered design is required by the project brief, which asks for a non-monolithic frontend/backend and a deliberately designed API rather than an automatically generated database API.

## How the backend was developed over four sprints

| Sprint | Backend work | What became possible for users | Evidence to follow |
| --- | --- | --- | --- |
| **1 — Foundation** | Server startup and `/health`; bearer-token verification; secure Profile, course, Tutor and own-dashboard routes; mark/clash/hour validators; initial Prisma migrations. | Sign-in, course/Tutor management, safe rule preview and Tutor forms, with the Student overflow mock clearly identified. | [Sprint 1 roadmap](#sprint1) |
| **2 — Basic workflows** | Real allocation writes; timesheet submit/review; Student volunteer persistence and approval; 401/403/409 handling; role-ownership and database-state checks; holiday adapter. | Complete end-to-end allocation, approval, Student volunteering and Tutor timesheets. | [Sprint 2 roadmap](#sprint2) |
| **3 — Intermediate workflows** | Staffing requirements, rankings, bulk assignments, reporting and Command Centre; import/recurrence/terms, timesheet revision/dispute/export, notifications/search and safer retry/concurrency paths. Master approval arrived in late stabilisation. | Operations, staffing and finance information across more complex workflows. | [Sprint 3 roadmap](#sprint3) |
| **4 — Advanced workflows** | Shared Student/Tutor schedule ownership, mutual availability, booking and Student sick notes, Tutor swaps, scenario/version/lock checks, audit/restore and deterministic proposal services. | Both-party bookings and safely previewed/reviewed advanced staffing decisions, without replacing original allocation rules. | [Sprint 4 roadmap](#sprint4-roadmap) |

The source inventory of the supplied final application contains **120 registered HTTP operations** and **30 Prisma application models**. Those are whole-project totals, **not** measurements of Sprint 1. [Browse the route inventory](#api) · [View the full schema](#database).

## One request through the system — a concrete example

Consider an Organiser assigning a Tutor to a course:

1. The **React frontend** sends the chosen course, Tutor and session details to a deliberate Express route.
2. **Auth0 verification and Express authorisation** check the signed-in user and require the Organiser role.
3. The **business service** checks the Tutor's mark threshold, timetable clash and remaining selected-week work capacity. Passing one rule does not compensate for failing another.
4. **Prisma/PostgreSQL** commits a valid allocation or returns an appropriate error/conflict without making a partial invalid change.
5. The **frontend** displays the result; the Tutor dashboard refreshes from the server. A stale or rejected request receives a usable error message rather than silently pretending it was saved.

This is why the app does not let the browser write directly to Neon. The same security and allocation rules apply to the Organiser UI and to an authorised external HTTP client.

## How the source is organised

| Layer in the application | Representative source | Responsibility |
| --- | --- | --- |
| Server startup | `src/server.ts`, `src/app.ts` | Build the Express service, register routes/middleware and expose health/readiness checks. |
| Authentication and authorisation | `src/auth/`, route guards | Verify Auth0 tokens and linked roles, then check ownership and Master privilege. |
| Routes and request handling | `src/app.ts` and associated route handlers | Parse input, choose the correct service and return a meaningful HTTP response. |
| Business services | `src/services/` | Implement eligibility, allocation, timesheets, timetable, booking, reviews, audit and proposals. |
| Persistence | `src/database.ts`, `prisma/schema.prisma`, `prisma/migrations/` | Query relational data, enforce constraints and manage transactional state. |
| External integration | `src/integrations/public-holidays.ts` | Retrieve relevant holiday information with a controlled fallback without exposing private credentials. |

This is a **modular Express service**, not independently deployed microservices. The large route-composition file is a maintainability trade-off; the domain services and documented endpoint inventory make its boundaries easier to inspect. [Architecture](#architecture).

## Identity and security — who may change what?

Auth0 owns sign-in and password recovery; Express verifies token signature/issuer/audience and resolves the linked database `Profile`. `Profile.role` represents **STUDENT**, **TUTOR** or **ORGANISER**. A trusted Master Organiser additionally holds the Auth0 `MASTER_ORGANIZER` privilege. A Student or Tutor is authorised to access their **own** records; Organisers may perform the defined school administration tasks. The backend still checks access when somebody changes a URL or calls curl directly.

**Examples:** a Tutor cannot read another Tutor's dashboard by changing an ID; a Student sees mutually free appointment times without viewing a Tutor's private class name; a normal Organiser cannot approve lecturer registration. [How each role uses the finished app](#student-scheduling) · [Security and roles](#security).

## Protecting data when requests fail or compete

The project brief assesses correctness, API design and reliability — not simply whether screens exist. Important safeguards introduced and extended across the sprints include:

- **Allocation rules:** independent marks, overlapping-time and weekly-capacity checks, repeated on the server before saving. Saved allocations are excluded from their own post-save clash check.
- **Workflow transitions:** timesheets, volunteer claims, Tutor excuses and Student sick notes have permitted states. A stale or duplicate decision is rejected safely.
- **Transactions and concurrency:** booking creation rechecks mutual time; Scenario Publish validates versions, locks and hard rules; Tutor swaps recheck replacement eligibility.
- **History:** audit/restore creates a new recorded change, rather than pretending the earlier state never existed. Cancelled bookings and approved/rejected requests retain an explainable record.
- **Boundary with external providers:** approval may touch both Auth0 and PostgreSQL; those are not one atomic database transaction and must be handled/reconciled as separate failure points.
- **Safe errors and limits:** the API returns appropriate 4xx/5xx codes, avoids disclosing SQL/secrets, and bounds sensitive or large requests. See the [response-code guide](#api).

## Deployment, testing and rubric evidence

The public API is hosted separately at [Render](https://tutor-mx-api.onrender.com/health), so a marker can call health/readiness endpoints independently of the React website. Protected routes require a legitimate Auth0 access token. The [API and curl chapter](#api) demonstrates exactly how to check this, and the [deployment chapter](#deployment) explains Render, Cloudflare Pages, Auth0 and Neon.

| Rubric expectation | Where this backend contributes | Evidence to inspect |
| --- | --- | --- |
| **Handwritten, available API** (all-project requirement; Sprints 2–4) | Explicit routes and HTTP methods rather than database-generated endpoints. | [API inventory, curl examples and external checks](#api) |
| **Database structure, deployment and data** (Sprint 2/4) | Prisma models, migrations, constraints and Neon persistence. | [Database dictionary, ERD and dated screenshots](#database) |
| **Security and quality** (Sprint 1–4) | Authentication, ownership, illegal-state and race protections. | [Security](#security) · [Testing/Codecov](#testing) |
| **Performance and deployment** (Sprint 3/4) | Hosted health/readiness, request limits, performance checks. | [Testing/performance](#testing) · [Deployment](#deployment) |
| **Scope and methods** (all milestones) | Features were extended, reviewed and re-tested over successive sprints. | [Four sprint roadmaps](#roadmap) · [Work tracker](#work-tracker) |

**Evidence limitation:** documented acceptance checks describe what the software *should* do. Screenshots and completed test logs prove only their recorded scope and date; they do not automatically prove every live scenario was retested. Final-release user-feedback analysis remains the remaining documentation section. [Final rubric mapping](#milestone4).
