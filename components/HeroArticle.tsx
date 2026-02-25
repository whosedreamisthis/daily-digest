'use client';
import { Article } from '@/lib/types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNewsStore } from '@/stores/useNewsStore';
import { generateSlug } from '@/lib/utils';

interface Props {
	article: Article;
}
export default function HeroArticle({ article }: Props) {
	const setArticle = useNewsStore((state) => state.setArticle);
	return (
		<div>
			<Link
				href={`/article/${generateSlug(article.title)}`}
				onClick={() => {
					setArticle(article);
				}}
			>
				<section className="relative w-full h-[30vh] md:h-[600px] overflow-hidden mt-6">
					<Image
						src={article.urlToImage || '/images/placeholder-v2.jpg'}
						alt={article.title}
						fill
						priority
						className="object-cover"
						sizes="(max-width: 1200px) 100vw, 1200px"
					/>

					{/* Gradient & Text Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
					<div className="absolute bottom-0 p-8 text-white">
						<h1 className="text-2xl font-bold mb-2">
							{article.title}
						</h1>
						<p className="text-sm opacity-90">
							{article.source.name} • 2 hours ago
						</p>
					</div>
				</section>

				{/* Other Components - These will appear below the image */}
				<section className="mt-12">
					<h2 className="text-2xl font-bold mb-6">Latest News</h2>
					{/* Your Grid of other articles or CategoryBar goes here */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Other components... */}
					</div>
				</section>
			</Link>
		</div>
	);
}
