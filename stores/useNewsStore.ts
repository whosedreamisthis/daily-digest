import { Article } from '@/lib/types';
import { create } from 'zustand';

interface NewsState {
	query: string;
	article: Article | null;
	setQuery: (query: string) => void;
	setArticle: (article: Article) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
	query: '',
	article: null,
	setQuery: (query) =>
		set({
			query,
		}),
	setArticle: (article) =>
		set({
			article,
		}),
}));
