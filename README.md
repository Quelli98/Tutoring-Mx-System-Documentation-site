# Tutor MX Documentation Site

## Current documentation baseline — 18 September 2026

This repository contains the public Tutor MX project documentation. The current documentation update:

- installs the **final 18 September Sprint Handbook** as the canonical handbook;
- adds a dedicated **Sprint 1 Roadmap** mapped to the official Milestone 1 rubric while preserving the existing Sprint 2 rubric/roadmap page;
- preserves Sprint 1-2 history while combining post-Sprint 2 stabilisation and the current Sprint 3-4 plan into one **Sprint 1-4 Plans & Evolution** record;
- documents the final **Sprint 3-4 one-branch-per-Member sequential method**;
- separates **Integration Lead** review/merge/regression/deployment responsibility from normal Member feature work;
- records the group discussion that removed duplicated future work and rebalanced Member 6;
- documents the **Tutor MX Command Centre** and explainable allocation proposal as deliberate project-specific polish;
- adds a dedicated **Stand-out Product Improvements** decision record explaining what each special enhancement is, why the group selected it, how it strengthens the real tutor-management workflow and how it will be evidenced once implemented;
- adds Group Report and Individual Report rubric/evidence pages so final report writing can be grounded in dated project evidence.

Use the React/Vite site in `src/` as the maintained public documentation experience.

## Run locally

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

The generated static site is written to `dist/`.


## 18 September navigation refinement

- Sprint 1 roadmap rubric rows now link directly to the relevant documentation/evidence pages, matching the Sprint 2 rubric-map navigation style.
- The former **Sprint 2 Review** navigation group is now **Tutor MX System**. Its Core Features page is project-wide and tracks Sprint 1 foundations, Sprint 2/current Basic behaviour, Sprint 3 Intermediate roadmap work and Sprint 4 Advanced roadmap work without presenting planned features as already implemented.


## 18 September four-sprint evolution refinement

- The separate **Post-Sprint 2 stabilisation** and **Sprint 3-4 final plan** navigation pages were consolidated into one living **Sprint 1-4 Plans & Evolution** page.
- The combined page records Sprint 1 foundations, Sprint 2 Basic completion, the 15-16 September stabilisation fixes, the 18 September group planning review, the current Sprint 3 plan and the current Sprint 4 plan in one chronological narrative.
- The page explicitly defines the update discipline for future Sprint 3/4 work: date → problem/input → group discussion/evidence → decision → owner → tests/integration evidence → result → lesson/report relevance.
- **Core Features** remains a separate whole-product page and is no longer framed as Sprint 2-only content. It tracks implemented versus planned functionality across all four sprints.
- **Stand-out Product Improvements** remains a dedicated decision record and now sits beside the four-sprint evolution page as project-wide product-evolution evidence.
- Sprint 1 rubric criteria and evidence-owner cells are clickable so the Sprint 1 roadmap provides the same direct evidence navigation as Sprint 2.
