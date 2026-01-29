"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { 
  GraduationCap, Target, Award, BookOpen, 
  TrendingUp, Activity, Zap, ChevronRight, Code2 
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    solved: 0,
    totalQuestions: 123,
    attempted: 0,
    accuracy: 0,
    codingSolved: 0,
    codingTotal: 0,
    categories: { probability: 0, finance: 0, statistics: 0, brainteasers: 0 }
  });

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/user/stats');
      const data = await res.json();
      if (data.success) {
        setStats({
          solved: data.totalSolved || 0,
          totalQuestions: 123, 
          attempted: data.totalAttempted || 0,
          accuracy: data.accuracy || 0,
          codingSolved: data.codingStats?.solved || 0,
          codingTotal: data.codingStats?.total || 0,
          categories: data.stats || { probability: 0, finance: 0, statistics: 0, brainteasers: 0 }
        });
      }
    } catch (err) {
      console.error("Error fetching profile stats:", err);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const codingPerc = Math.round((stats.codingSolved / (stats.codingTotal || 1)) * 100);
  const solvedPercentage = parseFloat(((stats.solved / (stats.totalQuestions || 1)) * 100).toFixed(1));

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP SECTION: HERO & CODING SYNC */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col md:flex-row items-center gap-8 bg-white/[0.03] p-10 rounded-[40px] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12"><GraduationCap size={280} /></div>
            <img src={session?.user?.image} className="w-40 h-40 rounded-[2rem] border-2 border-sky-500/30 shadow-[0_0_50px_rgba(14,165,233,0.15)] object-cover z-10" />
            
            <div className="flex-1 text-center md:text-left z-10">
              <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                {session?.user?.name?.split(' ')[0]} <span className="text-sky-500">.</span> {session?.user?.name?.split(' ')[1] || 'SCHOLAR'}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Code2 size={14} className="text-sky-500" />
                  totalAttempted: {stats.solved}/{stats.attempted}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Activity size={14} className="text-emerald-500" />
                  Status: Optimized
                </div>
              </div>
            </div>
          </div>

          {/* CODING PROGRESS CARD (Specific for Coding) */}
          <div className="bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20 rounded-[40px] p-10 flex flex-col items-center justify-center relative shadow-2xl">
             <div className="absolute top-4 right-6 text-sky-500 opacity-20"><Code2 size={40} /></div>
             <h4 className="absolute top-6 left-8 text-[10px] font-mono text-sky-500 uppercase tracking-[0.2em] font-black">Coding_Mastery</h4>
             
             <div className="text-center">
                <span className="text-6xl font-black text-white italic tracking-tighter">{solvedPercentage}%</span>
                <div className="w-48 h-2 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/10">
                   <div className="h-full bg-sky-500 shadow-[0_0_15px_#0ea5e9]" style={{ width: `${solvedPercentage}%` }} />
                </div>
                <p className="text-[10px] font-mono text-slate-500 mt-4 uppercase tracking-widest">
                  {stats.solved} solved out of {stats.totalQuestions}
                </p>
             </div>
          </div>
        </div>

        {/* MIDDLE SECTION: CORE STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total_Solved", value: stats.solved, icon: Target, color: "text-orange-400" },
            { label: "ProgrammingProblems_Solved", value: stats.codingSolved, icon: Code2, color: "text-sky-400" },
            { label: "Accuracy", value: `${stats.accuracy}%`, icon: Zap, color: "text-emerald-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] p-8 rounded-[32px] border border-white/5 flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-white/5 ${s.color}`}><s.icon size={28} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{s.label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION: CATEGORY BREAKDOWN */}
        <div className="bg-white/[0.03] p-12 rounded-[40px] border border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-12 flex items-center gap-3">
             <Activity size={16} className="text-sky-500" /> Performance Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { name: 'Probability', val: stats.categories.probability, max: 20, color: 'stroke-sky-500' },
              { name: 'Finance', val: stats.categories.finance, max: 15, color: 'stroke-emerald-500' },
              { name: 'Statistics', val: stats.categories.statistics, max: 25, color: 'stroke-purple-500' },
              { name: 'Puzzles', val: stats.categories.brainteasers, max: 10, color: 'stroke-amber-500' },
            ].map(cat => {
              const perc = (cat.val / cat.max) * 100;
              return (
                <div key={cat.name} className="flex flex-col items-center group">
                  <div className="relative w-32 h-32 mb-6">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle 
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364} strokeDashoffset={364 - (364 * perc) / 100}
                        strokeLinecap="round" className={`${cat.color} transition-all duration-1000`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-xl font-black text-white">{cat.val}</span>
                       <span className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">Solved</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">{cat.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}