"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import InternalPageBackground from "@/components/ui/InternalPageBackground";

export default function AdminPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState("contacts");
  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/");
  }, [user, loading, router]);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const fetchData = async () => {
    if (!user || user.role !== "admin") return;
    setIsDataLoading(true);
    try {
      const r = await fetch(`/api/admin/${tab}?page=${page}&limit=${limit}`);
      const d = await r.json();
      setData(d[tab] || []);
      setTotalPages(d.totalPages || 1);
      setTotalRecords(d.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab, user, page, limit]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`/api/admin/${tab}/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully");
        fetchData();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const COLUMNS = {
    contacts: ["name", "email", "phone", "subject", "message", "createdAt", "actions"],
    users: ["avatar", "name", "email", "role", "createdAt"],
    quotes: [
      "name",
      "email",
      "phone",
      "serviceRequired",
      "budget",
      "message",
      "createdAt",
    ],
    subscribers: ["email", "subscribedAt"],
  };

  if (loading || !user || user.role !== "admin") return null;

  return (
    <div className="relative min-h-screen">
      <InternalPageBackground />
      <div className="relative z-10 px-4 pt-24 pb-12 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-white">Admin Dashboard</h1>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mb-8 border-b border-white/10 pb-6">
          {["contacts", "users", "quotes", "subscribers"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base cursor-pointer ${tab === t
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20 scale-105"
                : "text-white/60 hover:text-white bg-white/5 border border-white/5 hover:border-white/10"
                }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto bg-[#0f172a] rounded-[28px] border border-white/5 p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                {COLUMNS[tab].map((col) => (
                  <th
                    key={col}
                    className="p-4 text-xs font-bold tracking-widest uppercase text-brand-400"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isDataLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {COLUMNS[tab].map((col) => (
                      <td key={col} className="p-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                data.map((row, i) => (
                  <tr
                    key={row._id || i}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {COLUMNS[tab].map((col) => (
                      <td key={col} className="p-4 text-sm text-white/80 align-middle">
                        {col === "avatar" ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10">
                            {row[col] ? (
                              <Image
                                src={row[col]}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-brand-500/10 text-brand-400 font-bold">
                                {row.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        ) : col === "createdAt" || col === "subscribedAt" ? (
                          <span className="whitespace-nowrap">
                            {new Date(row[col]).toLocaleDateString()}
                          </span>
                        ) : col === "role" ? (
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${row[col] === "admin" ? "bg-brand-500/20 text-brand-400" : "bg-white/5 text-white/60"
                            }`}>
                            {row[col]}
                          </span>
                        ) : col === "actions" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(row._id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ) : col === "message" ? (
                          <div className="min-w-[300px] max-w-[500px] whitespace-pre-wrap break-words bg-white/5 border border-white/5 rounded-xl p-4 text-white/90 text-xs leading-relaxed">
                            {String(row[col] || "—")}
                          </div>
                        ) : (
                          <div className="max-w-[200px] truncate" title={row[col]}>
                            {String(row[col] || "")}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMNS[tab].length}
                    className="p-8 text-center text-white/40"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0f172a] border border-white/5 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>Show</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="bg-dark border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              {[10, 25, 50].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <span className="hidden sm:inline">records per page</span>
            <span className="text-white/40 ml-2">Total: {totalRecords}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isDataLoading}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => {
                  const showDots = i > 0 && p !== arr[i - 1] + 1;
                  return (
                    <div key={p} className="flex items-center gap-1">
                      {showDots && <MoreHorizontal size={16} className="text-white/20 mx-1" />}
                      <button
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${page === p
                          ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        {p}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isDataLoading}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
