import { NextResponse } from "next/server";
import { getPublicRuntimeSummary } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: getPublicRuntimeSummary(),
  }, { status: 200 });
}
