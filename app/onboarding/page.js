"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
    const [formData, setFormData] = useState({ university: '', gradYear: '', experience: '' });
    const { update } = useSession(); // Used to refresh the session
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const res = await fetch('/api/user/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        // THIS IS THE KEY: Tell NextAuth to update the session data locally
        await update({ isOnboarded: true });
        router.push('/dashboard');
        router.refresh(); 
      }
    };
  

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-black text-white italic mb-2 uppercase tracking-tighter">Initialize_Profile</h2>
        <p className="text-slate-500 text-xs mb-8 font-mono">Input your institutional data to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">University</label>
            <input 
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500"
              onChange={(e) => setFormData({...formData, university: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Grad Year</label>
              <input 
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500"
                onChange={(e) => setFormData({...formData, gradYear: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase mb-2">Exp (Years)</label>
              <input 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky-500"
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>
          </div>
          <button className="w-full bg-sky-500 hover:bg-sky-400 text-sky-950 font-black py-4 rounded-xl transition-all uppercase text-xs tracking-widest">
            Complete_Setup
          </button>
        </form>
      </div>
    </div>
  );
}