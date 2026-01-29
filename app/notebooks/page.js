"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Notebook as NotebookIcon, Calendar, ArrowRight, 
  Lock, Trophy, LayoutDashboard, Sparkles, 
  Home
} from 'lucide-react';

const ARCHIVE_DATA = [
  { id: 'aug-2025', month: 'August', year: '2025', count: 12, status: 'Completed' },
  { id: 'sep-2025', month: 'September', year: '2025', count: 15, status: 'Completed' },
  { id: 'oct-2025', month: 'October', year: '2025', count: 8, status: 'Completed' },
  { id: 'nov-2025', month: 'November', year: '2025', count: 20, status: 'Completed' },
  { id: 'dec-2025', month: 'December', year: '2025', count: 18, status: 'Completed' },
  { id: 'jan-2026', month: 'January', year: '2026', count: 10, status: 'Active' },
  { id: 'feb-2026', month: 'February', year: '2026', count: 0, status: 'Upcoming' },
];

export default function NotebookArchive() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- NAVIGATION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
              <NotebookIcon size={32} className="text-sky-500" />
              Research_Notebooks
            </h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">All Competitions</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 font-black uppercase text-xs hover:bg-white/10 hover:text-white transition-all group">
                <Home size={18} className="group-hover:scale-110 transition-transform text-sky-400" />
                Dashboard
              </button>
            </Link>

            <Link href="/leaderboard">
              <button className="flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 font-black uppercase text-xs hover:bg-amber-500 hover:text-black transition-all group">
                <Trophy size={18} className="group-hover:rotate-12 transition-transform" />
                Global_Ranks
              </button>
            </Link>
          </div>
        </div>

        {/* --- PROBLEM OF THE MONTH PROMO SECTION --- */}
        <div className="relative mb-12 p-1 border-b border-white/5">
           <div className="absolute -top-12 left-0 w-full h-32 bg-sky-500/10 blur-[100px] pointer-events-none" />
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-sky-500/50" />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                <Sparkles size={14} className="text-sky-400 animate-pulse" />
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em]">Problem_Of_The_Month</span>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-sky-500/50 to-transparent" />
           </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVE_DATA.map((item) => (
            <Link 
              key={item.id} 
              href={item.status === 'Upcoming' ? '#' : `/notebooks/${item.id}`}
              className={`group relative p-8 rounded-[32px] border transition-all duration-500 ${
                item.status === 'Upcoming' 
                ? 'bg-white/[0.01] border-white/5 cursor-not-allowed opacity-50' 
                : 'bg-white/[0.03] border-white/10 hover:border-sky-500/50 hover:bg-sky-500/5'
              }`}
            >
              {/* Status Glow (Hidden by default, shows on hover) */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] pointer-events-none ${
                item.status === 'Active' ? 'bg-emerald-500/20' : 'bg-sky-500/20'
              }`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-sky-500/20 transition-colors">
                    <Calendar size={24} className={item.status === 'Upcoming' ? 'text-slate-600' : 'text-sky-400'} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                    item.status === 'Active' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-slate-500 border-white/10'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white italic mb-1">{item.month}</h3>
                <p className="text-slate-500 font-mono text-[10px] mb-6 uppercase tracking-widest">{item.year} // DATA_NODE_{item.id.toUpperCase()}</p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-slate-400">{item.count} Problems</span>
                  {item.status === 'Upcoming' ? (
                    <Lock size={16} className="text-slate-700" />
                  ) : (
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-sky-500" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}