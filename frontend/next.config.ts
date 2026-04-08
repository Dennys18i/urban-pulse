import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5248",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "openweathermap.org", pathname: "/img/wn/**" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;