/** @type {import('next').NextConfig} */
module.exports = {
  // Standalone output is only for the Docker image; Vercel does its own tracing and
  // fails (missing .next/next-server.js.nft.json) when standalone is enabled.
  output: process.env.VERCEL ? undefined : 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/skills', destination: '/technology', permanent: true },
      { source: '/services', destination: '/systems', permanent: true },
      { source: '/experience', destination: '/timeline', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};
