import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ImageNextToText from "@/components/ImageNextToText";

type CountryPageParams = {
  locale: string;
  continent: string;
  country: string;
};

export default async function CountryPage({ params }: {
  params: Promise<CountryPageParams>;
}) {
  const { locale, continent, country } = await params;

  try {
    await fs.access(path.join(process.cwd(), 'src/content', locale, continent, country));
  } catch (error) {
    return notFound();
  }

  // load the country page content
  const content = await fs.readFile(path.join(process.cwd(), 'src/content', locale, continent, country, "index.mdx"), 'utf-8');
  const data = await compileMDX<{ title: string }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      ImageNextToText,
    }
  });

  // load the list of articles in the country
  const filenames = await fs.readdir(path.join(process.cwd(), 'src/content', locale, continent, country), 'utf-8');
  const articles = await Promise.all(filenames.map(async (filename) => {
    const content = await fs.readFile(path.join(process.cwd(), 'src/content', locale, continent, country, filename), 'utf-8');
    const { frontmatter } = await compileMDX<{ title: string }>({
      source: content,
      options: {
        parseFrontmatter: true,
      },
    });
    return {
      filename,
      slug: filename.replace(".mdx", ""),
      ...frontmatter,
    }
  }));

  const filteredArticles = articles.filter(article => article.filename !== "index.mdx");


  return (
    <div className="max-w-5xl mx-auto w-[95%] pt-8 overflow-hidden">
      <h1 className="mb-4 md:mb-8 mt-0 md:mt-4 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
        {data.frontmatter.title}
      </h1>
      {data.content}
      <ul className="space-y-4 pt-2">
        {filteredArticles.map((article) => (
          <li key={article.slug}>
            <Link
              className="text-(--green)"
              href={`/${locale}/adventures/${continent}/${country}/${article.slug}`}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}