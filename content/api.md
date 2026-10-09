## Start here — what is an API?

An **Application Programming Interface (API)** is the agreed way one program asks another program for information or actions. In Tutor MX, the **React frontend** sends HTTP requests to a separately hosted **Node.js/Express backend**. The backend checks identity, validates the request, applies tutoring/allocation rules and reads or updates Neon PostgreSQL through Prisma. It sends a structured HTTP response back to the screen.

**Why the marker should care:** the course brief requires a **handwritten, externally usable HTTP API**, not an automatically generated database endpoint. This page shows the actual public address, explains authentication and HTTP methods, gives safe copyable checks, and provides a searchable inventory of all **120 operations** in the supplied final source.

| Component | Address or responsibility | What it is **not** |
| --- | --- | --- |
| **Public API (Render)** | `https://tutor-mx-api.onrender.com` | Not the React frontend or documentation site |
| **Application frontend (Cloudflare)** | [Open Tutor MX](https://tutor-mx.pages.dev) | Does not directly query PostgreSQL |
| **Documentation (GitHub Pages)** | This site and the route catalogue below | Does not authenticate on behalf of its readers |
| **Neon PostgreSQL** | Private persistence reached only by the backend | Not publicly accessible with a marker's browser URL |

The API was introduced in **Sprint 1** and extended in **Sprints 2, 3 and 4**. [Backend explanation](#backend) · [Four-sprint roadmap](#roadmap).

## 1. First external test — no sign-in needed

Open **Windows PowerShell**. Use `curl.exe` rather than PowerShell's `curl` alias so the example is reproducible:

```powershell
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/health
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/ready
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/api/tutors
```

These commands deliberately perform **read-only HTTP GET requests**:

| Endpoint | Expected result when healthy | What that result tells us |
| --- | --- | --- |
| `GET /health` | HTTP **200**, e.g. `{"status":"ok"}` | The independently deployed Express process is reachable from outside the app. |
| `GET /ready` | HTTP **200** with database readiness information | The API's configured readiness/database check succeeded at that moment. |
| `GET /api/tutors` **without** a token | HTTP **401** | The Organiser's protected Tutor list is not exposed to an anonymous caller. |

A 200 response is a **point-in-time check**, not proof of permanent uptime, exact production data counts, all migrations or every protected workflow. Render may respond slowly to an initial cold request. The [testing chapter](#testing) separates dated measurements from conclusions about the code.

## 2. Authentication — why some curl commands return 401

Tutor MX uses **Auth0** for account identity. After signing in to the application, React obtains an **access token for the API audience** and sends it in the `Authorization` header. Express verifies the token and checks the linked `Profile` role and ownership before returning protected data. An **ID token is not an API bearer token**; an Auth0 Management token or Neon password must never be substituted.

For a permitted **test account**, use the access token from an authorised application request in your own browser's developer tools. Never place a real token in this public site, screenshots, a Git commit or a shared recording. It expires and must be refreshed as appropriate.

**PowerShell example for an authorised tester** (the token is entered privately in the local terminal):

```powershell
$api = 'https://tutor-mx-api.onrender.com'
$token = Read-Host 'Paste YOUR approved test account API access token'
curl.exe --max-time 90 -i -H "Authorization: Bearer $token" "$api/api/me"
Remove-Variable token
```

`/api/me` returns information for the **currently signed-in account**, not for an arbitrary user. Do not paste token values into an issue or hand in full private response bodies. A marker without a test account can still inspect the public health checks and the full route inventory on this page.

## 3. How to read a route — HTTP methods and status codes

An API route consists of an **HTTP method**, a **path**, optional **input** and an **HTTP response**. Tutor MX does not directly map every database table to a public URL.

| HTTP method | Meaning here | Concrete example from the final API |
| --- | --- | --- |
| **GET** | Read information without changing it | `GET /api/tutor/dashboard` |
| **POST** | Create a record or request a named action | `POST /api/student/bookings` |
| **PATCH** | Change part of an existing record | `PATCH /api/courses/:courseId` |
| **DELETE** | Remove a record where deletion is permitted | `DELETE /api/courses/:courseId` |
| **PUT** | Replace/update a value under a particular contract | Present in the full source inventory where declared |

The colon in `:courseId` means a **path parameter**: a real authorised course ID belongs there, not the literal text `:courseId`. Some actions intentionally use verbs such as `/approve`, `/submit` or `/cancel` because they represent guarded changes of workflow state.

| Status | How the frontend or curl client should interpret it |
| --- | --- |
| **200 / 201 / 204** | Success (a completed read, created resource or successful action without a body). |
| **400 / 422** | Invalid input or request outside supported bounds; correct the request. |
| **401** | Missing/expired/invalid API access token; sign in again. |
| **403** | Authenticated but not permitted by the user's role, Master privilege or ownership. |
| **404** | Record not found, or hidden to avoid revealing an inaccessible resource. |
| **409** | Duplicate, stale version, illegal transition or competing request; refresh from the server. |
| **429** | Too many requests; use the retry guidance. |
| **500 / 503** | Server or dependency failure; show a safe error and retry where appropriate. |

A representative **safe error envelope** is:

```json
{"error":{"code":"AUTHENTICATION_REQUIRED","message":"A valid bearer token is required."}}
```

This is a **format example**, not a captured private user response. [Security and roles](#security).

## 4. Read-only examples for each Tutor MX role

The following requests illustrate how the **same handwritten API** supports different screens. First obtain a token using section 2 and sign in with a test account that has the stated role.

| Role | Example request | What the client learns |
| --- | --- | --- |
| **Student** | `GET /api/student/open-work` | Open volunteering opportunities allowed for that Student. |
| **Student** | `GET /api/me/time-slots` | That Student's own timetable records. |
| **Tutor** | `GET /api/tutor/dashboard` | Only that Tutor's work and hour summary. |
| **Tutor** | `GET /api/tutor/time-slots` | That Tutor's own timetable entries (legacy-compatible route). |
| **Organiser** | `GET /api/allocations/candidates` | Candidate suitability and reasons for allocation, subject to required query inputs. |
| **Organiser** | `GET /api/organiser/command-centre` | School staffing and operational indicators. |
| **Master Organiser** | `GET /api/master-organiser/organiser-applications` | Lecturer registration review queue; normal Organisers receive 403. |

For a simple demonstration, change **only the final path** in the authorised PowerShell command above. Some routes require query parameters, a path ID or a defined request body; use the complete contract inventory before calling them. **Do not run mutation examples against production merely to demonstrate curl** — use approved test data and the normal application workflow.

## 5. How the API changed in each sprint

| Sprint | New layer of API functionality | Example contracts in the final source |
| --- | --- | --- |
| **Sprint 1 — Foundation** | Health, Auth0 onboarding, current Profile, courses/Tutors, Tutor dashboard/forms and server-side allocation eligibility. | `/health`, `/api/me`, `/api/tutor/dashboard`, `/api/allocations/candidates` |
| **Sprint 2 — Basic** | Live allocation mutations, volunteer claims, timesheet submissions and Organiser decisions. | `POST /api/allocations`, `POST /api/student/volunteer-requests`, timesheet decision/submit routes |
| **Sprint 3 — Intermediate** | Staffing, reporting, bulk work, import/term logic, timesheet dispute/export, secure search/notifications and retry protections. | `/api/allocations/bulk-preview`, `/api/reports/workload`, `/api/organiser/command-centre` |
| **Sprint 4 — Advanced** | Shared schedule, mutual availability, bookings, Student sick notes, swaps, scenarios, audit and proposals. | `/api/me/time-slots`, `/api/student/bookings`, `/api/organiser/scenarios`, `/api/organiser/audit` |

This table gives **representative routes, not the entire inventory**. The catalogue at the bottom lists the actual final 120 registrations with method, path, access level and source references. [Feature origins](#features) · [Work tracker](#work-tracker).

## 6. Special workflows — how the API protects decisions

**Organiser registration:** ordinary Student/Tutor onboarding uses `POST /api/auth/onboarding`; a lecturer instead requests access through `POST /api/auth/organiser-registration`. Their `OrganiserApplication` stays Pending until a Master Organiser's protected review action approves or rejects it. The additional `MASTER_ORGANIZER` claim is checked on the **backend**, not just by hiding a button. [See the entire lecturer approval journey](#student-scheduling).

**Booking and sick notes:** `POST /api/student/mutual-availability` calculates safe shared free-time intervals without exposing private timetable names; `POST /api/student/bookings` rechecks before saving. Student sick-note and Organiser decision endpoints preserve status/history and enforce ownership. [Role guide](#student-scheduling).

**Scenario publishing and proposals:** these are administrative planning operations. A generated proposal becomes a **draft Scenario**, not a live allocation. A separate guarded publish operation checks the current version, locks and eligibility before committing changes. [Architecture](#architecture) · [Backend rules](#backend).

**External holiday integration:** the backend calls the approved South African holiday service; the frontend reads the safe result/fallback through `GET /api/public-holidays`. The app does not require direct browser access to the external provider. [Holiday integration](#integration).

## 7. Verify the implementation, not just the examples

The **120-operation catalogue immediately below** is generated from the supplied final `src/app.ts` route registrations. Filter it by method or access scope to inspect what is actually exposed. The evidence downloads include a [read-only Postman collection](downloads/tutor-mx-readonly.postman_collection.json), [OpenAPI-shaped inventory](downloads/openapi-inventory.json), [endpoint inventory](downloads/endpoint-inventory.json) and [captured route source](downloads/api-routes.ts.txt).

These inventories help a marker review naming, access and HTTP design, but they **do not create a Swagger server on Render or promise complete hand-authored JSON request schemas**. The documentation site serves these files statically. For recorded performance and security evidence, see [Testing, accessibility & performance](#testing) and the [final assessment rubric](#milestone4).
