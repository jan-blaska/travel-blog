export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://janukutravel.com').replace(/\/$/, '');
export const SITE_NAME = 'Jan Uku Travel';

export const locales = ['en', 'cs', 'de'] as const;
export type Locale = (typeof locales)[number];

const descriptions: Record<Locale, string> = {
  en: 'Travel diaries, adventures and travel tips by Uku Jan.',
  cs: 'Cestovní deníky, dobrodružství a tipy na cestování od Uku Jan.',
  de: 'Reisetagebücher, Abenteuer und Reisetipps von Uku Jan.',
};

export function siteDescription(locale: string): string {
  return descriptions[(locale as Locale)] ?? descriptions.en;
}

export function buildAlternates(path: string, availableLocales: string[] = [...locales]) {
  const languages: Record<string, string> = { 'x-default': `${SITE_URL}/en${path}` };
  for (const locale of availableLocales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return languages;
}

export function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

// Converts "DD.MM.YYYY" → "YYYY-MM-DD"
export function parseArticleDate(dateStr: string): string | undefined {
  const parts = dateStr.split('.');
  if (parts.length !== 3) return undefined;
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
