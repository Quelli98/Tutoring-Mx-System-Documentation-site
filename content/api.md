## HTTP API: purpose and engineering boundary

The API defines the HTTP contracts through which the separately hosted frontend requests tutoring data and actions. In Tutor MX, the **React frontend** sends HTTP requests to a separately hosted **Node.js/Express backend**. The backend checks identity, validates the request, applies tutoring/allocation rules and reads or updates Neon PostgreSQL through Prisma. It sends a structured HTTP response back to the screen.

**Design justification and rubric coverage.** The course brief requires a handwritten API that is usable from outside the frontend. Tutor MX registers its own Express routes, applies authentication, role checks and domain validation, and exposes a documented public address. The 120-operation final-source inventory below makes the method, path and protection model inspectable. It is an operation inventory, not an assertion that all route body schemas are reproduced.

| Component | Address or responsibility | What it is **not** |
| --- | --- | --- |
| **Public API (Render)** | `https://tutor-mx-api.onrender.com` | Not the React frontend or documentation site |
| **Application frontend (Cloudflare)** | [Open Tutor MX](https://tutor-mx.pages.dev) | Does not directly query PostgreSQL |
| **Documentation (GitHub Pages)** | This site and the route catalogue below | Does not authenticate on behalf of its readers |
| **Neon PostgreSQL** | Private persistence reached only by the backend | Not a public browser-accessible database console |

The API was introduced in **Sprint 1** and extended in **Sprints 2, 3 and 4**. [Backend explanation](#backend) · [Four-sprint roadmap](#roadmap).

**[Open the interactive API reference ↗](api-reference.html)**: every route with its parameters, request bodies and responses, generated from the [OpenAPI 3 specification](downloads/openapi.json). The main workflows include full schemas taken from the final source.

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

`/api/me` returns information for the **currently signed-in account**, not for an arbitrary user. Do not paste token values into an issue or hand in full private response bodies. An unauthenticated reviewer can still inspect the public health checks and the full route inventory on this page.

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

For a simple demonstration, change **only the final path** in the authorised PowerShell command above. Some routes require query parameters, a path ID or a defined request body; section 5 shows the request bodies for the main workflows, and the complete contract inventory covers the rest. **Do not run mutation examples against production merely to demonstrate curl** — use approved test data and the normal application workflow.

## 5. Request and response examples for the main workflows

These examples show the exact fields each main workflow accepts and the shape of a successful response. Field names, validation rules and error codes come from the final source (`src/app.ts` and the service files); IDs, names and times are made-up example values. Every successful response wraps its result in `data`, and every error uses the `{"error":{"code","message"}}` envelope from section 3.

The `POST` and `PATCH` examples change data. Run them against a local API with a test account, not against production.

```bash
API=http://localhost:3000        # or https://tutor-mx-api.onrender.com for read-only requests
read -s -p "API access token: " TOKEN; echo
```

PowerShell users can enter the token as in section 2 and use `curl.exe` with the same arguments.

### Any signed-in user: current profile

```bash
curl -s "$API/api/me" -H "Authorization: Bearer $TOKEN"
```

```json
{"data":{"profile":{"id":41,"email":"tutor@example.com","fullName":"Example Tutor A","role":"TUTOR"}}}
```

A Master Organiser's response also includes `"capabilities":{"masterOrganiser":true}`.

### Organiser: find eligible Tutors for a session

```bash
curl -s "$API/api/allocations/candidates?courseId=12&startsAt=2026-10-13T08:00:00.000Z&endsAt=2026-10-13T10:00:00.000Z&minimumMark=65&requestedHours=2" \
  -H "Authorization: Bearer $TOKEN"
```

```json
{
  "data": {
    "candidates": [
      {
        "tutorId": 41, "fullName": "Example Tutor A", "mark": 80,
        "weeklyLimit": 15, "usedHours": 3, "remainingHours": 12,
        "hasClash": false, "isEligible": true, "reasonCodes": [],
        "clashDetails": [], "markBand": 80, "capacityShare": 0.2
      },
      {
        "tutorId": 57, "fullName": "Example Tutor B", "mark": 72,
        "weeklyLimit": 10, "usedHours": 2, "remainingHours": 8,
        "hasClash": true, "isEligible": false, "reasonCodes": ["schedule-clash"],
        "clashDetails": [
          { "kind": "busy", "label": null, "startsAt": "2026-10-13T09:00:00.000Z",
            "endsAt": "2026-10-13T11:00:00.000Z", "recurrence": "WEEKLY" }
        ],
        "markBand": 70, "capacityShare": 0.2
      }
    ]
  }
}
```

`reasonCodes` explains why a Tutor is not eligible: `insufficient-mark`, `schedule-clash` or `hour-limit-exceeded`. A missing or invalid query value returns **400** `VALIDATION_ERROR`.

### Organiser: create the allocation

```bash
curl -s -X POST "$API/api/allocations" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"tutorId":41,"courseId":12,"startsAt":"2026-10-13T08:00:00.000Z","endsAt":"2026-10-13T10:00:00.000Z","minimumMark":65,"requestedHours":2,"status":"CONFIRMED"}'
```

**201 Created:**

```json
{"data":{"allocation":{"id":301,"tutorId":41,"courseId":12,"startsAt":"2026-10-13T08:00:00.000Z","endsAt":"2026-10-13T10:00:00.000Z","allocatedHours":2,"status":"CONFIRMED"}}}
```

`status` is optional and may be `PROPOSED` or `CONFIRMED`. `requestedHours` must be above 0 and no longer than the session. The server rechecks every rule when saving: a Tutor who fails one returns **409** with that rule's code (for example `schedule-clash` or `hour-limit-exceeded`), an unknown Tutor or course returns **404** (`TUTOR_NOT_FOUND` or `COURSE_NOT_FOUND`), and a conflicting concurrent change returns **409** `ALLOCATION_CONFLICT`.

### Tutor: log worked hours, then submit the timesheet

```bash
curl -s -X POST "$API/api/tutor/work-logs" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"allocationId":301,"workDate":"2026-10-13","hours":2,"description":"COMS1018A lab session"}'
```

Returns **201** with `{"data":{"workLog":{…}}}`. `hours` must be above 0 and at most 24, with no more than two decimal places, and `description` is required (up to 500 characters). If that week's timesheet has already been submitted or approved, the API returns **409** `TIMESHEET_LOCKED`.

When the week is complete, submit the timesheet (no request body):

```bash
curl -s -X POST "$API/api/tutor/timesheets/88/submit" -H "Authorization: Bearer $TOKEN"
```

### Organiser: approve or return a timesheet

```bash
curl -s -X PATCH "$API/api/timesheets/88/decision" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"decision":"RETURN","reason":"Please split the Monday hours by session."}'
```

Returns **200** with `{"data":{"timesheet":{…}}}`. `decision` must be `APPROVE` or `RETURN`, and a `reason` is required when returning.

### Tutor: ask to be excused from a session

```bash
curl -s -X POST "$API/api/tutor/excuses" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"allocationId":301,"reason":"Medical appointment"}'
```

Returns **201** with `{"data":{"excuse":{…}}}`. The reason is required (up to 1,000 characters) and the session must be assigned to that Tutor.

### Student: volunteer for open work

```bash
curl -s "$API/api/student/open-work" -H "Authorization: Bearer $TOKEN"
curl -s -X POST "$API/api/student/volunteer-requests" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"overflowWorkId":17}'
```

The first returns `{"data":{"workItems":[…]}}`. The second returns **201** with `{"data":{"volunteerRequest":{…}}}`, which the Student can follow until an Organiser approves or rejects it.

### Student: book a tutoring session

```bash
curl -s -X POST "$API/api/student/bookings" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"tutorId":41,"courseId":12,"termId":3,"startsAt":"2026-10-15T12:00:00.000Z","endsAt":"2026-10-15T13:00:00.000Z","requestKey":"booking-7f3c1d2a"}'
```

**201 Created** (the `booking` part of the response):

```json
{
  "id": 912, "studentId": 230, "tutorId": 41, "courseId": 12, "termId": 3,
  "studentName": "Example Student", "tutorName": "Example Tutor A",
  "courseCode": "COMS1018A", "courseName": "Introduction to Algorithms",
  "startsAt": "2026-10-15T12:00:00.000Z", "endsAt": "2026-10-15T13:00:00.000Z",
  "status": "CONFIRMED", "occurrenceStatus": "SCHEDULED", "version": 1,
  "createdAt": "2026-10-11T11:20:00.000Z", "updatedAt": "2026-10-11T11:20:00.000Z"
}
```

Alongside `booking`, the response includes the booking's `history`, the Student's `sickNotes`, and the flags `sickNotePending`, `canSubmitSickNote` and `canCancel`. `requestKey` is a retry key of 8–128 letters, digits, `-` or `_`: repeating the same request with the same key returns the original booking instead of creating a duplicate, while reusing the key for a different request returns **409** `SCHEDULING_STALE`. If someone else takes the time first, the API returns **409** `BOOKING_UNAVAILABLE`.

### Organiser: create a course

```bash
curl -s -X POST "$API/api/courses" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"code":"COMS1018A","name":"Introduction to Algorithms","hourlyRate":180,"budget":25000}'
```

Returns **201** with `{"data":{"course":{…}}}`. Only these four fields are accepted; `hourlyRate` must be above 0 and `budget` 0 or more.

### Any signed-in user: South African public holidays

```bash
curl -s "$API/api/public-holidays?year=2026" -H "Authorization: Bearer $TOKEN"
```

Shortened to one holiday:

```json
{"data":{"source":"external","holidays":[{"date":"2026-12-16","name":"Day of Reconciliation","countryCode":"ZA","nationalHoliday":true,"holidayTypes":["Public"]}],"retrievedAt":"2026-10-11T11:14:00.000Z"}}
```

If the Nager.Date provider is unavailable, `source` is `"fallback"`, `retrievedAt` is `null` and a `reason` is included, so scheduling keeps working. [Holiday integration](#integration).

### Rate limits, pagination and retry keys

**Rate limits.** Every `/api` route allows 120 requests per minute from each client. The account routes `password-reset`, `onboarding`, `organiser-registration`, `organiser-application-status`, `resend-verification` and `delete-account` allow 10 requests per 15 minutes. Over the limit, the API returns **429** `RATE_LIMITED`, and responses carry the standard `RateLimit` and `RateLimit-Policy` headers so a client can see how many requests remain. `/health` and `/ready` are not rate limited.

**Pagination.** List routes that can grow return pages: `GET /api/me/bookings`, `GET /api/swaps` and `GET /api/organiser/student-sick-notes` return 20 items per page, and `GET /api/organiser/audit` returns 50. Pass `?page=2` for the next page; the response includes `page` and `hasMore`. `GET /api/me/bookings` can instead take `startsAt` and `endsAt` for a calendar window of up to 28 days. `GET /api/search` and `GET /api/notifications` take `page` (1–10,000) and `pageSize` (1–25, default 10).

**Retry keys.** Some writes can be retried safely without creating duplicates. `POST /api/organiser/overflow-work` and `POST /api/tutor/time-slots/import/commit` accept an `Idempotency-Key` header of 8–128 letters, digits, dots, underscores, colons or hyphens: repeating the same request with the same key returns the original result, while reusing a key for different content returns **409** `IDEMPOTENCY_KEY_REUSED`. Booking, sick-note and swap requests use a `requestKey` field in the body in the same way.

## 6. How the API changed in each sprint

| Sprint | New layer of API functionality | Example contracts in the final source |
| --- | --- | --- |
| **Sprint 1 — Foundation** | Health, Auth0 onboarding, current Profile, courses/Tutors, Tutor dashboard/forms and server-side allocation eligibility. | `/health`, `/api/me`, `/api/tutor/dashboard`, `/api/allocations/candidates` |
| **Sprint 2 — Basic** | Live allocation mutations, volunteer claims, timesheet submissions and Organiser decisions. | `POST /api/allocations`, `POST /api/student/volunteer-requests`, timesheet decision/submit routes |
| **Sprint 3 — Intermediate** | Staffing, reporting, bulk work, import/term logic, timesheet dispute/export, secure search/notifications and retry protections. | `/api/allocations/bulk-preview`, `/api/reports/workload`, `/api/organiser/command-centre` |
| **Sprint 4 — Advanced** | Shared schedule, mutual availability, bookings, Student sick notes, swaps, scenarios, audit and proposals. | `/api/me/time-slots`, `/api/student/bookings`, `/api/organiser/scenarios`, `/api/organiser/audit` |

This table gives **representative routes, not the entire inventory**. The catalogue at the bottom lists the actual final 120 registrations with method, path, access level and source references. [Feature origins](#features) · [Work tracker](#work-tracker).

## 7. Special workflows — how the API protects decisions

**Organiser registration:** ordinary Student/Tutor onboarding uses `POST /api/auth/onboarding`; a lecturer instead requests access through `POST /api/auth/organiser-registration`. Their `OrganiserApplication` stays Pending until a Master Organiser's protected review action approves or rejects it. The additional `MASTER_ORGANIZER` claim is checked on the **backend**, not just by hiding a button. [See the entire lecturer approval journey](#student-scheduling).

**Booking and sick notes:** `POST /api/student/mutual-availability` calculates safe shared free-time intervals without exposing private timetable names; `POST /api/student/bookings` rechecks before saving. Student sick-note and Organiser decision endpoints preserve status/history and enforce ownership. [Role guide](#student-scheduling).

**Scenario publishing and proposals:** these are administrative planning operations. A generated proposal becomes a **draft Scenario**, not a live allocation. A separate guarded publish operation checks the current version, locks and eligibility before committing changes. [Architecture](#architecture) · [Backend rules](#backend).

**External holiday integration:** the backend calls the approved South African holiday service; the frontend reads the safe result/fallback through `GET /api/public-holidays`. The app does not require direct browser access to the external provider. [Holiday integration](#integration).

## 8. Verify the implementation, not just the examples

The **120-operation catalogue immediately below** is generated from the route registrations in the final `src/app.ts`. Filter it by method or access scope to inspect what is actually exposed. The evidence downloads include a [read-only Postman collection](downloads/tutor-mx-readonly.postman_collection.json), [OpenAPI-shaped inventory](downloads/openapi-inventory.json), [endpoint inventory](downloads/endpoint-inventory.json) and [captured route source](downloads/api-routes.ts.txt).

These inventories make it possible to review naming, access and HTTP design, but they **do not create a Swagger server on Render or promise complete hand-authored JSON request schemas**. The documentation site serves these files statically. For recorded performance and security evidence, see [Testing, accessibility & performance](#testing) and the [final assessment rubric](#milestone4).
