// app/search/page.tsx
import React from 'react';
import { Article } from '@/lib/types';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import BackButton from '@/components/BackButton';

const ARTICLES_PER_PAGE = 6;

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; page?: string }>;
}) {
	const { q, page } = await searchParams;
	const query = q || '';
	const currentPage = Number(page) || 1;

	let results: Article[] = [];
	let totalResults = 0;

	// 1. Filtering Logic
	if (process.env.NODE_ENV === 'development') {
		const allMatches = mockArticles.filter(
			(article) =>
				article.title.toLowerCase().includes(query.toLowerCase()) ||
				article.description
					?.toLowerCase()
					.includes(query.toLowerCase()),
		);

		totalResults = allMatches.length;
		const start = (currentPage - 1) * ARTICLES_PER_PAGE;
		results = allMatches.slice(start, start + ARTICLES_PER_PAGE);
	} else {
		// In production, call your API's search endpoint (e.g., /everything?q=...)
		// const data = await searchNews(query, currentPage);
		// results = data.articles;
		// totalResults = data.totalResults;
	}

	const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);

	return (
		<main className="max-w-7xl mx-auto py-8 px-4">
			<BackButton />

			<header className="mb-10">
				<h1 className="text-3xl font-bold">
					{query ? `Results for "${query}"` : 'Search News'}
				</h1>
				<p className="text-slate-500 mt-2">
					{totalResults} stories found
				</p>
			</header>

			{results.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{results.map((article) => (
							<NewsCard key={article.title} article={article} />
						))}
					</div>

					{totalPages > 1 && (
						<div className="mt-12">
							{/* Note: We pass 'search' as the category to help the Pagination builder */}
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								category={`search?q=${query}`}
							/>
						</div>
					)}
				</>
			) : (
				<div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed">
					<h2 className="text-xl font-medium text-slate-600">
						No matches found.
					</h2>
					<p className="text-slate-400">
						Try searching for broader keywords like "Tech" or
						"World".
					</p>
				</div>
			)}
		</main>
	);
}
