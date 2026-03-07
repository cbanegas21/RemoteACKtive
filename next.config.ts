import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization for better SEO
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.githubassets.com',
      },
    ],
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // www → non-www (consolidate domain authority)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.remoteacktive.com',
          },
        ],
        destination: 'https://remoteacktive.com/:path*',
        permanent: true,
      },
      // /index.html → / (Google found phantom URLs returning 404)
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;