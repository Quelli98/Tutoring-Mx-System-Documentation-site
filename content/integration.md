## Why Tutor MX integrates an external service

The project brief requires a relevant external API integration. We selected **Nager.Date's South African public-holiday feed** to provide supplementary scheduling context. Holiday information is useful while interpreting academic and Tutor availability, but must not become a dependency for the core allocation or booking transaction. The integration is therefore routed through the handwritten Express API rather than called independently by each browser screen.

## Development history and design decisions

| Sprint | Integration work | Explanation |
| --- | --- | --- |
| **1 — feasibility** | Backend proof-of-concept for South African holidays, including failure and invalid-response expectations. | Confirmed a relevant external provider and designed a contract that could fail safely. |
| **2 — production adapter** | API endpoint, provider response validation, bounded timeout, caching and controlled fallback; UI displays the result/status. | Converted the spike into a reusable integration without exposing external network details to React. |
| **3 — reuse** | Academic terms, timetable import and recurrence joined the existing scheduling domain; holiday context remained a supporting service. | Avoided a separate timetable or duplicated provider integration. |
| **4 — continuity** | Student calendars and mutual availability reuse existing scheduling structures while keeping the holiday adapter independent of core booking eligibility. | Preserved reliability when provider availability changes. |

## Request and response flow

1. A signed-in frontend screen requests `GET /api/public-holidays?year=2026` from Tutor MX.
2. Express validates the requested year (2000–2100) before contacting the provider.
3. The backend fetches South African (`ZA`) public holidays from Nager.Date, subject to a configured timeout (documented default: three seconds).
4. The adapter filters/transforms the provider's data into the stable fields exposed by our HTTP contract and caches successful data for one hour.
5. If the provider times out or returns invalid/unavailable data, Tutor MX returns a safe fallback status instead of inventing a holiday list or blocking essential workflows.

| Mechanism | Motivation | Failure behaviour |
| --- | --- | --- |
| Backend adapter | One auditable request and response shape | Prevents frontend code from depending on provider-specific details. |
| Year validation | Rejects malformed and out-of-range requests | Controlled validation error before external traffic. |
| Timeout and response checks | Limits exposure to external latency/format changes | Controlled fallback when the provider does not respond correctly. |
| One-hour successful cache | Avoids unnecessary repeated requests | Cached successful responses can be reused; failure is not falsely cached as valid holidays. |
| `source: fallback` | Makes degradation visible | UI can show that holiday context is unavailable while Tutor MX remains usable. |

**Integration observation:** the important property is graceful degradation, not the presence of an arbitrary API call. Marking evidence should show both the expected provider-success response and the fallback, plus deterministic tests for timeouts, invalid responses and caching. A mocked timeout proves application handling of a simulated failure, **not** uptime of the real provider. [API examples](#api) · [Testing](#testing) · [Nager.Date public API](https://date.nager.at/Api).
