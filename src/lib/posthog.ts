"use client";

import posthog from "posthog-js";

let initialized = false;

export function initPostHog(): void {
  if (typeof window === "undefined") return;
  if (initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (!key) {
    console.warn("PostHog key not configured");
    return;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // We'll capture manually for better control
    capture_pageleave: true,
    persistence: "localStorage+cookie",
  });

  initialized = true;
}

export function captureEvent(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export function identifyUser(userId: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  posthog.identify(userId, properties);
}

export function resetUser(): void {
  if (typeof window === "undefined") return;
  posthog.reset();
}

export { posthog };
