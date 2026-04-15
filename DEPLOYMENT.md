# Deployment Setup

## 1) Admin URL (Keystatic)

Set this GitHub repository variable:

- `PUBLIC_ADMIN_URL`: your Netlify admin URL (example: `https://your-admin.netlify.app/keystatic`)

This value is injected at build time and used by the "Administration" links in the site.

## 2) FTP secrets (O2Switch)

Set these GitHub repository secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT` (usually `21`)
- `FTP_SERVER_DIR` (example: `/www/`)

## 3) Automatic deployment

The workflow file `.github/workflows/deploy-o2switch.yml` deploys automatically:

- on each push to `main`
- or manually via GitHub Actions (`workflow_dispatch`)

Build command used:

- `npm run build:o2switch`
