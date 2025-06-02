import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import ImageNextToText from "@/components/ImageNextToText";
import { promises as fs } from "fs";
import ImageSlider from "@/components/ImageSlider";
import ImageCarousel from "@/components/ImageCarousel";
import ImageNextToImage from "@/components/ImageNextToImage";
import MainHeader from "@/components/MainHeader";

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
      ImageNextToImage,
      ImageSlider,
      ImageCarousel,
      MainHeader,
    }
  });

  console.log("content", content);

  return (
    <div className="w-[95%] mx-auto max-w-5xl overflow-hidden">
      <h1 className="my-4 md:my-8 relative text-7xl md:text-9xl font-barlow-condensed uppercase tracking-wider before:content-[''] before:absolute before:top-2 md:before:top-5 before:left-[-5%] before:h-[15px] before:w-[30%] before:bg-(--orange) before:-z-10 after:content-[''] after:absolute after:bottom-1 md:after:bottom-2 after:right-0 after:h-[15px] after:w-[70%] after:bg-(--green) after:-z-10">
        {data.frontmatter.title}
      </h1>
      {data.content}
    </div>

  );
}