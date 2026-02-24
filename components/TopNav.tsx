import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
export default function TopNav() {
	return (
		<div className="flex items-center justify-between">
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
				<span className="text-brand-orange font-bold">Digest</span>
			</nav>
			<div className="mr-5">
				<SearchBar />
			</div>
		</div>
	);
}
