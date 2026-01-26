import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    // FIX: Await the params before destructuring
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const question = await Question.findById(id);

    if (!question) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: question });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}