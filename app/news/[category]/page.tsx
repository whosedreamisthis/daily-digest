// app/news/[category]/page.tsx
import React from 'react';
import { getHeadlines } from '@/app/actions';
import { Article } from '@/lib/types';
import { mockArticles } from '@/data/mockNews';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination'; // We'll build this next
import BackButton from '@/components/BackButton';
import { Metadata } from 'next';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;

	return {
		title: `${
			category.charAt(0).toUpperCase() + category.slice(1)
		} News | Global Dispatch`,
		description: `Read the latest breaking stories in ${category}.`,
	};
}

const ARTICLES_PER_PAGE = 12;

// app/news/[category]/page.tsx
export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: Promise<{ category: string }>;
	searchParams: Promise<{ page?: string }>;
}) {
	const { category } = await params;
	const { page } = await searchParams;
	const currentPage = Number(page) || 1;

	let articles: Article[];
	let totalResults = 0;

	if (process.env.NODE_ENV === 'development') {
		// For mock data, we still have to slice manually since it's a local array
		const filtered = mockArticles.filter(
			(a) => a.category?.toLowerCase() === category.toLowerCase(),
		);

		totalResults = filtered.length;

		// Calculate dynamic start and end
		const start = (currentPage - 1) * ARTICLES_PER_PAGE; // (2-1) * 3 = 3
		const end = start + ARTICLES_PER_PAGE; // 3 + 3 = 6

		// This will now correctly grab index 3 and 4
		articles = filtered.slice(start, end);

		console.log({
			urlCategory: category,
			totalInMock: mockArticles.length,
			filteredCount: filtered.length, // If this is 0, your mock data needs 'category' fields
			currentPage: currentPage,
			sliceStart: (currentPage - 1) * ARTICLES_PER_PAGE,
			start: start,
			end: end,
			articlesLength: articles.length,
		});
	} else {
		// FOR REAL DATA: We only fetch 6 items total!
		const data = await getHeadlines(
			category.toLowerCase(),
			currentPage,
			ARTICLES_PER_PAGE,
		);
		articles = data.articles;
		totalResults = data.totalResults;
	}

	const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);

	return (
		<main className="max-w-7xl mx-auto py-8 px-4">
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
					{articles.map((article, index) => (
						<NewsCard
							index={index}
							key={article.title}
							article={article}
						/>
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

			{totalPages && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					category={category}
				/>
			)}
		</main>
	);
}
