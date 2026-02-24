'use client';

import React, { useEffect, useState } from 'react';
import { useNewsStore } from '@/stores/useNewsStore';
import Image from 'next/image';
import Link from 'next/link';
import { summarizeArticle } from '@/lib/ai-actions';
import ArticleSummary from '@/components/ArticleSummary';
import BackButton from '@/components/BackButton';
export default function ArticlePage() {
	const article = useNewsStore((state) => state.article);
	const summaries = useNewsStore((state) => state.summaries);
	const addSummary = useNewsStore((state) => state.addSummary);

	const [isHydrated, setIsHydrated] = useState(false);
	const [summary, setSummary] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isHydrated || !article) return;

		// CHECK CACHE FIRST
		const existingSummary = summaries[article.title];

		if (!existingSummary && !loading) {
			const getAIResult = async () => {
				setLoading(true);
				const text = await summarizeArticle(
					article.url,
					article.title,
					article.content,
				);
				addSummary(article.title, text); // SAVE TO CACHE
				setLoading(false);
			};
			getAIResult();
		}
	}, [isHydrated, article, summaries, loading, addSummary]);

	// Use either the cached version or the local loading state
	const currentSummary = article ? summaries[article.title] : null;

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) return null;

	if (!article) {
		return (
			<div className="p-20 text-center">
				<h2 className="text-xl font-semibold">No article found.</h2>
				<Link
					href="/"
					className="text-blue-500 underline mt-4 inline-block"
				>
					Go back home
				</Link>
			</div>
		);
	}

	return (
		<main className="max-w-4xl mx-auto p-6 space-y-8">
			<BackButton />
			{/* 1. Headline Section */}
			<header className="space-y-4">
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
					{article.title}
				</h1>
				<div className="flex items-center gap-4 text-slate-500 text-sm">
					<span className="font-bold text-slate-800">
						{article.source.name}
					</span>
					<span>•</span>
					<span>
						{new Date(article.publishedAt).toLocaleDateString()}
					</span>
					{article.author && <span>• By {article.author}</span>}
				</div>
			</header>

			<section className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
				<h3 className="font-bold text-slate-800 flex items-center gap-2">
					✨ AI Summary
				</h3>

				{loading ? (
					<div className="space-y-3">
						<div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
						<div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
						<div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse"></div>
					</div>
				) : (
					<div className="mt-1">
						{currentSummary ? (
							<ArticleSummary content={currentSummary} />
						) : (
							'Generating summary...'
						)}
					</div>
				)}
			</section>

			{/* 2. Image Section - Contained correctly */}
			<div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
				<Image
					src={article.urlToImage || '/placeholder.jpg'}
					alt={article.title}
					fill
					priority
					className="object-cover"
					sizes="(max-width: 1200px) 100vw, 1200px"
				/>
			</div>

			{/* 3. Article Body Content */}
			<article className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
				<p className="text-xl font-medium text-slate-600 mb-6 italic">
					{article.description}
				</p>
				<p>
					{/* NewsAPI content is often truncated with "... [+chars]". 
              We display what we have. */}
					{article.content?.split('[+')[0] ||
						'No content available for this preview.'}
				</p>
			</article>

			{/* 4. External Link Button */}
			<div className="pt-8 border-t border-slate-200">
				<a
					href={article.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg transition-colors duration-200"
				>
					Read Full Article on {article.source.name}
					<svg
						className="w-4 h-4 ml-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</a>
			</div>
		</main>
	);
}
