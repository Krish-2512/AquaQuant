import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Question from "@/models/Question";
import { normalizeQuestionDoc } from "@/lib/questions";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).select('questionProgress codingProgress totalAttempted totalCorrect').lean();
    if (!user) return NextResponse.json({ success: false, stats: {} });

    const solvedIds = user.questionProgress
      .filter(p => p.status?.toLowerCase() === 'solved')
      .map(p => p.questionId);

    if (solvedIds.length === 0) {
      return NextResponse.json({ success: true, stats: { probability: 0, brainteasers: 0, statistics: 0, finance: 0 } });
    }
    

    // .lean() is KEY here. It returns raw JSON, bypassing schema restrictions.
    const validSolvedIds = solvedIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
    const solvedDocs = validSolvedIds.length
      ? await Question.collection
          .find({ _id: { $in: validSolvedIds.map((id) => new mongoose.Types.ObjectId(id)) } })
          .toArray()
      : [];

    const dynamicStats = {
      probability: 0,
      brainteasers: 0,
      statistics: 0,
      finance: 0
    };

    solvedDocs.forEach(doc => {
      const normalizedDoc = normalizeQuestionDoc(doc);
      const cat = (normalizedDoc?.category || "").toLowerCase();
      if (cat.includes('probabilit')) dynamicStats.probability++;
      else if (cat.includes('brainteaser')) dynamicStats.brainteasers++; 
      else if (cat.includes('statist')) dynamicStats.statistics++;
      else if (cat.includes('finance')) dynamicStats.finance++;
    });
    const codingSolvedCount = user.codingProgress?.filter(p => p.status === 'solved').length || 0;
    const codingTotalCount = user.codingProgress?.length || 0;

    // return NextResponse.json({ success: true, stats: dynamicStats });
    return NextResponse.json({ 
      success: true, 
      stats: dynamicStats, 
      codingStats: {
        solved: codingSolvedCount,
        total: 25
      },
      totalAttempted: user.totalAttempted || 0,
      totalSolved: user.totalCorrect || 0,
      // Optional: Calculate accuracy on the fly
      accuracy: user.totalAttempted > 0 
        ? ((user.totalCorrect / user.totalAttempted) * 100).toFixed(2) 
        : 0
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
