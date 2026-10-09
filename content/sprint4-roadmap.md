# Sprint 4 — Advanced delivery and final submission

**30 September–11 October 2026 · Milestone 4 · whole-product assessment**

Sprint 4 added the remaining Advanced workflows and completed the Student/Tutor shared scheduling system. Unlike earlier sprint marks, the **Milestone 4 rubric examines the entire delivered product**, including the database, API, application, tooling, integration and quality, not merely the newly added Sprint 4 screens.

## The six-member Advanced feature roadmap

| Order | Member | Implemented contribution and acceptance intent | Explore implementation |
| --- | --- | --- | --- |
| 1 | Shared Student/Tutor timetable and session/search/notification hardening | Generalised existing TimeSlot ownership, reused import/calendar/terms/recurrence and kept role-safe shortcuts. | [Scheduling](#student-scheduling) · [Security](#security) |
| 2 | Draft scenarios, locks, comparison, concurrency, presence and mutual availability | Compare a draft with live staffing without publishing; expose only safe free intervals. | [Features](#features) · [Backend](#backend) |
| 3 | Tutor swaps and Student bookings | Recheck eligibility; atomically store bookings, show both calendars, retain cancellation/history. | [Scheduling](#student-scheduling) · [API](#api) |
| 4 | Student sick notes and responsive/accessible interaction polish | Reuse the Organiser approval style; preserve attendance; handle stale requests and keyboard/table alternatives. | [Frontend](#frontend) · [Testing](#testing) |
| 5 | Cross-system audit timeline, allocation restore and API hardening | Track committed changes safely, restore only after current rules pass, avoid duplicate decisions. | [Backend](#backend) · [Security](#security) |
| 6 | Whole-school proposals, explanations and strategy comparison | Apply the established hard rules and locks, compare weighted presets and save drafts as Scenarios. | [Features](#features) · [Sprint 4 final delivery](#sprint4) |

The handbook details the original acceptance tests on **pages 34–40**. The [Sprint 4 final source record](#sprint4) describes what exists in the supplied final commit `361954e` and links to release evidence; [Git methodology](#git-methodology) explains the chronological integration.

## Milestone 4 — all official assessment criteria

The 20 criteria below reproduce the supplied final rubric’s categories and weights (100% total). Follow the primary evidence chapter, and use the [detailed rubric map](#milestone4) for individual claims, dates and remaining verification boundaries.


### Database (10%)

| Criterion | Weight | Implementation/evidence chapter |
| --- | ---: | --- |
| Data | 3% | [Open data reference](#database) |
| Deployment | 2% | [Open deployment reference](#deployment) |
| Structure | 5% | [Open structure reference](#database) |

### API (25%)

| Criterion | Weight | Implementation/evidence chapter |
| --- | ---: | --- |
| Availability | 3% | [Open availability reference](#api) |
| Architecture | 5% | [Open architecture reference](#backend) |
| Deployment | 2% | [Open deployment reference](#deployment) |
| Performance | 5% | [Open performance reference](#testing) |
| Design | 10% | [Open design reference](#api) |

### Application (42%)

| Criterion | Weight | Implementation/evidence chapter |
| --- | ---: | --- |
| Accessibility | 5% | [Open accessibility reference](#frontend) |
| Aesthetics | 5% | [Open aesthetics reference](#frontend) |
| User Experience | 5% | [Open user experience reference](#frontend) |
| Deployment | 2% | [Open deployment reference](#deployment) |
| Performance | 5% | [Open performance reference](#testing) |
| Features | 10% | [Open features reference](#features) |
| Responsiveness | 5% | [Open responsiveness reference](#frontend) |
| Structure | 5% | [Open structure reference](#architecture) |

### Engineering practice (23%)

| Criterion | Weight | Implementation/evidence chapter |
| --- | ---: | --- |
| Git Methodology | 5% | [Open git methodology reference](#git-methodology) |
| Integration | 3% | [Open integration reference](#integration) |
| Testing | 10% | [Open testing reference](#testing) |
| Tools | 5% | [Open tools reference](#process) |

## Final assessment trail

The site gives separate, scoped evidence for the [API catalogue](#api), [Prisma models and migrations](#database), [UML](#diagrams), [full feature register](#features), [Auth0 roles](#security), [hosted deployment](#deployment), [CI and performance](#testing), [external-holiday integration](#integration), [Git method](#git-methodology) and [work/bug trackers](#work-tracker).

**Not a fabricated production pass:** Current source and 7 October screenshots demonstrate much of the implementation. Some independent checks are identified as not supplied in [Milestone 4 evidence](#milestone4), notably final production data counts, final-main CI evidence and a standalone full accessibility audit. These remain honest scope limitations, not completed test results.

**User feedback:** The final post-release feedback, response analysis and resulting improvements remain the outstanding content round. [Open the existing record and finish this section](#user-feedback).

[Return to the four-sprint roadmap](#roadmap) · [Read official milestone source](documents/coms3011a-2026-official-brief.pdf)

## Member user stories, acceptance checks and assigned tasks

The following index links **every Member's three issue cards** to its specific page in the approved handbook. Each linked page explains the user story, acceptance criteria, tasks, reviewer and handover. These are the team's planned acceptance criteria; actual implementation and release verification are documented separately. Use the [Gitea project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) to inspect issue tracking with authorised access.

| Issue ID | Task / user story title | Full acceptance specification |
| --- | --- | --- |
| `S4-M1-1` | Shared TimeSlot ownership + Student My Timetable | [User story, acceptance tests & tasks — handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M1-2` | Production account/session + stale-target hardening | [User story, acceptance tests & tasks — handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M1-3` | Actionable notifications + Ctrl/Cmd+K recent/favourites | [User story, acceptance tests & tasks — handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M2-1` | Draft scenarios, locks, Compare with Live and Publish | [User story, acceptance tests & tasks — handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M2-2` | Optimistic concurrency, visible Organiser presence + scenario library | [User story, acceptance tests & tasks — handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M2-3` | Mutual Student/Tutor availability service + booking-time panel | [User story, acceptance tests & tasks — handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M3-1` | Tutor swap request -> replacement decision -> Organiser decision | [User story, acceptance tests & tasks — handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M3-2` | Student tutoring booking from a mutual free slot | [User story, acceptance tests & tasks — handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M3-3` | Booking detail, cancellation, history and notifications | [User story, acceptance tests & tasks — handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M4-1` | Student sick note + Organiser approval/status | [User story, acceptance tests & tasks — handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M4-2` | Two-session race/conflict + notification polish | [User story, acceptance tests & tasks — handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M4-3` | Final responsive/accessibility polish + table/list alternatives | [User story, acceptance tests & tasks — handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M5-1` | Cross-system audit trail + Command Centre timeline | [User story, acceptance tests & tasks — handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M5-2` | Allocation restore preview -> restore as a new change | [User story, acceptance tests & tasks — handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M5-3` | Audit filters/export + new Student API hardening | [User story, acceptance tests & tasks — handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M6-1` | Whole-school explainable proposal engine + objective presets | [User story, acceptance tests & tasks — handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |
| `S4-M6-2` | Proposal cockpit: Why this Tutor? / Why not? | [User story, acceptance tests & tasks — handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |
| `S4-M6-3` | Strategy comparison + proposal impact lab | [User story, acceptance tests & tasks — handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |


## Work tracker and cross-sprint implementation map

For **Sprint 4** issues and reviewer/acceptance evidence, open [the Sprint 4 work register](#work-tracker) and the original handbook specifications linked from its issue rows. The current code and final behaviours are explained cumulatively in [Features](#features), [Architecture](#architecture), [Frontend](#frontend), [Backend](#backend), [Scheduling](#student-scheduling) and [Master Organiser](#master-organiser). The [roadmap overview](#roadmap) maps each topic across all four sprints.
