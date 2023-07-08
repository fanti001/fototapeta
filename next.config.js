// /** @type {import('next').NextConfig} */
module.exports = {
	// reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '/**',
			},
		],
	},
}

// module.exports = nextConfig
