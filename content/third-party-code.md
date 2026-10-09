## Third-party dependencies: design and accountability

Tutor MX relies on maintained third-party libraries and hosted services for general infrastructure, while the team implements the application-specific tutoring rules and **handwritten Express API**. This distinction satisfies the requirement to document and motivate third-party code without presenting dependency installation as original application logic. Packages listed here are **direct technology families and services**, not an exhaustive transitive dependency inventory; the pinned `package-lock.json` files remain the authoritative version record.

## Application and server libraries

| Technology | Used for | Why it was selected | Responsibility retained by the team |
| --- | --- | --- | --- |
| **React** | Student, Tutor, Organiser interfaces and reusable stateful components. | Reusable role pages, forms, calendars and testable interaction patterns. | Accessibility, API error feedback and application business workflows. |
| **Vite** | Frontend development and production asset bundling. | Lightweight local dev server and static Cloudflare build output. | Correct runtime/base-URL configuration and production validation. |
| **Node.js + Express** | Separately hosted handwritten HTTP API, middleware and routes. | Explicit control over contracts, permissions and business rules; meets the handwritten-API requirement. | All endpoint design, ownership checks, validation and domain logic. |
| **Prisma + PostgreSQL driver** | Data access, relational schema and migrations. | Source-controlled models, constraints and transaction/query support for Neon. | Schema design, safe migrations, prepared query usage and access policy. |
| **Auth0 SPA/server SDKs and token verification** | Login, account recovery and cryptographic token verification. | Established identity provider instead of custom password handling. | Tutor MX onboarding, role/ownership checks and protected server routes. |
| **Vitest and React Testing Library** | API/service tests and user-centred component tests. | Repeatable regression and coverage across both codebases. | Choosing meaningful assertions, fixtures, integration tests and reporting limits. |

The source package files and lockfiles in the application repository define which specific subpackages and versions are actually installed. Their inclusion does not establish that every upstream package was independently audited or that all transitive licences are identical.

## Infrastructure and operational services

| Provider | Role and integration boundary | Design reason and reliability consideration |
| --- | --- | --- |
| **Gitea + Actions** | Official source repository, Member branches, issue/project boards and CI on shared runners. | Reviewable history and per-commit checks. Queued jobs await lecturer-runner capacity. |
| **GitHub mirror + GitHub Pages** | Approved application deployment mirror and separately hosted public documentation. | Keeps documentation openly accessible. GitHub is not the official Tutor MX development history. |
| **Cloudflare Pages** | Static hosting for built React/Vite frontend. | Browser assets can deploy independently from the Express service. Public `VITE_*` values are compiled into the bundle. |
| **Render** | Hosts Node.js/Express API process, secrets and external health/readiness endpoints. | API is publicly addressable without exposing source database credentials. Free-tier wake time affects first-response measurements. |
| **Neon PostgreSQL** | Managed transactional database accessed by Prisma from Express. | Relational integrity and persistent workflow history; browser has no direct database connection. |
| **Auth0** | User identities, verified token issuance and privileged Organiser approvals. | Identity is outsourced; a failed cross-provider approval is not automatically atomic with Neon. |
| **Codecov** | Displays coverage files from completed tests and links percentage to a commit. | Helps locate unexecuted code; does **not** itself execute the tests or prove product correctness. |

## External public-holiday API

Tutor MX integrates the **Nager.Date** South African holiday service as supporting scheduling information. Sprint 1 established a proof of concept and failure requirements; Sprint 2 added the backend adapter and fallback; Sprints 3 and 4 reused the result within the same scheduling system. The browser calls the Tutor MX holiday route, not the provider; only the requested country/year is relevant to the provider, and user tokens/database records should never be forwarded.

The adapter validates provider data, enforces a timeout and a bounded successful cache, and returns a clear fallback when unavailable. **Observation:** this satisfies the requirement for cohesive external integration because holiday context is useful in a real scheduling workflow, while provider downtime is prevented from blocking core actions. [Holiday integration and error flow](#integration) · [Nager.Date documentation](https://date.nager.at/Api).

## Reuse, licences, data boundaries and testing

- **Reuse boundary.** Vendor code provides rendering, routing utilities, identity, storage and test infrastructure; Tutor MX owns course eligibility, clash/hour rules, timesheet states, booking, audit, scenario and proposal decisions.
- **Licence/version evidence.** The team maintains dependencies through package manifests and lockfiles. Upstream licences and current provider terms must be checked from the specific installed versions and provider agreements rather than guessed from the package family.
- **Privacy and credentials.** Only the server accesses Neon and privileged Auth0 Management credentials. Screenshots, public assets and issues must be redacted.
- **Operational failure.** Auth0 login failure, Neon unavailability, Render wake/failure and holiday-provider timeout have different user effects; adapter/route mocks and hosted smoke checks cover different boundaries.
- **AI assistance.** Generated code must be reviewed and tested, with actual tool, model and purpose attributed under the course's AI policy. AI use is not a third-party runtime service and should not be misrepresented as an installed dependency.

This register is an engineering explanation of the selected dependencies; a complete **auditable third-party bill of materials** would additionally require a pinned dependency export with licence/terms verification for each resolved package. [Source downloads](#references) · [Testing](#testing) · [Deployment](#deployment).
