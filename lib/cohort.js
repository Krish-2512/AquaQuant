import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getAuthOptions } from "@/lib/auth";
import { logError } from "@/lib/logger";

const COHORT_PORTAL_PATH = "/cohort/portal";

export async function requireCohortPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(COHORT_PORTAL_PATH)}`);
  }

  try {
    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email })
      .select("name email image role cohortMember")
      .lean();

    const isCohortMember = Boolean(dbUser?.cohortMember || dbUser?.role === "admin");

    if (!isCohortMember) {
      redirect("/cohort");
    }

    return dbUser;
  } catch (error) {
    logError("Cohort page guard failed", error, { userEmail: session.user.email });
    redirect("/cohort");
  }
}

export async function requireCohortApi() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email })
      .select("role cohortMember")
      .lean();

    const isCohortMember = Boolean(dbUser?.cohortMember || dbUser?.role === "admin");

    if (!isCohortMember) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
      };
    }

    return { ok: true, user: dbUser, session };
  } catch (error) {
    logError("Cohort API guard failed", error, { userEmail: session.user.email });
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
}
