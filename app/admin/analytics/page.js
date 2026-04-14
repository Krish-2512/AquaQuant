import { Activity, CalendarDays, Users, UserPlus } from "lucide-react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { requireAdminPage } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function toIstDate(date) {
  return new Date(date.getTime() + IST_OFFSET_MS);
}

function formatIstDay(date) {
  const ist = toIstDate(date);
  const year = ist.getUTCFullYear();
  const month = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const day = String(ist.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getIstDayStartUtc(daysBack = 0) {
  const nowIst = toIstDate(new Date());
  nowIst.setUTCHours(0, 0, 0, 0);
  nowIst.setUTCDate(nowIst.getUTCDate() - daysBack);
  return new Date(nowIst.getTime() - IST_OFFSET_MS);
}

export default async function AdminAnalyticsPage() {
  await requireAdminPage();
  await dbConnect();

  const now = new Date();
  const last14DaysStartUtc = getIstDayStartUtc(13);
  const nextIstDayStartUtc = new Date(getIstDayStartUtc(0).getTime() + 24 * 60 * 60 * 1000);

  const [totalUsers, new7d, new30d, active24h, active7d, active30d, dailySignupsRaw] =
    await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ createdAt: { $gte: daysAgo(7) } }),
      User.countDocuments({ createdAt: { $gte: daysAgo(30) } }),
      User.countDocuments({ lastLoginAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } }),
      User.countDocuments({ lastLoginAt: { $gte: daysAgo(7) } }),
      User.countDocuments({ lastLoginAt: { $gte: daysAgo(30) } }),
      User.aggregate([
        { $match: { createdAt: { $gte: last14DaysStartUtc, $lt: nextIstDayStartUtc } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Kolkata" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

  const dailyMap = new Map(dailySignupsRaw.map((row) => [row._id, row.count]));
  const dailySignups = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(last14DaysStartUtc.getTime() + index * 24 * 60 * 60 * 1000);
    const key = formatIstDay(date);
    return { day: key, count: dailyMap.get(key) || 0 };
  });

  const maxDaily = Math.max(1, ...dailySignups.map((row) => row.count));
  const total14d = dailySignups.reduce((sum, row) => sum + row.count, 0);
  const avg14d = (total14d / 14).toFixed(1);

  const metricCards = [
    { label: "Total Users", value: totalUsers, icon: Users, tone: "sky" },
    { label: "New Users (7d)", value: new7d, icon: UserPlus, tone: "emerald" },
    { label: "New Users (30d)", value: new30d, icon: CalendarDays, tone: "amber" },
    { label: "Active (24h)", value: active24h, icon: Activity, tone: "sky" },
    { label: "Active (7d)", value: active7d, icon: Activity, tone: "emerald" },
    { label: "Active (30d)", value: active30d, icon: Activity, tone: "amber" },
  ];

  const toneStyles = {
    sky: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
          Analytics
        </p>
        <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">
          Growth Console
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Daily signups plus active-user counters. Active users are based on
          <span className="font-semibold text-white"> lastLoginAt</span> (updated when a user signs in).
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {metricCards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className={`mb-5 inline-flex rounded-2xl border p-3 ${toneStyles[tone]}`}>
              <Icon size={20} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-4xl font-black italic text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              Daily Signups
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase italic text-white">
              Last 14 Days
            </h3>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Max/day: {maxDaily}
          </p>
        </div>
        <p className="mb-5 text-xs text-slate-400">
          Last 14 days total: <span className="font-semibold text-white">{total14d}</span> | Avg/day:{" "}
          <span className="font-semibold text-white">{avg14d}</span> (IST)
        </p>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          <div className="grid grid-cols-1 divide-y divide-white/10">
            {dailySignups.map((row) => (
              <div key={row.day} className="grid grid-cols-[110px_1fr_60px] items-center gap-4 bg-black/20 px-5 py-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  {row.day}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${Math.round((row.count / maxDaily) * 100)}%` }}
                  />
                </div>
                <span className="text-right text-sm font-black text-white">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
