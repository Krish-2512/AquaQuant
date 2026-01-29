// import { NextResponse } from 'next/server';
// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";

// export async function GET(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);

//     const query = {};
//     const cat = searchParams.get('category');
//     const diff = searchParams.get('difficulty');
//     const stat = searchParams.get('status');
//     const search = searchParams.get('search');

    
//     if (cat && cat !== 'All') query.Category = cat; // Capital C
//     if (diff && diff !== 'All') query.Difficulty = diff; // Capital D
//     if (stat && stat !== 'All') query.Status = stat; // Capital S
//     if (search) query.Title = { $regex: search, $options: 'i' }; // Capital T
    
   
//     const questions = await Question.find(query)
//     // IMPORTANT: Include both PascalCase and camelCase in select 
//     // to ensure the data actually leaves the database
//     .select('Title title Category category Difficulty difficulty Status status CompanyTags companyTags _id')
//     .sort({ CreatedAt: -1, createdAt: -1 });

//   //return NextResponse.json({ success: true, data: questions });

//     return NextResponse.json({ success: true, data: questions });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }


  
// }




// import { NextResponse } from 'next/server';
// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";

// export async function GET(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);

//     // 1. DEFINE PAGINATION VARIABLES (The missing piece)
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = 10;
//     const skip = (page - 1) * limit;

//     const query = {};
//     const cat = searchParams.get('category');
//     const diff = searchParams.get('difficulty');
//     const stat = searchParams.get('status');
//     const search = searchParams.get('search');

//     // Filter Logic
//     if (cat && cat !== 'All') query.Category = cat;
//     if (diff && diff !== 'All') query.Difficulty = diff;
//     if (stat && stat !== 'All') query.Status = stat;
//     if (search) query.Title = { $regex: search, $options: 'i' };

//     // 2. FETCH TOTAL COUNT & PAGINATED DATA
//     const total = await Question.countDocuments(query);
//     const questions = await Question.find(query)
//       .select('Title title Category category Difficulty difficulty Status status CompanyTags companyTags _id')
//       .sort({ CreatedAt: -1, createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     return NextResponse.json({ 
//       success: true, 
//       data: questions,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    // 1. DEFINE PAGINATION VARIABLES
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};
    const cat = searchParams.get('category');
    const diff = searchParams.get('difficulty');
    const stat = searchParams.get('status');
    const search = searchParams.get('search');

    // --- FILTER LOGIC (PascalCase to match your DB) ---
    if (cat && cat !== 'All') query.Category = cat;
    if (diff && diff !== 'All') query.Difficulty = diff;
    if (stat && stat !== 'All') query.Status = stat;

    // --- SEARCH LOGIC (Title OR CompanyTags) ---
    if (search) {
      query.$or = [
        { Title: { $regex: search, $options: 'i' } },
        { CompanyTags: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. FETCH TOTAL COUNT & PAGINATED DATA
    const total = await Question.countDocuments(query);
    
    const questions = await Question.find(query)
      .select('Title Content Category Difficulty Status CompanyTags Answer Solution RelatedTopics CreatedAt _id')
      .sort({ CreatedAt: -1 }) // Matches your schema's timestamp key
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ 
      success: true, 
      data: questions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}