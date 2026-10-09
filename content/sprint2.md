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

Live/integrated testing on 15–16 September identified and corrected Tutor preference ownership, the shared week-calendar presentation, omitted candidate clash-detail mapping, self-conflicting post-save allocations and the completed-session work-log guard. These were narrowly tested corrections rather than a repeated Sprint 1/2 implementation. See [Project evolution and decision history](#project-evolution) and [Latest changes](#changes).

## Historical and source evidence

The 30 September handbook retains the original cards on **pages 21–28** and the production stabilisation on **page 29**. The [original Sprint 2 rubric/evidence map](#rubric), [archived evidence](#sprint-evidence) and [testing](#testing) remain accessible with their original dates.

[Read Sprint 3: Intermediate operations →](#sprint3)
