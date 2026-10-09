# Sprint roadmaps and rubric traceability

The project was delivered in four assessed milestones. Each roadmap links the **official criterion** to the most appropriate living technical chapter and to the **historical evidence that actually belonged to that sprint**. The roadmaps explain the evolution of the work; the technical reference describes the complete supplied application.

| Milestone | Period | Main objective | Read the complete map |
| --- | --- | --- | --- |
| **Sprint 1 / Milestone 1** | 3–25 August 2026 | Set up the repositories, architecture, security, baseline UI and a demonstrable vertical path. | [Sprint 1 roadmap](#sprint1) |
| **Sprint 2 / Milestone 2** | 26 August–15 September 2026 | Finish the Basic allocation, Tutor and Student workflows with real persistence, testing and review. | [Sprint 2 roadmap](#sprint2) |
| **Sprint 3 / Milestone 3** | 16–29 September 2026 | Deliver the Intermediate operations, strengthen verification and incorporate feedback. | [Sprint 3 roadmap](#sprint3) |
| **Sprint 4 / Milestone 4** | 30 September–11 October 2026 | Complete Advanced planning and shared Student scheduling, then assess the whole delivered system. | [Sprint 4 roadmap](#sprint4-roadmap) |

The Sprint 4 handbook records the **planned acceptance criteria**, while the [final source-based delivery record](#sprint4), [feature register](#features) and [rubric evidence map](#milestone4) describe the state of the supplied final code. A planned task is not automatically proof that a production demonstration or external sign-off happened.

## Live issue boards and the original acceptance tests

All four sprint roadmaps link their official rubric requirements to the most relevant technical and evidence pages. The team's **stories, acceptance checks and task checklists** are preserved in the [30 September handbook](documents/tutor-mx-handbook-30-september-2026.pdf); the Gitea project boards record issue ownership and tracking status.

- [Gitea — all Tutor MX project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) (access to the internal Wits Gitea project may be required)
- [Sprint 2 Gitea project board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/39)
- [Sprint 3 Gitea project board](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects/42)

The Sprint 1 and Sprint 4 projects are linked through the **all-projects** landing page because the supplied screenshots do not establish a reliable board-specific URL. The individual roadmaps include the *exact handbook pages* for Member stories, acceptance checks and tasks. This public documentation remains readable even for a marker who cannot sign in to Wits Gitea.

## How to follow a rubric link

1. Choose the sprint and criterion below.
2. Open the linked canonical documentation chapter for the implementation and evidence.
3. Use the historical sprint record where the question is about *what happened at that time*.
4. Use [testing and performance](#testing), [project methodology](#process) and [sources](#references) to verify claims against dated artefacts.

## Evidence chronology

- **Sprint 1:** initial Auth0/role architecture, handwritten API, Prisma/Neon persistence, Organiser/Tutor/Student page foundations, Git practice and deployment.
- **Sprint 2:** real allocation writes and approvals, submitted timesheets, excuse states, Student volunteer persistence, cross-role permission checks and public-holiday integration.
- **15–16 September:** production stabilisation corrected candidate clash details, post-save self-conflicts, Tutor-owned work preferences and completed-session work-log gating.
- **Sprint 3:** notifications, Ctrl/Cmd+K search, explainable Tutor ranking and bulk allocations, reporting/Command Centre, timetable import and recurring terms, payroll/dispute improvements and overflow management.
- **Sprint 4:** a shared Student/Tutor calendar, mutually safe bookings and sick notes, scenarios and comparison, Tutor swaps, audit/restore and a deterministic whole-school proposal engine.

## Authoritative sources

- [University COMS3011A project brief and milestone rubrics](documents/coms3011a-2026-official-brief.pdf)
- [Tutor Management System project-specific requirements](documents/tutor-management-project-brief.pdf)
- [Updated team handbook, Sprint 1–4 responsibilities and acceptance tests](documents/tutor-mx-handbook-30-september-2026.pdf)
- [Full rubric-by-rubric final submission mapping](#milestone4)
- [Historical plans, evidence and decisions](#references)

**Open evidence boundary:** the site retains five earlier user-feedback responses and their original screenshots. A final post-release user-feedback round and its resulting decisions are the deliberately unfinished item in [User feedback](#user-feedback).
