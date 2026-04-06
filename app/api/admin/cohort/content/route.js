import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import dbConnect from "@/lib/dbConnect";
import CohortContent from "@/models/CohortContent";
import { logError } from "@/lib/logger";

export async function GET() {
  const access = await requireAdminApi();
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
    logError("Admin cohort content fetch failed", error);
    return NextResponse.json({ success: false, error: "Failed to load content." }, { status: 500 });
  }
}

export async function POST(request) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const body = await request.json();
    const week = typeof body.week === "string" ? body.week.trim() : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const summary = typeof body.summary === "string" ? body.summary.trim() : "";
    const videoUrl = typeof body.videoUrl === "string" ? body.videoUrl.trim() : "";
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    if (!week || !title) {
      return NextResponse.json({ success: false, error: "Week and title are required." }, { status: 400 });
    }

    await dbConnect();
    const created = await CohortContent.create({
      week,
      title,
      summary,
      videoUrl,
      attachments,
      createdBy: access.dbUser?._id,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    logError("Admin cohort content create failed", error);
    return NextResponse.json({ success: false, error: "Failed to create content." }, { status: 500 });
  }
}
