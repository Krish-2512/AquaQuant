import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getCachedLeaderboard } from "@/lib/leaderboard";

export async function GET() {
  try {
    const session = await getServerSession();
    const leaderboard = await getCachedLeaderboard();

    const currentUser =
      session?.user?.email
        ? leaderboard.find((entry) => entry.email === session.user.email) || null
        : null;

    return NextResponse.json({
      success: true,
      leaderboard,
      currentUser,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
