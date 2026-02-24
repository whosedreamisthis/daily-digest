import { create } from 'zustand';

interface SearchState {
	query: string;
	category: string;
	setQuery: (query: string) => void;
	setCategory: (category: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
	query: '',
	category: '',
	setQuery: (query) =>
		set({
			query,
		}),
	setCategory: (category) =>
		set({
			category,
		}),
}));
