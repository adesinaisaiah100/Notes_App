import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   NOTE: Temporarily disabling TypeScript and ESLint build checks so the project
   can be deployed. Remove these flags and fix underlying errors as soon as
   possible.
  */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
