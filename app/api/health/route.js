import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { getRedis } from "@/lib/redis";
import { getPublicRuntimeSummary } from "@/lib/env";
import { logError } from "@/lib/logger";

export async function GET(req) {
  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: getPublicRuntimeSummary(),
    services: {
      mongodb: { status: "unknown" },
      redis: { status: "unknown" },
    },
  };

  try {
    await dbConnect();
    health.services.mongodb = {
      status: mongoose.connection.readyState === 1 ? "ok" : "degraded",
      readyState: mongoose.connection.readyState,
    };
  } catch (error) {
    health.status = "degraded";
    health.services.mongodb = {
      status: "error",
      error: error.message,
    };
    logError("Health check MongoDB failed", error, { path: req.nextUrl?.pathname });
  }

  try {
    const pong = await getRedis().ping();
    health.services.redis = {
      status: pong ? "ok" : "degraded",
      response: pong,
    };
  } catch (error) {
    health.status = "degraded";
    health.services.redis = {
      status: "error",
      error: error.message,
    };
    logError("Health check Redis failed", error, { path: req.nextUrl?.pathname });
  }

  return NextResponse.json(health, {
    status: health.status === "ok" ? 200 : 503,
  });
}
