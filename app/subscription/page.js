"use client";

import React, { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutGrid,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Terminal,
  Users,
} from "lucide-react";

import aqua_logo2 from "../../public/aqua_logo2.png";

const CONTACT_LINK = "mailto:learn.finance@aqua.org.in?subject=AQUA%20Subscription%20Access";

const perks = [
  "All coding notebooks unlocked for subscriber-only learning and practice",
  "Medium and hard questions opened only for subscribers",
  "Continuously updated notebooks across quant, coding, and finance themes",
  "Fresh question additions to keep preparation current and relevant",
  "Latest research updates distilled into readable, practical notes",
  "A single annual pass designed for long-term preparation, not short-term cramming",
];

const accessBlocks = [
  {
    icon: <BookOpen size={18} className="text-sky-400" />,
    title: "Notebook Access",
    value: "All Coding Notebooks",
    note: "Structured research-style notebooks for building understanding over time.",
  },
  {
    icon: <LayoutGrid size={18} className="text-emerald-400" />,
    title: "Question Access",
    value: "Medium + Hard",
    note: "Advanced problem sets reserved for subscribers as your preparation deepens.",
  },
  {
    icon: <CalendarClock size={18} className="text-amber-400" />,
    title: "Validity",
    value: "Annual Access",
    note: "One subscription covers a full year of platform updates and gated content.",
  },
  {
    icon: <Rocket size={18} className="text-cyan-300" />,
    title: "Updates",
    value: "Continuous Rollout",
    note: "New notebooks, fresh questions, and research-led insights added regularly.",
  },
];

const outcomes = [
  "Better depth on interview-style coding and quant workflows",
  "A stronger practice loop through progressively tougher questions",
  "A living library of research-oriented notes and updates",
  "Subscriber-only access that compounds in value as the platform grows",
];

const idealFor = [
  "Students who want more than only entry-level question access",
  "Users preparing consistently across the full year",
  "Learners who want notebooks plus problem depth in one plan",
];

export default function SubscriptionPage() {
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
        <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-white/10 bg-[#071624]/80 px-6 py-5 backdrop-blur-2xl md:px-10">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <NextImage
                src={aqua_logo2}
                alt="Aqua Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex items-center">
              <span className="ml-1 text-2xl font-black uppercase italic tracking-tighter text-sky-400">
                -Lab
              </span>
              <span className="mx-2 text-2xl font-medium italic text-white/40">
                BY
              </span>
              <span className="text-2xl font-black uppercase italic tracking-tighter text-white">
                AQUA
              </span>
            </div>
          </Link>

          <div className="hidden gap-10 text-[13px] font-bold uppercase tracking-[0.25em] text-sky-100 lg:flex">
            {["Notebooks", "Questions", "Cohort", "Subscription"].map((item) => {
              let href = "/";
              if (item === "Cohort") href = "/cohort";
              else if (item === "Subscription") href = "/subscription";
              else if (item === "Notebooks") href = session ? "/notebooks" : "/#notebooks";
              else if (item === "Questions") href = session ? "/dashboard" : "/#questions";

              return (
                <Link
                  key={item}
                  href={href}
                  className={item === "Subscription" ? "text-sky-400" : "transition-colors hover:text-white"}
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
                    src={
                      session.user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "AQUA")}`
                    }
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
          <section className="px-6 pb-16 pt-20 md:px-10 md:pt-28">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-sky-300">
                  <Sparkles size={14} />
                  Subscriber Access Pass
                </div>

                <h1 className="max-w-4xl text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
                  Unlock the Advanced Practice Layer
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  The AQUA subscription is built for learners who want deeper,
                  continuously updated preparation beyond basic platform access.
                  It opens the high-value practice layer that compounds across
                  the year.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400">
                  Subscribers unlock all coding notebooks, medium and hard
                  questions, and a rolling stream of notebook updates, question
                  additions, and the latest research-oriented insights.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={CONTACT_LINK}
                    className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                  >
                    Request Access
                    <ArrowRight size={16} />
                  </a>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all hover:border-sky-400/40 hover:bg-sky-500/10"
                  >
                    Explore Questions
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Plan</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">Rs. 500</p>
                    <p className="mt-1 text-sm text-slate-400">Annual</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Access</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">Gated</p>
                    <p className="mt-1 text-sm text-slate-400">Premium notebooks and questions</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Updates</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">Ongoing</p>
                    <p className="mt-1 text-sm text-slate-400">New research-driven content</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-[36px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.18),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_rgba(2,12,27,0.45)] backdrop-blur-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">Subscriber Scope</p>
                    <h2 className="mt-2 text-2xl font-black uppercase italic tracking-tighter text-white">
                      What Opens Up
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Star size={20} className="text-sky-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  {perks.map((perk) => (
                    <div
                      key={perk}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                    >
                      <div className="mt-0.5 rounded-xl bg-sky-500/10 p-2">
                        <Check size={14} className="text-sky-300" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-100">{perk}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-6 py-10 md:px-10">
            <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-12 bg-sky-400/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-300">
                  Access Structure
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {accessBlocks.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-white/10 bg-[#081a2b] p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
                      {item.title}
                    </p>
                    <p className="mt-4 text-2xl font-black italic tracking-tighter text-white">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-12 md:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[34px] border border-white/10 bg-[#081625] p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <Shield size={18} className="text-sky-400" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                      Why Subscribe
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {outcomes.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="rounded-2xl bg-emerald-500/10 p-3">
                          <Check size={18} className="text-emerald-300" />
                        </div>
                        <p className="text-base leading-relaxed text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[34px] border border-white/10 bg-[#081625] p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <Users size={18} className="text-amber-400" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                      Who It Is For
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {idealFor.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="rounded-2xl bg-amber-500/10 p-3">
                          <ChevronRight size={18} className="text-amber-300" />
                        </div>
                        <p className="text-base leading-relaxed text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[26px] border border-sky-400/20 bg-sky-500/10 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">
                      Practical Note
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-100">
                      This page sets up the subscription offer and access story.
                      Payment activation can be connected cleanly afterward
                      without changing the structure of the plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-12 md:px-10">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <FileText size={18} className="text-sky-400" />
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    What Stays Fresh
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Coding notebooks expanded over time",
                    "New medium and hard question drops",
                    "Latest research updates and summaries",
                    "Subscriber tier designed for sustained learning",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[24px] border border-white/10 bg-[#091726] p-5 text-sm leading-relaxed text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[36px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.18),rgba(255,255,255,0.04))] p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-300">
                      Annual Plan
                    </p>
                    <h3 className="mt-3 text-3xl font-black uppercase italic tracking-tighter text-white">
                      Rs. 500 / Annual
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <GraduationCap size={18} className="text-sky-200" />
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-100">
                  One plan. One year. The goal is to keep the best growing parts
                  of AQUA accessible through a simple subscriber layer instead of
                  fragmenting the learning experience.
                </p>

                <a
                  href={CONTACT_LINK}
                  className="mt-8 flex items-center justify-center gap-3 rounded-[22px] bg-white px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                >
                  Request Subscriber Access
                  <ArrowRight size={16} />
                </a>

                <a
                  href={CONTACT_LINK}
                  className="mt-4 block break-all text-center text-sm text-sky-100 underline decoration-sky-400/40 underline-offset-4 hover:text-white"
                >
                  learn.finance@aqua.org.in
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
