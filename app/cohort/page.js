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
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  Rocket,
  Shield,
  Target,
  Terminal,
  Users,
} from "lucide-react";

import aqua_logo2 from "../../public/aqua_logo2.png";

const FORM_LINK = "https://forms.gle/LHk7KFuCUcXdPQdv5";

const highlights = [
  "Learn quantitative finance from the ground up with structured progression",
  "Personalized mentorship from IIT-IIM alumni, industry professionals, and experienced quants",
  "Dedicated doubt-solving sessions and individual guidance throughout the program",
  "Monthly masterclasses with professionals from leading global finance firms",
  "Work on a capstone project that mirrors real-world quant problems",
  "Receive a 3-month internship certificate from AQUA",
  "Co-certification from the finance and quant cells of top IITs",
  "Training aligned with real hiring expectations in quant and finance roles",
];

const outcomes = [
  "Quant trading fundamentals",
  "Financial research thinking",
  "Model-building exposure",
  "Capstone project execution",
  "Mentorship and interview readiness",
  "Portfolio-oriented outcomes",
];

const structure = [
  {
    icon: <Calendar size={18} className="text-sky-400" />,
    title: "Duration",
    value: "3 Months",
    note: "Intensive, mentorship-driven format",
  },
  {
    icon: <Rocket size={18} className="text-cyan-300" />,
    title: "Start Date",
    value: "14 April",
    note: "Season 2 launches this April",
  },
  {
    icon: <Users size={18} className="text-emerald-400" />,
    title: "Format",
    value: "Live Sessions",
    note: "Interactive weekend schedule for students",
  },
  {
    icon: <BookOpen size={18} className="text-amber-400" />,
    title: "Includes",
    value: "Assignments + Project",
    note: "Problem-solving, mentorship calls, and internship certificate",
  },
];

const fees = [
  {
    name: "Partner Institute Students",
    price: "Rs. 5,000 + GST (18%)",
    note: "Applicable to current students from partner institutes",
    accent: "border-sky-400/30 bg-sky-500/10",
  },
  {
    name: "Other Students",
    price: "Rs. 6,000 + GST (18%)",
    note: "Applicable to all non-partner institute applicants",
    accent: "border-white/10 bg-white/5",
  },
];

const processSteps = [
  "Fill the registration form.",
  "Applications are reviewed to keep the cohort limited and personalized.",
  "Selected students receive the final enrollment link on 7 April.",
];

const audience = [
  "Quantitative Finance Enthusiasts",
  "Trading and Financial Research Enthusiasts",
  "Breaking into top finance and quant firms",
];

const placements = [
  "Squarepoint Capital",
  "JP Morgan Chase",
  "Barclays",
  "iRage Capital",
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
                  className={item === "Cohort" ? "text-sky-400" : "transition-colors hover:text-white"}
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
          <section className="px-6 pb-16 pt-20 md:px-10 md:pt-28">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-sky-300">
                  <GraduationCap size={14} />
                  Research Cohort Season 2
                </div>

                <h1 className="max-w-4xl text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
                  Build Real Quant Models in 90 Days
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  AQUA&apos;s Quantitative Finance Research Cohort Season 2 is a
                  3-month intensive program designed for students who want to
                  move from zero to real quantitative finance work with direct
                  guidance from industry professionals and experienced quants.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400">
                  This is not a typical course. It is a mentorship-driven,
                  outcome-focused cohort built for careers in quant trading,
                  financial research, and top-tier finance firms.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={FORM_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </a>
                  {session?.user?.cohortMember || session?.user?.role === "admin" ? (
                    <Link
                      href="/cohort/portal"
                      className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-emerald-200 transition-all hover:border-emerald-300/50 hover:bg-emerald-400/20"
                    >
                      Cohort Portal
                      <ChevronRight size={16} />
                    </Link>
                  ) : null}
                  <a
                    href="#fees"
                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all hover:border-sky-400/40 hover:bg-sky-500/10"
                  >
                    View Fees
                    <ChevronRight size={16} />
                  </a>
                  <a
                    href="/cohort-curriculum.pdf"
                    download
                    className="inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-sky-500/10 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-sky-100 transition-all hover:border-sky-300/40 hover:bg-sky-500/20 hover:text-white"
                  >
                    Download Curriculum
                    <FileText size={16} />
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Start Date</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">14 April</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Format</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">Live</p>
                    <p className="mt-1 text-sm text-slate-400">Interactive weekend sessions</p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Duration</p>
                    <p className="mt-3 text-3xl font-black italic tracking-tighter text-white">3 Months</p>
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
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">Season 1 Outcomes</p>
                    <h2 className="mt-2 text-2xl font-black uppercase italic tracking-tighter text-white">
                      Proof of Outcomes
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Briefcase size={20} className="text-sky-300" />
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-200">
                  Research Cohort Season 1 already saw students recruited at
                  top quant and investment banking firms.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {placements.map((company) => (
                    <div
                      key={company}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white"
                    >
                      {company}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Why It Matters</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100">
                    Season 2 is designed to expand that momentum with better
                    mentorship, real project work, and stronger career
                    alignment.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-6 py-10 md:px-10">
            <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-12 bg-sky-400/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-300">
                  Why This Cohort Stands Out
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[28px] border border-white/10 bg-[#081a2b] p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10">
                      <Check size={18} className="text-sky-300" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">{item}</p>
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
                    <LayoutGrid size={18} className="text-sky-400" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                      Program Snapshot
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {structure.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[26px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="rounded-2xl bg-black/30 p-3">{item.icon}</div>
                          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
                            {item.title}
                          </p>
                        </div>
                        <p className="text-2xl font-black italic tracking-tighter text-white">
                          {item.value}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[34px] border border-white/10 bg-[#081625] p-8">
                  <div className="mb-8 flex items-center gap-3">
                    <Target size={18} className="text-emerald-400" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                      Who Should Apply
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {audience.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="rounded-2xl bg-emerald-500/10 p-3">
                          <ChevronRight size={18} className="text-emerald-300" />
                        </div>
                        <p className="text-base text-slate-200">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[26px] border border-amber-400/20 bg-amber-500/10 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">
                      Outcome Focus
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {outcomes.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="fees" className="px-6 py-12 md:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-300">
                  Fee Structure
                </p>
                <h3 className="mt-3 text-4xl font-black uppercase italic tracking-tighter text-white">
                  Clear, Student-Friendly Pricing
                </h3>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
                {fees.map((plan) => (
                  <div
                    key={plan.name}
                    className={`rounded-[34px] border p-8 ${plan.accent}`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">
                      Cohort Access
                    </p>
                    <h4 className="mt-4 text-3xl font-black uppercase italic tracking-tighter text-white">
                      {plan.name}
                    </h4>
                    <p className="mt-6 text-4xl font-black italic tracking-tighter text-white">
                      {plan.price}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {plan.note}
                    </p>
                  </div>
                ))}

                <div className="rounded-[34px] border border-white/10 bg-[#081625] p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <FileText size={18} className="text-amber-400" />
                    <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">
                      Important Note
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Please locate your institute in the attached file titled{" "}
                    <a
                      href="/Partner_Institutions.pdf"
                      download
                      className="font-black text-white underline decoration-sky-400/40 underline-offset-4 hover:text-sky-200"
                    >
                      Partner Institutions.pdf
                    </a>{" "}
                    to verify partner eligibility. The discount is not
                    applicable to alumni of partner institutes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-12 md:px-10">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.95fr]">
              <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <div className="mb-8 flex items-center gap-3">
                  <MessageSquare size={18} className="text-sky-400" />
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                    How Selection Works
                  </h3>
                </div>

                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-[#091726] p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sm font-black text-sky-300">
                        {index + 1}
                      </div>
                      <p className="pt-2 text-sm leading-relaxed text-slate-200">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-emerald-400/20 bg-emerald-500/10 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">
                    Cohort Access
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-slate-100">
                    The cohort is intentionally kept limited for better
                    personalized interaction and mentorship quality.
                  </p>
                </div>
              </div>

              <div className="rounded-[36px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.18),rgba(255,255,255,0.04))] p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-300">
                      Apply Here
                    </p>
                    <h3 className="mt-3 text-3xl font-black uppercase italic tracking-tighter text-white">
                      Form + QR Access
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Globe size={18} className="text-sky-200" />
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center rounded-[30px] border border-white/15 bg-white p-5">
                  <NextImage
                    src="/Form_qr.jpeg"
                    alt="Cohort QR Code"
                    width={220}
                    height={220}
                    className="h-auto w-full max-w-[220px] object-contain"
                  />
                </div>

                <p className="mt-6 text-center text-sm leading-relaxed text-slate-100">
                  Scan the QR code or use the direct Google Form link to
                  complete registration.
                </p>

                <a
                  href={FORM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center justify-center gap-3 rounded-[22px] bg-white px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.24em] text-slate-950 transition-all hover:scale-[1.02] hover:bg-sky-300"
                >
                  Open Google Form
                  <ArrowRight size={16} />
                </a>

                <a
                  href={FORM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block break-all text-center text-sm text-sky-100 underline decoration-sky-400/40 underline-offset-4 hover:text-white"
                >
                  {FORM_LINK}
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="px-6 pb-20 pt-12 md:px-10">
          <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[#071624]/80 p-8 backdrop-blur-xl md:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Shield size={18} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Built for Outcomes
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Structured, practical, and designed for serious student growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Users size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Mentorship Led
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    IIT-IIM alumni, industry professionals, and experienced quants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-white/5 p-3">
                  <Award size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Certification
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Internship certificate from AQUA With co-certification from top IIT Finance Cells.
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
