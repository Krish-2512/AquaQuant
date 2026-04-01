// const globalStore = globalThis.__rateLimitStore || new Map();

// if (!globalThis.__rateLimitStore) {
//   globalThis.__rateLimitStore = globalStore;
// }

// export function getClientIdentifier(request, fallback = "anonymous") {
//   const forwardedFor = request.headers.get("x-forwarded-for");
//   const realIp = request.headers.get("x-real-ip");
//   const ip = forwardedFor?.split(",")[0]?.trim() || realIp?.trim();

//   return ip || fallback;
// }

// export function enforceRateLimit(key, { windowMs, maxRequests }) {
//   const now = Date.now();
//   const entry = globalStore.get(key);

//   if (!entry || now > entry.resetAt) {
//     globalStore.set(key, {
//       count: 1,
//       resetAt: now + windowMs,
//     });

//     return { allowed: true, remaining: maxRequests - 1 };
//   }

//   if (entry.count >= maxRequests) {
//     return {
//       allowed: false,
//       remaining: 0,
//       retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
//     };
//   }

//   entry.count += 1;
//   return { allowed: true, remaining: maxRequests - entry.count };
// }


import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

const ratelimiters = new Map();

export function getClientIdentifier(request, fallback = "anonymous") {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp?.trim();
  return ip || fallback;
}

function getLimiter(name, limit, window) {
  const key = `${name}:${limit}:${window}`;
  if (!ratelimiters.has(key)) {
    ratelimiters.set(
      key,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, window),
        analytics: true,
        prefix: `ratelimit:${name}`,
      })
    );
  }
  return ratelimiters.get(key);
}

export async function enforceRateLimit(name, identifier, options) {
  const limiter = getLimiter(name, options.limit, options.window);
  const result = await limiter.limit(identifier);

  return {
    allowed: result.success,
    remaining: result.remaining,
    retryAfterSeconds:
      result.reset && result.success === false
        ? Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
        : undefined,
  };
}
