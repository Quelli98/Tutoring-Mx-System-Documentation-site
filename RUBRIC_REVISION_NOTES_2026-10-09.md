# Tutor MX — rubric-aligned documentation revision (9 October 2026)

This revision is based on the COMS3011A project brief (Milestones 1–4), the 30 September Tutor MX handbook, the retained 18 September Sprint 3 handbook, and the supplied existing documentation source/evidence. The final source inventory is retained, including 120 API registrations, 30 Prisma models, 20 final-rubric criteria and all nine diagrams.

## Updated chapters

- **Architecture**: explains frontend/backend boundaries, an HTTP request through Express/Prisma, the four-sprint evolution, technical motivations, limitations and related rubric criteria.
- **Frontend**: Student, Tutor and Organiser interfaces and all four sprint origins; separates usability, accessibility, aesthetics, responsiveness and verification.
- **Git methodology**: Sprint 1, 2, 3 and 4 approaches independently; explains the group's voting, early parallel integration difficulties, reasons for chronological Member handover and the actual Gitea/CI responsibilities.
- **UML**: an interpretation and engineering-significance paragraph for every existing diagram; ERD explanation remains in the database chapter.
- **Security and roles**: evolving identity/role controls, access matrix, server protections, Master permission and limitations.
- **Holiday integration**: rationale, backend path, four-sprint progression, timeout/cache/fallback and evidence distinction.
- **Testing and performance**: milestone-linked test strategy, test levels, observations and existing dated coverage/performance/accessibility evidence.
- **Deployment**: evaluates each assessed database/API/app deployment criterion, release process, evidence and rollback/verification limits.
- **Work tracker**: all 18 detailed Sprint 3 Member cards, linked to the preserved 18 September handbook, alongside the existing Sprint 1/2/4 card registers and Gitea board snapshots.
- **Bug tracker**: four-sprint process with dated post-Sprint-2 defects and follow-on risk/regression coverage; differentiates documented issues from acceptance categories without fabricating bug IDs.
- **Third-party register**: architecture, motivation, licence/source-of-truth, limitations and external service boundaries.
- **API**: removed the reviewer-directed phrase, retaining explanatory HTTP contracts and all existing operations.

## Evidence boundaries

- Dates, CI/Codecov percentages and performance statistics remain *historical release evidence*, not new tests performed during this edit.
- The Gitea project board / Actions links can require Wits sign-in. No private Neon console link has been reintroduced.
- The Sprint 3 board screenshot shows 19 Done cards; the old handbook has 18 planned Member feature cards. Both counts are labelled rather than conflated.
- Final-release user feedback remains the separately identified section requiring new evidence. Original evidence and source files are preserved.
- Documentation validation and TSX syntax transpilation passed in the preparation environment. A full Vite production build needs to run on the user's local Windows/npm installation because npm dependencies were incomplete in this environment.

## Apply or run

Option A: Extract the **full source ZIP** and copy its contents into the existing documentation repository while preserving the repository's `.git` folder; check git status before copying.

Option B: Extract the **changed-files patch ZIP** and, in the clean documentation repository's VS Code PowerShell terminal, run `powershell -NoProfile -ExecutionPolicy Bypass -File "<your extracted patch directory>\APPLY_PATCH.ps1"`. The patch copies changed files only and does not commit or push.

Then run `npm ci`, `npm run build`, `npm run validate`, and `npm run dev`. Inspect all documentation before committing or pushing. This archive contains no Git credentials, no remote writes and no automatic deployment.
