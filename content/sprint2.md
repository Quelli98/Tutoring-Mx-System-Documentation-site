# Sprint 2 — end-to-end Basic workflows

**26 August–15 September 2026 · Milestone 2 · Basic completion**

Sprint 2 replaced Sprint 1’s deliberate mock and placeholder boundaries with real service/database workflows. The project moved from a credible architecture demonstration to meaningful allocation, Tutor and Student tasks that persist and can be reviewed.

## End-to-end delivery roadmap

1. **Accounts and permissions:** recover safely from session/reset/verification failures; reject cross-role and cross-user operations.
2. **Organiser:** manage existing Tutors/courses, save/edit/remove allocations with mark/clash/hour checks, and approve or return requests.
3. **Tutor:** refresh actual assignments and weekly work, submit timesheets, and see excuse and review states.
4. **Student:** load real available overflow work, volunteer once, see an outcome and block duplicate/closed claims.
5. **Backend/database:** introduce transactional writes, state constraints, consistent errors, API tests and migrations.
6. **External integration and release:** turn the public-holiday spike into a backend adapter with a controlled fallback and retain CI/deployment evidence.

## Milestone 2 — every official rubric criterion

| Official criterion | Weight | Evidence / reference | What to inspect |
| --- | ---: | --- | --- |
| Core Features | 25% | [Open core features evidence](#features) | Real allocation writes/approvals, persisted Student overflow and Tutor timesheets. |
| Automated Testing | 10% | [Open automated testing evidence](#testing) | API and UI suites, dated outputs and coverage evidence. |
| Stakeholder Reviews | 10% | [Open stakeholder reviews evidence](#stakeholder-decisions) | Dated client consultations, decisions and follow-through. |
| API | 15% | [Open api evidence](#api) | Externally callable handwritten endpoints and relevant external integration. |
| User Feedback | 10% | [Open user feedback evidence](#user-feedback) | Historical response screenshots and the remaining final feedback collection. |
| Project Methodology | 10% | [Open project methodology evidence](#process) | Documented method used for planning, review and change. |
| Bug Tracker | 5% | [Open bug tracker evidence](#bug-tracker) | Reproducible defect records, owner, status and retest. |
| Database Documentation | 5% | [Open database documentation evidence](#database) | Schema, relationships, deployment boundaries and database motivation. |
| Third-Party Code Documentation | 5% | [Open third-party code documentation evidence](#third-party-code) | Dependency/provider inventory with reasons for choosing them. |
| Testing Documentation | 5% | [Open testing documentation evidence](#testing) | Test commands, policy, workflow checks, scope and evidence. |

## Responsibility and handover roadmap

| Member | Sprint 2 new scope | Current documentation |
| --- | --- | --- |
| 1 | Auth/account lifecycle hardening and cross-role security smoke checks. | [Security](#security) · [Testing](#testing) |
| 2 | Real allocation mutations and approval screens. | [Features](#features) · [API](#api) |
| 3 | Submitted work logs/timesheets, excuse status and Tutor regression. | [Features](#features) · [Testing](#testing) |
| 4 | Persisted Student overflow/volunteers, accessible fallback and Student regression. | [Features](#features) · [Frontend](#frontend) |
| 5 | Allocation-write, approvals, timesheet and Student HTTP contracts. | [Backend](#backend) · [API](#api) |
| 6 | Extended database constraints, public-holiday adapter, query/release checks. | [Database](#database) · [Integration](#integration) |

## Stabilisation before Sprint 3

Live/integrated testing on 15–16 September identified and corrected Tutor preference ownership, the shared week-calendar presentation, omitted candidate clash-detail mapping, self-conflicting post-save allocations and the completed-session work-log guard. These were narrowly tested corrections rather than a repeated Sprint 1/2 implementation. See [Project evolution and decision history](#roadmap) and [Latest changes](#changes).

## Historical and source evidence

The 30 September handbook retains the original cards on **pages 21–28** and the production stabilisation on **page 29**. See the [original Sprint 2 handbook pages](documents/tutor-mx-handbook-30-september-2026.pdf#page=21), the [Gitea Sprint 2 board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39), the consolidated [source evidence](#references) and [testing](#testing) with their actual dates.

[Read Sprint 3: Intermediate operations →](#sprint3)

## Member user stories, acceptance checks and assigned tasks

The following index links **every Member's three issue cards** to its specific page in the approved handbook. Each linked page explains the user story, acceptance criteria, tasks, reviewer and handover. These are the team's planned acceptance criteria; actual implementation and release verification are documented separately. Use the [Gitea project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) to inspect issue tracking with authorised access.

| Issue ID | Task / user story title | Full acceptance specification |
| --- | --- | --- |
| `S2-M1-1` | Auth lifecycle hardening and email-verification recovery | [User story, acceptance tests & tasks — handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M1-2` | Role and ownership protection across the completed Basic API | [User story, acceptance tests & tasks — handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M1-3` | Cross-role security smoke suite and assigned fixes | [User story, acceptance tests & tasks — handbook p. 22](documents/tutor-mx-handbook-30-september-2026.pdf#page=22) |
| `S2-M2-1` | Organiser course/tutor management hardening - registered tutors only | [User story, acceptance tests & tasks — handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M2-2` | Live allocation create, edit and remove with server checks | [User story, acceptance tests & tasks — handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M2-3` | Organiser timesheet and overflow approvals with tests | [User story, acceptance tests & tasks — handbook p. 23](documents/tutor-mx-handbook-30-september-2026.pdf#page=23) |
| `S2-M3-1` | Tutor dashboard hardening and live assignment refresh | [User story, acceptance tests & tasks — handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M3-2` | Complete timesheet submission workflow from existing work logs | [User story, acceptance tests & tasks — handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M3-3` | Excuse status workflow and Tutor Basic regression | [User story, acceptance tests & tasks — handbook p. 24](documents/tutor-mx-handbook-30-september-2026.pdf#page=24) |
| `S2-M4-1` | Connect Student overflow to real open-work API | [User story, acceptance tests & tasks — handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M4-2` | Volunteer request and outcome statuses | [User story, acceptance tests & tasks — handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M4-3` | External-result UI, accessibility and Student Basic regression | [User story, acceptance tests & tasks — handbook p. 25](documents/tutor-mx-handbook-30-september-2026.pdf#page=25) |
| `S2-M5-1` | Allocation-write and organiser-approval API completion | [User story, acceptance tests & tasks — handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M5-2` | Student overflow/volunteer and timesheet-status API | [User story, acceptance tests & tasks — handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M5-3` | API contract, deployment and coverage hardening | [User story, acceptance tests & tasks — handbook p. 26](documents/tutor-mx-handbook-30-september-2026.pdf#page=26) |
| `S2-M6-1` | Sprint 2 migrations for workflow state and allocation writes | [User story, acceptance tests & tasks — handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |
| `S2-M6-2` | Production public-holiday adapter with graceful fallback | [User story, acceptance tests & tasks — handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |
| `S2-M6-3` | Allocation data performance, deployment smoke and Codecov reliability | [User story, acceptance tests & tasks — handbook p. 27](documents/tutor-mx-handbook-30-september-2026.pdf#page=27) |

[Sprint 2 project board on Gitea](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39) — issue statuses, assigned members and checklists.
