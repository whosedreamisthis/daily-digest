// app/components/SafeImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
	src: string | null | undefined;
}

export default function SafeImage({
	src,
	alt,
	priority,
	...props
}: SafeImageProps) {
	const [imgSrc, setImgSrc] = useState<string>('');
	const [isMounted, setIsMounted] = useState(false);
	const FALLBACK = '/images/placeholder-v2.jpg';

	useEffect(() => {
		setIsMounted(true);

		// If it's a priority image, we set the source immediately to hit that 2.5s LCP goal
		if (priority) {
			setImgSrc(src || FALLBACK);
			return;
		}

		// Otherwise, do the background ping for non-critical images
		const imgCheck = new window.Image();
		imgCheck.src = src || '';
		imgCheck.onload = () => setImgSrc(src || FALLBACK);
		imgCheck.onerror = () => setImgSrc(FALLBACK);
	}, [src, priority]);

	// Server-side / Initial render:
	// If priority is true, render the Image tag immediately so the browser sees it in the HTML
	if (!isMounted && priority) {
		return (
			<Image
				{...props}
				src={src || FALLBACK}
				alt={alt || ''}
				priority // This is the magic prop for LCP
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>
		);
	}

	if (!isMounted)
		return <div className="w-full h-full bg-slate-200 animate-pulse" />;

	return (
		<Image
			{...props}
			src={imgSrc || FALLBACK}
			alt={alt || ''}
			priority={priority}
			crossOrigin="anonymous"
			referrerPolicy="no-referrer"
			onError={() => setImgSrc(FALLBACK)}
		/>
	);
}
