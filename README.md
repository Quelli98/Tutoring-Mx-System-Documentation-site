# Tutor MX documentation site

Wiki-style public documentation for the Tutor MX System. It reflects the 23 August 2026 integrated workflow: Gitea main as source of truth, automatic Auth0 role/Profile onboarding, registered-Tutor organiser management, the current npm run check/local verification process, Sprint 2–4 carry-forward rules, GitHub deployment mirror and manual Cloudflare Production deployment.

## Run locally

```bash
npm install
npm run dev
```

## Publish

1. Replace the existing documentation repository contents with these files.
2. Commit and push them to `main`.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
4. Open the **Actions** tab and wait for **Deploy documentation to GitHub Pages** to pass.
5. Refresh the existing public documentation URL.

The repository name and Vite base path are configured for `Tutoring-Mx-System-Documentation-site`.

## AI declaration

ChatGPT [GPT-5.6 Sol] was used on 23 August 2026 to update the Sprint handbook alignment, testing/local-verification guidance, Auth0 onboarding documentation, deployment instructions and documentation website implementation. The Tutor MX team must review the result against the project brief and current repository before submission.
