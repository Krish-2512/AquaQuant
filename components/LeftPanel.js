"use client";
import React from 'react';
import { SlidersHorizontal, Circle, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

export default function LeftPanel({ 
  filterDifficulty, 
  setFilterDifficulty, 
  filterStatus, 
  setFilterStatus 
}) {
  return (
    <aside className="w-64 border-r border-white/5 bg-black/10 h-[calc(100vh-64px)] sticky top-16 p-6 hidden lg:block overflow-y-auto">
      <div className="flex items-center justify-between mb-8 text-sky-400">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Filters</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Difficulty Section */}
        <div>
          <h4 className="text-[13px] font-mono text-slate-500 uppercase tracking-widest mb-4">Difficulty</h4>
          <div className="space-y-2">
            {['All', 'Easy', 'Medium', 'Hard'].map(lvl => (
              <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="diff"
                  className="hidden" 
                  onChange={() => setFilterDifficulty(lvl)} 
                  checked={filterDifficulty === lvl} 
                />
                <div className={`w-3 h-3 rounded-sm border ${filterDifficulty === lvl ? 'bg-sky-400 border-sky-400' : 'border-white/20 group-hover:border-white/40'}`} />
                <span className={`text-xs font-medium transition-colors ${filterDifficulty === lvl ? 'text-white' : 'text-slate-500'}`}>{lvl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Section - Updated UI Logic */}
        <div>
          <h4 className="text-[13px] font-mono text-slate-500 uppercase tracking-widest mb-4">Status</h4>
          <div className="space-y-2">
            {[
              { id: 'All', label: 'All', icon: <RotateCcw size={12}/> },
              { id: 'Solved', label: 'Solved', icon: <CheckCircle2 size={12} className="text-emerald-500"/> },
              { id: 'Attempted', label: 'Attempted', icon: <AlertCircle size={12} className="text-blue-400"/> },
              { id: 'Todo', label: 'Todo', icon: <Circle size={12} className="opacity-20"/> }
            ].map(item => (
              <div 
                key={item.id} 
                onClick={() => setFilterStatus(item.id)}
                className={`flex items-center gap-3 text-xs cursor-pointer transition-colors font-medium ${filterStatus === item.id ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}
              >
                <div className={filterStatus === item.id ? '' : 'opacity-40'}>
                  {item.icon}
                </div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}