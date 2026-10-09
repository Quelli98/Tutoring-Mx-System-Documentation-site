## Deployment timeline from Sprint 1 through Sprint 4

**Sprint 1** established separately hosted React/Vite and Express applications, Neon storage, Auth0 identity and Gitea CI. **Sprint 2** stabilised Basic routes, database migration checks and the review/deploy cycle. **Sprint 3** expanded tests, coverage, application reports and shared-runner handovers. **Sprint 4** released the combined Student scheduling and Advanced planning features from reviewed Gitea `main`. This chapter distinguishes architecture and dated release evidence from measurements not independently supplied. [Roadmap](#roadmap) · [Testing](#testing).

## The deployment map

| Service | Public / administrative link | What runs there | Evidence boundary |
| --- | --- | --- | --- |
| Tutor MX frontend | [tutor-mx.pages.dev](https://tutor-mx.pages.dev) | Compiled React/Vite static assets | Final deployment plus Student/Tutor/Organiser UI and responsive screenshots supplied |
| Tutor MX backend | [health](https://tutor-mx-api.onrender.com/health) · [ready](https://tutor-mx-api.onrender.com/ready) | Node.js + Express | Render shows `361954e` Live; final public latency/light-load evidence supplied |
| Neon PostgreSQL | Administrative console (login required; screenshot evidence retained below) | Relational database | Production branch/table evidence supplied; current row counts not supplied |
| Auth0 | Administrative console (login required; screenshot evidence retained below) | Identity provider, role claims, Management API | Role-list evidence supplied without exposing tokens or client secrets |
| Prisma | Schema/client inside the repository/backend | Database toolkit, migrations and typed queries | It is not a separate hosting server |
| Documentation | [GitHub Pages](https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/) | This independent static documentation build | This ZIP must be reviewed/pushed to update the public site |

The deployment diagram shows managed services, browser execution and network connections. We do not invent provider physical server counts or hardware specifications.

### Public marker links — no provider login required

- [Open the stable Tutor MX application](https://tutor-mx.pages.dev)
- [Open the final Cloudflare deployment captured for Sprint 4](https://06d22424.tutor-mx.pages.dev)
- [Check the public API health endpoint](https://tutor-mx-api.onrender.com/health)
- [Check the public API readiness endpoint](https://tutor-mx-api.onrender.com/ready)
- [Open the public documentation site](https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/)
- [Open the public documentation source repository](https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site)

Gitea Actions, Neon and Auth0 are intentionally **not** offered as public verification links because they require project/tenant access. Their relevant final screenshots are embedded as evidence instead.

## Frontend configuration

Set the Auth0 domain, SPA client ID, audience and API base URL in the frontend build environment using the supplied `.env.example`. SPA identifiers and audiences are public configuration; database credentials and Auth0 Management client secrets are not. Add the correct development and production callback, logout and web origins to the Auth0 SPA settings.

The local defaults are frontend `http://localhost:5173` and backend `http://localhost:3000`. Set `VITE_API_BASE_URL` to the Render HTTPS URL for production. A changed Vite variable requires rebuilding `frontend/dist`.

## Backend and database configuration

Render holds backend environment values, including `DATABASE_URL`, Auth0 issuer/audience/roles-claim settings and server-only Management credentials. The runtime database adapter uses PostgreSQL. `prisma.config.ts` prefers `DIRECT_URL` for CLI operations when provided, otherwise `DATABASE_URL`; follow the project configuration for migrations.

Deploy migrations before code that expects their new fields. Verify the actual production branch and `_prisma_migrations` rather than treating a migration filename date as a deployment timestamp. Several migration names intentionally have dates later than the archive's audit date.

## Release from approved main

The handbook's source of truth is Gitea `main`. Member branches are reviewed/integrated sequentially. The Integration Lead verifies the combined result, mirrors approved source to the deployment repository and releases the frontend/backend. The handbook also records manual Cloudflare Pages deployment from the freshly built frontend artifact.

```powershell
# Run from the approved application checkout after its full release gate.
git switch main
git pull origin main
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=tutor-mx --branch=main --commit-dirty=true
```

The handbook uses `--commit-dirty=true` for the deployment tool; this does not prove that a dirty working tree is the approved release. For the final supplied repository, the approved source SHA is **`361954e`**. The final frontend upload produced **`https://06d22424.tutor-mx.pages.dev`**; the stable public address remains **`https://tutor-mx.pages.dev`**.

Deploy the matching backend through the team's Render workflow, then verify `/health`, `/ready`, one approved account per role and the Master queue. Keep the release SHA, migration status, logs and screenshots together. A successful frontend upload alone does not verify the backend or all role flows.

## Final Sprint 4 release evidence — 7 October 2026

The supplied Render dashboard screenshot shows `tutor-mx-api` **Live** on commit **`361954e`** with deployment message **“Merge reviewed Sprint 4 Member 6 final fixes”**. The final Codecov screenshots identify the same commit, linking the release source and coverage evidence.

![Render final Sprint 4 deployment](evidence/sprint4-render-final-2026-10-07.png)

The final release source is therefore no longer an unknown 30 September snapshot: it is the supplied Git repository `main` at `361954ec510c624c5f2a0f3d0940c2f7cb769d2e`. Historical Render/Neon screenshots remain useful for earlier milestones, but this 7 October evidence is the Sprint 4 release record.

Additional final evidence was supplied after the release capture: a Neon production-branch overview/table list, Auth0 role configuration, the public landing page and a green Gitea Actions run for the reviewed Member 6 branch. These are embedded below; they are evidence screenshots rather than public administrative links.
