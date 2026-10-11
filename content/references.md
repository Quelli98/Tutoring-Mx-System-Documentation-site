## Source trail across all four sprints

The [Sprint 1](#sprint1), [Sprint 2](#sprint2), [Sprint 3](#sprint3) and [Sprint 4](#sprint4-roadmap) roadmaps distinguish the original work, requirements and decisions. This library consolidates their **shared evidence**, including the exact handbook, final source files, diagrams, dated quality reports and Gitea work boards, without making earlier sprint evidence disappear. [Four-sprint work register](#work-tracker).

## Source hierarchy and dates

| Evidence | Date / version | What it establishes |
| --- | --- | --- |
| Current general project brief | Attached 15-page version, incorporated 11 October | Shared requirements; 20 final criteria and weights; separate report and presentation rubrics |
| Tutor-specific brief and 30 September handbook | Project scope and later accepted extensions | Basic/Intermediate/Advanced features, Member ownership and acceptance specifications |
| Bundled route/schema source and technical ZIP | 7 October, `361954e` | 120 operations, 30 models, 14 enums, 30 migration directories and the recorded release history |
| Member's final-audit record | 10 October, `a3939f8` | Reported audit fixes, 1,466 backend / 847 frontend tests and final CI; original records are linked on Gitea |
| Follow-up source record | 11 October, `6b528a3` then `3540d46` | Frontend test correction then README update, as recorded in the member patch |
| Codecov screenshots | 11 October, `6b528a3` | Captured 85.42% backend and 80.87% frontend coverage; 82.93% combined |
| Render and Cloudflare deployment captures | 7 October | The captured release; these images do not identify a later deployed revision |
| Neon row/migration screenshots | 11 October | 353 rows, 27 Profiles and 30 completed migrations at the captured time |
| Lighthouse HTML reports and screenshots | 11 October | Landing-page scores and metrics; separately recorded Organiser accessibility findings |
| Team-reported HTTP checks | 11 October, 13:14 SAST | Dated availability and anonymous-rejection observations, not continuous monitoring |
| Five-response user survey | 28 September | Recorded feedback and the response to it; no later survey is implied |
| Historic handbooks, meetings and sprint evidence | Original dates retained | Development history and decisions across all four sprints |

Later written audit records do not update the bytes in the 7 October technical bundle. The member patch reports no route/schema changes in the final audit; the bundled source remains labelled with its captured date. The application test suites and external provider dashboards were not rerun during this documentation-only audit.

## Public verification links

These links are useful to a marker because they do not require access to the team's private Gitea, Neon or Auth0 administration consoles.

- [Tutor MX production application](https://tutor-mx.pages.dev)
- [Final captured Cloudflare deployment](https://06d22424.tutor-mx.pages.dev)
- [Public backend `/health`](https://tutor-mx-api.onrender.com/health)
- [Public backend `/ready`](https://tutor-mx-api.onrender.com/ready)
- [Published documentation](https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/)
- [Documentation source on GitHub](https://github.com/Quelli98/Tutoring-Mx-System-Documentation-site)

Private consoles may be helpful **when a reviewer is authorised**, but they do not become public through a hyperlink. [Gitea issue boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) may require Wits project membership; the [production Neon console](https://console.neon.tech/app/projects/morning-rice-90086270/branches/br-rapid-term-b2gq2rx2/tables) requires Neon sign-in and access to this project. For everyone else, use the public [database dictionary](#database) and the dated screenshots. Do not grant broad production database access to publish marking evidence.

## Updated official brief and project-specific scope

- [2026 COMS3011A project brief and Milestone 1–4 rubrics](documents/coms3011a-2026-official-brief.pdf) — the uploaded University assessment criteria and milestone dates.
- [Tutor Management System project-specific brief](documents/tutor-management-project-brief.pdf) — the Basic, Intermediate and Advanced feature requirements for this project.
- [Four-sprint linked rubrics](#roadmap) — the editable, criterion-by-criterion development traceability index.
- [Four sprint roadmaps](#roadmap) — historical requirements and key decisions are consolidated under the maintained chapters rather than duplicated in an archive menu.

## Read the handbook and original materials

- [Updated 30 September handbook PDF](documents/tutor-mx-handbook-30-september-2026.pdf)
- [Updated README — display-cleaned Markdown](downloads/updated-README.md)
- [Updated README — unedited copy](downloads/updated-README-as-supplied.md)
- [README from the inspected source archive](downloads/application-README-source.md)
- [Final Sprint 4 documentation update notes](downloads/UPDATE_NOTES_2026-10-07_SPRINT4_FINAL.md)
- [7 October technical source evidence bundle](downloads/technical-source-evidence.zip)
- [7 October Sprint 4 Git log excerpt](downloads/sprint4-final-git-log.txt)
- [Schema snapshot](downloads/schema.prisma) and [route source snapshot](downloads/api-routes.ts.txt)
- [API bootstrap/service wiring](downloads/api-bootstrap.ts.txt)
- [Original historical documentation source](downloads/historical-site-source.tsx.txt) — retained for provenance; only the stakeholder and feedback pages are loaded in the current site.
- [Historical user feedback](#user-feedback) and [official handbook and documents](#references)

## Official technical references

These references explain the technologies and notation. Tutor MX implementation claims above are based on our code and handbook.

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
| Project methodology | [The Scrum Guide (Schwaber and Sutherland, 2020)](https://scrumguides.org/scrum-guide.html) |

## AI declaration

This documentation website was written with AI assistance. The team takes responsibility for all content on this site, including AI-assisted material.

| Period | Tool | Model | Purpose |
| --- | --- | --- | --- |
| 13 August 2026 | Codex | GPT-5 | Code and content for the initial documentation site, and the stakeholder, sprint, testing and architecture-decision evidence pages |
| 14 September – 9 October 2026 | ChatGPT | GPT-5.6 Sol (as recorded in the prior documentation) | Drafting and editing the Sprint 2–4 chapters, roadmaps and rubric mapping, and code for the site redesign |
| 11 October 2026 | Claude Code | Claude Opus 5.5 | Editing and drafting: removing internal working notes; updating the test, coverage, service-check, Lighthouse and production-data figures; drafting the bug-fix, library, Scrum, API-example and UI-design sections and the OpenAPI specification from the team's code, pull requests and evidence; and writing this declaration |
| 11 October 2026, final merge and audit | ChatGPT Work / Codex | User-reported ChatGPT configuration: GPT-6 Astra (Max); exact model of this coding-agent session is not exposed | Rubric audit, evidence reconciliation, documentation UI, loading improvements, build and content validation |

AI use in the Tutor MX application code is declared separately in the application repository's [AI_DECLARATION.md](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/src/branch/main/AI_DECLARATION.md).

No production secrets, tokens or user data were required to build this documentation. The diagrams are authored vector models with explicit scope labels, rather than screenshots of production.
