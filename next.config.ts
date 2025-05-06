import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  
  basePath: '/satyam-ht2023.github.io',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true
};

export default nextConfig;
