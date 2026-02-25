import { Article } from '@/lib/types';

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// app/actions.ts
export async function getHeadlines(
	category: string,
	page: number = 1,
	pageSize: number = 3,
) {
	const apiKey = process.env.NEWS_API_KEY;

	// We tell the API: "Give me only 6 articles, starting at page X"
	const response = await fetch(
		`https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`,
		{ next: { revalidate: 3600 } }, // Cache for 1 hour
	);

	const data = await response.json();

	return {
		articles: data.articles as Article[],
		totalResults: data.totalResults, // We need this to calculate total pages
	};
}

export async function searchNews(
	query: string,
	page: number = 1,
	pageSize: number = 12,
) {
	if (!query) return { articles: [], totalResults: 0 };

	const response = await fetch(
		`${BASE_URL}/everything?q=${encodeURIComponent(
			query,
		)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`,
		{ next: { revalidate: 3600 } },
	);

	const data = await response.json();

	if (data.status !== 'ok') {
		console.error('NewsAPI Error:', data.message);
		return { articles: [], totalResults: 0 };
	}

	return {
		articles: (data.articles as Article[]) || [],
		totalResults: data.totalResults || 0,
	};
}
