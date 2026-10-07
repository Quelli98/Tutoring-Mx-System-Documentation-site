# Tutor MX engineering documentation — final rebuild

A professional React/Vite documentation website, updated through **7 October 2026** using the final supplied Sprint 4 repository, its README, the 30 September handbook and the final release, CI, database-role, responsive and performance evidence.

## What is included

- A new responsive website layout, search, contained tables, code-copy controls and printable chapters.
- All **120 final Sprint 4 API operations**, with method/access filters, source references and external curl/PowerShell guidance.
- All **30 application models**, their stored columns and separate relation fields, **14 enums** and **30 migrations**.
- Eight revised UML diagrams plus a final Sprint 4 database relationship map.
- Written frontend/backend boundaries, Auth0/Render/Neon/Prisma setup, Master Organiser approval and current Tutor sickness rules.
- The completed Student timetable/availability/booking/sick-note workflows and chronological Sprint 4 Member 1–6 delivery record.
- A criterion-by-criterion Milestone 4 response with final CI, Neon/Auth0, responsive and deployed performance evidence plus clearly stated remaining verification gaps.
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
| `src/data/endpoints.json` | Source-derived 120-operation final Sprint 4 inventory |
| `src/data/schema.json` | Current models, fields, enums and migrations |
| `src/data/source-meta.json` | Counts and SHA-256 hashes of the inspected route/schema files |
| `src/data/rubric.json` | All 20 criterion responses and evidence gaps |
| `src/data/live-checks.json` | Dated historical HTTP observations; not a live monitor |
| `src/legacy.tsx` | Original historical page content |
| `public/diagrams/` | Revised editable SVG diagrams |
| `scripts/generate-diagrams.py` | Standard-library Python source for those diagrams |
| `public/downloads/` | Read-only evidence tools and source downloads |
| `public/evidence/`, `public/documents/` | Supplied screenshots and PDFs |

`npm run build` and `npm run dev` compile Markdown first. If editing Markdown while Vite is running, run `npm run docs:compile` to refresh the generated content. Generate revised diagrams with `python scripts/generate-diagrams.py` from a Python environment; the built website does not need Python.

## Source precedence and limits

The final supplied Git repository supersedes the 30 September source snapshot for implementation status. Its `main` and `origin/main` point to **`361954e`**, the final reviewed Sprint 4 merge. The 30 September handbook remains the acceptance/design baseline and historical Sprint 1–3 pages remain unchanged.

The final evidence supplied on 7 October shows Render live on `361954e`, Codecov for the same commit (frontend/src 80.96%, backend src 85.29%), a green Gitea Actions run for reviewed Member 6 commit `2f62311` before the final merge, Neon production structure, Auth0 role configuration, responsive application captures, and deployed `/health`/`/ready` timing/light-load measurements. The documentation still does not invent exact production row counts, `_prisma_migrations` rows, a separate green Actions run for merge commit `361954e`, a Lighthouse/screen-reader/full keyboard audit, stakeholder sign-off or a complete unresolved-defect register.

Three unseen current rubric weights are retained provisionally from the older project brief. See **VERIFICATION.md** and the Milestone 4 page for the remaining evidence list.

## AI attribution

This documentation was restored and updated with ChatGPT/Codex assistance. Preserve existing truthful declarations and commit trailers. Record the actual model visible in the session and the required course transcript/attribution; do not infer a model name from an application version.
