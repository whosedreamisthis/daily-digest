import { mockArticles } from '@/data/mockNews';
import { searchNews } from '@/app/actions';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string; page?: string }>;
}) {
	const params = await searchParams;
	const query = params.q || '';
	const currentPage = Number(params.page) || 1;
	const ARTICLES_PER_PAGE = 12;

	let results = [];
	let totalResults = 0;

	// 1. Environment-based Logic
	if (process.env.NODE_ENV === 'development') {
		// Local Filtering Logic
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
		// 2. Production API Logic (Server Action)
		const data = await searchNews(query, currentPage, ARTICLES_PER_PAGE);
		results = data.articles;
		totalResults = data.totalResults;
	}

	const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">
				Results for "{query}"
				<span className="text-slate-400 ml-2 text-lg font-normal italic">
					({totalResults} stories found{' '}
					{process.env.NODE_ENV === 'development' && '- Dev Mode'})
				</span>
			</h1>

			{results.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{results.map((article, idx) => (
							<NewsCard
								key={`${article.url}-${idx}`}
								article={article}
							/>
						))}
					</div>

					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							category={`search?q=${query}`}
						/>
					)}
				</>
			) : (
				<div className="text-center py-20">
					<p className="text-slate-500 text-lg">
						No matches found for "{query}".
					</p>
				</div>
			)}
		</main>
	);
}
