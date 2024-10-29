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
  reactStrictMode: true,
  // Enable development features
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  // Ensure React DevTools can connect
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  }
};

export default nextConfig;
