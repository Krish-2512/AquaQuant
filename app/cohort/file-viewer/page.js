function isPdfFile(name, url) {
  const source = `${name || ""} ${url || ""}`.toLowerCase();
  return source.includes(".pdf");
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function CohortFileViewerPage({ searchParams }) {
  const params = await searchParams;
  const url = typeof params?.url === "string" ? params.url : "";
  const name = typeof params?.name === "string" ? params.name : "file";

  if (!url) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6">
        <p className="text-sm text-slate-400">File URL is missing.</p>
      </div>
    );
  }

  const endpoint = `/api/cohort/files/view?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
  const src = isPdfFile(name, url)
    ? `${endpoint}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0`
    : endpoint;

  if (!src) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6">
        <p className="text-sm text-slate-400">File URL is missing.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <iframe
        src={src}
        title={name}
        className="h-screen w-full"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
