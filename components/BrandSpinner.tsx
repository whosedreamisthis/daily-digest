// components/BrandSpinner.tsx
export default function BrandSpinner() {
	return (
		<div className="flex items-center justify-center p-4">
			<div className="relative h-12 w-12">
				{/* Outer Blue Ring (Daily) */}
				<div
					className="absolute inset-0 animate-spin rounded-full border-4 border-solid border-t-transparent"
					style={{
						borderColor:
							'#4A90E2 transparent transparent transparent',
					}}
				></div>

				{/* Inner Orange Ring (Digest) - Uses a standard Tailwind pulse if you want to avoid custom CSS */}
				<div
					className="absolute inset-2 animate-pulse rounded-full border-4 border-solid"
					style={{ borderColor: '#F5A623' }}
				></div>
			</div>
		</div>
	);
}
