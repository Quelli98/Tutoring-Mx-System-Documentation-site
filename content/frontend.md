## Frontend design and its role in Tutor MX

The frontend is the user-facing **React application built with Vite**, deployed as static files through Cloudflare Pages. It provides distinct Student, Tutor and Organiser workspaces backed by shared navigation, an Auth0 session integration and a common HTTP client. The Master Organiser is an approved Organiser with an additional trusted privilege, not a fourth self-registration role.

This separation gives the frontend responsibility for **presentation, accessible interaction and state feedback**; authoritative permission decisions, clashes, work limits and booking eligibility remain in Express. [Architecture](#architecture) · [Security](#security) · [How Tutor MX works](#student-scheduling).

## UI design: the CSAM Tutor Hub design system

In Sprint 3 we redesigned the interface as **CSAM Tutor Hub**, merged in pull requests [#76](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/76) and [#77](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/pulls/77) on 26 September 2026. The screens were designed in Figma as editable layers with shared colour and text styles, and the React interface follows the same design system.

| Design token | Value | Used for |
| --- | --- | --- |
| Ink / Headline | `#080815` | Headlines, logo, active navigation link |
| Ink / Body | `#2A2A38` | Paragraphs and navigation links |
| CSAM Navy | `#17406E` | Primary buttons, sidebar and footer |
| CSAM Magenta | `#FC4C95` | Student colour |
| CSAM Violet | `#B82FE2` | Tutor colour |
| CSAM Indigo | `#2A0CD8` | Organiser colour and main call-to-action |
| Footer muted | `#C5D0E0` | Footer text and separators |

- **Typography:** Poppins for headlines; General Sans for body text, falling back to Plus Jakarta Sans, Satoshi and then Inter.
- **Layout:** pages are designed at 1440px with a 1170px content column. The Organiser workspace was also designed at 1024px, the width a MacBook Air shows with larger text, where tiles go two across and side-by-side cards stack.
- **Role motif:** each role has its own colour and a shape with one square corner (top-right for Student, bottom-left for Tutor, top-left for Organiser); buttons repeat the same square-corner motif.
- **One Organiser home page:** instead of a separate page per task, the Organiser's daily work (quick actions, this week's figures, approvals, open requirements, courses and Tutor workload) sits on one Home page, with allocation opening as a side panel.
- **Assets:** icons from [Lucide](https://lucide.dev) (ISC licence), illustrations from [unDraw](https://undraw.co) (free licence) and landing-page photos from Pexels (free licence).

The images below are rendered previews of the Figma frames; names and figures are sample data. The homepage design became the live landing page shown under [Deployment](#deployment).

<div class="evidence-gallery">
<figure><a href="evidence/ui-design-organiser-home-1440.png" target="_blank" rel="noreferrer"><img src="evidence/ui-design-organiser-home-1440.png" alt="Organiser Home design at 1440px"></a><figcaption><strong>Organiser Home design at 1440px</strong><span>Quick actions, this week's figures, approvals, open requirements, courses and Tutor workload on one page.</span></figcaption></figure>
<figure><a href="evidence/ui-design-organiser-allocate-panel.png" target="_blank" rel="noreferrer"><img src="evidence/ui-design-organiser-allocate-panel.png" alt="Allocate a tutor panel"></a><figcaption><strong>Allocate a tutor panel</strong><span>Step 1 picks the session; step 2 ranks Tutors with a green chip for each rule they pass: mark, free at that time and weekly hours.</span></figcaption></figure>
<figure><a href="evidence/ui-design-organiser-home-1024.png" target="_blank" rel="noreferrer"><img src="evidence/ui-design-organiser-home-1024.png" alt="Organiser Home design at 1024px"></a><figcaption><strong>Organiser Home design at 1024px</strong><span>The same page at a narrower width: tiles go two across and side-by-side cards stack.</span></figcaption></figure>
</div>

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

Documented examples include a narrow-screen collapsible Student menu, explicit Pass/Fail allocation messages, keyboard-reachable search and buttons, error/conflict notices with refresh paths, and table/list views for dense planning. The captured 400×645 and 757×645 screenshots support those particular layouts and show a visible focus state. The emulation captures also show a horizontal scrollbar, listed under [Known limitations](#milestone4/known-limitations). A Lighthouse audit on 11 October 2026 scored 100 for accessibility on the landing page and found one issue, colour contrast, on the Organiser dashboard. [View dated evidence](#testing).

## How we test the interface

Automated React tests exercise role rendering, forms, success/failure branches and regression-critical components. Human acceptance tests should use separate Student, Tutor, Organiser and trusted Master accounts, attempt invalid and cross-role actions, refresh/reopen pages, and inspect responsive/focus states. The browser test verifies usability; the backend test verifies server permissions. Neither replaces the other. [Testing and Codecov](#testing) · [Sprint 1–4 work tracker](#work-tracker).

## Navigation and first-time use

The App **Structure** criterion concerns the interface a person must learn. Tutor MX organises the interface around the user's role and task, with technical architecture documented separately.

| User's task | Entry and route through the interface | Why this structure helps |
| --- | --- | --- |
| Student wants to volunteer | Student workspace → open work → request → request status | The opportunity and its outcome remain in one role-specific journey. |
| Student wants a tutoring appointment | Timetable/availability → choose a mutually free interval → confirm → booking history | The user selects a valid time before submitting and can find the recorded outcome. |
| Tutor needs to submit hours | Tutor dashboard → assigned work → work logs → weekly timesheet → submit/status | Personal work and its approval cycle are grouped together. |
| Organiser needs to staff a course | Organiser workspace → allocation board → course/session → eligible Tutor → save | Marks, clashes and capacity are visible within the allocation workflow. |
| Organiser needs to plan changes | Planning/proposals → draft Scenario → compare → publish | Draft exploration is separate from changing live allocations. |
| Master Organiser reviews a lecturer | Organiser workspace → lecturer applications → inspect → approve/reject | Privileged review stays in the existing administrative workspace. |

These are conceptual task paths; labels can differ between screen versions. Guided setup, the shared search/command palette, recent/favourite destinations and notification links provide shortcuts. The [role walkthrough](#student-scheduling), [current screen evidence](#deployment/platform-evidence) and [user survey](#user-feedback) support the explanation. They do not constitute a timed first-use study.

## Returning users and error recovery

Saved application records live behind the API and can be loaded again after a tab is reopened. The documented Auth0 configuration caches identity state in `localstorage`, with refresh tokens disabled. A still-valid cached session may resume the role workspace; expired credentials, revoked access or provider-session changes can require sign-in. No claim is made that unsaved form drafts survive a tab closure.

| Situation | User-facing recovery |
| --- | --- |
| Invalid form | Field validation explains what to correct; the server remains authoritative. |
| Network or provider error | Error state permits a deliberate retry; failure is not shown as a successful save. |
| Stale allocation, booking or Scenario | Conflict feedback asks the user to refresh/review the latest state. |
| Repeated supported write | The API's retry key reuses a recorded result or rejects mismatched content. |
| Wrong role or stale link | Protected routing and server permissions prevent the unavailable action. |
| Empty work list | An explicit empty state separates “nothing to do” from a loading failure. |

The source and regression records support these behaviours; the attachments do not include a complete cross-browser close/reopen/expiry test. [API errors and retries](#api) · [Testing limits](#testing/what-the-evidence-does-not-test).
