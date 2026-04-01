function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: requireEnv("MONGODB_URI"),
  googleClientId: requireEnv("GOOGLE_CLIENT_ID"),
  googleClientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
  nextAuthSecret: requireEnv("NEXTAUTH_SECRET"),
  upstashRedisRestUrl: requireEnv("UPSTASH_REDIS_REST_URL"),
  upstashRedisRestToken: requireEnv("UPSTASH_REDIS_REST_TOKEN"),
  judge0ApiKey: process.env.JUDGE0_API_KEY || "",
  nextAuthUrl: process.env.NEXTAUTH_URL || "",
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
