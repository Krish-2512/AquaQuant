"use client";

import { useEffect, useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";

export default function AdminUsersClient({ initialUsers = [], initialPagination }) {
  const [users, setUsers] = useState(initialUsers);
  const [pagination, setPagination] = useState(initialPagination);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const fetchUsers = async (pageToLoad, searchValue) => {
    const params = new URLSearchParams({
      page: String(pageToLoad),
    });

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    }

    const res = await fetch(`/api/admin/users?${params.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to load users.");
    }

    setUsers(data.data || []);
    setPagination(data.pagination);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTransition(async () => {
        try {
          await fetchUsers(1, search);
          setError("");
        } catch (fetchError) {
          setError(fetchError.message || "Failed to load users.");
        }
      });
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const goToPage = (page) => {
    startTransition(async () => {
      try {
        await fetchUsers(page, search);
        setError("");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load users.");
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-sky-400">
          User Oversight
        </p>
        <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">
          User Directory
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Search and inspect user activity, progress, and role data without exposing these controls to normal learners.
        </p>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, or university..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/40"
            />
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-300">
            {pagination.total} users
          </div>
        </div>

        {error ? <p className="mb-4 text-sm font-semibold text-rose-400">{error}</p> : null}

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-black/20">
              <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">University</th>
                <th className="px-5 py-4">Attempted</th>
                <th className="px-5 py-4">Solved</th>
                <th className="px-5 py-4">Coding Solved</th>
                <th className="px-5 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="bg-white/[0.02] text-sm text-slate-300">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 uppercase">{user.role}</td>
                  <td className="px-5 py-4">{user.university}</td>
                  <td className="px-5 py-4">{user.totalAttempted}</td>
                  <td className="px-5 py-4">{user.totalCorrect}</td>
                  <td className="px-5 py-4">{user.codingSolved}</td>
                  <td className="px-5 py-4">{user.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
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
