import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { requireAdminPage } from "@/lib/admin";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
  await requireAdminPage();
  await dbConnect();

  const limit = 20;
  const [users, total] = await Promise.all([
    User.find({})
      .select("name email image university role totalAttempted totalCorrect questionProgress codingProgress createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
    User.countDocuments({}),
  ]);

  const normalizedUsers = users.map((user) => ({
    id: String(user._id),
    name: user.name || "Anonymous User",
    email: user.email || "",
    university: user.university || "Not Specified",
    role: user.role || "user",
    totalAttempted: user.totalAttempted || 0,
    totalCorrect: user.totalCorrect || 0,
    theorySolved: (user.questionProgress || []).filter((entry) => entry.status === "Solved").length,
    codingSolved: (user.codingProgress || []).filter((entry) => entry.status === "solved").length,
    joinedAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A",
  }));

  return (
    <AdminUsersClient
      initialUsers={normalizedUsers}
      initialPagination={{ total, page: 1, pages: Math.max(1, Math.ceil(total / limit)) }}
    />
  );
}
