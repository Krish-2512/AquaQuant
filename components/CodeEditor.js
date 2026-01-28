"use client";
import React from 'react';

export default function CodeEditor({ value, onChange, height = '360px', language, onLanguageChange, languages = [] }) {
  const langColors = {
    javascript: 'bg-yellow-400',
    python: 'bg-green-400',
    cpp: 'bg-sky-400',
    java: 'bg-rose-400',
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/5">
      <div className="flex items-center justify-between px-3 py-2 bg-[#061021] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-mono">Language</div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${langColors[language] || 'bg-slate-400'}`} />

          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
              className="appearance-none bg-[#021620] text-slate-200 text-sm font-mono px-3 py-1.5 rounded-full border border-white/6 pr-8 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              {languages.length > 0
                ? languages.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))
                : (
                  <>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </>
                )}
            </select>

            <svg
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{ height }}
        className="w-full bg-[#0b1220] text-sky-200 font-mono text-sm p-4 outline-none resize-vertical"
      />
    </div>
  );
}
