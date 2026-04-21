"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function isPdfFile(name, url) {
  const source = `${name || ""} ${url || ""}`.toLowerCase();
  return source.includes(".pdf");
}

export default function CohortFileViewerPage() {
  const params = useSearchParams();
  const url = params.get("url") || "";
  const name = params.get("name") || "file";

  const src = useMemo(() => {
    if (!url) return "";
    const endpoint = `/api/cohort/files/view?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
    if (isPdfFile(name, url)) {
      return `${endpoint}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0`;
    }
    return endpoint;
  }, [name, url]);

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

