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
};

export function getPublicRuntimeSummary() {
  return {
    nodeEnv: env.nodeEnv,
    hasMongo: Boolean(env.mongodbUri),
    hasGoogleAuth: Boolean(env.googleClientId && env.googleClientSecret),
    hasNextAuthSecret: Boolean(env.nextAuthSecret),
    hasRedis: Boolean(env.upstashRedisRestUrl && env.upstashRedisRestToken),
    hasJudge0: Boolean(env.judge0ApiKey),
    hasNextAuthUrl: Boolean(env.nextAuthUrl),
  };
}
