"use client";
import React, { useState } from 'react';
import { Search, Zap, Target, TrendingUp } from 'lucide-react';

const allCompanies = [
  { name: "Jane Street", count: 124 }, { name: "Citadel", count: 98 },
  { name: "Hudson River", count: 76 }, { name: "Two Sigma", count: 54 },
  { name: "Optiver", count: 42 }, { name: "SIG", count: 31 },
  { name: "Goldman", count: 28 }, { name: "Morgan Stanley", count: 15 }
];

export default function RightPanel() {
  const [tagSearch, setTagSearch] = useState("");

  const filteredCompanies = allCompanies.filter(c => 
    c.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <aside className="w-80 p-6 space-y-6 hidden xl:block">
      
      {/* 1. ENLARGED PROGRESS SECTION */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl">
        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black mb-8">
          Institutional_Progress
        </h4>
        
        <div className="flex flex-col gap-6">
          {/* Bigger Donut Chart */}
          <div className="flex justify-center relative">
            <div 
              className="relative w-32 h-32 rounded-full flex items-center justify-center transition-transform hover:rotate-12 duration-500" 
              style={{ 
                background: `conic-gradient(#f59e0b 0% 33%, #3b82f6 33% 42%, #1e293b 42% 100%)`,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              {/* Inner Hole for Donut Effect */}
              <div className="w-[70%] h-[70%] bg-[#020617] rounded-full flex flex-col items-center justify-center shadow-inner">
                 <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Overall</span>
                 <span className="text-xl font-black text-white italic">33%</span>
              </div>
            </div>
          </div>

          {/* Expanded Stats List */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">Solved</p>
                <p className="text-lg font-mono font-bold text-white">316 <span className="text-slate-600 text-xs italic">/ 956</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Attempted</p>
                <p className="text-lg font-mono font-bold text-white">83</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-emerald-500" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">Accuracy_Score</span>
              </div>
              <span className="text-md font-mono font-black text-emerald-400">79.20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPACT SEARCHABLE COMPANY TAGS (Kept small as requested) */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Company_Tags</h4>
          <TrendingUp size={14} className="text-sky-400" />
        </div>

        <div className="relative mb-4">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input 
            type="text"
            placeholder="Search filters..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-lg py-1.5 pl-8 pr-3 text-[10px] text-white outline-none focus:border-sky-500/30"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
          {filteredCompanies.map((company) => (
            <button key={company.name} className="group flex items-center gap-1.5 bg-white/5 hover:bg-sky-500/10 border border-white/5 hover:border-sky-500/30 px-2 py-1 rounded-md transition-all">
              <span className="text-[9px] font-bold text-slate-400 group-hover:text-white uppercase">
                {company.name}
              </span>
              <span className="text-[8px] font-mono text-slate-600 group-hover:text-sky-400">
                {company.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. DAILY ACTION */}
      <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-2xl group cursor-pointer hover:bg-sky-500/10 transition-all">
        <div className="flex items-center gap-3">
          <Zap size={16} className="text-sky-400" fill="currentColor" />
          <p className="text-[10px] font-black uppercase text-white italic tracking-widest">Daily_Challenge_Active</p>
        </div>
      </div>

    </aside>
  );
}