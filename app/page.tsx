import HeroArticle from '@/components/HeroArticle';
import { getHeadlines } from './actions';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';
import { Article } from '@/lib/types';

export default async function Home() {
	let articles: Article[];
	if (process.env.NODE_ENV === 'development') {
		console.log('🛠️ Using Mock Data (Saving Quota!)');
		articles = mockArticles;
	} else {
		const result = await getHeadlines('general', 1, 10);
		articles = result.articles;
	}

	const featuredArticle = articles[0];
	const remainingArticles = articles.slice(1);

	return (
		<>
			<HeroArticle article={featuredArticle} />
			<div className="grid grid-cols-2 gap-3 mx-4 items-center justify-center">
				{remainingArticles.map((article, index) => (
					<NewsCard
						index={index}
						key={article.title}
						article={article}
					/>
				))}
			</div>
		</>
	);
}
