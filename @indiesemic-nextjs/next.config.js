/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Allow external image domains if needed
  images: {
    domains: [],
    unoptimized: true,
  },
};

module.exports = nextConfig;
