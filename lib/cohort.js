import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import CohortAccess from "@/models/CohortAccess";
import { getAuthOptions } from "@/lib/auth";
import { logError } from "@/lib/logger";

const COHORT_PORTAL_PATH = "/cohort/portal";
const COHORT_VERIFY_PATH = "/cohort/verify";

function isRedirectError(error) {
  if (!error) return false;
  const digest = typeof error === "object" && error !== null ? error.digest : null;
  return (
    error?.message === "NEXT_REDIRECT" ||
    (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT"))
  );
}

export async function requireCohortPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(COHORT_PORTAL_PATH)}`);
  }

  try {
    await dbConnect();

    const email = session.user.email.toLowerCase();
    const [dbUser, accessEntry] = await Promise.all([
      User.findOne({ email })
        .select("name email image role cohortMember cohortVerifiedAt")
        .lean(),
      CohortAccess.findOne({ email })
        .select("passcodeUpdatedAt")
        .lean(),
    ]);

    const isAdmin = dbUser?.role === "admin";

    if (!isAdmin && !accessEntry) {
      redirect("/cohort");
    }

    if (!isAdmin) {
      const verifiedAt = dbUser?.cohortVerifiedAt ? new Date(dbUser.cohortVerifiedAt) : null;
      const passcodeUpdatedAt = accessEntry?.passcodeUpdatedAt
        ? new Date(accessEntry.passcodeUpdatedAt)
        : null;

      const isVerified =
        Boolean(dbUser?.cohortMember) &&
        Boolean(verifiedAt) &&
        (!passcodeUpdatedAt || verifiedAt >= passcodeUpdatedAt);

      if (!isVerified) {
        redirect(COHORT_VERIFY_PATH);
      }
    }

    const safeUser = dbUser
      ? {
          ...dbUser,
          cohortMember: Boolean(dbUser.cohortMember || isAdmin),
        }
      : null;

    return safeUser;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
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

    const email = session.user.email.toLowerCase();
    const [dbUser, accessEntry] = await Promise.all([
      User.findOne({ email })
        .select("role cohortMember cohortVerifiedAt")
        .lean(),
      CohortAccess.findOne({ email })
        .select("passcodeUpdatedAt")
        .lean(),
    ]);

    const isAdmin = dbUser?.role === "admin";

    if (!isAdmin && !accessEntry) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
      };
    }

    if (!isAdmin) {
      const verifiedAt = dbUser?.cohortVerifiedAt ? new Date(dbUser.cohortVerifiedAt) : null;
      const passcodeUpdatedAt = accessEntry?.passcodeUpdatedAt
        ? new Date(accessEntry.passcodeUpdatedAt)
        : null;

      const isVerified =
        Boolean(dbUser?.cohortMember) &&
        Boolean(verifiedAt) &&
        (!passcodeUpdatedAt || verifiedAt >= passcodeUpdatedAt);

      if (!isVerified) {
        return {
          ok: false,
          response: NextResponse.json(
            { error: "Cohort passcode verification required." },
            { status: 403 }
          ),
        };
      }
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
