


// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import dbConnect from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();
//     const session = await getServerSession();
    
//     if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const resolvedParams = await params;
//     const { id } = resolvedParams; 

//     // Find user and select ONLY the progress array to keep it fast
//     const user = await User.findOne({ email: session.user.email }).select('questionProgress');
    
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     // DEBUG LOG: See what the server is actually looking for
//     console.log("Searching for ID:", id);

//     const progress = user.questionProgress.find(p => 
//       p.questionId && p.questionId.toString().toLowerCase() === id.toLowerCase()
//     );

//     // If progress exists, return the attachments, else return an empty array
//     return NextResponse.json({ 
//       success: true, 
//       attachments: progress ? progress.attachments : [],
//       // Bonus: Send the status so the UI knows if it's solved
//       status: progress ? progress.status : 'Unattempted'
//     });

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }



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

    // UPDATE: Select both progress types
    const user = await User.findOne({ email: session.user.email })
      .select('questionProgress codingProgress');
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Look in codingProgress first
    const codingProg = user.codingProgress?.find(p => 
      p.codingQuestionId && p.codingQuestionId.toString() === id
    );

    // Look in standard questionProgress as fallback
    const standardProg = user.questionProgress?.find(p => 
      p.questionId && p.questionId.toString() === id
    );

    return NextResponse.json({ 
      success: true, 
      // Send the coding progress object which contains pastSubmissions
      progress: codingProg || null,
      attachments: standardProg ? standardProg.attachments : [],
      status: (codingProg || standardProg)?.status || 'unattempted'
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}