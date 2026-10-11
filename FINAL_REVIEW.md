# Final documentation audit — 11 October 2026

## Merge decision

All seven commits in the member's `tutor-mx-docs-final-cleanup.patch` applied cleanly to the uploaded project. The patch materially improved evidence and technical content; it did not replace the existing visual design. The final project combines the existing navy/blue documentation identity with the member's evidence and an improved assessment index, readable typography and smaller initial download.

The member's Codecov, Lighthouse, Neon, API, UI-design, Scrum and third-party-register additions are retained. All 32 bug records and their Gitea issue links are retained, including the three records that explicitly lack a confirmed original failure. Their retrospective date remains visible.

## Changes completed in the final audit

1. Replaced the older bundled general brief with the exact attached 15-page version.
2. Mapped all 20 Milestone 4 criteria to the correct question, weight, implementation answer and direct evidence. Category totals are Database 10%, API 25%, App 42% and Misc 23%.
3. Corrected **App Structure** to address interface navigation and first-time use, rather than repository folder structure.
4. Added a shared-requirements and Basic/Intermediate/Advanced scope map, plus a guide to the separate report/presentation rubrics. The individual-report weights are preserved as printed: their sum is 105 although the brief's total says 100.
5. Separated the 7 October source/deployment snapshot from the 10 October audit record and 11 October test/README/Codecov evidence. Removed the unsupported assertion that a particular coverage-convention difference alone explains all coverage changes.
6. Clarified the production/test-data distinction, empty-table inference, session persistence and untested areas.
7. Added a searchable/filterable rubric index, accessible status text, clearer evidence links, responsive cards and readable print output.
8. Split chapters, API/schema explorers and the search index into on-demand downloads; kept only the two used historical evidence pages in the active legacy component. Preserved the original historical source as a download.
9. Added repeatable checks for rendered local links/anchors, assets, 32 issue records, source hashes, route aliases and rubric totals. GitHub Pages runs these checks before publication.
10. Preserved the existing GitHub Pages URL, project base path and deployment workflow. Added binary Git attributes to protect supplied PDFs/images from text handling.

## Remaining risks for maximum application marks

The documentation addresses every criterion; the underlying product and real-world evidence determine the awarded mark. The following cannot be completed by changing this documentation repository:

| Rubric area | Evidence limit or product issue still recorded |
| --- | --- |
| Accessibility | Organiser Lighthouse snapshot reports a contrast failure affecting eight elements; no complete screen-reader/keyboard acceptance record. |
| Responsiveness | Existing phone/tablet captures show horizontal overflow. |
| App performance | Supplied mobile Lighthouse performance is 79 with 4.6 s LCP. Signed-in workflow responsiveness is not benchmarked by the landing-page audit. |
| API performance | Existing concurrent-load sample is only five connections for ten seconds, on health/readiness. No sustained authenticated business-load or crash-rate study. |
| Production data / features | Counts are genuine captured evidence, but most data is described by the team as development/testing data. Twelve tables were empty; the exact non-test proportion and final Advanced live acceptance are not established. |
| Deployment | Supplied deployment captures identify the 7 October release; later source/CI evidence does not establish which later revision is served. |
| User experience | No complete cross-browser close/reopen/expiry result. Persisted records and cached identity do not prove restoration of unsaved forms. |
| User feedback / acceptance | Five survey responses from 28 September; no separate final Advanced-workflow stakeholder sign-off. |
| Method / tools | Bugs were formally recorded retrospectively; three records explicitly lack a confirmed original failure. |

No new application test pass, stakeholder acceptance, production usage, deployment or performance result has been invented. The named application files needed to fix the remaining UI issues are outside this documentation ZIP.

## Handover

The ZIP contains the complete merged source. Do not reapply the member patch. Follow `START-HERE.md` to preview and merge into the existing documentation Git checkout. It has not been pushed or deployed by this task. See `VERIFICATION.md` for the actual checks and their limits.
