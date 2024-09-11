import { getMyArticles } from "../fetchers";

export async function getMyArticleLinksByCategory(category: string) {
  const data = await getMyArticles(); // データ取得関数
  const articles = data.articles.filter((article) =>
    article.tags.includes(category)
  );
  if (!articles.length) {
    return null;
  }
  return articles.map((article) => ({
    title: article.title,
    link: `/articles/${article.id}`,
  }));
}
