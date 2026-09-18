# Tutor MX Documentation Site

## Current documentation baseline — 18 September 2026

This repository contains the public Tutor MX project documentation. The current documentation update:

- installs the **final 18 September Sprint Handbook** as the canonical handbook;
- adds a dedicated **Sprint 1 Roadmap** mapped to the official Milestone 1 rubric while preserving the existing Sprint 2 rubric/roadmap page;
- preserves Sprint 1-2 history and post-Sprint 2 stabilisation evidence;
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
