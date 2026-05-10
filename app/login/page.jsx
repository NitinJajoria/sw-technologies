"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import InternalPageBackground from "@/components/ui/InternalPageBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success(data.message);
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        if (data.issues) {
          const errorMessages = Object.values(data.issues).flat();
          toast.error(errorMessages[0] || "Validation failed");
        } else {
          toast.error(data.error || "Login failed");
        }
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <InternalPageBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden w-full max-w-5xl shadow-2xl flex flex-col lg:flex-row min-h-[550px]">
          {/* Left Form Side */}
          <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-[#0f172a]">
            <h2 className="text-3xl font-bold text-white mb-2">Sign in</h2>
            <p className="text-white/50 text-sm mb-10">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 transition-colors text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm h-12 rounded-xl transition-all duration-300 flex items-center justify-center mt-4"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="mt-8 text-white/50 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-white font-semibold hover:text-brand-400 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Right Info Side */}
          <div className="hidden lg:flex w-full lg:w-[55%] p-16 flex-col justify-center relative overflow-hidden bg-gradient-to-br from-dark to-[#040812]">
            {/* Abstract Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="relative z-10 max-w-md mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Welcome to <br /> <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">SW Technologies</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-12 text-sm">
                We build fast, modern digital experiences for businesses and startups. Log in to access your client portal and track your project updates.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-[150px] h-[150px] bg-brand-500/20 blur-[50px] rounded-full pointer-events-none" />
                <p className="text-white/80 text-sm italic relative z-10 leading-relaxed mb-4">
                  "SW Technologies delivered our e-commerce platform in 3 weeks. Clean code, great communication, zero drama."
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-xs">
                    AK
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Arjun Kapoor</p>
                    <p className="text-white/40 text-[10px]">Founder · KapoorFoods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
