import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getAuthOptions } from "@/lib/auth";
import User from "@/models/User";

function getAdminEmailSet() {
  return new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function getAdminContext() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    return { session: null, isAdmin: false, dbUser: null };
  }

  const adminEmails = getAdminEmailSet();
  const normalizedEmail = session.user.email.toLowerCase();

  await dbConnect();
  const dbUser = await User.findOne({ email: session.user.email }).select(
    "_id name email image university role totalAttempted totalCorrect createdAt questionProgress codingProgress"
  );

  const isAdmin =
    adminEmails.has(normalizedEmail) || dbUser?.role === "admin";

  return { session, isAdmin, dbUser };
}

export async function requireAdminPage() {
  const context = await getAdminContext();

  if (!context.session) {
    redirect("/auth/signin");
  }

  if (!context.isAdmin) {
    redirect("/dashboard");
  }

  return context;
}

export async function requireAdminApi() {
  const context = await getAdminContext();

  if (!context.session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!context.isAdmin) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, context };
}
