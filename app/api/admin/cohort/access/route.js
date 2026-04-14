import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { randomBytes } from "node:crypto";
import { requireAdminApi } from "@/lib/admin";
import dbConnect from "@/lib/dbConnect";
import CohortAccess from "@/models/CohortAccess";
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

export async function GET(request) {
  const access = await requireAdminApi();
  if (!access.ok) return access.response;

  try {
    const requestUrl = new URL(request.url);
    const search = requestUrl.searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(requestUrl.searchParams.get("page") || "1", 10));
    const limit = 20;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    await dbConnect();

    const [items, total] = await Promise.all([
      CohortAccess.find(query)
        .select("name email passcode passcodeUpdatedAt createdAt updatedAt createdBy")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CohortAccess.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: items.map((entry) => ({
        id: String(entry._id),
        name: entry.name || "",
        email: entry.email || "",
        passcode: entry.passcode || "",
        passcodeUpdatedAt: entry.passcodeUpdatedAt
          ? new Date(entry.passcodeUpdatedAt).toISOString()
          : null,
        createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : null,
        createdBy: entry.createdBy || "",
      })),
      pagination: {
        total,
        page,
        pages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    logError("Admin cohort access fetch failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to load cohort access list." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const access = await requireAdminApi();
  if (!access.ok) return access.response;

  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    const passcode = generatePasscode();

    await dbConnect();

    const createdBy = access.context?.session?.user?.email || "";
    const entry = await CohortAccess.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          passcode,
          passcodeUpdatedAt: new Date(),
          createdBy,
        },
      },
      { upsert: true, new: true }
    ).lean();

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
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: "Invalid cohort access payload." },
        { status: 400 }
      );
    }

    logError("Admin cohort access create failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to create cohort access entry." },
      { status: 500 }
    );
  }
}
