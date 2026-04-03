"use client";

import { useMemo, useState, useTransition } from "react";
import { CheckCircle2, Edit3, Loader2, Plus, RefreshCcw, Trash2, XCircle } from "lucide-react";

const emptyForm = {
  id: "",
  title: "",
  content: "",
  category: "Probability",
  difficulty: "Easy",
  status: "UnAttempted",
  answer: "",
  solution: "",
  companyTags: "",
  relatedTopics: "",
};

function toFormState(question) {
  if (!question) return emptyForm;

  return {
    id: question._id || "",
    title: question.title || "",
    content: question.content || "",
    category: question.category || "Probability",
    difficulty: question.difficulty || "Easy",
    status: question.status || "UnAttempted",
    answer: question.answer || "",
    solution: question.solution || "",
    companyTags: (question.companyTags || []).join(", "),
    relatedTopics: (question.relatedTopics || []).join(", "),
  };
}

export default function AdminQuestionsClient({ initialQuestions = [] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(form.id);

  const questionCountLabel = useMemo(
    () => `${questions.length} recent question${questions.length === 1 ? "" : "s"}`,
    [questions.length]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setMessage("");
    setError("");
  };

  const refreshQuestions = async () => {
    setError("");
    const res = await fetch("/api/admin/questions", { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to refresh questions.");
    }

    setQuestions(data.data || []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const method = isEditing ? "PUT" : "POST";
        const res = await fetch("/api/admin/questions", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || `Failed to ${isEditing ? "update" : "create"} question.`);
        }

        setForm(emptyForm);
        setMessage(isEditing ? "Question updated successfully." : "Question created successfully.");
        await refreshQuestions();
      } catch (submitError) {
        setError(submitError.message || `Unable to ${isEditing ? "update" : "create"} question.`);
      }
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this question permanently?");
    if (!confirmed) return;

    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to delete question.");
        }

        if (form.id === id) {
          setForm(emptyForm);
        }

        setMessage("Question deleted successfully.");
        await refreshQuestions();
      } catch (deleteError) {
        setError(deleteError.message || "Unable to delete question.");
      }
    });
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
              Question Control
            </p>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">
              {isEditing ? "Edit Quant Question" : "Add Quant Question"}
            </h2>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">
              Live Feed
            </p>
            <p className="mt-1 text-sm font-bold text-white">{questionCountLabel}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Title
              </span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
                placeholder="Expected value warm-up"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Answer
              </span>
              <input
                name="answer"
                value={form.answer}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
                placeholder="42 or 3/8"
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Category
              </span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
              >
                {["Probability", "Statistics", "BrainTeasers", "Finance", "Coding"].map((option) => (
                  <option key={option} value={option} className="bg-slate-950">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Difficulty
              </span>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
              >
                {["Easy", "Medium", "Hard"].map((option) => (
                  <option key={option} value={option} className="bg-slate-950">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Status
              </span>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
              >
                {["UnAttempted", "Attempted", "Finished"].map((option) => (
                  <option key={option} value={option} className="bg-slate-950">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Question Content
            </span>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition focus:border-sky-400/50"
              placeholder="Write the full question statement here..."
            />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Solution
            </span>
            <textarea
              name="solution"
              value={form.solution}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition focus:border-sky-400/50"
              placeholder="Explain the solution logic clearly..."
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Company Tags
              </span>
              <input
                name="companyTags"
                value={form.companyTags}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
                placeholder="CITADEL, OPTIVER, IMC TRADING"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Related Topics
              </span>
              <input
                name="relatedTopics"
                value={form.relatedTopics}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50"
                placeholder="Expected Value, Combinatorics"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-3 rounded-2xl bg-sky-400 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-sky-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : isEditing ? <Edit3 size={16} /> : <Plus size={16} />}
              {isEditing ? "Update Question" : "Create Question"}
            </button>

            {isEditing ? (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-white/30"
              >
                <XCircle size={16} />
                Cancel Edit
              </button>
            ) : null}

            {message ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <CheckCircle2 size={16} />
                {message}
              </span>
            ) : null}

            {error ? <span className="text-sm font-semibold text-rose-400">{error}</span> : null}
          </div>
        </form>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
              Recent Questions
            </p>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-white">
              Review Feed
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              startTransition(async () => {
                try {
                  await refreshQuestions();
                } catch (refreshError) {
                  setError(refreshError.message || "Unable to refresh questions.");
                }
              })
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-sky-400/40"
          >
            <RefreshCcw size={14} />
            Refresh
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question._id}
              className="rounded-[24px] border border-white/10 bg-black/20 p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
                  {question.category}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                  {question.difficulty}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  {question.status}
                </span>
              </div>
              <h3 className="text-lg font-black italic text-white">{question.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{question.content}</p>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Tags: {(question.companyTags || []).join(", ") || "N/A"}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(toFormState(question));
                    setMessage("");
                    setError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:border-sky-400/40"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(question._id)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-rose-300 transition hover:bg-rose-500/20"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
