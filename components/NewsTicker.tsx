'use client';

import { mockArticles } from '@/data/mockNews';
import { Article } from '@/lib/types';
import Link from 'next/link';
import { useNewsStore } from '@/stores/useNewsStore';
import { generateSlug } from '@/lib/utils';

interface NewsTickerProps {
	articles?: Article[];
}

export default function NewsTicker({ articles }: NewsTickerProps) {
	const setArticle = useNewsStore((state) => state.setArticle);

	const tickerArticles = useNewsStore((state) => state.tickerArticles);

	// Fallback to mocks if the store hasn't been populated yet
	const displayArticles =
		tickerArticles.length > 0 ? tickerArticles : mockArticles;

	// Double the articles for the seamless loop
	const tickerItems = [...displayArticles, ...displayArticles];

	return (
		<div className="fixed z-50 bottom-0 left-0 w-full bg-slate-900 text-white h-10 flex items-center overflow-hidden border-t border-slate-800">
			{/* "Breaking" Label */}
			<div className="bg-red-600 h-full flex items-center px-4 text-xs font-black uppercase tracking-tighter z-20">
				Breaking
			</div>

			{/* The Animated Container */}
			<div className="flex whitespace-nowrap animate-ticker-move hover:[animation-play-state:paused]">
				{tickerItems.map((article, i) => (
					<Link
						key={`${article.title}-${i}`}
						href={`/article/${generateSlug(article.title)}`}
						onClick={() => {
							// This ensures the correct article data is sent to the article page
							setArticle(article);
						}}
						className="flex-shrink-0 flex items-center px-6 hover:text-red-400 transition-colors"
					>
						<span className="text-red-600 font-bold mr-3">//</span>
						<span className="text-sm font-medium tracking-wide">
							{article.title}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
