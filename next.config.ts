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
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  }
};

export default nextConfig;
