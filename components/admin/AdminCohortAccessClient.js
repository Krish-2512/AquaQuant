"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  KeyRound,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";

export default function AdminCohortAccessClient({ initialEntries = [], initialPagination }) {
  const [entries, setEntries] = useState(initialEntries);
  const [pagination, setPagination] = useState(initialPagination);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activeRow, setActiveRow] = useState("");
  const [isPending, startTransition] = useTransition();

  const canSubmit = useMemo(() => {
    const trimmed = email.trim().toLowerCase();
    return trimmed.length > 3 && trimmed.includes("@");
  }, [email]);

  const fetchEntries = async (pageToLoad, searchValue) => {
    const params = new URLSearchParams({ page: String(pageToLoad) });
    if (searchValue.trim()) params.set("search", searchValue.trim());

    const res = await fetch(`/api/admin/cohort/access?${params.toString()}`, { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to load cohort access list.");
    }

    setEntries(data.data || []);
    setPagination(data.pagination);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTransition(async () => {
        try {
          await fetchEntries(1, search);
          setError("");
        } catch (fetchError) {
          setError(fetchError.message || "Failed to load cohort access list.");
        }
      });
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const goToPage = (page) => {
    startTransition(async () => {
      try {
        await fetchEntries(page, search);
        setError("");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load cohort access list.");
      }
    });
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // noop
    }
  };

  const createEntry = async () => {
    setError("");
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/cohort/access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to create cohort access entry.");
        }

        setName("");
        setEmail("");
        await fetchEntries(1, search);
      } catch (createError) {
        setError(createError.message || "Failed to create cohort access entry.");
      }
    });
  };

  const regeneratePasscode = async (entryId) => {
    setError("");
    setActiveRow(entryId);
    try {
      const res = await fetch(`/api/admin/cohort/access/${entryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regenerate: true }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to regenerate passcode.");
      }

      setEntries((prev) =>
        prev.map((entry) => (entry.id === entryId ? data.data : entry))
      );
    } catch (regenerateError) {
      setError(regenerateError.message || "Failed to regenerate passcode.");
    } finally {
      setActiveRow("");
    }
  };

  const deleteEntry = async (entryId) => {
    if (!confirm("Delete this cohort access entry? The user will lose portal access.")) {
      return;
    }

    setError("");
    setActiveRow(entryId);
    try {
      const res = await fetch(`/api/admin/cohort/access/${entryId}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to delete cohort access entry.");
      }

      await fetchEntries(1, search);
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete cohort access entry.");
    } finally {
      setActiveRow("");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
          Cohort Access
        </p>
        <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">
          Passcode Directory
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Add cohort users here. A passcode is required after Google sign-in to open the cohort portal.
        </p>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="relative">
            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name (optional)"
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/40"
            />
          </div>
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email (required)"
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/40"
            />
          </div>
          <button
            type="button"
            onClick={createEntry}
            disabled={!canSubmit || isPending}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
            Add
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/40"
            />
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-300">
            {pagination.total} entries
          </div>
        </div>

        {error ? <p className="text-sm font-semibold text-rose-400">{error}</p> : null}

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-black/20">
              <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Passcode</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {entries.map((entry) => (
                <tr key={entry.id} className="bg-white/[0.02] text-sm text-slate-300">
                  <td className="px-5 py-4 font-semibold text-white">{entry.name || "—"}</td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-300">{entry.email}</td>
                  <td className="px-5 py-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[12px]">
                      {entry.passcode}
                      <button
                        type="button"
                        onClick={() => copyText(entry.passcode)}
                        className="text-slate-400 transition hover:text-white"
                        aria-label="Copy passcode"
                      >
                        <ClipboardCopy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">{entry.passcodeUpdatedAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => regeneratePasscode(entry.id)}
                        disabled={activeRow === entry.id}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white transition hover:border-sky-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {activeRow === entry.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <RefreshCw size={12} />
                        )}
                        Regenerate
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEntry(entry.id)}
                        disabled={activeRow === entry.id}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-rose-200 transition hover:border-rose-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                    No cohort access entries found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, pagination.page - 1))}
              disabled={pagination.page <= 1 || isPending}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-sky-400/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <button
              type="button"
              onClick={() => goToPage(Math.min(pagination.pages, pagination.page + 1))}
              disabled={pagination.page >= pagination.pages || isPending}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-400 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <ChevronRight size={14} />}
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

