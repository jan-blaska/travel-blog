import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ImageNextToText from "@/components/ImageNextToText";
import CardLink from "@/components/CardLink";
import MainHeader from "@/components/MainHeader";

type CountryPageParams = {
  locale: string;
  continent: string;
  country: string;
};

export default async function CountryPage({ params }: {
  params: Promise<CountryPageParams>;
}) {
  const { locale, continent, country } = await params;

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
    },
    components: {
      ImageNextToText,
      CardLink,
      MainHeader,
    }
  });

  return (
    <div className="max-w-5xl mx-auto w-[95%] overflow-hidden">
      <h1 className="my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
        {data.frontmatter.title}
      </h1>
      {data.content}
    </div>
  );
}
