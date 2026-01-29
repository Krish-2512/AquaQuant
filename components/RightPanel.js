// "use client";
// import React, { useState, useEffect } from 'react';
// import { Search, Zap, Target, TrendingUp } from 'lucide-react';

// export default function RightPanel() {
//   const [tagSearch, setTagSearch] = useState("");
//   const [stats, setStats] = useState({
//     solved: 0,
//     totalQuestions: 123, // You can also fetch this from API
//     attempted: 0,
//     accuracy: 0
//   });

//   const fetchStats = async () => {
//     try {
//       const res = await fetch('/api/user/stats');
//       const data = await res.json();
//       if (data.success) {
//         setStats({
//           // We use the totalSolved sent directly from the API
//           solved: data.totalSolved || 0,
//           totalQuestions: 123,
//           // FIX: Use 'accuracy' instead of 'accuracyScore' to match your API
//           attempted: data.totalAttempted || 0,
//           accuracy: data.accuracy || 0 
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching dynamic stats:", err);
//     }
//   };

//   // DONUT CALCULATION FIX: 
//   // Attempted should represent the "extra" attempts that aren't solved yet
//   const solvedPercentage = (stats.solved / stats.totalQuestions) * 100;
//   const attemptedPercentage = Math.max(0, ((stats.attempted - stats.solved) / stats.totalQuestions) * 100);
//   console.log(solvedPercentage, attemptedPercentage);

//   useEffect(() => {
//     fetchStats();
//     // Listen for the custom event we created in the previous step
//     window.addEventListener('statsUpdated', fetchStats);
//     return () => window.removeEventListener('statsUpdated', fetchStats);
//   }, []);



//   return (
//     <aside className="w-80 p-6 space-y-6 hidden xl:block">
      
//       {/* 1. DYNAMIC PROGRESS SECTION */}
//       <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl">
//         <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black mb-8">
//           Institutional_Progress
//         </h4>
        
//         <div className="flex flex-col gap-6">
//           {/* Dynamic Donut Chart */}
//           <div className="flex justify-center relative">
//             <div 
//               className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700" 
//               style={{ 
//                 // Dynamic gradient based on state
//                 background: `conic-gradient(
//                   #f59e0b 0% ${solvedPercentage}%, 
//                   #3b82f6 ${solvedPercentage}% ${solvedPercentage + attemptedPercentage}%, 
//                   #1e293b ${solvedPercentage + attemptedPercentage}% 100%
//                 )`,
//                 boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
//               }}
//             >
//               <div className="w-[70%] h-[70%] bg-[#020617] rounded-full flex flex-col items-center justify-center shadow-inner">
//                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Overall</span>
//                  <span className="text-xl font-black text-white italic">
//                    {solvedPercentage.toFixed(0)}%
//                  </span>
//               </div>
//             </div>
//           </div>

//           {/* Dynamic Stats List */}
//           <div className="space-y-4 pt-2">
//             <div className="flex justify-between items-end">
//               <div>
//                 <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">Solved</p>
//                 <p className="text-lg font-mono font-bold text-white">
//                   {stats.solved} <span className="text-slate-600 text-xs italic">/ {stats.totalQuestions}</span>
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Attempted</p>
//                 <p className="text-lg font-mono font-bold text-white">{stats.attempted}</p>
//               </div>
//             </div>

//             <div className="pt-4 border-t border-white/5 flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <Target size={14} className="text-emerald-500" />
//                 <span className="text-[10px] text-slate-500 font-bold uppercase">Accuracy_Score</span>
//               </div>
//               <span className="text-md font-mono font-black text-emerald-400">
//                 {stats.accuracy}%
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ... rest of your component (Company Tags & Daily Action) */}
      
//     </aside>
//   );
// }



"use client";
import React, { useState, useEffect } from 'react';
import { Search, Zap, Target, TrendingUp, Building2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RightPanel() {
  const router = useRouter();
  const [tagSearch, setTagSearch] = useState("");
  const [stats, setStats] = useState({
    solved: 0,
    totalQuestions: 123,
    attempted: 0,
    accuracy: 0
  });

  const COMPANIES = [
    'CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 
    'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'
  ];

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/user/stats');
      const data = await res.json();
      if (data.success) {
        setStats({
          solved: data.totalSolved || 0,
          totalQuestions: 123,
          attempted: data.totalAttempted || 0,
          accuracy: data.accuracy || 0 
        });
      }
    } catch (err) {
      console.error("Error fetching dynamic stats:", err);
    }
  };

  const solvedPercentage = (stats.solved / stats.totalQuestions) * 100;
  const attemptedPercentage = Math.max(0, ((stats.attempted - stats.solved) / stats.totalQuestions) * 100);

  useEffect(() => {
    fetchStats();
    window.addEventListener('statsUpdated', fetchStats);
    return () => window.removeEventListener('statsUpdated', fetchStats);
  }, []);

  // Filter companies based on tagSearch input
  const filteredCompanies = COMPANIES.filter(c => 
    c.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleCompanyClick = (company) => {
    // This updates the URL which your ProblemsPage can pick up to filter the list
    router.push(`/problems?search=${encodeURIComponent(company)}`);
  };

  return (
    <aside className="w-80 p-6 space-y-6 hidden xl:block border-l border-white/5 h-full overflow-y-auto scrollbar-hide">
      
      {/* 1. DYNAMIC PROGRESS SECTION */}
      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl">
        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black mb-8">
          Institutional_Progress
        </h4>
        
        <div className="flex flex-col gap-6">
          <div className="flex justify-center relative">
            <div 
              className="relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700" 
              style={{ 
                background: `conic-gradient(
                  #f59e0b 0% ${solvedPercentage}%, 
                  #3b82f6 ${solvedPercentage}% ${solvedPercentage + attemptedPercentage}%, 
                  #1e293b ${solvedPercentage + attemptedPercentage}% 100%
                )`,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <div className="w-[70%] h-[70%] bg-[#020617] rounded-full flex flex-col items-center justify-center shadow-inner">
                 <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Overall</span>
                 <span className="text-xl font-black text-white italic">
                   {solvedPercentage.toFixed(0)}%
                 </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">Solved</p>
                <p className="text-lg font-mono font-bold text-white">
                  {stats.solved} <span className="text-slate-600 text-xs italic">/ {stats.totalQuestions}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Attempted</p>
                <p className="text-lg font-mono font-bold text-white">{stats.attempted}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-emerald-500" />
                <span className="text-[10px] text-slate-500 font-bold uppercase">Accuracy_Score</span>
              </div>
              <span className="text-md font-mono font-black text-emerald-400">
                {stats.accuracy}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPANY TAGS SECTION */}
      {/* <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-black">
            Company_Archives
          </h4>
          <Building2 size={14} className="text-slate-600" />
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={12} />
          <input 
            type="text"
            placeholder="Search firms..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-[11px] text-white placeholder:text-slate-600 outline-none focus:border-sky-500/50 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredCompanies.map((company) => (
            <button
              key={company}
              onClick={() => handleCompanyClick(company)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-wider hover:bg-sky-500/10 hover:border-sky-500/30 hover:text-sky-400 transition-all active:scale-95"
            >
              {company}
            </button>
          ))}
        </div>

       
      </div> */}

  
      <div></div>
      
    </aside>
  );
}

