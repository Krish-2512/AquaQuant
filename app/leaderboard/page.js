"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Code2,
  Loader2,
  Sigma,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const rankStyles = {
  Grandmaster: "text-rose-500 border-rose-500/20 bg-rose-500/10",
  Knight: "text-sky-400 border-sky-400/20 bg-sky-400/10",
  Apprentice: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  Junior: "text-slate-400 border-white/10 bg-white/5",
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load leaderboard");
        }

        setLeaders(data.leaderboard || []);
        setCurrentUser(data.currentUser || null);
      } catch (err) {
        setError(err.message || "Unable to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const summary = useMemo(() => {
    const totalUsers = leaders.length;
    const totalAttempted = leaders.reduce((sum, user) => sum + user.totalAttempted, 0);
    const totalSolved = leaders.reduce((sum, user) => sum + user.totalSolved, 0);
    const averageAccuracy = totalUsers
      ? (
          leaders.reduce((sum, user) => sum + user.accuracy, 0) / totalUsers
        ).toFixed(1)
      : "0.0";

    return { totalUsers, totalAttempted, totalSolved, averageAccuracy };
  }, [leaders]);

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-300">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="group mb-8 flex items-center gap-2 text-slate-500 transition-colors hover:text-white"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back_to_Dashboard</span>
        </Link>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-5 flex items-end gap-4">
              <div className="rounded-3xl bg-amber-500 p-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <Trophy size={40} className="text-black" />
              </div>
              <div>
                <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">
                  Live Leaderboard
                </h1>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  Combined Quant + Coding Rankings
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
              Rank is calculated from combined activity across all quant and coding problems.
              We now use real attempted questions, real solved questions, and overall accuracy
              together, so the board reflects actual platform performance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                Active Users
              </p>
              <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">
                {loading ? "--" : summary.totalUsers}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                Total Attempted
              </p>
              <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">
                {loading ? "--" : summary.totalAttempted}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                Total Solved
              </p>
              <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">
                {loading ? "--" : summary.totalSolved}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:col-span-3 lg:col-span-1">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                Avg Accuracy
              </p>
              <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">
                {loading ? "--" : `${summary.averageAccuracy}%`}
              </p>
            </div>
          </div>
        </div>

        {currentUser && (
          <div className="mb-8 rounded-[30px] border border-sky-400/20 bg-sky-500/10 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">
                  Your Position
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase italic tracking-tighter text-white">
                  Rank #{currentUser.rank}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-widest">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
                  Attempted: {currentUser.totalAttempted}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
                  Solved: {currentUser.totalSolved}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
                  Accuracy: {currentUser.accuracy}%
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
                  Score: {currentUser.score}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <span>Global Rankings</span>
            <span>Attempted + Solved + Accuracy</span>
          </div>

          {loading ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-4">
              <Loader2 size={30} className="animate-spin text-sky-400" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
                Syncing leaderboard
              </p>
            </div>
          ) : error ? (
            <div className="p-10 text-center">
              <p className="text-sm font-bold text-rose-400">{error}</p>
            </div>
          ) : leaders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
                No ranked users yet
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {leaders.map((user, index) => (
                <div
                  key={user.id}
                  className="group flex items-center justify-between p-5 transition-all hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-5">
                    <span className={`w-8 text-lg font-black italic ${index < 3 ? "text-amber-500" : "text-slate-700"}`}>
                      {user.rank}
                    </span>

                    <div className="relative">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-sky-500/10 text-sky-300">
                            <Trophy size={18} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black italic tracking-tight text-white transition-colors group-hover:text-sky-400">
                          {user.name}
                        </h3>
                        <span
                          className={`rounded px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border ${rankStyles[user.tier]}`}
                        >
                          {user.tier}
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                        {user.university || "Not Specified"}
                      </p>
                      <p className="mt-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        Quant {user.theorySolved}/{user.theoryAttempted} | Coding {user.codingSolved}/{user.codingAttempted}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-10 md:flex">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Attempted
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <Target size={12} className="text-sky-400" />
                        <span className="text-sm font-mono text-white">{user.totalAttempted}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Solved
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <Sigma size={12} className="text-emerald-400" />
                        <span className="text-sm font-mono text-white">{user.totalSolved}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Accuracy
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <Code2 size={12} className="text-amber-400" />
                        <span className="text-sm font-mono text-white">{user.accuracy}%</span>
                      </div>
                    </div>

                    <div className="min-w-[96px] text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Score
                      </p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <Zap size={14} className="fill-amber-500 text-amber-500" />
                        <span className="text-xl font-black italic text-white">{user.score}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right md:hidden">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rank Score</p>
                    <p className="mt-1 text-lg font-black italic text-white">{user.score}</p>
                    <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      {user.totalAttempted} attempted / {user.totalSolved} solved / {user.accuracy}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
