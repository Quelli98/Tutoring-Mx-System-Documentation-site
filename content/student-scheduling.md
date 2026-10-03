## Sprint 4 target: extend the existing timetable

**This chapter describes the 30 September handbook's target design.** The referenced source does not yet have a Student personal timetable route, `TutoringBooking` or `StudentSickNote`. These are assigned Sprint 4 changes. The UML diagrams use a dashed target style where they show this future work.

Student and Tutor schedules must share `TimeSlot`, the manual/import validators, CSV/ICS parsers, recurrence expansion, terms, exceptions and the weekly calendar. M1 generalises the existing Tutor-named owner relationship to Profile ownership and preserves every existing Tutor row. Creating `StudentTimeSlot`, a second term table or a second calendar parser would duplicate the working system.

| Shared concept | Tutor meaning | Student meaning |
| --- | --- | --- |
| Personal TimeSlot | University class / unavailable interval | University class / unavailable interval |
| Recurrence | Once, Weekly, Fortnightly; term bounds and exceptions | The same expansion and boundary rules |
| Organiser Allocation | Assigned staffing work; capacity/payroll rules | Not a Student personal timetable record |
| TutoringBooking | Appointment with a Student; contributes busy time | Booked appointment with a Tutor; contributes busy time |
| Capacity | Tutor work preference/weekly limit | No Tutor-capacity setting exposed |

## Mutual availability belongs on the backend

M2 creates a shared busy-interval/gap service. Student busy time includes own recurring TimeSlots and existing bookings. Tutor busy time includes TimeSlots, confirmed allocations and bookings. Terms, teaching breaks and occurrence exceptions are applied before gaps are offered. Bound the future search window and result count, and ensure an interval can fit the requested session length.

**Bookable times = Student free intervals intersect Tutor free intervals.** For example, Student free 11:00–14:00 plus Tutor busy 12:00–13:00 produces 11:00–12:00 and 13:00–14:00. A 90-minute appointment fits neither gap. Merely being free at the start time is not enough.

The response exposes safe bookable intervals, not the other person's private class/event labels. M2's panel is read-only. It does not save a booking or reserve a time.

## Booking rechecks availability

M3 adds a minimal `TutoringBooking` with Student, Tutor, course, start/end and status. On confirmation, the server resolves the Student from the token and rechecks mutual availability inside the write transaction. A concurrent booking can make a previously shown slot unavailable; a stale browser preview is not permission to double-book.

A confirmed booking appears on both calendars and is included in all later busy/clash calculations. Future cancellation updates status and frees the interval; history remains. Both parties receive one de-duplicated notification. The booking stays separate from Organiser staffing `Allocation` and payroll.

## Student sickness and preserved history

M4 adds `StudentSickNote` or an equivalent minimal model linked to the Student's own eligible booking. The request stores a reason and `PENDING` status; Organiser Approvals supports approve/reject and review notes. Only one active request per booking is allowed.

| Decision | Intended booking effect | History |
| --- | --- | --- |
| Pending | Keep scheduled while waiting | Request visible |
| Rejected | Leave booking scheduled | Decision/review note visible |
| Approved in advance | Mark Excused and release future busy time | Booking and decision retained |
| Approved on/after session | Show Skipped | Preserve attendance history |

“Same as Tutor” means reusing the request/decision/status pattern. The existing Tutor `Excuse` table remains intact. The handbook does not ask for medical file uploads, so no storage/upload subsystem is assumed. The exact Student timing boundary must be implemented and tested; the current Tutor code's calendar-day rule is documented separately.

## How later features reuse these rules

M5 instruments successful booking and sickness mutations in the shared audit timeline and hardens permission, conflict and retry behaviour. M6's proposal engine must include confirmed Student bookings in Tutor busy time. Proposal presets alter soft weights, never hard mark/clash/capacity rules. The output is a draft scenario, followed by Compare with Live and explicit Publish.

See [the chronological Sprint 4 plan](#sprint4) for ownership and acceptance requirements.
