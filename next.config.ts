import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com"
      },
      {
        protocol: "https",
        hostname: "fudo-apps-storage.s3.sa-east-1.amazonaws.com"
      }
    ]
  }
};

export default nextConfig;
