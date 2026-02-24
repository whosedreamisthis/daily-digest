'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/stores/useSearchStore';

export default function SearchBar() {
	const query = useSearchStore((state) => state.query);
	const setQuery = useSearchStore((state) => state.setQuery);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className="relative">
			<Search className="absolute text-gray-500 top-2 left-1" />
			<Input
				placeholder="Search"
				className="pl-8"
				value={query}
				onChange={onInputChange}
			/>
		</div>
	);
}
