"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, Calendar, Shield, Package, Search } from "lucide-react";
import InternalPageBackground from "@/components/ui/InternalPageBackground";

export default function AdminPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState("contacts");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetch(`/api/admin/${tab}`)
      .then((r) => r.json())
      .then((d) => setData(d[tab] || []));
  }, [tab, user]);

  const COLUMNS = {
    contacts: ["name", "email", "phone", "subject", "message", "createdAt"],
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
              {data.map((row, i) => (
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
                      ) : (
                        <div className="max-w-[200px] truncate" title={row[col]}>
                          {String(row[col] || "")}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
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
      </div>
    </div>
  );
}
