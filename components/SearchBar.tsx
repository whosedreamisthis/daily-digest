'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNewsStore } from '@/stores/useNewsStore';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const query = useNewsStore((state) => state.query);
	const setQuery = useNewsStore((state) => state.setQuery);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;

		const url = `/search?q=${encodeURIComponent(query)}`;

		if (pathname === '/search') {
			router.replace(url);
		} else {
			router.push(url);
		}
	};

	return (
		<form onSubmit={handleSearch} className="relative group">
			<button
				type="submit"
				className="absolute top-1/2 -translate-y-1/2 left-3 "
			>
				<Search
					className=" text-gray-400  w-4 h-4 group-focus-within:text-red-600 transition-colors"
					aria-hidden="true"
				/>
				<span className="sr-only">Search stories</span>
			</button>

			<Input
				placeholder="Search stories..."
				className="pl-10 pr-4 rounded-full bg-slate-100 border-none focus-visible:ring-2 focus-visible:ring-red-600"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>

			<button type="submit" className="hidden">
				Search
			</button>
		</form>
	);
}
