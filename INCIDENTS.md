# Incidents

## 2026-05-24 — Sitemap avec URLs `example.com`

**Symptôme** : `https://stan-bouchet.com/sitemap.xml` retournait un sitemap avec des URLs `https://example.com/` au lieu de `https://stan-bouchet.com/`.

**Cause** : Un fichier `src/pages/sitemap.xml.ts` manuel utilisait `siteConfig.url` comme base, dont la valeur était `example.com`. Ce fichier avait été commité dans `dist/` et le serveur FTP conservait l'ancien fichier faute de purge (`dangerous-clean-slate: false`).

**Résolution** :
1. Installation de `@astrojs/sitemap` pour remplacer le sitemap manuel
2. Suppression de `src/pages/sitemap.xml.ts`
3. Correction de l'URL par défaut (`stan-bouchet.eu` → `stan-bouchet.com`) dans `astro.config.mjs`
4. Ajout d'une étape dans le workflow GitHub Actions pour supprimer les fichiers legacy du serveur FTP avant chaque déploiement
5. Mise à jour de `robots.txt` pour pointer vers `sitemap-index.xml`

**Durée** : découvert et résolu le même jour.
