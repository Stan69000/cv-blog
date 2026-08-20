# Deployment Setup

## 1) Administration

Content is managed from the central administration interface:

- `https://admin.stan-bouchet.fr/dashboard`

The administration service commits content changes to this repository. It is not hosted with this Astro site.

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
