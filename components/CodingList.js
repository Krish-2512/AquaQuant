"use client";
import React from 'react';
import Link from 'next/link';
import { Code2, ChevronRight, Terminal } from 'lucide-react';

export default function CodingList({ questions }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Terminal size={20} className="text-sky-500" />
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
          Engineered_Logic // Coding_Challenges
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {questions.map((q) => (
          <Link 
            key={q._id} 
            href={`/coding/${q._id}`} 
            className="group flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 hover:border-sky-500/40 hover:bg-sky-500/5 rounded-3xl transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-400 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold group-hover:text-sky-400 transition-colors">{q.title}</h4>
                <div className="flex gap-3 mt-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">JS // Python</span>
                  <span className={`text-[9px] font-mono uppercase ${q.difficulty === 'Hard' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}