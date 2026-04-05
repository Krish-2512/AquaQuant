export default function LoadingProfile() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/[0.03] p-10 rounded-[40px] border border-white/10">
            <div className="h-32 w-32 rounded-[2rem] bg-white/10" />
            <div className="mt-6 h-8 w-64 rounded bg-white/10" />
            <div className="mt-3 h-4 w-48 rounded bg-white/10" />
            <div className="mt-6 h-8 w-56 rounded bg-white/10" />
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10">
            <div className="h-10 w-24 rounded bg-white/10" />
            <div className="mt-4 h-4 w-40 rounded bg-white/10" />
            <div className="mt-6 h-2 w-full rounded bg-white/5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-white/[0.03] p-8 rounded-[32px] border border-white/5">
              <div className="h-6 w-24 rounded bg-white/10" />
              <div className="mt-3 h-8 w-20 rounded bg-white/10" />
            </div>
          ))}
        </div>

        <div className="bg-white/[0.03] p-12 rounded-[40px] border border-white/5">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-32 rounded-3xl bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
