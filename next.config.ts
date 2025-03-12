import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/authentication",
        destination: "http://183.82.7.208:3002/anyapp/authentication/",
      },
    ];
  },

};

export default nextConfig;
