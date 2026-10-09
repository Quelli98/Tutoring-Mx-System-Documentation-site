## Identity and authorisation design across all four sprints

Tutor MX delegates authentication to **Auth0** and implements application authorisation in its own **Express API**. Authentication establishes *who* is making the request; authorisation decides *which Tutor MX records and actions* that person may use. The database stores a `Profile` with one normal role (`STUDENT`, `TUTOR` or `ORGANISER`) associated with the verified identity. A trusted Master Organiser is an Organiser with an additional `MASTER_ORGANIZER` Auth0 permission, not a public fourth registration role.

This arrangement addresses the brief's account creation, sign-in, password recovery and deletion requirements without implementing custom password storage. It also prevents users from gaining permission merely by typing a protected URL or changing a record ID. [Role journeys](#student-scheduling) · [API](#api).

## Authentication and security evolved with the product

| Sprint | Control developed or hardened | What it protects |
| --- | --- | --- |
| **1** | Auth0 onboarding, one saved role/Profile, API bearer verification, protected React routing, self-owned Tutor data and safe errors. | Core signed-in identities and the boundary between browser and database. |
| **2** | Reset/delete/email-verification recovery, route-to-role/ownership audit, cross-role tests and duplicate/status conflict protection. | The now-persisted Student volunteering, allocations and approval workflows. |
| **3** | Search and notification permission filtering, safer API pagination/input limits, selected idempotent writes and concurrency tests; Master Organiser pending application approval added in stabilisation. | New reports/import/bulk operations, private record discovery and authorised lecturer registration. |
| **4** | Stale-token and removed-target handling, Student/Tutor timetable and booking ownership, Scenario versions/locks, swap/approval checks and redacted audit. | Interacting users and competing state changes in advanced workflows. |

## Role and permission matrix

| Action | Student | Tutor | Organiser | Trusted Master Organiser |
| --- | --- | --- | --- | --- |
| View own profile/timetable | Own only | Own only | Own relevant Organiser data | Organiser permissions |
| Volunteer for unfilled work | Own claims | No | Review/manage workflow | Organiser permissions |
| Submit timesheet/excuse | No | Own records | Review decisions | Organiser permissions |
| Book tutoring and submit Student sick note | Own booking | View own relevant bookings | Review sickness decisions | Organiser permissions |
| Manage courses, allocations, bulk, reports, scenarios | No | No | Yes, under API rules | Yes |
| Approve lecturer Organiser registration | No | No | No | **Yes, with extra Auth0 permission** |

These are the intended role boundaries in the handbook and source implementation; the complete protected-route inventory is in [API & curl reference](#api). A hidden React menu item is only a usability measure. Permission enforcement is the server's responsibility.

## How security is enforced

1. Auth0 issues tokens for the configured issuer and API audience, with validated signature and expiry.
2. Express verifies the token and resolves the linked application profile and permissions.
3. Route middleware checks the required role; services check specific resource ownership and legal state transitions.
4. Prisma executes permitted database operations under constraints and transactions where necessary.
5. The API returns normal JSON or a safe error shape. A `401` describes missing/invalid authentication; `403` describes a signed-in user without permission; `409` is appropriate to conflicting/stale writes.

**Design observation:** this means a user with a valid token cannot automatically read or change another user's records, and concurrent actions cannot be validated solely against an old React screen state. Test evidence must include permission failures and competing-request cases, not only happy paths.

## Master Organiser is a privilege, not a table or ordinary role

A lecturer's request is stored as `OrganiserApplication` in `PENDING` status. Approval requires an authorised `ORGANISER` user with the additional trusted `MASTER_ORGANIZER` Auth0 privilege. The backend provisions the role using server-only Auth0 credentials and creates/links the Organiser `Profile`; the application records the reviewer and decision. Rejection retains the application outcome without granting the Organiser role. These are two external systems (Auth0 and Neon), so provider failures and retries require explicit handling; a PostgreSQL transaction cannot roll back an Auth0 role grant.

## Secrets, browser state and failure handling

Production `DATABASE_URL` and Auth0 Management credentials belong only to Render's backend environment. Only intended public `VITE_*` configuration is embedded in the frontend build. The final frontend uses Auth0 local-storage caching; cached state does **not** override server expiry, revocation or role verification. Avoid including credentials, access tokens or real user data in documentation screenshots or Git history. Returned errors must not expose stacks, SQL queries or service secrets.

## Evidence and limitations

Relevant evidence includes the final role inventory screenshot, API wrong-role tests, account lifecycle tests, Student/Tutor ownership cases, Master approval/rejection checks, secret scanning and completed CI results. An Auth0 dashboard screenshot demonstrates configured roles but **not** successful protection of every endpoint; the automated permission suite and role-specific browser checks provide that additional proof. [Testing evidence](#testing) · [Gitea Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions).
