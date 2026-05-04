import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ImageNextToText from "@/components/ImageNextToText";
import { promises as fs } from "fs";
import ImageSliderWide from "@/components/ImageSliderWide";
import ImageSlider from "@/components/ImageSlider";
import ImageNextToImage from "@/components/ImageNextToImage";
import MainHeader from "@/components/MainHeader";
import CardLink from "@/components/CardLink";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/[locale]/components/Breadcrumb";
import destinationsList from "@/app/[locale]/adventures/destinations";

type ArticlePageParams = {
  locale: string;
  continent: string;
  country: string;
  slug: string;
};

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

  let content: string;
  try {
    content = await fs.readFile(path.join(process.cwd(), 'src/content', locale, continent, country, `${slug}.mdx`), 'utf-8');
  } catch {
    return notFound();
  }

  const data = await compileMDX<{ title: string }>({
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
      MainHeader,
      CardLink,
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

  return (
    <div className="w-[95%] mx-auto max-w-6xl">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="overflow-hidden my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[7px] md:before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[7px] md:after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
        {data.frontmatter.title}
      </h1>
      {data.content}
    </div>

  );
}
