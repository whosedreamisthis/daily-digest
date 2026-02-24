import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'assets2.cbsnewsstatic.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com', // Added Unsplash
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
