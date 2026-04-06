"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
  Video,
} from "lucide-react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const emptyForm = {
  week: "",
  title: "",
  summary: "",
  videoUrl: "",
};

export default function AdminCohortContentClient({ initialContent = [] }) {
  const [content, setContent] = useState(initialContent);
  const [form, setForm] = useState(emptyForm);
  const [attachments, setAttachments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  const isEditing = Boolean(editingId);

  const resetForm = () => {
    setForm(emptyForm);
    setAttachments([]);
    setEditingId(null);
  };

  const loadForEdit = (item) => {
    setEditingId(item.id);
    setForm({
      week: item.week || "",
      title: item.title || "",
      summary: item.summary || "",
      videoUrl: item.videoUrl || "",
    });
    setAttachments(item.attachments || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshContent = async () => {
    startTransition(async () => {
      const res = await fetch("/api/admin/cohort/content", { cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.success) {
        setContent(
          (data.data || []).map((item) => ({
            id: String(item._id),
            week: item.week,
            title: item.title,
            summary: item.summary || "",
            videoUrl: item.videoUrl || "",
            attachments: item.attachments || [],
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A",
          }))
        );
      }
    });
  };

  const handleSave = async () => {
    setNotice("");
    if (!form.week.trim() || !form.title.trim()) {
      setNotice("Week and title are required.");
      return;
    }

    const payload = {
      ...form,
      week: form.week.trim(),
      title: form.title.trim(),
      summary: form.summary.trim(),
      videoUrl: form.videoUrl.trim(),
      attachments,
    };

    const endpoint = editingId
      ? `/api/admin/cohort/content/${editingId}`
      : "/api/admin/cohort/content";
    const method = editingId ? "PUT" : "POST";

    startTransition(async () => {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setNotice(data.error || "Failed to save content.");
        return;
      }

      setNotice(editingId ? "Content updated." : "Content created.");
      resetForm();
      await refreshContent();
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this content entry?")) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/cohort/content/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setNotice(data.error || "Failed to delete content.");
        return;
      }
      setNotice("Content deleted.");
      setContent((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleUploadAttachment = async (file) => {
    if (!file || !cloudName || !uploadPreset) {
      setNotice("Cloudinary is not configured.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!data.secure_url) {
        throw new Error("Upload failed.");
      }

      setAttachments((prev) => [
        ...prev,
        {
          label: file.name,
          type: file.name.toLowerCase().endsWith(".ppt") || file.name.toLowerCase().endsWith(".pptx")
            ? "ppt"
            : file.name.toLowerCase().endsWith(".pdf")
              ? "pdf"
              : "file",
          url: data.secure_url,
        },
      ]);
    } catch (error) {
      setNotice(error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const attachmentSummary = useMemo(() => {
    if (!attachments.length) return "No files attached.";
    return `${attachments.length} file${attachments.length > 1 ? "s" : ""} attached.`;
  }, [attachments]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
          Cohort Content
        </p>
        <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">
          Weekly Drops
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Upload weekly PDFs, PPTs, and video links for cohort members. This section powers the cohort-only
          portal and submissions flow.
        </p>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
              {isEditing ? "Editing Content" : "Create New Content"}
            </p>
            <p className="mt-2 text-sm text-slate-400">{attachmentSummary}</p>
          </div>
          <button
            type="button"
            onClick={refreshContent}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-sky-400/40"
          >
            <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {notice ? <p className="mb-4 text-sm font-semibold text-amber-300">{notice}</p> : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <input
              value={form.week}
              onChange={(event) => setForm((prev) => ({ ...prev, week: event.target.value }))}
              placeholder="Week (e.g., Week 1)"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/40"
            />
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Title"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/40"
            />
            <textarea
              value={form.summary}
              onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
              placeholder="Summary or instructions"
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-sky-400/40"
            />
            <div className="relative">
              <Video size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={form.videoUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, videoUrl: event.target.value }))}
                placeholder="Video embed link (YouTube/Vimeo)"
                className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-sky-400/40"
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/20 p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
              Attachments
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Upload PDFs, PPTs, or docs for this week. These appear in the cohort portal.
            </p>

            <div className="mt-6 space-y-3">
              {attachments.map((file, idx) => (
                <div
                  key={`${file.url}-${idx}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{file.label}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{file.type}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((prev) => prev.filter((_, index) => index !== idx))
                    }
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <label className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-200 transition hover:border-sky-400/40">
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {uploading ? "Uploading..." : "Upload File"}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={(event) => handleUploadAttachment(event.target.files?.[0])}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-950 transition hover:scale-[1.02] disabled:opacity-60"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            {isEditing ? "Update Content" : "Publish Content"}
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-sky-400/40"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-sky-400">
            Published Content
          </p>
          <span className="text-xs text-slate-500">{content.length} entries</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {content.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-white/10 bg-black/20 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
                    {item.week}
                  </p>
                  <h3 className="mt-2 text-xl font-black uppercase italic text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-400">{item.summary || "No summary yet."}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-rose-400 hover:text-rose-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <span>{item.attachments.length} files</span>
                {item.videoUrl ? <span className="flex items-center gap-1"><Video size={12} /> video</span> : null}
                <span>{item.createdAt}</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => loadForEdit(item)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 hover:border-sky-400/40"
                >
                  <ChevronDown size={12} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
