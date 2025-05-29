import { notFound } from "next/navigation";

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

  let Article;

  try {
    Article = (await import(
      `content/${locale}/${continent}/${country}/${slug}.mdx`
    )).default;
  } catch {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="w-[95%] max-w-5xl">
        <Article />
      </div>
    </div>
  );
}