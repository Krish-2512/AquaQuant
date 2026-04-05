export default function LoadingNotebooks() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <div className="h-8 w-56 rounded bg-white/10 animate-pulse" />
            <div className="mt-3 h-3 w-40 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-36 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-10 w-36 rounded-2xl bg-white/5 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[32px] border border-white/10 bg-white/[0.03] animate-pulse"
            >
              <div className="h-6 w-28 rounded bg-white/10" />
              <div className="mt-3 h-4 w-20 rounded bg-white/10" />
              <div className="mt-6 h-3 w-24 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
