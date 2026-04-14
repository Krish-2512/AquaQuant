import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { randomBytes } from "node:crypto";
import { requireAdminApi } from "@/lib/admin";
import dbConnect from "@/lib/dbConnect";
import CohortAccess from "@/models/CohortAccess";
import User from "@/models/User";
import { logError } from "@/lib/logger";

function generatePasscode() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(16);
  let code = "";

  for (let index = 0; index < 16; index += 1) {
    code += charset[bytes[index] % charset.length];
  }

  return code;
}

export async function PATCH(request, { params }) {
  const access = await requireAdminApi();
  if (!access.ok) return access.response;

  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid cohort access id." },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const regenerate = Boolean(body.regenerate);

    const update = {};
    if (typeof name === "string") update.name = name;
    if (regenerate) {
      update.passcode = generatePasscode();
      update.passcodeUpdatedAt = new Date();
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { success: false, error: "No changes provided." },
        { status: 400 }
      );
    }

    await dbConnect();

    const entry = await CohortAccess.findByIdAndUpdate(id, { $set: update }, { new: true })
      .select("name email passcode passcodeUpdatedAt createdAt createdBy")
      .lean();

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "Cohort access entry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: String(entry._id),
        name: entry.name || "",
        email: entry.email || "",
        passcode: entry.passcode || "",
        passcodeUpdatedAt: entry.passcodeUpdatedAt
          ? new Date(entry.passcodeUpdatedAt).toISOString()
          : null,
        createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : null,
        createdBy: entry.createdBy || "",
      },
    });
  } catch (error) {
    logError("Admin cohort access update failed", error, { id });
    return NextResponse.json(
      { success: false, error: "Failed to update cohort access entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const access = await requireAdminApi();
  if (!access.ok) return access.response;

  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid cohort access id." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const entry = await CohortAccess.findByIdAndDelete(id)
      .select("email")
      .lean();

    if (!entry) {
      return NextResponse.json(
        { success: false, error: "Cohort access entry not found." },
        { status: 404 }
      );
    }

    // If the user already exists, remove their cohort access.
    await User.updateOne(
      { email: entry.email },
      { $set: { cohortMember: false }, $unset: { cohortVerifiedAt: "" } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    logError("Admin cohort access delete failed", error, { id });
    return NextResponse.json(
      { success: false, error: "Failed to delete cohort access entry." },
      { status: 500 }
    );
  }
}
