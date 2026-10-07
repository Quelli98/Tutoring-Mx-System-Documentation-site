## Every criterion has a written answer

This page maps every Milestone 4 criterion to a concrete Tutor MX explanation, evidence and remaining verification. **A documented implementation is not the same as a completed production test.** The map identifies the difference so the marker can inspect both what exists and what still needs release evidence.

The newer supplied rubric screenshots set Aesthetics to 5%, Integration to 3% and Testing to 10%. The visible screenshots omit Responsiveness, App Structure and the complete Git Methodology row; their 5% weights are retained from the older project brief with an asterisk. The total is 100% if those three weights are unchanged. Confirm the complete current rubric before submission.

## Marker walkthrough

1. Read [Architecture](#architecture) for the frontend/backend/database boundaries, then [Deployment](#deployment) for actual links and configuration.
2. Use the [external API examples](#api) and filter the source-registered operation catalogue.
3. Browse [all database models](#database) and the relationship map; use the read-only evidence queries for real counts.
4. Inspect the [eight UML workflow/structure diagrams plus the ERD](#diagrams), then use the Sprint 4 page/source catalogue for the final implemented state.
5. Read [Git methodology](#git-methodology), [project process](#process), [testing](#testing), [feature status](#features) and the [final Sprint 4 delivery record](#sprint4).
6. Follow the evidence links, historical feedback and source downloads; distinguish their dates and tested scope.

## Final evidence status after the 7 October capture

The final evidence bundle now includes the release repository at `361954e`, Render live deployment, exact-release Codecov, a successful Gitea Actions run for the reviewed Member 6 branch immediately before the final merge, Neon production-branch/table screenshots, redacted-safe Auth0 role configuration, live Student/Tutor/Organiser UI captures, responsive device-emulation captures, and deployed `/health`/`/ready` latency plus light-load measurements.

The remaining gaps are narrower and are stated rather than hidden: the supplied Gitea screenshot shows the green reviewed branch commit `2f62311` rather than a separate green run for merge commit `361954e`; Neon production row counts and the actual `_prisma_migrations` rows were not captured; no standalone Lighthouse/screen-reader report or complete keyboard-test transcript was supplied; and no separate final stakeholder sign-off / unresolved-defect register was supplied. The documentation therefore does not invent those results.

[Current main rubric screenshot](evidence/rubric-m4-main.png) · [Current quality fragment](evidence/rubric-m4-quality.png) · [Original project brief](documents/project-brief.pdf).
