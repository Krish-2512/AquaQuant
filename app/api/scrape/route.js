// import { NextResponse } from 'next/server';
// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";
// //import { scrapeOpenQuant } from "@/services/scraperService";

// export async function GET() {
//   await dbConnect();
  
//   const questions = await scrapeOpenQuant();
  
//   if (questions.length > 0) {
//     // This will insert new questions and skip duplicates if you set up a unique index on 'title'
//     //await Question.insertMany(questions, { ordered: false }).catch(e => console.log("Skipped duplicates"));

//     await Question.insertMany(questions, { ordered: false }).catch(err => {
//         console.log("Note: Some duplicate questions were skipped.");
//       });
//     return NextResponse.json({ success: true, count: questions.length });
//   }
  
//   return NextResponse.json({ success: false, message: "No data found" });
// }



import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";
// Corrected import to the new OpenQuant service
import { scrapeOpenQuant } from "@/services/scraperService";

export async function GET() {
  try {
    await dbConnect();
    
    console.log("🚀 Starting OpenQuant Scraper...");
    const questions = await scrapeOpenQuant();
    
    if (questions && questions.length > 0) {
      console.log(`📦 Attempting to save ${questions.length} detailed questions to MongoDB...`);
      
      let insertedCount = 0;
      let duplicateCount = 0;

      try {
        // ordered: false allows the operation to continue even if some titles are duplicates
        const result = await Question.insertMany(questions, { ordered: false });
        insertedCount = result.length;
      } catch (err) {
        // If duplicates exist, Mongoose throws an error but result is in err.result
        insertedCount = err.result?.nInserted || 0;
        // Total items minus inserted = duplicates
        duplicateCount = questions.length - insertedCount;
        
        console.log(`ℹ️ Batch complete: ${insertedCount} new questions saved.`);
        if (duplicateCount > 0) {
          console.log(`ℹ️ Skipped ${duplicateCount} duplicates already in database.`);
        }
      }

      return NextResponse.json({ 
        success: true, 
        newlyInserted: insertedCount,
        skipped: duplicateCount,
        totalInRequest: questions.length,
        message: "OpenQuant data extraction complete." 
      });
    }
    
    console.log("⚠️ Scraper returned 0 results. Check selectors or site status.");
    return NextResponse.json({ 
      success: false, 
      message: "No data found. Ensure the OpenQuant selectors are correct." 
    }, { status: 404 });

  } catch (error) {
    console.error("❌ API Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}