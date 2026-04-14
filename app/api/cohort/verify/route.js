import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { getAuthOptions } from "@/lib/auth";
import CohortAccess from "@/models/CohortAccess";
import User from "@/models/User";
import { logError } from "@/lib/logger";

export async function POST(request) {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const passcode = typeof body.passcode === "string" ? body.passcode.trim() : "";

    if (!passcode) {
      return NextResponse.json(
        { success: false, error: "Passcode is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const email = session.user.email.toLowerCase();
    const entry = await CohortAccess.findOne({ email })
      .select("passcode passcodeUpdatedAt")
      .lean();

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "Cohort access not enabled for this email." },
        { status: 403 }
      );
    }

    if (String(entry.passcode || "").trim() !== passcode) {
      return NextResponse.json(
        { success: false, error: "Invalid passcode." },
        { status: 400 }
      );
    }

    const now = new Date();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          cohortMember: true,
          cohortVerifiedAt: now,
        },
        $setOnInsert: {
          name: session.user.name || email,
          email,
          image: session.user.image || "",
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .select("email cohortMember cohortVerifiedAt")
      .lean();

    return NextResponse.json({
      success: true,
      cohortMember: Boolean(updatedUser?.cohortMember),
      cohortVerifiedAt: updatedUser?.cohortVerifiedAt
        ? new Date(updatedUser.cohortVerifiedAt).toISOString()
        : null,
      passcodeUpdatedAt: entry.passcodeUpdatedAt
        ? new Date(entry.passcodeUpdatedAt).toISOString()
        : null,
    });
  } catch (error) {
    logError("Cohort passcode verify failed", error, { userEmail: session.user.email });
    return NextResponse.json(
      { success: false, error: "Failed to verify passcode." },
      { status: 500 }
    );
  }
}

