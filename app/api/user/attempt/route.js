// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const session = await getServerSession();
//     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { questionId, isCorrect, category, attachment, submissionText } = await req.json();
//     const user = await User.findOne({ email: session.user.email });

   
//     if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });


// let progress = user.questionProgress.find(p => p.questionId && p.questionId.toString() === questionId.toString());
// const now = new Date();
// const catKey = category?.toLowerCase();


// const isFirstRealAttempt = !progress || (progress.attachments.length === 0 && progress.attemptsCount === 0);

// if (!progress) {
//     progress = {
//         questionId,
//         status: 'Unattempted',
//         attemptsCount: 0,
//         attachments: []
//     };
//     user.questionProgress.push(progress);
//     // Find it again to get the Mongoose sub-document
//     progress = user.questionProgress[user.questionProgress.length - 1];
// }


// if (progress.attemptsCount === 0) {
//     user.totalAttempted += 1;
//     if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].attempted += 1;
// }


// progress.attemptsCount += 1;
// progress.lastAttempted = now;
// progress.attachments.push(historyEntry);


// if (isCorrect) {
  
//     if (progress.status !== 'Solved') {
//         user.totalCorrect += 1;
//         if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].correct += 1;
//         progress.status = 'Solved';
//     }
// } else {
   
//     if (progress.status !== 'Solved') {
//         progress.status = 'Attempted';
//     }
// }

// user.markModified('questionProgress');
// user.markModified('categoryStats');
// await user.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const session = await getServerSession();
//     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { questionId, isCorrect, category, submissionText } = await req.json();
//     if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

//     const user = await User.findOne({ email: session.user.email });
//     const now = new Date();
//     const catKey = category?.toLowerCase();

//     // 1. DEFINE historyEntry OUTSIDE SO IT IS GLOBALLY ACCESSIBLE IN THIS FUNCTION
//     const historyEntry = {
//       fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
//       uploadedAt: now
//     };

//     let progress = user.questionProgress.find(p => p.questionId && p.questionId.toString() === questionId.toString());

//     // 2. INITIALIZE PROGRESS IF IT DOESN'T EXIST (e.g., first time touching this question)
//     if (!progress) {
//       progress = {
//         questionId,
//         status: 'Unattempted',
//         attemptsCount: 0,
//         attachments: []
//       };
//       user.questionProgress.push(progress);
//       // Get the reference to the newly pushed object
//       progress = user.questionProgress[user.questionProgress.length - 1];
//     }

//     // 3. STATS LOGIC: If attemptsCount is 0, this is the user's first real answer attempt
//     if (progress.attemptsCount === 0) {
//       user.totalAttempted += 1;
//       if (catKey && user.categoryStats[catKey]) {
//         user.categoryStats[catKey].attempted += 1;
//       }
//     }

//     // 4. UPDATE PROGRESS DATA
//     progress.attemptsCount += 1;
//     progress.lastAttempted = now;
//     progress.attachments.push(historyEntry);

//     // 5. STATUS LOGIC
//     if (isCorrect) {
//       // Only increment totalCorrect if they haven't solved it before
//       if (progress.status !== 'Solved') {
//         user.totalCorrect += 1;
//         if (catKey && user.categoryStats[catKey]) {
//           user.categoryStats[catKey].correct += 1;
//         }
//         progress.status = 'Solved';
//       }
//     } else {
//       // If wrong, only set to Attempted if it wasn't already Solved in the past
//       if (progress.status !== 'Solved') {
//         progress.status = 'Attempted';
//       }
//     }

//     // 6. SAVE
//     user.markModified('questionProgress');
//     user.markModified('categoryStats');
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
import Question from "@/models/Question"; // Added this import

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { questionId, isCorrect, submissionText } = await req.json();
    if (!questionId) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const user = await User.findOne({ email: session.user.email });
    
    // 1. FETCH THE QUESTION TO GET THE TRUE CATEGORY
    const questionDoc = await Question.findById(questionId);
    if (!questionDoc) return NextResponse.json({ error: "Question not found" }, { status: 404 });

    // 2. MAP CATEGORY TO YOUR USER SCHEMA KEYS
    // Your Question Schema has: 'Probability', 'Statistics', 'BrainTeasers', 'Finance', 'Coding'
    // Your User Schema has: 'probability', 'brainteaser', 'finance', 'statistics', 'coding'
    const dbCat = questionDoc.category; 
    let catKey = null;

    if (dbCat === 'Probability') catKey = 'probability';
    if (dbCat === 'BrainTeasers') catKey = 'brainteaser'; // Map plural to singular
    if (dbCat === 'Statistics') catKey = 'statistics';
    if (dbCat === 'Finance') catKey = 'finance';
    if (dbCat === 'Coding') catKey = 'coding';

    const now = new Date();
    const historyEntry = {
      fileName: `Answer Submitted: ${submissionText || "Value entered"}`,
      uploadedAt: now
    };

    let progress = user.questionProgress.find(p => p.questionId && p.questionId.toString() === questionId.toString());

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

    // 3. STATS LOGIC: Update attempted counts
    if (progress.attemptsCount === 0) {
      user.totalAttempted += 1;
      // Use catKey to update the specific nested object in UserSchema
      if (catKey && user.categoryStats[catKey]) {
        user.categoryStats[catKey].attempted += 1;
      }
    }

    progress.attemptsCount += 1;
    progress.lastAttempted = now;
    progress.attachments.push(historyEntry);

    // 4. STATUS LOGIC
    if (isCorrect) {
      if (progress.status !== 'Solved') {
        user.totalCorrect += 1;
        if (catKey && user.categoryStats[catKey]) {
          user.categoryStats[catKey].correct += 1;
        }
        progress.status = 'Solved';
      }
    } else {
      if (progress.status !== 'Solved') {
        progress.status = 'Attempted';
      }
    }

    // 5. SAVE WITH EXPLICIT MODIFICATION TAGS
    user.markModified('questionProgress');
    user.markModified('categoryStats');
    
    // Important: mark individual nested objects if they are deeply nested
    if (catKey) {
      user.markModified(`categoryStats.${catKey}`);
    }

    await user.save();

    return NextResponse.json({ success: true, status: progress.status });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}