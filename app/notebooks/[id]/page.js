// "use client";
// import React, { useState, use } from 'react'; // 1. Import 'use'
// import { Upload, FileCode, ExternalLink, ChevronLeft } from 'lucide-react';
// import Link from 'next/link';

// export default function NotebookDetail({ params: paramsPromise }) {
//   // 2. Unwrap the params promise
//   const params = use(paramsPromise); 
//   const id = params.id;

//   const [file, setFile] = useState(null);

//   const handleFileUpload = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (uploadedFile && uploadedFile.name.endsWith('.ipynb')) {
//       setFile(uploadedFile);
//     } else {
//       alert("Please upload a valid .ipynb file");
//     }
//   };

//   const downloadFile = () => {
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = file.name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
//       <div className="max-w-4xl mx-auto">
//         <Link href="/notebooks" className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors mb-8 group">
//           <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
//           <span className="text-xs font-black uppercase tracking-widest">Back_to_Archive</span>
//         </Link>

//         <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10 relative overflow-hidden">
//           <div className="relative z-10">
//             {/* 3. Access the unwrapped ID safely */}
//             <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">
//               Notebook_{id?.replace('-', '_')}
//             </h2>
//             <p className="text-slate-500 font-mono text-xs mb-10 text-sky-500/50 uppercase tracking-[0.2em]">
//               Archive_Path // {id}
//             </p>

//             {!file ? (
//               <div className="border-2 border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center group hover:border-sky-500/50 hover:bg-sky-500/5 transition-all cursor-pointer relative">
//                 <input 
//                   type="file" 
//                   accept=".ipynb" 
//                   onChange={handleFileUpload}
//                   className="absolute inset-0 opacity-0 cursor-pointer" 
//                 />
//                 <Upload size={48} className="text-slate-700 group-hover:text-sky-500 transition-colors mb-4" />
//                 <p className="text-sm font-bold text-slate-400">Drag & Drop or Click to Upload .ipynb</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <FileCode className="text-sky-400" size={32} />
//                     <div>
//                       <p className="text-white font-bold text-sm">{file.name}</p>
//                       <p className="text-[10px] text-sky-500 font-mono">{(file.size / 1024).toFixed(2)} KB</p>
//                     </div>
//                   </div>
//                   <button onClick={() => setFile(null)} className="text-[10px] font-black uppercase text-rose-500 hover:underline">Remove</button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button className="flex items-center justify-center gap-3 bg-white text-black p-4 rounded-2xl font-black uppercase text-xs hover:bg-sky-400 transition-colors">
//                     Preview Data
//                   </button>
//                   <a 
//   href="https://colab.research.google.com/#create=true" 
//   target="_blank"
//   className="flex items-center justify-center gap-3 bg-sky-500 text-white p-4 rounded-2xl font-black uppercase text-xs hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
// >
//   <ExternalLink size={16} />
//   Open in Colab
// </a>
// <button 
//   onClick={downloadFile}
//   className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black uppercase text-xs hover:bg-white/10 transition-all"
// >
//   Download for Upload
// </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, use } from 'react';
import { Upload, FileCode, ExternalLink, ChevronLeft, Database, Lightbulb, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function NotebookDetail({ params: paramsPromise }) {
  const params = use(paramsPromise); 
  const id = params.id;

  const [file, setFile] = useState(null);

  // Dummy Research Prompt based on the ID
  const researchPrompt = {
    title: "Market_Microstructure_Analysis",
    dataset: "LOB_Level3_Sample.csv",
    objective: "Analyze the relationship between order book imbalance and next-tick price movement. Your notebook should implement a simple linear regression to predict mid-price drift.",
    constraints: ["Use Pandas for data cleaning", "Plot the distribution of spreads", "Calculate VWAP for 5-minute intervals"]
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.ipynb')) {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid .ipynb file");
    }
  };

  const downloadFile = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link href="/notebooks" className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors mb-8 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back</span>
        </Link>

        {/* --- DUMMY QUESTION / RESEARCH BRIEF --- */}
        <div className="mb-8 p-8 rounded-[32px] bg-gradient-to-br from-sky-500/10 to-transparent border border-sky-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <Lightbulb size={20} className="text-sky-400" />
            </div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Research_Brief</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              {researchPrompt.objective}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Database size={12} className="text-amber-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Dataset: {researchPrompt.dataset}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <BarChart3 size={12} className="text-emerald-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Task: Statistical Modeling</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-black/40 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Key_Constraints</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {researchPrompt.constraints.map((c, i) => (
                  <li key={i} className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-500 rounded-full" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* UPLOAD SECTION */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">
              Notebook_{id?.replace('-', '_')}
            </h2>
            <p className="text-slate-500 font-mono text-xs mb-10 text-sky-500/50 uppercase tracking-[0.2em]">
              Archive_Path // {id}
            </p>

            {!file ? (
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center group hover:border-sky-500/50 hover:bg-sky-500/5 transition-all cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".ipynb" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <Upload size={48} className="text-slate-700 group-hover:text-sky-500 transition-colors mb-4" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Drag & Drop or Click to Upload .ipynb</p>
                <p className="text-[10px] text-slate-600 mt-2 font-mono">SUBMIT YOUR COMPLETED RESEARCH FILE</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-sky-500 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                        <FileCode className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm tracking-tight">{file.name}</p>
                      <p className="text-[10px] text-sky-500 font-mono uppercase tracking-widest">{(file.size / 1024).toFixed(2)} KB // READY_FOR_ANALYSIS</p>
                    </div>
                  </div>
                  <button onClick={() => setFile(null)} className="px-4 py-2 rounded-lg bg-rose-500/10 text-[10px] font-black uppercase text-rose-500 hover:bg-rose-500 hover:text-white transition-all">Remove</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white text-black p-4 rounded-2xl font-black uppercase text-xs hover:bg-sky-400 hover:scale-[1.02] transition-all">
                    Run Analysis
                  </button>
                  <a 
                    href="https://colab.research.google.com/#create=true" 
                    target="_blank"
                    className="flex items-center justify-center gap-3 bg-sky-500 text-white p-4 rounded-2xl font-black uppercase text-xs hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:scale-[1.02] transition-all"
                  >
                    <ExternalLink size={16} />
                    Open in Colab
                  </a>
                  <button 
                    onClick={downloadFile}
                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black uppercase text-xs hover:bg-white/10 transition-all md:col-span-2"
                  >
                    Download Local Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}