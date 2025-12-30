/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lc-directus-backend-production.up.railway.app',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
}

module.exports = nextConfig
