import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Recommended for production
  poweredByHeader: false,

  // Security headers are set in middleware.ts
  // Additional headers can be added here if needed
};

// Sentry configuration
const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload source maps for better error tracking
  widenClientFileUpload: true,

  // Automatically tree-shake Sentry logger statements
  disableLogger: true,

  // Hide source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically instrument API routes and server components
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
};

// Only wrap with Sentry if DSN is configured
const config = process.env.SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryConfig)
  : nextConfig;

export default config;
