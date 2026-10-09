## Deployment design, release method and assessment evidence

Tutor MX has **two separate running deployments**: a React/Vite frontend served through Cloudflare Pages and a handwritten Express API served through Render. The API accesses Neon PostgreSQL via Prisma, while Auth0 owns identity. This public documentation site is independently hosted through GitHub Pages. Keeping these environments separate is important to the project's non-monolithic architecture and external API access requirements.

## What the final rubric requires deployment evidence to establish

| Assessed area | Architecture and evidence | Observation / interpretation | Limit |
| --- | --- | --- | --- |
| **Database deployed and accessible (2%)** | Neon production branch screenshot and application/backend readiness checks; Prisma migration history. | Relational persistence lives outside the browser and is reached through Express. | Admin-console screenshot is not a production-row census; `/ready` at one time is not 24/7 availability. |
| **Database structure (5%) and production/test data (3%)** | [30-model schema and ERD](#database), constraints/migrations and table listing. | Model relationships support real allocation, timesheets, booking and audit rather than independent flat tables. | Exact production vs test row totals have not been independently supplied. |
| **API deployed (2%), external availability (3%)** | Public `/health` and `/ready`, Render Live screenshot tied to release SHA. | HTTP endpoints are reachable independently of React. | Public health does not grant unauthenticated access to protected API resources. |
| **API performance (5%)** | Dated first/warm probes and small concurrent-load samples in [Testing](#testing). | First requests are slower than subsequent warm health checks in the captured sample. | Small samples cannot establish stress capacity or uninterrupted uptime. |
| **App deployed (2%) and responsive/usable (other criteria)** | Stable Cloudflare URL plus captured Student/role layouts and smoke scenarios. | The built frontend is publicly accessible and calls the Render API. | An uploaded `dist` bundle does not alone prove all authenticated actions work. |
| **Git methodology and tools** | Reviewed Gitea `main`, Actions/Codecov checks, deployment mirror and source SHA. | Publication is intended to follow completed integration rather than a Member's unchecked feature branch. | Private Gitea runs require an authorised viewer; screenshots are dated evidence. |

## Release topology

![Separate public frontend and backend hosting, Auth0 identity and Neon storage](diagrams/deployment.svg)

The diagram illustrates the browser → Cloudflare frontend → Render HTTPS API → Prisma/Neon request path, with Auth0 as a separate identity provider. **Deployment means code and assets are hosted and responsive**; verified business functionality additionally requires role-based smoke tests. A database/identity administrator's login is not required to read this architectural explanation.

## Release procedure and safeguards

The Integration Lead selects reviewed Gitea `main`, runs the complete local/test gate and confirms the completed Gitea Actions outcome. Approved source is synced to the GitHub deployment mirror. Versioned Prisma migrations must be compatible with the backend being released; application secrets remain server-side. Frontend public `VITE_*` variables are compiled at build time, so any changes require a fresh Vite build. The built frontend is deployed to Cloudflare Pages; the API is deployed to Render; `/health` and `/ready` are probed; and representative Student, Tutor, Organiser and Master flows are exercised in the deployed browser.

**Rollback and recovery discussion.** If a release introduces a backend failure, restore an approved compatible application revision and evaluate whether schema migrations remain compatible. Avoid destructive production resets. Auth0 privileges and the Neon database cannot be rolled back as one transaction; Organiser approval failures require a deliberate reconciliation path. Render health checks and a green UI build alone would not show that these transitions are correct.

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

### Public verification links — no provider login required

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
