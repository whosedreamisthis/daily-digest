'use client';
import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function TopNav() {
	const pathname = usePathname();
	const isHomepage = pathname === '/';
	return (
		<header className="sticky top-0 z-50 bg-white/95">
			<div>
				<div className="flex items-center justify-between">
					<Link href="/">
						<nav className="flex flex-row just-start items-center">
							<Image
								src="/icon-v2.png"
								alt="Daily Digest Logo"
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
					<div className="mr-5">{isHomepage && <SearchBar />}</div>
				</div>
			</div>
		</header>
	);
}
