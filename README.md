# Tutor MX engineering documentation — final rebuild

A professional React/Vite documentation website, updated on **3 October 2026** using the updated README, the 30 September handbook and the exact application source archive cited by that handbook.

## What is included

- A new responsive website layout, search, contained tables, code-copy controls and printable chapters.
- All **82 current API operations**, with method/access filters, source references and external curl/PowerShell guidance.
- All **20 application models**, their stored columns and separate relation fields, **14 enums** and **25 migrations**.
- Eight revised UML diagrams plus a current database relationship map. Current behaviour and Sprint 4 targets are explicitly labelled.
- Written frontend/backend boundaries, Auth0/Render/Neon/Prisma setup, Master Organiser approval and current Tutor sickness rules.
- The updated Student timetable/availability/booking/sick-note design and chronological Sprint 4 Member assignments.
- A criterion-by-criterion Milestone 4 response with evidence and remaining verification.
- Full written Git methodology, team process, testing/performance context and the organised/full supplied README.
- Preserved historical sprint, meeting, Codecov, bug-tracker and user-feedback pages.
- Read-only SQL, PowerShell and Postman tools, OpenAPI/route inventories and a safe technical source bundle.

## Start locally

Use Node.js 24 and npm 11 or later:

```powershell
npm ci
npm run build
npm run validate
npm run dev
```

Open the URL printed by Vite. Its `/Tutoring-Mx-System-Documentation-site/` base path matches the existing GitHub Pages project. No Auth0 secret or Neon password is required for this static documentation website.

## Publish the existing documentation site

Follow **START-HERE.md**. Copy/merge the reviewed changes into your existing **documentation Git repository**, preserving its `.git` directory and unrelated local work. The preserved `.github/workflows/pages.yml` builds and deploys GitHub Pages after the approved push to main.

Existing URL: https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/

The ZIP has not been pushed to a remote repository or deployed by this task. This documentation update does not redeploy the Tutor MX application, change its API implementation or migrate Neon.

## Editing guide

| Path | Purpose |
| --- | --- |
| `content/*.md` | Written current chapters and display-cleaned supplied README |
| `scripts/compile-content.mjs` | Trusted Markdown-to-page compilation |
| `src/App.tsx` | Navigation, API/table explorers, evidence map and page composition |
| `src/styles.css` | Responsive design and print styling |
| `src/data/endpoints.json` | Source-derived 82-operation inventory |
| `src/data/schema.json` | Current models, fields, enums and migrations |
| `src/data/source-meta.json` | Counts and SHA-256 hashes of the inspected route/schema files |
| `src/data/rubric.json` | All 20 criterion responses and evidence gaps |
| `src/data/live-checks.json` | Dated historical and 3 October observations; not a live monitor |
| `src/legacy.tsx` | Original historical page content |
| `public/diagrams/` | Revised editable SVG diagrams |
| `scripts/generate-diagrams.py` | Standard-library Python source for those diagrams |
| `public/downloads/` | Read-only evidence tools and source downloads |
| `public/evidence/`, `public/documents/` | Supplied screenshots and PDFs |

`npm run build` and `npm run dev` compile Markdown first. If editing Markdown while Vite is running, run `npm run docs:compile` to refresh the generated content. Generate revised diagrams with `python scripts/generate-diagrams.py` from a Python environment; the built website does not need Python.

## Source precedence and limits

The 30 September source archive has no `.git`, so its current SHA is not invented. It contains Master Organiser approval, Tutor sickness and the completed Sprint 3 baseline. Student timetable/booking/sick notes and Advanced Sprint 4 capabilities remain targets in that archive. They are not falsely listed as deployed endpoints or tables.

The supplied README retains older route/deployment statements and says token caching is in memory. The actual current source uses local storage; the maintained chapters explain this correction. The precise Tutor sickness calendar-day rule is documented from code.

Three unseen current rubric weights are retained provisionally from the older project brief. Final production row counts, real/test classification, actual-release CI/coverage, application accessibility and performance/load evidence remain the team's release work. See **VERIFICATION.md** for what was actually checked on this documentation project.

## AI attribution

This documentation was restored and updated with ChatGPT/Codex assistance. Preserve existing truthful declarations and commit trailers. Record the actual model visible in the session and the required course transcript/attribution; do not infer a model name from an application version.
