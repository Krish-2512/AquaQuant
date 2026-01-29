"use client";
import React, { useState } from 'react';
import { 
  BookOpen, Sigma, TrendingUp, ShieldCheck, 
  ChevronRight, Search, Binary, Cpu, 
  ChevronDown, X,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function TheoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const THEORIES = [
    {
      id: "black-scholes",
      title: "Black-Scholes-Merton_Model",
      category: "Derivatives",
      difficulty: "Advanced",
      content: `The Black-Scholes model is a mathematical framework for pricing an options contract. It estimates the variation over time of financial instruments such as stocks. 

### Key Components:
* **S**: Current stock price
* **K**: Strike price
* **t**: Time to expiration
* **r**: Risk-free interest rate
* **σ**: Volatility

The model assumes that stock prices follow a lognormal distribution because prices cannot be negative. It also assumes there are no transaction costs or taxes, and that the risk-free interest rate and volatility are constant. Quant firms use this as a baseline, though they often adjust for "volatility smiles" where implied volatility differs across strike prices.`,
      icon: <Sigma className="text-sky-400" />,
      color: "border-sky-500/20"
    },
    {
      id: "kelly-criterion",
      title: "Kelly_Criterion_Strategy",
      category: "Risk_Management",
      difficulty: "Intermediate",
      content: `In probability theory, the Kelly Criterion is a formula used to determine the optimal size of a series of bets. In a gambling or investment scenario, it maximizes the expected value of the logarithm of wealth.

### The Formula:
$f^* = \frac{bp - q}{b}$

Where:
* **f***: The fraction of the current bankroll to wager.
* **b**: The odds received on the wager (e.g., betting $1 to win $b).
* **p**: The probability of winning.
* **q**: The probability of losing ($1-p$).

For quants, Kelly is the gold standard for position sizing, though most firms use 'Fractional Kelly' (e.g., half-Kelly) to reduce the extreme volatility and drawdown risk associated with the pure formula.`,
      icon: <ShieldCheck className="text-amber-400" />,
      color: "border-amber-500/20"
    },
    {
      id: "market-microstructure",
      title: "Microstructure_&_Order_Flow",
      category: "Trading",
      difficulty: "Hard",
      content: `Market microstructure is the study of how the exchange's mechanics influence the pricing of assets. High-frequency firms like HRT and Jump Trading focus heavily here.

### Concepts Covered:
1. **Bid-Ask Spread**: The compensation market makers receive for providing liquidity.
2. **Adverse Selection**: The risk that a market maker trades with someone who has better information.
3. **Price Impact**: How much a trade moves the market price. Large institutional orders are often split into smaller "child orders" to minimize this.
4. **Order Book Dynamics**: Analyzing the 'depth' (limit orders) vs the 'liquidity' (market orders) to predict short-term price movements.`,
      icon: <Binary className="text-emerald-400" />,
      color: "border-emerald-500/20"
    },
    {
      id: "central-limit-theorem",
      title: "Central_Limit_Theorem_(CLT)",
      category: "Statistics",
      difficulty: "Medium",
      content: `The CLT is the backbone of statistical inference. It states that the distribution of sample means approximates a normal distribution as the sample size becomes larger, regardless of the population's distribution shape.

### Importance in Quant:
Quants use CLT to justify the use of normal distribution-based models (like VaR or standard deviation) when dealing with large datasets of returns. However, "Fat Tails" (kurtosis) in financial data often violate these assumptions, leading to the need for Student's t-distributions or Lévy flights in more robust risk modeling.`,
      icon: <Cpu className="text-purple-400" />,
      color: "border-purple-500/20"
    }
  ];

  const filteredTheories = THEORIES.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
      <Link
      href="/dashboard" 
      className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-sky-400 transition-colors group"
    >
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
    </Link>
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} className="text-sky-500" />
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Theory</h1>
            </div>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">
              Alpha_Library
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Filter Concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white uppercase tracking-widest focus:border-sky-500/50 outline-none transition-all placeholder:text-slate-700"
            />
          </div>
        </div>

        {/* THEORY LIST */}
        <div className="space-y-4">
          {filteredTheories.map((theory) => (
            <div 
              key={theory.id}
              className={`group bg-white/[0.02] border ${theory.color} rounded-[32px] overflow-hidden transition-all duration-500 ${expandedId === theory.id ? 'bg-white/[0.05] ring-1 ring-white/10' : ''}`}
            >
              <div 
                onClick={() => setExpandedId(expandedId === theory.id ? null : theory.id)}
                className="p-8 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-black/40 rounded-2xl group-hover:scale-110 transition-transform shadow-xl">
                    {theory.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.2em]">{theory.category}</span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{theory.difficulty}</span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight group-hover:text-sky-400 transition-colors">
                      {theory.title}
                    </h3>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${expandedId === theory.id ? 'rotate-180 text-sky-400' : 'text-slate-600'}`}>
                  <ChevronDown size={24} />
                </div>
              </div>

              {expandedId === theory.id && (
                <div className="px-8 pb-8 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="h-px bg-white/5 w-full mb-8" />
                  <div className="prose prose-invert max-w-none">
                    <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-medium">
                      {theory.content}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-3">
                    {['PDF_Manual', 'Video_Lecture', 'Practice_Problems'].map(btn => (
                      <button key={btn} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/40 transition-all">
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTheories.length === 0 && (
          <div className="py-20 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-[40px]">
            <X size={40} className="text-slate-800 mx-auto mb-4" />
            <p className="text-slate-600 font-mono text-xs uppercase tracking-[0.3em]">Query</p>
          </div>
        )}
      </div>
    </div>
  );
}