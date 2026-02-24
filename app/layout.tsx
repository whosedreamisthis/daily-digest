import type { Metadata } from 'next';

import './globals.css';
import TopNav from '@/components/TopNav';
import NewsTicker from '@/components/NewsTicker';

export const metadata: Metadata = {
	title: 'Daily Digest',
	description: 'News Aggregator',
	icons: {
		// Adding ?v=1 forces the browser to re-download the file
		icon: '/icon.png?v=1',
		shortcut: '/icon.png?v=1',
		apple: '/icon.png?v=1',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TopNav />
				{children}
				<NewsTicker />
			</body>
		</html>
	);
}
