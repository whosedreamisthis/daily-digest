// app/loading.tsx
import BrandSpinner from '@/components/BrandSpinner';

export default function Loading() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
			<BrandSpinner />
			<p className="mt-4 font-medium text-slate-600 animate-pulse">
				Fetching your daily digest...
			</p>
		</div>
	);
}
