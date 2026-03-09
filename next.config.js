/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dci-ev.de',
      },
      {
        protocol: 'https',
        hostname: 'dci-ev.de',
      },
    ],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    WORDPRESS_LANG: process.env.WORDPRESS_LANG,
  },
  transpilePackages: ['sanity', '@sanity/ui', 'next-sanity'],
});

module.exports = nextConfig;
