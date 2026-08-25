# Tutor MX documentation site

Rubric-aligned public documentation for the Tutor MX System. The site reflects the **23 August 2026 Sprint Handbook** and was reorganised for the **Sprint 1 review on 25 August 2026**.

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

The rubric-aligned content was updated using `Tutor_Mx_Sprint_Handbook_FULLY_UPDATED_23_Aug_2026.pdf` as the current project workflow/implementation source. Where the handbook records a Sprint 1 boundary (Student mock API and allocation Save placeholder), this site keeps that limitation visible rather than claiming later-sprint work is complete.

## AI declaration

ChatGPT [GPT-5.6 Sol] was used on 25 August 2026 to reorganise and update the documentation website for Sprint 1 rubric alignment using the supplied project rubric screenshots and current Tutor MX Sprint Handbook. The Tutor MX team remains responsible for checking the site against the live repository, project brief and actual evidence before assessment.
