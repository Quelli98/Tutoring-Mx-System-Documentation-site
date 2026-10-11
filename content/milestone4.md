## Final assessment at a glance

The rubric below answers each of the 20 Milestone 4 criteria with a short explanation and a link to the chapter and evidence that support it. The criteria and weights come from section 3.4 of the [official COMS3011A project brief](documents/coms3011a-2026-official-brief.pdf#page=11) and total 100%.

## Marker walkthrough

1. Read [Architecture](#architecture) for the frontend/backend/database boundaries, then [Deployment](#deployment) for actual links and configuration.
2. Use the [external API examples](#api) and filter the source-registered operation catalogue.
3. Browse [all database models](#database) and the relationship map; use the read-only evidence queries for real counts.
4. Inspect the [eight UML workflow/structure diagrams plus the ERD](#diagrams), then use the Sprint 4 page/source catalogue for the final implemented state.
5. Read [Git methodology](#git-methodology), [project process](#process), [testing](#testing), [feature status](#features) and the [final Sprint 4 delivery record](#sprint4).
6. Follow the evidence links, historical feedback and source downloads; distinguish their dates and tested scope.

[Original requirements](#requirements) · [Separate report rubrics](#report-guide). All 20 criteria are documented; the 100% total describes rubric weight, not a predicted mark.

## Final release evidence

The final application code is the audited merge [`a3939f8`](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/commit/a3939f85d81c6911affa6125b423152719e5b801) on Gitea `main` (10 October 2026), which merged the final audit through [pull request #104](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/104) on top of the 7 October release commit `361954e`. Two smaller commits followed on 11 October, a frontend test fix (`6b528a3`) and a README update (`3540d46`); neither changes application code. The audit made proposal-generation and audit-trail fixes and added regression tests. It did not change the database schema or the API routes, so the API catalogue and database dictionary on this site describe the final code.

- **Automated tests (team audit record):** 1,466 backend tests and 847 frontend tests pass on the final code ([final audit](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/src/branch/main/docs/final-audit.md), [validation summary](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/src/branch/main/docs/evidence/final-audit/validation-summary.json)).
- **CI (team audit record):** all three Gitea Actions jobs passed on `a3939f8`: backend quality and coverage, frontend quality and coverage, and a clean PostgreSQL migration with API smoke test ([Actions](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/actions)).
- **Codecov** (11 October 2026): 85.42% backend and 80.87% frontend line coverage, 82.93% combined ([Testing](#testing)).
- **Production data** (11 October 2026): 353 rows across 18 of 30 tables, including 27 accounts (9 Students, 10 Tutors, 8 Organisers), with all 30 migrations applied ([Database](#database)).
- **Deployment:** dated 7 October Render/Cloudflare deployment captures, Neon production branch and tables, Auth0 role configuration, Student/Tutor/Organiser screens and responsive captures ([Deployment](#deployment)).
- **Lighthouse** (11 October 2026): the landing page scored 100 for accessibility on mobile and desktop, with performance 79 on mobile and 93 on desktop; the signed-in Organiser dashboard passed 30 of 31 accessibility checks ([Testing](#testing)).
- **Performance:** first-request and warm `/health` and `/ready` latency plus light-load samples on the deployed API ([Testing](#testing)).
- **Service checks:** public API and frontend checks re-run on 11 October 2026 ([Overview](#home)).

## Known limitations

- Lighthouse (11 October 2026) found eight colour-contrast failures on the Organiser dashboard and an unreadable `robots.txt`; neither has been fixed yet. No screen-reader test or full keyboard-navigation record is included.
- The phone- and tablet-width device-emulation captures show a horizontal scrollbar at the bottom of the viewport.
- The Sprint 4 features (scenarios, bookings, Tutor swaps, Student sick notes and the audit log) have automated-test evidence, but their tables were empty in the 11 October production snapshot; this does not establish final live acceptance.
- API load testing is limited to short light-load samples (5 connections for 10 seconds); no sustained load test was run.
- User testing comprised nine submissions to one Google Form between 26 September and 2 October 2026; these are not verified as nine unique participants or as tests of the final deployed release ([User feedback](#user-feedback)).
- No separate final stakeholder sign-off document is included.

- The retained deployment screenshots identify the 7 October release; a later deployed commit is not established by the 10–11 October audit/coverage records.
- The exact non-test share of production data and a cross-browser close/reopen/expiry acceptance test are not established.
