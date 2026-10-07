## Tests are evidence with a scope

The supplied final Sprint 4 source contains **52 backend test files and 77 frontend test files**. The Codecov screenshots supplied for the final `main` commit `361954e` show **80.96%** line coverage for `frontend/src` and **85.29%** for backend `src`. These are exact-release Codecov values; they are separate from browser role smoke tests and performance/load evidence.

| Check | Command in the application checkout | What it demonstrates |
| --- | --- | --- |
| Full local gate | `npm run check` | Prisma generation, lint, typecheck, backend/frontend tests, builds and repository security check |
| Backend / frontend suites | `npm run test:backend`, `npm run test:frontend` | Focused automated behaviour |
| Coverage | `npm run coverage` | Reports/LCOV for both sides; inspect meaningful missing branches |
| Real database | `npm run db:verify` | Migration/seed/constraint and database-query checks against the configured test database |
| Deployment probes | `npm run smoke` with the intended `SMOKE_BASE_URL` | Hosted health/readiness for that release |
| Browser acceptance | Success, failure, empty/permission and refresh/retry | Integrated user behaviour and usable recovery |

`npm run check` does not replace real-database verification. Run against the intended local/test database; a reset command is not a production verification procedure.

## Historical measurements, not new claims

The supplied Member 5 audit records a local PGlite benchmark with 1,000 Tutors, 50 courses, 500 confirmed allocations and 250 approved work logs. It took seven warm measurements and excluded production network, Auth0 and hosted-database latency.

| Operation | Median ms | Maximum ms | SQL statements |
| --- | --- | --- | --- |
| Workload report | 15.29 | 22.68 | 2 |
| Payroll export | 7.21 | 8.91 | 1 |
| Search | 4.00 | 6.02 | 3 |
| Candidate ranking | 27.23 | 35.09 | 1 |
| 400-row import preview | 10.90 | 12.66 | 0 |

That audit also records 1,082 backend and 529 frontend passing tests, with backend coverage 92.26% statements, 86.12% branches, 94.57% functions and 93.06% lines. These belong to the audit's earlier handoff. The later preserved Codecov screenshots are likewise dated snapshots. None is relabelled as the final 30 September archive or final submission result.

PGlite's single connection and deterministic competing-state tests do not simulate multi-connection Neon load. Warm local medians do not establish cold-start delay, concurrent throughput, p95/p99, sustained reliability or frontend interaction responsiveness.

## Final deployed performance evidence — 7 October 2026

The final evidence was measured against the public Render service, not a local mock. These are **dated observations**, not an uptime guarantee. The first captured `/health` request was labelled as the cold/first request and returned HTTP 200 in **764.96 ms**. Five subsequent `/health` requests all returned 200 in **332.73–359.44 ms** (average **343.32 ms**, median **339.69 ms**).

Five `/ready` requests also all returned HTTP 200. Their times were **1345.82, 480.37, 484.99, 628.28 and 461.69 ms** (average **680.23 ms**, median **484.99 ms**). The slower first readiness result is retained rather than discarded because `/ready` includes readiness/database work and hosted-service wake/cache effects can vary.

| Public probe | Evidence | Result |
| --- | --- | --- |
| [`/health`](https://tutor-mx-api.onrender.com/health) | first captured request | 200 in 764.96 ms |
| [`/health`](https://tutor-mx-api.onrender.com/health) | 5 warm requests | 332.73–359.44 ms; average 343.32 ms |
| [`/ready`](https://tutor-mx-api.onrender.com/ready) | 5 requests | 461.69–1345.82 ms; median 484.99 ms |

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-performance-health-first-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-performance-health-first-2026-10-07.png" alt="PowerShell first health request returning HTTP 200 in 764.9617 milliseconds"></a><figcaption><strong>First deployed health measurement</strong><span>The captured first request returned HTTP 200 in 764.96 ms. It is a single dated observation, not a steady-state latency claim.</span></figcaption></figure>
<figure><a href="evidence/sprint4-performance-health-warm-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-performance-health-warm-2026-10-07.png" alt="Five warm health requests all returning HTTP 200"></a><figcaption><strong>Five warm /health requests</strong><span>All five requests returned 200; the measured range was 332.73–359.44 ms with a 343.32 ms average.</span></figcaption></figure>
</div>

### Light concurrent-load sample

A deliberately small `autocannon` run used **5 connections for 10 seconds** against the public service. This is appropriate as lightweight release evidence for the free hosted instance; it is not presented as a capacity/stress limit.

| Endpoint | Requests | Average latency | p50 | p97.5 | Max | Average req/s |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/health` | 144 in 10.1 s | 354.17 ms | 325 ms | 988 ms | 1044 ms | 13.9 |
| `/ready` | 98 in 10.08 s | 534.28 ms | 471 ms | 1374 ms | 1392 ms | 9.31 |

The screenshots show request/latency statistics but do not expose a complete HTTP error-count line, so this documentation **does not claim a zero-error rate** from the cropped output. The `uuid` deprecation message shown before the health run is an `npx/autocannon` dependency warning and is not a Tutor MX API response.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-performance-load-health-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-performance-load-health-2026-10-07.png" alt="Autocannon health endpoint light load results"></a><figcaption><strong>Light `/health` load sample</strong><span>Five concurrent connections for ten seconds produced 144 requests with 354.17 ms average latency.</span></figcaption></figure>
<figure><a href="evidence/sprint4-performance-load-ready-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-performance-load-ready-2026-10-07.png" alt="Autocannon ready endpoint light load results"></a><figcaption><strong>Light `/ready` load sample</strong><span>Five concurrent connections for ten seconds produced 98 requests with 534.28 ms average latency.</span></figcaption></figure>
</div>

### Responsive and accessibility evidence

Chrome device emulation was captured at **400×645** (phone-scale) and **757×645** (tablet/narrow desktop-scale), with a normal desktop landing-page capture retained under Deployment. The Student navigation collapses to a Menu control at the narrow width, and the timetable/availability pages remain readable at the wider test width. One availability capture also shows the visible focus outline on the Menu button, providing concrete focus-state evidence.

The device-emulation screenshots also show a horizontal scrollbar at the bottom of the emulated viewport. This documentation therefore does **not** claim a perfect no-horizontal-overflow audit. A separate Lighthouse score, screen-reader run and complete keyboard traversal transcript were not supplied.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-responsive-student-phone-400x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-phone-400x645-2026-10-07.png" alt="Student workspace in Chrome device emulation at 400 by 645"></a><figcaption><strong>Phone-scale Student workspace</strong><span>At 400×645 the side navigation collapses into a Menu control and the primary Student workspace content stacks vertically.</span></figcaption></figure>
<figure><a href="evidence/sprint4-responsive-student-timetable-757x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-timetable-757x645-2026-10-07.png" alt="Student timetable in Chrome device emulation at 757 by 645"></a><figcaption><strong>Student timetable at a wider responsive width</strong><span>The timetable header, date control and schedule summary remain visible at 757×645.</span></figcaption></figure>
<figure><a href="evidence/sprint4-responsive-student-availability-757x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-availability-757x645-2026-10-07.png" alt="Student tutoring availability page at 757 by 645 with visible focus ring"></a><figcaption><strong>Availability screen and visible focus state</strong><span>The Menu button has a visible keyboard-style focus outline; this is useful evidence but not a substitute for a complete accessibility audit.</span></figcaption></figure>
</div>

## Final Sprint 4 Codecov evidence

| Coverage root | Tracked | Covered | Partial | Missed | Coverage |
| --- | ---: | ---: | ---: | ---: | ---: |
| `frontend/src` | 5,650 | 4,574 | 474 | 602 | **80.96%** |
| backend `src` | 4,683 | 3,994 | 352 | 337 | **85.29%** |

Both screenshots identify **latest commit `361954e`**, matching the final merged source and Render deployment screenshot.

![Final Codecov overview](evidence/sprint4-codecov-overview-final-2026-10-07.png)

![Final frontend coverage](evidence/sprint4-codecov-frontend-final-2026-10-07.png)

![Final backend coverage](evidence/sprint4-codecov-backend-final-2026-10-07.png)

## Changed-feature regression matrix

- Master approval: verified/unverified lecturer, pending without Profile, normal Organiser 403, approve/reject/stale conflict, provider failure and Auth0/Neon reconciliation.
- Tutor attendance: Johannesburg date boundary, Excused/Skipped decision, preserved allocation history and sick work-log rejection.
- Shared schedule identity: Student/Tutor ownership, duplicate import/manual entry, recurrence/term/exception behaviour and preserved Tutor rows.
- Student scheduling: private-label-free mutual times, two competing booking requests, cancellation and sickness busy-state changes.
- Advanced planning: stale scenario version, locks, atomic publish, swap recheck, audit rollback/redaction, valid restore and deterministic proposals across all four presets.

## CI and evidence handover

Local tests run before push. Gitea Actions runs on shared lecturer runners; queueing is expected. Save a **completed** run and Codecov output for the exact reviewed branch/release. The Integration Lead verifies combined main after sequential merges. Do not weaken tests or claim green remote CI when only local commands ran.

[Original automated-testing history](#testing-history) · [Member 5 audit/source bundle](downloads/technical-source-evidence.zip) · [Git handover](#git-methodology).
