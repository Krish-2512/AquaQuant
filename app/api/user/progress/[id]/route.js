// export async function POST(req) {
//     try {
//       const session = await getServerSession();
//       if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
//       const { questionId, isCorrect, category, attachment, submissionText } = await req.json();
//       await dbConnect();
  
//       const user = await User.findOne({ email: session.user.email });
//       if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  
//       // 1. Safe ID Comparison
//       let progress = user.questionProgress.find(p => p.questionId.toString() === questionId.toString());
  
//       // 2. Standardize category name to match your Schema (e.g., "Probability")
//       const catKey = category ? category.toLowerCase() : null;
  
//       if (!progress) {
//         // BRAND NEW ATTEMPT
//         user.totalAttempted += 1;
        
//         // Update Category Stats
//         if (catKey && user.categoryStats[catKey]) {
//           user.categoryStats[catKey].attempted += 1;
//         }
  
//         user.questionProgress.push({
//           questionId,
//           status: isCorrect ? 'Solved' : 'Attempted',
//           attemptsCount: 1,
//           attachments: attachment ? [attachment] : [{
//             fileName: `Manual_Submission: ${submissionText || 'No text'}`,
//             uploadedAt: new Date()
//           }]
//         });
  
//         if (isCorrect) {
//           user.totalCorrect += 1;
//           if (catKey && user.categoryStats[catKey]) user.categoryStats[catKey].correct += 1;
//         }
//       } else {
//         // REPEAT ATTEMPT
//         progress.attemptsCount += 1;
//         progress.lastAttempted = new Date();
        
//         if (isCorrect && progress.status !== 'Solved') {
//           progress.status = 'Solved';
//           user.totalCorrect += 1;
//           if (catKey && user.categoryStats[catKey]) {
//               user.categoryStats[catKey].correct += 1;
//           }
//         }
  
//         progress.attachments.push(attachment || {
//           fileName: `Manual_Attempt: ${submissionText || 'No text'}`,
//           uploadedAt: new Date()
//         });
//       }
  
//       // 3. CRITICAL: Tell Mongoose to look inside the array for changes
//       user.markModified('questionProgress');
//       user.markModified('categoryStats');
  
//       await user.save();
//       return NextResponse.json({ success: true });
  
//     } catch (error) {
//       console.error("Submission Error:", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//   }


import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession();
    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resolvedParams = await params;
    const { id } = resolvedParams; 

    // Find user and select ONLY the progress array to keep it fast
    const user = await User.findOne({ email: session.user.email }).select('questionProgress');
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // DEBUG LOG: See what the server is actually looking for
    console.log("Searching for ID:", id);

    const progress = user.questionProgress.find(p => 
      p.questionId && p.questionId.toString().toLowerCase() === id.toLowerCase()
    );

    // If progress exists, return the attachments, else return an empty array
    return NextResponse.json({ 
      success: true, 
      attachments: progress ? progress.attachments : [],
      // Bonus: Send the status so the UI knows if it's solved
      status: progress ? progress.status : 'Unattempted'
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}