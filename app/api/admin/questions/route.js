import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";
import { requireAdminApi } from "@/lib/admin";
import { logError } from "@/lib/logger";

function splitCsv(value) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET() {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    await dbConnect();

    const questions = await Question.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    logError("Admin questions fetch failed", error);
    return NextResponse.json({ success: false, error: "Failed to load questions." }, { status: 500 });
  }
}

export async function POST(request) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const body = await request.json();

    const payload = {
      title: body.title?.trim(),
      content: body.content?.trim(),
      category: body.category,
      difficulty: body.difficulty,
      status: body.status,
      answer: body.answer?.trim(),
      solution: body.solution?.trim(),
      companyTags: splitCsv(body.companyTags),
      relatedTopics: splitCsv(body.relatedTopics),
    };

    const requiredFields = ["title", "content", "category", "difficulty", "status", "answer", "solution"];
    const missingField = requiredFields.find((field) => !payload[field]);

    if (missingField) {
      return NextResponse.json(
        { success: false, error: `Missing required field: ${missingField}` },
        { status: 400 }
      );
    }

    await dbConnect();

    const question = await Question.create(payload);

    return NextResponse.json({
      success: true,
      data: {
        _id: question._id,
        title: question.title,
      },
    });
  } catch (error) {
    logError("Admin question creation failed", error);
    return NextResponse.json(
      { success: false, error: error?.code === 11000 ? "Question title already exists." : "Failed to create question." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const body = await request.json();
    const questionId = body.id;

    if (!questionId) {
      return NextResponse.json({ success: false, error: "Question id is required." }, { status: 400 });
    }

    const payload = {
      title: body.title?.trim(),
      content: body.content?.trim(),
      category: body.category,
      difficulty: body.difficulty,
      status: body.status,
      answer: body.answer?.trim(),
      solution: body.solution?.trim(),
      companyTags: splitCsv(body.companyTags),
      relatedTopics: splitCsv(body.relatedTopics),
    };

    await dbConnect();

    const updated = await Question.findByIdAndUpdate(questionId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Question not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    logError("Admin question update failed", error);
    return NextResponse.json(
      { success: false, error: error?.code === 11000 ? "Question title already exists." : "Failed to update question." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("id");

    if (!questionId) {
      return NextResponse.json({ success: false, error: "Question id is required." }, { status: 400 });
    }

    await dbConnect();
    const deleted = await Question.findByIdAndDelete(questionId);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Question not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logError("Admin question delete failed", error);
    return NextResponse.json({ success: false, error: "Failed to delete question." }, { status: 500 });
  }
}
