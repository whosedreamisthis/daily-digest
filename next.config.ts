import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // This allows ALL hostnames
			},
		],
	},
};

export default nextConfig;
