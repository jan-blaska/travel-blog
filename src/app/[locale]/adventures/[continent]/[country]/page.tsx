import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ImageNextToText from "@/components/ImageNextToText";
import ImageNextToImage from "@/components/ImageNextToImage";
import ImageSlider from "@/components/ImageSlider";
import ImageSliderWide from "@/components/ImageSliderWide";
import FullWidthImage from "@/components/FullWidthImage";
import CardLink from "@/components/CardLink";
import MainHeader from "@/components/MainHeader";
import SubHeader from "@/components/SubHeader";
import Section from "@/components/Section";
import Breadcrumb from "@/app/[locale]/components/Breadcrumb";
import destinationsList from "@/app/[locale]/adventures/destinations";
import { SITE_URL, SITE_NAME, parseFrontmatter, buildAlternates } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const readIndex = cache(async (locale: string, continent: string, country: string): Promise<string | null> => {
  try {
    return await fs.readFile(
      path.join(process.cwd(), 'src/content', locale, continent, country, 'index.mdx'),
      'utf-8'
    );
  } catch {
    return null;
  }
});

type CountryPageParams = {
  locale: string;
  continent: string;
  country: string;
};

export async function generateMetadata({ params }: { params: Promise<CountryPageParams> }): Promise<Metadata> {
  const { locale, continent, country } = await params;
  const content = await readIndex(locale, continent, country);
  const fm = content ? parseFrontmatter(content) : {};
  const title = fm.title ?? country.replace(/-/g, ' ');
  const description = fm.description ?? `${title} · ${SITE_NAME}`;

  const availableLocales = (await Promise.all(
    routing.locales.map(async (l) => {
      try {
        await fs.access(path.join(process.cwd(), 'src/content', l, continent, country, 'index.mdx'));
        return l;
      } catch {
        return null;
      }
    })
  )).filter(Boolean) as string[];

  const pagePath = `/adventures/${continent}/${country}`;
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
      type: 'website',
      locale,
    },
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const params: Array<{ locale: string; continent: string; country: string }> = [];

  const locales = await fs.readdir(contentDir, { withFileTypes: true });
  for (const localeEntry of locales.filter(e => e.isDirectory())) {
    const continents = await fs.readdir(path.join(contentDir, localeEntry.name), { withFileTypes: true });
    for (const continentEntry of continents.filter(e => e.isDirectory())) {
      const countries = await fs.readdir(path.join(contentDir, localeEntry.name, continentEntry.name), { withFileTypes: true });
      for (const countryEntry of countries.filter(e => e.isDirectory())) {
        params.push({
          locale: localeEntry.name,
          continent: continentEntry.name,
          country: countryEntry.name,
        });
      }
    }
  }

  return params;
}

export default async function CountryPage({ params }: {
  params: Promise<CountryPageParams>;
}) {
  const { locale, continent, country } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const source = await readIndex(locale, continent, country);
  if (!source) return notFound();

  const data = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      blockJS: false,
    },
    components: {
      ImageNextToText,
      ImageNextToImage,
      ImageSlider,
      ImageSliderWide,
      FullWidthImage,
      CardLink,
      MainHeader,
      SubHeader,
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
    { label: countryOrTripLabel },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href
        ? `${SITE_URL}/${locale}${item.href}`
        : `${SITE_URL}/${locale}/adventures/${continent}/${country}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-6xl mx-auto w-[95%] overflow-hidden">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
          {data.frontmatter.title}
        </h1>
        {data.content}
      </div>
    </>
  );
}
