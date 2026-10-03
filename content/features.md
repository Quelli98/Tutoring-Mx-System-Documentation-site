## What is implemented versus planned

“Current source” means implementation is present in the exact 30 September archive cited by the handbook. It does not independently certify the current hosted release. “Target” means assigned in the updated Sprint 4 handbook, with no matching implementation in that inspected archive.

| Feature area | Status | Demonstration / evidence |
| --- | --- | --- |
| Auth0 Student/Tutor onboarding, reset/delete, profile guards | Current source | Separate accounts, valid/invalid sessions and own-role workspace |
| Master Organiser lecturer approval | Current source; new baseline | Pending registration, protected queue, approve/reject and approved sign-in |
| Organiser courses/Tutors/marks and allocations | Current source | Persisted writes plus mark/clash/capacity results |
| Tutor manual/import timetable | Current source | Same calendar; Once/Weekly/Fortnightly; terms, breaks and exceptions |
| Tutor sickness attendance | Current source; new baseline | Excuse decision, Excused/Skipped history, blocked sick work logs |
| Timesheet correction/declaration/dispute/export | Current source | Returned/corrected/resubmitted flow and approved export rules |
| Student overflow/volunteer/withdraw | Current source | Own eligible work, stored outcomes, safe withdrawal/conflict |
| Notifications/search, staffing/ranking/bulk/reports, Command Centre | Current source | Existing Sprint 3 evidence and integrated workflows |
| Student timetable via generalised TimeSlot | Target, M1 | Shared own-schedule migration/routes/UI |
| Mutual Student/Tutor availability | Target, M2 | Backend intersection, bounded future results, no private labels |
| Student bookings | Target, M3 | Transactional confirmation, both calendars, cancellation/history |
| Student sick notes | Target, M4 | Own booking → Pending → decision → preserved attendance |
| Scenarios/locks/presence/concurrency | Target, M2 | Isolated drafts, Compare with Live, atomic rechecked Publish |
| Tutor swaps | Target, M3 | Replacement response and final Organiser rule recheck |
| Shared audit/restore | Target, M5 | Redacted committed-change timeline and checked restore |
| Whole-school proposals/strategy comparison | Target, M6 | Deterministic eligible draft with explanations and comparable metrics |

## What changed in this documentation update

The original rebuilt site was grounded in the earlier supplied code. This update changes the affected source catalogue from 76 to **82 operations**, 19 to **20 models**, 11 to **14 enums**, and 22 to **25 migrations**. Six new HTTP operations cover organiser registration/status/own application and Master list/approve/reject. The database adds OrganiserApplication and attendance/deduplication fields.

All eight UML diagrams are revised against the updated handbook. They distinguish the current approval/deployment boundaries from the Student/Advanced target design. The Git sequence remains one Member branch at a time; the actual Sprint 4 ownership and no-rebuild baseline are updated.

The current source's local-storage token cache and precise Tutor sickness timing rule take precedence over shorter or older README wording. Historical meetings, sprint evidence and feedback are preserved under the archive navigation.
