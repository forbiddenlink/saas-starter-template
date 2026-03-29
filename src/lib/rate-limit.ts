import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Lazy initialization for Upstash Redis
let _redis: Redis | null = null;
let _ratelimit: Ratelimit | null = null;

function getRedis(): Redis {
  if (!_redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error("Upstash Redis credentials not configured");
    }
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return _redis;
}

export function getRateLimiter(
  requests: number = 10,
  window: `${number} ${"s" | "m" | "h" | "d"}` = "10 s"
): Ratelimit {
  if (!_ratelimit) {
    _ratelimit = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(requests, window),
      analytics: true,
    });
  }
  return _ratelimit;
}

export async function rateLimit(
  identifier: string,
  requests: number = 10,
  window: `${number} ${"s" | "m" | "h" | "d"}` = "10 s"
): Promise<{ success: boolean; response?: NextResponse }> {
  try {
    const limiter = getRateLimiter(requests, window);
    const { success, limit, remaining, reset } = await limiter.limit(identifier);

    if (!success) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        ),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Fail open - allow request if rate limiting fails
    return { success: true };
  }
}
