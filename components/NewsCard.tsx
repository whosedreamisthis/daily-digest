import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function NewsCard({ article }: { article: any }) {
	return (
		<Link
			href={`/article/${encodeURIComponent(article.title)}`}
			className="block h-full"
		>
			{/* 1. overflow-hidden is mandatory here to clip the image corners */}
			<Card className="p-0 overflow-hidden border-none shadow-sm group flex flex-col h-full hover:shadow-md transition-shadow">
				{/* 2. Direct child of Card, no padding, no margin */}
				<div className="relative aspect-video w-full">
					<Image
						src={article.urlToImage || '/placeholder.jpg'}
						alt={article.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				</div>

				{/* 3. Content section with its own padding */}
				<div className="p-4 space-y-3 flex flex-col flex-grow">
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="text-[10px] uppercase font-bold"
						>
							{article.source.name}
						</Badge>
						<span className="text-[10px] text-muted-foreground">
							{new Date(article.publishedAt).toLocaleDateString()}
						</span>
					</div>

					<h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
						{article.title}
					</h3>

					<p className="text-sm text-muted-foreground line-clamp-2 italic">
						{article.description}
					</p>
				</div>
			</Card>
		</Link>
	);
}
