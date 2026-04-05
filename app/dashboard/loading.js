export default function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <nav className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
        </div>
        <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
      </nav>

      <div className="flex justify-center w-full max-w-[1600px] mx-auto">
        <aside className="hidden lg:block w-64 border-r border-white/5 p-6">
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
          </div>
        </aside>

        <main className="flex-1 p-8 min-w-0">
          <div className="max-w-4xl mx-auto mb-10">
            <div className="mb-8 rounded-[32px] border border-white/10 bg-white/[0.03] p-6 animate-pulse">
              <div className="h-5 w-48 rounded bg-white/10" />
              <div className="mt-4 h-4 w-64 rounded bg-white/10" />
            </div>

            <div className="flex items-center gap-3 mb-10">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="h-8 w-24 rounded-full bg-white/5 animate-pulse" />
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
              <div className="h-12 border-b border-white/5 bg-white/[0.02]" />
              <div className="divide-y divide-white/5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-6 px-6 py-5">
                    <div className="h-4 w-4 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-white/10 animate-pulse ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden xl:block w-72 border-l border-white/5 p-6">
          <div className="space-y-4">
            <div className="h-6 w-32 rounded bg-white/10 animate-pulse" />
            <div className="h-24 w-full rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-24 w-full rounded-2xl bg-white/5 animate-pulse" />
          </div>
        </aside>
      </div>
    </div>
  );
}
