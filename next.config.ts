import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // sản phẩm: Firebase CDN
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',            // CDN dùng cổng mặc định
        pathname: '/**',     // cho phép mọi đường dẫn
      },
      // dev: Storage Emulator
      {
        protocol: 'http',
        hostname: '127.0.0.1',  // hoặc 'localhost'
        port: '9199',
        pathname: '/**',        // cho phép load bất kỳ file nào
      }
    ]
  }
};

export default nextConfig;
