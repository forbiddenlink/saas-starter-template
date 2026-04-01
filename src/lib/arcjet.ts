import arcjet, { shield, detectBot } from "@arcjet/next";

/**
 * Arcjet security client - shared across all API routes.
 */
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
  ],
});
