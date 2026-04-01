import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";
import { normalizeQuestionDoc } from "@/lib/questions";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    // FIX: Await the params before destructuring
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid question id" }, { status: 400 });
    }

    const question = await Question.collection.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!question) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: normalizeQuestionDoc(question) });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
