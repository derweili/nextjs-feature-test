import type { NextConfig } from "next";

const REDIS_URL = process.env.REDIS_URL;

const nextConfig: NextConfig = {
  cacheHandlers: REDIS_URL ? {
    default: require.resolve('./cache-handlers/default-handler.mjs'),
    remote: require.resolve('./cache-handlers/default-handler.mjs'),
    // remote: require.resolve('./cache-handlers/remote-handler.js'),
  } : undefined,
  // Added for AWS Amplify compatibility, to make environment variables available during runtime
  env: {
    MOCK_API_BASE_URL: process.env.MOCK_API_BASE_URL,
  },
  // Enable Cache Components (moved from experimental in 16.1.1+)
  cacheComponents: true,
};

export default nextConfig;
