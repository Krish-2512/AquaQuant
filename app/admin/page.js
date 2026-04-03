import { BarChart3, BookOpen, Code2, Users } from "lucide-react";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";
import CodingQuestion from "@/models/CodingQuestion";
import User from "@/models/User";
import { requireAdminPage } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminOverviewPage() {
  await requireAdminPage();
  await dbConnect();

  const [userCount, questionCount, codingQuestionCount, recentUsers] = await Promise.all([
    User.countDocuments({}),
    Question.countDocuments({}),
    CodingQuestion.countDocuments({}),
    User.find({})
      .select("name email university role createdAt totalAttempted totalCorrect")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  const summaryCards = [
    { label: "Users", value: userCount, icon: Users },
    { label: "Quant Questions", value: questionCount, icon: BookOpen },
    { label: "Coding Questions", value: codingQuestionCount, icon: Code2 },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
          Admin Overview
        </p>
        <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">
          Control Room
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Manage platform content, monitor user growth, and keep the question bank moving without exposing any admin functionality to regular users.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {summaryCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 inline-flex rounded-2xl border border-sky-500/20 bg-sky-500/10 p-3">
              <Icon size={20} className="text-sky-300" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-4xl font-black italic text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-8 flex items-center gap-3">
          <BarChart3 size={18} className="text-sky-400" />
          <h3 className="text-2xl font-black uppercase italic text-white">Recent Users</h3>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-black/20">
              <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">University</th>
                <th className="px-5 py-4">Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentUsers.map((user) => (
                <tr key={String(user._id)} className="bg-white/[0.02] text-sm text-slate-300">
                  <td className="px-5 py-4 font-semibold text-white">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4 uppercase">{user.role || "user"}</td>
                  <td className="px-5 py-4">{user.university || "Not Specified"}</td>
                  <td className="px-5 py-4">{user.totalCorrect || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
