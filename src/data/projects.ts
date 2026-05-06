export type DatePrecision = 'month' | 'year';
export type ProjectStatus = 'ongoing' | 'completed';

export type FeaturedProject = {
  type: string;
  name: string;
  startedAt: string;
  endedAt?: string;
  startPrecision?: DatePrecision;
  endPrecision?: DatePrecision;
  status: ProjectStatus;
  url: string | null;
  extensionUrl?: string;
  context: string;
  technique: string[];
  impact: string[];
  tags: string[];
  screenshot?: string;
};

const projectScreenshotsByName: Record<string, string> = {
  'Atelier du Photographe': '/images/projects/photo-triage.jpg',
  'Le Singe du Numérique': '/images/projects/le-singe-du-numerique.jpg',
  "Natur' Au Féminin": '/images/projects/natur-au-feminin.jpg',
  'stan-bouchet.eu': '/images/projects/stan-bouchet-eu.jpg',
  'stan-bouchet.com': '/images/projects/stan-bouchet-com.jpg',
  'astro-a11y': '/images/projects/astro-a11y.jpg',
  'RGAA Audit': '/images/projects/rgaa-audit.jpg',
  'Mise en place de Google Workspace (RVAz)': '/images/projects/google-workspace-rvaz.jpg'
};

export const getProjectScreenshot = (project: FeaturedProject): string | undefined =>
  project.screenshot ?? projectScreenshotsByName[project.name];

export const featuredProjects: FeaturedProject[] = [
  {
    type: 'App macOS',
    name: 'Atelier du Photographe',
    startedAt: '2026-01-01',
    startPrecision: 'year',
    status: 'completed',
    url: null,
    context:
      'Application macOS native de tri de photos. Ma première app macOS fonctionnelle, et jolie !',
    technique: [
      'Interface SwiftUI avec shortcuts clavier (1-5) pour déplacer/copier vos photos vers 3 dossiers + révision + rejet.',
      'Gestion des métadonnées EXIF via mdls (Canon EOS 90D, objectif, ISO, ouverture, vitesse, focale).',
      'Modes copier/déplacer avec gestion des collisions.',
      'Architecture MVVM avec security-scoped bookmarks.',
      'Thème clair, sombre, auto.',
      'Réglage possible des paramètres depuis l\'app.',
      'Code source : github.com/Stan69000/app-triage-photo (repo privé pour le moment).'
    ],
    impact: [
      'Tri rapide de lots photos directement dans les dossiers. Possibilité de copier ou déplacer les photos dans 2 dossiers (exemple : ma galerie photo + mon asso RVAz).',
      'Gain de temps significatif.',
      'Bien plus visuel que de glisser-déposer dans des dossiers depuis le Finder.'
    ],
    tags: ['SwiftUI', 'macOS', 'MVVM', 'EXIF', 'Photo workflow']
  },
  {
    type: 'Création web',
    name: 'Le Singe du Numérique',
    startedAt: '2026-04-01',
    startPrecision: 'year',
    status: 'ongoing',
    url: 'https://lesingedunumerique.fr/',
    context:
      'Le Singe Du Numérique agit pour la démocratisation et l\'inclusion numérique, et accompagne aussi les associations locales dans leurs usages, leurs outils et leur transformation numérique. J\'en suis le président fondateur, avec mon fils.',
    technique: [
      'Architecture éditoriale pensée pour expliquer clairement la mission, les actions et les ressources.',
      'Navigation simplifiée pour accéder rapidement aux contenus utiles de l\'association.',
      'Mise en page orientée lisibilité, avec une hiérarchie visuelle stable page après page.'
    ],
    impact: [
      'Message associatif plus lisible dès la première visite.',
      'Accès plus direct aux contenus et initiatives de l\'association.'
    ],
    tags: ['Astro', 'TypeScript', 'Contenu éditorial']
  },
  {
    type: 'Refonte web',
    name: "Natur' Au Féminin",
    startedAt: '2026-02-01',
    startPrecision: 'month',
    status: 'completed',
    url: 'https://naturaufeminin.fr/',
    context: 'Refonte d\'un site existant, avec l\'objectif de clarifier le message sans perdre l\'identité initiale.',
    technique: [
      'Reprise de l\'arborescence et du parcours pour réduire les points de friction.',
      'Allègement de l\'interface afin de mieux guider la lecture.',
      'Travail responsive pour garder une expérience homogène sur mobile et desktop.'
    ],
    impact: ['Parcours plus fluide.', 'Contenu plus compréhensible et mieux hiérarchisé.'],
    tags: ['Refonte', 'UX', 'UI']
  },
  {
    type: 'Création web',
    name: 'stan-bouchet.eu',
    startedAt: '2026-04-01',
    startPrecision: 'year',
    status: 'ongoing',
    url: 'https://stan-bouchet.eu/',
    context:
      'Galerie photo personnelle construite pour exprimer ma passion pour la photo et trouver une forme visuelle qui me ressemble vraiment.',
    technique: [
      'Direction visuelle épurée pour laisser les photos au centre de l\'expérience.',
      'Admin totalement sur mesure, aligné avec mes besoins réels de publication et d\'organisation.',
      'Structure de contenu pensée pour faire évoluer la galerie sans complexité inutile.'
    ],
    impact: [
      'Autonomie complète sur la gestion du contenu.',
      'Flux de publication cohérent avec ma pratique photo.'
    ],
    tags: ['Galerie', 'Admin sur mesure', 'Design minimal']
  },
  {
    type: 'Création web',
    name: 'stan-bouchet.com',
    startedAt: '2026-04-01',
    startPrecision: 'year',
    status: 'ongoing',
    url: 'https://stan-bouchet.com/',
    context: 'Site principal conçu comme un hub éditorial pour centraliser mon parcours, mes projets, mes engagements et le blog.',
    technique: [
      'Organisation par univers pour garder une navigation stable malgré l\'ajout de nouveaux contenus.',
      'Composants réutilisables et design system léger pour maintenir la cohérence.',
      'Structure pensée pour rester simple à maintenir dans le temps.'
    ],
    impact: ['Ajout de pages plus rapide.', 'Lecture globale du profil plus claire.'],
    tags: ['Hub personnel', 'Astro', 'Design system léger']
  },
  {
    type: 'Open source',
    name: 'astro-a11y',
    startedAt: '2026-04-01',
    startPrecision: 'year',
    status: 'ongoing',
    url: 'https://stan69000.github.io/astro-a11y',
    context:
      'Toolkit Astro-first d\'accessibilité pour scanner des pages avec Playwright + axe et produire des rapports actionnables orientés RGAA/WCAG.',
    technique: [
      'Exécution en CLI ou en fin de build Astro via une intégration dédiée.',
      'Analyse automatisée des pages rendues avec enrichissement des résultats pour faciliter la correction.',
      'Formats de sortie terminal, JSON, HTML et Markdown pour s\'adapter aux workflows projet (code source : github.com/Stan69000/astro-a11y).'
    ],
    impact: [
      'Détection plus précoce des problèmes d\'accessibilité sur les projets Astro.',
      'Passage à l\'action plus rapide grâce à des recommandations concrètes et lisibles.'
    ],
    tags: ['Astro', 'Accessibilité', 'Playwright', 'axe', 'RGAA/WCAG']
  },
  {
    type: 'Open source',
    name: 'RGAA Audit',
    startedAt: '2026-04-01',
    startPrecision: 'year',
    status: 'ongoing',
    url: 'https://stan69000.github.io/rgaa-audit/',
    extensionUrl:
      'https://chromewebstore.google.com/detail/rgaa-audit/aiaiblaemmjcfeeobpjagdajbgbcabai?authuser=2&hl=fr',
    context: 'Outil open source pour rendre les audits RGAA plus opérationnels et plus faciles à démarrer.',
    technique: [
      'Interface orientée usage terrain, sans surcharge.',
      'Critères présentés de manière exploitable pour accélérer les vérifications.',
      'Logique de restitution construite pour faciliter les itérations d\'accessibilité.'
    ],
    impact: [
      'Démarrage d\'audit plus rapide.',
      'Extension Chrome publiée sur le Chrome Web Store pour lancer les vérifications directement dans le navigateur.'
    ],
    tags: ['Accessibilité', 'RGAA', 'Extension Chrome']
  },
  {
    type: 'Déploiement IT',
    name: 'Mise en place de Google Workspace (RVAz)',
    startedAt: '2025-01-01',
    endedAt: '2025-12-01',
    startPrecision: 'year',
    endPrecision: 'year',
    status: 'completed',
    url: null,
    context: 'Déploiement Google Workspace pour structurer les usages numériques de l\'association RVAz.',
    technique: [
      'Configuration des comptes, des groupes et des droits d\'accès.',
      'Organisation des espaces partagés pour fluidifier le travail collectif.',
      'Cadre d\'usage et accompagnement pour sécuriser l\'adoption.'
    ],
    impact: ['Collaboration quotidienne plus fiable.', 'Réduction des frictions dans l\'organisation interne.'],
    tags: ['Google Workspace', 'Gouvernance', 'Conduite du changement']
  }
];

export const featuredProjectsOrdered: FeaturedProject[] = [
  ...featuredProjects.filter((project) => project.status === 'ongoing'),
  ...featuredProjects.filter((project) => project.status === 'completed')
];

const monthYearFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  year: 'numeric'
});

const yearFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric'
});

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const formatPointInTime = (value: string, precision: DatePrecision = 'month') => {
  const date = new Date(value);
  if (precision === 'year') {
    return yearFormatter.format(date);
  }

  return capitalize(monthYearFormatter.format(date));
};

export const formatProjectDate = (project: FeaturedProject) => {
  const start = formatPointInTime(project.startedAt, project.startPrecision);

  if (project.endedAt) {
    const end = formatPointInTime(project.endedAt, project.endPrecision ?? project.startPrecision);

    if (
      (project.startPrecision ?? 'month') === 'year' &&
      (project.endPrecision ?? 'year') === 'year' &&
      start === end
    ) {
      return start;
    }

    return `${start} - ${end}`;
  }

  if (project.status === 'ongoing') {
    return start;
  }

  return start;
};
