/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: '',
  assetPrefix: '',
  images: {
    loader: 'akamai',
    path: '',
  },
  output: 'export',
};

module.exports = nextConfig;
