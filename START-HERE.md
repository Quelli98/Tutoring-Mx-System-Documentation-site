# Use the final documentation code

This ZIP already contains the member's patch and the final audit changes. **Do not apply the patch again.** It is the complete documentation project, not a partial update.

## Preview

1. Extract the ZIP and open the folder containing `package.json` in VS Code.
2. Use Node.js 24 and run:

```powershell
npm ci
npm run validate
npm run build
npm run dev
```

3. Open the URL Vite prints. Review the homepage, Requirements, Final submission rubric, Reports and presentation, API, Database, Bug tracker and Testing pages. Try search and a narrow window.

## Update your existing documentation repository

Use your existing **Tutor-MX-Documentation-GitHub** checkout. Preserve its `.git` directory and any unrelated work. Copy/merge the project contents, including `.gitattributes`, `.github/workflows/pages.yml`, `src`, `content`, `scripts` and `public`. Do not copy `node_modules` or `dist`. This is separate from the application/Gitea repository.

In that documentation checkout, run each step and stop if it fails:

```powershell
git status
git branch --show-current
git diff --stat
npm ci
npm run validate
npm run build
```

Review the changed files. If the checkout is on the intended `main`, stage only the documentation update:

```powershell
git add README.md START-HERE.md VERIFICATION.md FINAL_REVIEW.md index.html package.json package-lock.json .gitattributes .github/workflows/pages.yml src content scripts public
git diff --cached --check
git diff --cached --stat
git commit -m "docs: merge final evidence and complete rubric audit"
git push origin main
```

Do not force-push or overwrite unrelated staged work. The GitHub Pages workflow will run validation, build and deploy after the push. Wait for the workflow to finish before checking:

https://quelli98.github.io/Tutoring-Mx-System-Documentation-site/

The archive has not already been deployed. Check **FINAL_REVIEW.md** for the application limitations that documentation changes cannot resolve.
