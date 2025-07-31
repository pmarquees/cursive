import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite requests for static assets to serve from workspace directory
      {
        source: '/:path*.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)',
        destination: '/api/workspace-assets/:path*',
      },
    ];
  },
};

export default nextConfig;
