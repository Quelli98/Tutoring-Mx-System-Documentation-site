# Sprint 1 — foundation and project setup

**3–25 August 2026 · Milestone 1 · foundational delivery**

Sprint 1 established the project’s shared direction. The priority was not to complete every Advanced feature: it was to make identity, roles, the handwritten API, database schema, frontend workspaces, source control and a public development path work together. Later sprints extended this foundation rather than rebuilding it.

## Delivered scope and intentional boundaries

- **Authentication:** Auth0 identity and role-linked application profiles, protected role workspaces, password/account lifecycle and security contracts.
- **Organiser:** course and registered-Tutor management plus the initial allocation board and visible eligibility rules.
- **Tutor:** own-data dashboard, timetable/availability, work-log and excuse forms.
- **Student:** protected overflow/volunteer interface, initially supported by a deliberately temporary mock boundary.
- **Platform:** separate React/Vite frontend and handwritten Express backend, Prisma migrations/Neon data, initial external-holiday research, CI and public hosting.
- **Carried into Sprint 2:** real allocation writes and persisted Student volunteer/approval state, rather than presenting those early placeholders as complete.

## Milestone 1 — every official rubric criterion

| Official criterion | Weight | Evidence / reference | What to inspect |
| --- | ---: | --- | --- |
| Version Control | 10% | [Open version control evidence](#git-methodology) | Branching, reviewed commits, main integration and repository evidence. |
| Documentation Site | 10% | [Open documentation site evidence](#home) | Publicly hosted documentation, meaningful technical and project history. |
| Getting Started / Dev Guides | 5% | [Open getting started / dev guides evidence](#readme) | Repository setup, commands, required environment and dev instructions. |
| Work Tracker | 5% | [Open work tracker evidence](#work-tracker) | Owned issues, work states and completed handover records. |
| Git Methodology | 5% | [Open git methodology evidence](#git-methodology) | Rationale and use of the branch, review and merge process. |
| Project Methodology | 10% | [Open project methodology evidence](#process) | Scrum-style coordination, Definition of Done and retrospective decisions. |
| Tech Stack | 5% | [Open tech stack evidence](#architecture) | Selection and motivation of React/Vite, Node/Express, Auth0, Prisma, Neon and hosting. |
| Stakeholder Interaction | 10% | [Open stakeholder interaction evidence](#stakeholder-decisions) | Client requirements and dated decision evidence. |
| Initial Design & Dev Plan | 20% | [Open initial design & dev plan evidence](#diagrams) | Requirements, initial user journeys, architecture, UI planning and sprint sequencing. |
| Implementation | 20% | [Open implementation evidence](#features) | Working first-sprint foundation and clearly labelled mock/placeholder boundaries. |

## Responsibility and handover roadmap

| Member | Sprint 1 responsibility | Where it is described |
| --- | --- | --- |
| 1 | Auth0 onboarding, route protection, account lifecycle and token contracts. | [Security](#security) · [Frontend](#frontend) |
| 2 | Organiser board, course/Tutor management and immediate mark/clash/capacity guidance. | [Features](#features) · [Backend](#backend) |
| 3 | Tutor dashboard, own schedule, work logs, excuse forms and accessible regression checks. | [Features](#features) · [Testing](#testing) |
| 4 | Student overflow prototype and consistent shared responsive navigation. | [Frontend](#frontend) · [Features](#features) |
| 5 | Separate handwritten Express API, bearer-token/role enforcement and allocation rules. | [Backend](#backend) · [API](#api) |
| 6 | Prisma/Neon migrations, CI and deployment baseline, external public-holiday spike. | [Database](#database) · [Integration](#integration) |

## Sprint 1 source evidence

The 30 September team handbook retains the original Member 1–6 cards on **pages 13–20**. The original dated plans and evidence are linked directly from this maintained Sprint 1 roadmap. [Open the historical Sprint 1 handbook pages](documents/tutor-mx-handbook-30-september-2026.pdf#page=13), or review [source documents and screenshots](#references).

[Read Sprint 2: completing the Basic journeys →](#sprint2)

## Member user stories, acceptance checks and assigned tasks

The following index links **every Member's three issue cards** to its specific page in the approved handbook. Each linked page explains the user story, acceptance criteria, tasks, reviewer and handover. These are the team's planned acceptance criteria; actual implementation and release verification are documented separately. Use the [Gitea project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) to inspect issue tracking with authorised access.

| Issue ID | Task / user story title | Full acceptance specification |
| --- | --- | --- |
| `S1-M1-1` | Self-service Auth0 sign-up, role onboarding and direct routing | [User story, acceptance tests & tasks — handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M1-2` | Account settings, password reset, deletion and route protection | [User story, acceptance tests & tasks — handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M1-3` | Authentication contract and permission tests | [User story, acceptance tests & tasks — handbook p. 14](documents/tutor-mx-handbook-30-september-2026.pdf#page=14) |
| `S1-M2-1` | Organiser workspace and allocation-board foundation | [User story, acceptance tests & tasks — handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M2-2` | Course management and registered-tutor management UI | [User story, acceptance tests & tasks — handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M2-3` | Immediate allocation-rule messages and organiser UI tests | [User story, acceptance tests & tasks — handbook p. 15](documents/tutor-mx-handbook-30-september-2026.pdf#page=15) |
| `S1-M3-1` | Tutor dashboard using the signed-in tutor identity | [User story, acceptance tests & tasks — handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M3-2` | Tutor availability, work-log and excuse forms on real API routes | [User story, acceptance tests & tasks — handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M3-3` | Tutor UI contract, responsiveness and accessibility tests | [User story, acceptance tests & tasks — handbook p. 16](documents/tutor-mx-handbook-30-september-2026.pdf#page=16) |
| `S1-M4-1` | Student overflow protected UI shell (Sprint 1 mock boundary) | [User story, acceptance tests & tasks — handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M4-2` | Shared role navigation and status components | [User story, acceptance tests & tasks — handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M4-3` | Student volunteer confirmation and shared UI tests (Sprint 1 mock boundary) | [User story, acceptance tests & tasks — handbook p. 17](documents/tutor-mx-handbook-30-september-2026.pdf#page=17) |
| `S1-M5-1` | Separate handwritten Express backend and health endpoint | [User story, acceptance tests & tasks — handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M5-2` | Auth middleware and core profile/course/tutor/tutor-workflow routes | [User story, acceptance tests & tasks — handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M5-3` | Three allocation-rule functions and boundary tests | [User story, acceptance tests & tasks — handbook p. 18](documents/tutor-mx-handbook-30-september-2026.pdf#page=18) |
| `S1-M6-1` | Neon PostgreSQL schema, Prisma migrations and safe seed data | [User story, acceptance tests & tasks — handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |
| `S1-M6-2` | Gitea integration checks, public deployment and shared Sprint 1 URL | [User story, acceptance tests & tasks — handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |
| `S1-M6-3` | South African public-holiday API spike and fallback contract | [User story, acceptance tests & tasks — handbook p. 19](documents/tutor-mx-handbook-30-september-2026.pdf#page=19) |


## Work tracker and cross-sprint implementation map

For **Sprint 1** issues and reviewer/acceptance evidence, open [the Sprint 1 work register](#work-tracker) and the original handbook specifications linked from its issue rows. The current code and final behaviours are explained cumulatively in [Features](#features), [Architecture](#architecture), [Frontend](#frontend), [Backend](#backend), [Scheduling](#student-scheduling) and [Master Organiser](#master-organiser). The [roadmap overview](#roadmap) maps each topic across all four sprints.
