'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
	src?: string | null;
}

// This is a Base64 encoded SVG. It works even if you have no image files!
const FALLBACK_IMAGE =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function SafeImage({
	src,
	alt,
	className,
	fill,
	...props
}: SafeImageProps) {
	const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_IMAGE);

	useEffect(() => {
		setImgSrc(src || FALLBACK_IMAGE);
	}, [src]);

	return (
		/* The parent MUST have a defined height/aspect ratio for 'fill' to work */
		<div
			className={`relative overflow-hidden bg-slate-100 w-full h-full min-h-[200px] ${className}`}
		>
			<Image
				{...props}
				src={imgSrc}
				alt={alt}
				fill={fill}
				className="object-cover transition-transform duration-300 group-hover:scale-105"
				onError={() => setImgSrc(FALLBACK_IMAGE)}
				// Added default sizes to satisfy the warning in your console
				sizes="(max-width: 768px) 100vw, 33vw"
			/>
		</div>
	);
}
