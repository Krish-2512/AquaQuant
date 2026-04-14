import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { getAuthOptions } from "@/lib/auth";
import CohortAccess from "@/models/CohortAccess";
import User from "@/models/User";
import CohortVerifyClient from "@/components/cohort/CohortVerifyClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function CohortVerifyPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/cohort/verify");
  }

  await dbConnect();

  const email = session.user.email.toLowerCase();
  const entry = await CohortAccess.findOne({ email })
    .select("passcodeUpdatedAt")
    .lean();

  if (!entry) {
    redirect("/cohort");
  }

  const user = await User.findOne({ email })
    .select("role cohortVerifiedAt cohortMember")
    .lean();

  const isAdmin = user?.role === "admin";
  const alreadyVerified =
    isAdmin ||
    (Boolean(user?.cohortMember) &&
      user?.cohortVerifiedAt &&
      (!entry.passcodeUpdatedAt ||
        new Date(user.cohortVerifiedAt) >= new Date(entry.passcodeUpdatedAt)));

  if (alreadyVerified) {
    redirect("/cohort/portal");
  }

  return <CohortVerifyClient email={email} />;
}

