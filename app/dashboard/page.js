
// "use client";
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, CheckCircle2, Circle, 
//   Terminal, BookOpen, MessageSquare, Brain, Notebook
// } from 'lucide-react';

// import RightPanel from '@/components/RightPanel';
// import LeftPanel from '@/components/LeftPanel';
// import Link from 'next/link';

// // Hardcoded for now - replace with useEffect fetch from your DB later
// const problemsData = [
//   { id: "65a123456781", title: "Expected Value of Dice Roll", difficulty: "Easy", acceptance: "84%", status: "Solved", category: "Probability" },
//   { id: "65a123456782", title: "Heston Model Calibration", difficulty: "Hard", acceptance: "12%", status: "Attempted", category: "Stochastic" },
//   { id: "65a123456783", title: "Black-Scholes Delta Hedging", difficulty: "Medium", acceptance: "45%", status: "Todo", category: "Derivatives" },
//   { id: "65a123456784", title: "Martingale Betting Strategy", difficulty: "Medium", acceptance: "38%", status: "Todo", category: "Theory" },
//   { id: "65a123456785", title: "Variance Swap Pricing", difficulty: "Hard", acceptance: "18%", status: "Solved", category: "Stochastic" },
//   { id: "65a123456786", title: "Coin Flip Sequence Probability", difficulty: "Easy", acceptance: "72%", status: "Todo", category: "Probability" },
// ];

// export default function ProblemsPage() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterDifficulty, setFilterDifficulty] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");

//   useEffect(() => setMounted(true), []);
  
//   if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

//   // --- FILTER LOGIC ---
//   const filteredProblems = problemsData.filter(p => {
//     const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDiff = filterDifficulty === "All" || p.difficulty === filterDifficulty;
    
//     let matchesStatus = true;
//     if (filterStatus === "Solved") {
//       matchesStatus = p.status === "Solved";
//     } else if (filterStatus === "Attempted") {
//       matchesStatus = p.status === "Solved" || p.status === "Attempted";
//     } else if (filterStatus === "Todo") {
//       matchesStatus = p.status === "Todo";
//     }

//     return matchesSearch && matchesDiff && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
//       {/* 1. NAVBAR */}
//       <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
//         <div className="flex items-center gap-8">
//           {/* <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs">Q</div>
//             <span className="font-black tracking-tighter uppercase italic text-white">Aqua</span>
//           </div> */}
//           <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80 cursor-pointer">
//     <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs shadow-[0_0_15px_rgba(14,165,233,0.4)]">
//       Q
//     </div>
//     <span className="font-black tracking-tighter uppercase italic text-white group-hover:text-sky-400 transition-colors">
//       Aqua
//     </span>
//   </Link>
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
//                     <th className="px-6 py-5 font-black text-center w-20">Status</th>
//                     <th className="px-6 py-5 font-black">Title</th>
//                     <th className="px-6 py-5 font-black">Category</th>
//                     <th className="px-6 py-5 font-black text-center">Difficulty</th>
//                     <th className="px-6 py-5 font-black text-right">Acceptance</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {filteredProblems.map((prob) => (
//                     <tr 
//                       key={prob.id} 
//                       onClick={() => router.push(`/problems/${prob.id}`)}
//                       className="group hover:bg-sky-500/[0.05] transition-all cursor-pointer relative"
//                     >
//                       <td className="px-6 py-5 text-center">
//                         {prob.status === 'Solved' ? (
//                           <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
//                         ) : prob.status === 'Attempted' ? (
//                           <Circle size={18} className="text-amber-500 fill-amber-500/10 mx-auto" />
//                         ) : (
//                           <Circle size={18} className="text-slate-700 mx-auto" />
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

//               {/* FOOTER / PAGINATION */}
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

export default function ProblemsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [problems, setProblems] = useState([]); // Fetched from DB
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
  
  // States for Filter Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setMounted(true);
    fetchProblems();
  }, [activeCategory, filterDifficulty, filterStatus, searchQuery, currentPage]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      // Make sure to pass the current page to the API
      const params = new URLSearchParams({
        page: currentPage.toString(), 
        category: activeCategory,
        difficulty: filterDifficulty,
        status: filterStatus,
        search: searchQuery
      });
  
      const res = await fetch(`/api/questions?${params.toString()}`);
      const json = await res.json();
      
      if (json.success) {
        setProblems(json.data); // This is the array of 10 questions
        setTotalPages(json.pagination.pages); // Total pages for the arrows
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, filterDifficulty, filterStatus, searchQuery]);

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-sky-500/30">
      
      {/* 1. NAVBAR (UNTOUCHED) */}
      <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
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
            
            {/* --- CATEGORY MENU --- */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
              {['All', 'Probability', 'BrainTeasers', 'Statistics', 'Finance', 'Coding'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
                    activeCategory === cat 
                    ? 'bg-sky-500 border-sky-500 text-sky-950 shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                    : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                  {activeCategory === 'All' ? 'Problem_Library' : `${activeCategory}_Pool`}
                </h1>
                <p className="text-slate-500 text-sm italic">
                  {loading ? 'Fetching data...' : `Showing ${problems.length} challenges`}
                </p>
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
                    <th className="px-6 py-5 font-black text-right">Asked In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
  {loading ? (
    <tr><td colSpan="5" className="px-6 py-20 text-center text-slate-600 font-mono text-xs animate-pulse">SYNCING_WITH_DATABASE...</td></tr>
  ) : 
  (
    // problems.map((prob) => {
    //   // This logic "grabs" the data regardless of casing
    //   const id = prob._id?.toString();
    //   const title = prob.Title || prob.title || "Untitled Question";
    //   const category = prob.Category || prob.category || "General";
    //   const difficulty = prob.Difficulty || prob.difficulty || "Medium";
    //   const status = prob.Status || prob.status || "UnAttempted";
      
    //   // Handle the CompanyTags/Asked In field
    //   let askedIn = "N/A";
    //   if (prob.CompanyTags && Array.isArray(prob.CompanyTags)) askedIn = prob.CompanyTags[0];
    //   else if (prob.companyTags && Array.isArray(prob.companyTags)) askedIn = prob.companyTags[0];
    
    //   return (
    //     <tr 
    //       key={id} 
    //       onClick={() => router.push(`/problems/${id}`)}
    //       className="group hover:bg-sky-500/[0.05] transition-all cursor-pointer border-b border-white/5"
    //     >
    //       <td className="px-6 py-5 text-center">
    //         {status === 'Finished' ? (
    //           <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
    //         ) : (
    //           <Circle size={18} className="text-slate-700 mx-auto" />
    //         )}
    //       </td>
    //       <td className="px-6 py-5 font-bold text-slate-200 group-hover:text-sky-400">
    //         {title}
    //       </td>
    //       <td className="px-6 py-5 text-xs text-slate-400 uppercase font-mono">
    //         {category}
    //       </td>
    //       <td className="px-6 py-5 text-center">
    //         <span className="text-[10px] font-black uppercase italic text-sky-400">
    //           {difficulty}
    //         </span>
    //       </td>
      
    //     </tr>
    //   );
    // })
    
      problems.map((prob) => {
        // Keep your logic exactly as it is
        const id = prob._id?.toString();
        const title = prob.Title || prob.title || "Untitled Question";
        const category = prob.Category || prob.category || "General";
        const difficulty = prob.Difficulty || prob.difficulty || "Medium";
        const status = prob.Status || prob.status || "UnAttempted";
        
        let askedIn = "N/A";
        if (prob.CompanyTags && Array.isArray(prob.CompanyTags)) askedIn = prob.CompanyTags[0];
        else if (prob.companyTags && Array.isArray(prob.companyTags)) askedIn = prob.companyTags[0];
    
        // --- ONLY UPDATING STYLES BELOW ---
    
        const diffStyles = {
          Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          Hard: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        };
    
        const catStyles = {
          Probability: "text-purple-400 border-purple-500/30 bg-purple-500/5",
          Statistics: "text-blue-400 border-blue-500/30 bg-blue-500/5",
          BrainTeasers: "text-pink-400 border-pink-500/30 bg-pink-500/5",
          Finance: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
          Coding: "text-lime-400 border-lime-500/30 bg-lime-500/5",
          General: "text-slate-400 border-slate-500/30 bg-slate-500/5",
        };
    
        return (
          <tr 
            key={id} 
            onClick={() => router.push(`/problems/${id}`)}
            className="group hover:bg-white/[0.03] transition-all cursor-pointer border-b border-white/5"
          >
            <td className="px-6 py-5 text-center">
              {status === 'Finished' ? (
                <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />
              ) : (
                <Circle size={18} className="text-slate-700 mx-auto" />
              )}
            </td>
    
            <td className="px-6 py-5 font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
              {title}
            </td>
    
            <td className="px-6 py-5">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${catStyles[category] || catStyles.General}`}>
                {category}
              </span>
            </td>
    
            <td className="px-6 py-5 text-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic border ${diffStyles[difficulty] || diffStyles.Medium}`}>
                {difficulty}
              </span>
            </td>
    
            <td className="px-6 py-5 text-right font-mono text-[10px] text-slate-500">
              {askedIn}
            </td>
          </tr>
        );
      })
    


  )
  
  }
</tbody>


              </table>
              <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
    Page {currentPage} of {totalPages}
  </span>
  
  <div className="flex gap-2">
    <button 
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      ← Prev
    </button>
    
    <button 
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
      className="px-4 py-2 bg-sky-500 text-sky-950 rounded-lg text-xs font-black hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(14,165,233,0.4)]"
    >
      Next →
    </button>
  </div>
</div>

              {/* FOOTER */}
              <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                  Total Records: {problems.length}
                </span>
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