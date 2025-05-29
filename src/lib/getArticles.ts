import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type MdxArticleMetaData = {
  title: string;
  slug: string;
  country: string;
  continent: string;
  date: string;
  coverImage?: string;
};

export type MdxArticle = {
  slug: string;
  frontmatter: MdxArticleMetaData;
}

export async function getArticles(locale: string, continent: string, country: string): Promise<
  MdxArticle[]
> {
  const dir = path.join(process.cwd(), "src", "content", locale, continent, country);

  let files: string[];

  try {
    files = await fs.readdir(dir);
  } catch (err) {
    console.error(`❌ Content folder not found for locale: ${locale}, continent: ${continent} and country: ${country}`, err);
    return [] as MdxArticle[];
  }

  const articles = await Promise.all(
    files
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        try {
          const filePath = path.join(dir, filename);
          const rawText = await fs.readFile(filePath, "utf8");
          const { data } = matter(rawText);
          const slug = filename.replace(/\.mdx?$/, "");

          return {
            slug,
            frontmatter: data as MdxArticleMetaData,
          };
        } catch (err) {
          console.error(`❌ Error reading article: ${filename}`, err);
          return null;
        }
      })
  );

  // filter the possible null values
  return articles.filter(Boolean) as MdxArticle[];
}
