import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
// import { authOptions } from "../auth/[...nextauth]/route"; // If you exported authOptions

export async function POST(req) {
  try {
    const session = await getServerSession();
    const body = await req.json();
    
    // Log this to your terminal to see what is arriving!
    console.log("UPLOAD PAYLOAD:", body);

    const { questionId, fileUrl, fileName } = body;

    if (!questionId || !fileUrl || !fileName) {
      console.log("Validation Failed:", { questionId, fileUrl, fileName });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Update the user progress
    // We use 'arrayFilters' to find and update the specific question inside the array
    const result = await User.findOneAndUpdate(
      { email: session.user.email, "questionProgress.questionId": questionId },
      { 
        $push: { "questionProgress.$.attachments": { fileName, fileUrl } },
        $inc: { totalAttempted: 0 } // Just a dummy update to trigger change
      },
      { new: true }
    );

    // 2. Fallback: If the questionId doesn't exist in progress yet, create it
    if (!result) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        { 
          $push: { 
            questionProgress: { 
              questionId: questionId,
              status: 'Attempted',
              attachments: [{ fileName, fileUrl }] 
            } 
          }
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CRITICAL UPLOAD ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


