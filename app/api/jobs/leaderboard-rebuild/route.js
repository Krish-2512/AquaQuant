import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getCachedLeaderboard } from "@/lib/leaderboard";

function isAuthorized(request) {
  const secret = process.env.LEADERBOARD_REBUILD_SECRET;
  if (!secret) return true;

  const headerSecret = request.headers.get("x-rebuild-secret");
  const urlSecret = new URL(request.url).searchParams.get("secret");
  return secret === headerSecret || secret === urlSecret;
}

async function rebuildLeaderboard(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("leaderboard");
  const leaderboard = await getCachedLeaderboard();

  return NextResponse.json({
    success: true,
    rebuiltAt: new Date().toISOString(),
    count: leaderboard.length,
  });
}

export async function POST(request) {
  return rebuildLeaderboard(request);
}

export async function GET(request) {
  return rebuildLeaderboard(request);
}
