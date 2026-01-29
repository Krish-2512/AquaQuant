"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import aqua_logo from '../../public/aqua_logo.png'; 
import { Check, Zap, Crown, Rocket, ArrowRight, Terminal, Activity, Shield, Users, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SubscriptionPage = () => {
  const [answer, setAnswer] = useState('');

  const plans = [
    {
      name: "Quant Starter",
      price: "0",
      description: "Perfect for beginners getting a feel for the terminal.",
      features: ["5 Practice Problems/day", "Basic Finance Theory", "Public Notebook Access", "Community Forum"],
      icon: <Zap className="text-sky-400" size={24} />,
      buttonText: "Current Plan",
      highlight: false
    },
    {
      name: "Pro Trader",
      price: "500",
      description: "Comprehensive coverage for top-tier firm interviews.",
      features: ["Unlimited Practice Problems", "IIT-IIM Curated Puzzles", "Private Notebook Storage", "Probability & Stats Deep-dive", "Priority Support"],
      icon: <Rocket className="text-blue-400" size={24} />,
      buttonText: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Elite Institutional",
      price: "1000",
      description: "Advanced terminal access for serious candidates.",
      features: ["Verified Talent Pipeline", "1-on-1 Portfolio Review", "Mock Interview Simulations", "Enterprise Dataset Access", "All Premium Solvers"],
      icon: <Crown className="text-yellow-400" size={24} />,
      buttonText: "Go Elite",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen text-white selection:bg-sky-400/30 font-sans overflow-x-hidden relative">
      
      {/* --- SHARED BACKGROUND SYSTEM (Identical to Landing Page) --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617] via-[#062c43]/80 to-[#0ea5e9]/30" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-sky-500/10 blur-[150px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[70%] h-[70%] bg-black/50 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        
        {/* NAVIGATION */}
        <nav className="py-8 px-10 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-[100]">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-white font-medium lowercase italic opacity-80">by</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <NextImage src={aqua_logo} alt="Aqua Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter italic uppercase text-sky-400">Lab</span>
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white ml-1">Aqua</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-10 text-[14px] font-mono uppercase tracking-[0.3em] text-sky-100 font-bold">
            {['Notebooks', 'Questions', 'Subscription'].map((item) => (
              <Link 
                key={item} 
                href={item === 'Subscription' ? '/subscription' : `/#${item.toLowerCase()}`} 
                className={`hover:text-white transition-colors cursor-pointer ${item === 'Subscription' ? 'text-sky-400' : ''}`}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <Link href="/auth/signin">
              <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 hover:bg-white transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                Terminal_Auth
              </button>
            </Link>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-32 pb-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sky-400 font-mono text-[10px] tracking-[0.8em] uppercase mb-4 font-black">
              Subscription_Model_v2.6
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-8">
              Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">Edge.</span>
            </h1>
            <p className="text-sky-100/60 max-w-2xl mx-auto font-light leading-relaxed italic text-lg">
              Access the complete vault of probability drills, stochastic calculus masterclasses, and our elite institutional talent pipeline.
            </p>
          </motion.div>
        </section>

        {/* PRICING GRID */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative p-10 rounded-[45px] border transition-all duration-500 flex flex-col ${
                  plan.highlight 
                  ? 'border-sky-400 bg-sky-500/10 shadow-[0_0_60px_-15px_rgba(56,189,248,0.4)] backdrop-blur-xl' 
                  : 'border-white/10 bg-white/5 backdrop-blur-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-400 text-sky-950 text-[9px] font-mono px-6 py-1.5 rounded-full uppercase tracking-[0.3em] font-black shadow-xl">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                    {plan.icon}
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-3">{plan.name}</h3>
                  <p className="text-slate-400 text-sm font-light italic leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black italic">₹{plan.price}</span>
                    <span className="text-sky-400 font-mono text-[10px] uppercase tracking-widest font-bold">/ Yearly</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm text-slate-300 group">
                      <div className="mt-1 bg-sky-500/20 p-1 rounded-md group-hover:bg-sky-500/40 transition-colors">
                        <Check size={12} className="text-sky-400" />
                      </div>
                      <span className="font-light italic tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-5 rounded-[22px] font-black uppercase text-xs tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3 group ${
                  plan.highlight 
                  ? 'bg-white text-sky-950 hover:bg-sky-400 hover:text-white shadow-2xl' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-sky-950'
                }`}>
                  {plan.buttonText}
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SYSTEM STATUS FOOTER SECTION */}
        <section className="py-24 max-w-5xl mx-auto px-6 text-center relative z-10">
  {/* The Trust Bar */}
  <div className="grid md:grid-cols-3 gap-12 mb-20 opacity-60">
    <div className="flex flex-col items-center gap-3">
      <Shield className="text-sky-400" size={24} />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Bank-Grade Security</span>
    </div>
    <div className="flex flex-col items-center gap-3 border-x border-white/10 px-4">
      <Users className="text-sky-400" size={24} />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">IIT-IIM Alumni Network</span>
    </div>
    <div className="flex flex-col items-center gap-3">
      <Globe className="text-sky-400" size={24} />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Global Firm Placement</span>
    </div>
  </div>

  {/* Main Footer Card */}
  <div className="p-12 border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[50px] backdrop-blur-xl relative overflow-hidden group">
    {/* Subtle internal glow */}
    <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    
    <div className="relative z-10">
      <div className="flex justify-center gap-6 mb-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
        <Activity size={18} className="text-sky-400" />
        <div className="w-px h-4 bg-white/20 self-center" />
        <Terminal size={18} className="text-sky-400" />
        <div className="w-px h-4 bg-white/20 self-center" />
        <Zap size={18} className="text-sky-400" />
      </div>

      <h4 className="text-white text-xs font-mono font-black uppercase tracking-[0.6em] mb-6">
        Institutional Integrity & Professional Excellence
      </h4>
      
      <p className="text-slate-500 text-[11px] font-medium leading-loose max-w-2xl mx-auto italic">
        AQUA is more than a practice tool; it is a rigorous simulation of the financial world. Our methodology is built on 
        <span className="text-sky-200"> first-principles thinking</span>, designed to prepare the next generation of 
        quantitative thinkers for the industry's most demanding desks.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">
        <span>Privacy_Protocol</span>
        <span>Service_Agreement</span>
        <span>Secure_Encryption_Active</span>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[9px] font-mono text-slate-700 tracking-[0.2em] uppercase">
          © 2026 AQUA_ADVANCED_QUANTITATIVE_ANALYTICS
        </span>
        <span className="text-sky-500/30 text-[9px] font-mono tracking-widest font-bold">
          CORE_ENGINE_ID: QP-CELESTIAL-5545
        </span>
      </div>
    </div>
  </div>
</section>
      </div>
    </div>
  );
};

export default SubscriptionPage;