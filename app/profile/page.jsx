"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut, Calendar } from "lucide-react";
import Image from "next/image";
import InternalPageBackground from "@/components/ui/InternalPageBackground";
import PageRevealer from "@/components/ui/PageRevealer";

export default function ProfilePage() {
  const { user, clearUser, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    router.push("/");
    router.refresh();
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageRevealer>
      <InternalPageBackground />
      <div className="min-h-screen pt-32 pb-20 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500" />
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 bg-dark-card flex items-center justify-center">
                     {user.avatar ? (
                        <Image 
                          src={user.avatar} 
                          alt={user.name} 
                          fill 
                          className="object-cover"
                        />
                     ) : (
                        <User size={48} className="text-white/20" />
                     )}
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    {user.name}
                  </h1>
                  <p className="text-white/60 flex items-center justify-center md:justify-start gap-2">
                    <Mail size={16} />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <InfoCard 
                  icon={<Shield size={20} className="text-brand-400" />}
                  label="Role"
                  value={user.role?.toUpperCase() || "USER"}
                />
                <InfoCard 
                  icon={<Calendar size={20} className="text-brand-400" />}
                  label="Member Since"
                  value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                />
              </div>

              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-medium border border-red-500/20"
                >
                  <LogOut size={18} />
                  Logout Account
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageRevealer>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="text-lg font-medium text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
