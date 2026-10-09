## One timetable engine for both Students and Tutors

The scheduling system grew across the project: early Tutors recorded busy times; Sprint 3 added timetable import, recurrence, term data and exceptions; Sprint 4 extended that same engine for Students and mutual bookings. The final code therefore uses one shared design. Student and Tutor schedules use the same `TimeSlot`, manual/import validators, CSV/ICS parsers, recurrence expansion, academic terms, occurrence exceptions and weekly calendar. M1 generalised ownership to the signed-in `Profile` while retaining the Tutor route aliases for compatibility.

| Shared concept | Tutor meaning | Student meaning |
| --- | --- | --- |
| Personal `TimeSlot` | University class / unavailable interval | University class / unavailable interval |
| Recurrence | Once, Weekly, Fortnightly; term bounds and exceptions | Same expansion and boundary rules |
| Organiser `Allocation` | Assigned staffing work; capacity/payroll rules | Not a Student personal timetable record |
| `TutoringBooking` | Appointment with a Student; contributes busy time | Booked appointment with a Tutor; contributes busy time |
| Capacity | Tutor work preference/weekly limit | No Tutor-capacity setting exposed |

No separate `StudentTimeSlot`, Student recurrence engine or duplicate CSV/ICS parser was introduced.

## Mutual availability runs on the backend

M2's shared busy-interval/gap service intersects both people's safe availability. Student busy time includes recurring own TimeSlots and existing confirmed bookings. Tutor busy time includes TimeSlots, confirmed allocations and bookings. Term bounds, breaks, recurrence exceptions, duration, future-window limits and result bounds are applied before a slot is offered.

**Bookable times = Student free intervals ∩ Tutor free intervals.** If a Student is free 11:00–14:00 and the Tutor is busy 12:00–13:00, the safe gaps are 11:00–12:00 and 13:00–14:00. A 90-minute request does not fit either gap. The response exposes bookable intervals, not the other person's private class/event labels.

## Booking rechecks availability transactionally

M3 added `TutoringBooking`. The Student chooses a mutual free slot, but the server checks availability again when saving. A competing booking can invalidate an earlier preview, so stale UI does not permit double-booking.

A confirmed booking appears on both Student and Tutor calendars and becomes busy time for later booking and allocation clash checks. Allowed future cancellation changes the booking status rather than deleting the record, immediately frees the interval and keeps history. Student bookings remain scheduling appointments; they do not create payroll allocations.

## Student sickness reuses the approval pattern

M4 added `StudentSickNote`, linked to the Student's own eligible booking. The request stores the reason and starts Pending. Organiser Approvals supports approve/reject and review notes. Only one active request per booking is allowed.

| Decision | Final booking effect | History |
| --- | --- | --- |
| Pending | Keep scheduled while waiting | Request visible |
| Rejected | Leave booking scheduled | Decision/review note visible |
| Approved before start | Mark Excused and release active busy time | Booking and decision retained |
| Approved at/after start | Show Skipped | Attendance history retained |

The feature does not add medical document upload. Tutors can receive attendance state without receiving the Student's private sickness reason.

## How M5 and M6 reuse scheduling truth

M5 instruments successful booking/sick-note mutations through the shared audit pattern and adds retry/concurrency hardening. M6's proposal engine reuses the same clash source, so confirmed Student bookings count as Tutor busy time. Proposal presets may change soft priorities, but they never override mark, clash, selected-week capacity or Organiser locks.

See [Sprint 4 final delivery](#sprint4) for the complete Member sequence and release evidence.
