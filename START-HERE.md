# Open and publish the final documentation website

1. Extract this ZIP.
2. Open `Tutoring-Mx-System-Documentation-site-main` in VS Code.
3. In the terminal, run:

```powershell
npm ci
npm run build
npm run validate
npm run dev
```

4. Open the Vite URL printed in the terminal. Review Overview, Sprint 4 final, Milestone 4, API, Database, Testing, Deployment, Student scheduling and UML diagrams.
5. To update the existing public site, copy/merge this project's contents into your **documentation Git checkout**, preserving its `.git` folder and any unrelated local work. Do not copy into the Tutor MX application checkout.
6. Inspect and publish from that documentation checkout:

```powershell
git status
git branch --show-current
git diff --stat
npm ci
npm run build
npm run validate
git add README.md START-HERE.md VERIFICATION.md index.html package.json package-lock.json src content scripts public verification
git diff --cached --check
git commit -m "docs: add final Sprint 4 implementation and release evidence"
git push origin main
```

These commands assume your documentation checkout is already on the intended `main`. Review your local work before switching or committing. Add the truthful course-required `Assisted-by` trailer for the actual tool/model used.

The existing Pages workflow publishes the built site after the push. This archive itself has not been pushed or deployed. Your application backend/frontend and Neon schema are separate from this documentation deployment.

The complete updated handbook is included at `public/documents/tutor-mx-handbook-30-september-2026.pdf`. Current chapters are editable Markdown in `content/`.
