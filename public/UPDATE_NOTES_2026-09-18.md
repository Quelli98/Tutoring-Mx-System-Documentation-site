# Tutor MX Documentation Update — 18 September 2026

## Purpose

This update makes the documentation report-ready and aligns the public site with the final Sprint 3-4 handbook. The group reviewed the remaining roadmap because some planned cards repeated work already present in current main and because Member 6 was carrying Integration Lead-style release work rather than enough genuine product work.

## Group decisions recorded

1. **Audit the future roadmap against current main before coding.** Existing features are treated as foundations and are not recreated merely because an older plan listed them again.
2. **Keep strict chronological delivery:** Member 1 → Integration Lead review/merge → Member 2 → ... → Member 6.
3. **Use one branch per Member per sprint:** `s3/mX/completion` and `s4/mX/completion`.
4. **No forward dependencies:** a feature owner includes any small route, migration or validator needed to make their own feature end-to-end.
5. **Separate Integration Lead governance from Member work:** review, merge, combined regression, source synchronisation and deployment verification are Integration Lead responsibilities after every handover. They are not Member 6 substitute tasks.
6. **Rebalance Member 6:** Sprint 3 Member 6 owns the live Command Centre experience; Sprint 4 Member 6 owns the whole-school explainable proposal and strategy-comparison cockpit.
7. **Add deliberate polish rather than unrelated scope:** Command Centre KPIs, shortage heatmap, budget/workload visualisation, Ctrl/Cmd+K, scenario comparison, Why-this-Tutor explanations and the audit timeline all strengthen required Tutor MX workflows.

## Report-readiness changes

The website now contains a Group & Individual Report Preparation page. It preserves the lecturer rubric screenshots and maps each criterion to concrete website evidence. The page also records the writing standard requested by the lecturer: technical/history-style narrative, project-specific justification, critical discussion of the team, evidence links and clear distinction between implemented work and merely documented procedure.

## Files changed

- `src/App.tsx` — current methodology, final Sprint 3-4 decision record, report preparation/evidence map, final handbook links and updated documentation wording.
- `data/site-data.json` — final handbook metadata plus the 18 September roadmap decision.
- `documents/tutor-mx-sprint-handbook.pdf` — canonical handbook replaced with the final 18 September version.
- `documents/Tutor_Mx_Gitea_Sprint_Handbook_FINAL_18_Sep_2026.pdf` — versioned copy retained for traceability.
- `evidence/report-rubric-group-and-individual-part1.png` — supplied lecturer report rubric evidence.
- `evidence/report-rubric-individual-part2.png` — supplied lecturer report rubric evidence.
- `README.md` — updated current documentation baseline.

## Professional rationale

The change is intentionally more than a cosmetic documentation refresh. It creates traceability between what is already implemented, what remains to be built, who owns the work, who owns integration governance, why the process changed and what evidence will later support the assessed Group and Individual Reports. This reduces the risk of contradictory report claims and makes the documentation site itself a usable supporting document/appendix.

## Additional 18 September revision — Sprint 1 roadmap and stand-out improvements

### Sprint 1 roadmap

The documentation previously contained Sprint 1 evidence and rubric-alignment material, but it did not provide the same clear, reviewer-friendly roadmap surface as Sprint 2. The group therefore added a dedicated **Sprint 1 Roadmap** without removing or rewriting the Sprint 2 roadmap/rubric page.

The new roadmap uses the supplied Milestone 1 rubric as its structure: Version Control (10%), Documentation Site (10%), Getting Started / Dev Guides (5%), Work Tracker (5%), Git Methodology (5%), Project Methodology (10%), Tech Stack (5%), Stakeholder Interaction (10%), Initial Design & Development Plan (20%) and Implementation (20%). It links each criterion to the evidence page responsible for supporting it, preserves the official rubric screenshots, explains the chronological Sprint 1 foundation work and gives a beginner-friendly Member 1–6 contribution map.

This change was made to support both assessment navigation and the final reports. It gives the Group Report a coherent history of how the project foundation was established and gives each Member a clearer starting point for their own Responsibilities & Contributions section. The page explicitly retains honest Sprint 1 boundaries rather than retrospectively claiming that Sprint 2 work was already complete.

### Stand-out product improvements

The group also created a dedicated **Stand-out Product Improvements** decision record. During the roadmap review, the team agreed that additional scope should only be accepted when it strengthens the real Tutor MX problem, reuses existing trusted rules/data and creates meaningful usability, decision-support or auditability benefits.

The documented improvements include the Allocation Command Centre, shortage heatmap and budget/workload analytics, Ctrl/Cmd+K navigation, smart timetable import preview, requirement-to-overflow action, scenario comparison and live organiser presence, explainable whole-school proposals with strategy comparison, and a polished audit timeline/restore preview.

The professional rationale is that these additions make Tutor MX stand out through **project-specific technical depth** rather than unrelated novelty. They connect directly to tutor allocation, availability, workload, budget, collaboration and accountability. The page also preserves a strict evidence rule: a planned enhancement is not described as implemented until it is integrated, tested and linked to branch/commit/test evidence.

### Files added / changed in this revision

- `src/App.tsx` — adds Sprint 1 Roadmap, Stand-out Product Improvements, home navigation and report-evidence links; also fixes the prior duplicate `initial-design-plan` object key.
- `evidence/sprint1-rubric-part1.png` and `evidence/sprint1-rubric-part2.png` — official supplied Sprint 1 rubric screenshots.
- `public/evidence/sprint1-rubric-part1.png` and `public/evidence/sprint1-rubric-part2.png` — public copies used by the website.
- `data/site-data.json` — adds dated decision records for the Sprint 1 roadmap and the stand-out improvement strategy.
- `README.md` — updates the maintained documentation baseline.

