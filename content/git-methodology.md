## Gitea main is the official integration branch

The team uses a reviewed branch-to-main workflow. **There is no develop branch.** Gitea `main` is the shared source of truth; a GitHub mirror supports deployment. The documentation website has its own GitHub repository and Pages build. A deployment mirror is not a second independent development history.

Feature work happens on Member branches. Focused commits make a change understandable, reviewable and reversible. The Integration Lead reviews/tests/integrates approved work into main and reruns the affected regression. The handbook permits the Lead's reviewed repository-maintenance/integration work through their integration workflow; that exception does not make main a normal Member working branch.

## Exact Sprint 3–4 sequence

For these sprints, **one Member uses one branch for all of that Member's sprint cards**. Start Member 1 from approved main. They finish, test, push and hand over. The Integration Lead reviews/tests/merges. Only then does Member 2 pull updated main and create their one branch. Continue through Member 6.

| Order | Member branch | Before starting | After completion |
| --- | --- | --- | --- |
| 1 | `s4/m1/completion` | Pull approved main | Handover → Lead review/merge/regression |
| 2 | `s4/m2/completion` | Pull main containing M1 | Handover → Lead review/merge/regression |
| 3 | `s4/m3/completion` | Pull main containing M2 | Handover → Lead review/merge/regression |
| 4 | `s4/m4/completion` | Pull main containing M3 | Handover → Lead review/merge/regression |
| 5 | `s4/m5/completion` | Pull main containing M4 | Handover → Lead review/merge/regression |
| 6 | `s4/m6/completion` | Pull main containing M5 | Handover → Lead review/merge → final combined release gate |

Do not create separate branches for each Sprint 4 card. Do not branch from the preceding Member's feature branch. The merge between Members is a workflow step, not a seventh feature card or part of Member 6's proposal-engine responsibilities.

## Why the team chose this method

A six-person project shares routes, schema, calendars and rules. Sequential integration lets the next Member build on one known reviewed contract and reduces long-lived divergent implementations. The cost is less parallel feature coding and dependence on prompt review. Clear handovers, small commits and early interface discussion keep that cost manageable.

The no-forward-dependency rule means a Member includes any small supporting route, migration, service or UI required to finish their own feature. M4's Student sickness feature must work on M4's branch; it cannot wait for M5 to write its API. M5 later instruments and hardens existing features.

## Member commands and handover

Run these from the **application** repository. Check your status and preserve local work before switching branches.

```powershell
git status
git switch main
git pull origin main
git switch -c s4/m1/completion
# Implement this Member's assigned work and acceptance checks.
npm run check
npm run coverage
git diff --check
git add <intended-files>
git commit -m "feat: describe the completed change"
git push -u origin s4/m1/completion
```

Use the correct Member number; switch to an existing sprint branch rather than recreating it. Add truthful course-required AI attribution to commits. Include issue IDs, branch, focused test commands/results, browser/API evidence, known limits, and the completed CI/Codecov run link in the handover.

## Review, conflicts and CI

The reviewer checks the story/acceptance criteria, permissions, state transitions, tests and scope. The Lead resolves integration conflicts with the author, preserves earlier Members' changes and reruns the affected combined behaviour. A branch that works alone is not Done until the integrated behaviour passes.

The handbook records two lecturer-managed shared Gitea runners. A queued job is normal when capacity is busy. Wait for its completed run; do not report queued CI as green, remove tests to get a pass or repeatedly restart a queued job. A genuine infrastructure outage is recorded with local evidence and escalated to staff.

## Release and evidence

After M6, the Lead runs the combined automated gate, coverage, clean-browser role smoke tests, database migration/recovery checks and security/concurrency cases. Approved main is mirrored and released to Render/Cloudflare, and the actual release SHA is recorded in the real repository.

Evidence should include Member commits, PR/review links, the chronological merge history, CI/Codecov runs, release SHA and screenshots tied to that release. The supplied source ZIP has no `.git`, so this website explains the method and preserves historical evidence without manufacturing current commit or PR IDs.

[30 September handbook, pages 3, 7–12, 34–41](documents/tutor-mx-handbook-30-september-2026.pdf) · [Historical Git evidence](#version-control-history).
