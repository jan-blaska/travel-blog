import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ImageNextToText from "@/components/ImageNextToText";
import ImageNextToImage from "@/components/ImageNextToImage";
import ImageSlider from "@/components/ImageSlider";
import ImageSliderWide from "@/components/ImageSliderWide";
import CardLink from "@/components/CardLink";
import MainHeader from "@/components/MainHeader";
import Breadcrumb from "@/app/[locale]/components/Breadcrumb";
import destinationsList from "@/app/[locale]/adventures/destinations";

type CountryPageParams = {
  locale: string;
  continent: string;
  country: string;
};

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

  const contentPath = path.join(process.cwd(), 'src/content', locale, continent, country, "index.mdx");
  let source: string;
  try {
    source = await fs.readFile(contentPath, 'utf-8');
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return notFound();
    throw error;
  }

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
      CardLink,
      MainHeader,
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

  return (
    <div className="max-w-6xl mx-auto w-[95%] overflow-hidden">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
        {data.frontmatter.title}
      </h1>
      {data.content}
    </div>
  );
}
