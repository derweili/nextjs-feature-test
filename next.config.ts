import type { NextConfig } from "next";

const REDIS_URL = process.env.REDIS_URL;
const IS_DOCKER_BUILD = process.env.DOCKER_BUILD === 'true';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: IS_DOCKER_BUILD ? 'standalone' : undefined,
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
