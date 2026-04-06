import dbConnect from "@/lib/dbConnect";
import CohortContent from "@/models/CohortContent";
import { requireCohortPage } from "@/lib/cohort";
import CohortPortalClient from "@/components/cohort/CohortPortalClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function CohortPortalPage() {
  const dbUser = await requireCohortPage();
  await dbConnect();

  const content = await CohortContent.find({})
    .sort({ createdAt: -1 })
    .lean();

  const normalized = content.map((item) => ({
    id: String(item._id),
    week: item.week,
    title: item.title,
    summary: item.summary || "",
    videoUrl: item.videoUrl || "",
    attachments: item.attachments || [],
    createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A",
  }));

  const safeUser = dbUser
    ? {
        id: dbUser._id ? String(dbUser._id) : "",
        name: dbUser.name || "",
        email: dbUser.email || "",
        image: dbUser.image || "",
        cohortMember: Boolean(dbUser.cohortMember),
        role: dbUser.role || "user",
      }
    : null;

  return <CohortPortalClient initialContent={normalized} user={safeUser} />;
}
