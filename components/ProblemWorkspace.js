


// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   ChevronLeft, Lightbulb, Send, 
//   Maximize2, Save, Check, Circle,CheckCircle
// } from 'lucide-react';

// // LATEX IMPORTS
// import ReactMarkdown from 'react-markdown';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import 'katex/dist/katex.min.css';

// export default function ProblemWorkspace({ problem }) {
//   const router = useRouter();
//   const [showHint, setShowHint] = useState(false);
//   const [activeTab, setActiveTab] = useState('Workspace');
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSaved, setLastSaved] = useState(null);

//   const handleSaveNotes = () => {
//     setIsSaving(true);
//     setTimeout(() => {
//       setIsSaving(false);
//       setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     }, 800);
//   };

//   // Difficulty Style Helper
//   const getDiffStyle = (diff) => {
//     if (diff === 'Hard') return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
//     if (diff === 'Medium') return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
//     return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
//   };

//   return (
//     <div className="flex-1 bg-[#020617] flex flex-col h-screen overflow-hidden text-slate-300">
      
//       {/* Dark Terminal Header */}
//       <nav className="h-14 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => router.back()} 
//             className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-sky-400 group active:scale-90"
//             title="Go Back"
//           >
//             <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
//           </button>

//           <div className="flex flex-col">
//             <h2 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
//               {problem.title}
//             </h2>
//             <span className="text-[9px] font-black uppercase tracking-widest text-sky-500/80">
//               Quantitative_Analysis // {problem.category || "General"}
//             </span>
//           </div>
//           <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${getDiffStyle(problem.difficulty)}`}>
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
        
//         {/* Question Area with LaTeX Support */}
//         <section className="mb-12 relative">
//           <div className="absolute -left-8 top-0 text-sky-500/20 font-mono text-5xl">01</div>
//           <div className="prose prose-invert prose-slate max-w-none text-xl text-slate-100 leading-relaxed font-semibold tracking-tight">
//             <ReactMarkdown 
//               remarkPlugins={[remarkMath]} 
//               rehypePlugins={[rehypeKatex]}
//             >
//               {problem.description}
//             </ReactMarkdown>
//           </div>
//         </section>

//         {/* Hint Callout */}
//         <div className="mb-12">
//           <button
//             onClick={() => setShowHint(!showHint)}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
//           >
//             <Lightbulb size={16} className={showHint ? "text-yellow-400" : "text-slate-500"} />
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">
//               {showHint ? 'System_Hint_Active' : 'Hints'}
//             </span>
//           </button>
          
//           {showHint && (
//             <div className="mt-4 p-6 bg-sky-500/5 border border-sky-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
//               <div className="text-sm text-sky-200 leading-relaxed font-mono">
//                 <span className="text-sky-500 font-bold mr-2">{">"}</span>
//                 <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
//                   {problem.hint}
//                 </ReactMarkdown>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Tabs Content */}
//         {activeTab === 'Workspace' && (
//           <div className="space-y-8 animate-in fade-in duration-700">
//             <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden focus-within:border-sky-500/50 transition-colors shadow-2xl relative">
//               <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex gap-1">
//                     <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
//                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
//                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
//                   </div>
//                   <span className="text-[10px] font-mono text-slate-500 ml-4 uppercase tracking-widest">Scratchpad.sh</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     {lastSaved && (
//                         <span className="text-[9px] font-mono text-emerald-500/60 flex items-center gap-1 animate-pulse">
//                             <Check size={10} /> SYNCED_{lastSaved}
//                         </span>
//                     )}
//                     <Maximize2 size={12} className="text-slate-600" />
//                 </div>
//               </div>
              
//               <textarea
//                 className="w-full h-80 p-8 bg-transparent text-sky-50 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-slate-700"
//                 placeholder="// Derivations go here... Example: E[X] = Σ x * P(x)"
//               />

//               <div className="absolute bottom-4 right-6">
//                 <button 
//                     onClick={handleSaveNotes}
//                     disabled={isSaving}
//                     className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
//                 >
//                   <Save size={14} className={isSaving ? "animate-spin" : "text-sky-500"} />
//                   {isSaving ? "Syncing..." : "Save Draft"}
//                 </button>
//               </div>
//             </div>

//             {/* Answer Check Area */}
//             <div className="grid grid-cols-4 gap-4 items-end bg-white/5 p-6 rounded-3xl border border-white/5">
//               <div className="col-span-3">
//                 <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Check Final Scalar</label>
//                 <input
//                   type="text"
//                   placeholder="Enter value..."
//                   className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 font-mono text-2xl text-sky-400 font-bold outline-none focus:border-sky-500/50 transition-all shadow-inner"
//                 />
//               </div>
//               <button className="h-[64px] bg-sky-500 hover:bg-sky-400 text-white rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] active:scale-95">
//                 <Send size={18} />
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Solution Tab with LaTeX Rendering */}
//         {activeTab === 'Solution' && (
//   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
//     {/* Solution Header Card */}
//     <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-emerald-500/20 rounded-lg">
//           <CheckCircle className="text-emerald-400" size={20} />
//         </div>
//         <div>
//           <h3 className="text-white text-sm font-bold leading-none">Official_Derivation</h3>
//           <p className="text-[10px] text-emerald-500/70 font-mono uppercase tracking-tighter mt-1">Status: Verified Accuracy</p>
//         </div>
//       </div>
//       <button 
//         onClick={() => navigator.clipboard.writeText(problem.solution)}
//         className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
//       >
//         Copy
//       </button>
//     </div>

//     {/* Main Solution Content */}
//     <div className="relative group">
//       {/* Decorative vertical line */}
//       <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/10 to-transparent" />
      
//       <div className="pl-8 prose prose-invert prose-emerald max-w-none">
//         <ReactMarkdown 
//           remarkPlugins={[remarkMath]} 
//           rehypePlugins={[rehypeKatex]}
//           components={{
//             // This custom renderer makes $LaTeX$ blocks look amazing
//             p: ({children}) => <p className="text-slate-300 leading-relaxed mb-6 text-lg">{children}</p>,
//             code: ({children}) => <code className="bg-black/40 px-1.5 py-0.5 rounded text-sky-400 font-mono">{children}</code>
//           }}
//         >
//           {problem.solution}
//         </ReactMarkdown>
//       </div>
//     </div>

// <div className="mt-8 pt-8 border-t border-white/5">
//   <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
//     <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
//       Related_Concepts
//     </h4>
//     <div className="flex flex-wrap gap-2">
//       {problem.relatedTopics && problem.relatedTopics.length > 0 ? (
//         // Check if it's a string (e.g. "Normal Dist, Sums") and split it, or if it's already an array
//         (Array.isArray(problem.relatedTopics) 
//           ? problem.relatedTopics 
//           : problem.relatedTopics.split(',')
//         ).map((topic, index) => (
//           <span 
//             key={index} 
//             className="px-3 py-1.5 bg-sky-500/5 hover:bg-sky-500/10 rounded-lg text-[10px] font-bold text-sky-400/80 border border-sky-500/20 transition-colors"
//           >
//             # {topic.trim()}
//           </span>
//         ))
//       ) : (
//         <span className="text-[10px] text-slate-600 italic">No concepts tagged in database.</span>
//       )}
//     </div>
//   </div>
// </div>
//   </div>
// )}

//         {activeTab === 'Attempts' && (
//            <div className="flex flex-col items-center justify-center py-20 opacity-30">
//               <History size={48} className="mb-4" />
//               <p className="font-mono text-xs uppercase tracking-widest">No previous logs found</p>
//            </div>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Lightbulb, Send, 
  Maximize2, Save, Check, Circle, 
  CheckCircle, Paperclip, Loader2, FileText, History, X
} from 'lucide-react';

// LATEX IMPORTS
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function ProblemWorkspace({ problem }) {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState('Workspace');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
  const [userAttachments, setUserAttachments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchAttachments = async () => {
    // Try prop, then try URL as fallback
    const pathSegments = window.location.pathname.split('/');
    const idFromUrl = pathSegments[pathSegments.length - 1];
    const id = problem?._id || problem?.id || idFromUrl;
  
    if (!id || id === 'problems') return; 
  
    try {
      const res = await fetch(`/api/user/progress/${id}`);
      const data = await res.json();
      if (data.success) {
        setUserAttachments(data.attachments || []);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [problem]);

  // --- 2. CLOUDINARY UPLOAD LOGIC ---
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Aqua_DB'); 
  
      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/doji8a97y/upload`,  {
        method: 'POST',
        body: formData
      });
      
      const cloudData = await cloudRes.json();
      const pathSegments = window.location.pathname.split('/');
      const idFromUrl = pathSegments[pathSegments.length - 1];

      const payload = {
        questionId: problem._id || problem.id || idFromUrl, 
        fileUrl: cloudData.secure_url,
        fileName: file.name
      };

      const saveRes = await fetch('/api/user/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (saveRes.ok) {
        alert("Success! Artifact archived.");
        fetchAttachments(); 
      } else {
        const errorData = await saveRes.json();
        alert(`Database error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveNotes = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 800);
  };

  // const handleCheckAnswer = async () => {
  //   const systemAnswer = String(problem.answer || "").trim().toLowerCase();
  //   const userInput = String(userAnswer || "").trim().toLowerCase();
  //   const isCorrect = systemAnswer === userInput;
    
  //   setIsCorrect(isCorrect);
  
  //   // Sync with Database
  //   try {
  //     await fetch('/api/user/attempt', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         questionId: problem._id || problem.id,
  //         isCorrect: isCorrect,
  //         category: problem.category,
  //         // We send a text-based "artifact" for the attempt log
  //         submissionText: userInput 
  //       })
  //     });
      
  //     // Refresh the attachments/attempts list so the new one shows up
  //     fetchAttachments(); 
  //   } catch (err) {
  //     console.error("Failed to sync progress:", err);
  //   }
  // };


  // const handleCheckAnswer = async () => {
  //   // 1. Calculate the result
  //   const systemAnswer = String(problem.answer || "").trim().toLowerCase();
  //   const userInput = String(userAnswer || "").trim().toLowerCase();
  //   const correctStatus = systemAnswer === userInput;
    
  //   setIsCorrect(correctStatus);
  
  //   try {
  //     const res = await fetch('/api/user/attempt', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         questionId: problem._id,
  //         isCorrect: correctStatus, // Send the actual result!
  //         category: problem.category,
  //         submissionText: userAnswer // This logs the answer in your history
  //       })
  //     });
  
  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log("Sync Success:", data);
  //       fetchAttachments(); // Refresh history tab to show the new attempt
  //     } else {
  //       const errorText = await res.text();
  //       console.error("Server error:", errorText);
  //     }
  //   } catch (err) {
  //     console.error("Network Error:", err);
  //   }
  // };
  

  // --- Inside ProblemWorkspace Component ---

const handleCheckAnswer = async () => {
  if (!userAnswer.trim()) return;

  // FIX: Identify the ID safely
  const qId = problem?._id || problem?.id;
  if (!qId) {
    console.error("Critical Error: Question ID is missing from problem object");
    return;
  }

  const systemAnswer = String(problem.answer || "").trim().toLowerCase();
  const userInput = String(userAnswer || "").trim().toLowerCase();
  const correct = systemAnswer === userInput;
  
  setIsCorrect(correct);

  try {
    const res = await fetch('/api/user/attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: qId, // Use the safe qId
        isCorrect: correct,
        category: problem.category,
        submissionText: userAnswer
      })
    });

    if (!res.ok) {
      const errorText = await res.text(); 
      console.error(`Attempt Sync Failed: ${errorText}`);
      return;
    }

    const data = await res.json();
    if (data.success) {
      fetchAttachments(); // Refresh the history list
    }
  } catch (err) {
    console.error("Network Error during check:", err);
  }
};


  const getDiffStyle = (diff) => {
    if (diff === 'Hard') return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
    if (diff === 'Medium') return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
    return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
  };

  return (
    <div className="flex-1 bg-[#020617] flex flex-col h-screen overflow-hidden text-slate-300">
      
      {/* Dark Terminal Header */}
      <nav className="h-14 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-sky-400 group active:scale-90" title="Go Back">
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white tracking-tight leading-none mb-1">{problem.title}</h2>
            <span className="text-[9px] font-black uppercase tracking-widest text-sky-500/80">Quantitative_Analysis // {problem.category || "General"}</span>
          </div>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${getDiffStyle(problem.difficulty)}`}>
            {problem.difficulty?.toUpperCase()}
          </span>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
          {['Workspace', 'Solution', 'Attempts'].map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === t ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-12 py-10 max-w-5xl mx-auto w-full">
        
        {/* Question Area */}
        <section className="mb-12 relative">
          <div className="absolute -left-8 top-0 text-sky-500/20 font-mono text-5xl">01</div>
          <div className="prose prose-invert prose-slate max-w-none text-xl text-slate-100 leading-relaxed font-semibold tracking-tight">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{problem.description}</ReactMarkdown>
          </div>
        </section>

        {/* Hint Callout */}
        <div className="mb-12">
          <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
            <Lightbulb size={16} className={showHint ? "text-yellow-400" : "text-slate-500"} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white">
              {showHint ? 'System_Hint_Active' : 'Hints'}
            </span>
          </button>
          {showHint && (
            <div className="mt-4 p-6 bg-sky-500/5 border border-sky-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <div className="text-sm text-sky-200 leading-relaxed font-mono">
                <span className="text-sky-500 font-bold mr-2">{">"}</span>
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{problem.hint}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Workspace Tab */}
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
                  <span className="text-[10px] font-mono text-slate-500 ml-4 uppercase tracking-widest">Scratchpad.sh</span>
                </div>
                <div className="flex items-center gap-3">
                    {lastSaved && (
                        <span className="text-[9px] font-mono text-emerald-500/60 flex items-center gap-1 animate-pulse">
                            <Check size={10} /> SYNCED_{lastSaved}
                        </span>
                    )}
                    <Maximize2 size={12} className="text-slate-600" />
                </div>
              </div>
              <textarea className="w-full h-80 p-8 bg-transparent text-sky-50 font-mono text-sm leading-relaxed outline-none resize-none placeholder:text-slate-700" placeholder="// Derivations go here... Example: E[X] = Σ x * P(x)" />

              <div className="absolute bottom-4 right-6 flex gap-3">
                {/* PDF Upload Button */}
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  {isUploading ? <Loader2 size={14} className="animate-spin text-purple-400" /> : <Paperclip size={14} className="text-purple-400" />}
                  {isUploading ? "Uploading..." : "Attach_PDF"}
                  <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
                </label>

                <button onClick={handleSaveNotes} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50">
                  <Save size={14} className={isSaving ? "animate-spin" : "text-sky-500"} />
                  {isSaving ? "Syncing..." : "Save Draft"}
                </button>
              </div>
            </div>

           {/* Answer Check Area */}
<div className="grid grid-cols-4 gap-4 items-end bg-white/5 p-6 rounded-3xl border border-white/5">
  <div className="col-span-3">
    <div className="flex justify-between mb-3">
      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
        Check Final Scalar
      </label>
      {isCorrect === true && (
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
          Correct_Result_Detected
        </span>
      )}
      {isCorrect === false && (
        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
          Deviation_Detected // Try_Again
        </span>
      )}
    </div>
    <input
      type="text"
      value={userAnswer}
      onChange={(e) => {
        setUserAnswer(e.target.value);
        setIsCorrect(null); // Reset feedback when they start typing again
      }}
      placeholder="Enter value..."
      className={`w-full bg-black/40 border rounded-xl px-6 py-4 font-mono text-2xl outline-none transition-all shadow-inner ${
        isCorrect === true ? 'border-emerald-500 text-emerald-400' : 
        isCorrect === false ? 'border-rose-500 text-rose-400' : 
        'border-white/10 text-sky-400 focus:border-sky-500/50'
      }`}
    />
  </div>
  <button 
   
    onClick=
    
    {handleCheckAnswer}
  
    className={`
      h-[64px] rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all 
      ${isCorrect === null ? 'active:scale-95' : ''}
      ${isCorrect === true 
        ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-default' 
        : isCorrect === false
          ? 'bg-rose-500 text-white animate-shake shadow-[0_0_30px_rgba(244,63,94,0.3)]'
          : 'bg-sky-500 hover:bg-sky-400 text-white hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] active:scale-95'
      }
    `}
  >
    
    {isCorrect === true ? (
    <CheckCircle size={20} className="animate-in zoom-in duration-300" />
  ) : isCorrect === false ? (
    <X size={20} />
  ) : (
    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
  )}
    
  </button>
</div>
          </div>
        )}

        {/* Solution Tab */}
        {activeTab === 'Solution' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg"><CheckCircle className="text-emerald-400" size={20} /></div>
                <div>
                  <h3 className="text-white text-sm font-bold leading-none">Official_Derivation</h3>
                  <p className="text-[10px] text-emerald-500/70 font-mono uppercase tracking-tighter mt-1">Status: Verified Accuracy</p>
                </div>
              </div>
              <button onClick={() => navigator.clipboard.writeText(problem.solution)} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Copy</button>
            </div>

            <div className="relative group">
              <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/10 to-transparent" />
              <div className="pl-8 prose prose-invert prose-emerald max-w-none">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{
                  p: ({children}) => <p className="text-slate-300 leading-relaxed mb-6 text-lg">{children}</p>,
                  code: ({children}) => <code className="bg-black/40 px-1.5 py-0.5 rounded text-sky-400 font-mono">{children}</code>
                }}>
                  {problem.solution}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Related_Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {problem.relatedTopics && (Array.isArray(problem.relatedTopics) ? problem.relatedTopics : problem.relatedTopics.split(',')).map((topic, index) => (
                    <span key={index} className="px-3 py-1.5 bg-sky-500/5 hover:bg-sky-500/10 rounded-lg text-[10px] font-bold text-sky-400/80 border border-sky-500/20 transition-colors"># {topic.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

       
        {/* {activeTab === 'Attempts' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-8">
              <History size={16} className="text-slate-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Research_History ({userAttachments.length})</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userAttachments.map((file, i) => (
                <button key={i} onClick={() => setPreviewUrl(file.fileUrl)} className="group p-5 bg-white/[0.03] border border-white/5 hover:border-sky-500/40 hover:bg-sky-500/5 rounded-2xl flex items-center gap-4 transition-all duration-300 text-left w-full">
                  <div className="p-3 bg-sky-500/10 rounded-xl group-hover:scale-110 transition-transform"><FileText className="text-sky-400" size={24} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:text-sky-400 transition-colors">{file.fileName}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">Artifact_v{i + 1} • PDF Document</p>
                  </div>
                  <Maximize2 size={14} className="text-slate-600 group-hover:text-white" />
                </button>
              ))}

              {userAttachments.length === 0 && (
                <div className="col-span-2 py-20 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-30 flex flex-col items-center">
                  <History size={48} className="mb-4" />
                  <p className="font-mono text-xs uppercase tracking-widest">No previous logs found</p>
                </div>
              )}
            </div>
          </div>
        )} */}

      {activeTab === 'Attempts' && (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <History size={16} className="text-sky-500" />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
          Submission_History ({userAttachments.length})
        </h3>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4">

    {userAttachments.slice().reverse().map((file, i) => {
  // DEBUG: console.log("File Object:", file); // Uncomment to see actual keys
  
  // Determine if this is a PDF or just a text attempt
  const isPDF = file.fileUrl || file.url; 
  const displayUrl = file.fileUrl || file.url;

  return (
    <div key={i} className="group bg-white/[0.02] border border-white/5 hover:border-sky-500/30 rounded-2xl p-5 flex items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <div className={`p-3 rounded-xl ${isPDF ? 'bg-sky-500/10 text-sky-400' : 'bg-amber-500/10 text-amber-400'}`}>
          {isPDF ? <FileText size={24} /> : <Send size={24} />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate mb-1">
          {file.fileName || (isPDF ? "Research_Artifact.pdf" : "System_Check")}
        </p>
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase">
          <span className="flex items-center gap-1">
             <Circle size={8} className={`fill-current ${isPDF ? 'text-sky-500' : 'text-amber-500'}`} />
             {isPDF ? "DOCUMENT_LINK" : "TEXT_SUBMISSION"}
          </span>
        </div>
      </div>

      {isPDF ? (
        <button 
          onClick={() => setPreviewUrl(displayUrl)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white rounded-xl text-[10px] font-black uppercase transition-all"
        >
          <Maximize2 size={12} /> View PDF
        </button>
      ) : (
        <div className="px-4 py-2 text-[10px] font-black text-slate-600 border border-white/5 rounded-xl uppercase italic">
          Entry_Logged
        </div>
      )}
    </div>
  );
})}
    </div>
   



  </div>
      )}
      </div>



      {/* PDF VIEWER MODAL */}
{previewUrl && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10">
    <div className="relative w-full h-full max-w-6xl bg-[#020617] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40">
        <div className="flex items-center gap-3">
          <FileText size={16} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure_Document_Viewer</span>
        </div>
        <div className="flex items-center gap-4">
           {/* Direct Link as backup */}
           <a href={previewUrl} target="_blank" className="text-[10px] text-slate-500 hover:text-white uppercase font-bold transition-colors">
              Open_External
           </a>
           <button onClick={() => setPreviewUrl(null)} className="flex items-center gap-2 px-4 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[10px] font-black uppercase rounded-lg transition-all group">
             <X size={14} className="group-hover:rotate-90 transition-transform" />
             Close
           </button>
        </div>
      </div>
      
      {/* Force Google Viewer for high compatibility */}
      <iframe 
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`}
        className="flex-1 w-full border-none bg-white"
        title="PDF Preview"
      />
    </div>
  </div>
)}


    </div>
  );
}