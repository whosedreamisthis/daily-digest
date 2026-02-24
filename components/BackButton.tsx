'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors mb-6"
		>
			<div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 group-hover:border-red-600 group-hover:bg-red-50">
				<ArrowLeft size={16} />
			</div>
			<span>Go Back</span>
		</button>
	);
}
