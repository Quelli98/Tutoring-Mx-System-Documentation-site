## Frontend design and its role in Tutor MX

The frontend is the user-facing **React application built with Vite**, deployed as static files through Cloudflare Pages. It provides distinct Student, Tutor and Organiser workspaces backed by shared navigation, an Auth0 session integration and a common HTTP client. The Master Organiser is an approved Organiser with an additional trusted privilege, not a fourth self-registration role.

This separation gives the frontend responsibility for **presentation, accessible interaction and state feedback**; authoritative permission decisions, clashes, work limits and booking eligibility remain in Express. [Architecture](#architecture) · [Security](#security) · [How Tutor MX works](#student-scheduling).

## Screens and features introduced in each sprint

| Sprint | Student interface | Tutor interface | Organiser and administrative interface | Shared usability work |
| --- | --- | --- | --- | --- |
| **Sprint 1** | Protected overflow and volunteer confirmation *prototype* on a mock boundary. | Own dashboard, assignments, work capacity, availability, work-log and excuse forms. | Course/Tutor management; allocation board displaying mark, clash and hour validation (save initially a placeholder). | Auth0 role routing, common navigation, labelled states and responsive layouts. |
| **Sprint 2** | Real open-work API, persisted volunteer requests and decision statuses. | Live assignment refresh, timesheet submission and excuse outcome. | Real allocation create/edit/remove, timesheet and volunteer approvals. | Recovery from invalid, duplicate, empty, network and wrong-role conditions; public holiday information with fallback. |
| **Sprint 3** | Withdrawal of pending volunteer requests and improved overflow usability. | CSV/ICS/paste timetable preview/import, term bounds, returned-timesheet correction, declaration/dispute and approved export. | Staffing requirements, explainable ranking, bulk allocations, budget/workload reporting, overflow management and Command Centre. | Notification inbox, global search and keyboard palette, guided setup, accessibility/response polish. Master approval followed in stabilisation. |
| **Sprint 4** | Personal shared-engine timetable, mutual available slots, booked tutoring, cancellations/history and sick notes. | Existing calendar now also shows booked tutoring; replacement swaps and related history. | Scenarios, locks/presence/compare/publish, audit/restore and explainable whole-school proposals. Master approval queue retained. | Stale session/link handling, notification actions, table/compact alternatives, conflict and focus feedback. |

The distinction between Sprint 1 prototypes and Sprint 2 persisted features is important: the initial front-end demonstration established layouts and contracts, not a claim that every end-to-end Basic write was already live.

## Role journeys in the final interface

### Student

A Student signs in to their own workspace, searches eligible open work, volunteers and sees a pending/approved/rejected/withdrawn outcome. The timetable uses the same `TimeSlot` recurrence and academic-term rules as a Tutor. When selecting tutoring, the Student sees **only mutually bookable intervals**, confirms a slot, and then sees the booking and its cancellation/status history. A Student may submit a sickness reason for an eligible booking; the Organiser reviews it and the outcome stays in history. Other users' private timetable labels are not exposed by mutual-availability results.

### Tutor

A Tutor sees their own dashboard and weekly capacity, maintains classes and unavailable periods, and views assigned sessions. They can submit work logs, timesheets and excuses; returned timesheets can be corrected and resubmitted. Timetables can be entered manually or imported. In the advanced workflow, a Tutor may request a replacement, while the proposed substitute and Organiser make the subsequent decisions. The original assignment does not change merely because a swap was requested.

### Organiser and Master Organiser

An Organiser manages courses and registered Tutors, views mark/clash/hour eligibility, creates and reviews allocations, responds to volunteer and timesheet requests and monitors staffing needs. Reports, bulk allocation and the Command Centre give a school-level operational view. Later planning tools keep scenarios separate from live allocations until explicit publish, with conflict detection, audit and proposal explanations. Approved trusted Master Organisers additionally review lecturer registrations through the same Organiser workspace; hidden navigation alone is not sufficient protection.

## Shared frontend architecture

| Interface concern | Design approach | Reason |
| --- | --- | --- |
| Routes and navigation | Role-aware protected workspaces plus common navigation and error/empty states | Makes the application understandable without making React the authorisation authority. |
| Data requests | `frontend/src/api/client.js` uses `VITE_API_BASE_URL` and Auth0 access tokens to call Express | All business data crosses one HTTP contract; React never holds Neon credentials. |
| Identity | Auth0 handles login and account lifecycle; the application loads `/api/me` for the resolved profile | Returning users reopen the correct workspace without choosing a role each time. |
| Calendar reuse | Existing `MyTimetable`, `AvailabilityForm`, import and recurrence display reused for both Student and Tutor | Avoids divergent timetable engines and contradictory clash results. |
| Forms and server errors | Field validation and confirmation UI, followed by authoritative server responses and retry/refresh states | Prevents presenting a stale or unauthorised action as successful. |
| Reporting | Tables, labelled cards and accessible alternatives to dense planning visuals | Makes operational values understandable independently of colour or screen width. |

The final source's Auth0 configuration uses a `localstorage` cache with refresh tokens disabled. Reopening the browser can preserve cached Auth0 state, but an expired token, revoked role or server rejection must still be handled safely. A source configuration is not by itself proof of tested session recovery on every browser.

## Accessibility, aesthetics, usability and responsiveness

The final submission rubric assesses these as separate concerns. **Accessibility** addresses semantic controls, focus, labels, contrast and non-colour-only status. **Aesthetics** concerns consistent typography, spacing and styling. **User experience** concerns action clarity, invalid-input feedback, loading states, session continuity and recovery after errors. **Responsiveness** concerns readable phone/tablet/desktop layouts and the availability of equivalent actions across sizes.

Documented examples include a narrow-screen collapsible Student menu, explicit Pass/Fail allocation messages, keyboard-reachable search and buttons, error/conflict notices with refresh paths, and table/list views for dense planning. The captured 400×645 and 757×645 screenshots support those particular layouts and show a visible focus state. The evidence also contains a horizontal scrollbar in emulation, so it would be inaccurate to claim a complete absence of mobile overflow. No full independent screen-reader or Lighthouse accessibility audit was supplied. [View dated evidence and limitations](#testing).

## How we test the interface

Automated React tests exercise role rendering, forms, success/failure branches and regression-critical components. Human acceptance tests should use separate Student, Tutor, Organiser and trusted Master accounts, attempt invalid and cross-role actions, refresh/reopen pages, and inspect responsive/focus states. The browser test verifies usability; the backend test verifies server permissions. Neither replaces the other. [Testing and Codecov](#testing) · [Sprint 1–4 work tracker](#work-tracker).
