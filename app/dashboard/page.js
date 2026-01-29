


"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, CheckCircle2, Circle, 
  Terminal, BookOpen, MessageSquare, Brain, Notebook,
  Code2,
  Trophy,
  ArrowRight,
  Building2,
  ChevronDown
} from 'lucide-react';

import aqua_logo2 from '../../public/aqua_logo2.png';

import RightPanel from '@/components/RightPanel';
import LeftPanel from '@/components/LeftPanel';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ProblemsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [problems, setProblems] = useState([]); // Fetched from DB
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [category, setCategory] = useState('all'); // 'all', 'math', or 'coding'
const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  
  // States for Filter Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const COMPANIES = [
    'CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 
    'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'
  ];

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
      

      

      {/* 1. NAVBAR (UPDATED WITH PROFILE) */}
      <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80 cursor-pointer">
            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-black text-white text-xs shadow-[0_0_15px_rgba(14,165,233,0.4)]">
              Q
            </div>
            <span className="font-black tracking-tighter uppercase italic text-white group-hover:text-sky-400 transition-colors">
              Aqua
            </span>
          </Link> */}
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80 cursor-pointer">
  <div className="w-8 h-8 relative  rounded flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(14,165,233,0.4)]">
    <Image 
      src={aqua_logo2} // Replace with your actual path (e.g., /logo.svg or /logo.png)
      alt="Aqua"
      fill
      className="object-cover p-1" // 'p-1' adds a tiny padding so the logo doesn't touch the edges
    />
  </div>
  <span className="font-black tracking-tighter uppercase italic text-white group-hover:text-sky-400 transition-colors">
    Aqua
  </span>
</Link>
          
          <Link href="/coding">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white transition-all group ml-2">
              <Code2 size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest">CodingQuestions</span>
            </button>
          </Link>

          <div className="hidden md:flex items-center gap-6">
  {[
    { name: 'Problems', icon: <Terminal size={14}/>, href: '/problems', active: true }, 
    { name: 'Theory', icon: <BookOpen size={14}/>, href: '/theory' }, 
    { name: 'Discussion', icon: <MessageSquare size={14}/>, href: '#' }, 
    { name: 'Mental Maths', icon: <Brain size={14}/>, href: '#' }, 
    { name: 'Notebooks', icon: <Notebook size={14}/>, href: '/notebooks' } // Link added here
  ].map((item) => (
    <Link 
      key={item.name} 
      href={item.href} 
      className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
        item.active ? 'text-sky-400' : 'text-slate-500 hover:text-white'
      }`}
    >
      {item.icon} {item.name}
    </Link>
  ))}
</div>
        </div>

        {/* PROFILE ACCESSOR */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">
              {session?.user?.name || "Anonymous_User"}
            </span>
            
          </div>

          <Link href="/profile" className="group relative">
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-sky-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative w-9 h-9 rounded-full border-2 border-white/10 group-hover:border-sky-500 transition-all p-0.5 overflow-hidden bg-white/5">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-sky-500">
                  <Terminal size={16} />
                </div>
              )}
            </div>
            
            {/* Online Indicator Status */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#020617] rounded-full shadow-[0_0_5px_#10b981]" />
          </Link>
        </div>
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
            
          <Link href="/ranks" className="block mb-8 group">
  <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-amber-500/10 via-transparent to-transparent border border-amber-500/20 p-6 transition-all hover:border-amber-500/40">
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
          <Trophy size={24} className="text-black" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Global_Rankings</h2>
          <p className="text-amber-500/60 font-mono text-[10px] uppercase tracking-widest">Check out Everyone's performance</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Your_Rank</span>
          <span className="text-white font-black italic">#999+</span>
        </div>
        <ArrowRight size={20} className="text-amber-500 group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-32 h-full bg-amber-500/5 blur-3xl pointer-events-none" />
  </div>
</Link>
{/* BrainTeasers */}
            {/* --- CATEGORY MENU --- */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
              { ['All', 'Probability', 'BrainTeasers', 'Statistics', 'Finance'].map((cat) => (
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

            {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
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
            </div> */}

<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                  {activeCategory === 'All' ? 'Problem_Library' : `${activeCategory}_Pool`}
                </h1>
                <p className="text-slate-500 text-sm italic">
                  {loading ? 'Fetching data...' : `Showing ${problems.length} challenges`}
                </p>
              </div>

              {/* --- SEARCH & COMPANY FILTER --- */}
              <div className="flex items-center gap-3">
                {/* Company Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/30 transition-all"
                  >
                    <Building2 size={14} />
                    {searchQuery && COMPANIES.includes(searchQuery.toUpperCase()) ? searchQuery : "Firms"}
                    <ChevronDown size={12} className={`transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCompanyOpen && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-[60] overflow-hidden">
                      <div className="max-h-60 overflow-y-auto scrollbar-hide py-1">
                        <button 
                          onClick={() => { setSearchQuery(""); setIsCompanyOpen(false); }}
                          className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase text-slate-500 hover:bg-white/5 hover:text-sky-400 transition-colors"
                        >
                          Clear Filter
                        </button>
                        {COMPANIES.map((company) => (
                          <button 
                            key={company}
                            onClick={() => { setSearchQuery(company); setIsCompanyOpen(false); }}
                            className="w-full text-left px-4 py-2 text-[10px] font-bold uppercase text-white hover:bg-sky-500 hover:text-sky-950 transition-colors"
                          >
                            {company}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64">
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
    
      problems.map((prob) => {
        // Keep your logic exactly as it is
        const id = prob._id?.toString();
        const title = prob.Title || prob.title || "Untitled Question";
        const category = prob.Category || prob.category || "General";
        const difficulty = prob.Difficulty || prob.difficulty || "Medium";
        const status = prob.Status || prob.status || "UnAttempted";
        
        // let askedIn = "N/A";
        // if (prob.CompanyTags && Array.isArray(prob.CompanyTags)) askedIn = prob.CompanyTags[0];
        // else if (prob.companyTags && Array.isArray(prob.companyTags)) askedIn = prob.companyTags[0];

        let askedIn = "N/A";
const tags = prob.CompanyTags || prob.companyTags;
if (tags && Array.isArray(tags) && tags.length > 0) {
  askedIn = tags.join(', '); // This will show "CITADEL, OPTIVER" instead of just "CITADEL"
}
    
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
          //Coding: "text-lime-400 border-lime-500/30 bg-lime-500/5",
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