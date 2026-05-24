# stan-bouchet.com

CV et blog personnel de Stan Bouchet — construit avec [Astro](https://astro.build) et [Keystatic](https://keystatic.com).

## Stack

- **Astro 5** — framework statique/hybride
- **Keystatic** — CMS headless (admin sur Netlify, build statique sur O2Switch)
- **React** — composants interactifs
- **TypeScript**

## Architecture de déploiement

Deux environnements distincts :

| Environnement | URL | Usage |
|---|---|---|
| O2Switch (static) | https://stan-bouchet.com | Site public |
| Netlify (SSR) | https://stan-bouchet.eu | Admin Keystatic |

Le build O2Switch (`DEPLOY_TARGET=o2switch`) génère un site entièrement statique déployé via FTP. Le build Netlify expose l'interface d'administration Keystatic en mode SSR.

## Développement local

```bash
npm install
npm run dev
```

L'admin Keystatic est accessible à `http://localhost:4321/keystatic`.

## Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour la configuration complète (secrets FTP, variables Netlify, etc.).

Tout push sur `main` déclenche automatiquement le déploiement O2Switch via GitHub Actions.

## Sitemap

Généré automatiquement par `@astrojs/sitemap` à chaque build.

- Index : https://stan-bouchet.com/sitemap-index.xml
- Référencé dans `public/robots.txt`
