## The trust boundaries

The browser is an untrusted client. Auth0 proves identity; the API verifies the token; the database profile resolves the application role; service checks control the requested record. Changing a React route, body field or hidden button does not confer authority.

| Caller | Allowed scope | Important denial |
| --- | --- | --- |
| Anonymous | Health/readiness, password reset, public application-status contract | Tutor lists and private workflow records require authentication |
| Authenticated identity without Profile | Own registration/onboarding/application paths | No automatic Student or Organiser workspace |
| Student | Own eligible overflow requests and outcomes | Other Students' requests and Organiser administrative data |
| Tutor | Own timetable, work logs, dashboard, sheets and excuses | Another Tutor's owned workflow through changed identifiers |
| Organiser | Administrative courses, Tutors, allocations, approval and reports | Master queue without extra privilege |
| Organiser + MASTER_ORGANIZER | Organiser capabilities plus lecturer application review | No client-supplied privilege elevation |

## Secrets and session storage

`DATABASE_URL`, `DIRECT_URL` when secret, and Auth0 Management client credentials stay in server configuration. The frontend build may include public domain/client ID/audience/base URL. Never put a client secret in a `VITE_*` variable; these values are compiled into downloadable assets.

The current source caches Auth0 tokens in local storage, correcting the README's stale “memory” statement. Expiry/revocation/role mismatch must still be handled, and stale targets must be re-authorised. Local storage increases the importance of preventing XSS. This documentation site does not store or accept a visitor's application token.

## Safe errors, limits and consistency

Routes use a common error envelope and deliberately safe messages. JSON size, IDs, pages, report sizes and import workloads are bounded. CORS reflects the configured allowed origin, while token checks apply independently. Idempotency is implemented only for declared operations; an arbitrary header is not a universal duplicate-prevention guarantee.

Database uniqueness, constraints and transactions are complemented by state/version checks. Auth0 grant plus Neon update remains a cross-system operation with a recovery/testing boundary. Do not equate one database transaction with a distributed transaction.

## Evidence to capture before final submission

Use designated demo accounts for Student, Tutor, Organiser and Master Organiser. Check anonymous 401, wrong-role 403, own-versus-other record protection, stale decision 409, invalid input 400, duplicate request behaviour and provider failure. For new Student availability, verify that responses never contain the other person's private timetable labels.

Show redacted configuration names, successful checks and commit/run links. Tokens, passwords, client secrets, database URLs and raw private record dumps do not belong in public evidence. A public schema dictionary does not need Auth0 because it exposes structure rather than user data.
