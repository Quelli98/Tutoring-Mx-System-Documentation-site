# Sprint 3 — Intermediate features and stabilisation

**16–29 September 2026 · Milestone 3 · near-complete release**

Sprint 3 extended the Basic system into a more effective Tutor-management product. The 30 September handbook explicitly classifies Sprint 3 as a **completed baseline**, not an unfinished target. The current site records these features as historical Sprint 3 delivery and then traces later refinements separately.

## Completed Intermediate functionality

- **Discover and respond:** notifications/reminders and secure course/Tutor/timesheet search with a Ctrl/Cmd+K command palette; guided Tutor setup.
- **Plan staffing:** demand/shortage tracking, explainable Tutor ranking, bulk preview/commit, and a reasoned manual override.
- **Understand the school:** budget/workload/course-hours reporting, fairness/shortage summaries and an Organiser Command Centre with attention indicators.
- **Share calendars:** Tutor timetable entry plus CSV/ICS/paste import, academic terms and recurrent/exception-aware timetable handling; subsequent late-September fixes unified the manual/import calendar and introduced fortnightly recurrence.
- **Complete Tutor administration:** timesheet corrections/revisions/declarations/disputes and approved payroll export; Tutor excuses handled with preserved attendance states.
- **Handle overflow:** Organiser work posting/editing/closing, Student claims and withdrawal.
- **Hardening:** role validation, retry-safe write receipts, transaction safeguards and API test regression.

## Milestone 3 — every official rubric criterion

| Official criterion | Weight | Evidence / reference | What to inspect |
| --- | ---: | --- | --- |
| User Feedback | 10% | [Open user feedback evidence](#user-feedback) | Five historic responses and screenshots; final post-release feedback is still pending. |
| Automated Testing | 10% | [Open automated testing evidence](#testing) | Backend/frontend automated tests plus Codecov, retaining dated sprint baselines. |
| Feature Implementation | 20% | [Open feature implementation evidence](#features) | Search/notifications, ranking, bulk actions, timesheets, imports and Command Centre. |
| API Implementation | 20% | [Open api implementation evidence](#api) | Expanded protected Express routes for Intermediate workflows. |
| Performance | 5% | [Open performance evidence](#testing) | Performance work and reported timings, carefully separated by test date/scope. |
| Improvement | 5% | [Open improvement evidence](#stakeholder-decisions) | Recorded stakeholder feedback and concrete user-facing changes. |
| Documentation | 15% | [Open documentation evidence](#references) | Feature/API/database/testing documents and linked evidence. |
| Project Methodology | 15% | [Open project methodology evidence](#process) | Sprint planning, coordinated sequential integration and review evidence. |

## Six-member delivery areas

| Member | Sprint 3 completed focus | Technical location |
| --- | --- | --- |
| 1 | Notifications, reminders, safe search and guided Tutor onboarding. | [Frontend](#frontend) · [Security](#security) |
| 2 | Requirements/shortages, ranking, bulk allocation and reporting. | [Features](#features) · [Backend](#backend) |
| 3 | CSV/ICS timetable import, term handling, corrections, disputes and payroll export. | [Student/Tutor scheduling](#student-scheduling) · [API](#api) |
| 4 | Student volunteer withdrawal, Organiser overflow management and accessible interfaces. | [Features](#features) · [Frontend](#frontend) |
| 5 | Validation, ownership/security, idempotency and race-safe API writes. | [API](#api) · [Testing](#testing) |
| 6 | Command Centre summaries, shortage heatmap and budget/workload/fairness views. | [Features](#features) · [Database](#database) |

## Integration and quality evidence

Sprint 3 was handed over one Member branch at a time to the Integration Lead, then integrated and verified against updated main. Historical Codecov screenshots and test observations are retained as **dated snapshots**, not silently relabelled as final Sprint 4 measurements. See [Git workflow](#git-methodology), [Testing and Codecov](#testing), [Sprint 3 project board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) and [project evolution](#roadmap).

## Feedback boundary

The [user-feedback record](#user-feedback) includes a prior five-response survey and at least one recorded change. An additional final-release user-feedback round has not been supplied; this is deliberately marked outstanding rather than presented as verified.

[Read Sprint 4: Advanced and full-project submission →](#sprint4-roadmap)

## Sprint 3 stories, acceptance and completed tasks on Gitea

[Sprint 3 project board — Gitea](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42) holds the completed cards, including the original member assignments, checklist progress and issue discussions. The **30 September handbook explicitly marks Sprint 3 as a completed baseline**, summarising its delivered capabilities on page 31. This edition does not invent a verbatim Sprint 3 issue list absent from that handbook: consult the actual Gitea cards for the precise acceptance checks, user stories and task-level discussion.

For review without internal account access, the [Sprint 3 feature register](#features), [testing evidence](#testing), [work tracker](#work-tracker) and [Source/evidence library](#references) document the integrated outcomes.
