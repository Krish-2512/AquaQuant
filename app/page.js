





// "use client";
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Activity, Calendar, MapPin, Zap, ChevronRight, 
//   Github, X, Linkedin, Cpu, Terminal,
//   Target, Globe, BarChart3, Briefcase, Rocket, Shield,
//   ChevronLeft, Quote, BookOpen, Users
// } from 'lucide-react';
// import Link from 'next/link';

// // --- DATA ---
// const tickerMessages = [
//   "SYSTEM_ACTIVE: QuantPrep Interview Engine v1.0",
//   "PROBLEM_FEED: New Probability Drills Added",
//   "LEADERBOARD_UPDATE: Global Rankings Refreshed"
// ];

// const events = [
//   { title: "Jane Street OTC Challenge", date: "Jan 15, 2026", location: "Global / Online", type: "Competition" },
//   { title: "Stochastic Calculus Masterclass", date: "Feb 02, 2026", location: "London Terminal", type: "Workshop" },
//   { title: "Citadel Superday Preparation", date: "Feb 18, 2026", location: "New York HQ", type: "Event" }
// ];

// const orbits = [
//   { name: "Black Scholes", speed: 12, radius: 160 },
//   { name: "CLT", speed: 18, radius: 200 },
//   { name: "Martingales", speed: 15, radius: 240 },
//   { name: "Nash Equilibrium", speed: 22, radius: 280 },
//   { name: "Brownian Motion", speed: 20, radius: 320 },
//   { name: "Stochastic Calculus", speed: 28, radius: 360 },
//   { name: "Stars and Bars", speed: 32, radius: 400 },
//   { name: "Options Theory", speed: 25, radius: 440 },
//   { name: "Recursion", speed: 35, radius: 480 },
//   { name: "Inclusion-Exclusion", speed: 30, radius: 520 },
//   { name: "Asset Pricing", speed: 40, radius: 560 },
//   { name: "Game Theory", speed: 24, radius: 600 },
// ];

// const testimonials = [
//   {
//     quote: "The probability drills on QuantPrep are the closest I've found to the actual technical rounds at Jane Street. The numeric validation is unforgiving, exactly like a real superday.",
//     author: "Alex V.",
//     role: "Quantitative Trader @ Top-tier Prop Firm",
//     metric: "Cleared Level 5 Vault"
//   },
//   {
//     quote: "Most platforms focus on coding. QuantPrep focuses on the 'Math intuition' that boutique firms actually look for. It changed how I approach stochastic modeling.",
//     author: "Sarah L.",
//     role: "MFE Graduate, NYU",
//     metric: "Top 2% Global Rank"
//   },
//   {
//     quote: "The Enterprise Pipeline metrics helped our HR team identify three high-potential candidates who didn't have traditional Ivy League backgrounds but possessed elite logic.",
//     author: "Marcus D.",
//     role: "Head of Quant Talent @ Global Hedge Fund",
//     metric: "Institutional Partner"
//   }
// ];

// const QuantNexus = () => {
//   return (
//     <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.3)_0%,_transparent_75%)]" />
//       {[1.2, 1.5, 1.8].map((s, i) => (
//         <motion.div 
//           key={i}
//           animate={{ scale: [1, s], opacity: [0.4, 0] }}
//           transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
//           className="absolute border border-sky-400/40 rounded-full w-[400px] h-[400px]"
//         />
//       ))}
//       <motion.div 
//         whileHover={{ scale: 1.1, rotate: 90 }}
//         className="z-50 bg-white backdrop-blur-3xl border-2 border-sky-400 w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.5)]"
//       >
//         <span className="text-sky-950 font-black italic text-5xl tracking-tighter">QUANT</span>
//         <div className="h-[2px] w-12 bg-sky-200 my-3" />
//         <span className="text-[10px] font-mono text-sky-600 uppercase tracking-[0.5em] font-bold">Nexus_OS</span>
//       </motion.div>
//       {orbits.map((orb, i) => (
//         <motion.div
//           key={i}
//           className="absolute border border-sky-300/10 rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           style={{ width: orb.radius * 2, height: orb.radius * 2 }}
//         >
//           <motion.div 
//             className="bg-white px-4 py-1.5 rounded-full whitespace-nowrap text-[10px] font-mono font-black text-sky-900 shadow-xl border border-sky-100"
//             style={{ position: 'absolute', top: '50%', left: '-20px' }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           >
//             {orb.name}
//           </motion.div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const TestimonialCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
//   const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

//   return (
//     <div className="relative max-w-5xl mx-auto px-6">
//       <div className="flex justify-between items-center mb-12">
//         <div className="text-left">
//            <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.5em] uppercase mb-4 block">TESTIMONIALS</span>
//            <h2 className="text-4xl font-black uppercase italic tracking-tighter">User Feedback.</h2>
//         </div>
//         <div className="flex gap-4">
//            <button onClick={prev} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronLeft size={20}/></button>
//            <button onClick={next} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronRight size={20}/></button>
//         </div>
//       </div>
//       <div className="relative h-[350px] md:h-[250px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5, ease: "circOut" }}
//             className="absolute inset-0 flex flex-col md:flex-row gap-10 items-start md:items-center text-left"
//           >
//             <div className="flex-1">
//               <Quote className="text-sky-500/20 mb-6" size={48} />
//               <p className="text-2xl md:text-3xl font-light italic text-slate-100 leading-relaxed tracking-tight">
//                 "{testimonials[index].quote}"
//               </p>
//             </div>
//             <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[30px] backdrop-blur-xl">
//                <h4 className="font-black uppercase italic text-sky-400 mb-1">{testimonials[index].author}</h4>
//                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">{testimonials[index].role}</p>
//                <div className="h-px w-full bg-white/10 mb-4" />
//                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold">
//                   <Zap size={12} /> {testimonials[index].metric}
//                </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default function Page() {
//   const [tickerIndex, setTickerIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => 
//       setTickerIndex(prev => (prev + 1) % tickerMessages.length), 3000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   if (!hasMounted) return <div className="min-h-screen bg-[#020617]" />;

//   return (
//     <>
//       <script src="https://cdn.tailwindcss.com"></script>
//       <div className="min-h-screen bg-[#020617] text-white selection:bg-sky-400/30 font-sans overflow-x-hidden relative">
        
//         {/* BACKGROUND */}
//         <div className="fixed inset-0 z-0">
//           <div className="absolute inset-0 bg-[#020617]" />
//           <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-gradient-to-br from-sky-500/20 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
//           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
//         </div>

//         <div className="relative z-10">
//           {/* TICKER */}
//           <div className="bg-white text-sky-950 py-2.5 overflow-hidden sticky top-0 z-[100] font-black uppercase tracking-widest text-[11px] shadow-2xl">
//             <div className="flex items-center px-8">
//               <Activity size={14} className="mr-3 animate-pulse text-sky-600" />
//               <AnimatePresence mode="wait">
//                 <motion.span key={tickerIndex} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
//                   {tickerMessages[tickerIndex]}
//                 </motion.span>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* NAVIGATION */}
//           <nav className="py-8 px-10 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-[41px] z-[90]">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-white">Q</div>
//               <span className="text-2xl font-black tracking-tighter italic uppercase text-white">Aqua</span>
//             </div>
//             <div className="hidden lg:flex gap-10 text-[14px] font-mono uppercase tracking-[0.3em] text-sky-300 font-bold">
//               {['Notebooks', 'Questions', 'Subscription'].map(item => (
//                 <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
//               ))}
//             </div>
//             <Link href="/auth/signin">
//               <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button>
//             </Link>
//           </nav>

//           {/* HERO */}
//           <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
//               <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
//               Ace Quant <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-500">Exams.</span>
//               </h1>
//               <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed italic">
//                 Solve real quant interview problems in probability, statistics, and coding. Exactly how top firms test candidates.
//               </p>
//               <div className="flex justify-center gap-6">
//                 <button className="bg-white text-sky-950 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl" >Start Solving</button>
//               </div>
//           </section>

//           {/* ORBITAL NEXUS */}
//           <section className="py-20 border-y border-white/5 bg-sky-400/5">
//             <div className="text-center mb-[-100px] relative z-20">
//               <h2 className="text-xs font-mono text-sky-400 tracking-[1em] uppercase mb-4">Core Quant Topics</h2>
//               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Interview Coverage</h3>
//             </div>
//             <QuantNexus />
//           </section>

//           {/* UPDATED ABOUT SECTION (FROM UPLOADED IMAGE 1) */}
//           <section className="py-40 px-6 bg-white text-sky-950">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-16">
//                  <span className="text-sky-600 font-mono text-[14px] font-black tracking-[0.5em] uppercase block mb-2">About</span>
//                  <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Our Institute</h2>
//               </div>
              
//               <div className="bg-sky-50 rounded-[40px] p-10 md:p-16 border border-sky-100 shadow-sm mb-12">
//                 <div className="flex flex-col gap-6">
//                   <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Advanced Quantitative Analytics</h3>
//                   <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 uppercase font-mono tracking-wider">
//                     <span className="flex items-center gap-2"><BookOpen size={18}/> Quant Finance</span>
//                     <span className="flex items-center gap-2"><Globe size={18}/> M.S., M.B.A.</span>
//                     <span className="flex items-center gap-2"><Users size={18}/> 10+ years' of cumulative experience</span>
//                   </div>
//                   <div className="h-px bg-slate-200 w-full my-4" />
//                   <h4 className="text-xl font-black uppercase italic">About</h4>
//                   <p className="text-slate-600 text-lg leading-relaxed font-medium">
//                     Welcome to AQUA, where learning is exciting and everyone thrives. With passionate teachers, top facilities, and cutting-edge tech, we support personal and academic growth. Embracing diversity, we value each unique perspective. Through partnerships, we offer hands-on experiences bridging classroom learning with the real world. Join us in this journey of exploration and empowerment in financial markets, unlocking endless opportunities for success and positive impact.
//                   </p>
//                 </div>
//               </div>

//               {/* METRICS BOXES (FROM UPLOADED IMAGE 1) */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="bg-sky-50 rounded-[30px] p-10 flex justify-between items-center border border-sky-100">
//                   <div>
//                     <h5 className="text-5xl font-black text-slate-900">3</h5>
//                     <p className="text-slate-500 font-bold uppercase tracking-widest mt-2">Courses</p>
//                   </div>
//                   <BookOpen size={40} className="text-slate-300" />
//                 </div>
//                 <div className="bg-sky-50 rounded-[30px] p-10 flex justify-between items-center border border-sky-100">
//                   <div>
//                     <h5 className="text-5xl font-black text-slate-900">1000+</h5>
//                     <p className="text-slate-500 font-bold uppercase tracking-widest mt-2">Active Students</p>
//                   </div>
//                   <Users size={40} className="text-slate-300" />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* UPDATED COURSES SECTION (FROM UPLOADED IMAGE 2) */}
//           <section className="py-40 bg-slate-50 text-sky-950 border-t border-slate-200">
//             <div className="max-w-7xl mx-auto px-6">
//               <div className="mb-20">
//                 <span className="text-sky-600 font-mono text-[14px] font-black tracking-[0.5em] uppercase block mb-2">IN-DEMAND</span>
//                 <h2 className="text-7xl font-black uppercase italic tracking-tighter">Our Courses</h2>
//               </div>

//               <div className="grid lg:grid-cols-3 gap-10">
//                 {[
//                   {
//                     title: "Introduction to Quant Finance and Financial Engineering",
//                     desc: "A structured foundation in financial markets, risk, and quantitative thinking that trains learners to analyze, model, and reason about financial decisions under uncertainty using industry-aligned frameworks."
//                   },
//                   {
//                     title: "Introduction to Classical Trading",
//                     desc: "A practical grounding in technical and fundamental market analysis that enables learners to interpret price action, valuation, and market behavior through disciplined, repeatable decision frameworks."
//                   },
//                   {
//                     title: "Introduction to Algorithmic Trading",
//                     desc: "A systematic introduction to data-driven and quantitative trading that equips learners to design, evaluate, and reason about algorithmic decision systems using statistical, computational, and market-aware principles."
//                   }
//                 ].map((course, i) => (
//                   <div key={i} className="bg-white rounded-[40px] p-12 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:scale-105 transition-transform duration-500">
//                     <div className="w-20 h-20 bg-lime-50 rounded-full flex items-center justify-center mb-10 border border-lime-100">
//                        <div className="w-10 h-10 border-2 border-lime-500 rounded-lg flex items-center justify-center">
//                           <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-lime-500 border-b-[6px] border-b-transparent ml-1" />
//                        </div>
//                     </div>
//                     <h4 className="text-2xl font-black uppercase leading-tight mb-8 min-h-[80px]">{course.title}</h4>
//                     <p className="text-slate-500 leading-relaxed font-medium italic">{course.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* 7. UNIVERSAL STANDARDS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-3 gap-12">
//               <div className="lg:col-span-2 text-left">
//                  <h2 className="text-6xl font-black uppercase italic mb-8 tracking-tighter leading-[0.9]">Universal <br/> Standards.</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                    {["Probability", "Statistics", "Puzzles", "Quant Coding", "Linear Algebra", "Stochastic Processes","BrainTeasers","Mental Maths"]
//                     .map(topic => (
//                      <div key={topic} className="p-5 border border-white/10 bg-white/5 rounded-2xl text-[10px] font-mono text-sky-400 uppercase tracking-widest hover:border-sky-400/50 transition-colors cursor-default">
//                        {topic}
//                      </div>
//                    ))}
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-sky-500 to-blue-700 p-10 rounded-[40px] shadow-2xl text-left flex flex-col justify-center border border-white/20">
//                  <p className="text-2xl font-black leading-tight italic text-white">"We don't train traders. We train quant thinkers."
//                  </p>
//               </div>
//             </div>
//           </section>

//           {/* 9. NOTEBOOK SECTION */}
//           <section className="py-32 border-y border-white/5">
//              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
//                <div className="text-left">
//                 <h2 className="text-5xl font-black uppercase mb-8 italic tracking-tighter">Quant Workspace</h2>
//                  <p className="text-slate-400 mb-10 italic">Collaborative problem-solving environments for simulations, numeric reasoning, and interview-style quant coding.</p>
//                  <ul className="space-y-4">
//                   {["Numeric Answer Validation", "Simulation-Based Problems", "Open Practice Logs"]
//                     .map(item => (
//                      <li key={item} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sky-400">
//                         <ChevronRight size={14} /> {item}
//                      </li>
//                    ))}
//                 </ul>
//               </div>
//               <div className="bg-black border-2 border-sky-400/30 rounded-3xl p-8 font-mono text-sm shadow-2xl relative text-left">
//                   <div className="absolute top-4 right-4 flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div>
//                   <p className="text-sky-400">import quantprep as qp</p>
//                   <p className="text-slate-600 italic"># Initialize Heston Model Solver</p>
//                   <p className="text-white">model = qp.models.Heston(S0=100)</p>
//                   <p className="text-white">price = model.calibrate(market_data)</p>
//                  <div className="mt-10 h-1 bg-white/5 rounded-full overflow-hidden">
//                      <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 2 }} className="h-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
//                   </div>
//                </div>
//             </div>
//           </section>

//           {/* ENTERPRISE SECTION */}
//           <section className="py-40 bg-slate-900/30">
//             <div className="max-w-7xl mx-auto px-6 text-left">
//               <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//                 <div>
//                   <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Institutional_Services</span>
//                   <h2 className="text-5xl font-black uppercase italic tracking-tighter">Enterprise Pipeline.</h2>
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {[
//                   { title: "Benchmarking", desc: "Source verified quants who cleared Level 5 tests.", icon: <Briefcase size={24} /> },
//                   { title: "Validation", desc: "Stress-testing of execution logic and risk parameters.", icon: <Shield size={24} /> },
//                   { title: "Readiness", desc: "Custom stochastic models for boutique prop firms.", icon: <Rocket size={24} /> }
//                 ].map((biz, i) => (
//                   <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[50px] hover:bg-white/10 transition-all">
//                      <div className="text-sky-400 mb-8">{biz.icon}</div>
//                      <h4 className="text-2xl font-black uppercase italic text-white mb-6 leading-tight">{biz.title}</h4>
//                      <p className="text-slate-500 text-sm leading-relaxed italic">{biz.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* TESTIMONIALS */}
//           <section className="py-40 border-b border-white/5">
//             <TestimonialCarousel />
//           </section>

//           {/* UPCOMING EVENTS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="text-left mb-16">
//               <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Global_Network</span>
//               <h2 className="text-5xl font-black uppercase italic tracking-tighter">Upcoming Events.</h2>
//             </div>
//             <div className="grid md:grid-cols-3 gap-6">
//               {events.map((event, idx) => (
//                 <div key={idx} className="bg-white text-sky-950 p-8 rounded-[40px] text-left hover:scale-105 transition-all shadow-xl">
//                   <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-black mb-6 block">{event.type}</span>
//                   <h4 className="text-2xl font-black uppercase italic mb-8 leading-tight">{event.title}</h4>
//                   <div className="space-y-3 font-mono text-[11px] text-slate-400 uppercase font-bold tracking-widest">
//                      <div className="flex items-center gap-3"><Calendar size={14} /> {event.date}</div>
//                      <div className="flex items-center gap-3"><MapPin size={14} /> {event.location}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* INTERVIEW DRILL */}
//           <section className="py-40 px-6">
//              <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-400 to-blue-600 p-16 rounded-[60px] text-center shadow-2xl relative overflow-hidden">
//              <Zap className="text-white mx-auto mb-8 animate-bounce" size={48} />
//               <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tight text-white">Quant Interview Drill</h2>
//               <p className="text-sky-100 text-[10px] font-mono uppercase tracking-[0.5em] mb-10">Problem_ID: QP-PROB-082</p>
//                <p className="text-white text-2xl font-bold mb-14 italic max-w-2xl mx-auto">"At least one of two dice is a 6. What is the probability the sum is 8?"</p>
//                <div className="flex flex-col gap-6 items-center">
//                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
//                  <input 
//                     type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
//                     className="bg-black/20 border border-white/20 rounded-2xl px-8 py-5 flex-1 font-mono text-white placeholder:text-sky-200 outline-none focus:border-white transition-all" placeholder="Enter (e.g. 2/11)"
//                   />
//                   <button className="bg-white text-sky-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-100 transition-colors shadow-2xl">Submit Answer</button>
//                </div>
//                <button className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity mt-4 border-b border-white/20 pb-1">
//                    <Terminal size={12} /> Go to Problem Set
//                 </button>
//               </div>
//             </div>
//            </section>

//           {/* FOOTER */}
//           <footer className="bg-black/40 border-t border-white/10">
//             {/* 1. SEPARATED COMPANY HEADER */}
//             <div className="py-20 border-b border-white/5">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.4em] uppercase mb-12 block text-center opacity-50">Include Questions Asked In</span>
//                     <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
//                         {['CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'].map(firm => (
//                             <span key={firm} className="text-lg md:text-3xl font-black font-mono text-white tracking-tighter hover:text-sky-400 transition-colors">
//                                 {firm}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* 2. MAIN FOOTER CONTENT */}
//             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 py-32 text-left">
//               <div className="col-span-2">
//                 <span className="text-2xl font-black tracking-tighter italic uppercase text-white">AQUA</span>
//                 <p className="text-slate-500 mt-6 max-w-md italic font-light">
//                    The industry standard for quantitative interview preparation and technical logic evaluation.
//                 </p>
//                 <div className="flex gap-4 mt-10">
//                     {[Github, X, Linkedin].map((Icon, i) => (
//                       <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all border border-white/5"><Icon size={20} /></a>
//                     ))}
//                 </div>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Resource</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer">Notebooks</li>
//                   <li className="hover:text-white cursor-pointer">Vault</li>
//                   <li className="hover:text-white cursor-pointer">Solver</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Enterprise</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer">Talent Pipeline</li>
//                   <li className="hover:text-white cursor-pointer">Sponsorship</li>
//                   <li className="hover:text-white cursor-pointer">Terminal Access</li>
//                 </ul>
//               </div>
//             </div>

//             {/* 3. SYSTEM BAR */}
//             <div className="max-w-7xl mx-auto px-6 pb-10">
//               <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 tracking-[0.3em] uppercase border-t border-white/5 pt-10">
//                 <span>© 2026 QUANT_PRISM_OS</span>
//                 <span>SYSTEM_ID: QP-CELESTIAL-5545</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// }




// "use client";
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Activity, Calendar, MapPin, Zap, ChevronRight, 
//   Github, X as XIcon, Linkedin, Cpu, Terminal,
//   Target, Globe, BarChart3, Briefcase, Rocket, Shield,
//   ChevronLeft, Quote, BookOpen, Users, ArrowRight, GraduationCap
// } from 'lucide-react';
// import Link from 'next/link';

// // --- DATA ---
// const tickerMessages = [
//   "SYSTEM_ACTIVE: QuantPrep Interview Engine v1.0",
//   "PROBLEM_FEED: New Probability Drills Added",
//   "LEADERBOARD_UPDATE: Global Rankings Refreshed"
// ];

// const events = [
//   { 
//     title: "Jane Street OTC Challenge", 
//     date: "Jan 15, 2026", 
//     location: "Global / Online", 
//     type: "Competition",
//     difficulty: "Elite",
//     color: "from-blue-500 to-cyan-400"
//   },
//   { 
//     title: "Stochastic Calculus Masterclass", 
//     date: "Feb 02, 2026", 
//     location: "London Terminal", 
//     type: "Workshop",
//     difficulty: "Advanced",
//     color: "from-purple-500 to-indigo-400"
//   },
//   { 
//     title: "Citadel Superday Preparation", 
//     date: "Feb 18, 2026", 
//     location: "New York HQ", 
//     type: "Event",
//     difficulty: "Specialized",
//     color: "from-emerald-500 to-teal-400"
//   }
// ];

// const orbits = [
//   { name: "Black Scholes", speed: 12, radius: 160 },
//   { name: "CLT", speed: 18, radius: 200 },
//   { name: "Martingales", speed: 15, radius: 240 },
//   { name: "Nash Equilibrium", speed: 22, radius: 280 },
//   { name: "Brownian Motion", speed: 20, radius: 320 },
//   { name: "Stochastic Calculus", speed: 28, radius: 360 },
//   { name: "Stars and Bars", speed: 32, radius: 400 },
//   { name: "Options Theory", speed: 25, radius: 440 },
//   { name: "Recursion", speed: 35, radius: 480 },
//   { name: "Inclusion-Exclusion", speed: 30, radius: 520 },
//   { name: "Asset Pricing", speed: 40, radius: 560 },
//   { name: "Game Theory", speed: 24, radius: 600 },
// ];

// const testimonials = [
//   {
//     quote: "The probability drills on QuantPrep are the closest I've found to the actual technical rounds at Jane Street. The numeric validation is unforgiving, exactly like a real superday.",
//     author: "Alex V.",
//     role: "Quantitative Trader @ Top-tier Prop Firm",
//     metric: "Cleared Level 5 Vault"
//   },
//   {
//     quote: "Most platforms focus on coding. QuantPrep focuses on the 'Math intuition' that boutique firms actually look for. It changed how I approach stochastic modeling.",
//     author: "Sarah L.",
//     role: "MFE Graduate, NYU",
//     metric: "Top 2% Global Rank"
//   },
//   {
//     quote: "The Enterprise Pipeline metrics helped our HR team identify three high-potential candidates who didn't have traditional Ivy League backgrounds but possessed elite logic.",
//     author: "Marcus D.",
//     role: "Head of Quant Talent @ Global Hedge Fund",
//     metric: "Institutional Partner"
//   }
// ];

// const QuantNexus = () => {
//   return (
//     <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.3)_0%,_transparent_75%)]" />
//       {[1.2, 1.5, 1.8].map((s, i) => (
//         <motion.div 
//           key={i}
//           animate={{ scale: [1, s], opacity: [0.4, 0] }}
//           transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
//           className="absolute border border-sky-400/40 rounded-full w-[400px] h-[400px]"
//         />
//       ))}
//       <motion.div 
//         whileHover={{ scale: 1.1, rotate: 90 }}
//         className="z-50 bg-white backdrop-blur-3xl border-2 border-sky-400 w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.5)]"
//       >
//         <span className="text-sky-950 font-black italic text-5xl tracking-tighter">QUANT</span>
//         <div className="h-[2px] w-12 bg-sky-200 my-3" />
//         <span className="text-[10px] font-mono text-sky-600 uppercase tracking-[0.5em] font-bold">Nexus_OS</span>
//       </motion.div>
//       {orbits.map((orb, i) => (
//         <motion.div
//           key={i}
//           className="absolute border border-sky-300/10 rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           style={{ width: orb.radius * 2, height: orb.radius * 2 }}
//         >
//           <motion.div 
//             className="bg-white px-4 py-1.5 rounded-full whitespace-nowrap text-[10px] font-mono font-black text-sky-900 shadow-xl border border-sky-100"
//             style={{ position: 'absolute', top: '50%', left: '-20px' }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           >
//             {orb.name}
//           </motion.div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const TestimonialCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
//   const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

//   return (
//     <div className="relative max-w-5xl mx-auto px-6">
//       <div className="flex justify-between items-center mb-12 text-white">
//         <div className="text-left">
//            <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.5em] uppercase mb-4 block">TESTIMONIALS</span>
//            <h2 className="text-4xl font-black uppercase italic tracking-tighter">User Feedback.</h2>
//         </div>
//         <div className="flex gap-4">
//            <button onClick={prev} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronLeft size={20}/></button>
//            <button onClick={next} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronRight size={20}/></button>
//         </div>
//       </div>
//       <div className="relative h-[350px] md:h-[250px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5, ease: "circOut" }}
//             className="absolute inset-0 flex flex-col md:flex-row gap-10 items-start md:items-center text-left"
//           >
//             <div className="flex-1">
//               <Quote className="text-sky-500/20 mb-6" size={48} />
//               <p className="text-2xl md:text-3xl font-light italic text-slate-100 leading-relaxed tracking-tight">
//                 "{testimonials[index].quote}"
//               </p>
//             </div>
//             <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[30px] backdrop-blur-xl">
//                <h4 className="font-black uppercase italic text-sky-400 mb-1">{testimonials[index].author}</h4>
//                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">{testimonials[index].role}</p>
//                <div className="h-px w-full bg-white/10 mb-4" />
//                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold">
//                   <Zap size={12} /> {testimonials[index].metric}
//                </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default function Page() {
//   const [tickerIndex, setTickerIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => 
//       setTickerIndex(prev => (prev + 1) % tickerMessages.length), 3000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   if (!hasMounted) return <div className="min-h-screen bg-[#020617]" />;

//   return (
//     <>
//       <script src="https://cdn.tailwindcss.com"></script>
//       <div className="min-h-screen bg-[#020617] text-white selection:bg-sky-400/30 font-sans overflow-x-hidden relative">
        
//         {/* BACKGROUND */}
//         <div className="fixed inset-0 z-0">
//           <div className="absolute inset-0 bg-[#020617]" />
//           <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-gradient-to-br from-sky-500/20 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
//           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
//         </div>

//         <div className="relative z-10">
//           {/* TICKER */}
//           <div className="bg-white text-sky-950 py-2.5 overflow-hidden sticky top-0 z-[100] font-black uppercase tracking-widest text-[11px] shadow-2xl">
//             <div className="flex items-center px-8">
//               <Activity size={14} className="mr-3 animate-pulse text-sky-600" />
//               <AnimatePresence mode="wait">
//                 <motion.span key={tickerIndex} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
//                   {tickerMessages[tickerIndex]}
//                 </motion.span>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* NAVIGATION */}
//           <nav className="py-8 px-10 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-[41px] z-[90]">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-white">Q</div>
//               <span className="text-2xl font-black tracking-tighter italic uppercase text-white">Aqua</span>
//             </div>
//             <div className="hidden lg:flex gap-10 text-[14px] font-mono uppercase tracking-[0.3em] text-sky-300 font-bold">
//               {['Notebooks', 'Questions', 'Subscription'].map(item => (
//                 <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
//               ))}
//             </div>
//             <Link href="/auth/signin">
//               <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button>
//             </Link>
//           </nav>

//           {/* HERO */}
//           <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
//               <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
//               Ace Quant <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-500">Exams.</span>
//               </h1>
//               <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed italic">
//                 Solve real quant interview problems in probability, statistics, and coding. Exactly how top firms test candidates.
//               </p>
//               <div className="flex justify-center gap-6">
//                 <button className="bg-white text-sky-950 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl" >Start Solving</button>
//               </div>
//           </section>

//           {/* ORBITAL NEXUS */}
//           <section className="py-20 border-y border-white/5 bg-sky-400/5">
//             <div className="text-center mb-[-100px] relative z-20">
//               <h2 className="text-xs font-mono text-sky-400 tracking-[1em] uppercase mb-4">Core Quant Topics</h2>
//               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Interview Coverage</h3>
//             </div>
//             <QuantNexus />
//           </section>

//           {/* --- REDESIGNED ABOUT US SECTION --- */}
//           <section className="py-40 px-6 bg-white overflow-hidden">
//             <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
//               <div className="text-left order-2 lg:order-1">
//                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 rounded-full mb-6 border border-sky-100">
//                     <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
//                     <span className="text-[10px] font-mono font-black text-sky-600 uppercase tracking-widest">About_The_Institute</span>
//                  </div>
//                  <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9] text-sky-950 mb-8">
//                    Engineering <br/> <span className="text-sky-500">Intelligent</span> <br/> Growth.
//                  </h2>
//                  <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 italic">
//                    AQUA bridges the gap between complex academic theory and the brutal reality of the financial market floor.
//                  </p>
//                  <div className="grid grid-cols-2 gap-8 mb-10">
//                     <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
//                        <h4 className="text-4xl font-black text-sky-950 mb-2">3</h4>
//                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Mastery_Courses</p>
//                     </div>
//                     <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
//                        <h4 className="text-4xl font-black text-sky-950 mb-2">1000+</h4>
//                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global_Quants</p>
//                     </div>
//                  </div>
//                  <div className="flex flex-col gap-4">
//                     <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-tighter">
//                        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white"><Shield size={14}/></div>
//                        10+ Years of Institutional Experience
//                     </div>
//                  </div>
//               </div>
              
//               <div className="relative order-1 lg:order-2">
//                  <div className="aspect-square bg-sky-500 rounded-[80px] p-2 rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl relative overflow-hidden group">
//                     <div className="absolute inset-0 bg-slate-900 opacity-20 group-hover:opacity-10 transition-opacity" />
//                     <div className="relative h-full w-full bg-sky-500 flex flex-col items-center justify-center p-12 text-center text-white">
//                         <GraduationCap size={80} className="mb-6 opacity-40" />
//                         <h3 className="text-4xl font-black italic uppercase leading-tight mb-4 tracking-tighter">Advanced Quantitative Analytics</h3>
//                         <p className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-80">System_ID: AQUA_CORE_01</p>
//                     </div>
//                  </div>
//                  {/* Floating element */}
//                  <div className="absolute -bottom-10 -left-10 bg-white shadow-2xl p-8 rounded-[40px] border border-slate-100 animate-bounce transition-all duration-1000">
//                     <div className="flex items-center gap-4">
//                        <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600"><Users size={24}/></div>
//                        <div className="text-left">
//                           <span className="block text-2xl font-black text-sky-950 tracking-tighter">Active</span>
//                           <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Learning_Hub</span>
//                        </div>
//                     </div>
//                  </div>
//               </div>
//             </div>
//           </section>

//           {/* --- REDESIGNED COURSES SECTION --- */}
//           <section className="py-40 bg-slate-50 text-sky-950">
//             <div className="max-w-7xl mx-auto px-6">
//               <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//                 <div className="text-left">
//                   <span className="text-sky-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">In-Demand_Syllabus</span>
//                   <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Our Courses</h2>
//                 </div>
//                 <div className="flex gap-2">
//                    <div className="h-1 w-20 bg-sky-200 rounded-full" />
//                    <div className="h-1 w-4 bg-sky-400 rounded-full" />
//                 </div>
//               </div>

//               <div className="grid lg:grid-cols-3 gap-8">
//                 {[
//                   {
//                     title: "Introduction to Quant Finance and Financial Engineering",
//                     desc: "A structured foundation in financial markets, risk, and quantitative thinking aligned with industry frameworks.",
//                     tag: "FOUNDATION"
//                   },
//                   {
//                     title: "Introduction to Classical Trading",
//                     desc: "Practical grounding in technical market analysis enabling disciplined interpretion of price action and behavior.",
//                     tag: "EXECUTION"
//                   },
//                   {
//                     title: "Introduction to Algorithmic Trading",
//                     desc: "Data-driven trading equipping learners to design and evaluate algorithmic systems using statistical principles.",
//                     tag: "SYSTEMS"
//                   }
//                 ].map((course, i) => (
//                   <motion.div 
//                     key={i} 
//                     whileHover={{ y: -10 }}
//                     className="group bg-white rounded-[50px] p-10 shadow-2xl shadow-sky-900/5 border border-slate-100 flex flex-col text-left relative overflow-hidden h-full"
//                   >
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-sky-400 transition-colors duration-500" />
//                     <div className="relative z-10">
//                        <span className="text-[9px] font-mono font-black text-sky-500 uppercase tracking-widest mb-6 block group-hover:text-white transition-colors">{course.tag}</span>
//                        <h4 className="text-2xl font-black uppercase leading-[1.1] mb-8 group-hover:text-sky-600 transition-colors">{course.title}</h4>
//                        <p className="text-slate-400 text-sm leading-relaxed mb-10 italic">{course.desc}</p>
//                        <button className="flex items-center gap-3 text-sky-950 font-black uppercase text-[10px] tracking-widest border-b-2 border-sky-400 pb-1 group-hover:gap-6 transition-all">
//                           Course Details <ArrowRight size={14}/>
//                        </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* 7. UNIVERSAL STANDARDS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-3 gap-12 text-white">
//               <div className="lg:col-span-2 text-left">
//                  <h2 className="text-6xl font-black uppercase italic mb-8 tracking-tighter leading-[0.9]">Universal <br/> Standards.</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                    {["Probability", "Statistics", "Puzzles", "Quant Coding", "Linear Algebra", "Stochastic Processes","BrainTeasers","Mental Maths"]
//                     .map(topic => (
//                      <div key={topic} className="p-5 border border-white/10 bg-white/5 rounded-2xl text-[10px] font-mono text-sky-400 uppercase tracking-widest hover:border-sky-400/50 transition-colors cursor-default">
//                        {topic}
//                      </div>
//                    ))}
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-sky-500 to-blue-700 p-10 rounded-[40px] shadow-2xl text-left flex flex-col justify-center border border-white/20">
//                  <p className="text-2xl font-black leading-tight italic text-white">"We don't train traders. We train quant thinkers."
//                  </p>
//               </div>
//             </div>
//           </section>

//           {/* 9. NOTEBOOK SECTION */}
//           <section className="py-32 border-y border-white/5">
//              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
//                <div className="text-left">
//                 <h2 className="text-5xl font-black uppercase mb-8 italic tracking-tighter text-white">Quant Workspace</h2>
//                  <p className="text-slate-400 mb-10 italic">Collaborative problem-solving environments for simulations, numeric reasoning, and interview-style quant coding.</p>
//                  <ul className="space-y-4">
//                   {["Numeric Answer Validation", "Simulation-Based Problems", "Open Practice Logs"]
//                     .map(item => (
//                      <li key={item} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sky-400">
//                         <ChevronRight size={14} /> {item}
//                      </li>
//                    ))}
//                 </ul>
//               </div>
//               <div className="bg-black border-2 border-sky-400/30 rounded-3xl p-8 font-mono text-sm shadow-2xl relative text-left">
//                   <div className="absolute top-4 right-4 flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div>
//                   <p className="text-sky-400">import quantprep as qp</p>
//                   <p className="text-slate-600 italic"># Initialize Heston Model Solver</p>
//                   <p className="text-white">model = qp.models.Heston(S0=100)</p>
//                   <p className="text-white">price = model.calibrate(market_data)</p>
//                  <div className="mt-10 h-1 bg-white/5 rounded-full overflow-hidden">
//                      <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 2 }} className="h-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
//                   </div>
//                </div>
//             </div>
//           </section>

//           {/* ENTERPRISE SECTION */}
//           <section className="py-40 bg-slate-900/30">
//             <div className="max-w-7xl mx-auto px-6 text-left">
//               <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//                 <div>
//                   <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Institutional_Services</span>
//                   <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Enterprise Pipeline.</h2>
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {[
//                   { title: "Benchmarking", desc: "Source verified quants who cleared Level 5 tests.", icon: <Briefcase size={24} /> },
//                   { title: "Validation", desc: "Stress-testing of execution logic and risk parameters.", icon: <Shield size={24} /> },
//                   { title: "Readiness", desc: "Custom stochastic models for boutique prop firms.", icon: <Rocket size={24} /> }
//                 ].map((biz, i) => (
//                   <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[50px] hover:bg-white/10 transition-all">
//                      <div className="text-sky-400 mb-8">{biz.icon}</div>
//                      <h4 className="text-2xl font-black uppercase italic text-white mb-6 leading-tight">{biz.title}</h4>
//                      <p className="text-slate-500 text-sm leading-relaxed italic">{biz.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* TESTIMONIALS */}
//           <section className="py-40 border-b border-white/5">
//             <TestimonialCarousel />
//           </section>

//           {/* UPCOMING EVENTS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="text-left mb-16">
//               <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Global_Network</span>
//               <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Upcoming Events.</h2>
//             </div>
//             <div className="grid md:grid-cols-3 gap-6">
//               {events.map((event, idx) => (
//                 <div key={idx} className="bg-white text-sky-950 p-8 rounded-[40px] text-left hover:scale-105 transition-all shadow-xl">
//                   <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-black mb-6 block">{event.type}</span>
//                   <h4 className="text-2xl font-black uppercase italic mb-8 leading-tight">{event.title}</h4>
//                   <div className="space-y-3 font-mono text-[11px] text-slate-400 uppercase font-bold tracking-widest">
//                      <div className="flex items-center gap-3"><Calendar size={14} /> {event.date}</div>
//                      <div className="flex items-center gap-3"><MapPin size={14} /> {event.location}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* INTERVIEW DRILL */}
//           <section className="py-40 px-6">
//              <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-400 to-blue-600 p-16 rounded-[60px] text-center shadow-2xl relative overflow-hidden">
//              <Zap className="text-white mx-auto mb-8 animate-bounce" size={48} />
//               <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tight text-white">Quant Interview Drill</h2>
//               <p className="text-sky-100 text-[10px] font-mono uppercase tracking-[0.5em] mb-10">Problem_ID: QP-PROB-082</p>
//                <p className="text-white text-2xl font-bold mb-14 italic max-w-2xl mx-auto">"At least one of two dice is a 6. What is the probability the sum is 8?"</p>
//                <div className="flex flex-col gap-6 items-center">
//                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
//                  <input 
//                     type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
//                     className="bg-black/20 border border-white/20 rounded-2xl px-8 py-5 flex-1 font-mono text-white placeholder:text-sky-200 outline-none focus:border-white transition-all" placeholder="Enter (e.g. 2/11)"
//                   />
//                   <button className="bg-white text-sky-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-100 transition-colors shadow-2xl">Submit Answer</button>
//                </div>
//                <button className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity mt-4 border-b border-white/20 pb-1">
//                    <Terminal size={12} /> Go to Problem Set
//                 </button>
//               </div>
//             </div>
//            </section>

//           {/* FOOTER */}
//           <footer className="bg-black/40 border-t border-white/10">
//             {/* 1. SEPARATED COMPANY HEADER */}
//             <div className="py-20 border-b border-white/5 text-white">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.4em] uppercase mb-12 block text-center opacity-50">Include Questions Asked In</span>
//                     <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
//                         {['CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'].map(firm => (
//                             <span key={firm} className="text-lg md:text-3xl font-black font-mono text-white tracking-tighter hover:text-sky-400 transition-colors">
//                                 {firm}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* 2. MAIN FOOTER CONTENT */}
//             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 py-32 text-left text-white">
//               <div className="col-span-2">
//                 <span className="text-2xl font-black tracking-tighter italic uppercase text-white">AQUA</span>
//                 <p className="text-slate-500 mt-6 max-w-md italic font-light">
//                    The industry standard for quantitative interview preparation and technical logic evaluation.
//                 </p>
//                 <div className="flex gap-4 mt-10">
//                     {[Github, XIcon, Linkedin].map((Icon, i) => (
//                       <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all border border-white/5"><Icon size={20} /></a>
//                     ))}
//                 </div>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Resource</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer transition-colors">Notebooks</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Vault</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Solver</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Enterprise</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer transition-colors">Talent Pipeline</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Sponsorship</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Terminal Access</li>
//                 </ul>
//               </div>
//             </div>

//             {/* 3. SYSTEM BAR */}
//             <div className="max-w-7xl mx-auto px-6 pb-10">
//               <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 tracking-[0.3em] uppercase border-t border-white/5 pt-10">
//                 <span>© 2026 QUANT_PRISM_OS</span>
//                 <span>SYSTEM_ID: QP-CELESTIAL-5545</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// }




// "use client";
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Activity, Calendar, MapPin, Zap, ChevronRight, 
//   Github, X as XIcon, Linkedin, Cpu, Terminal,
//   Target, Globe, BarChart3, Briefcase, Rocket, Shield,
//   ChevronLeft, Quote, BookOpen, Users, ArrowRight, GraduationCap
// } from 'lucide-react';
// import Link from 'next/link';

// // --- DATA ---
// const tickerMessages = [
//   "SYSTEM_ACTIVE: QuantPrep Interview Engine v1.0",
//   "PROBLEM_FEED: New Probability Drills Added",
//   "LEADERBOARD_UPDATE: Global Rankings Refreshed"
// ];

// const events = [
//   { 
//     title: "Jane Street OTC Challenge", 
//     date: "Jan 15, 2026", 
//     location: "Global / Online", 
//     type: "Competition",
//     difficulty: "Elite",
//     color: "from-blue-500 to-cyan-400"
//   },
//   { 
//     title: "Stochastic Calculus Masterclass", 
//     date: "Feb 02, 2026", 
//     location: "London Terminal", 
//     type: "Workshop",
//     difficulty: "Advanced",
//     color: "from-purple-500 to-indigo-400"
//   },
//   { 
//     title: "Citadel Superday Preparation", 
//     date: "Feb 18, 2026", 
//     location: "New York HQ", 
//     type: "Event",
//     difficulty: "Specialized",
//     color: "from-emerald-500 to-teal-400"
//   }
// ];

// const orbits = [
//   { name: "Black Scholes", speed: 12, radius: 160 },
//   { name: "CLT", speed: 18, radius: 200 },
//   { name: "Martingales", speed: 15, radius: 240 },
//   { name: "Nash Equilibrium", speed: 22, radius: 280 },
//   { name: "Brownian Motion", speed: 20, radius: 320 },
//   { name: "Stochastic Calculus", speed: 28, radius: 360 },
//   { name: "Stars and Bars", speed: 32, radius: 400 },
//   { name: "Options Theory", speed: 25, radius: 440 },
//   { name: "Recursion", speed: 35, radius: 480 },
//   { name: "Inclusion-Exclusion", speed: 30, radius: 520 },
//   { name: "Asset Pricing", speed: 40, radius: 560 },
//   { name: "Game Theory", speed: 24, radius: 600 },
// ];

// const testimonials = [
//   {
//     quote: "The probability drills on QuantPrep are the closest I've found to the actual technical rounds at Jane Street. The numeric validation is unforgiving, exactly like a real superday.",
//     author: "Alex V.",
//     role: "Quantitative Trader @ Top-tier Prop Firm",
//     metric: "Cleared Level 5 Vault"
//   },
//   {
//     quote: "Most platforms focus on coding. QuantPrep focuses on the 'Math intuition' that boutique firms actually look for. It changed how I approach stochastic modeling.",
//     author: "Sarah L.",
//     role: "MFE Graduate, NYU",
//     metric: "Top 2% Global Rank"
//   },
//   {
//     quote: "The Enterprise Pipeline metrics helped our HR team identify three high-potential candidates who didn't have traditional Ivy League backgrounds but possessed elite logic.",
//     author: "Marcus D.",
//     role: "Head of Quant Talent @ Global Hedge Fund",
//     metric: "Institutional Partner"
//   }
// ];

// const QuantNexus = () => {
//   return (
//     <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2)_0%,_transparent_75%)]" />
//       {[1.2, 1.5, 1.8].map((s, i) => (
//         <motion.div 
//           key={i}
//           animate={{ scale: [1, s], opacity: [0.3, 0] }}
//           transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
//           className="absolute border border-white/20 rounded-full w-[400px] h-[400px]"
//         />
//       ))}
//       <motion.div 
//         whileHover={{ scale: 1.1, rotate: 90 }}
//         className="z-50 bg-white backdrop-blur-3xl border-2 border-sky-400 w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.4)]"
//       >
//         <span className="text-sky-950 font-black italic text-5xl tracking-tighter">QUANT</span>
//         <div className="h-[2px] w-12 bg-sky-200 my-3" />
//         <span className="text-[10px] font-mono text-sky-600 uppercase tracking-[0.5em] font-bold">Nexus_OS</span>
//       </motion.div>
//       {orbits.map((orb, i) => (
//         <motion.div
//           key={i}
//           className="absolute border border-white/10 rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           style={{ width: orb.radius * 2, height: orb.radius * 2 }}
//         >
//           <motion.div 
//             className="bg-white px-4 py-1.5 rounded-full whitespace-nowrap text-[10px] font-mono font-black text-sky-900 shadow-xl border border-sky-100"
//             style={{ position: 'absolute', top: '50%', left: '-20px' }}
//             animate={{ rotate: -360 }}
//             transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
//           >
//             {orb.name}
//           </motion.div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const TestimonialCarousel = () => {
//   const [index, setIndex] = useState(0);
//   const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
//   const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

//   return (
//     <div className="relative max-w-5xl mx-auto px-6">
//       <div className="flex justify-between items-center mb-12 text-white">
//         <div className="text-left">
//            <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.5em] uppercase mb-4 block">TESTIMONIALS</span>
//            <h2 className="text-4xl font-black uppercase italic tracking-tighter">User Feedback.</h2>
//         </div>
//         <div className="flex gap-4">
//            <button onClick={prev} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronLeft size={20}/></button>
//            <button onClick={next} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronRight size={20}/></button>
//         </div>
//       </div>
//       <div className="relative h-[400px] md:h-[250px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.5, ease: "circOut" }}
//             className="absolute inset-0 flex flex-col md:flex-row gap-10 items-start md:items-center text-left"
//           >
//             <div className="flex-1">
//               <Quote className="text-sky-500/20 mb-6" size={48} />
//               <p className="text-2xl md:text-3xl font-light italic text-slate-100 leading-relaxed tracking-tight">
//                 "{testimonials[index].quote}"
//               </p>
//             </div>
//             <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[30px] backdrop-blur-xl">
//                <h4 className="font-black uppercase italic text-sky-400 mb-1">{testimonials[index].author}</h4>
//                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">{testimonials[index].role}</p>
//                <div className="h-px w-full bg-white/10 mb-4" />
//                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold">
//                   <Zap size={12} /> {testimonials[index].metric}
//                </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default function Page() {
//   const [tickerIndex, setTickerIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//     const interval = setInterval(() => 
//       setTickerIndex(prev => (prev + 1) % tickerMessages.length), 3000
//     );
//     return () => clearInterval(interval);
//   }, []);

//   if (!hasMounted) return <div className="min-h-screen bg-[#020617]" />;

//   return (
//     <>
//       <script src="https://cdn.tailwindcss.com"></script>
//       <div className="min-h-screen text-white selection:bg-sky-400/30 font-sans overflow-x-hidden relative">
        
//         {/* RESTORED SURGICAL SHADING & 60/40 GRADIENT */}
//         <div className="fixed inset-0 z-0">
//           <div className="absolute inset-0 bg-[#020617]" />
//           <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617] via-[#062c43]/80 to-[#0ea5e9]/30" />
          
//           {/* Top Right Surgical Light (40%) */}
//           <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-sky-500/10 blur-[150px] rounded-full" />
          
//           {/* Deep Shadow Bottom Left (60%) */}
//           <div className="absolute -bottom-20 -left-20 w-[70%] h-[70%] bg-black/50 blur-[120px] rounded-full" />
          
//           {/* Fine Texture */}
//           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
//         </div>

//         <div className="relative z-10">
//           {/* TICKER */}
//           <div className="bg-white text-sky-950 py-2.5 overflow-hidden sticky top-0 z-[100] font-black uppercase tracking-widest text-[11px] shadow-2xl">
//             <div className="flex items-center px-8">
//               <Activity size={14} className="mr-3 animate-pulse text-sky-600" />
//               <AnimatePresence mode="wait">
//                 <motion.span key={tickerIndex} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
//                   {tickerMessages[tickerIndex]}
//                 </motion.span>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* NAVIGATION */}
//           <nav className="py-8 px-10 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-[41px] z-[90]">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-white">Q</div>
//               <span className="text-2xl font-black tracking-tighter italic uppercase text-white">Aqua</span>
//             </div>
//             <div className="hidden lg:flex gap-10 text-[14px] font-mono uppercase tracking-[0.3em] text-sky-100 font-bold">
//               {['Notebooks', 'Questions', 'Subscription'].map(item => (
//                 <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
//               ))}
//             </div>
//             {/* <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button> */}
//             <Link href="/auth/signin">
//              <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button>
//             </Link>
//           </nav>

//           {/* HERO */}
//           <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
//               <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
//                 Ace Quant <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">Exams.</span>
//               </h1>
//               <p className="text-sky-100/60 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed italic">
//                 The definitive simulation engine for quantitative finance interviews. Solve real problems exactly how top firms test candidates.
//               </p>
//               <div className="flex justify-center">
//                 <button className="bg-white text-sky-950 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl">Start Solving</button>
//               </div>
//           </section>

//           {/* ORBITAL NEXUS */}
//           <section className="py-20 bg-white/5 border-y border-white/10">
//             <div className="text-center mb-[-100px] relative z-20">
//               <h2 className="text-xs font-mono text-sky-400 tracking-[1em] uppercase mb-4">Core Quant Topics</h2>
//               <h3 className="text-4xl font-black uppercase italic tracking-tighter">Interview Coverage</h3>
//             </div>
//             <QuantNexus />
//           </section>

//           {/* ABOUT US */}
//           <section className="py-40 px-6 bg-white overflow-hidden text-sky-950">
//             <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
//               <div className="text-left order-2 lg:order-1">
//                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 rounded-full mb-6 border border-sky-100">
//                     <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
//                     <span className="text-[10px] font-mono font-black text-sky-600 uppercase tracking-widest">About_The_Institute</span>
//                  </div>
//                  <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
//                    Engineering <br/> <span className="text-sky-500">Intelligent</span> <br/> Growth.
//                  </h2>
//                  <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 italic">
//                    AQUA bridges the gap between complex academic theory and the brutal reality of the financial market floor.
//                  </p>
//                  <div className="grid grid-cols-2 gap-8 mb-10">
//                     <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
//                        <h4 className="text-4xl font-black text-sky-950 mb-2">3</h4>
//                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Mastery_Courses</p>
//                     </div>
//                     <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
//                        <h4 className="text-4xl font-black text-sky-950 mb-2">1000+</h4>
//                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global_Quants</p>
//                     </div>
//                  </div>
//                  <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-tighter">
//                     <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white"><Shield size={14}/></div>
//                     10+ Years of Institutional Experience
//                  </div>
//               </div>
//               <div className="relative order-1 lg:order-2">
//                 <div className="aspect-square bg-sky-600 rounded-[80px] p-2 rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl relative overflow-hidden flex items-center justify-center text-white p-12 text-center group">
//                    <div className="absolute inset-0 bg-slate-900 opacity-20 group-hover:opacity-10 transition-opacity" />
//                    <div className="relative z-10">
//                      <GraduationCap size={80} className="mb-6 opacity-40 mx-auto" />
//                      <h3 className="text-4xl font-black italic uppercase leading-tight tracking-tighter">Advanced Quantitative Analytics</h3>
//                      <p className="font-mono text-[10px] uppercase tracking-[0.4em] mt-4 opacity-80">System_ID: AQUA_CORE_01</p>
//                    </div>
//                 </div>
//                 <div className="absolute -bottom-10 -left-10 bg-white shadow-2xl p-8 rounded-[40px] border border-slate-100 animate-bounce">
//                     <div className="flex items-center gap-4">
//                        <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600"><Users size={24}/></div>
//                        <div className="text-left">
//                           <span className="block text-2xl font-black text-sky-950 tracking-tighter">Active</span>
//                           <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Learning_Hub</span>
//                        </div>
//                     </div>
//                  </div>
//               </div>
//             </div>
//           </section>

//           {/* COURSES */}
//           <section className="py-40 bg-slate-50 text-sky-950">
//             <div className="max-w-7xl mx-auto px-6">
//               <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//                 <div className="text-left">
//                   <span className="text-sky-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">In-Demand_Syllabus</span>
//                   <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Our Courses</h2>
//                 </div>
//                 <div className="flex gap-2">
//                    <div className="h-1 w-20 bg-sky-200 rounded-full" />
//                    <div className="h-1 w-4 bg-sky-400 rounded-full" />
//                 </div>
//               </div>
//               <div className="grid lg:grid-cols-3 gap-8">
//                 {[
//                   { title: "Introduction to Quant Finance and Financial Engineering", desc: "A structured foundation in financial markets, risk, and quantitative thinking.", tag: "FOUNDATION" },
//                   { title: "Introduction to Classical Trading", desc: "Practical grounding in technical market analysis and price action behavior.", tag: "EXECUTION" },
//                   { title: "Introduction to Algorithmic Trading", desc: "Data-driven trading designing and evaluating systems using statistical principles.", tag: "SYSTEMS" }
//                 ].map((course, i) => (
//                   <motion.div key={i} whileHover={{ y: -10 }} className="group bg-white rounded-[50px] p-10 shadow-2xl shadow-sky-900/5 border border-slate-100 flex flex-col text-left relative overflow-hidden h-full">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-sky-400 transition-colors duration-500" />
//                     <div className="relative z-10">
//                        <span className="text-[9px] font-mono font-black text-sky-500 uppercase tracking-widest mb-6 block group-hover:text-white transition-colors">{course.tag}</span>
//                        <h4 className="text-2xl font-black uppercase leading-[1.1] mb-8 group-hover:text-sky-600 transition-colors">{course.title}</h4>
//                        <p className="text-slate-400 text-sm leading-relaxed mb-10 italic">{course.desc}</p>
//                        <button className="flex items-center gap-3 text-sky-950 font-black uppercase text-[10px] tracking-widest border-b-2 border-sky-400 pb-1 group-hover:gap-6 transition-all">
//                           Course Details <ArrowRight size={14}/>
//                        </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* STANDARDS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-3 gap-12 text-white">
//               <div className="lg:col-span-2 text-left">
//                  <h2 className="text-6xl font-black uppercase italic mb-8 tracking-tighter leading-[0.9]">Universal <br/> Standards.</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                    {["Probability", "Statistics", "Puzzles", "Quant Coding", "Linear Algebra", "Stochastic Processes","BrainTeasers","Mental Maths"].map(topic => (
//                      <div key={topic} className="p-5 border border-white/10 bg-white/5 rounded-2xl text-[10px] font-mono text-sky-400 uppercase tracking-widest hover:border-sky-400/50 transition-colors cursor-default">{topic}</div>
//                    ))}
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-sky-500 to-blue-700 p-10 rounded-[40px] shadow-2xl text-left flex flex-col justify-center border border-white/20">
//                  <p className="text-2xl font-black leading-tight italic text-white">"We don't train traders. We train quant thinkers."</p>
//               </div>
//             </div>
//           </section>

//           {/* NOTEBOOK */}
//           <section className="py-32 border-y border-white/5">
//              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
//                <div className="text-left">
//                 <h2 className="text-5xl font-black uppercase mb-8 italic tracking-tighter text-white">Quant Workspace</h2>
//                  <p className="text-slate-400 mb-10 italic">Collaborative environments for simulations and interview-style coding.</p>
//                  <ul className="space-y-4">
//                   {["Numeric Answer Validation", "Simulation-Based Problems", "Open Practice Logs"].map(item => (
//                      <li key={item} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sky-400"><ChevronRight size={14} /> {item}</li>
//                    ))}
//                 </ul>
//               </div>
//               <div className="bg-black border-2 border-sky-400/30 rounded-3xl p-8 font-mono text-sm shadow-2xl relative text-left">
//                   <div className="absolute top-4 right-4 flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div>
//                   <p className="text-sky-400">import quantprep as qp</p>
//                   <p className="text-slate-600 italic"># Initialize Heston Model Solver</p>
//                   <p className="text-white">model = qp.models.Heston(S0=100)</p>
//                   <p className="text-white">price = model.calibrate(market_data)</p>
//                   <div className="mt-10 h-1 bg-white/5 rounded-full overflow-hidden">
//                      <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 2 }} className="h-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
//                   </div>
//                </div>
//             </div>
//           </section>

//           {/* ENTERPRISE */}
//           <section className="py-40 bg-slate-900/30">
//             <div className="max-w-7xl mx-auto px-6 text-left">
//               <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Institutional_Services</span>
//               <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-20">Enterprise Pipeline.</h2>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {[
//                   { title: "Benchmarking", desc: "Source verified quants who cleared Level 5 tests.", icon: <Briefcase size={24} /> },
//                   { title: "Validation", desc: "Stress-testing of execution logic and parameters.", icon: <Shield size={24} /> },
//                   { title: "Readiness", desc: "Custom models for boutique prop firms.", icon: <Rocket size={24} /> }
//                 ].map((biz, i) => (
//                   <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[50px] hover:bg-white/10 transition-all">
//                      <div className="text-sky-400 mb-8">{biz.icon}</div>
//                      <h4 className="text-2xl font-black uppercase italic text-white mb-6 leading-tight">{biz.title}</h4>
//                      <p className="text-slate-500 text-sm leading-relaxed italic">{biz.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* TESTIMONIALS */}
//           <section className="py-40 border-b border-white/5">
//             <TestimonialCarousel />
//           </section>

//           {/* UPCOMING EVENTS */}
//           <section className="py-40 px-6 max-w-7xl mx-auto">
//             <div className="text-left mb-16">
//               <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Global_Network</span>
//               <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Upcoming Events.</h2>
//             </div>
//             <div className="grid md:grid-cols-3 gap-6">
//               {events.map((event, idx) => (
//                 <div key={idx} className="bg-white text-sky-950 p-8 rounded-[40px] text-left hover:scale-105 transition-all shadow-xl">
//                   <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-black mb-6 block">{event.type}</span>
//                   <h4 className="text-2xl font-black uppercase italic mb-8 leading-tight">{event.title}</h4>
//                   <div className="space-y-3 font-mono text-[11px] text-slate-400 uppercase font-bold tracking-widest">
//                      <div className="flex items-center gap-3"><Calendar size={14} /> {event.date}</div>
//                      <div className="flex items-center gap-3"><MapPin size={14} /> {event.location}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* DRILL */}
//           <section className="py-40 px-6">
//              <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-400 to-blue-600 p-16 rounded-[60px] text-center shadow-2xl relative overflow-hidden">
//               <Zap className="text-white mx-auto mb-8 animate-bounce" size={48} />
//               <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tight text-white">Quant Interview Drill</h2>
//               <p className="text-sky-100 text-[10px] font-mono uppercase tracking-[0.5em] mb-10">Problem_ID: QP-PROB-082</p>
//                <p className="text-white text-2xl font-bold mb-14 italic max-w-2xl mx-auto">"At least one of two dice is a 6. What is the probability the sum is 8?"</p>
//                <div className="flex flex-col gap-6 items-center">
//                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
//                  <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="bg-black/20 border border-white/20 rounded-2xl px-8 py-5 flex-1 font-mono text-white placeholder:text-sky-200 outline-none focus:border-white transition-all" placeholder="Enter (e.g. 2/11)" />
//                   <button className="bg-white text-sky-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-100 transition-colors shadow-2xl">Submit Answer</button>
//                </div>
//                <Link href="/auth/signin">
//                <button className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity mt-4 border-b border-white/20 pb-1"><Terminal size={12} /> Go to Problem Set</button>
//                </Link></div>
//             </div>
//            </section>

//           {/* FOOTER */}
//           <footer className="bg-black/40 border-t border-white/10">
//             <div className="py-20 border-b border-white/5 text-white">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.4em] uppercase mb-12 block opacity-50">Include Questions Asked In</span>
//                     <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
//                         {['CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'].map(firm => (
//                             <span key={firm} className="text-lg md:text-3xl font-black font-mono text-white tracking-tighter hover:text-sky-400 transition-colors">{firm}</span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 py-32 text-left text-white">
//               <div className="col-span-2">
//                 <span className="text-2xl font-black tracking-tighter italic uppercase text-white">AQUA</span>
//                 <p className="text-slate-500 mt-6 max-w-md italic font-light">The industry standard for quantitative interview preparation.</p>
//                 <div className="flex gap-4 mt-10">
//                    {[Github, XIcon, Linkedin].map((Icon, i) => (
//                       <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all border border-white/5"><Icon size={20} /></a>
//                     ))}
//                 </div>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Resource</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer transition-colors">Notebooks</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Vault</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Solver</li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Enterprise</h4>
//                 <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
//                   <li className="hover:text-white cursor-pointer transition-colors">Talent Pipeline</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Sponsorship</li>
//                   <li className="hover:text-white cursor-pointer transition-colors">Terminal Access</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="max-w-7xl mx-auto px-6 pb-10">
//               <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 tracking-[0.3em] uppercase border-t border-white/5 pt-10">
//                 <span>© 2026 QUANT_PRISM_OS</span>
//                 <span>SYSTEM_ID: QP-CELESTIAL-5545</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </div>
//     </>
//   );
// }




"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Calendar, MapPin, Zap, ChevronRight, 
  Github, X as XIcon, Linkedin, Cpu, Terminal,
  Target, Globe, BarChart3, Briefcase, Rocket, Shield,
  ChevronLeft, Quote, BookOpen, Users, ArrowRight, GraduationCap,
  CheckCircle2, Star, Award
} from 'lucide-react';
import Link from 'next/link';

// --- DATA ---
const tickerMessages = [
  "SYSTEM_ACTIVE: QuantPrep Interview Engine v1.0",
  "PROBLEM_FEED: New Probability Drills Added",
  "LEADERBOARD_UPDATE: Global Rankings Refreshed"
];

const events = [
  { 
    title: "Jane Street OTC Challenge", 
    date: "Jan 15, 2026", 
    location: "Global / Online", 
    type: "Competition",
    difficulty: "Elite",
    color: "from-blue-500 to-cyan-400"
  },
  { 
    title: "Stochastic Calculus Masterclass", 
    date: "Feb 02, 2026", 
    location: "London Terminal", 
    type: "Workshop",
    difficulty: "Advanced",
    color: "from-purple-500 to-indigo-400"
  },
  { 
    title: "Citadel Superday Preparation", 
    date: "Feb 18, 2026", 
    location: "New York HQ", 
    type: "Event",
    difficulty: "Specialized",
    color: "from-emerald-500 to-teal-400"
  }
];

const orbits = [
  { name: "Black Scholes", speed: 12, radius: 160 },
  { name: "CLT", speed: 18, radius: 200 },
  { name: "Martingales", speed: 15, radius: 240 },
  { name: "Nash Equilibrium", speed: 22, radius: 280 },
  { name: "Brownian Motion", speed: 20, radius: 320 },
  { name: "Stochastic Calculus", speed: 28, radius: 360 },
  { name: "Stars and Bars", speed: 32, radius: 400 },
  { name: "Options Theory", speed: 25, radius: 440 },
  { name: "Recursion", speed: 35, radius: 480 },
  { name: "Inclusion-Exclusion", speed: 30, radius: 520 },
  { name: "Asset Pricing", speed: 40, radius: 560 },
  { name: "Game Theory", speed: 24, radius: 600 },
];

const testimonials = [
  {
    quote: "The probability drills on QuantPrep are the closest I've found to the actual technical rounds at Jane Street. The numeric validation is unforgiving, exactly like a real superday.",
    author: "Alex V.",
    role: "Quantitative Trader @ Top-tier Prop Firm",
    metric: "Cleared Level 5 Vault"
  },
  {
    quote: "Most platforms focus on coding. QuantPrep focuses on the 'Math intuition' that boutique firms actually look for. It changed how I approach stochastic modeling.",
    author: "Sarah L.",
    role: "MFE Graduate, NYU",
    metric: "Top 2% Global Rank"
  },
  {
    quote: "The Enterprise Pipeline metrics helped our HR team identify three high-potential candidates who didn't have traditional Ivy League backgrounds but possessed elite logic.",
    author: "Marcus D.",
    role: "Head of Quant Talent @ Global Hedge Fund",
    metric: "Institutional Partner"
  }
];

const whyAqua = [
  {
    id: "01",
    title: "Industry Specialists",
    desc: "Get training from certified experts from Finance, Quant, Data Science and AI-ML domains.",
    icon: <Users className="text-sky-400" size={24} />,
    align: "left"
  },
  {
    id: "02",
    title: "100% Practical Training",
    desc: "Build a portfolio while learning data science and machine learning through live projects.",
    icon: <Target className="text-sky-400" size={24} />,
    align: "right"
  },
  {
    id: "03",
    title: "100% Placement Assistance",
    desc: "Secure your post-course placement in tech companies with great package today.",
    icon: <Award className="text-sky-400" size={24} />,
    align: "left"
  }
];

const QuantNexus = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2)_0%,_transparent_75%)]" />
      {[1.2, 1.5, 1.8].map((s, i) => (
        <motion.div 
          key={i}
          animate={{ scale: [1, s], opacity: [0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
          className="absolute border border-white/20 rounded-full w-[400px] h-[400px]"
        />
      ))}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 90 }}
        className="z-50 bg-white backdrop-blur-3xl border-2 border-sky-400 w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.4)]"
      >
        <span className="text-sky-950 font-black italic text-5xl tracking-tighter">QUANT</span>
        <div className="h-[2px] w-12 bg-sky-200 my-3" />
        <span className="text-[10px] font-mono text-sky-600 uppercase tracking-[0.5em] font-bold">Nexus_OS</span>
      </motion.div>
      {orbits.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
          style={{ width: orb.radius * 2, height: orb.radius * 2 }}
        >
          <motion.div 
            className="bg-white px-4 py-1.5 rounded-full whitespace-nowrap text-[10px] font-mono font-black text-sky-900 shadow-xl border border-sky-100"
            style={{ position: 'absolute', top: '50%', left: '-20px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: orb.speed, repeat: Infinity, ease: "linear" }}
          >
            {orb.name}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-5xl mx-auto px-6">
      <div className="flex justify-between items-center mb-12 text-white">
        <div className="text-left">
           <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.5em] uppercase mb-4 block">TESTIMONIALS</span>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter">User Feedback.</h2>
        </div>
        <div className="flex gap-4">
           <button onClick={prev} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronLeft size={20}/></button>
           <button onClick={next} className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-colors"><ChevronRight size={20}/></button>
        </div>
      </div>
      <div className="relative h-[400px] md:h-[250px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0 flex flex-col md:flex-row gap-10 items-start md:items-center text-left"
          >
            <div className="flex-1">
              <Quote className="text-sky-500/20 mb-6" size={48} />
              <p className="text-2xl md:text-3xl font-light italic text-slate-100 leading-relaxed tracking-tight">
                "{testimonials[index].quote}"
              </p>
            </div>
            <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[30px] backdrop-blur-xl">
               <h4 className="font-black uppercase italic text-sky-400 mb-1">{testimonials[index].author}</h4>
               <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4">{testimonials[index].role}</p>
               <div className="h-px w-full bg-white/10 mb-4" />
               <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold">
                  <Zap size={12} /> {testimonials[index].metric}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Page() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => 
      setTickerIndex(prev => (prev + 1) % tickerMessages.length), 3000
    );
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen text-white selection:bg-sky-400/30 font-sans overflow-x-hidden relative">
        
        {/* SURGICAL SHADING & 60/40 GRADIENT */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617] via-[#062c43]/80 to-[#0ea5e9]/30" />
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-sky-500/10 blur-[150px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-[70%] h-[70%] bg-black/50 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          {/* TICKER */}
          <div className="bg-white text-sky-950 py-2.5 overflow-hidden sticky top-0 z-[100] font-black uppercase tracking-widest text-[11px] shadow-2xl">
            <div className="flex items-center px-8">
              <Activity size={14} className="mr-3 animate-pulse text-sky-600" />
              <AnimatePresence mode="wait">
                <motion.span key={tickerIndex} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
                  {tickerMessages[tickerIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="py-8 px-10 flex justify-between items-center bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-[41px] z-[90]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-white">Q</div>
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white">Aqua</span>
            </div>
            <div className="hidden lg:flex gap-10 text-[14px] font-mono uppercase tracking-[0.3em] text-sky-100 font-bold">
              {['Notebooks', 'Questions', 'Subscription'].map(item => (
                <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
              ))}
            </div>
            {/* <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button> */}
            <Link href="/auth/signin">
               <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button>
            </Link>
          </nav>

          {/* HERO */}
          <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto text-center">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
                Ace Quant <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">Exams.</span>
              </h1>
              <p className="text-sky-100/60 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed italic">
                The definitive simulation engine for quantitative finance interviews. Solve real problems exactly how top firms test candidates.
              </p>
              <div className="flex justify-center">
                <button className="bg-white text-sky-950 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl">Start Solving</button>
              </div>
          </section>

          {/* ORBITAL NEXUS */}
          <section className="py-20 bg-white/5 border-y border-white/10">
            <div className="text-center mb-[-100px] relative z-20">
              <h2 className="text-xs font-mono text-sky-400 tracking-[1em] uppercase mb-4">Core Quant Topics</h2>
              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Interview Coverage</h3>
            </div>
            <QuantNexus />
          </section>

          {/* ABOUT US */}
          <section className="py-40 px-6 bg-white overflow-hidden text-sky-950">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div className="text-left order-2 lg:order-1">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 rounded-full mb-6 border border-sky-100">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-black text-sky-600 uppercase tracking-widest">About_The_Institute</span>
                 </div>
                 <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
                   Engineering <br/> <span className="text-sky-500">Intelligent</span> <br/> Growth.
                 </h2>
                 <p className="text-slate-600 text-xl font-medium leading-relaxed mb-10 italic">
                   AQUA bridges the gap between complex academic theory and the brutal reality of the financial market floor.
                 </p>
                 <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
                       <h4 className="text-4xl font-black text-sky-950 mb-2">3</h4>
                       <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Mastery_Courses</p>
                    </div>
                    <div className="p-6 border border-slate-100 rounded-[30px] bg-slate-50/50">
                       <h4 className="text-4xl font-black text-sky-950 mb-2">1000+</h4>
                       <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global_Quants</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-tighter">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white"><Shield size={14}/></div>
                    10+ Years of Institutional Experience
                 </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="aspect-square bg-sky-600 rounded-[80px] p-2 rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl relative overflow-hidden flex items-center justify-center text-white p-12 text-center group">
                   <div className="absolute inset-0 bg-slate-900 opacity-20 group-hover:opacity-10 transition-opacity" />
                   <div className="relative z-10">
                     <GraduationCap size={80} className="mb-6 opacity-40 mx-auto" />
                     <h3 className="text-4xl font-black italic uppercase leading-tight tracking-tighter">Advanced Quantitative Analytics</h3>
                     <p className="font-mono text-[10px] uppercase tracking-[0.4em] mt-4 opacity-80">System_ID: AQUA_CORE_01</p>
                   </div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white shadow-2xl p-8 rounded-[40px] border border-slate-100 animate-bounce">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600"><Users size={24}/></div>
                       <div className="text-left">
                          <span className="block text-2xl font-black text-sky-950 tracking-tighter">Active</span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Learning_Hub</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* NEW: WHY AQUA SECTION (Replacing Enterprise) */}
          <section className="py-40 bg-[#020617]/50 relative">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <span className="text-sky-400 font-mono text-[12px] font-black tracking-[0.6em] uppercase mb-4 block">QUALITY LEARNING EXPERIENCE</span>
              <h2 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-white mb-24">Why AQUA?</h2>
              
              <div className="space-y-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

                {whyAqua.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.2, ease: "circOut" }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${item.align === "right" ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Number Indicator */}
                    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center relative group">
                       <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-colors rounded-3xl" />
                       <span className="text-4xl md:text-5xl font-black text-white/90 italic">{item.id}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 p-8 md:p-12 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md text-left group hover:border-sky-500/30 transition-all duration-500`}>
                      <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                      <h4 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-4 leading-tight">{item.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed font-light italic">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* COURSES */}
          <section className="py-40 bg-slate-50 text-sky-950">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="text-left">
                  <span className="text-sky-600 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">In-Demand_Syllabus</span>
                  <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Our Courses</h2>
                </div>
                <div className="flex gap-2">
                   <div className="h-1 w-20 bg-sky-200 rounded-full" />
                   <div className="h-1 w-4 bg-sky-400 rounded-full" />
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { title: "Introduction to Quant Finance and Financial Engineering", desc: "A structured foundation in financial markets, risk, and quantitative thinking.", tag: "FOUNDATION" },
                  { title: "Introduction to Classical Trading", desc: "Practical grounding in technical market analysis and price action behavior.", tag: "EXECUTION" },
                  { title: "Introduction to Algorithmic Trading", desc: "Data-driven trading designing and evaluating systems using statistical principles.", tag: "SYSTEMS" }
                ].map((course, i) => (
                  <motion.div key={i} whileHover={{ y: -10 }} className="group bg-white rounded-[50px] p-10 shadow-2xl shadow-sky-900/5 border border-slate-100 flex flex-col text-left relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-sky-400 transition-colors duration-500" />
                    <div className="relative z-10">
                       <span className="text-[9px] font-mono font-black text-sky-500 uppercase tracking-widest mb-6 block group-hover:text-white transition-colors">{course.tag}</span>
                       <h4 className="text-2xl font-black uppercase leading-[1.1] mb-8 group-hover:text-sky-600 transition-colors">{course.title}</h4>
                       <p className="text-slate-400 text-sm leading-relaxed mb-10 italic">{course.desc}</p>
                       <button className="flex items-center gap-3 text-sky-950 font-black uppercase text-[10px] tracking-widest border-b-2 border-sky-400 pb-1 group-hover:gap-6 transition-all">
                          Course Details <ArrowRight size={14}/>
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* STANDARDS */}
          <section className="py-40 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 text-white">
              <div className="lg:col-span-2 text-left">
                 <h2 className="text-6xl font-black uppercase italic mb-8 tracking-tighter leading-[0.9]">Universal <br/> Standards.</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {["Probability", "Statistics", "Puzzles", "Quant Coding", "Linear Algebra", "Stochastic Processes","BrainTeasers","Mental Maths"].map(topic => (
                     <div key={topic} className="p-5 border border-white/10 bg-white/5 rounded-2xl text-[10px] font-mono text-sky-400 uppercase tracking-widest hover:border-sky-400/50 transition-colors cursor-default">{topic}</div>
                   ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-sky-500 to-blue-700 p-10 rounded-[40px] shadow-2xl text-left flex flex-col justify-center border border-white/20">
                 <p className="text-2xl font-black leading-tight italic text-white">"We don't train traders. We train quant thinkers."</p>
              </div>
            </div>
          </section>

          {/* NOTEBOOK */}
          <section className="py-32 border-y border-white/5">
             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
               <div className="text-left">
                <h2 className="text-5xl font-black uppercase mb-8 italic tracking-tighter text-white">Quant Workspace</h2>
                 <p className="text-slate-400 mb-10 italic">Collaborative environments for simulations and interview-style coding.</p>
                 <ul className="space-y-4">
                  {["Numeric Answer Validation", "Simulation-Based Problems", "Open Practice Logs"].map(item => (
                     <li key={item} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-sky-400"><ChevronRight size={14} /> {item}</li>
                   ))}
                </ul>
              </div>
              <div className="bg-black border-2 border-sky-400/30 rounded-3xl p-8 font-mono text-sm shadow-2xl relative text-left">
                  <div className="absolute top-4 right-4 flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div>
                  <p className="text-sky-400">import quantprep as qp</p>
                  <p className="text-slate-600 italic"># Initialize Heston Model Solver</p>
                  <p className="text-white">model = qp.models.Heston(S0=100)</p>
                  <p className="text-white">price = model.calibrate(market_data)</p>
                  <div className="mt-10 h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 2 }} className="h-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                  </div>
               </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="py-40 border-b border-white/5">
            <TestimonialCarousel />
          </section>

          {/* UPCOMING EVENTS */}
          <section className="py-40 px-6 max-w-7xl mx-auto">
            <div className="text-left mb-16">
              <span className="text-sky-400 font-mono text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Global_Network</span>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Upcoming Events.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event, idx) => (
                <div key={idx} className="bg-white text-sky-950 p-8 rounded-[40px] text-left hover:scale-105 transition-all shadow-xl">
                  <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-black mb-6 block">{event.type}</span>
                  <h4 className="text-2xl font-black uppercase italic mb-8 leading-tight">{event.title}</h4>
                  <div className="space-y-3 font-mono text-[11px] text-slate-400 uppercase font-bold tracking-widest">
                     <div className="flex items-center gap-3"><Calendar size={14} /> {event.date}</div>
                     <div className="flex items-center gap-3"><MapPin size={14} /> {event.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DRILL */}
          <section className="py-40 px-6">
             <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-400 to-blue-600 p-16 rounded-[60px] text-center shadow-2xl relative overflow-hidden">
              <Zap className="text-white mx-auto mb-8 animate-bounce" size={48} />
              <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tight text-white">Quant Interview Drill</h2>
              <p className="text-sky-100 text-[10px] font-mono uppercase tracking-[0.5em] mb-10">Problem_ID: QP-PROB-082</p>
               <p className="text-white text-2xl font-bold mb-14 italic max-w-2xl mx-auto">"At least one of two dice is a 6. What is the probability the sum is 8?"</p>
               <div className="flex flex-col gap-6 items-center">
                 <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                 <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="bg-black/20 border border-white/20 rounded-2xl px-8 py-5 flex-1 font-mono text-white placeholder:text-sky-200 outline-none focus:border-white transition-all" placeholder="Enter (e.g. 2/11)" />
                  <button className="bg-white text-sky-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-100 transition-colors shadow-2xl">Submit Answer</button>
               </div>
               <Link href="/auth/signin">
              {/* <button className="bg-sky-400 text-sky-950 px-8 py-2.5 rounded-full text-[13px] font-black hover:scale-105 transition-all">SignIn</button> */}
            
               <button className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity mt-4 border-b border-white/20 pb-1"><Terminal size={12} /> Go to Problem Set</button>
               </Link>
              </div>
            </div>
           </section>

          {/* FOOTER */}
          <footer className="bg-black/40 border-t border-white/10">
            <div className="py-20 border-b border-white/5 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-sky-400 font-mono text-[15px] font-black tracking-[0.4em] uppercase mb-12 block opacity-50">Include Questions Asked In</span>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {['CITADEL', 'JANE STREET', 'OPTIVER', 'HRT', 'IMC TRADING', 'D.E. SHAW', 'TOWER RESEARCH', 'JUMP TRADING', 'SIG', 'TWO SIGMA'].map(firm => (
                            <span key={firm} className="text-lg md:text-3xl font-black font-mono text-white tracking-tighter hover:text-sky-400 transition-colors">{firm}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 py-32 text-left text-white">
              <div className="col-span-2">
                <span className="text-2xl font-black tracking-tighter italic uppercase text-white">AQUA</span>
                <p className="text-slate-500 mt-6 max-w-md italic font-light">The industry standard for quantitative interview preparation.</p>
                <div className="flex gap-4 mt-10">
                   {[Github, XIcon, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all border border-white/5"><Icon size={20} /></a>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Resource</h4>
                <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
                  <li className="hover:text-white cursor-pointer transition-colors">Notebooks</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Vault</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Solver</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sky-400 font-mono text-[10px] uppercase mb-8 font-black tracking-[0.4em]">Enterprise</h4>
                <ul className="text-slate-500 text-sm space-y-4 font-bold uppercase italic tracking-widest">
                  <li className="hover:text-white cursor-pointer transition-colors">Talent Pipeline</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Sponsorship</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Terminal Access</li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pb-10">
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-700 tracking-[0.3em] uppercase border-t border-white/5 pt-10">
                <span>© 2026 QUANT_PRISM_OS</span>
                <span>SYSTEM_ID: QP-CELESTIAL-5545</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}