"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  ChevronDown,
  FileText,
  Film,
  Loader2,
  Upload,
} from "lucide-react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const ACCEPTED_SUBMISSION_EXTENSIONS = [".pdf", ".ppt", ".pptx", ".ipynb", ".doc", ".docx"];

export default function CohortPortalClient({ initialContent = [], user }) {
  const [content, setContent] = useState(initialContent);
  const [selectedContentId, setSelectedContentId] = useState(
    initialContent[0]?.id || ""
  );
  const [note, setNote] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");

  const contentOptions = useMemo(
    () => content.map((item) => ({ id: item.id, label: `${item.week} · ${item.title}` })),
    [content]
  );

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const res = await fetch("/api/cohort/submissions", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.success) {
          setSubmissions(data.data || []);
        }
      } catch (error) {
        setNotice("Unable to load submissions.");
      }
    };

    loadSubmissions();
  }, []);

  const handleUploadSubmission = async (file) => {
    setNotice("");
    if (!file || !cloudName || !uploadPreset) {
      setNotice("Cloudinary is not configured.");
      return;
    }

    const lowerName = file.name.toLowerCase();
    if (!ACCEPTED_SUBMISSION_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      setNotice("Unsupported file type.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) {
        throw new Error("Upload failed.");
      }

      const submitRes = await fetch("/api/cohort/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: selectedContentId,
          fileName: file.name,
          fileUrl: uploadData.secure_url,
          fileType: file.type || "file",
          note,
        }),
      });

      const submitData = await submitRes.json();
      if (!submitRes.ok || !submitData.success) {
        throw new Error(submitData.error || "Submission failed.");
      }

      setSubmissions((prev) => [submitData.data, ...prev]);
      setNote("");
      setNotice("Submission received.");
    } catch (error) {
      setNotice(error.message || "Submission failed.");
    } finally {
      setUploading(false);
    }
  };

  const buildProtectedViewUrl = (fileUrl, fileName) => {
    const params = new URLSearchParams({
      url: fileUrl || "",
      name: fileName || "file",
    });
    return `/api/cohort/files/view?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-center gap-3 text-sky-300">
            <CalendarCheck size={20} />
            <span className="text-[11px] font-black uppercase tracking-[0.35em]">
              Cohort Portal
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-black uppercase italic tracking-tight text-white">
            Weekly Content Hub
          </h1>
          <p className="mt-4 text-slate-400">
            Welcome {user?.name || "Scholar"}. This space is reserved for cohort
            members only. New weekly packs are uploaded here with PDFs, PPTs,
            and video guidance. Upload your notebook or documents to submit your
            weekly work.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {content.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
                      {item.week}
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase italic text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">{item.summary}</p>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                    {item.createdAt}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.attachments.map((file, idx) => (
                    <a
                      key={`${file.url}-${idx}`}
                      href={buildProtectedViewUrl(file.url, file.label)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-200 hover:border-sky-400/40"
                    >
                      <FileText size={16} className="text-sky-300" />
                      <span className="font-semibold">{file.label}</span>
                    </a>
                  ))}
                </div>

                {item.videoUrl ? (
                  <div className="mt-5 overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <Film size={14} className="text-amber-300" />
                      Video Brief
                    </div>
                    <iframe
                      className="h-64 w-full"
                      src={item.videoUrl}
                      title={`${item.title} video`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
              Submit Work
            </p>
            <h3 className="mt-3 text-2xl font-black uppercase italic text-white">
              Weekly Submission
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Upload your notebook or document for the selected week. Supported formats:
              {ACCEPTED_SUBMISSION_EXTENSIONS.join(" ")}.
            </p>

            <div className="mt-5 space-y-4">
              <div className="relative">
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  value={selectedContentId}
                  onChange={(event) => setSelectedContentId(event.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/40"
                >
                  {contentOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional submission note..."
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/40"
              />

              <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-sky-400/40">
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploading ? "Uploading..." : "Upload Submission"}
                <input
                  type="file"
                  className="hidden"
                  accept={ACCEPTED_SUBMISSION_EXTENSIONS.join(",")}
                  onChange={(event) => handleUploadSubmission(event.target.files?.[0])}
                  disabled={uploading}
                />
              </label>
            </div>

            {notice ? (
              <p className="mt-4 text-sm font-semibold text-amber-300">{notice}</p>
            ) : null}

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                Your Recent Submissions
              </p>
              <div className="mt-3 space-y-3">
                {submissions.length === 0 ? (
                  <p className="text-xs text-slate-500">No submissions yet.</p>
                ) : (
                  submissions.slice(0, 5).map((submission) => (
                    <a
                      key={submission._id}
                      href={buildProtectedViewUrl(submission.fileUrl, submission.fileName)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300"
                    >
                      <span className="font-semibold">{submission.fileName}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </span>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
