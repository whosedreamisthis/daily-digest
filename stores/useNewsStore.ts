import { Article } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NewsState {
	query: string;
	article: Article | null;
	setQuery: (query: string) => void;
	setArticle: (article: Article) => void;
}

// Add <NewsState> right here in the function parameters
export const useNewsStore = create<NewsState>()(
	persist(
		(set) => ({
			query: '',
			article: null,
			setQuery: (query) => set({ query }),
			setArticle: (article) => set({ article }),
		}),
		{
			name: 'news-storage',
		},
	),
);
