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
  Quizeo: '/images/quizeo.png',
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
    name: 'Quizeo',
    startedAt: '2026-05-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: null,
    context:
      'Les applications de quiz musicaux ou cinéma sont souvent limitées, peu personnalisables ou dépendantes de plateformes externes. De l’autre côté, écouter de la musique hors ligne ou organiser facilement des blind tests entre amis demande souvent de jongler entre plusieurs outils différents.',
    technique: [
      'L’application est développée comme une vraie application desktop avec Tauri et Rust afin de rester légère, rapide et peu gourmande en ressources.',
      'L’interface est construite avec React et TypeScript pour offrir une expérience moderne et fluide.',
      'Le projet s’appuie également sur plusieurs outils et APIs externes pour enrichir les contenus : téléchargement audio, récupération de métadonnées musicales, informations Wikipédia ou données liées aux artistes et œuvres.',
      'L’architecture est pensée pour permettre l’ajout progressif de nouveaux modes de jeu, fonctionnalités multijoueur et enrichissements autour de la musique et du cinéma.'
    ],
    impact: [
      'Quand l’expérience est fragmentée, les soirées, animations ou sessions de jeu deviennent rapidement moins fluides : préparation compliquée, gestion manuelle des musiques, interfaces peu adaptées, manque de personnalisation des parties.',
      'Les utilisateurs veulent surtout une expérience simple, rapide et amusante, sans devoir passer du temps à configurer des outils complexes.',
      'Quizeo cherche à réunir dans une seule application le téléchargement de musique hors ligne et l’organisation de quiz interactifs autour de la musique, du cinéma et des séries.',
      'Le projet permet de créer facilement des parties adaptées à différents niveaux et styles de jeu : blind tests, QCM, chrono, multijoueur ou reconnaissance d’artistes et de titres.',
      'L’objectif est de proposer une expérience plus fluide, plus fun et plus personnalisable pour jouer seul ou à plusieurs.'
    ],
    tags: ['Tauri', 'Rust', 'React', 'TypeScript', 'Desktop app']
  },
  {
    type: 'App macOS',
    name: 'Atelier du Photographe',
    startedAt: '2026-01-01',
    startPrecision: 'year',
    status: 'completed',
    url: null,
    context:
      'Le tri de photos devient rapidement long et répétitif, surtout après une sortie photo avec plusieurs centaines d’images. Les outils existants sont souvent soit trop complexes, soit mal adaptés à des workflows simples et rapides. Beaucoup de photographes finissent par jongler entre plusieurs fenêtres du Finder avec énormément de glisser-déposer.',
    technique: [
      'L’application est développée nativement pour macOS avec SwiftUI afin de proposer une interface fluide et bien intégrée à l’écosystème Apple.',
      'Le tri peut être entièrement piloté au clavier grâce à des raccourcis rapides pour copier, déplacer, réviser ou rejeter les photos.',
      'L’application récupère également automatiquement certaines métadonnées des images (appareil photo, objectif, ISO, ouverture, focale…) afin d’apporter plus de contexte pendant le tri.',
      'L’architecture du projet est pensée pour rester évolutive, avec une gestion sécurisée des accès fichiers et plusieurs modes d’organisation adaptés aux différents workflows photo.'
    ],
    impact: [
      'Quand le tri devient pénible, cela ralentit toute la chaîne : sélection, retouches, publication ou archivage.',
      'Avec le temps, cela peut aussi décourager de traiter certaines séries photo ou faire perdre beaucoup de temps sur des tâches qui devraient rester fluides et naturelles.',
      'Un bon outil de tri permet de rester concentré sur les images plutôt que sur l’organisation des fichiers.',
      'Atelier du Photographe cherche à rendre le tri photo plus rapide, plus confortable et plus visuel.',
      'L’application permet de parcourir rapidement ses images, les classer avec le clavier et les envoyer directement dans les bons dossiers selon son propre workflow.',
      'L’objectif est de simplifier les manipulations répétitives et de rendre l’organisation photo plus fluide au quotidien.'
    ],
    tags: ['SwiftUI', 'macOS', 'MVVM', 'EXIF', 'Photo workflow']
  },
  {
    type: 'Création web',
    name: 'Le Singe du Numérique',
    startedAt: '2026-04-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: 'https://lesingedunumerique.fr/',
    context:
      'Le numérique prend une place énorme dans la vie quotidienne, mais beaucoup de personnes se sentent perdues face aux outils, aux démarches en ligne ou aux risques sur Internet. Les explications sont souvent trop techniques, les ressources dispersées, et les associations locales manquent parfois de temps, de compétences ou de moyens pour gérer correctement leur présence et leurs outils numériques.',
    technique: [
      'Le site a été conçu pour privilégier la clarté, l’accessibilité et la simplicité de navigation.',
      'L’architecture repose sur Astro afin de proposer un site rapide, léger et facile à consulter, y compris sur des connexions ou appareils plus modestes.',
      'Les contenus sont organisés pour rester simples à maintenir et à faire évoluer dans le temps.',
      'Une attention particulière est portée à la lisibilité, à la hiérarchie visuelle et à l’accessibilité numérique afin de rendre les ressources compréhensibles par le plus grand nombre.'
    ],
    impact: [
      'Quand le numérique devient trop compliqué, certaines personnes décrochent complètement : difficulté à accéder à des services essentiels, peur de faire une erreur, isolement numérique, dépendance à d’autres personnes pour des démarches simples.',
      'Pour les associations, cette complexité peut freiner la communication, l’organisation interne et la capacité à aider efficacement leurs publics.',
      'Le projet rend le numérique plus accessible, plus humain et plus compréhensible grâce à des contenus clairs, des ressources pédagogiques et un accompagnement concret.',
      'L’objectif n’est pas seulement d’expliquer la technologie, mais de redonner confiance face au numérique.'
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
    context:
      'Avec le temps, certains sites accumulent beaucoup de contenus, de pages et d’informations, ce qui peut rendre la navigation plus confuse pour les visiteurs. Même avec un contenu de qualité, il devient parfois difficile de comprendre rapidement l’activité, les accompagnements proposés ou les informations importantes.',
    technique: [
      'Le travail de refonte repose principalement sur une réorganisation de l’arborescence et du parcours utilisateur afin de réduire les points de friction dans la navigation.',
      'L’interface a été allégée pour améliorer la hiérarchie visuelle et faciliter la lecture sur l’ensemble des pages.',
      'Une attention particulière a également été portée au responsive design afin de conserver une expérience cohérente aussi bien sur mobile que sur ordinateur.',
      'L’ensemble du site est pensé pour rester simple à faire évoluer et à maintenir dans le temps.'
    ],
    impact: [
      'Quand un site manque de clarté, les visiteurs peuvent se sentir perdus, ne pas trouver facilement les informations recherchées ou abandonner leur navigation trop tôt.',
      'Sur des sujets liés au bien-être et à l’accompagnement, une expérience trop chargée ou peu lisible peut aussi créer de la distance alors que le site devrait au contraire rassurer et guider naturellement.',
      'La refonte de Natur\' Au Féminin cherche à rendre le site plus fluide, plus clair et plus agréable à parcourir, tout en conservant son identité et son univers d’origine.',
      'L’objectif est d’aider les visiteurs à mieux comprendre les contenus, les accompagnements proposés et à naviguer plus facilement entre les différentes sections du site.',
      'Le projet privilégie une approche plus apaisée et plus lisible afin de recentrer l’expérience sur les contenus et les besoins des visiteurs.'
    ],
    tags: ['Refonte', 'UX', 'UI']
  },
  {
    type: 'Création web',
    name: 'stan-bouchet.eu',
    startedAt: '2026-04-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: 'https://stan-bouchet.eu/',
    context:
      'La plupart des plateformes photo imposent leurs propres règles : interfaces chargées, compression des images, publicités, algorithmes ou organisation peu adaptée aux vrais besoins des photographes. Avec le temps, publier ses photos peut devenir plus frustrant que créatif.',
    technique: [
      'Le site repose sur une architecture moderne orientée performance et simplicité.',
      'La galerie est construite avec Astro afin de proposer des pages rapides et légères, même avec beaucoup de photos.',
      'L’administration est développée sur mesure en Node.js pour correspondre exactement à mes besoins de publication et d’organisation.',
      'L’ensemble est pensé pour rester facilement maintenable, évolutif et indépendant des plateformes propriétaires, tout en gardant une expérience fluide sur ordinateur comme sur mobile.'
    ],
    impact: [
      'Quand l’outil prend plus de place que les images elles-mêmes, l’expérience perd en simplicité et en personnalité.',
      'Les photos sont noyées dans des interfaces complexes ou standardisées, et il devient difficile de construire un espace qui reflète réellement son regard, son style et sa manière de travailler.',
      'stan-bouchet.eu cherche à proposer une galerie photo simple, personnelle et centrée sur l’essentiel : les images.',
      'Le projet permet de publier, organiser et faire évoluer les contenus librement, avec une expérience pensée autour de la photographie plutôt qu’autour des contraintes des plateformes classiques.',
      'L’objectif est de créer un espace plus calme, plus cohérent et plus fidèle à ma pratique photo.'
    ],
    tags: ['Galerie', 'Admin sur mesure', 'Design minimal']
  },
  {
    type: 'Création web',
    name: 'stan-bouchet.com',
    startedAt: '2026-04-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: 'https://stan-bouchet.com/',
    context:
      'Quand on travaille sur beaucoup de sujets différents, les informations finissent souvent dispersées : projets, expériences, engagements, contenus ou réalisations sont répartis entre plusieurs plateformes et deviennent difficiles à suivre. Les sites personnels ressemblent aussi souvent à de simples CV techniques, sans réellement montrer la vision, les valeurs ou les projets derrière le parcours.',
    technique: [
      'Le site repose sur une architecture modulaire pensée pour évoluer facilement avec le temps.',
      'Les différentes sections utilisent des composants réutilisables afin de garder une cohérence visuelle et simplifier l’ajout de nouveaux contenus ou nouvelles pages.',
      'L’organisation par univers permet de structurer progressivement le site sans devoir revoir toute la navigation à chaque évolution.',
      'L’ensemble privilégie une maintenance simple, de bonnes performances et une expérience fluide sur ordinateur comme sur mobile.'
    ],
    impact: [
      'Quand tout est dispersé ou présenté de manière trop technique, il devient compliqué pour les visiteurs de comprendre rapidement qui l’on est, ce que l’on construit et ce qui relie les différents projets entre eux.',
      'Cela peut rendre le parcours moins lisible et faire perdre la cohérence globale de l’ensemble.',
      'stan-bouchet.com sert de point central pour regrouper mon parcours, mes projets, mes engagements associatifs et mes contenus dans un seul espace cohérent.',
      'Le site cherche à proposer une lecture plus humaine et plus claire de mon univers, avec une organisation pensée pour permettre aux visiteurs de naviguer facilement entre les différents sujets sans se perdre.',
      'L’objectif est de construire un espace évolutif capable d’accueillir de nouveaux projets et contenus au fil du temps sans perdre en simplicité.'
    ],
    tags: ['Hub personnel', 'Astro', 'Design system léger']
  },
  {
    type: 'Open source',
    name: 'astro-a11y',
    startedAt: '2026-04-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: 'https://stan69000.github.io/astro-a11y',
    context:
      'L’accessibilité numérique est souvent traitée trop tard dans les projets web, parfois juste avant une mise en ligne ou un audit. Résultat : les problèmes deviennent plus compliqués, plus coûteux et plus longs à corriger. De nombreux outils existants produisent aussi des rapports très techniques, difficiles à comprendre pour les équipes.',
    technique: [
      'Le toolkit s’intègre directement dans les projets Astro afin d’automatiser les vérifications d’accessibilité pendant le développement ou lors de la génération du site.',
      'Les analyses s’appuient sur Playwright et axe pour scanner les pages rendues automatiquement et produire des rapports exploitables dans plusieurs formats : terminal, HTML, JSON ou Markdown.',
      'L’outil enrichit aussi les résultats avec des recommandations plus lisibles et orientées action afin d’aider les développeurs à corriger plus rapidement les problèmes détectés.'
    ],
    impact: [
      'Un site peu accessible peut empêcher certaines personnes de naviguer correctement : lecteurs d’écran, navigation clavier, contrastes insuffisants ou contenus difficiles à comprendre.',
      'Au-delà de l’aspect réglementaire, cela crée surtout une exclusion numérique invisible pour une partie des utilisateurs.',
      'Quand les problèmes sont détectés tôt et expliqués clairement, ils sont beaucoup plus simples à corriger.',
      'Astro-a11y cherche à rendre les contrôles d’accessibilité plus simples, plus rapides et plus intégrés au développement quotidien.',
      'Le projet aide les équipes à identifier automatiquement les problèmes les plus courants et à comprendre concrètement comment les corriger, sans attendre un audit complet en fin de projet.',
      'L’objectif est de rendre l’accessibilité plus naturelle dans les workflows de développement plutôt qu’une contrainte ajoutée à la dernière minute.'
    ],
    tags: ['Astro', 'Accessibilité', 'Playwright', 'axe', 'RGAA/WCAG']
  },
  {
    type: 'Open source',
    name: 'RGAA Audit',
    startedAt: '2026-04-01',
    startPrecision: 'month',
    status: 'ongoing',
    url: 'https://stan69000.github.io/rgaa-audit/',
    extensionUrl:
      'https://chromewebstore.google.com/detail/rgaa-audit/aiaiblaemmjcfeeobpjagdajbgbcabai?authuser=2&hl=fr',
    context:
      'Les audits d’accessibilité RGAA peuvent rapidement devenir complexes, longs et difficiles à prendre en main, surtout pour les équipes qui débutent sur le sujet. Les outils existants sont souvent très techniques, chargés ou peu adaptés à une utilisation concrète au quotidien.',
    technique: [
      'L’outil repose sur une interface légère pensée pour aller directement à l’essentiel pendant les audits.',
      'Les critères RGAA sont organisés de manière claire afin d’accélérer les vérifications et faciliter le suivi des points à corriger.',
      'Une extension Chrome permet également de lancer rapidement certaines vérifications directement depuis le navigateur pendant les phases de test.',
      'Le projet est développé en open source afin de pouvoir évoluer facilement avec les besoins des équipes et les évolutions des référentiels d’accessibilité.'
    ],
    impact: [
      'Quand l’accessibilité paraît trop compliquée, beaucoup de projets repoussent les audits ou les réalisent trop tard.',
      'Cela peut entraîner des sites moins accessibles pour les utilisateurs concernés, mais aussi ralentir les équipes qui ont du mal à prioriser et comprendre les vérifications à effectuer.',
      'Simplifier les audits permet de rendre l’accessibilité plus concrète et plus facile à intégrer dans les projets web.',
      'RGAA Audit cherche à rendre les audits d’accessibilité plus simples, plus opérationnels et plus accessibles aux équipes terrain.',
      'Le projet aide à lancer rapidement des vérifications, suivre les critères importants et structurer les contrôles sans devoir naviguer dans des interfaces complexes.',
      'L’objectif est de faciliter le passage à l’action et de rendre les audits plus fluides au quotidien.'
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
    context:
      'Quand une association grandit, les échanges et les documents finissent souvent dispersés entre plusieurs outils, comptes personnels ou espaces mal organisés. Cela peut rapidement créer de la confusion : fichiers introuvables, accès partagés de manière informelle, perte d’informations ou difficultés à collaborer efficacement.',
    technique: [
      'Le projet repose sur la mise en place de Google Workspace avec une organisation structurée des comptes, des groupes et des espaces partagés.',
      'Les accès et permissions ont été pensés pour simplifier la collaboration tout en gardant une gestion claire des droits.',
      'Un travail d’accompagnement et de définition des usages a également été réalisé afin de faciliter la prise en main et limiter les problèmes d’organisation à long terme.',
      'L’ensemble est conçu pour offrir une base simple, évolutive et adaptée au fonctionnement quotidien d’une association.'
    ],
    impact: [
      'Une organisation numérique mal structurée peut ralentir le fonctionnement quotidien et compliquer le travail des bénévoles ou des équipes.',
      'Avec le temps, cela augmente aussi les risques de perte de données, d’erreurs de partage ou de dépendance à une seule personne qui centralise tout.',
      'Mettre en place des outils clairs et partagés permet de rendre l’organisation plus fluide et plus durable.',
      'Le projet vise à fournir un cadre numérique plus simple, plus organisé et plus fiable pour les activités de l’association RVAz.',
      'L’objectif est de faciliter le travail collectif, centraliser les ressources importantes et permettre aux membres de collaborer plus sereinement au quotidien.',
      'Le déploiement cherche aussi à accompagner l’adoption des outils afin qu’ils restent accessibles et faciles à utiliser pour tous les profils.'
    ],
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
