

// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";
// import Question from "@/models/Question"; // Added this import

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const session = await getServerSession();
//     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { questionId, isCorrect, submissionText } = await req.json();
//     if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

//     const user = await User.findOne({ email: session.user.email });
    
//     // 1. FETCH THE QUESTION TO GET THE TRUE CATEGORY
//     const questionDoc = await Question.findById(questionId);
//     if (!questionDoc) return NextResponse.json({ error: "Question not found" }, { status: 404 });

//     // 2. MAP CATEGORY TO YOUR USER SCHEMA KEYS
//     // Your Question Schema has: 'Probability', 'Statistics', 'BrainTeasers', 'Finance', 'Coding'
//     // Your User Schema has: 'probability', 'brainteaser', 'finance', 'statistics', 'coding'
//     const dbCat = questionDoc.category; 
//     let catKey = null;

//     if (dbCat === 'Probability') catKey = 'probability';
//     if (dbCat === 'BrainTeasers') catKey = 'brainteaser'; // Map plural to singular
//     if (dbCat === 'Statistics') catKey = 'statistics';
//     if (dbCat === 'Finance') catKey = 'finance';
//     if (dbCat === 'Coding') catKey = 'coding';

//     const now = new Date();
//     const historyEntry = {
//       fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
//       uploadedAt: now
//     };

//     let progress = user.questionProgress.find(p => p.questionId && p.questionId.toString() === questionId.toString());

//     if (!progress) {
//       progress = {
//         questionId,
//         status: 'Unattempted',
//         attemptsCount: 0,
//         attachments: []
//       };
//       user.questionProgress.push(progress);
//       progress = user.questionProgress[user.questionProgress.length - 1];
//     }

//     // 3. STATS LOGIC: Update attempted counts
//     if (progress.attemptsCount === 0) {
//       user.totalAttempted += 1;
//       // Use catKey to update the specific nested object in UserSchema
//       if (catKey && user.categoryStats[catKey]) {
//         user.categoryStats[catKey].attempted += 1;
//       }
//     }

//     progress.attemptsCount += 1;
//     progress.lastAttempted = now;
//     progress.attachments.push(historyEntry);

//     // 4. STATUS LOGIC
//     if (isCorrect) {
//       if (progress.status !== 'Solved') {
//         user.totalCorrect += 1;
//         if (catKey && user.categoryStats[catKey]) {
//           user.categoryStats[catKey].correct += 1;
//         }
//         progress.status = 'Solved';
//       }
//     } else {
//       if (progress.status !== 'Solved') {
//         progress.status = 'Attempted';
//       }
//     }

//     // 5. SAVE WITH EXPLICIT MODIFICATION TAGS
//     user.markModified('questionProgress');
//     user.markModified('categoryStats');
    
//     // Important: mark individual nested objects if they are deeply nested
//     if (catKey) {
//       user.markModified(`categoryStats.${catKey}`);
//     }

//     await user.save();

//     return NextResponse.json({ success: true, status: progress.status });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Question from "@/models/Question";
import CodingQuestion from "@/models/CodingQuestion"; // Import Coding model

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { questionId, isCorrect, submissionText, submittedCode, language, isCoding } = await req.json();
    if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const user = await User.findOne({ email: session.user.email });
    const now = new Date();

    // --- CASE 1: CODING QUESTION LOGIC ---
    if (isCoding) {
      let progress = user.codingProgress.find(p => p.codingQuestionId?.toString() === questionId.toString());

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

      // Stats: Global and Category
      user.totalAttempted += 1;
      user.categoryStats.coding.attempted += 1;
      
      progress.attemptsCount += 1;
      progress.lastAttempted = now;

      // History Entry
      progress.pastSubmissions.push({
        code: submittedCode,
        language: language || 'javascript',
        isCorrect: isCorrect,
        submittedAt: now
      });

      // Status Logic
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

    // --- CASE 2: STANDARD QUESTION LOGIC (Your Original Code) ---
    const questionDoc = await Question.findById(questionId);
    if (!questionDoc) return NextResponse.json({ error: "Question not found" }, { status: 404 });

    const dbCat = questionDoc.category; 
    let catKey = null;
    if (dbCat === 'Probability') catKey = 'probability';
    if (dbCat === 'BrainTeasers') catKey = 'brainteaser'; 
    if (dbCat === 'Statistics') catKey = 'statistics';
    if (dbCat === 'Finance') catKey = 'finance';

    const historyEntry = {
      fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
      uploadedAt: now
    };

    let progress = user.questionProgress.find(p => p.questionId?.toString() === questionId.toString());

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
    if (catKey) user.markModified(`categoryStats.${catKey}`);

    await user.save();
    return NextResponse.json({ success: true, status: progress.status });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}