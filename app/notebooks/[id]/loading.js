export default function LoadingNotebookDetail() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-4 w-24 rounded bg-white/10 animate-pulse mb-8" />

        <div className="mb-8 p-8 rounded-[32px] bg-white/[0.03] border border-white/10 animate-pulse">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="mt-4 h-4 w-full rounded bg-white/10" />
          <div className="mt-2 h-4 w-3/4 rounded bg-white/10" />
          <div className="mt-6 h-8 w-48 rounded bg-white/10" />
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-10 animate-pulse">
          <div className="h-6 w-56 rounded bg-white/10" />
          <div className="mt-3 h-4 w-40 rounded bg-white/10" />
          <div className="mt-10 h-40 w-full rounded-3xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
