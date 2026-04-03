function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  get nodeEnv() {
    return process.env.NODE_ENV || "development";
  },
  get mongodbUri() {
    return requireEnv("MONGODB_URI");
  },
  get googleClientId() {
    return requireEnv("GOOGLE_CLIENT_ID");
  },
  get googleClientSecret() {
    return requireEnv("GOOGLE_CLIENT_SECRET");
  },
  get nextAuthSecret() {
    return requireEnv("NEXTAUTH_SECRET");
  },
  get upstashRedisRestUrl() {
    return requireEnv("UPSTASH_REDIS_REST_URL");
  },
  get upstashRedisRestToken() {
    return requireEnv("UPSTASH_REDIS_REST_TOKEN");
  },
  get judge0ApiKey() {
    return process.env.JUDGE0_API_KEY || "";
  },
  get nextAuthUrl() {
    return process.env.NEXTAUTH_URL || "";
  },
  get adminEmails() {
    return process.env.ADMIN_EMAILS || "";
  },
};

export function getPublicRuntimeSummary() {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    hasMongo: Boolean(process.env.MONGODB_URI),
    hasGoogleAuth: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
    hasRedis: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
    hasJudge0: Boolean(process.env.JUDGE0_API_KEY),
    hasNextAuthUrl: Boolean(process.env.NEXTAUTH_URL),
    hasAdminEmails: Boolean(process.env.ADMIN_EMAILS),
  };
}
