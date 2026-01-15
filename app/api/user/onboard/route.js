import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route"; // Adjust path to where your authOptions are
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { university, gradYear, experience } = await req.json();
    await connectDB();

    await User.findByIdAndUpdate(session.user.id, {
      university,
      gradYear,
      experience,
      isOnboarded: true,
    });

    return NextResponse.json({ message: "Onboarding successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}