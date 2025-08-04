import type { NextConfig } from "next";

const isElectron = process.env.ELECTRON_BUILD === 'true';

const nextConfig: NextConfig = {
  // Remove static export for Electron - we want to run as server for API routes
  trailingSlash: isElectron,
  images: {
    unoptimized: isElectron,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Rewrite requests for static assets to serve from workspace directory
      {
        source: '/:path*.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)',
        destination: '/api/workspace-assets/:path*',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
