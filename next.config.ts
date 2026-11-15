import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // TMDB and YouTube already serve pre-sized images; Vercel optimization only used up the Hobby quota
    unoptimized: true,
  },
};

export default nextConfig;
