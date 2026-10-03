# Documentation verification — 3 October 2026

This report describes the documentation website delivered in this archive. It is not a certification of the Tutor MX application's production data or completed Sprint 4 functionality.

## Sources and retained work

The maintained chapters use the supplied updated README, the 30 September 2026 handbook and its referenced `tutor-mx-system-main (5)(2).zip` source archive. Earlier sprint and project evidence remains accessible in the website's archive. The current source snapshot has no Git history, so no current commit SHA is claimed.

The revision incorporates the Master Organiser approval implementation, changed schema and sickness rules, and the revised Student scheduling and Member delivery requirements. Implemented behaviour and planned Sprint 4 work are explicitly labelled. The full README and handbook remain downloadable.

## Completed checks

| Check | Result |
| --- | --- |
| Production build | `npm run build` passed, including TypeScript checking and Vite compilation. |
| Content validation | `npm run validate` passed: 82 unique HTTP operations, three Master-protected operations, 20 models, 14 enums, 25 source migrations, 20 rubric responses and nine SVG diagrams. Current chapter asset references resolve. |
| Navigation | All 54 current and retained pages opened in Chromium. No JavaScript page errors, broken images or desktop document overflow were observed. |
| Links | 91 local asset links and 335 internal hash links passed the navigation sweep. The subsequently added external-probe JSON download also loaded successfully. |
| API filters | Searching for dashboard returned one operation; selecting Master Organiser returned three. |
| Model navigation | A direct OrganiserApplication link opened the correct table. Its column layout was checked after adjustment. |
| Search | Searching for curl returned two chapter matches. Escape closed the dialog after the final fix. |
| Mobile layout | Ten representative routes were checked at 390 px with no document overflow; the home page also passed at 320 px. Menu opening and route-selection closing worked. The final database-table adjustment was rechecked at 390 px. |
| Visual review | Desktop and mobile page captures and all eight UML diagrams plus the database relationship map were reviewed. Diagram dependency directions, connectors and label overlap were corrected. |

The final production build's main JavaScript bundle is approximately 479 kB uncompressed / 124 kB gzip. Historical page content and the complete original README load in separate chunks. These are build sizes, not measured production page-load timings.

Machine-readable observations are included in `verification/`. The final interaction report records the search correction; the broad navigation sweep was retained rather than repeated.

## External API observations

Read-only requests without bearer tokens on **3 October 2026** returned HTTP **401** with `AUTHENTICATION_REQUIRED` from:

- `https://tutor-mx-api.onrender.com/api/auth/organiser-application/me`
- `https://tutor-mx-api.onrender.com/api/master-organiser/organiser-applications`

The raw responses and UTC timestamps are included in `public/downloads/approval-route-checks-2026-10-03.json`. These establish reachable authentication gates for those paths; they do not prove successful authenticated application processing.

Earlier **29 September** health/readiness 200 responses and the protected Tutor read's 401 response are retained as dated observations. The earlier automated frontend request encountered Cloudflare 403/1010. Earlier raw response captures were unavailable and have not been reconstructed or presented as fresh checks.

## Limits and release work

- No authenticated production reads or writes were performed. Private Tutor records, exact production row counts, real-versus-demo classification and applied production migrations remain unverified. The website provides authorised curl, PowerShell, Postman and read-only SQL instructions for the team to capture that evidence.
- The source contains 43 backend test files and 63 frontend test files. This task did not run the full Tutor MX application test suites. Application release coverage, accessibility and load/performance evidence must be recorded against the actual release.
- Student personal scheduling, mutual availability, bookings, Student sick notes and advanced planning remain handbook targets where absent from the supplied current source.
- Three rubric weights absent from the supplied cropped current screenshots are explicitly provisional. The website does not turn incomplete application evidence into a claim of full marks.
- This archive has not been committed, pushed or deployed. It changes the documentation project; it does not redeploy the application or migrate Neon. Follow `START-HERE.md` to publish from the team's existing documentation checkout.
