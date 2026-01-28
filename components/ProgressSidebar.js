"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Lock, Target, Zap, Loader2 } from 'lucide-react';

export default function ProgressSidebar() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use a timestamp/cache-buster to force fresh data
        const res = await fetch(`/api/user/stats?t=${Date.now()}`); 
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStats(); // Initial fetch
  
    // Listen for the custom event from the Workspace
    window.addEventListener('statsUpdated', fetchStats);
  
    // Clean up listener on unmount
    return () => window.removeEventListener('statsUpdated', fetchStats);
  }, []);

  // 2. Map backend data to your specific UI categories
 // Inside ProgressSidebar component

 // Inside ProgressSidebar component, update the skills array:
const skills = [
  { 
    name: "Probability", 
    current: stats?.probability || 0, // Lowercase
    total: 31, 
    color: "bg-sky-500", 
    glow: "shadow-[0_0_10px_rgba(14,165,233,0.5)]" 
  },
  { 
    name: "Brainteasers", 
    current: stats?.brainteasers || 0, // Lowercase
    total: 24, 
    color: "bg-emerald-500", 
    glow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
  },
  { 
    name: "Statistics", 
    current: stats?.statistics || 0, // Lowercase
    total: 23, 
    color: "bg-indigo-500", 
    glow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
  },
  { 
    name: "Finance", 
    current: stats?.finance || 0, // CHANGED FROM "Finance" to "finance"
    total: 20, 
    color: "bg-amber-500", 
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
  },
];

  return (
    <div className="w-80 bg-[#020617] border-l border-white/5 flex flex-col overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Zap size={18} className={`text-sky-500 ${loading ? 'animate-pulse' : 'fill-sky-500/20'}`} />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Live_Metrics</h2>
          </div>
          {loading && <Loader2 size={12} className="text-slate-600 animate-spin" />}
        </div>

        <div className="space-y-10">
          {skills.map((skill) => {
            const percentage = Math.round((skill.current / skill.total) * 100);
            return (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-sky-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-white opacity-80">
                    {skill.current}/{skill.total}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} ${skill.glow} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.max(percentage, 2)}%` }} // Minimum 2% width so it's visible
                  />
                </div>
              </div>
            );
          })}

          {/* Rank Section */}
          <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-sky-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Target size={40} />
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Rank_Percentile</p>
            <p className="text-2xl font-black text-white tracking-tighter italic">
              {loading ? "CALCULATING..." : "TOP 12.4%"}
            </p>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < 4 ? 'bg-sky-500' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-8 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 text-slate-500 grayscale hover:grayscale-0 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:border-purple-500/50">
            <Lock size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-slate-300">Machine_Learning</span>
        </div>
      </div>
    </div>
  );
}