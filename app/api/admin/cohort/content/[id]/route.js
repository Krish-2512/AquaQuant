import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireAdminApi } from "@/lib/admin";
import dbConnect from "@/lib/dbConnect";
import CohortContent from "@/models/CohortContent";
import { logError } from "@/lib/logger";

export async function PUT(request, { params }) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid content id." }, { status: 400 });
    }

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
    const updated = await CohortContent.findByIdAndUpdate(
      id,
      { week, title, summary, videoUrl, attachments },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Content not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    logError("Admin cohort content update failed", error);
    return NextResponse.json({ success: false, error: "Failed to update content." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid content id." }, { status: 400 });
    }

    await dbConnect();
    const deleted = await CohortContent.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Content not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logError("Admin cohort content delete failed", error);
    return NextResponse.json({ success: false, error: "Failed to delete content." }, { status: 500 });
  }
}
