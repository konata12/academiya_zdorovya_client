import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		ppr: true,
		// dynamicIO: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.s3.eu-north-1.amazonaws.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
