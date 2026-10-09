## One Gitea project tracker, all four sprints

The group used **Gitea Projects, issues, checklists, Member assignments and reviewed branches** as the operational work tracker throughout the semester. This documentation page is the **four-sprint index**; it does not replace the original issues or pretend that a handbook card alone proves its acceptance tests passed. All issue links below have an associated roadmap and source specification.

The screenshots supplied by the team show the four Gitea project boards with completion columns: **Sprint 1 — 18 Done**, **Sprint 2 — 18 Done**, **Sprint 3 — 19 Done**, and **Sprint 4 — 18 Completed** at the time of capture. Those are *board snapshot counts*, not a live query or an independent assessment of production quality. Use the original Gitea board to inspect current status. Wits Gitea may require an authorised account.

| Sprint | Original work board | Issue / acceptance source | Main delivery |
| --- | --- | --- | --- |
| **Sprint 1 — foundation** | [Gitea Tutor MX projects](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) → Sprint 1 | [Sprint 1 roadmap & all 18 cards](#sprint1) · [handbook pages 13–20](documents/tutor-mx-handbook-30-september-2026.pdf#page=13) | Auth0, Express, Prisma, baseline Organiser/Tutor/Student pages and CI |
| **Sprint 2 — Basic** | [Sprint 2 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39) | [Sprint 2 roadmap & all 18 cards](#sprint2) · [handbook pages 21–28](documents/tutor-mx-handbook-30-september-2026.pdf#page=21) | Allocation mutations, real volunteering, timesheet and Organiser approvals |
| **Sprint 3 — Intermediate** | [Sprint 3 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) | [Sprint 3 roadmap](#sprint3) · [completed baseline handbook p.31](documents/tutor-mx-handbook-30-september-2026.pdf#page=31) | Search/notifications, ranking/bulk/reports, import, timesheet corrections and Command Centre |
| **Sprint 4 — Advanced** | [Gitea Tutor MX projects](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) → Sprint 4 | [Sprint 4 roadmap & all 18 cards](#sprint4-roadmap) · [handbook pages 34–41](documents/tutor-mx-handbook-30-september-2026.pdf#page=34) | Student calendar/bookings/sickness; scenarios, swaps, audit, proposals |

The Sprint 1 and Sprint 4 board-specific numeric URLs were not established in the supplied evidence; these links therefore open the confirmed project list rather than an invented location. The Sprint 3 handbook **summarises** its completed work rather than reproducing all original cards, so those original individual Sprint 3 issue details remain on the [real Sprint 3 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42).

## Gitea board screenshots supplied by the team

These are **historical 9 October screenshots**, cropped to the issue board (not continuously refreshed). The Gitea cards themselves remain the authoritative source of current assignments, statuses, acceptance checklists and linked merges. Click any snapshot to inspect it at full size.

| Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 |
| --- | --- | --- | --- |
| [![Sprint 1 Gitea board screenshot](evidence/gitea-sprint1-board-snapshot-2026-10-09.webp)](evidence/gitea-sprint1-board-snapshot-2026-10-09.webp) | [![Sprint 2 Gitea board screenshot](evidence/gitea-sprint2-board-snapshot-2026-10-09.webp)](evidence/gitea-sprint2-board-snapshot-2026-10-09.webp) | [![Sprint 3 Gitea board screenshot](evidence/gitea-sprint3-board-snapshot-2026-10-09.webp)](evidence/gitea-sprint3-board-snapshot-2026-10-09.webp) | [![Sprint 4 Gitea board screenshot](evidence/gitea-sprint4-board-snapshot-2026-10-09.webp)](evidence/gitea-sprint4-board-snapshot-2026-10-09.webp) |

## Sprint 1 issue register — 18 recorded cards

Sprint 1 began with **secure foundation and functional UI**, including explicitly mock-backed Student volunteer and placeholder allocation-save boundaries. The cards below are from the handbook and link to their complete user story, acceptance tests and tasks. [Milestone 1 rubric](#sprint1).

| Issue ID | Task / acceptance objective | Specification |
| --- | --- | --- |
| `S1-M1-1` | Self-service Auth0 sign-up, role onboarding and direct routing | [Handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M1-2` | Account settings, password reset, deletion and route protection | [Handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M1-3` | Authentication contract and permission tests | [Handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M2-1` | Organiser workspace and allocation-board foundation | [Handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M2-2` | Course management and registered-tutor management UI | [Handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M2-3` | Immediate allocation-rule messages and organiser UI tests | [Handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M3-1` | Tutor dashboard using the signed-in tutor identity | [Handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M3-2` | Tutor availability, work-log and excuse forms on real API routes | [Handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M3-3` | Tutor UI contract, responsiveness and accessibility tests | [Handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M4-1` | Student overflow protected UI shell (Sprint 1 mock boundary) | [Handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M4-2` | Shared role navigation and status components | [Handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M4-3` | Student volunteer confirmation and shared UI tests (Sprint 1 mock boundary) | [Handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M5-1` | Separate handwritten Express backend and health endpoint | [Handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M5-2` | Auth middleware and core profile/course/tutor/tutor-workflow routes | [Handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M5-3` | Three allocation-rule functions and boundary tests | [Handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M6-1` | Neon PostgreSQL schema, Prisma migrations and safe seed data | [Handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |
| `S1-M6-2` | Gitea integration checks, public deployment and shared Sprint 1 URL | [Handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |
| `S1-M6-3` | South African public-holiday API spike and fallback contract | [Handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |

## Sprint 2 issue register — 18 recorded cards

Sprint 2 finished the **Basic persisted journeys** on top of Sprint 1 rather than rebuilding the foundation. All six Member roles had three handbook cards. [Milestone 2 rubric](#sprint2) · [live Gitea board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39).

| Issue ID | Task / acceptance objective | Specification |
| --- | --- | --- |
| `S2-M1-1` | Auth lifecycle hardening and email-verification recovery | [Handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M1-2` | Role and ownership protection across the completed Basic API | [Handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M1-3` | Cross-role security smoke suite and assigned fixes | [Handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M2-1` | Organiser course/tutor management hardening - registered tutors only | [Handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M2-2` | Live allocation create, edit and remove with server checks | [Handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M2-3` | Organiser timesheet and overflow approvals with tests | [Handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M3-1` | Tutor dashboard hardening and live assignment refresh | [Handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M3-2` | Complete timesheet submission workflow from existing work logs | [Handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M3-3` | Excuse status workflow and Tutor Basic regression | [Handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M4-1` | Connect Student overflow to real open-work API | [Handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M4-2` | Volunteer request and outcome statuses | [Handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M4-3` | External-result UI, accessibility and Student Basic regression | [Handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M5-1` | Allocation-write and organiser-approval API completion | [Handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M5-2` | Student overflow/volunteer and timesheet-status API | [Handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M5-3` | API contract, deployment and coverage hardening | [Handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M6-1` | Sprint 2 migrations for workflow state and allocation writes | [Handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |
| `S2-M6-2` | Production public-holiday adapter with graceful fallback | [Handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |
| `S2-M6-3` | Allocation data performance, deployment smoke and Codecov reliability | [Handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |

## Sprint 3 issue register — completed board and delivery areas

The supplied Gitea screenshot shows **19 cards in Done** at capture. The 30 September handbook explicitly describes Sprint 3 as a *completed baseline* but does **not** reproduce every S3 issue ID and original acceptance test. To avoid inventing issue identifiers, this table links the genuine board and the handbook's verified delivery areas. Open each Gitea card for its assignee, checklist, discussion and acceptance detail.

| Delivery area visible in source and sprint records | Main work | Evidence |
| --- | --- | --- |
| Identity, discovery and reminders | Notifications, searchable targets, command palette, guided Tutor setup | [Sprint 3 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) · [Frontend](#frontend) |
| Organiser operations | Staffing demand/shortage, ranking, bulk allocation, reports | [Sprint 3 roadmap](#sprint3) · [Backend](#backend) |
| Tutor workflows | CSV/ICS/paste timetable import, academic terms, timesheet correction/declaration/dispute and export | [Scheduling](#student-scheduling) · [API](#api) |
| Student/overflow | Volunteer withdrawal, Organiser post/edit/close and requirement-to-overflow | [Features](#features) · [Sprint 3 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) |
| Reliability and reporting | API permission/validation/idempotency, race checks, Command Centre/shortage/budget visuals | [Testing](#testing) · [Sprint 3 roadmap](#sprint3) |

The supplied screenshot visibly includes cards such as **Student withdrawal UI**, **Organiser post/edit/close overflow**, **responsive polish and representative user testing**, **CSV/ICS/paste timetable import**, **returned timesheet corrections and disputes**, **payroll-ready export** and **notification inbox/reminders**. This is a *partial visible selection*, not a fabricated complete list of 19 card titles. [Open the actual Sprint 3 board to review all 19.](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42)

## Sprint 4 issue register — 18 recorded cards

Sprint 4 added **Student scheduling and Advanced planning** using the existing Sprint 1–3 system; every handbook card names a story and specific acceptance tests. [Milestone 4 whole-system rubric](#sprint4-roadmap).

| Issue ID | Task / acceptance objective | Specification |
| --- | --- | --- |
| `S4-M1-1` | Shared TimeSlot ownership + Student My Timetable | [Handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M1-2` | Production account/session + stale-target hardening | [Handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M1-3` | Actionable notifications + Ctrl/Cmd+K recent/favourites | [Handbook p. 35](documents/tutor-mx-handbook-30-september-2026.pdf#page=35) |
| `S4-M2-1` | Draft scenarios, locks, Compare with Live and Publish | [Handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M2-2` | Optimistic concurrency, visible Organiser presence + scenario library | [Handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M2-3` | Mutual Student/Tutor availability service + booking-time panel | [Handbook p. 36](documents/tutor-mx-handbook-30-september-2026.pdf#page=36) |
| `S4-M3-1` | Tutor swap request -> replacement decision -> Organiser decision | [Handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M3-2` | Student tutoring booking from a mutual free slot | [Handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M3-3` | Booking detail, cancellation, history and notifications | [Handbook p. 37](documents/tutor-mx-handbook-30-september-2026.pdf#page=37) |
| `S4-M4-1` | Student sick note + Organiser approval/status | [Handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M4-2` | Two-session race/conflict + notification polish | [Handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M4-3` | Final responsive/accessibility polish + table/list alternatives | [Handbook p. 38](documents/tutor-mx-handbook-30-september-2026.pdf#page=38) |
| `S4-M5-1` | Cross-system audit trail + Command Centre timeline | [Handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M5-2` | Allocation restore preview -> restore as a new change | [Handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M5-3` | Audit filters/export + new Student API hardening | [Handbook p. 39](documents/tutor-mx-handbook-30-september-2026.pdf#page=39) |
| `S4-M6-1` | Whole-school explainable proposal engine + objective presets | [Handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |
| `S4-M6-2` | Proposal cockpit: Why this Tutor? / Why not? | [Handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |
| `S4-M6-3` | Strategy comparison + proposal impact lab | [Handbook p. 40](documents/tutor-mx-handbook-30-september-2026.pdf#page=40) |

## How cards moved from planning to reviewed completion

1. **Sprint planning:** members read the handbook, discuss each role's issues and acceptance criteria, select preferences and vote on the six responsibilities. The agreed choice is reflected in ownership and the Gitea issue board.
2. **Build and self-test:** the responsible Member implements the story, performs the relevant local browser flow and executes the project's test/check/coverage commands.
3. **Review and integrate:** a reviewer checks the acceptance behaviour and branch. The Integration Lead merges approved changes to Gitea `main` and reruns relevant regression.
4. **Improve after Sprint 2:** early sprints progressed less chronologically and had dependency/merge problems. For Sprints 3–4 the group adopted an exact **Member 1 → review/merge → Member 2 → … → Member 6** sequence, starting each next branch from updated `main`.
5. **Record evidence:** the reviewer retains the issue, branch/PR, completed CI status, Codecov output and reproducible demonstration. A Done column is not by itself proof of a passing independent release gate.

See [Team methodology](#process), [Git methodology](#git-methodology), [testing evidence](#testing), [source downloads](#references) and the [four-sprint feature register](#features).
