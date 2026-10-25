// Durées calculées au build : `{{ans:2005-04}}` devient « 21 ans » (ou « 1 an »).
// Le mois est facultatif : `{{ans:2000}}` compte depuis janvier 2000.

const TOKEN = /\{\{\s*ans\s*:\s*(\d{4})(?:-(\d{1,2}))?\s*\}\}/g;

export const yearsSince = (year: number, month = 1, now = new Date()) => {
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
};

export const formatYears = (years: number) => `${years} an${years > 1 ? 's' : ''}`;

export const fillDurationText = (text: string, now = new Date()) =>
  text.replace(TOKEN, (_, year: string, month?: string) =>
    formatYears(yearsSince(Number(year), month ? Number(month) : 1, now)),
  );

// Applique le remplacement à toutes les chaînes d'un objet JSON (réglages de l'admin).
export const fillDurations = <T>(value: T, now = new Date()): T => {
  if (typeof value === 'string') return fillDurationText(value, now) as T;
  if (Array.isArray(value)) return value.map((item) => fillDurations(item, now)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, fillDurations(item, now)]),
    ) as T;
  }
  return value;
};
