## Testing strategy and interpretation across four sprints

Testing grew from the Sprint 1 identity/API/role foundations into a combined frontend, backend, database, security and deployed-product verification programme. The aim is not merely to increase a test count: **each test should show that an intended user story and boundary condition works**. This addresses the Milestone 2 UI/API automated-testing rubric, the Milestone 3 coverage and performance criteria, and Milestone 4 testing quality, coverage and untested areas.

| Sprint | Quality focus | Representative behaviour checked | Evidence limitation |
| --- | --- | --- | --- |
| **1 — foundation** | Auth0 onboarding, role routing, Tutor's own data and allocation rule boundaries. | Correct role, invalid token, mark threshold, touching vs overlapping times and hour limit. | A passing isolated rule test does not prove a complete persisted allocation journey. |
| **2 — Basic** | Persisted allocation/volunteer/timesheet/approval actions and cross-role smoke. | Invalid, duplicate, stale and wrong-owner requests; save/reload consistency. | Mock tests alone do not substitute for the real database and three-role walkthrough. |
| **3 — Intermediate** | Import, bulk, reporting, notification/search, revisions, idempotency and new API security. | Duplicate imports, required term bounds, bounded search, corrected work-log states and race conditions. | Local PGlite benchmarks do not capture hosted Render/Neon concurrency or cold starts. |
| **4 — Advanced** | Booking overlaps, illness, swaps, scenario version/locks, audit restore and proposals; accessibility and hosted load probes. | Competing Student bookings, stale scenario publish, wrong-owner access, deterministic presets, responsiveness. | A limited screenshot/sample is not a full production stress test or universal accessibility certification. |

### Test levels and what each establishes

**Unit tests** verify one validator, domain helper or component state against controlled inputs. **Integration tests** check cooperating services, persistence and HTTP contracts. **Role-based browser acceptance tests** check whether an end user can complete the story (including recovery). **Gitea Actions** reruns the configured automated gate on a pushed commit. **Codecov** reports what code lines and branches those tests executed. **Hosted smoke and load checks** sample the running deployment. These measurements answer different questions and must be interpreted separately.

### Release gate and evidence chain

`npm run check` combines Prisma generation, lint, type checking, tests, builds and security checks in the application repository; `npm run coverage` generates the test-coverage artifacts. Before merge, each Member reproduces their handbook story, a failure case and a wrong-role/empty case. After review, the Integration Lead retests combined main and checks the completed [Gitea Actions run](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions). A queued CI job is not green. User feedback is reported separately from automated testing. [Work tracker](#work-tracker) · [User feedback](#user-feedback).

## Tests are evidence with a scope

The final audited code on `main` (`a3939f8`, 10 October 2026) is reported by the team's final audit as having **1,466 backend tests in 52 files and 847 frontend tests in 77 files**, all passing, with all three Gitea Actions jobs passing on `a3939f8`. These application runs were not repeated as part of this documentation-site audit. **Codecov reports 85.42% line coverage for the backend and 80.87% for the frontend** (82.93% combined), measured on 11 October 2026 on `main` commit `6b528a3`, the final frontend test fix (snapshot below). The final audit's own Vitest report gives higher line figures (92.69% backend, 87.60% frontend) on a different commit and reporting basis. These snapshots are not directly interchangeable, and the attachments alone do not isolate the cause of the difference; the [final audit](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/src/branch/main/docs/final-audit.md) and its [validation summary](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/src/branch/main/docs/evidence/final-audit/validation-summary.json) record that run. These results are separate from browser role smoke tests and performance/load evidence.

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

The Member 5 audit records a local PGlite benchmark with 1,000 Tutors, 50 courses, 500 confirmed allocations and 250 approved work logs. It took seven warm measurements and excluded production network, Auth0 and hosted-database latency.

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

The device-emulation captures also show a horizontal scrollbar at the bottom of the viewport, listed under [Known limitations](#milestone4/known-limitations). The Lighthouse results follow below.

<div class="evidence-gallery">
<figure><a href="evidence/sprint4-responsive-student-phone-400x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-phone-400x645-2026-10-07.png" alt="Student workspace in Chrome device emulation at 400 by 645"></a><figcaption><strong>Phone-scale Student workspace</strong><span>At 400×645 the side navigation collapses into a Menu control and the primary Student workspace content stacks vertically.</span></figcaption></figure>
<figure><a href="evidence/sprint4-responsive-student-timetable-757x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-timetable-757x645-2026-10-07.png" alt="Student timetable in Chrome device emulation at 757 by 645"></a><figcaption><strong>Student timetable at a wider responsive width</strong><span>The timetable header, date control and schedule summary remain visible at 757×645.</span></figcaption></figure>
<figure><a href="evidence/sprint4-responsive-student-availability-757x645-2026-10-07.png" target="_blank" rel="noreferrer"><img src="evidence/sprint4-responsive-student-availability-757x645-2026-10-07.png" alt="Student tutoring availability page at 757 by 645 with visible focus ring"></a><figcaption><strong>Availability screen and visible focus state</strong><span>The Menu button has a visible keyboard-style focus outline.</span></figcaption></figure>
</div>

### Lighthouse audit — 11 October 2026

We ran Lighthouse 13.4 in Chrome DevTools on the live application: the public landing page in Navigation mode (mobile and desktop), and the signed-in Organiser dashboard in Snapshot mode, which checks the page as it is without signing out. Snapshot mode reports checks passed rather than a score and does not measure performance.

| Page | Mode | Performance | Accessibility | Best practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Landing page, mobile | Navigation | **79** | **100** | **100** | **92** |
| Landing page, desktop | Navigation | **93** | **100** | **100** | **92** |
| Organiser dashboard, signed in | Snapshot | not measured | 30 of 31 checks | 4 of 4 checks | 5 of 6 checks |

On desktop the landing page's largest element appears after 1.6 s (first content 0.8 s). On Lighthouse's simulated mobile phone and slow network it appears after 4.6 s (first content 2.9 s). Both runs had no blocking time and essentially no layout shift. Full reports: [mobile](downloads/lighthouse-landing-mobile-2026-10-11.html) · [desktop](downloads/lighthouse-landing-desktop-2026-10-11.html).

**Issues Lighthouse found:**

- **Colour contrast on the Organiser dashboard.** Eight elements fall below the WCAG 2 AA minimum of 4.5:1: grey helper text in empty states and the week-range toggle (`#6B7489` on `#F3F5FA`, 4.29:1), and course chips and Tutor initials in the Student pink (`#FC4C95` on `#FFE6F0`, 2.69:1) and Tutor violet (`#B82FE2` on `#F6E7FC`, 3.9:1). Darker text shades for those three pairs would fix this.
- **robots.txt.** The site has no `robots.txt`, so Cloudflare Pages returns the application's HTML at that address and Lighthouse cannot read it. Adding a plain-text `robots.txt` to the frontend's public folder would fix this SEO check.
- **Mobile load time.** Lighthouse's main suggestions are to split the single large JavaScript bundle, reduce render-blocking requests and deliver the landing-page photos in a smaller format.

<div class="evidence-gallery">
<figure><a href="evidence/lighthouse-landing-mobile-2026-10-11.png" target="_blank" rel="noreferrer"><img src="evidence/lighthouse-landing-mobile-2026-10-11.png" alt="Landing page, mobile"></a><figcaption><strong>Landing page, mobile</strong><span>Performance 79, Accessibility 100, Best practices 100, SEO 92.</span></figcaption></figure>
<figure><a href="evidence/lighthouse-landing-desktop-2026-10-11.png" target="_blank" rel="noreferrer"><img src="evidence/lighthouse-landing-desktop-2026-10-11.png" alt="Landing page, desktop"></a><figcaption><strong>Landing page, desktop</strong><span>Performance 93, Accessibility 100, Best practices 100, SEO 92.</span></figcaption></figure>
<figure><a href="evidence/lighthouse-organiser-snapshot-2026-10-11.png" target="_blank" rel="noreferrer"><img src="evidence/lighthouse-organiser-snapshot-2026-10-11.png" alt="Organiser dashboard, Snapshot mode"></a><figcaption><strong>Organiser dashboard, Snapshot mode</strong><span>30 of 31 accessibility checks, 4 of 4 best-practice checks and 5 of 6 SEO checks passed.</span></figcaption></figure>
</div>

## Codecov: how automated test coverage was measured

**Codecov** is the reporting service used alongside the automated backend and frontend test suites. When tests run with coverage instrumentation, the tools record which source-code lines were exercised. Gitea Actions can upload these results to Codecov, where the date, commit and coverage of each codebase can be inspected. This complements our unit/integration tests: it helps identify **untested areas**, but a high percentage alone does **not** demonstrate correct feature behaviour, secure authorisation, mobile accessibility or production performance.

**How to read the figures below:** *Tracked* is the total measured lines in that codebase; *Covered* means executed by tests; *Partial* means only part of a measured line/branch was exercised; *Missed* means the run did not exercise it. The displayed percentages are those shown by Codecov for the specified Git commit, **not** a count of passed tests, and not evidence that every user story passed its browser acceptance test.

For every code change the team also ran the relevant local frontend and backend Vitest suites, checked error/permission boundaries, then used the Gitea Actions/shared-runner workflow. CI/Codecov evidence should be matched to the reviewed commit rather than assumed from a prior screenshot. This is how Codecov supports **Sprint 2 automated-testing**, **Sprint 3 coverage**, and the **final Milestone 4 Testing** rubric.

### Final Codecov snapshot — 11 October 2026

Captured at 13:32 on 11 October 2026 from Codecov for `main` commit `6b528a3`, the final frontend test fix merged that day (Codecov project `Quelli98/tutor-mx-deployment`).

| Coverage root | Tracked | Covered | Partial | Missed | Coverage |
| --- | ---: | ---: | ---: | ---: | ---: |
| `frontend/src` | 5,660 | 4,577 | 475 | 608 | **80.87%** |
| backend `src` | 4,706 | 4,020 | 351 | 335 | **85.42%** |
| Combined | 10,366 | 8,597 | 826 | 943 | **82.93%** |

In the backend, `integrations` (94.62%), `http` (93.48%), `services` (88.81%) and `auth` (81.52%) are best covered, while the `app.ts` route wiring is lowest at 78.44%. In the frontend, `auth` (86.67%), `components` (82.30%), `api` (81.06%) and `features` (80.90%) are above 80%, while `routes` (74.07%) and `App.jsx` (69.33%) are the least tested.

<div class="evidence-gallery">
<figure><a href="evidence/codecov-overview-final-2026-10-11.jpg" target="_blank" rel="noreferrer"><img src="evidence/codecov-overview-final-2026-10-11.jpg" alt="Final Codecov overview"></a><figcaption><strong>Final Codecov overview</strong><span>frontend/src 80.87% and backend src 85.42% on main commit 6b528a3, 11 October 2026.</span></figcaption></figure>
<figure><a href="evidence/codecov-frontend-final-2026-10-11.jpg" target="_blank" rel="noreferrer"><img src="evidence/codecov-frontend-final-2026-10-11.jpg" alt="Final frontend coverage by folder"></a><figcaption><strong>Final frontend coverage by folder</strong><span>api, auth, components and features above 80%; routes 74.07% and App.jsx 69.33%.</span></figcaption></figure>
<figure><a href="evidence/codecov-backend-final-2026-10-11.jpg" target="_blank" rel="noreferrer"><img src="evidence/codecov-backend-final-2026-10-11.jpg" alt="Final backend coverage by folder"></a><figcaption><strong>Final backend coverage by folder</strong><span>integrations 94.62%, http 93.48%, services 88.81%, auth 81.52%; app.ts 78.44%.</span></figcaption></figure>
</div>

### Codecov snapshot for release commit `361954e` — 7 October 2026

| Coverage root | Tracked | Covered | Partial | Missed | Coverage |
| --- | ---: | ---: | ---: | ---: | ---: |
| `frontend/src` | 5,650 | 4,574 | 474 | 602 | **80.96%** |
| backend `src` | 4,683 | 3,994 | 352 | 337 | **85.29%** |

Both screenshots identify commit **`361954e`**, the release shown live in the Render deployment screenshot. The 11 October snapshot above is the final measurement.

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

[Sprint 1–4 testing roadmap](#roadmap) · [Member 5 audit/source bundle](downloads/technical-source-evidence.zip) · [Git handover](#git-methodology).

## What the evidence does not test

| Boundary | Evidence available | Remaining limit |
| --- | --- | --- |
| Application logic | Automated unit/integration runs, regression inventory and Codecov | Executed lines do not prove every business rule or assertion is correct. |
| Real PostgreSQL concurrency | Migration/smoke evidence and domain conflict tests | Local PGlite tests and short public health probes do not reproduce sustained multi-connection Neon booking/publish races. |
| Auth0 and external services | Role guards, failure paths and dated public checks | Mocked provider responses do not prove live token expiry, Management API outages or every recovery path. |
| Accessibility | Landing-page Lighthouse reports, Organiser snapshot, focus and responsive captures | Manual keyboard and screen-reader acceptance is incomplete; dashboard contrast remains open. |
| Product adoption | Five survey responses and production table counts | No final Advanced-workflow stakeholder sign-off, timed usability study or quantified non-test usage breakdown is included. |

The screenshots and HTML reports are retained with their original dates. Documentation build checks validate this site's content and links; they are not new application test results.
