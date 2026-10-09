## How the six-member team organised its work

Tutor MX was developed for Wits COMS3011A by a six-member team using a **Scrum-inspired, issue-driven methodology**. The course requirements and client needs were translated into user stories, observable acceptance tests and implementable tasks. Rather than assigning work arbitrarily, the group discussed responsibilities together before each sprint, used Gitea to record the decisions and assessed completed work against its agreed acceptance criteria.

## How members chose their responsibilities

1. **Read the work together.** At sprint planning, the members went through the proposed roles and issue cards in the [Tutor MX sprint handbook](documents/tutor-mx-handbook-30-september-2026.pdf), including each user story, dependency, acceptance test and task breakdown.
2. **Discuss preferences and capacity.** Each member could indicate the responsibilities they wanted to take on. The group discussed familiarity with the technologies, workload, dependencies and whether a role could realistically be completed within the sprint.
3. **Vote on the allocation.** The team voted on which member should take each responsibility. Voting helped the group reach an agreed allocation rather than having one person simply impose assignments. The chosen ownership was then reflected in the sprint task board.
4. **Track and demonstrate work.** Assigned members worked from the issue acceptance criteria, tested their changes, handed over the evidence and updated the work tracker. Reviews and integration determined whether a card could genuinely be considered complete.

The assigned **Member 1–6** labels describe sprint responsibilities, not separate types of account in Tutor MX. Application users have Student, Tutor and Organiser roles; the additional Master Organiser privilege is a trusted permission within Organiser.

**Our planning and work-tracking tool:** [Tutor MX Gitea project boards](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) (Wits access may be required). The [Sprint roadmaps](#roadmap) link the individual sprints, handbook stories and the available issue boards.

## How our workflow evolved across the four sprints

| Stage | How work was approached | What we learned / changed |
| --- | --- | --- |
| **Sprint 1 — foundation** | Members worked on separately owned responsibilities, often in parallel, to establish authentication, database, API and frontend foundations. Work was **not completed in strict Member 1 → 6 order**. | Parallel development helped get started, but later integration was difficult when features depended on unfinished work or a shared interface had changed. |
| **Sprint 2 — Basic functionality** | The group again used independently progressing tasks, reviews and integration, **not a fixed chronological member sequence**. | Cross-component dependencies, stale branches and inconsistent contracts led to extra conflict resolution, retesting and repairs. The team needed more predictable integration points. |
| **Sprint 3 — Intermediate functionality** | We switched to a **chronological handover and merge order**: Member 1 finished, was reviewed and integrated into `main`, then Member 2 started from the updated `main`, continuing through Member 6. | Each person used the integration-tested result of the previous work, making dependencies and merge problems easier to isolate. This approach worked better for our team's shared codebase. |
| **Sprint 4 — Advanced functionality** | We retained the chronological order, with **one member branch for that member's sprint work** and an Integration Lead merge/retest between members. | The same controlled sequence supported the shared timetable, scenarios, bookings, audit and final planning features without repeatedly rebuilding earlier code. |

### Why the change mattered

The issue was not that parallel development is inherently incorrect. **Our particular tasks were tightly connected**: frontend screens depended on API contracts, backend routes depended on Prisma changes and allocation/booking rules were shared across several roles. Under the first two sprints' less coordinated completion order, members could finish their own work while still waiting for or conflicting with another person's changes. That caused difficult merges, repeated troubleshooting and regression work. A chronological review-and-merge order gave the next person one current, approved baseline and helped the team complete the later sprints more reliably.

This is a **team retrospective**, supplied by the group and supported by the handbook's documented change to sequential integration; it is not a claim that the course mandated all teams to work sequentially. The detailed Git mechanics and branch handover rules are documented once in [Git methodology](#git-methodology).

## From user story to completed feature

| Stage | What the team does | Evidence a marker can inspect |
| --- | --- | --- |
| Sprint planning and voting | Agree tasks, a Member owner, reviewer and acceptance checks | [Gitea sprint projects](https://sdp.ms.wits.ac.za/innovent/tutor-mx-system/projects) and [handbook](documents/tutor-mx-handbook-30-september-2026.pdf) |
| Implementation | Build the task on the assigned feature branch | Commit history, linked issue and code review |
| Self-test | Check success, invalid/failure and relevant empty/permission states | `npm run check`, relevant automated tests and screenshots |
| Handover | Push the branch and provide test results and limitations | Branch, issue ID, Actions run and Codecov evidence |
| Review/integration | Integration Lead reviews, merges to Gitea `main` and reruns affected regression tests | Reviewed merge and accepted main build |
| Demonstration | Check an integrated Student, Tutor, Organiser or Master Organiser journey | Dated role-safe screenshot, client review or test record |

## Definition of Done and improvement practice

A card counted as complete only when the specified user story and acceptance tests were satisfied, the local smoke test and automated checks were run, the correct work was committed and reviewed, CI was checked when available, and the approved integration did not break existing behaviour. Queued shared runners were not described as passing CI; they needed to finish first.

The [work tracker](#work-tracker), [bug tracker](#bug-tracker), [stakeholder decisions](#stakeholder-decisions) and [testing evidence](#testing) supply the complementary records. The [four sprint roadmaps](#roadmap) explain *what* was delivered; this chapter explains *how* the team worked.
