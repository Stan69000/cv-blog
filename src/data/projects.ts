import projetsData from './projets.json';
import { fillDurations } from './durations';

export type DatePrecision = 'month' | 'year';
export type ProjectStatus = 'ongoing' | 'completed';

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  type: string;
  name: string;
  featured: boolean;
  startedAt: string;
  endedAt?: string;
  startPrecision?: DatePrecision;
  endPrecision?: DatePrecision;
  status: ProjectStatus;
  url: string | null;
  repoUrl?: string;
  extensionUrl?: string;
  pitch: string;
  role: string;
  results: string[];
  tags: string[];
  story: string[];
  images: string[];
};

export type WorkSection = {
  title: string;
  lead: string;
  stats: Stat[];
  highlights: string[];
  linkLabel?: string;
  linkUrl?: string;
};

// Format stocké dans projets.json. Les champs `context`, `technique` et `impact`
// viennent de l'ancien modèle : ils servent de repli tant qu'un projet n'a pas
// été réécrit depuis l'admin.
type StoredProject = {
  slug?: string;
  type: string;
  name: string;
  draft?: boolean;
  featured?: boolean;
  startedAt: string;
  endedAt?: string;
  startPrecision?: string;
  endPrecision?: string;
  status: string;
  url?: string | null;
  repoUrl?: string;
  extensionUrl?: string;
  screenshot?: string;
  images?: string[];
  pitch?: string;
  role?: string;
  results?: string[];
  story?: string;
  tags?: string[];
  context?: string;
  technique?: string[];
  impact?: string[];
};

type StoredData = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroLead?: string;
  stats?: Stat[];
  featuredTitle?: string;
  sectionTitle?: string;
  work?: WorkSection;
  projects?: StoredProject[];
};

const data = fillDurations(projetsData as StoredData);

export const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const firstSentence = (text = '') => {
  const match = text.match(/^.+?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

const clean = (lines: string[] = []) => lines.map((line) => line.trim()).filter(Boolean);

const toProject = (p: StoredProject): Project => {
  const images = clean(p.images).slice(0, 5);
  const story = p.story ?? [p.context, ...(p.technique ?? [])].filter(Boolean).join('\n\n');

  return {
    slug: p.slug?.trim() || slugify(p.name),
    type: p.type,
    name: p.name,
    featured: p.featured === true,
    startedAt: p.startedAt,
    endedAt: p.endedAt || undefined,
    startPrecision: (p.startPrecision as DatePrecision) ?? 'month',
    endPrecision: (p.endPrecision as DatePrecision) || undefined,
    status: p.status === 'completed' ? 'completed' : 'ongoing',
    url: p.url || null,
    repoUrl: p.repoUrl || undefined,
    extensionUrl: p.extensionUrl || undefined,
    pitch: p.pitch?.trim() || firstSentence(p.context),
    role: p.role?.trim() ?? '',
    results: clean(p.results ?? p.impact?.slice(-2)).slice(0, 4),
    tags: clean(p.tags),
    story: story
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
    images: images.length > 0 ? images : p.screenshot ? [p.screenshot] : [],
  };
};

export const projects: Project[] = (data.projects ?? [])
  .filter((p) => p.draft !== true && p.name?.trim())
  .map(toProject);

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

// Ordre d'affichage global : la une, puis les autres projets, en cours d'abord.
export const projectsOrdered: Project[] = [
  ...featuredProjects,
  ...otherProjects.filter((p) => p.status === 'ongoing'),
  ...otherProjects.filter((p) => p.status === 'completed'),
];

export const projectTypes = [...new Set(projects.map((p) => p.type).filter(Boolean))];

export const hasDetailPage = (project: Project) => project.story.length > 0;

export const projectsPage = {
  heroEyebrow: data.heroEyebrow || 'Projets',
  heroTitle: data.heroTitle || 'Je construis des outils qui simplifient le numérique.',
  heroLead: data.heroLead || '',
  stats: (data.stats ?? []).filter((s) => s.value && s.label),
  featuredTitle: data.featuredTitle || 'À la une',
  sectionTitle: data.sectionTitle || 'Les autres projets',
  work: data.work?.title ? data.work : undefined,
};

const monthYearFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  year: 'numeric',
});

const yearFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
});

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const formatPointInTime = (value: string, precision: DatePrecision = 'month') => {
  const date = new Date(value);
  if (precision === 'year') {
    return yearFormatter.format(date);
  }
  return capitalize(monthYearFormatter.format(date));
};

export const formatProjectDate = (project: Project) => {
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

  return start;
};
