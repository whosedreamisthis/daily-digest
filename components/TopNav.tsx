'use client';
import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CategoryBar from './CategoryBar';
export default function TopNav() {
	const pathname = usePathname();
	const isHomepage = pathname === '/';
	const isSearchPage = pathname.includes('search');
	return (
		<header className="sticky top-0 z-50 bg-white/95">
			<div>
				<div className="flex items-center justify-between gap-5">
					<Link href="/" prefetch={true}>
						<nav className="flex flex-row just-start items-center">
							<Image
								src="/images/icon-v2.png"
								alt="Daily Digest Logo"
								priority
								width={80}
								height={80}
							/>
							<span className="-ml-3 text-brand-blue font-bold uppercase">
								Daily
							</span>
							<span className="text-brand-orange font-bold">
								Digest
							</span>
						</nav>
					</Link>
					<div className="mr-5">
						{(isHomepage || isSearchPage) && <SearchBar />}
					</div>
				</div>
				<div className="h-15 empty:h-0 transition-[height]">
					{isHomepage && <CategoryBar />}
				</div>
			</div>
		</header>
	);
}
