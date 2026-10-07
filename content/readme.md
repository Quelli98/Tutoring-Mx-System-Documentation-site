## The README, organised by purpose

The updated README is included in full below, with pasted escape formatting repaired for display. Its raw original remains downloadable. The guide here groups its content into usable columns and corrects statements that differ from the verified source or newer handbook.

| README topic | Where it is explained | Key answer |
| --- | --- | --- |
| Project/hosting links | [Deployment](#deployment) | Cloudflare frontend, Render backend, Neon database; Gitea official source |
| Repository folders | [Architecture](#architecture) | `frontend/`, `src/` and `prisma/` are separate layers in one repo |
| Setup and commands | This chapter | Install both workspaces, configure environments, generate and migrate |
| Auth0 roles | [Security](#security) and [Master Organiser](#master-organiser) | Three stored roles; extra Master privilege; lecturer approval required |
| HTTP contracts | [API reference](#api) | 120 source-registered operations and external read examples |
| Database | [Tables](#database) | 30 current models, fields, relations and migration evidence |
| Quality and deployment | [Testing](#testing) and [Git method](#git-methodology) | Local gates plus completed remote CI and approved release |
| Sprint 4 final scope | [Sprint 4](#sprint4) | Shared Student scheduling plus Advanced planning are implemented in final main |

## Application setup

These commands belong to the Tutor MX **application** checkout, not this documentation repository. Use Node.js 24, npm 11+ and the project's configured PostgreSQL environment. Start from the current approved main and preserve local work.

```powershell
npm ci
npm ci --prefix frontend
npm run generate
Copy-Item .env.example .env
Copy-Item frontend/.env.example frontend/.env.local
# Fill the copies with authorised values. Do not commit them.
# Apply/seed only the intended local development database.
npm run db:migrate
npm run db:seed
npm run dev
```

The frontend normally starts at port 5173 and the API at port 3000. The root development script starts both. Database migration/seed commands change a database: confirm the local target first; do not seed production merely to prepare a demonstration.

## Configuration columns

| Configuration | Where it belongs | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Frontend build environment | Render production API or local API origin |
| `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_AUDIENCE` | Frontend build environment | Public SPA configuration and requested API |
| Auth0 issuer/domain, audience and roles-claim key | Backend environment | Verify the same access-token contract |
| Auth0 Management credentials / connection | Backend only | Provision authorised roles and account lifecycle |
| `DATABASE_URL` | Backend runtime | PostgreSQL connection |
| `DIRECT_URL` when supplied | Backend/CLI environment | Preferred configured migration connection |

Use the exact variable names from the source `.env.example` files for fields not spelled out here. Never infer a secret from a screenshot or put it in the frontend.

## Corrections and source precedence

| README statement | Current documentation treatment |
| --- | --- |
| “Token cache explicitly in memory” | Source sets local storage; documented in Frontend and Security |
| Older production commit/deployment proof | Retained as historical; final Sprint 4 release is `361954e` |
| Route inventory | Final catalogue follows the 120 operations registered in the supplied Sprint 4 `src/app.ts` |
| Sprint 2/Member 5 handoff wording | Historical; handbook marks Sprint 3 complete and updates Sprint 4 |
| Linked root `MEMBER5_HANDOFF.md` | Absent from the archive; use the supplied `docs/sprint3-member5-completion.md` evidence instead |

The final application README supplied inside the Sprint 4 repository is retained in the original README panel and download. The linked chapters and catalogues are the maintained explanation of the final source plus the 30 September handbook.

## Run this documentation website

```powershell
npm ci
npm run build
npm run dev
```

This static site uses a GitHub Pages base path. Open the URL printed by Vite. No Auth0 secret or Neon connection string is needed. `START-HERE.md` in the downloadable project explains copying the reviewed changes into the existing documentation checkout and publishing through its preserved Pages workflow.
