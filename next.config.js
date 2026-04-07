/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/humanizer-app',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
