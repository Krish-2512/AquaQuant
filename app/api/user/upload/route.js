import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Question from "@/models/Question";
import { enforceRateLimit } from "@/lib/rateLimit";
import { buildRequestMeta, logError, logWarn } from "@/lib/logger";

const MAX_FILE_NAME_LENGTH = 200;
const ALLOWED_FILE_EXTENSIONS = [".pdf"];
const ALLOWED_UPLOAD_HOSTS = [
  "res.cloudinary.com",
  "cloudinary.com",
];

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimit = await enforceRateLimit("upload", session.user.email, {
      limit: 10,
      window: "1 m",
    });

    if (!rateLimit.allowed) {
      logWarn(
        "Upload rate limit exceeded",
        buildRequestMeta(req, { userEmail: session.user.email })
      );
      return NextResponse.json(
        { error: "Too many upload requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const { questionId, fileUrl, fileName } = body;
    const safeQuestionId = typeof questionId === "string" ? questionId.trim() : "";
    const safeFileUrl = typeof fileUrl === "string" ? fileUrl.trim() : "";
    const safeFileName = typeof fileName === "string" ? fileName.trim() : "";

    if (!safeQuestionId || !safeFileUrl || !safeFileName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(safeQuestionId)) {
      return NextResponse.json({ error: "Invalid question id" }, { status: 400 });
    }

    if (safeFileName.length > MAX_FILE_NAME_LENGTH) {
      return NextResponse.json({ error: "File name is too long" }, { status: 400 });
    }

    const lowerFileName = safeFileName.toLowerCase();
    if (!ALLOWED_FILE_EXTENSIONS.some((ext) => lowerFileName.endsWith(ext))) {
      return NextResponse.json({ error: "Only PDF uploads are supported" }, { status: 400 });
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(safeFileUrl);
    } catch {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    if (parsedUrl.protocol !== "https:") {
      return NextResponse.json({ error: "File URL must use HTTPS" }, { status: 400 });
    }

    const hasAllowedHost = ALLOWED_UPLOAD_HOSTS.some(
      (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`)
    );

    if (!hasAllowedHost) {
      return NextResponse.json({ error: "Unsupported upload host" }, { status: 400 });
    }

    await dbConnect();

    const normalizedQuestionId = new mongoose.Types.ObjectId(safeQuestionId);
    const questionExists = await Question.collection.findOne(
      { _id: normalizedQuestionId },
      { projection: { _id: 1 } }
    );

    if (!questionExists) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const result = await User.findOneAndUpdate(
      { email: session.user.email, "questionProgress.questionId": normalizedQuestionId },
      { 
        $push: { "questionProgress.$.attachments": { fileName: safeFileName, fileUrl: safeFileUrl } },
      },
      { new: true }
    );

    if (!result) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { 
          $push: { 
            questionProgress: { 
              questionId: normalizedQuestionId,
              status: 'Attempted',
              attachments: [{ fileName: safeFileName, fileUrl: safeFileUrl }] 
            } 
          }
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logError(
      "Upload route failed",
      error,
      buildRequestMeta(req)
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


