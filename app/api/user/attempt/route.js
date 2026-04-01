import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Question from "@/models/Question";
import CodingQuestion from "@/models/CodingQuestion";
import { enforceRateLimit } from "@/lib/rateLimit";
import { buildRequestMeta, logError, logWarn } from "@/lib/logger";

const ALLOWED_LANGUAGES = new Set(["javascript", "python", "typescript"]);
const MAX_SUBMISSION_TEXT_LENGTH = 5000;
const MAX_SUBMITTED_CODE_LENGTH = 20000;

function getCategoryKey(category) {
  if (category === 'Probability') return 'probability';
  if (category === 'BrainTeasers') return 'brainteaser';
  if (category === 'Statistics') return 'statistics';
  if (category === 'Finance') return 'finance';
  if (category === 'Coding' || category?.toLowerCase?.() === 'coding') return 'coding';
  return null;
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimit = await enforceRateLimit("attempt", session.user.email, {
      limit: 30,
      window: "1 m",
    });

    if (!rateLimit.allowed) {
      logWarn(
        "Submission attempt rate limit exceeded",
        buildRequestMeta(req, { userEmail: session.user.email })
      );
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const questionId = typeof body.questionId === "string" ? body.questionId.trim() : "";
    const isCorrect = typeof body.isCorrect === "boolean" ? body.isCorrect : null;
    const submissionText = typeof body.submissionText === "string" ? body.submissionText.trim() : "";
    const submittedCode = typeof body.submittedCode === "string" ? body.submittedCode : "";
    const language = typeof body.language === "string" ? body.language.trim().toLowerCase() : "javascript";
    const isCoding = Boolean(body.isCoding);

    if (!questionId) {
      return NextResponse.json({ error: "Missing question id." }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return NextResponse.json({ error: "Invalid question id." }, { status: 400 });
    }

    if (isCorrect === null) {
      return NextResponse.json({ error: "Missing correctness flag." }, { status: 400 });
    }

    if (submissionText.length > MAX_SUBMISSION_TEXT_LENGTH) {
      return NextResponse.json({ error: "Submission text is too long." }, { status: 400 });
    }

    if (submittedCode.length > MAX_SUBMITTED_CODE_LENGTH) {
      return NextResponse.json({ error: "Submitted code is too large." }, { status: 400 });
    }

    if (isCoding && !submittedCode.trim()) {
      return NextResponse.json({ error: "Submitted code is required for coding attempts." }, { status: 400 });
    }

    if (isCoding && !ALLOWED_LANGUAGES.has(language)) {
      return NextResponse.json({ error: "Unsupported language." }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const now = new Date();

    if (isCoding) {
      const codingQuestion = await CodingQuestion.findById(questionId).select('_id').lean();
      if (!codingQuestion) {
        return NextResponse.json({ error: "Coding question not found." }, { status: 404 });
      }

      let progress = user.codingProgress.find(
        (entry) => entry.codingQuestionId?.toString() === questionId
      );

      if (!progress) {
        progress = {
          codingQuestionId: questionId,
          status: 'unattempted',
          attemptsCount: 0,
          pastSubmissions: []
        };
        user.codingProgress.push(progress);
        progress = user.codingProgress[user.codingProgress.length - 1];
      }

      user.totalAttempted += 1;
      user.categoryStats.coding.attempted += 1;

      progress.attemptsCount += 1;
      progress.lastAttempted = now;
      progress.pastSubmissions.push({
        code: submittedCode,
        language,
        isCorrect,
        submittedAt: now
      });

      if (isCorrect) {
        if (progress.status !== 'solved') {
          user.totalCorrect += 1;
          user.categoryStats.coding.correct += 1;
          progress.status = 'solved';
        }
      } else if (progress.status !== 'solved') {
        progress.status = 'attempted';
      }

      user.markModified('codingProgress');
      user.markModified('categoryStats.coding');
      await user.save();

      return NextResponse.json({ success: true, status: progress.status });
    }

    const questionDoc = await Question.findById(questionId).select('_id category Category').lean();
    if (!questionDoc) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const catKey = getCategoryKey(questionDoc.category || questionDoc.Category || "");
    const historyEntry = {
      fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
      uploadedAt: now
    };

    let progress = user.questionProgress.find(
      (entry) => entry.questionId?.toString() === questionId
    );

    if (!progress) {
      progress = {
        questionId,
        status: 'Unattempted',
        attemptsCount: 0,
        attachments: []
      };
      user.questionProgress.push(progress);
      progress = user.questionProgress[user.questionProgress.length - 1];
    }

    if (progress.attemptsCount === 0) {
      user.totalAttempted += 1;
      if (catKey && user.categoryStats[catKey]) {
        user.categoryStats[catKey].attempted += 1;
      }
    }

    progress.attemptsCount += 1;
    progress.lastAttempted = now;
    progress.attachments.push(historyEntry);

    if (isCorrect) {
      if (progress.status !== 'Solved') {
        user.totalCorrect += 1;
        if (catKey && user.categoryStats[catKey]) {
          user.categoryStats[catKey].correct += 1;
        }
        progress.status = 'Solved';
      }
    } else if (progress.status !== 'Solved') {
      progress.status = 'Attempted';
    }

    user.markModified('questionProgress');
    user.markModified('categoryStats');
    if (catKey) {
      user.markModified(`categoryStats.${catKey}`);
    }

    await user.save();
    return NextResponse.json({ success: true, status: progress.status });
  } catch (error) {
    logError("User attempt route failed", error, buildRequestMeta(req));
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
