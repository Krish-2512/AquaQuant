import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { questionId, isCorrect, category, attachment, submissionText } = await req.json();
    const user = await User.findOne({ email: session.user.email });

    // Defensive check for questionId
    if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    let progress = user.questionProgress.find(p => p.questionId && p.questionId.toString() === questionId.toString());
    const now = new Date();
    const catKey = category?.toLowerCase();

    // Determine the entry for the attachments/history log
    const historyEntry = attachment ? {
      fileName: attachment.fileName,
      fileUrl: attachment.fileUrl,
      uploadedAt: now
    } : {
      fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
      uploadedAt: now
    };

    if (!progress) {
      // --- RULE: FIRST TIME INTERACTION ---
      user.totalAttempted += 1;
      if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].attempted += 1;

      user.questionProgress.push({
        questionId,
        status: isCorrect ? 'Solved' : 'Attempted',
        attemptsCount: 1,
        lastAttempted: now,
        attachments: [historyEntry]
      });

      if (isCorrect) {
        user.totalCorrect += 1;
        if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].correct += 1;
      }
    } else {
      // --- RULE: SUBSEQUENT INTERACTION ---
      progress.attemptsCount += 1;
      progress.lastAttempted = now;
      progress.attachments.push(historyEntry);

      // Only upgrade Attempted -> Solved
      if (isCorrect && progress.status !== 'Solved') {
        progress.status = 'Solved';
        user.totalCorrect += 1;
        if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].correct += 1;
      }
    }

    user.markModified('questionProgress');
    user.markModified('categoryStats');
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}