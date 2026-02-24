const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function getHeadlines(category = 'general') {
	const res = await fetch(
		`${BASE_URL}/top-headlines?country=us&category=${category}`,
		{
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
			// Next.js cache settings (optional)
			next: { revalidate: 3600 },
		},
	);

	if (!res.ok) throw new Error('Failed to fetch news');

	const data = await res.json();
	return data.articles;
}
