## External integration from research to production

**Sprint 1** evaluated a South African public-holiday service and documented timeout/fallback expectations. **Sprint 2** connected the public-holiday adapter to the handwritten API with safe server-side responses. **Sprint 3** reused the established service while adding academic-term scheduling and timetable import. **Sprint 4** retained the integration while expanding the shared scheduling engine; neither the Student calendar nor the browser is allowed to call private backend-only service credentials. [Architecture](#architecture) · [Sprint roadmaps](#roadmap).

## Public holidays support the workflow

Tutor MX calls the Nager.Date South African public-holiday service through a backend adapter. React requests `GET /api/public-holidays?year=2026` from the Tutor MX API using its normal bearer token. The browser does not call the external holiday provider directly.

| Stage | Implementation | Product effect |
| --- | --- | --- |
| Validate | API accepts a year from 2000 to 2100 | Reject invalid requests before provider work |
| Fetch | Backend contacts Nager.Date for ZA | One controlled external boundary |
| Bound | Default provider timeout is 3 seconds | Provider failure does not hang the core flow indefinitely |
| Validate response | Adapter returns the approved fields | UI consumes a stable local contract |
| Cache | Successful results use a one-hour memory cache | Avoid repeated provider requests; cached timestamp retained |
| Fallback | Return `source: fallback`, empty holidays and a reason | Supporting information unavailable; core workflow still usable |

Fallback results are not cached as successful data, so a later request can try the provider again. A fallback is a deliberate usable response, not a fabricated list of holidays.

## Why this integration is cohesive

Holiday context supports planning and schedule interpretation. It sits behind the same authentication, error and API-client conventions as other Tutor MX data. The design contains external latency/failure on the server and avoids making volunteer/allocation work depend on provider uptime.

## What to demonstrate

Show a successful holiday response and the related UI, then a controlled provider failure with the fallback message. Keep the year, request, returned `source`, `retrievedAt` and run evidence. Deterministic adapter tests use mocks for timeout, invalid data, caching and fallback. Do not present those mocks as a fresh live-provider reliability measurement.

[Adapter and tests in the source bundle](downloads/technical-source-evidence.zip) · [API reference](#api) · [Nager.Date documentation](https://date.nager.at/Api).
