import { getArticles } from "lib/getArticles";
import Link from "next/link";
import { notFound } from "next/navigation";

type CountryPageParams = {
  locale: string;
  continent: string;
  country: string;
};

export default async function CountryPage({ params }: {
  params: Promise<CountryPageParams>;
}) {
  const { locale, continent, country } = await params;

  const articles = await getArticles(locale, continent, country);

  if (articles.length === 0) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto w-[95%] pt-8">
      <h1 className="text-4xl font-bold capitalize">
        {country}
      </h1>
      <ul className="space-y-4 pt-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              className="text-(--green)"
              href={`/${locale}/adventures/${continent}/${country}/${article.slug}`}
            >
              {article.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}