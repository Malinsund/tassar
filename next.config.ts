import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    images: {
      domains: ['firebasestorage.googleapis.com', 'example.com'],
    },
};

export default nextConfig;