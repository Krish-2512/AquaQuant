import Link from "next/link";
import { BarChart3, BookPlus, ShieldCheck, Users } from "lucide-react";
import { requireAdminPage } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const navItems = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/questions", label: "Questions", icon: BookPlus },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default async function AdminLayout({ children }) {
  const { session, dbUser } = await requireAdminPage();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-10">
            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3">
              <ShieldCheck size={18} className="text-sky-300" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300">
                Admin Console
              </span>
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tight text-white">
              AQUA Control
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Signed in as {dbUser?.name || session.user.email}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              {session.user.email}
            </p>
          </div>

          <nav className="space-y-3">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:border-sky-400/30 hover:text-white"
              >
                <Icon size={16} className="text-sky-400" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-[24px] border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-400">
              Access Rules
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Only admin-role users or emails listed in <span className="font-semibold text-white">ADMIN_EMAILS</span> can access this area.
            </p>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
