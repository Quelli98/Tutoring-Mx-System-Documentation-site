## Requirements and acceptance traceability

This page maps the project to the **attached 15-page COMS3011A brief**, sections 2.1–2.2, and the project-specific Tutor Management System brief. It complements the [20 weighted final criteria](#milestone4); documentation coverage is not an awarded grade.

## Requirements shared by every project

| Requirement | Tutor MX implementation and evidence | Inspect |
| --- | --- | --- |
| Git version control | Official Gitea repository, reviewed Member branches, sequential later-sprint merges and deployment mirror | [Git methodology](#git-methodology) · [Work tracker](#work-tracker) |
| Responsiveness and accessibility | Role-aware responsive screens, Compact/list alternatives, focus states and Lighthouse evidence; recorded contrast/overflow limitations remain | [Frontend](#frontend) · [Testing](#testing) |
| CI/CD | Application quality/coverage/migration gates in Gitea; reviewed-source release to Render/Cloudflare; separate GitHub Pages workflow for this site | [Deployment](#deployment) · [Testing](#testing) |
| Separate frontend and backend | React/Vite browser UI calls the independently deployed Express HTTP API | [Architecture](#architecture) · [Backend](#backend) |
| Handwritten API | 120 registered Express operations; Prisma manages persistence, not generated public HTTP endpoints | [API catalogue](#api/catalogue) · [Route source](downloads/api-routes.ts.txt) |
| Established authentication and security | Auth0 sign-up/sign-in/password reset/account deletion; server role/ownership checks; Master approval for lecturers | [Security](#security) · [Account and role journeys](#student-scheduling) |
| Relevant external API | South African public holidays via the Nager.Date backend adapter, with timeout/cache/fallback | [Integration](#integration) |
| Public documentation website | Static React/Markdown build on GitHub Pages, readable without a documentation account; private Gitea evidence is labelled | [Site guide](#site-guide) · [Sources](#references) |

## Tutor Management System feature tiers

The tiers are cumulative. The final-source register documents these capabilities; a separate production acceptance record is needed to establish how every feature behaves for real users.

| Tier | Required capability | Implementation trail |
| --- | --- | --- |
| Basic | Courses, Tutors, course marks, busy times and weekly-hour limits | [Database models](#database) · [Feature register](#features) |
| Basic | One allocation board with immediate marks/clash/capacity feedback | [Frontend task paths](#frontend/navigation-and-first-time-use) · [Allocation contracts](#api) |
| Basic | Work logs, timesheet submission/sign-off, excuses and Student volunteering | [All-role walkthrough](#student-scheduling) · [Backend rules](#backend) |
| Basic | A distinct and understandable entry for Student, Tutor and Organiser | [Navigation and first use](#frontend/navigation-and-first-time-use) |
| Intermediate | Tutor ranking, bulk assignments, shortages and recorded override reasons | [Organiser features](#features) · [Sprint 3](#sprint3) |
| Intermediate | Timetable import, recurring exceptions and academic terms | [Shared scheduling](#student-scheduling) · [Schema](#database) |
| Intermediate | Timesheet corrections/disputes, reminders and payroll export | [Tutor workflow](#student-scheduling) · [Backend](#backend) |
| Intermediate | Posted overflow work, approved volunteer claims and assignment notifications | [Feature register](#features) · [API](#api) |
| Intermediate | Course hours, budget/spend and workload distribution | [Organiser features](#features) · [Sprint 3](#sprint3) |
| Intermediate | Guided onboarding, global search, keyboard navigation and bulk actions | [Frontend](#frontend) · [Testing](#testing) |
| Advanced | Whole-school proposals balancing objectives, preserving locks and explaining choices | [Final release](#sprint4) · [Member 6 acceptance record](#sprint4-roadmap) |
| Advanced | Multi-Organiser presence and conflict-aware editing | [Scenario features](#features) · [Backend](#backend) |
| Advanced | Side-by-side drafts, comparison and explicit publish | [Role walkthrough](#student-scheduling) · [Scenario API](#api) |
| Advanced | Tutor swaps with eligibility checks and approval | [Tutor journey](#student-scheduling) · [API](#api) |
| Advanced | Recorded changes and restoration of an earlier allocation state | [Audit and restore](#backend) · [Final release](#sprint4) |

Student tutoring bookings and Student sick notes extend the original brief through the later handbook and stakeholder decisions. These additions do not replace any of the original allocation or administration requirements.

## Authoritative source documents

- [Current general brief, including all assessment rubrics](documents/coms3011a-2026-official-brief.pdf#page=4)
- [Tutor Management System feature brief](documents/tutor-management-project-brief.pdf)
- [30 September handbook with Member acceptance specifications](documents/tutor-mx-handbook-30-september-2026.pdf)
- [Known product and verification limitations](#milestone4/known-limitations)
