'use client';

import React, { useEffect, useState } from 'react';
import { useNewsStore } from '@/stores/useNewsStore';

export default function ArticlePage() {
	// 1. Use a selector. This returns the value directly.
	const article = useNewsStore((state) => state.article);

	// 2. Fix Hydration Error: Ensure component is mounted before rendering store data
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) return null; // Or a loading spinner

	if (!article) {
		return <div className="p-20 text-center">No article found.</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold">{article.title}</h1>
			{/* ... rest of your UI ... */}
		</div>
	);
}
