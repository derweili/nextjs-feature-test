import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Added for AWS Amplify compatibility, to make environment variables available during runtime
  env: {
    MOCK_API_BASE_URL: process.env.MOCK_API_BASE_URL,
  },
};

export default nextConfig;
