# Tutor MX documentation site

Rubric-aligned public documentation for the Tutor MX System. The site reflects the **25 August 2026 Sprint Handbook** and was reorganised for the **Sprint 1 review on 25 August 2026**.

The documentation now has explicit coverage for every Sprint 1 rubric criterion:

- Version Control
- Documentation Site
- Getting Started / Development Guides
- Work Tracker
- Git Methodology
- Project Methodology
- Tech Stack
- Stakeholder Interaction
- Initial Design & Development Plan
- Implementation

It also keeps the current architecture and release facts clear: **Gitea main is the official source of truth**, GitHub is a **deployment mirror**, Cloudflare hosts the React/Vite frontend, Render hosts the handwritten Express API, Auth0 handles identity, and Prisma accesses Neon PostgreSQL from the backend only.

Sprint 1 evidence now also includes dated meeting proof: an internal Scrum coordination meeting on **17 August** (reported duration: approximately **15 minutes**), a **client/tutor requirements meeting on 18 August**, and a **Daily Scrum/progress checkpoint on 21 August**. These are documented under Project Methodology / Sprint Evidence rather than Git Methodology, because they demonstrate Scrum-style planning, blocker discussion and stakeholder interaction rather than branch/commit rules.

Sprint 1 testing evidence now also includes a dated **25 August 2026 Codecov snapshot** from the GitHub deployment mirror. The GitHub Actions rerun passed backend quality/coverage, frontend quality/coverage and the clean PostgreSQL migration/API smoke job. Backend and frontend LCOV reports were uploaded to Codecov through OIDC. The snapshot records **81.58% frontend source coverage** and **86.37% backend source coverage**. Later sprint screenshots should be appended as new dated snapshots rather than replacing the Sprint 1 evidence. This remains separate from the lecturer-managed Gitea runner status; Gitea main is still the official source of truth.

## Run locally

```bash
npm ci
npm run dev
```

## Check the documentation build

```bash
npm run build
```

## Publish

1. Replace/update the files in the documentation GitHub repository.
2. Commit and push to `main`.
3. GitHub Pages deploys using `.github/workflows/pages.yml`.
4. Open the public documentation URL and check the **Sprint 1 Rubric Map** first.

## Source note

The rubric-aligned content was updated using the updated 25 August 2026 Tutor MX Sprint Handbook as the current project workflow/implementation source. Where the handbook records a Sprint 1 boundary (Student mock API and allocation Save placeholder), this site keeps that limitation visible rather than claiming later-sprint work is complete.

## AI declaration

ChatGPT [GPT-5.6 Sol] was used on 25 August 2026 to reorganise and update the documentation website for Sprint 1 rubric alignment using the supplied project rubric screenshots and current Tutor MX Sprint Handbook. The Tutor MX team remains responsible for checking the site against the live repository, project brief and actual evidence before assessment.

## Codecov handbook update - 25 August 2026

The handbook now contains a three-page beginner Codecov addendum (pages 47–49). It explains that Codecov does not run tests; GitHub Actions generates backend/frontend LCOV files and uploads them with `codecov/codecov-action@v5`. The existing workflow uses `id-token: write` plus `use_oidc: true`, with separate `backend` and `frontend` flags. The handbook also gives the repeatable end-of-sprint process for rerunning CI, checking both upload steps, recording the current percentages and keeping dated screenshots from earlier sprints.
