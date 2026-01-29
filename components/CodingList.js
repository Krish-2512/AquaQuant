





"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, ChevronRight, Terminal, CheckCircle2, 
  Zap, BarChart3, Activity, Search, X, 
  Trophy
} from 'lucide-react';
import { useSession } from "next-auth/react";

export default function CodingList({ questions }) {
  const { data: session } = useSession();
  const [userProgress, setUserProgress] = useState({});
  const [overallCoding, setOverallCoding] = useState({ solved: 0, total: 0 });
  
  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (session) {
      const fetchStatus = async () => {
        try {
          const res = await fetch('/api/user/stats');
          const data = await res.json();
          if (data.success) {
            const mapping = {};
            data.codingProgress?.forEach(p => {
              mapping[p.codingQuestionId] = p.status;
            });
            setUserProgress(mapping);
            if (data.codingStats) {
              setOverallCoding(data.codingStats);
            }
          }
        } catch (e) {
          console.error("Error fetching status", e);
        }
      };
      fetchStatus();
    }
  }, [session]);

  // --- FILTER LOGIC ---
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [questions, searchQuery]);

  const completionPercentage = Math.round((overallCoding.solved / (overallCoding.total || 1)) * 100);

  return (
    <div className="space-y-8">
      {/* --- ENHANCED GLOBAL PROGRESS DASHBOARD --- */}
      <div className="relative overflow-hidden bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20">
                <Terminal size={20} className="text-sky-500 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                  Coding <span className="text-sky-500">Progress</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="flex flex-col items-center sm:items-end order-2 sm:order-1">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">QuESTIONS Completed</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-black text-white tracking-tighter">{completionPercentage}</span>
                  <span className="text-sky-500 font-black text-xl">%</span>
               </div>
            </div>

            <div className="flex-1 w-full sm:w-72 space-y-3 order-1 sm:order-2">
              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[3px]">
                <div 
                  className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-300 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-600 font-bold uppercase">Resolved</span>
                    <span className="text-xs font-mono text-emerald-400">{overallCoding.solved}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-600 font-bold uppercase">Archive</span>
                    <span className="text-xs font-mono text-slate-300">{overallCoding.total}</span>
                  </div>
                </div>
                <BarChart3 size={14} className="text-sky-500/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW SEARCH BAR --- */}
      {/* <div className="relative group max-w-md mx-auto sm:mx-0">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={16} className="text-slate-500 group-focus-within:text-sky-500 transition-colors" />
        </div>
        <input 
          type="text"
          placeholder="SEARCH_ALGORITHMS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-xs font-mono text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white"
          >
            <X size={14} />
          </button>
        )}

        
      </div> */}

<div className="flex flex-col md:flex-row items-center gap-4">
        {/* --- SEARCH BAR --- */}
        <div className="relative group flex-1 w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-500 group-focus-within:text-sky-500 transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="SEARCH_ALGORITHMS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-xs font-mono text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:bg-sky-500/5 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* --- LEADERBOARD QUICK LINK --- */}
        <Link href="/ranks" className="w-full md:w-auto">
          <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 hover:bg-amber-500 hover:text-black transition-all group shadow-[0_0_20px_rgba(245,158,11,0.05)]">
            <Trophy size={16} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global_Rankings</span>
          </button>
        </Link>
      </div>

      {/* --- SECTION DIVIDER --- */}
      <div className="flex items-center gap-4 px-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
          {searchQuery ? `Search_Results (${filteredQuestions.length})` : 'Available_Payloads'}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* --- QUESTIONS GRID --- */}
      <div className="grid grid-cols-1 gap-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const status = userProgress[q._id] || 'unattempted';
            const isSolved = status === 'solved';

            return (
              <Link 
                key={q._id} 
                href={`/coding/${q._id}`} 
                className="group relative flex items-center justify-between p-1 bg-gradient-to-r from-white/5 to-transparent hover:from-sky-500/10 border border-white/5 hover:border-sky-500/30 rounded-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-5 p-4 flex-1">
                  <div className={`relative p-3 rounded-xl transition-all duration-500 ${
                    isSolved ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-500 group-hover:text-sky-400 group-hover:bg-sky-500/10'
                  }`}>
                    <Code2 size={22} />
                    {isSolved && (
                      <div className="absolute -top-1 -right-1 bg-[#020617] rounded-full p-0.5">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight">
                        {q.title}
                      </h4>
                      {q.difficulty === 'Hard' && <Zap size={10} className="text-amber-500 fill-amber-500" />}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border ${
                        q.difficulty === 'Hard' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="w-1 h-1 bg-slate-800 rounded-full" />
                      <span className="text-[9px] font-mono text-slate-500 uppercase">JS // PY // TS</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 flex items-center gap-4">
                   <div className="hidden md:block text-right">
                      <p className={`text-[8px] font-black uppercase tracking-widest ${isSolved ? 'text-emerald-500' : 'text-slate-600'}`}>
                        {isSolved ? 'Verified_Success' : 'Awaiting_Entry'}
                      </p>
                      <p className="text-[7px] font-mono text-slate-700 mt-0.5 tracking-[0.2em]">LOG_STAMP_2026</p>
                   </div>
                   <div className="p-2 rounded-lg bg-white/5 group-hover:bg-sky-500 group-hover:text-black transition-all duration-300">
                      <ChevronRight size={16} />
                   </div>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-sky-500 group-hover:w-1/2 transition-all duration-500 shadow-[0_0_10px_#0ea5e9]" />
              </Link>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/10">
            <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">No_Results_Found_In_Archive</p>
          </div>
        )}
      </div>
    </div>
  );
}