import dbConnect from "@/lib/dbConnect";
import CohortContent from "@/models/CohortContent";
import { requireAdminPage } from "@/lib/admin";
import AdminCohortContentClient from "@/components/admin/AdminCohortContentClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminCohortPage() {
  await requireAdminPage();
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

  return <AdminCohortContentClient initialContent={normalized} />;
}
