## External access and the correct base URL

The API is reachable independently of the frontend at **[https://tutor-mx-api.onrender.com](https://tutor-mx-api.onrender.com/health)**. The documentation URL and Cloudflare frontend URL do not serve these Express routes. Use HTTPS on the Render hostname from curl, Postman, PowerShell or another authorised application.

A public API address does not make every record public. Health/readiness checks are anonymous; Tutor, Student and Organiser data needs an appropriate access token and server-side permission. CORS limits browser origins; it is not authentication and does not prevent a command-line client from connecting.

## Public checks you can run now

In Windows PowerShell use `curl.exe` so the command is unambiguous. These requests read status only:

```powershell
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/health
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/ready
curl.exe --max-time 90 -i https://tutor-mx-api.onrender.com/api/tutors
```

| Request | Healthy/expected result | What it demonstrates |
| --- | --- | --- |
| `GET /health` | `200 {"status":"ok"}` | The API process can answer an external request |
| `GET /ready` | `200 {"status":"ready","database":"connected"}` | Its configured database readiness check succeeds |
| `GET /api/tutors` without token | `401` with `AUTHENTICATION_REQUIRED` | Protected records are withheld from anonymous callers |

A 200 readiness result does not count production records, prove every migration is applied or demonstrate every workflow. A first request may be much slower than a warm request. Record cold and warm measurements separately instead of reporting one as the other.

The earlier 29 September check recorded both 200 results and the expected 401. It is retained as dated evidence, not a fresh October uptime claim. The frontend automated check encountered Cloudflare 403/1010; a normal-browser smoke test was still needed.

## New approval route check — 3 October

The two new read routes, `/api/auth/organiser-application/me` and `/api/master-organiser/organiser-applications`, both returned **401 AUTHENTICATION_REQUIRED** to external requests without a token on 3 October 2026 at 09:53 SAST. This verifies external reachability and anonymous rejection for those routes. It does not prove an authenticated approval or that every current source change is deployed. [Download the dated response capture](downloads/approval-route-checks-2026-10-03.json).

## Obtain the right access token

Sign in to Tutor MX with your own approved test account. The Auth0 React SDK requests an **API access token** for the configured `VITE_AUTH0_AUDIENCE`. An ID token, application client ID, Neon connection string or Auth0 Management token is not a substitute for that bearer token. Use your own authorised browser's network inspector to inspect the token on an API request if you need to reproduce it locally; do not publish it in screenshots, commits or this site.

The documentation website does not collect tokens or make authenticated requests on a visitor's behalf. Run the examples locally. Tokens expire; obtain a fresh one and sign in again after an approved role change when needed.

## Read Tutor data from outside the frontend

With an approved **Tutor** account, these requests return that Tutor's records. The client does not choose another Tutor's identity.

```bash
API='https://tutor-mx-api.onrender.com'
read -rs -p 'Tutor API access token: ' TOKEN; echo
curl --max-time 90 -H "Authorization: Bearer $TOKEN" "$API/api/me"
curl --max-time 90 -H "Authorization: Bearer $TOKEN" "$API/api/tutor/dashboard"
curl --max-time 90 -H "Authorization: Bearer $TOKEN" "$API/api/tutor/time-slots"
unset TOKEN
```

For PowerShell, the [downloadable API checker](downloads/check-api.ps1) prompts privately for an optional token and prints status/timing rather than private response bodies. For manual inspection, use a temporary `$token` variable and remove it afterwards:

```powershell
$api = 'https://tutor-mx-api.onrender.com'
$secure = Read-Host 'Tutor API access token' -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try { $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
curl.exe --max-time 90 -H "Authorization: Bearer $token" "$api/api/me"
curl.exe --max-time 90 -H "Authorization: Bearer $token" "$api/api/tutor/dashboard"
curl.exe --max-time 90 -H "Authorization: Bearer $token" "$api/api/tutor/time-slots"
Remove-Variable token, secure, ptr
```

An **Organiser** can call `GET /api/tutors`, then use an authorised returned ID with `GET /api/tutors/:tutorId/marks` and `GET /api/tutors/:tutorId/time-slots`. Tutor dashboard, timesheet, allocation and absence data are separate contracts. There is no single anonymous “all Tutor data” dump. Use only the routes and scope needed for the demonstration; do not publish real names, emails or medical reasons.

## Organiser registration and Master review

| Operation | Who may call it | Important contract |
| --- | --- | --- |
| `POST /api/auth/onboarding` | Auth0 identity | Standard role body selects `STUDENT` or `TUTOR`; `ORGANISER` is rejected |
| `POST /api/auth/organiser-registration` | Auth0 identity | Identity/email come from Auth0; returns `{ data: { application } }`; pending applicant has no new Profile |
| `POST /api/auth/organiser-application-status` | Public; sensitive-auth limiter | Body `{ "email": "lecturer@example.org" }`; returns only `PENDING`, `APPROVED`, `REJECTED` or `NOT_FOUND` inside `data.status` |
| `GET /api/auth/organiser-application/me` | Auth0 identity | Own application, including before Profile exists; `data.application` can be null |
| `GET /api/master-organiser/organiser-applications` | Organiser + Master capability | `data.applications` list |
| `POST /api/master-organiser/organiser-applications/:id/approve` | Organiser + Master capability | Grants role and records decision/Profile; stale review is a conflict |
| `POST /api/master-organiser/organiser-applications/:id/reject` | Organiser + Master capability | Optional `reviewReason`, up to 500 characters; no applicant Profile created |

`GET /api/me` can include `data.capabilities.masterOrganiser: true`. Normal Organisers receive 403 on the Master queue. The public status route intentionally exposes application status for a supplied email; it does not grant access or return the full application. Limit screenshot evidence to designated demo applicants.

## Response and error contract

| Status | Meaning / client response |
| --- | --- |
| 200 / 201 | Successful read/action or created record; inspect the route's `data` field |
| 202 | Accepted non-enumerating password/reset email request; not proof that an email was delivered |
| 204 | Successful operation with no JSON body |
| 400 | Invalid body, malformed JSON, ID, date or query; correct the input |
| 401 | Missing, expired or invalid API access token; authenticate again |
| 403 | Role, Master privilege, ownership policy or role mismatch blocks the action |
| 404 | Missing record/Profile, or intentionally non-revealing inaccessible resource |
| 409 | Stale decision, duplicate, illegal state or idempotency conflict; reload server state |
| 413 / 422 | Request too large / bounded result limit exceeded; narrow the request |
| 429 | Rate limit exceeded; respect retry guidance |
| 500 / 503 | Safe internal failure / unavailable dependency; offer a clear retry path |

Example error, not a real user's data:

```json
{"error":{"code":"AUTHENTICATION_REQUIRED","message":"A valid bearer token is required."}}
```

GET reads resources; POST creates records or invokes explicit state transitions; PATCH changes partial values; PUT represents the declared mark-writing contract; DELETE removes/cancels only where the route defines it. Action paths such as `/submit` or `/approve` make workflow transitions explicit. `/api/me` and `/api/profile/current` intentionally expose the same profile contract for compatibility.

## Downloads and contract boundaries

Use the [GET-only Postman collection](downloads/tutor-mx-readonly.postman_collection.json), [OpenAPI inventory](downloads/openapi-inventory.json) and [route source](downloads/api-routes.ts.txt). The OpenAPI download lists all operations/access/success codes but deliberately does not invent full body schemas. It is served by this documentation site; no `/swagger` or `/openapi.json` route is claimed on Render.

The updated README still lists old Tutor creation/update and Organiser schedule-write operations absent from the inspected route registrations. The catalogue below follows **actual 30 September source**, so those historical statements do not create endpoints. Sprint 4 Student booking/scenario/swap/audit routes are not invented here before their implementation is supplied.
