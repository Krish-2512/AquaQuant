"use client";

import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  GraduationCap,
  Radio,
  Shield,
  Terminal,
  Users,
} from "lucide-react";

import aqua_logo2 from "../../public/aqua_logo2.png";

const ENROLL_LINK = "#enroll";

const outcomes = [
  "Understand the basics of Quant Finance",
  "Explore key quant career paths and salary prospects",
  "Learn the essential skills and tools required",
  "Get a practical roadmap to start your quant journey",
  "Discover resources for learning and career growth",
  "Interact with experts during a live Q&A session",
];

const partnerIITs = [
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Guwahati",
  "IIT Roorkee",
];

export default function WebinarPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#04111f] text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#04111f]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_35%,transparent_65%,rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-white/10 bg-[#071624]/80 px-6 py-5 backdrop-blur-2xl md:px-10">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <NextImage src={aqua_logo2} alt="Aqua Logo" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex items-center">
              <span className="ml-0 text-2xl font-black uppercase italic tracking-tighter text-sky-400">LAB</span>
              <span className="mx-2 text-2xl font-medium italic text-white/40">BY</span>
              <span className="text-2xl font-black uppercase italic tracking-tighter text-white">AQUA</span>
            </div>
          </Link>

          <div className="hidden gap-10 text-[13px] font-bold uppercase tracking-[0.25em] text-sky-100 lg:flex">
            {["Notebooks", "Questions", "Cohort", "Subscription", "Events", "Webinar"].map((item) => {
              let href = "/";
              if (item === "Cohort") href = "/cohort";
              else if (item === "Subscription") href = "/subscription";
              else if (item === "Events") href = "/events";
              else if (item === "Webinar") href = "/webinar";
              else if (item === "Notebooks") href = session ? "/notebooks" : "/#notebooks";
              else if (item === "Questions") href = session ? "/dashboard" : "/#questions";
              return (
                <Link
                  key={item}
                  href={href}
                  className={item === "Webinar" ? "text-sky-400" : "transition-colors hover:text-white"}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          <div className="relative">
            {status === "loading" ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-white/5" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-transform hover:scale-110"
                >
                  <NextImage
                    src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "AQUA")}`}
                    alt="profile"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-[-1]" onClick={() => setDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-14 w-56 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl"
                      >
                        <div className="mb-2 border-b border-white/5 px-4 py-3">
                          <p className="truncate text-[10px] font-mono text-slate-400">{session.user?.email}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400">{session.user?.name}</p>
                        </div>
                        <button
                          onClick={async () => {
                            await signOut({ redirect: false, callbackUrl: "/" });
                            window.location.href = "/";
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-red-400 transition-colors hover:bg-red-400/10"
                        >
                          <Terminal size={14} />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth/signin">
                <button className="rounded-full bg-sky-400 px-8 py-2.5 text-[13px] font-black text-sky-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-105 hover:bg-white">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </nav>

        <main>
          {/* Hero */}
          <section className="px-6 pb-16 pt-20 md:px-10 md:pt-28">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-rose-300">
                  <Radio size={14} />
                  Live Webinar
                </div>

                <h1 className="max-w-4xl text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
                  Can You Build a Career in Quant Finance?
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  Join this live introductory webinar to explore the world of Quant Finance—where finance,
                  mathematics, and technology come together. Learn what quants do, the skills employers look
                  for, salary expectations, and a step-by-step roadmap to break into this high-growth industry.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400">
                  Perfect for students and professionals curious about quantitative careers in finance.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={ENROLL_LINK}
                    className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                  >
                    Enroll Now — ₹99
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#outcomes"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all hover:border-sky-400/40 hover:bg-sky-500/10"
                  >
                    What You&apos;ll Learn
                    <ChevronRight size={16} />
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Date</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">20 June</p>
                    <p className="mt-1 text-sm text-slate-400">2026</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Format</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">Live</p>
                    <p className="mt-1 text-sm text-slate-400">Online · Interactive</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Entry Fee</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">₹99</p>
                    <p className="mt-1 text-sm text-slate-400">Only</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-[36px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.18),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(2,12,27,0.45)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">Event Poster</p>
                    <h2 className="mt-2 text-xl font-black uppercase italic tracking-tighter text-white">
                      Live Webinar
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Radio size={20} className="text-sky-300" />
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                  <NextImage
                    src="/webinar-1.jpeg"
                    alt="Can You Build a Career in Quant Finance? Webinar Poster"
                    width={600}
                    height={900}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section id="outcomes" className="px-6 py-10 md:px-10">
            <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-12 bg-sky-400/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-300">
                  Learning Outcomes
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {outcomes.map((item) => (
                  <div key={item} className="rounded-[28px] border border-white/10 bg-[#081a2b] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10">
                      <Check size={18} className="text-sky-300" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What You'll Learn + Certificate */}
          <section id="enroll" className="px-6 py-12 md:px-10">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <BookOpen size={18} className="text-sky-400" />
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    What You&apos;ll Discover
                  </h3>
                </div>

                <div className="space-y-4">
                  {outcomes.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-[#091726] p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sm font-black text-sky-300">
                        {index + 1}
                      </div>
                      <p className="pt-2 text-sm leading-relaxed text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[36px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.18),rgba(255,255,255,0.04))] p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-300">
                      Certification
                    </p>
                    <h3 className="mt-3 text-3xl font-black uppercase italic tracking-tighter text-white">
                      Certificate of Participation
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <GraduationCap size={18} className="text-sky-200" />
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-100">
                  All participants receive a Certificate of Participation jointly issued by AQUA and
                  the Finance Cells of top IITs.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {partnerIITs.map((iit) => (
                    <div
                      key={iit}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
                    >
                      {iit}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[26px] border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">
                    Limited Seats Only
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100">
                    Seats are limited to ensure an interactive, high-quality experience for every participant.
                    Enroll early to secure your spot.
                  </p>
                </div>

                <a
                  href={ENROLL_LINK}
                  className="mt-6 flex items-center justify-center gap-3 rounded-[22px] bg-white px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                >
                  Enroll Now — Only ₹99
                  <ArrowRight size={16} />
                </a>

                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  20th June 2026 · Live Online
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="px-6 pb-20 pt-12 md:px-10">
          <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[#071624]/80 p-8 backdrop-blur-xl md:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Radio size={18} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Live &amp; Interactive
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Real-time Q&amp;A session with industry experts during the webinar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Users size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Expert Speakers
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Learn from quant professionals and IIT Finance Cell mentors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Award size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Certificate Included
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Co-certified by AQUA and IIT Kanpur, Kharagpur, Guwahati &amp; Roorkee Finance Cells.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-center text-[10px] font-mono uppercase tracking-[0.24em] text-slate-600">
              2026 AQUA Advanced Quantitative Analytics
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
