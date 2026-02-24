import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';
import HeroArticle from '@/components/HeroArticle';
import { getHeadlines } from './actions';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';

export default async function Home() {
	let result: Article[];
	if (process.env.NODE_ENV === 'development') {
		console.log('🛠️ Using Mock Data (Saving Quota!)');
		result = mockArticles;
	} else {
		result = await getHeadlines();
	}

	const featuredArticle = result[0];
	const remainingArticles = result.slice(1);

	console.log(result);
	return (
		<>
			<HeroArticle article={featuredArticle} />
			<div className="grid grid-cols-2 gap-3 mx-4 items-center justify-center">
				{remainingArticles.map((article) => (
					<NewsCard key={article.title} article={article} />
				))}
			</div>
		</>
	);
}
