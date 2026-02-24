'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchStore } from '@/stores/useSearchStore';

const CATEGORIES = [
	'business',
	'entertainment',
	'general',
	'health',
	'science',
	'sport',
	'technology',
];

export default function CategoryBar() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const selectedCategory = useSearchStore((state) => state.category);
	const setCategory = useSearchStore((state) => state.setCategory);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};

	const handleMouseLeaveOrUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();

		// Use rAF to decouple the event frequency from the DOM update
		requestAnimationFrame(() => {
			if (!scrollRef.current) return;
			const x = e.pageX - scrollRef.current.offsetLeft;
			const walk = (x - startX) * 2;
			scrollRef.current.scrollLeft = scrollLeft - walk;
		});
	};

	return (
		<div
			ref={scrollRef}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeaveOrUp}
			onMouseUp={handleMouseLeaveOrUp}
			onMouseMove={handleMouseMove}
			className={`
        flex overflow-x-auto no-scrollbar gap-2 py-4 px-4 
        cursor-grab active:cursor-grabbing select-none
      `}
		>
			{CATEGORIES.map((cat) => {
				const isActive = cat === selectedCategory;
				return (
					<Link
						href={`/news/${cat}`}
						aria-label={`Select Category ${cat}`}
						key={cat}
						className={`whitespace-nowrap px-4 py-1 rounded-md border   text-sm hover:border-cyan-500 transition-colors ${
							isActive
								? 'text-slate-900 bg-white border-slate-700 hover:bg-white'
								: 'bg-slate-900 text-white'
						}`}
						onClick={() => {
							setCategory(cat);
						}}
					>
						{cat}
					</Link>
				);
			})}
		</div>
	);
}
