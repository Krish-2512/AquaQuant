export default function LoadingProblem() {
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <div className="flex-1 p-8 animate-pulse">
        <div className="h-6 w-64 rounded bg-white/10" />
        <div className="mt-4 h-4 w-48 rounded bg-white/10" />
        <div className="mt-8 h-64 w-full rounded-3xl bg-white/5" />
      </div>
      <div className="w-80 border-l border-white/5 p-6 animate-pulse hidden lg:block">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-6 h-24 w-full rounded-2xl bg-white/5" />
        <div className="mt-4 h-24 w-full rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
