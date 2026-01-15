// "use client";
// import React, { useState } from 'react';
// import { ChevronLeft, Lightbulb, Send, History, CheckCircle, Code, Maximize2 } from 'lucide-react';

// export default function ProblemWorkspace({ problem }) {
//   const [showHint, setShowHint] = useState(false);
//   const [activeTab, setActiveTab] = useState('Workspace');

//   return (
//     <div className="flex-1 bg-[#020617] flex flex-col h-screen overflow-hidden text-slate-300">
//       {/* Dark Terminal Header */}
//       <nav className="h-14 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
//             <ChevronLeft size={18} />
//           </button>
//           <div className="flex flex-col">
//             <h2 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
//               {problem.title}
//             </h2>
//             <span className="text-[9px] font-black uppercase tracking-widest text-sky-500/80">
//               Quantitative_Analysis // {problem.category || "General"}
//             </span>
//           </div>
//           <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
//             problem.difficulty === 'Hard' 
//             ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' 
//             : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
//           }`}>
//             {problem.difficulty?.toUpperCase()}
//           </span>
//         </div>

//         <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
//           {['Workspace', 'Solution', 'Attempts'].map((t) => (
//             <button
//               key={t}
//               onClick={() => setActiveTab(t)}
//               className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
//                 activeTab === t 
//                 ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
//                 : 'text-slate-500 hover:text-slate-300'
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </nav>

//       <div className="flex-1 overflow-y-auto px-12 py-10 max-w-5xl mx-auto w-full">
//         {/* Question Area */}
//         <section className="mb-12 relative">
//           <div className="absolute -left-8 top-0 text-sky-500/20 font-mono text-5xl">01</div>
//           <p className="text-xl text-slate-100 leading-relaxed font-semibold tracking-tight">
//             {problem.description}
//           </p>
//         </section>

//         {/* Hint Callout */}
//         <div className="mb-12">
//           <button
//             onClick={() => setShowHint(!showHint)}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
//           >
//             <Lightbulb size={16} className={showHint ? "text-yellow-400" : "text-slate-500"} />
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">
//               {showHint ? 'System_Hint_Active' : 'Hint'}
//             </span>
//           </button>
          
//           {showHint && (
//             <div className="mt-4 p-6 bg-sky-500/5 border border-sky-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
//               <p className="text-sm text-sky-200 leading-relaxed font-mono">
//                 <span className="text-sky-500 font-bold mr-2">{">"}</span>
//                 {problem.hint}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Workspace Terminal */}
//         {activeTab === 'Workspace' && (
//           <div className="space-y-8 animate-in fade-in duration-700">
//             <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden focus-within:border-sky-500/50 transition-colors shadow-2xl">
//               <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex gap-1">
//                     <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
//                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
//                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
//                   </div>
//                   <span className="text-[14px] font-mono text-slate-500 ml-4 uppercase tracking-widest">Write-Up</span>
//                 </div>
//                 <Maximize2 size={12} className="text-slate-600" />
//               </div>
//               <textarea
//                 className="w-full h-80 p-8 bg-transparent text-sky-50 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-slate-700"
//                 placeholder="// Type your derivation here..."
//               />
//             </div>

//             {/* Submit Section */}
//             <div className="grid grid-cols-4 gap-4 items-end bg-white/5 p-6 rounded-3xl border border-white/5">
//               <div className="col-span-3">
//                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Scalar_Result_Input</label>
//                 <input
//                   type="text"
//                   placeholder="0.0000"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 font-mono text-2xl text-sky-400 font-bold outline-none focus:border-sky-500/50"
//                 />
//               </div>
//               <button className="h-[64px] bg-sky-500 hover:bg-sky-400 text-white rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] active:scale-95">
//                 <Send size={18} />
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { 
  ChevronLeft, Lightbulb, Send, 
  History, CheckCircle, Code, 
  Maximize2, Save, Check 
} from 'lucide-react';

export default function ProblemWorkspace({ problem }) {
  const router = useRouter(); // 2. Initialize router
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('Workspace');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const handleSaveNotes = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 800);
  };

  return (
    <div className="flex-1 bg-[#020617] flex flex-col h-screen overflow-hidden text-slate-300">
      
      {/* Dark Terminal Header */}
      <nav className="h-14 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          
          {/* 3. FUNCTIONAL BACK BUTTON */}
          <button 
            onClick={() => router.back()} // 4. Triggers navigation back
            className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-sky-400 group active:scale-90"
            title="Go Back"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
              {problem.title}
            </h2>
            <span className="text-[9px] font-black uppercase tracking-widest text-sky-500/80">
              Quantitative_Analysis // {problem.category || "General"}
            </span>
          </div>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
            problem.difficulty === 'Hard' 
            ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' 
            : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
          }`}>
            {problem.difficulty?.toUpperCase()}
          </span>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
          {['Workspace', 'Solution', 'Attempts'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === t 
                ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-12 py-10 max-w-5xl mx-auto w-full">
        {/* Question Area */}
        <section className="mb-12 relative">
          <div className="absolute -left-8 top-0 text-sky-500/20 font-mono text-5xl">01</div>
          <p className="text-xl text-slate-100 leading-relaxed font-semibold tracking-tight">
            {problem.description}
          </p>
        </section>

        {/* Hint Callout */}
        <div className="mb-12">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Lightbulb size={16} className={showHint ? "text-yellow-400" : "text-slate-500"} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">
              {showHint ? 'System_Hint_Active' : 'Hints'}
            </span>
          </button>
          
          {showHint && (
            <div className="mt-4 p-6 bg-sky-500/5 border border-sky-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-sky-200 leading-relaxed font-mono">
                <span className="text-sky-500 font-bold mr-2">{">"}</span>
                {problem.hint}
              </p>
            </div>
          )}
        </div>

        {/* Workspace Terminal */}
        {activeTab === 'Workspace' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden focus-within:border-sky-500/50 transition-colors shadow-2xl relative">
              <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 ml-4 uppercase tracking-widest">Write-Ups</span>
                </div>
                <div className="flex items-center gap-3">
                    {lastSaved && (
                        <span className="text-[9px] font-mono text-emerald-500/60 flex items-center gap-1 animate-pulse">
                            <Check size={10} /> SAVED {lastSaved}
                        </span>
                    )}
                    <Maximize2 size={12} className="text-slate-600" />
                </div>
              </div>
              
              <textarea
                className="w-full h-80 p-8 bg-transparent text-sky-50 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-slate-700"
                placeholder="// Type your derivation here..."
              />

              {/* SAVE BUTTON OVERLAY */}
              <div className="absolute bottom-4 right-6">
                <button 
                   onClick={handleSaveNotes}
                   disabled={isSaving}
                   className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
                >
                  <Save size={14} className={isSaving ? "animate-spin" : "text-sky-500"} />
                  {isSaving ? "Syncing..." : "Save Draft"}
                </button>
              </div>
            </div>

            {/* Submit Section */}
            <div className="grid grid-cols-4 gap-4 items-end bg-white/5 p-6 rounded-3xl border border-white/5">
              <div className="col-span-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Check Your Answer</label>
                <input
                  type="text"
                  placeholder="0.0000"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 font-mono text-2xl text-sky-400 font-bold outline-none focus:border-sky-500/50 transition-all shadow-inner"
                />
              </div>
              <button className="h-[64px] bg-sky-500 hover:bg-sky-400 text-white rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] active:scale-95">
                <Send size={18} />
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}