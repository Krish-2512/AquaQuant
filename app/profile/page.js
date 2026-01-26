"use client";
import { useSession } from "next-auth/react";
import { GraduationCap, Target, Award, BookOpen } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const stats = [
    { label: "Total Attempted", value: "42", icon: Target, color: "text-sky-400" },
    { label: "Correct Solutions", value: "28", icon: Award, color: "text-emerald-400" },
    { label: "Success Rate", value: "66%", icon: BookOpen, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Profile Section */}
        <div className="flex items-center gap-8 bg-white/5 p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <GraduationCap size={200} />
          </div>
          <img src={session?.user?.image} className="w-32 h-32 rounded-3xl border-2 border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.2)]" />
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">{session?.user?.name}</h1>
            <p className="text-sky-500 font-mono text-sm mt-1">{session?.user?.email}</p>
            <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-white/5 rounded-full w-fit border border-white/10 text-[10px] font-bold uppercase tracking-widest">
              <GraduationCap size={12} className="text-slate-500" />
              {session?.user?.university || "Independent Scholar"}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 p-8 rounded-3xl border border-white/5 flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-white/5 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{s.label}</p>
                <p className="text-3xl font-black text-white">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category breakdown (Visual Rings logic would go here) */}
        <div className="bg-white/5 p-10 rounded-[40px] border border-white/5">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Category_Mastery</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {['Probability', 'Finance', 'Statistics', 'Brainteasers'].map(cat => (
                <div key={cat} className="text-center group">
                   <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-sky-500 mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <span className="text-xs font-black text-white">75%</span>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cat}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}