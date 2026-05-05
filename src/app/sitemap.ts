import type { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { SITE_URL } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: `${SITE_URL}/${locale}`, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${SITE_URL}/${locale}/adventures`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${SITE_URL}/${locale}/about`, changeFrequency: 'monthly', priority: 0.6 },
    );
  }

  const contentDir = path.join(process.cwd(), 'src', 'content');
  const localeEntries = await fs.readdir(contentDir, { withFileTypes: true });

  for (const localeEntry of localeEntries.filter(e => e.isDirectory())) {
    const locale = localeEntry.name;
    const continents = await fs.readdir(path.join(contentDir, locale), { withFileTypes: true });

    for (const continentEntry of continents.filter(e => e.isDirectory())) {
      const continent = continentEntry.name;
      const countries = await fs.readdir(path.join(contentDir, locale, continent), { withFileTypes: true });

      for (const countryEntry of countries.filter(e => e.isDirectory())) {
        const country = countryEntry.name;
        const files = await fs.readdir(
          path.join(contentDir, locale, continent, country),
          { withFileTypes: true }
        );

        if (files.some(f => f.name === 'index.mdx')) {
          entries.push({
            url: `${SITE_URL}/${locale}/adventures/${continent}/${country}`,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }

        for (const file of files.filter(f => f.isFile() && f.name.endsWith('.mdx') && f.name !== 'index.mdx')) {
          entries.push({
            url: `${SITE_URL}/${locale}/adventures/${continent}/${country}/${file.name.replace('.mdx', '')}`,
            changeFrequency: 'yearly',
            priority: 0.6,
          });
        }
      }
    }
  }

  return entries;
}
