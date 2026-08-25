import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/vlnohbva/image/upload/**",
      },
    ],
  },
  experimental: {
    // H: has slow write latency. Avoid Turbopack's write-heavy persistent
    // development cache; in-memory caching and hot reload remain enabled.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
