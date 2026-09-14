# Tutor MX documentation update — 14 September 2026

This update incorporates the supplied Sprint 2 deployment/API evidence and removes unsupported missing-proof warning boxes.

## Added evidence

- Render project overview showing `tutor-mx-api` deployed in Production.
- Render service page showing the public API Live at `https://tutor-mx-api.onrender.com`.
- Browser evidence for `GET /health` returning `{"status":"ok"}`.
- Browser evidence for `GET /ready` returning `{"status":"ready","database":"connected"}`.
- PowerShell evidence showing HTTP 200 for both hosted checks.

The screenshots are stored under `public/evidence/` with `sprint2-*2026-09-14.png` names.

## API documentation expansion

The API page now documents:

- the public Render URL and observed hosted responses;
- Sprint 2 Member 5 responsibilities for allocation writes, organiser decisions, Student/Tutor workflow APIs and API hardening;
- server-side role/ownership, validation, business-rule and conflict handling principles;
- the Sprint 2 route-family register;
- the safe shared error contract;
- hosted verification commands;
- the Nager.Holidays / Nager.Date provider, official documentation and terms;
- provider rate-limit statement, one-hour Tutor MX cache freshness, uncached fallbacks, three-second timeout, safe fields and fallback behaviour.

## Evidence wording cleanup

- Removed missing-proof warning boxes for stakeholder/user-feedback evidence that was not collected.
- The Reviews & Feedback page now states only the recorded interactions and keeps the representative-user method as a process for future use.
- Removed warning boxes asking for direct tracker proof that was not retained; the site now documents the process and retained integration history without inventing issue IDs.
- Replaced the API and provider-metadata missing-evidence warnings with the supplied/verified evidence.
- Sprint Evidence now includes the hosted API screenshots and a 14 September public API verification entry.

## Validation performed in this update

- `src/App.tsx` and `src/main.tsx` were syntax-checked with the installed TypeScript parser.
- Every `public/evidence/...` asset referenced by `src/App.tsx` was checked and exists.
- A full `npm ci`/Vite build could not be completed in the sandbox because the package install timed out; run `npm ci && npm run build` locally before publishing.
