// import type { NextConfig } from "next";
// import { hostname } from "os";

// const nextConfig: NextConfig = {
//   images:{
//     formats: ["image/avif", "image/webp"],
//     remotePatterns:[
//       {
//         protocol:"https",
//         hostname:"drive.google.com",
//         pathname: '/uc/**',
//       }
//     ]
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9199', // cần chỉ rõ port nếu dùng
        pathname: '/v0/**',
      }
    ]
  }
};

export default nextConfig;

// import type { NextConfig } from "next";
// import { hostname } from "os";

// const nextConfig: NextConfig = {
//   images:{
//     formats: ["image/avif", "image/webp"],
//     remotePatterns:[
//       {
//         protocol:"https",
//         hostname:"drive.google.com",
//         pathname: '/uc/**',
//       }
//     ]
//   }
// };

// export default nextConfig;


