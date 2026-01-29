import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Question from "@/models/Question";

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
    const solvedDocs = await Question.find({ _id: { $in: solvedIds } }).lean();

    const dynamicStats = {
      probability: 0,
      brainteasers: 0,
      statistics: 0,
      finance: 0
    };

    solvedDocs.forEach(doc => {
      // 1. Log the full doc to your terminal to see the actual keys
      console.log("FULL DOC KEYS:", Object.keys(doc));
      
      // 2. Try to find the category regardless of casing
      const rawCat = (doc.category || doc.Category || doc.topic || "").toString().trim();
      console.log("Found Raw Category Value:", rawCat);

      // 3. Robust matching (matches 'BrainTeasers', 'brainteasers', 'brainteaser')
      const cat = rawCat.toLowerCase();
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