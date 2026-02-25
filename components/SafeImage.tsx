'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
	src: string | null | undefined;
}

const FALLBACK_IMAGE = '/images/placeholder-v2.jpg'; // Ensure this is in your /public folder

export default function SafeImage({
	src,
	alt,
	sizes,
	...props
}: SafeImageProps) {
	const [imgSrc, setImgSrc] = useState<string>(FALLBACK_IMAGE);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		// 1. Immediate check for empty/null sources
		if (!src || src === 'null' || src === '') {
			setImgSrc(FALLBACK_IMAGE);
			return;
		}

		// 2. Client-side only validation (Safe to use 'new Image()' here)
		const imgCheck = new window.Image();
		imgCheck.src = src;

		imgCheck.onload = () => setImgSrc(src);
		imgCheck.onerror = () => setImgSrc(FALLBACK_IMAGE);
	}, [src]);

	// 3. Avoid "Hydration Mismatch" by rendering a placeholder
	// until the component has mounted on the client.
	if (!isMounted) {
		return <div className="w-full h-full bg-slate-200 animate-pulse" />;
	}

	return (
		<Image
			{...props}
			src={imgSrc}
			alt={alt || 'News image'}
			sizes={
				sizes ||
				'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			}
			// Final safety net for 404s that bypass the onload check
			onError={() => setImgSrc(FALLBACK_IMAGE)}
		/>
	);
}
