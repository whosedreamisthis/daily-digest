import { Article } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BreadCrumb {
	label: string;
	href: string;
}

interface NewsState {
	query: string;
	article: Article | null;
	summaries: Record<string, string>;
	setQuery: (query: string) => void;
	setArticle: (article: Article) => void;
	addSummary: (title: string, summary: string) => void;
	customCrumbs: BreadCrumb[];
	setCustomCrumbs: (crumbs: BreadCrumb[]) => void;
	tickerArticles: Article[];
	setTickerArticles: (articles: Article[]) => void;
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
			customCrumbs: [],
			setCustomCrumbs: (crumbs) => set({ customCrumbs: crumbs }),
			tickerArticles: [], // Initialize empty
			setTickerArticles: (articles) => set({ tickerArticles: articles }),
		}),
		{
			name: 'news-storage',
		},
	),
);
