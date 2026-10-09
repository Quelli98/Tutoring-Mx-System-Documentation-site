# Sprint 1–4 documentation coverage patch

Updates the final website's **entire Understand Tutor MX section** to identify the full Sprint 1–4 history; creates a fully annotated feature register with **sprint names only**; replaces the legacy Sprint 2-only work tracker with a Gitea board-and-acceptance index for Sprints 1–4; adds cross-sprint roadmap navigation; and removes the private Neon console link while preserving the public database dictionary and screenshots.

## Provenance and boundaries

Grounded in the 30 September Tutor MX Gitea Sprint Handbook, final supplied Tutor MX application source and provided screenshots. Sprint 3's original individual cards are in Gitea rather than reproduced in the handbook, so their IDs are **not invented**. Sprint 1 and Sprint 4 board-specific project IDs are not established, so the confirmed all-projects link is used. The private Neon console is no longer linked. The user-feedback chapter is unchanged and still requires final-release responses.

## Apply to your GitHub docs site

From the existing `Tutor-MX-Documentation-GitHub` directory, after ensuring there are no uncommitted changes, copy the supplied patch files over matching files, keeping the existing `.git` folder. Then run `npm ci`, `npm run build` and `npm run validate`. The build runs `docs:compile` and regenerates `src/data/content.json`. If the full build fails, do not publish until corrected. Run `npm run dev` to review the pages. Commit/push only after the check passes.

Updated: content/features.md, content/architecture.md, content/frontend.md, content/backend.md, content/student-scheduling.md, content/master-organiser.md, content/database.md, content/roadmap.md, content/work-tracker.md, content/sprint1.md, content/sprint2.md, content/sprint3.md, content/sprint4-roadmap.md, src/App.tsx.

Additional updated chapters: content/api.md, content/security.md, content/integration.md, content/deployment.md, content/references.md, content/site-guide.md; plus four redacted/cropped public/evidence/gitea-sprint*-board-snapshot-2026-10-09.webp images.
