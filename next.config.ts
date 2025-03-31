import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
