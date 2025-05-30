import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageNextToText from "@/components/ImageNextToText";
import { promises as fs } from "fs";

type ArticlePageParams = {
  locale: string;
  continent: string;
  country: string;
  slug: string;
};

export default async function ArticlePage({ params }: {
  params: Promise<ArticlePageParams>;
}) {
  const { locale, continent, country, slug } = await params;

  const content = await fs.readFile(path.join(process.cwd(), 'src/content', locale, continent, country, `${slug}.mdx`), 'utf-8');
  const data = await compileMDX<{ title: string }>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      ImageNextToText,
    }
  });

  console.log("content", content);

  return (
    <div className="flex justify-center">
      <div className="w-[95%] max-w-5xl">
        {data.frontmatter.title}
        {data.content}
      </div>
    </div>
  );
}