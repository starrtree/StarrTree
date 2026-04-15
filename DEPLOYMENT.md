# Deployment Runbook (GitHub Pages)

This repo is now configured with a GitHub Actions workflow that deploys the site to GitHub Pages on push.

## What I already set up

- Added `.github/workflows/deploy-pages.yml` to deploy the static site from this repo.
- Workflow runs on pushes to `main`, `master`, or `work`, and can also be triggered manually from the Actions tab.

## What you must do (one-time GitHub settings)

1. **Push this repo to GitHub** (if not already connected).
2. Open **Settings → Pages** for the repo.
3. Under **Build and deployment**, set **Source = GitHub Actions**.
4. (If using a custom domain) ensure `CNAME` in repo matches your domain.
5. In your DNS provider:
   - `www` CNAME → `<your-github-username>.github.io`
   - apex/root A records → GitHub Pages IPs (or use ALIAS/ANAME if provider supports it)
6. Wait for the workflow to finish and verify the Pages URL loads.

## Day-to-day deploy flow

1. Commit changes.
2. Push to `main` (recommended) or `work`.
3. Watch **Actions → Deploy static site to GitHub Pages**.
4. Confirm published URL.

## Quick troubleshooting

- If workflow is green but site doesn’t update:
  - hard refresh browser / clear cache.
  - confirm Pages source is **GitHub Actions**.
- If custom domain fails:
  - verify DNS propagation (can take minutes to 48 hours).
  - confirm `CNAME` file is present and exact.
