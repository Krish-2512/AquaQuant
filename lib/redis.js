import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

let redisClient = null;

export function getRedis() {
  if (!redisClient) {
    redisClient = new Redis({
      url: env.upstashRedisRestUrl,
      token: env.upstashRedisRestToken,
    });
  }

  return redisClient;
}
