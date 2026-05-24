import projetsData from './projets.json';

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

export const getProjectScreenshot = (project: FeaturedProject): string | undefined =>
  project.screenshot || undefined;

export const featuredProjects: FeaturedProject[] = projetsData.projects.map((p) => ({
  ...p,
  url: p.url ?? null,
  extensionUrl: p.extensionUrl || undefined,
  screenshot: p.screenshot || undefined,
  endedAt: (p as { endedAt?: string }).endedAt || undefined,
  startPrecision: (p.startPrecision as DatePrecision) ?? 'month',
  endPrecision: ((p as { endPrecision?: string }).endPrecision as DatePrecision) ?? undefined,
  status: p.status as ProjectStatus,
}));

export const featuredProjectsOrdered: FeaturedProject[] = [
  ...featuredProjects.filter((p) => p.status === 'ongoing'),
  ...featuredProjects.filter((p) => p.status === 'completed'),
];

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

  return start;
};
