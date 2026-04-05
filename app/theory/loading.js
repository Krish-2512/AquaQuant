export default function LoadingTheory() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="h-4 w-24 rounded bg-white/10 animate-pulse mb-8" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="h-8 w-40 rounded bg-white/10 animate-pulse" />
            <div className="mt-3 h-3 w-48 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="h-11 w-full md:w-80 rounded-2xl bg-white/5 animate-pulse" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 animate-pulse">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="mt-4 h-5 w-64 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
