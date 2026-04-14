import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { logError } from "@/lib/logger";

export async function GET(request) {
  const access = await requireAdminApi();
  if (!access.ok) {
    return access.response;
  }

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
            { university: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    await dbConnect();

    const [users, total] = await Promise.all([
      User.find(query)
      .select("name email image university role totalAttempted totalCorrect questionProgress codingProgress createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
      User.countDocuments(query),
    ]);

    const data = users.map((user) => ({
      id: String(user._id),
      name: user.name || "Anonymous User",
      email: user.email || "",
      image: user.image || "",
      university: user.university || "Not Specified",
      role: user.role || "user",
      totalAttempted: user.totalAttempted || 0,
      totalCorrect: user.totalCorrect || 0,
      theorySolved: (user.questionProgress || []).filter((entry) => entry.status === "Solved").length,
      codingSolved: (user.codingProgress || []).filter((entry) => entry.status === "solved").length,
      joinedAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A",
    }));

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page,
        pages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    logError("Admin users fetch failed", error);
    return NextResponse.json({ success: false, error: "Failed to load users." }, { status: 500 });
  }
}
