# Tutor MX documentation restructuring — 9 October 2026

## Design outcome

This update changes **the static documentation website only**. It does not modify the Tutor MX application, its hosted API, Gitea branches or production database.

- Replaced the Sprint 4-centred landing page with a professional project-wide overview, product purpose, architectural overview, intended audiences, quick paths, four-step timeline and dated evidence introduction.
- Reorganised the sidebar into six section groups. Navigation groups collapse so the user is not faced with every chapter simultaneously.
- Added an explicit public website guide (`site-guide.md`), a four-sprint index (`roadmap.md`) and independent Sprint 1, 2, 3 and 4 roadmaps.
- Cross-linked **10 Sprint 1**, **10 Sprint 2**, **8 Sprint 3** and **20 Milestone 4** rubric criteria to canonical documentation and historical evidence.
- Retained original legacy React pages in `src/legacy.tsx`, full original README, all historical images, source downloads and existing chapters. Added a browsable archive index.
- Retained the existing 28 September five-response feedback survey and chart evidence. Added a clear status explaining that a new final-release user-feedback round and follow-up are still outstanding.
- Included the newly provided official COMS3011A 2026 project brief and the Tutor Management System project-specific brief. The supplied updated 30 September handbook was byte-identical to the handbook already included in the source archive.

## What was checked in this execution environment

- Parsed `src/App.tsx` using the TypeScript TSX parser: **no syntax errors**.
- Checked new internal chapter links and referenced assets: **all resolved**.
- Ran the existing repository's `scripts/validate-content.mjs`: **PASS** (120 unique API operations, three Master guards, 30 Prisma models, 14 enums, 30 migrations, 20 final criteria, nine vector diagrams, valid document asset links).
- Verified original project files remained in the resulting package; preserved legacy pages were not removed or edited.

**Limit:** An end-to-end Vite production build could not run in this environment because the required npm tarballs were not cached and the npm package registry was unavailable. This is not a claim that a production build was successful. Run `npm ci`, `npm run build` and `npm run validate` from the extracted repository in your normal Node 24 development environment before committing the update.

## Evidence integrity

The final source/evidence snapshot is dated 7 October 2026. Historical Sprint 1–3 features are mapped to the current source without implying they were all complete on the first day of their respective sprints. The final criterion map retains unsupplied, independent test evidence as limitations rather than falsely claiming passes. The final user-feedback content is the one remaining requested **writing and evidence-collection section**; the historical survey is not the final survey.
