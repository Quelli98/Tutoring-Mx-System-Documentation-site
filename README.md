# Tutor Mx documentation site

Static, editable-in-browser documentation for GitHub Pages. Open `index.html` locally or serve the folder with any static web server.

## Publishing an edit

1. Open the public site and add meeting, planning and rubric records.
2. Select **Export site data**.
3. Replace `data/site-data.json` with the downloaded file.
4. If a new PDF was added, copy it into `documents/` and use `documents/filename.pdf` as its link.
5. Commit the change on a short documentation branch and open a pull request.
6. After merge to `main`, the included workflow deploys the site to GitHub Pages.

Browser edits are drafts. GitHub Pages is static and cannot write directly to the repository.

The prefilled evidence log includes the four-sprint/six-role allocation method, pre-sprint role polls, protected Git branch flow, local testing and Codecov/CI decisions, the React–Express–Neon architecture decision, and the PostgreSQL/Express comparison. The supporting PDFs remain accessible under `documents/`, and AI-assisted material is labelled with its verification requirements.

## AI declaration

Initial site structure and copy were generated with assistance from Codex (GPT-5) for code and editing. The Tutor Mx group must verify the content and preserve the course-required AI attribution in commits and repository declarations.
