// components/Pagination.tsx
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
	currentPage: number;
	totalPages: number;
	category: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	category,
}: Props) {
	const getPageLink = (page: number) => `/news/${category}?page=${page}`;

	return (
		<div className="flex justify-center items-center gap-4 mt-12">
			<Link
				href={getPageLink(currentPage - 1)}
				className={`p-2 rounded-full border ${
					currentPage <= 1
						? 'pointer-events-none opacity-30'
						: 'hover:bg-slate-100'
				}`}
			>
				<ChevronLeft size={20} />
			</Link>

			<span className="text-sm font-medium">
				Page {currentPage} of {totalPages}
			</span>

			<Link
				href={getPageLink(currentPage + 1)}
				className={`p-2 rounded-full border ${
					currentPage >= totalPages
						? 'pointer-events-none opacity-30'
						: 'hover:bg-slate-100'
				}`}
			>
				<ChevronRight size={20} />
			</Link>
		</div>
	);
}
