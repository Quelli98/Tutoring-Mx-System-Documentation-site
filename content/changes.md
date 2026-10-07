## Changes prompted by the updated documents

| Area | Previous baseline | Updated source / handbook |
| --- | --- | --- |
| API | 76 operations | 82; six organiser application and Master review operations added |
| Database | 19 models, 11 enums, 22 migrations | 20 models, 14 enums, 25 migrations |
| Organiser onboarding | Earlier standard onboarding/allow-self-service setting | Lecturer application → Pending → trusted Master review → approved Profile/role |
| Master privilege | Not in earlier inspected code | Additional Auth0 capability on an Organiser; no fourth Profile role |
| Tutor attendance | Earlier excuse workflow | Attendance/reviewer fields and explicit Excused/Skipped behaviour |
| Timetable identity | Earlier shared Tutor timetable | Unique deduplication key; preserve current recurrence/import engine |
| Session cache | Earlier source memory cache | Current source local storage; README discrepancy explicitly corrected |
| Sprint 3 | Earlier roadmap/history | Completed foundation; retained regression targets |
| Sprint 4 | Earlier Advanced plan | Student timetable, mutual availability, booking and sickness added to M1–M4; M5/M6 reuse these |
| UML | Earlier source model | All eight revised to distinguish current baseline and updated target design |

## What was retained

The website keeps the full original project history, meetings, user feedback, dated coverage and platform evidence. The written architecture, external API guide, schema explorer, README organisation, rubric map and Git methodology remain part of the rebuild. No application business logic was changed by this documentation task.

`VERIFICATION.md` in the project records the checks actually completed for this documentation release. Historical deployment and coverage records retain their original dates.


## Final Sprint 4 completion update — 7 October 2026

The final code supplied after the 30 September planning update changes Sprint 4 from **target scope** to **implemented scope**. The documentation now records release `main` at `361954e`, 120 registered operations, 30 Prisma models, 30 migrations, Student scheduling/booking/sickness, Scenarios, swaps, audit/restore and the Member 6 explainable proposal lab.

The supplied final evidence also adds Render deployment proof and Codecov for the same commit: frontend `80.96%`, backend `85.29%`. Earlier Sprint 1–3 evidence is retained unchanged and remains dated historical evidence.


## Final evidence capture update — 7 October 2026

A later evidence pass added only assessment evidence; it did not change Tutor MX business logic. The documentation now embeds the green reviewed Member 6 Gitea Actions run, Neon production branch/table evidence, Auth0 role configuration, public live application capture, responsive Student screenshots and deployed API timing/light-load results. Public links are used for the application, documentation and safe health/readiness probes; private Gitea/Neon/Auth0 administration URLs are not presented as marker verification links.
