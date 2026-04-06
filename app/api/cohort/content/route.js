import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CohortContent from "@/models/CohortContent";
import { requireCohortApi } from "@/lib/cohort";
import { logError } from "@/lib/logger";

export async function GET() {
  const access = await requireCohortApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    await dbConnect();
    const content = await CohortContent.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    logError("Cohort content fetch failed", error);
    return NextResponse.json({ success: false, error: "Failed to load content." }, { status: 500 });
  }
}
