import React from 'react';
import { getHeadlines } from '@/app/actions';
import { Article } from '@/lib/types';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';
import BackButton from '@/components/BackButton';

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	let articles: Article[];

	if (process.env.NODE_ENV === 'development') {
		articles = mockArticles.filter(
			(article) =>
				article.category?.toLowerCase() === category.toLowerCase(),
		);
	} else {
		articles = await getHeadlines(category.toLowerCase());
	}

	return (
		<main className="max-w-7xl mx-auto py-8">
			<BackButton />
			{/* 1. Header Section */}
			<header className="px-4 mb-8 border-l-4 border-red-600">
				<h1 className="text-4xl font-black uppercase tracking-tight">
					{category} <span className="text-red-600">News</span>
				</h1>
				<p className="text-muted-foreground mt-2">
					The latest updates and breaking stories in {category}.
				</p>
			</header>

			{/* 2. Grid with Empty State Check */}
			{articles.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
					{articles.map((article) => (
						<NewsCard key={article.title} article={article} />
					))}
				</div>
			) : (
				<div className="text-center py-20">
					<h2 className="text-2xl font-semibold">
						No articles found
					</h2>
					<p className="text-muted-foreground">
						We couldn't find any news in the "{category}" category
						right now.
					</p>
				</div>
			)}

			{/* 3. Potential Pagination/Load More area */}
			{articles.length > 0 && (
				<div className="flex justify-center mt-12">
					<button className="px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
						Load More
					</button>
				</div>
			)}
		</main>
	);
}
