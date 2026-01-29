"use client";
import React from 'react';
import { Trophy, Zap, ChevronLeft, Target } from 'lucide-react';
import Link from 'next/link';

const DUMMY_LEADERS = [
    { id: "U_8829", name: "Quant_Ripper", rating: "Grandmaster", score: 2840, submissions: 412, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" },
    { id: "U_1204", name: "Sigma_Node", rating: "Knight", score: 2100, submissions: 189, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aneka" },
    { id: "U_9932", name: "Bug_Squasher", rating: "Knight", score: 1950, submissions: 245, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Garfield" },
    { id: "U_4451", name: "Null_Ptr", rating: "Apprentice", score: 1420, submissions: 98, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Buster" },
    { id: "U_0021", name: "Code_Monkey", rating: "Junior", score: 850, submissions: 45, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Snuggles" },
    { id: "U_7731", name: "Data_Lord", rating: "Knight", score: 2050, submissions: 310, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Luna" },
    { id: "U_2219", name: "Void_Walker", rating: "Apprentice", score: 1350, submissions: 112, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Shadow" },
    { id: "U_5540", name: "Binary_Beast", rating: "Grandmaster", score: 2910, submissions: 520, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rex" },
    { id: "U_1102", name: "Logic_Bomb", rating: "Knight", score: 1880, submissions: 195, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Milo" },
    { id: "U_6673", name: "Syntax_Error", rating: "Junior", score: 920, submissions: 60, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Peanut" },
    { id: "U_8812", name: "Neural_Net", rating: "Knight", score: 2200, submissions: 275, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco" },
    { id: "U_3345", name: "Algo_Architect", rating: "Grandmaster", score: 2750, submissions: 390, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Oliver" },
    { id: "U_9001", name: "Git_Gud", rating: "Apprentice", score: 1550, submissions: 140, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ginger" },
    { id: "U_1337", name: "Leet_Haxor", rating: "Knight", score: 2150, submissions: 210, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Pixel" },
    { id: "U_4404", name: "Not_Found", rating: "Junior", score: 780, submissions: 32, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ghost" },
    { id: "U_7722", name: "Cyber_Sleuth", rating: "Apprentice", score: 1620, submissions: 155, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jasper" },
    { id: "U_5511", name: "Infinite_Loop", rating: "Knight", score: 1990, submissions: 220, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Zelda" },
    { id: "U_2208", name: "Stack_Overflow", rating: "Grandmaster", score: 2890, submissions: 480, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Simba" },
    { id: "U_9944", name: "Py_Wizard", rating: "Apprentice", score: 1480, submissions: 105, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Merlin" },
    { id: "U_1010", name: "Neon_Nerd", rating: "Junior", score: 810, submissions: 50, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Sparky" },
    { id: "U_3388", name: "Kernel_Panic", rating: "Knight", score: 2120, submissions: 180, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rocky" },
    { id: "U_6621", name: "Bit_Flipper", rating: "Apprentice", score: 1590, submissions: 130, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Gizmo" },
    { id: "U_7700", name: "Cloud_Runner", rating: "Knight", score: 2010, submissions: 240, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Skye" },
    { id: "U_4422", name: "Legacy_Code", rating: "Junior", score: 650, submissions: 28, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rusty" },
    { id: "U_8855", name: "Turbo_C", rating: "Grandmaster", score: 3100, submissions: 605, face: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Flash" }
  ];

const rankStyles = {
  Grandmaster: "text-rose-500 border-rose-500/20 bg-rose-500/10",
  Knight: "text-sky-400 border-sky-400/20 bg-sky-400/10",
  Apprentice: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  Junior: "text-slate-400 border-white/10 bg-white/5",
};

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/notebooks" className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back_to_Vault</span>
        </Link>

        <div className="flex items-end gap-4 mb-12">
          <div className="p-4 bg-amber-500 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <Trophy size={40} className="text-black" />
          </div>
          <div>
            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Top Contributors</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Global Rankings</p>
          </div>
        </div>

        <div className="space-y-3">
          {DUMMY_LEADERS.map((user, index) => (
            <div 
              key={user.id}
              className="group relative flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-6">
                {/* COMICAL FACE */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-white/10 overflow-hidden group-hover:scale-110 transition-transform">
                    <img src={user.face} alt="avatar" className="w-full h-full" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-4 border-[#020617]">
                    {index + 1}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black text-white italic tracking-tight">{user.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${rankStyles[user.rating]}`}>
                      {user.rating}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-600 mt-1 uppercase tracking-widest">UID: {user.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Submissions</span>
                  <div className="flex items-center gap-1">
                    <Target size={12} className="text-sky-500" />
                    <span className="text-sm font-mono text-white">{user.submissions}</span>
                  </div>
                </div>
                
                <div className="text-right min-w-[80px]">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rating</span>
                  <div className="flex items-center justify-end gap-1">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-xl font-black text-white italic">{user.score}</span>
                  </div>
                </div>
              </div>

              {/* Decorative Rank Line */}
              <div className="absolute bottom-0 left-20 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}