// components/TickerSync.tsx
'use client';

import { useEffect } from 'react';
import { useNewsStore } from '@/stores/useNewsStore';
import { Article } from '@/lib/types';

export default function TickerSync({ articles }: { articles: Article[] }) {
	const setTickerArticles = useNewsStore((state) => state.setTickerArticles);

	useEffect(() => {
		if (articles.length > 0) {
			setTickerArticles(articles);
		}
	}, [articles, setTickerArticles]);

	return null; // This component renders nothing
}
