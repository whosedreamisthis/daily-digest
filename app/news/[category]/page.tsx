import React from 'react';
import { getHeadlines } from '@/app/actions';
import { Article } from '@/lib/types';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';
export default async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	// const godMode = false;
	const { category } = await params;
	let articles: Article[];
	if (process.env.NODE_ENV === 'development') {
		console.log('🛠️ Using Mock Data (Saving Quota!)');

		articles = mockArticles.filter(
			(article) =>
				article.category?.toLowerCase() === category.toLowerCase(),
		);
	} else {
		articles = await getHeadlines(category.toLowerCase());
	}
	return (
		<div className="grid grid-cols-2 gap-3 mx-4 items-center justify-center">
			{articles.map((article) => (
				<NewsCard key={article.title} article={article} />
			))}
		</div>
	);
}
