import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import CohortSubmission from "@/models/CohortSubmission";
import { requireCohortApi } from "@/lib/cohort";
import { logError } from "@/lib/logger";

const MAX_FILE_NAME_LENGTH = 200;
const ALLOWED_FILE_EXTENSIONS = [".pdf", ".ppt", ".pptx", ".ipynb", ".doc", ".docx"];
const ALLOWED_UPLOAD_HOSTS = [
  "res.cloudinary.com",
  "cloudinary.com",
];

export async function GET() {
  const access = await requireCohortApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    await dbConnect();
    const submissions = await CohortSubmission.find({ userId: access.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    logError("Cohort submissions fetch failed", error);
    return NextResponse.json({ success: false, error: "Failed to load submissions." }, { status: 500 });
  }
}

export async function POST(request) {
  const access = await requireCohortApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const body = await request.json();
    const contentId = typeof body.contentId === "string" ? body.contentId.trim() : "";
    const fileUrl = typeof body.fileUrl === "string" ? body.fileUrl.trim() : "";
    const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
    const note = typeof body.note === "string" ? body.note.trim() : "";
    const fileType = typeof body.fileType === "string" ? body.fileType.trim() : "file";

    if (!fileUrl || !fileName) {
      return NextResponse.json({ success: false, error: "Missing file details." }, { status: 400 });
    }

    if (fileName.length > MAX_FILE_NAME_LENGTH) {
      return NextResponse.json({ success: false, error: "File name is too long." }, { status: 400 });
    }

    const lowerFileName = fileName.toLowerCase();
    if (!ALLOWED_FILE_EXTENSIONS.some((ext) => lowerFileName.endsWith(ext))) {
      return NextResponse.json({ success: false, error: "Unsupported file type." }, { status: 400 });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(fileUrl);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid file URL." }, { status: 400 });
    }

    if (parsedUrl.protocol !== "https:") {
      return NextResponse.json({ success: false, error: "File URL must use HTTPS." }, { status: 400 });
    }

    const hasAllowedHost = ALLOWED_UPLOAD_HOSTS.some(
      (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`)
    );

    if (!hasAllowedHost) {
      return NextResponse.json({ success: false, error: "Unsupported upload host." }, { status: 400 });
    }

    if (contentId && !mongoose.Types.ObjectId.isValid(contentId)) {
      return NextResponse.json({ success: false, error: "Invalid content id." }, { status: 400 });
    }

    await dbConnect();

    const submission = await CohortSubmission.create({
      contentId: contentId || null,
      userId: access.user._id,
      fileName,
      fileUrl,
      fileType,
      note,
    });

    return NextResponse.json({ success: true, data: submission });
  } catch (error) {
    logError("Cohort submission failed", error);
    return NextResponse.json({ success: false, error: "Failed to submit." }, { status: 500 });
  }
}
