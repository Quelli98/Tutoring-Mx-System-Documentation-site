## The deployment map

| Service | Public / administrative link | What runs there | Evidence boundary |
| --- | --- | --- | --- |
| Tutor MX frontend | [tutor-mx.pages.dev](https://tutor-mx.pages.dev) | Compiled React/Vite static assets | A browser role smoke test is needed for the final release |
| Tutor MX backend | [tutor-mx-api.onrender.com/health](https://tutor-mx-api.onrender.com/health) | Node.js + Express | Earlier health/readiness checks passed; source archive has no release SHA |
| Neon PostgreSQL | [Project and branch](https://console.neon.tech/app/projects/morning-rice-90086270/branches/br-rapid-term-b2gq2rx2) | Relational database | Console requires authorised access; current row counts not supplied |
| Auth0 | [Auth0 dashboard](https://manage.auth0.com/) | Identity provider, role claims, Management API | Tenant access restricted to authorised administrators |
| Prisma | Schema/client inside the repository/backend | Database toolkit, migrations and typed queries | It is not a separate hosting server |
| Documentation | [GitHub Pages](https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/) | This independent static documentation build | This ZIP must be reviewed/pushed to update the public site |

The deployment diagram shows managed services, browser execution and network connections. We do not invent provider physical server counts or hardware specifications.

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

The handbook uses `--commit-dirty=true` for the deployment tool; this does not prove that a dirty working tree is the approved release. Record `git status`, the approved source SHA and the exact build/deploy evidence. The ZIP has no `.git` metadata, so no current SHA is invented here.

Deploy the matching backend through the team's Render workflow, then verify `/health`, `/ready`, one approved account per role and the Master queue. Keep the release SHA, migration status, logs and screenshots together. A successful frontend upload alone does not verify the backend or all role flows.

## What the screenshots show

The retained Render screenshot shows an earlier live deployment and commit `5b426af`. It is useful dated history, not proof that the newer Master Organiser source is the currently deployed commit. The Neon screenshot shows table structure at that time. Newer table fields and models on this site are verified from the 30 September source archive.

A redacted Auth0 tenant/role screenshot was not supplied. The site therefore explains the actual provider, claim and guard code and gives the exact demo workflow; it does not fabricate a dashboard screenshot.
