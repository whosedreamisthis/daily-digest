import React from 'react';

export default function Loading() {
	return (
		<main className="max-w-7xl mx-auto py-8">
			{/* 1. Header Skeleton */}
			<header className="px-4 mb-8 border-l-4 border-slate-200 pl-4 animate-pulse">
				<div className="h-10 bg-slate-200 rounded w-48 mb-2" />
				<div className="h-4 bg-slate-100 rounded w-64" />
			</header>

			{/* 2. Grid Skeleton (matching your 2 or 3 column layout) */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
				{/* We render 6 or 9 cards to fill the screen */}
				{Array.from({ length: 6 }).map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		</main>
	);
}

// Re-using the card function from above
function SkeletonCard() {
	return (
		<div className="flex flex-col gap-3 animate-pulse">
			<div className="bg-slate-200 aspect-video w-full rounded-lg" />
			<div className="space-y-2">
				<div className="h-5 bg-slate-200 rounded w-full" />
				<div className="h-5 bg-slate-200 rounded w-2/3" />
			</div>
			<div className="h-4 bg-slate-100 rounded w-1/3 mt-1" />
		</div>
	);
}
