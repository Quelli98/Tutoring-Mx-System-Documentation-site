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
