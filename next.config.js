/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure static generation for better performance
  generateBuildId: async () => {
    return 'nuestro-pulso-build'
  },
  // Optimize bundle
  swcMinify: true,
  // Configure static paths
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/chat': { page: '/chat' },
      '/comments': { page: '/comments' },
      '/debate': { page: '/debate' },
      '/news': { page: '/news' },
      '/signin': { page: '/signin' },
      '/survey': { page: '/survey' },
      '/care': { page: '/care' },
      '/404': { page: '/404' },
      '/app': { page: '/app' }
    }
  }
}

module.exports = nextConfig