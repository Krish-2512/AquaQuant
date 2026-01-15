"use client";
import { Activity, Lock, Target, Zap } from 'lucide-react';

export default function ProgressSidebar() {
  const skills = [
    { name: "Probability", current: 0, total: 733, color: "bg-sky-500", glow: "shadow-[0_0_10px_rgba(14,165,233,0.5)]" },
    { name: "Brainteasers", current: 0, total: 246, color: "bg-emerald-500", glow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]" },
    { name: "Statistics", current: 0, total: 76, color: "bg-indigo-500", glow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]" },
    { name: "Pure Math", current: 0, total: 60, color: "bg-amber-500", glow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]" },
  ];

  return (
    <div className="w-80 bg-[#020617] border-l border-white/5 flex flex-col overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-sky-500 fill-sky-500/20" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Live_Metrics</h2>
          </div>
        </div>

        <div className="space-y-10">
          {skills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-sky-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-white opacity-80">
                  {Math.round((skill.current / skill.total) * 100)}%
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} ${skill.glow} transition-all duration-1000`}
                  style={{ width: `${(skill.current / skill.total) * 100}%` }}
                />
              </div>
            </div>
          ))}

          <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-sky-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Target size={40} />
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Rank_Percentile</p>
            <p className="text-2xl font-black text-white tracking-tighter italic">TOP 12.4%</p>
            <div className="mt-4 flex gap-1">
              {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-sky-500' : 'bg-white/10'}`} />)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-8 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 text-slate-500 grayscale hover:grayscale-0 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
            <Lock size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Machine_Learning</span>
        </div>
      </div>
    </div>
  );
}