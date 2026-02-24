import { Article } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NewsState {
	query: string;
	article: Article | null;
	summaries: Record<string, string>;
	setQuery: (query: string) => void;
	setArticle: (article: Article) => void;
	addSummary: (title: string, summary: string) => void;
}

// Add <NewsState> right here in the function parameters
export const useNewsStore = create<NewsState>()(
	persist(
		(set) => ({
			query: '',
			article: null,
			summaries: {},
			setQuery: (query) => set({ query }),
			setArticle: (article) => set({ article }),
			addSummary: (title, summary) =>
				set((state) => ({
					summaries: { ...state.summaries, [title]: summary },
				})),
		}),
		{
			name: 'news-storage',
		},
	),
);
