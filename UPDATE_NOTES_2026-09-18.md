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
