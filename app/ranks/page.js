"use client";
import React from 'react';
import { Trophy, Zap, ChevronLeft, Target, Award, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const RANK_DATA = [
    { id: "U_8829", name: "Quant_Ripper", tier: "Grandmaster", score: 2840, solved: 412, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" },
    { id: "U_5511", name: "Alpha_Node", tier: "Expert", score: 2420, solved: 310, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Luna" },
    { id: "U_1204", name: "Sigma_Stack", tier: "Specialist", score: 2100, solved: 189, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aneka" },
    { id: "U_9932", name: "Bug_Squasher", tier: "Specialist", score: 1950, solved: 245, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Garfield" },
    { id: "U_7721", name: "Delta_Neutral", tier: "Expert", score: 2315, solved: 288, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Oliver" },
    { id: "U_3304", name: "Black_Scholes", tier: "Grandmaster", score: 2950, solved: 512, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Peanut" },
    { id: "U_4451", name: "Null_Ptr", tier: "Pupil", score: 1420, solved: 98, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Buster" },
    { id: "U_1122", name: "Vector_Viper", tier: "Specialist", score: 1880, solved: 156, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Milo" },
    { id: "U_0021", name: "Code_Monkey", tier: "Newbie", score: 850, solved: 45, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Snuggles" },
    { id: "U_9901", name: "Stochastic_Sam", tier: "Pupil", score: 1560, solved: 120, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ginger" },
    { id: "U_6612", name: "Market_Maker", tier: "Expert", score: 2240, solved: 265, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco" },
    { id: "U_2288", name: "Tensor_Flow", tier: "Specialist", score: 2010, solved: 198, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Shadow" },
    { id: "U_4490", name: "Monte_Carlo", tier: "Grandmaster", score: 3120, solved: 602, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rex" },
    { id: "U_7733", name: "Lambda_Lord", tier: "Expert", score: 2380, solved: 295, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jasper" },
    { id: "U_1010", name: "Binary_Bard", tier: "Pupil", score: 1320, solved: 88, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Sparky" },
    { id: "U_5521", name: "Option_Orca", tier: "Specialist", score: 1925, solved: 175, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Zelda" },
    { id: "U_8844", name: "Mean_Reverter", tier: "Expert", score: 2190, solved: 240, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Simba" },
    { id: "U_1337", name: "Kernel_Panic", tier: "Grandmaster", score: 2810, solved: 450, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Pixel" },
    { id: "U_3311", name: "Logic_Lancer", tier: "Specialist", score: 1750, solved: 142, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rocky" },
    { id: "U_4422", name: "Git_Commit", tier: "Newbie", score: 620, solved: 22, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rusty" },
    { id: "U_9955", name: "Bit_Shifter", tier: "Pupil", score: 1490, solved: 102, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Gizmo" },
    { id: "U_7701", name: "Arbitrage_Ace", tier: "Specialist", score: 2055, solved: 212, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Skye" },
    { id: "U_2299", name: "Matrix_Maven", tier: "Expert", score: 2450, solved: 325, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Luna" },
    { id: "U_6688", name: "Float_Point", tier: "Newbie", score: 710, solved: 35, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ghost" },
    { id: "U_1212", name: "Eigen_Expert", tier: "Grandmaster", score: 3200, solved: 680, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Flash" }
  ];
const tierStyles = {
  Grandmaster: "text-rose-500 border-rose-500/20 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
  Expert: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  Specialist: "text-sky-400 border-sky-400/20 bg-sky-400/10",
  Pupil: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  Newbie: "text-slate-400 border-white/10 bg-white/5",
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-sky-400 mb-8 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">HOME</span>
        </Link>

        <header className="flex items-center justify-between mb-12">
          <div className="flex items-end gap-5">
            <div className="p-4 bg-amber-500 rounded-[24px] shadow-[0_0_40px_rgba(245,158,11,0.2)]">
              <Trophy size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Global_Leaderboard</h1>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Cycle_Jan_2026 // Season_01</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Active_Users</p>
              <p className="text-xl font-black text-white tracking-tighter italic">12.4K</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Total_Solved</p>
              <p className="text-xl font-black text-white tracking-tighter italic">890K+</p>
            </div>
          </div>
        </header>

        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <span>Rank_&_Identity</span>
            <div className="flex gap-16 mr-10">
              <span>Solved</span>
              <span>Rating</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {RANK_DATA.map((user, index) => (
              <div key={user.id} className="group flex items-center justify-between p-5 hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-6">
                  <span className={`text-lg font-black italic w-6 ${index < 3 ? 'text-amber-500' : 'text-slate-700'}`}>
                    {index + 1}
                  </span>
                  
                  {/* Comical Avatar with status ring */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
                      <img src={user.face} alt="avatar" className="w-full h-full" />
                    </div>
                    {index === 0 && <ShieldCheck className="absolute -top-2 -right-2 text-rose-500 bg-[#020617] rounded-full" size={16} />}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-black italic group-hover:text-sky-400 transition-colors cursor-pointer">{user.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${tierStyles[user.tier]}`}>
                        {user.tier}
                      </span>
                    </div>
                    <p className="text-[9px] font-mono text-slate-600 uppercase mt-0.5 tracking-wider">UID: {user.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12 mr-8">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-slate-400">
                      <Target size={12} className="text-sky-500" />
                      <span className="text-sm font-black italic">{user.solved}</span>
                    </div>
                  </div>
                  
                  <div className="min-w-[80px] text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Zap size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-lg font-black text-white italic">{user.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PERSONAL RANK SUMMARY FOOTER */}
        <div className="mt-8 p-6 bg-sky-500/5 border border-sky-500/20 rounded-[28px] flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
                    <Award size={20} />
                </div>
                <div>
                    <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest block">Your_Status</span>
                    <span className="text-white font-black uppercase tracking-tighter italic">Currently_Unranked // Solve_5_Problems_To_Qualify</span>
                </div>
            </div>
            <button className="px-5 py-2 bg-sky-500 text-sky-950 font-black text-[10px] uppercase rounded-xl hover:scale-105 transition-transform">
                Start_Challange
            </button>
        </div>
      </div>
    </div>
  );
}