import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';
import HeroArticle from '@/components/HeroArticle';
import { getHeadlines } from './actions';
import { mockArticles } from '@/data/mockNews';

export default async function Home() {
	let result;
	if (process.env.NODE_ENV === 'development') {
		console.log('🛠️ Using Mock Data (Saving Quota!)');
		result = mockArticles;
	} else {
		result = await getHeadlines();
	}

	console.log(result);
	return (
		<>
			<CategoryBar />
			<HeroArticle article={result[0]} />
			<HeroArticle article={result[1]} />
		</>
	);
}
