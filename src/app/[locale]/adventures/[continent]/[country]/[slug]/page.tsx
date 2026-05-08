import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { promises as fs } from "fs";
import type { Metadata } from "next";
import ImageNextToText from "@/components/ImageNextToText";
import ImageSliderWide from "@/components/ImageSliderWide";
import ImageSlider from "@/components/ImageSlider";
import ImageNextToImage from "@/components/ImageNextToImage";
import FullWidthImage from "@/components/FullWidthImage";
import MainHeader from "@/components/MainHeader";
import SubHeader from "@/components/SubHeader";
import CardLink from "@/components/CardLink";
import Section from "@/components/Section";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/[locale]/components/Breadcrumb";
import destinationsList from "@/app/[locale]/adventures/destinations";
import { SITE_URL, SITE_NAME, parseFrontmatter, buildAlternates, parseArticleDate } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const readArticle = cache(async (locale: string, continent: string, country: string, slug: string): Promise<string | null> => {
  try {
    return await fs.readFile(
      path.join(process.cwd(), 'src/content', locale, continent, country, `${slug}.mdx`),
      'utf-8'
    );
  } catch {
    return null;
  }
});

type ArticlePageParams = {
  locale: string;
  continent: string;
  country: string;
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<ArticlePageParams> }): Promise<Metadata> {
  const { locale, continent, country, slug } = await params;
  const content = await readArticle(locale, continent, country, slug);
  const fm = content ? parseFrontmatter(content) : {};
  const title = fm.title ?? slug.replace(/-/g, ' ');
  const description = fm.description ?? `${title} · ${SITE_NAME}`;

  const availableLocales = (await Promise.all(
    routing.locales.map(async (l) => {
      try {
        await fs.access(path.join(process.cwd(), 'src/content', l, continent, country, `${slug}.mdx`));
        return l;
      } catch {
        return null;
      }
    })
  )).filter(Boolean) as string[];

  const pagePath = `/adventures/${continent}/${country}/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${pagePath}`,
      languages: buildAlternates(pagePath, availableLocales),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${pagePath}`,
      type: 'article',
      locale,
    },
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const params: Array<{ locale: string; continent: string; country: string; slug: string }> = [];

  const locales = await fs.readdir(contentDir, { withFileTypes: true });
  for (const localeEntry of locales.filter(e => e.isDirectory())) {
    const continents = await fs.readdir(path.join(contentDir, localeEntry.name), { withFileTypes: true });
    for (const continentEntry of continents.filter(e => e.isDirectory())) {
      const countries = await fs.readdir(path.join(contentDir, localeEntry.name, continentEntry.name), { withFileTypes: true });
      for (const countryEntry of countries.filter(e => e.isDirectory())) {
        const files = await fs.readdir(path.join(contentDir, localeEntry.name, continentEntry.name, countryEntry.name), { withFileTypes: true });
        for (const file of files.filter(e => e.isFile() && e.name.endsWith('.mdx') && e.name !== 'index.mdx')) {
          params.push({
            locale: localeEntry.name,
            continent: continentEntry.name,
            country: countryEntry.name,
            slug: file.name.replace('.mdx', ''),
          });
        }
      }
    }
  }

  return params;
}

export default async function ArticlePage({ params }: {
  params: Promise<ArticlePageParams>;
}) {
  const { locale, continent, country, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const content = await readArticle(locale, continent, country, slug);
  if (!content) return notFound();

  const data = await compileMDX<{ title: string; date?: string; description?: string }>({
    source: content,
    options: {
      parseFrontmatter: true,
      blockJS: false,
    },
    components: {
      ImageNextToText,
      ImageNextToImage,
      ImageSliderWide,
      ImageSlider,
      FullWidthImage,
      MainHeader,
      SubHeader,
      CardLink,
      Section,
    }
  });

  const continentData = destinationsList.find(c => c.params === continent);
  const isTrip = continentData?.trips?.some(t => t.params === country);
  const countryOrTripLabel = isTrip
    ? t(`Adventures.DestinationsList.trip.${country}` as Parameters<typeof t>[0])
    : t(`Adventures.DestinationsList.country.${country}` as Parameters<typeof t>[0]);

  const breadcrumbItems = [
    { label: t("Navbar.Adventures"), href: "/adventures" as const },
    { label: t(`Adventures.DestinationsList.continent.${continent}` as Parameters<typeof t>[0]) },
    {
      label: countryOrTripLabel,
      href: `/adventures/${continent}/${country}` as `/adventures/${string}/${string}`,
    },
    { label: data.frontmatter.title },
  ];

  const articleUrl = `${SITE_URL}/${locale}/adventures/${continent}/${country}/${slug}`;
  const datePublished = data.frontmatter.date ? parseArticleDate(data.frontmatter.date) : undefined;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}/${locale}${item.href}` : articleUrl,
    })),
  };

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.frontmatter.title,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    ...(datePublished ? { datePublished } : {}),
    author: { '@type': 'Person', name: 'Uku Jan', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Uku Jan', url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      <div className="w-[95%] mx-auto max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="overflow-hidden my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[7px] md:before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[7px] md:after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
          {data.frontmatter.title}
        </h1>
        {data.content}
      </div>
    </>
  );
}
