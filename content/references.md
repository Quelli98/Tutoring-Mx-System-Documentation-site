## Source hierarchy and dates

| Source | Used for | Scope |
| --- | --- | --- |
| 30 September 2026 handbook, supplied on 3 October | Current baseline, role onboarding, Sprint 4 owners and no-rebuild rule | Pages 4–6 and 30–44 supersede older conflicting material; pages 13–29 are historical |
| Final supplied Git repository ZIP, 7 October 2026 | Final Sprint 4 routes, schema, tests, README and Git history | `main`/`origin/main` at `361954e`; supersedes the 30 September source snapshot for final implementation status |
| Final application `README.md` from the supplied repository | README and organised setup/contract chapters | Retained as the current source README; older README claims remain historical |
| Original documentation archive | Sprint history, meetings, feedback and prior evidence | Preserved under history navigation |
| 29 September rubric/platform screenshots | Marking questions and dated provider evidence | Not proof of newer deployment or production row counts |
| 3 October approval-route HTTP checks | External anonymous requests to the two new read routes | Both returned 401; no token or private data used |
| Earlier 29 September HTTP check | Health/readiness and anonymous rejection | Dated result retained from the prior work; not rerun as October uptime evidence |
| 7 October Render + Codecov screenshots | Final release/deployment and coverage evidence | Render and Codecov both identify latest commit `361954e` |
| 7 October Gitea Actions screenshot | Reviewed Member 6 branch CI evidence | Green `ci.yml` run on `2f62311`, the reviewed commit merged into final `361954e` |
| 7 October Neon + Auth0 screenshots | Production database structure and role configuration | Administrative screenshots only; no secrets/private rows published |
| 7 October responsive + performance screenshots | Common-width UI evidence and deployed API measurements | 400×645 / 757×645 captures; public health/readiness timing and light-load samples |


## Public verification links

These links are useful to a marker because they do not require access to the team's private Gitea, Neon or Auth0 administration consoles.

- [Tutor MX production application](https://tutor-mx.pages.dev)
- [Final captured Cloudflare deployment](https://06d22424.tutor-mx.pages.dev)
- [Public backend `/health`](https://tutor-mx-api.onrender.com/health)
- [Public backend `/ready`](https://tutor-mx-api.onrender.com/ready)
- [Published documentation](https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/)
- [Documentation source on GitHub](https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site)

Private provider consoles are documented through screenshots rather than links that would lead an unauthorised viewer to a login page.

## Read the handbook and original materials

- [Updated 30 September handbook PDF](documents/tutor-mx-handbook-30-september-2026.pdf)
- [Updated README — display-cleaned Markdown](downloads/updated-README.md)
- [Updated README — exactly as supplied](downloads/updated-README-as-supplied.md)
- [README from the inspected source archive](downloads/application-README-source.md)
- [Final Sprint 4 documentation update notes](downloads/UPDATE_NOTES_2026-10-07_SPRINT4_FINAL.md)
- [Technical source evidence bundle](downloads/technical-source-evidence.zip)
- [Final Sprint 4 Git log excerpt](downloads/sprint4-final-git-log.txt)
- [Current schema](downloads/schema.prisma) and [route source](downloads/api-routes.ts.txt)
- [API bootstrap/service wiring](downloads/api-bootstrap.ts.txt)
- [Historical user feedback](#user-feedback) and [document archive](#documents)

## Official technical references

These references explain the technologies and notation. Tutor MX implementation claims above are grounded in the supplied code and handbook, not inferred merely from a provider's marketing page.

| Subject | Primary reference |
| --- | --- |
| Auth0 React SDK | [Auth0 React documentation](https://auth0.com/docs/libraries/auth0-react) |
| Access tokens and API audience | [Auth0 access tokens](https://auth0.com/docs/secure/tokens/access-tokens) |
| Express routing | [Express routing guide](https://expressjs.com/en/guide/routing.html) |
| Prisma models and migrations | [Prisma documentation](https://www.prisma.io/docs) |
| Neon PostgreSQL | [Neon documentation](https://neon.com/docs/introduction) |
| Render service deployment | [Render web services](https://render.com/docs/web-services) |
| Cloudflare Pages | [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/) |
| GitHub Pages | [GitHub Pages documentation](https://docs.github.com/en/pages) |
| UML notation | [OMG UML specification](https://www.omg.org/spec/UML/) |
| Holiday provider | [Nager.Date API](https://date.nager.at/Api) |

## AI attribution and evidence integrity

The source README lists its existing tools and truthful historical trailers. The updated handbook carries its own declaration. Preserve these. This documentation restoration/update used ChatGPT/Codex assistance; record the actual visible session model and course-required transcript/commit attribution without guessing a model from a tool or software version.

No production secrets, tokens or user data were required to build this documentation. The diagrams are authored vector models with explicit scope labels, not fabricated production screenshots.
