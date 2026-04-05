export default function LoadingLeaderboard() {
  return (
    <div className="min-h-screen bg-[#020617] p-8 text-slate-300">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 h-4 w-32 rounded bg-white/10 animate-pulse" />

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 animate-pulse">
            <div className="h-10 w-64 rounded bg-white/10" />
            <div className="mt-4 h-4 w-72 rounded bg-white/10" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 animate-pulse">
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="mt-3 h-8 w-20 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] p-6">
            <div className="h-3 w-40 rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-48 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="divide-y divide-white/5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="h-6 w-6 rounded bg-white/10 animate-pulse" />
                  <div className="h-12 w-12 rounded-2xl bg-white/10 animate-pulse" />
                  <div>
                    <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
                    <div className="mt-2 h-3 w-28 rounded bg-white/10 animate-pulse" />
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
