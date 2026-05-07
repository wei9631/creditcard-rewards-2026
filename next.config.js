/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 將原本的 domains 改為 remotePatterns 格式
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // 如果你的本地端使用不同 port，請相應調整
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app', // 使用通配符以支援所有 Vercel 預覽網域
        port: '',
        pathname: '/**',
      },
    ],
  },
  // SEO 友好的重定向
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;