"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";

export default function CohortVerifyClient({ email }) {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    startTransition(async () => {
      try {
        const res = await fetch("/api/cohort/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Verification failed.");
        }

        setSuccess(true);
        router.push("/cohort/portal");
      } catch (submitError) {
        setError(submitError.message || "Verification failed.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-[36px] border border-white/10 bg-white/[0.03] p-10">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3">
          <ShieldCheck size={18} className="text-sky-300" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-300">
            Cohort Verification
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-black uppercase italic tracking-tight text-white">
          Enter Passcode
        </h1>
        <p className="mt-4 text-slate-400">
          This portal requires both your Google sign-in and a cohort passcode.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
            Signed in email
          </p>
          <p className="mt-1 font-mono text-sm text-white">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <KeyRound
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              placeholder="16-character passcode"
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/40"
              inputMode="text"
              autoComplete="one-time-code"
            />
          </div>

          {error ? (
            <p className="text-sm font-semibold text-rose-400">{error}</p>
          ) : null}
          {success ? (
            <p className="text-sm font-semibold text-emerald-400">
              Verified. Redirecting...
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending || !passcode.trim()}
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 px-6 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-sky-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
