## Tests are evidence with a scope

The current archive contains **43 backend test files and 63 frontend test files**. These are source-file counts, not a fresh passing-test or coverage result. This documentation task builds and checks the documentation website; it does not claim to have run the full Tutor MX application gate or authenticated production role tests.

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

## What the final performance evidence needs

| Question from the rubric | Record in the final evidence |
| --- | --- |
| How long does the first API request take? | A clearly labelled cold request, then several warm requests on the deployed release |
| How well does the API handle significant load? | Approved staging workload, concurrency, duration, data size, throughput, latency percentiles and error rate |
| How often does it crash? | Monitoring/observation window and actual failures; no invented uptime percentage |
| How fast does the application load/respond? | Device/network/browser, initial load and key interactions; loading state and rendering evidence |
| Can users resume work? | Refresh, old tab, expired/revoked session, changed role and stale-target tests |

Use a suitable test environment for sustained load and record the exact source SHA. The earlier public service check proved reachability at its timestamp, not a load result. The site does not claim that a free-service cold response time is a steady-state latency measurement.

## Changed-feature regression matrix

- Master approval: verified/unverified lecturer, pending without Profile, normal Organiser 403, approve/reject/stale conflict, provider failure and Auth0/Neon reconciliation.
- Tutor attendance: Johannesburg date boundary, Excused/Skipped decision, preserved allocation history and sick work-log rejection.
- Schedule identity: duplicate import/manual entry, recurrence/term/exception behaviour and existing Tutor rows.
- Student target work: own schedule, private-label-free mutual times, two competing booking requests, cancellation and sickness busy-state changes.
- Advanced target work: stale scenario version, locks, atomic publish, swap recheck, audit rollback/redaction, valid restore and deterministic proposals.

## CI and evidence handover

Local tests run before push. Gitea Actions runs on shared lecturer runners; queueing is expected. Save a **completed** run and Codecov output for the exact reviewed branch/release. The Integration Lead verifies combined main after sequential merges. Do not weaken tests or claim green remote CI when only local commands ran.

[Original automated-testing history](#testing-history) · [Member 5 audit/source bundle](downloads/technical-source-evidence.zip) · [Git handover](#git-methodology).
