## One project, separate running applications

Tutor MX is one integrated source repository containing several layers. **The frontend and backend are separate applications; they are not one file.** They communicate through HTTP. Sharing a repository makes the contracts, tests and migrations easier to coordinate, but does not put the database in the browser.

| Layer | Source / entry point | Runs where | Responsibility |
| --- | --- | --- | --- |
| Frontend | `frontend/src/main.jsx`, React screens and `frontend/src/api/` | User's browser; built assets served by Cloudflare Pages | Sign-in interface, role navigation, forms, calendars, accessible state and API calls |
| Backend | `src/server.ts` starts the service; `src/app.ts` registers routes | Node.js on Render | Validate tokens, resolve profiles, enforce roles/ownership, validate input and apply business rules |
| Persistence | `prisma/schema.prisma`, `prisma/migrations/`, `src/database.ts` | Prisma/pg inside the backend; PostgreSQL on Neon | Store related records, enforce constraints and execute transactions |
| Identity | Auth0 provider, verifier and server-side Management API adapter | Auth0 managed service | Identity, passwords, verified email and role claims |
| Documentation | This React/Vite project | Separate GitHub Pages website | Explain implementation, process, evidence and remaining work |

The documentation repository is separate from the Tutor MX application repository. This website displays documentation and safe schema evidence. It is not a second Tutor MX backend and does not contain production database credentials.

## How one request crosses the system

1. The browser downloads the compiled frontend from Cloudflare Pages.
2. Auth0 Universal Login handles authentication. React obtains an access token for the configured API audience.
3. The shared API helper calls the Render URL with `Authorization: Bearer …`.
4. Express checks the token, finds the matching `Profile.auth0Id`, resolves its application role and checks the route's required access.
5. A service validates ownership and business rules. Prisma/pg queries Neon. A protected Tutor request derives the Tutor from the verified identity, not a browser-supplied owner ID.
6. Express returns JSON or a deliberate CSV export. React updates its state and renders the result or a usable error.

Auth0 authenticates the person; Tutor MX authorises the action. A successful login does not automatically mean the person has an approved Organiser profile.

## The architecture style and its trade-offs

The backend is a **layered, handwritten Express service**, commonly described as a modular monolith. It has one deployable API process with route, authentication, service and persistence responsibilities. It is not a collection of independently deployed microservices. Services can share transaction boundaries and rules without network calls between internal modules.

The advantages are straightforward deployment, one permission contract and consistent allocation rules. The trade-off is that large route and bootstrap modules require discipline: `src/app.ts` and `src/server.ts` still contain substantial code. Extracting feature modules is a maintainability opportunity, not something this documentation pretends has already happened.

## Final Sprint 4 architecture

The 30 September handbook defined the Sprint 4 extension on top of the completed Sprint 3 baseline. The supplied final repository at **`361954e`** now contains the Student scheduling and Advanced Sprint 4 capabilities in the same application architecture.

The implementation reuses `TimeSlot`, recurrence, terms, exceptions, notifications and hard rules. Member 1 generalised schedule ownership; Member 2 added mutual availability and Scenarios; Member 3 added `TutoringBooking` and swaps; Member 4 added `StudentSickNote`; Member 5 added audit/restore; Member 6 added proposal intelligence. `Allocation` continues to mean Organiser-assigned staffing work. A Student booking does not become a payroll allocation.

See [the updated UML set](#diagrams), [the shared scheduling design](#student-scheduling) and [the current feature register](#features).
