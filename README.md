# stan-bouchet.com

CV et blog personnel de Stan Bouchet — construit avec [Astro](https://astro.build).

## Stack

- **Astro 7** — framework statique
- **React** — composants interactifs
- **TypeScript**

## Architecture de déploiement

Le site est généré entièrement en statique puis déployé sur O2Switch via FTP.
L'administration des contenus est centralisée sur [admin.stan-bouchet.fr](https://admin.stan-bouchet.fr/dashboard), qui synchronise ses modifications dans ce dépôt.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour la configuration complète des secrets FTP.

Tout push sur `main` déclenche automatiquement le déploiement O2Switch via GitHub Actions.

## Publication du blog

Le réglage **Général → Publier le blog** dans l'administration centrale contrôle toute la section Blog.
Lorsqu'il est désactivé, les liens, les pages et les entrées du sitemap sont retirés du site public au prochain déploiement. Les articles restent conservés dans le dépôt et réapparaissent à l'identique lorsque le réglage est réactivé.

## Sitemap

Généré automatiquement par `@astrojs/sitemap` à chaque build.

- Index : https://stan-bouchet.com/sitemap-index.xml
- Référencé dans `public/robots.txt`
