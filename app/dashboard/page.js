// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, Filter, CheckCircle2, Circle, 
//   Lock, ArrowUpRight, BarChart2, Hash,
//   Terminal, BookOpen, MessageSquare, Brain, Notebook,
//   ChevronDown, SlidersHorizontal
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// // --- MOCK DATA: PROBLEMS ---
// const problemsData = [
//   { id: 1, title: "Expected Value of Dice Roll", difficulty: "Easy", acceptance: "84%", status: "Solved", category: "Probability" },
//   { id: 2, title: "Heston Model Calibration", difficulty: "Hard", acceptance: "12%", status: "Attempted", category: "Stochastic" },
//   { id: 3, title: "Black-Scholes Delta Hedging", difficulty: "Medium", acceptance: "45%", status: "Todo", category: "Derivatives" },
//   { id: 4, title: "Martingale Betting Strategy", difficulty: "Medium", acceptance: "38%", status: "Todo", category: "Theory" },
//   { id: 5, title: "Variance Swap Pricing", difficulty: "Hard", acceptance: "18%", status: "Solved", category: "Stochastic" },
//   { id: 6, title: "Coin Flip Sequence Probability", difficulty: "Easy", acceptance: "72%", status: "Todo", category: "Probability" },
// ];

// export default function ProblemsPage() {
//   const [mounted, setMounted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
//       {/* 1. TOP TERMINAL NAVBAR */}
//       <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
//         <div className="flex items-center gap-8">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs">Q</div>
//             <span className="font-black tracking-tighter uppercase italic text-white">Terminal_v4</span>
//           </div>
          
//           <div className="hidden md:flex items-center gap-6">
//             {[
//               { name: 'Problems', icon: <Terminal size={14}/>, active: true },
//               { name: 'Theory', icon: <BookOpen size={14}/> },
//               { name: 'Discussion', icon: <MessageSquare size={14}/> },
//               { name: 'Mental Maths', icon: <Brain size={14}/> },
//               { name: 'Notebooks', icon: <Notebook size={14}/> },
//             ].map((item) => (
//               <a 
//                 key={item.name} 
//                 href="#" 
//                 className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${item.active ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}
//               >
//                 {item.icon} {item.name}
//               </a>
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border border-white/10" />
//         </div>
//       </nav>

//       <div className="flex">
        
//         {/* 2. LEFT SIDEBAR FILTERS */}
//         <aside className="w-64 border-r border-white/5 bg-black/20 h-[calc(100vh-64px)] sticky top-16 p-6 hidden lg:block">
//           <div className="flex items-center gap-2 mb-8 text-sky-400">
//             <SlidersHorizontal size={16} />
//             <span className="text-xs font-black uppercase tracking-[0.2em]">Filters</span>
//           </div>

//           <div className="space-y-8">
//             {/* Difficulty Filter */}
//             <div>
//               <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Difficulty</h4>
//               <div className="space-y-2">
//                 {['All', 'Easy', 'Medium', 'Hard'].map(lvl => (
//                   <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
//                     <input type="radio" name="diff" className="hidden" onChange={() => setFilterDifficulty(lvl)} defaultChecked={lvl === 'All'} />
//                     <div className={`w-3 h-3 rounded-sm border ${filterDifficulty === lvl ? 'bg-sky-400 border-sky-400' : 'border-white/20 group-hover:border-white/40'}`} />
//                     <span className={`text-xs font-medium transition-colors ${filterDifficulty === lvl ? 'text-white' : 'text-slate-500'}`}>{lvl}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div>
//               <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Status</h4>
//               <div className="space-y-2">
//                 {['Solved', 'Attempted', 'Todo'].map(status => (
//                   <div key={status} className="flex items-center gap-3 text-xs text-slate-500 hover:text-white cursor-pointer transition-colors font-medium">
//                     <Circle size={12} className="opacity-40" /> {status}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Acceptance Filter */}
//             <div>
//               <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Min. Acceptance</h4>
//               <input type="range" className="w-full accent-sky-400 bg-white/10 rounded-lg appearance-none h-1" />
//               <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-mono"><span>0%</span><span>100%</span></div>
//             </div>
//           </div>
//         </aside>

//         {/* 3. MAIN CONTENT AREA */}
//         <main className="flex-1 p-8">
          
//           {/* Search Header */}
//           <div className="max-w-5xl mx-auto mb-10">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//               <div>
//                 <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Problem_Library</h1>
//                 <p className="text-slate-500 text-sm italic">Showing 154 quantitative challenges</p>
//               </div>
              
//               <div className="relative w-full md:w-96">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input 
//                   type="text" 
//                   placeholder="Search specific models (e.g. 'Heston')"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all"
//                 />
//               </div>
//             </div>

//             {/* 4. DATA TABLE */}
//             <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-slate-500 uppercase tracking-widest">
//                     <th className="px-6 py-5 font-black">Status</th>
//                     <th className="px-6 py-5 font-black">Title</th>
//                     <th className="px-6 py-5 font-black">Category</th>
//                     <th className="px-6 py-5 font-black text-center">Difficulty</th>
//                     <th className="px-6 py-5 font-black text-right">Acceptance</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {problemsData
//                     .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
//                     .map((prob) => (
//                     <tr key={prob.id} className="group hover:bg-sky-500/[0.03] transition-colors cursor-pointer">
//                       <td className="px-6 py-5">
//                         {prob.status === 'Solved' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-700" />}
//                       </td>
//                       <td className="px-6 py-5 font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
//                         {prob.title}
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 uppercase">
//                           {prob.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         <span className={`text-[10px] font-black uppercase italic ${
//                           prob.difficulty === 'Easy' ? 'text-emerald-400' : 
//                           prob.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-500'
//                         }`}>
//                           {prob.difficulty}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5 text-right font-mono text-xs text-slate-500">
//                         {prob.acceptance}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
              
//               {/* Pagination Placeholder */}
//               <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
//                 <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Page 1 of 12</span>
//                 <div className="flex gap-2">
//                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Prev</button>
//                    <button className="px-4 py-2 bg-sky-500 text-sky-950 rounded-lg text-xs font-black hover:scale-105 transition-all">Next</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, CheckCircle2, Circle, 
//   Terminal, BookOpen, MessageSquare, Brain, Notebook
// } from 'lucide-react';

// import RightPanel from '@/components/RightPanel';
// import LeftPanel from '@/components/LeftPanel';

// const problemsData = [
//   { id: 1, title: "Expected Value of Dice Roll", difficulty: "Easy", acceptance: "84%", status: "Solved", category: "Probability" },
//   { id: 2, title: "Heston Model Calibration", difficulty: "Hard", acceptance: "12%", status: "Attempted", category: "Stochastic" },
//   { id: 3, title: "Black-Scholes Delta Hedging", difficulty: "Medium", acceptance: "45%", status: "Todo", category: "Derivatives" },
//   { id: 4, title: "Martingale Betting Strategy", difficulty: "Medium", acceptance: "38%", status: "Todo", category: "Theory" },
//   { id: 5, title: "Variance Swap Pricing", difficulty: "Hard", acceptance: "18%", status: "Solved", category: "Stochastic" },
//   { id: 6, title: "Coin Flip Sequence Probability", difficulty: "Easy", acceptance: "72%", status: "Todo", category: "Probability" },
// ];

// export default function ProblemsPage() {
//   const [mounted, setMounted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All"); // New State

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

//   // Filter Logic
//   const filteredProblems = problemsData.filter(p => {
//     const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDiff = filterDifficulty === "All" || p.difficulty === filterDifficulty;
//     const matchesStatus = filterStatus === "All" || p.status === filterStatus;
//     return matchesSearch && matchesDiff && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
//       {/* 1. NAVBAR */}
//       <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
//         <div className="flex items-center gap-8">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs">Q</div>
//             <span className="font-black tracking-tighter uppercase italic text-white">Terminal_v4</span>
//           </div>
//           <div className="hidden md:flex items-center gap-6">
//             {[{ name: 'Problems', icon: <Terminal size={14}/>, active: true }, { name: 'Theory', icon: <BookOpen size={14}/> }, { name: 'Discussion', icon: <MessageSquare size={14}/> }, { name: 'Mental Maths', icon: <Brain size={14}/> }, { name: 'Notebooks', icon: <Notebook size={14}/> }].map((item) => (
//               <a key={item.name} href="#" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${item.active ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}>
//                 {item.icon} {item.name}
//               </a>
//             ))}
//           </div>
//         </div>
//         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border border-white/10" />
//       </nav>

//       <div className="flex justify-center w-full max-w-[1600px] mx-auto">
        
//         {/* 2. LEFT SIDEBAR FILTERS (Now Separated) */}
//         <LeftPanel 
//           filterDifficulty={filterDifficulty} 
//           setFilterDifficulty={setFilterDifficulty}
//           filterStatus={filterStatus}
//           setFilterStatus={setFilterStatus}
//         />

//         {/* 3. MAIN CONTENT */}
//         <main className="flex-1 p-8 min-w-0">
//           <div className="max-w-4xl mx-auto mb-10">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//               <div>
//                 <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Problem_Library</h1>
//                 <p className="text-slate-500 text-sm italic">Showing {filteredProblems.length} quantitative challenges</p>
//               </div>
//               <div className="relative w-full md:w-80">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input 
//                   type="text" 
//                   placeholder="Search models..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 transition-all"
//                 />
//               </div>
//             </div>

//             <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-slate-500 uppercase tracking-widest">
//                     <th className="px-6 py-5 font-black">Status</th>
//                     <th className="px-6 py-5 font-black">Title</th>
//                     <th className="px-6 py-5 font-black">Category</th>
//                     <th className="px-6 py-5 font-black text-center">Difficulty</th>
//                     <th className="px-6 py-5 font-black text-right">Acceptance</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {filteredProblems.map((prob) => (
//                     <tr key={prob.id} className="group hover:bg-sky-500/[0.03] transition-colors cursor-pointer">
//                       <td className="px-6 py-5">
//                         {prob.status === 'Solved' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-700" />}
//                       </td>
//                       <td className="px-6 py-5 font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
//                         {prob.title}
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 uppercase">{prob.category}</span>
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         <span className={`text-[10px] font-black uppercase italic ${prob.difficulty === 'Easy' ? 'text-emerald-400' : prob.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-500'}`}>{prob.difficulty}</span>
//                       </td>
//                       <td className="px-6 py-5 text-right font-mono text-xs text-slate-500">{prob.acceptance}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
//                 <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Page 1 of 12</span>
//                 <div className="flex gap-2">
//                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Prev</button>
//                    <button className="px-4 py-2 bg-sky-500 text-sky-950 rounded-lg text-xs font-black hover:scale-105 transition-all">Next</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* 4. RIGHT SIDEBAR */}
//         <div className="sticky top-16 h-[calc(100vh-64px)] hidden xl:block border-l border-white/5">
//             <RightPanel />
//         </div>

//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, CheckCircle2, Circle, 
//   Terminal, BookOpen, MessageSquare, Brain, Notebook
// } from 'lucide-react';

// import RightPanel from '@/components/RightPanel';
// import LeftPanel from '@/components/LeftPanel';

// const problemsData = [
//   { id: 1, title: "Expected Value of Dice Roll", difficulty: "Easy", acceptance: "84%", status: "Solved", category: "Probability" },
//   { id: 2, title: "Heston Model Calibration", difficulty: "Hard", acceptance: "12%", status: "Attempted", category: "Stochastic" },
//   { id: 3, title: "Black-Scholes Delta Hedging", difficulty: "Medium", acceptance: "45%", status: "Todo", category: "Derivatives" },
//   { id: 4, title: "Martingale Betting Strategy", difficulty: "Medium", acceptance: "38%", status: "Todo", category: "Theory" },
//   { id: 5, title: "Variance Swap Pricing", difficulty: "Hard", acceptance: "18%", status: "Solved", category: "Stochastic" },
//   { id: 6, title: "Coin Flip Sequence Probability", difficulty: "Easy", acceptance: "72%", status: "Todo", category: "Probability" },
// ];

// export default function ProblemsPage() {
//   const [mounted, setMounted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

//   // --- UPDATED FILTER LOGIC ---
//   const filteredProblems = problemsData.filter(p => {
//     // 1. Search filter
//     const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    
//     // 2. Difficulty filter
//     const matchesDiff = filterDifficulty === "All" || p.difficulty === filterDifficulty;
    
//     // 3. Status filter (Business Logic: Attempted = Solved + Attempted)
//     let matchesStatus = true;
//     if (filterStatus === "Solved") {
//       matchesStatus = p.status === "Solved";
//     } else if (filterStatus === "Attempted") {
//       // Includes both correct (Solved) and wrong (Attempted) answers
//       matchesStatus = p.status === "Solved" || p.status === "Attempted";
//     } else if (filterStatus === "Todo") {
//       // Only untouched questions
//       matchesStatus = p.status === "Todo";
//     }

//     return matchesSearch && matchesDiff && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
//       {/* 1. NAVBAR */}
//       <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
//         <div className="flex items-center gap-8">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs">Q</div>
//             <span className="font-black tracking-tighter uppercase italic text-white">Terminal_v4</span>
//           </div>
//           <div className="hidden md:flex items-center gap-6">
//             {[
//               { name: 'Problems', icon: <Terminal size={14}/>, active: true }, 
//               { name: 'Theory', icon: <BookOpen size={14}/> }, 
//               { name: 'Discussion', icon: <MessageSquare size={14}/> }, 
//               { name: 'Mental Maths', icon: <Brain size={14}/> }, 
//               { name: 'Notebooks', icon: <Notebook size={14}/> }
//             ].map((item) => (
//               <a key={item.name} href="#" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${item.active ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}>
//                 {item.icon} {item.name}
//               </a>
//             ))}
//           </div>
//         </div>
//         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border border-white/10" />
//       </nav>

//       <div className="flex justify-center w-full max-w-[1600px] mx-auto">
        
//         {/* 2. LEFT SIDEBAR FILTERS */}
//         <LeftPanel 
//           filterDifficulty={filterDifficulty} 
//           setFilterDifficulty={setFilterDifficulty}
//           filterStatus={filterStatus}
//           setFilterStatus={setFilterStatus}
//         />

//         {/* 3. MAIN CONTENT */}
//         <main className="flex-1 p-8 min-w-0">
//           <div className="max-w-4xl mx-auto mb-10">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
//               <div>
//                 <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Problem_Library</h1>
//                 <p className="text-slate-500 text-sm italic">Showing {filteredProblems.length} quantitative challenges</p>
//               </div>
//               <div className="relative w-full md:w-80">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                 <input 
//                   type="text" 
//                   placeholder="Search models..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 transition-all"
//                 />
//               </div>
//             </div>

//             <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-slate-500 uppercase tracking-widest">
//                     <th className="px-6 py-5 font-black">Status</th>
//                     <th className="px-6 py-5 font-black">Title</th>
//                     <th className="px-6 py-5 font-black">Category</th>
//                     <th className="px-6 py-5 font-black text-center">Difficulty</th>
//                     <th className="px-6 py-5 font-black text-right">Acceptance</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {filteredProblems.map((prob) => (
//                     <tr key={prob.id} className="group hover:bg-sky-500/[0.03] transition-colors cursor-pointer">
//                       <td className="px-6 py-5">
//                         {prob.status === 'Solved' ? (
//                           <CheckCircle2 size={18} className="text-emerald-500" />
//                         ) : prob.status === 'Attempted' ? (
//                           <Circle size={18} className="text-amber-500 fill-amber-500/10" />
//                         ) : (
//                           <Circle size={18} className="text-slate-700" />
//                         )}
//                       </td>
//                       <td className="px-6 py-5 font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
//                         {prob.title}
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 uppercase">
//                           {prob.category}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         <span className={`text-[10px] font-black uppercase italic ${
//                           prob.difficulty === 'Easy' ? 'text-emerald-400' : 
//                           prob.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-500'
//                         }`}>
//                           {prob.difficulty}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5 text-right font-mono text-xs text-slate-500">
//                         {prob.acceptance}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
//                 <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Page 1 of 12</span>
//                 <div className="flex gap-2">
//                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Prev</button>
//                    <button className="px-4 py-2 bg-sky-500 text-sky-950 rounded-lg text-xs font-black hover:scale-105 transition-all">Next</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* 4. RIGHT SIDEBAR */}
//         <div className="sticky top-16 h-[calc(100vh-64px)] hidden xl:block border-l border-white/5">
//             <RightPanel />
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, CheckCircle2, Circle, 
  Terminal, BookOpen, MessageSquare, Brain, Notebook
} from 'lucide-react';

import RightPanel from '@/components/RightPanel';
import LeftPanel from '@/components/LeftPanel';
import Link from 'next/link';

// Hardcoded for now - replace with useEffect fetch from your DB later
const problemsData = [
  { id: "65a123456781", title: "Expected Value of Dice Roll", difficulty: "Easy", acceptance: "84%", status: "Solved", category: "Probability" },
  { id: "65a123456782", title: "Heston Model Calibration", difficulty: "Hard", acceptance: "12%", status: "Attempted", category: "Stochastic" },
  { id: "65a123456783", title: "Black-Scholes Delta Hedging", difficulty: "Medium", acceptance: "45%", status: "Todo", category: "Derivatives" },
  { id: "65a123456784", title: "Martingale Betting Strategy", difficulty: "Medium", acceptance: "38%", status: "Todo", category: "Theory" },
  { id: "65a123456785", title: "Variance Swap Pricing", difficulty: "Hard", acceptance: "18%", status: "Solved", category: "Stochastic" },
  { id: "65a123456786", title: "Coin Flip Sequence Probability", difficulty: "Easy", acceptance: "72%", status: "Todo", category: "Probability" },
];

export default function ProblemsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  // --- FILTER LOGIC ---
  const filteredProblems = problemsData.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = filterDifficulty === "All" || p.difficulty === filterDifficulty;
    
    let matchesStatus = true;
    if (filterStatus === "Solved") {
      matchesStatus = p.status === "Solved";
    } else if (filterStatus === "Attempted") {
      matchesStatus = p.status === "Solved" || p.status === "Attempted";
    } else if (filterStatus === "Todo") {
      matchesStatus = p.status === "Todo";
    }

    return matchesSearch && matchesDiff && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
      {/* 1. NAVBAR */}
      <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs">Q</div>
            <span className="font-black tracking-tighter uppercase italic text-white">Aqua</span>
          </div> */}
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80 cursor-pointer">
    <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs shadow-[0_0_15px_rgba(14,165,233,0.4)]">
      Q
    </div>
    <span className="font-black tracking-tighter uppercase italic text-white group-hover:text-sky-400 transition-colors">
      Aqua
    </span>
  </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { name: 'Problems', icon: <Terminal size={14}/>, active: true }, 
              { name: 'Theory', icon: <BookOpen size={14}/> }, 
              { name: 'Discussion', icon: <MessageSquare size={14}/> }, 
              { name: 'Mental Maths', icon: <Brain size={14}/> }, 
              { name: 'Notebooks', icon: <Notebook size={14}/> }
            ].map((item) => (
              <a key={item.name} href="#" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${item.active ? 'text-sky-400' : 'text-slate-500 hover:text-white'}`}>
                {item.icon} {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border border-white/10" />
      </nav>

      <div className="flex justify-center w-full max-w-[1600px] mx-auto">
        
        {/* 2. LEFT SIDEBAR FILTERS */}
        <LeftPanel 
          filterDifficulty={filterDifficulty} 
          setFilterDifficulty={setFilterDifficulty}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 p-8 min-w-0">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Problem_Library</h1>
                <p className="text-slate-500 text-sm italic">Showing {filteredProblems.length} quantitative challenges</p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 transition-all"
                />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-5 font-black text-center w-20">Status</th>
                    <th className="px-6 py-5 font-black">Title</th>
                    <th className="px-6 py-5 font-black">Category</th>
                    <th className="px-6 py-5 font-black text-center">Difficulty</th>
                    <th className="px-6 py-5 font-black text-right">Acceptance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProblems.map((prob) => (
                    <tr 
                      key={prob.id} 
                      onClick={() => router.push(`/problems/${prob.id}`)}
                      className="group hover:bg-sky-500/[0.05] transition-all cursor-pointer relative"
                    >
                      <td className="px-6 py-5 text-center">
                        {prob.status === 'Solved' ? (
                          <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
                        ) : prob.status === 'Attempted' ? (
                          <Circle size={18} className="text-amber-500 fill-amber-500/10 mx-auto" />
                        ) : (
                          <Circle size={18} className="text-slate-700 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
                        {prob.title}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-400 uppercase">
                          {prob.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`text-[10px] font-black uppercase italic ${
                          prob.difficulty === 'Easy' ? 'text-emerald-400' : 
                          prob.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-500'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-xs text-slate-500">
                        {prob.acceptance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* FOOTER / PAGINATION */}
              <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Page 1 of 12</span>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Prev</button>
                   <button className="px-4 py-2 bg-sky-500 text-sky-950 rounded-lg text-xs font-black hover:scale-105 transition-all">Next</button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR */}
        <div className="sticky top-16 h-[calc(100vh-64px)] hidden xl:block border-l border-white/5">
            <RightPanel />
        </div>

      </div>
    </div>
  );
}