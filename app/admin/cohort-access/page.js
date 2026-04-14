import dbConnect from "@/lib/dbConnect";
import { requireAdminPage } from "@/lib/admin";
import CohortAccess from "@/models/CohortAccess";
import AdminCohortAccessClient from "@/components/admin/AdminCohortAccessClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminCohortAccessPage() {
  await requireAdminPage();
  await dbConnect();

  const limit = 20;
  const [items, total] = await Promise.all([
    CohortAccess.find({})
      .select("name email passcode passcodeUpdatedAt createdAt createdBy")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
    CohortAccess.countDocuments({}),
  ]);

  const normalized = items.map((entry) => ({
    id: String(entry._id),
    name: entry.name || "",
    email: entry.email || "",
    passcode: entry.passcode || "",
    passcodeUpdatedAt: entry.passcodeUpdatedAt
      ? new Date(entry.passcodeUpdatedAt).toLocaleString()
      : "N/A",
    createdAt: entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "N/A",
    createdBy: entry.createdBy || "",
  }));

  return (
    <AdminCohortAccessClient
      initialEntries={normalized}
      initialPagination={{ total, page: 1, pages: Math.max(1, Math.ceil(total / limit)) }}
    />
  );
}

