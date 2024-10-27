/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  basePath: process.env.GITHUB_ACTIONS && '/nextjs-app',
  assetPrefix: process.env.GITHUB_ACTIONS && '/nextjs-app/',
};

export default nextConfig;
