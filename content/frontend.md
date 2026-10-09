## What the browser application does

The frontend is React with Vite. `frontend/src/main.jsx` mounts the app inside `Auth0Provider`. Role-specific screens collect user input, display server results and keep loading, empty, success and failure states understandable. The API helper in `frontend/src/api/client.js` centralises the backend base URL, bearer token and error handling.

| User workspace | Foundation and Intermediate workflows (Sprints 1–3) | Advanced additions (Sprint 4) |
| --- | --- | --- |
| Student | Open overflow work, submit/view/withdraw own volunteer requests | Own timetable, shared availability, booking and sickness workflow |
| Tutor | Dashboard, personal availability/import/calendar, work logs, timesheets, corrections/disputes and excuses | Swap workflow and shared Student bookings |
| Organiser | Courses/Tutors, eligibility, staffing/ranking/bulk, reports, approvals, overflow and Command Centre | Scenarios, locks, presence, audit/restore and whole-school proposals |
| Master Organiser capability | Organiser applications queue inside the Organiser workspace | Preserve and regression-test; no fourth workspace |

## Frontend-to-backend link

`VITE_API_BASE_URL` is the public address used by the shared client. Production points to `https://tutor-mx-api.onrender.com`; the default in source is `http://localhost:3000`. Vite embeds `VITE_*` values at build time, so changing production configuration requires rebuilding the frontend.

The helper calls `getAccessTokenSilently` for `VITE_AUTH0_AUDIENCE`, attaches the bearer token and uses `cache: 'no-store'`. JSON bodies get an appropriate content type. Failed responses become errors with a readable message, code and HTTP status. The lower-level response helper also supports CSV downloads. The browser never imports the server Prisma client or opens a Neon connection.

## Session behaviour: correction to the README

The updated README says the token cache is in memory. **The actual 30 September `frontend/src/main.jsx` sets `cacheLocation="localstorage"` and `useRefreshTokens={false}`.** This is the setting documented here. It helps preserve cached authentication across reloads; it does not guarantee that an expired, revoked or changed-role token will remain valid. Auth0 session renewal and backend verification still apply.

Because tokens are accessible to JavaScript in this configuration, preventing script injection and clearing intended protected state on sign-out matter. Sprint 4 tested hardening of production sessions, 401/403 responses and stale targets; the presence of an Auth0 setting by itself is not a substitute for regression evidence. See [Testing](#testing).

## One calendar, shared components

Tutor manual and import entry feed the same persisted schedule and calendar. The current baseline includes Class/Unavailable categories, Once/Weekly/Fortnightly recurrence, academic terms, teaching breaks and occurrence exceptions. Import preview, duplicate handling and commit belong to this existing flow.

Sprint 4 reused this engine for Students. The Student does not get Tutor weekly work-capacity controls. Student private event labels stay private; mutual availability exposes only safe intervals. Both calendars project the same confirmed `TutoringBooking` record.

## Interaction and accessibility

Use explicit labels, keyboard-operable controls, textual Pass/Fail or status wording, visible focus and recoverable errors. Keep marks and schedule request failures independent. A conflict must refresh to server truth rather than leave an action that is no longer legal. Dense reports and proposal visuals need equivalent labelled tables/lists, as S4-M4-3 requires.

The new documentation site itself includes a skip link, a keyboard-search dialog, copyable code, horizontally contained tables and responsive navigation. Those checks are separate from accessibility evidence for the Tutor MX application.
