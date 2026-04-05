export default function LoadingCoding() {
  return (
    <div className="min-h-screen bg-[#020617] p-12">
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded bg-white/10" />
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-20 rounded-3xl bg-white/[0.03] border border-white/10" />
        ))}
      </div>
    </div>
  );
}
