'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { useNewsStore } from '@/stores/useNewsStore';
import { Article } from '@/lib/types';

// NewsCard.tsx
export default function NewsCard({
	article,
	index,
}: {
	article: Article;
	index: number;
}) {
	const setArticle = useNewsStore((state) => state.setArticle);

	return (
		// Add 'relative' here so the link stays inside the card
		<Card className="relative p-0 overflow-hidden border-none shadow-sm group flex flex-col h-full hover:shadow-md transition-shadow">
			<div className="relative aspect-video w-full">
				<SafeImage
					src={article.urlToImage || '/images/placeholder-v2.jpg'}
					alt={article.title} // Keep empty if the title describes the content sufficiently
					fill
					priority={index < 4}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div className="p-4 space-y-3 flex flex-col flex-grow">
				<div className="flex items-center gap-2">
					<Badge
						variant="secondary"
						className="text-[10px] uppercase font-bold"
					>
						{article.source.name}
					</Badge>
				</div>

				{/* The link is only on the Title, but covers the WHOLE card */}
				<h3 className="font-bold text-slate-900 leading-snug">
					<Link
						href={`/article/${encodeURIComponent(article.title)}`}
						className="after:absolute after:inset-0 focus:outline-none"
						onClick={() => {
							setArticle(article);
						}}
					>
						{article.title}
					</Link>
				</h3>

				<p className="text-sm text-slate-600 line-clamp-2">
					{article.description}
				</p>
			</div>
		</Card>
	);
}
