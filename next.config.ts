import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during build (you can fix warnings later)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
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

  // Redirects for SEO (add any old URLs you want to redirect)
  async redirects() {
    return [
      // Example: redirect www to non-www
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.remoteacktive.com',
      //     },
      //   ],
      //   destination: 'https://remoteacktive.com/:path*',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;