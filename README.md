# Tutor MX documentation

The complete **Wits COMS3011A · Team 6** documentation website, merged and audited on **11 October 2026**. It explains the product, four-sprint development history, architecture, API, database, testing and assessment evidence.

Public documentation: https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/

## Run locally

Use **Node.js 24** and **npm 11+**. From this directory:

```powershell
npm ci
npm run validate
npm run build
npm run dev
```

Open the address printed by Vite. The existing `/Tutoring-Mx-System-Documentation-site/` base path is preserved. No application secrets, Auth0 credentials or database connection are needed to build this static documentation site. `npm run preview` serves a production build locally.

## What is included

- 32 navigable pages grouped by purpose, with full-text search, mobile navigation, deep links, code copying and chapter printing.
- All **20 Milestone 4 criteria**, with correct category weights totalling 100%, assessed questions, implementation answers, direct evidence links and scoped limitations.
- The latest attached **15-page project brief**, a shared-requirements and feature-tier map, and evidence guidance for the separate reports and presentation.
- All **120 registered API operations**, **30 Prisma models**, **14 enums**, **30 migration names** and **9 diagrams**.
- All **32 Gitea defect records (#106–#137)**, fixing PR references, four sprint work registers, stakeholder records and the nine-response user survey, screenshot analysis and original response PDF.
- The member's complete seven-commit patch, including 11 October Codecov, Lighthouse and Neon evidence, API examples, library register and Scrum mapping.
- Chapters, API/schema explorers and the search index loaded on demand. Historical source is preserved without loading every obsolete page into the current site.

## Evidence provenance

The route/schema source bundle is the **7 October `361954e` snapshot**. The member patch cites the final audit merge **`a3939f8`** (10 October), followed by the **`6b528a3`** test fix and **`3540d46`** README update. These later written records do not alter the older bundled source or deployment screenshots.

The final audit record reports **1,466 backend and 847 frontend tests**. Captured Codecov evidence on `6b528a3` shows **85.42% backend**, **80.87% frontend** and **82.93% combined coverage**. Lighthouse and Neon evidence retain their original dates. The application tests were not rerun during this documentation-only audit.

All criteria are addressed in the documentation, but this is not a guarantee of full marks. The assessment page explicitly records product/evidence limits, including Organiser contrast, responsive overflow, mobile load time, light-load-only API performance, empty Advanced production tables and the absence of final stakeholder acceptance. This source ZIP does not repair the separate application or establish that a later commit is deployed.

## Edit and maintain

| Path | Purpose |
| --- | --- |
| `content/*.md` | Canonical written chapters |
| `src/navigation.ts` | Page titles, grouping, aliases and hash routing |
| `src/App.tsx`, `src/styles.css` | Site shell, search, responsive layout and print styles |
| `src/Markdown.tsx` | Lazy chapter loading |
| `src/ApiCatalogue.tsx`, `src/DatabaseCatalogue.tsx` | Searchable technical references |
| `src/RubricMap.tsx`, `src/data/rubric.json` | Filterable assessment evidence index |
| `src/data/endpoints.json`, `src/data/schema.json` | Source-derived inventories |
| `src/data/source-meta.json` | Dated metadata and source fingerprints |
| `src/data/live-checks.json` | Team-recorded HTTP observations; not a live monitor |
| `scripts/compile-content.mjs` | Generate chapter HTML and the deferred search index |
| `scripts/validate-content.mjs`, `scripts/validate-site.mjs` | Inventory, rubric, rendered-link, asset and provenance checks |
| `public/evidence/`, `public/documents/`, `public/downloads/` | Original dated evidence and reference files |
| `.github/workflows/pages.yml` | Validate, build and publish the existing GitHub Pages site |

`build`, `dev` and `validate` compile Markdown first. If Markdown changes while the dev server is running, run `npm run docs:compile`. Generated JSON should be committed with the canonical Markdown. The complete original historical UI source remains downloadable at `public/downloads/historical-site-source.tsx.txt`.

## Publish

Follow **START-HERE.md** to merge into the existing **documentation repository**, preserving its Git history and local changes. Push the reviewed documentation commit to `main`; the preserved Pages workflow validates and publishes it. This deliverable has not been pushed or deployed, and it does not update the Tutor MX application, Render or Neon.

See **VERIFICATION.md** for checks and limits, and **FINAL_REVIEW.md** for the audit decisions and remaining application evidence gaps.

## AI declaration

This repository makes use of AI code generation and review. Member-supplied historical attribution is retained in `content/references.md`: Codex [GPT-5], ChatGPT [GPT-5.6 Sol, as recorded in the prior documentation], and Claude Code [Claude Opus 5.5] for the member's 11 October patch. The final merge/audit was assisted by ChatGPT Work / Codex. The user reported a ChatGPT configuration of **GPT-6 Astra (Max)**; the exact underlying model of this coding-agent session is not exposed. Assistance covered rubric mapping, evidence reconciliation, site code, loading changes and validation. The team remains responsible for reviewing the result. Application-code AI attribution is maintained separately in the application repository.
