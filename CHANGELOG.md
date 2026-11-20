# Changelog

## 2026-11-20

### Ajouté
- Mesure d'audience sur toutes les pages : visiteurs, pages vues, provenance et appareils, lisibles depuis l'administration.
- Sans cookie, sans donnée personnelle et sans service tiers : un visiteur est reconnu une journée au plus par une empreinte anonyme renouvelée chaque nuit, et les empreintes de la veille sont supprimées.
- Pour ne pas compter ses propres visites : clé `cvblog-no-stats` dans le stockage local du navigateur.

## 2026-06-14

### Modifié
- `astro` : mise à jour 5.18.1 → 5.18.2 (patch sécurité — XSS `define:vars` GHSA-j687-52p2-xcff, non exploitable dans ce projet faute d'usage du feature)

## 2026-05-24

### Ajouté
- `@astrojs/sitemap` : génération automatique du sitemap à chaque build
- `sitemap-index.xml` et `sitemap-0.xml` déployés sur stan-bouchet.com
- Étape de nettoyage dans le workflow GitHub Actions pour supprimer les fichiers legacy du serveur FTP
- `README.md` — documentation du projet

### Modifié
- URL par défaut du site corrigée : `stan-bouchet.eu` → `stan-bouchet.com`
- `robots.txt` : référence mise à jour vers `sitemap-index.xml`

### Supprimé
- `src/pages/sitemap.xml.ts` : sitemap manuel remplacé par `@astrojs/sitemap`
