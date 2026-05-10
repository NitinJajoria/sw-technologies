"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, CheckCircle2, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import InternalPageBackground from "@/components/ui/InternalPageBackground";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const avatars = [
    "/images/profilepics/ProfilePic1.webp",
    "/images/profilepics/ProfilePic2.webp",
    "/images/profilepics/ProfilePic3.webp",
    "/images/profilepics/ProfilePic4.webp",
    "/images/profilepics/ProfilePic5.webp",
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar: selectedAvatar }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.push("/login");
      } else {
        if (data.issues) {
          // Flatten issues and show the first one or join them
          const errorMessages = Object.values(data.issues).flat();
          toast.error(errorMessages[0] || "Validation failed");
        } else {
          toast.error(data.error || "Registration failed");
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
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-[32px] overflow-hidden w-full max-w-5xl shadow-2xl flex flex-col lg:flex-row min-h-[650px]">
          {/* Left Form Side */}
          <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-[#0f172a] text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
            <p className="text-white/70 text-sm mb-8">
              Start your digital journey with us today.
            </p>

            {/* Avatar Selection */}
            <div className="mb-8 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-2 border-brand-500/30 p-1 mb-4 relative flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-brand-500/10 relative">
                  <Image
                    src={selectedAvatar}
                    alt="Selected Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-[10px] font-bold text-white/70 tracking-widest uppercase mb-4">Select your avatar</p>
              <div className="flex gap-3">
                {avatars.map((avatar, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${selectedAvatar === avatar ? "border-brand-500 scale-110" : "border-transparent opacity-40 hover:opacity-100"
                      }`}
                  >
                    <Image src={avatar} alt={`Avatar ${i + 1}`} width={40} height={40} className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-500 transition-colors text-sm"
                  required
                />
              </div>
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
                {/* Strength Indicator */}
                <div className="mt-3 flex gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength >= step
                        ? strength === 1
                          ? "bg-red-500"
                          : strength === 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        : "bg-white/10"
                        }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-white/70">
                  {strength === 0 && "Enter a strong password"}
                  {strength === 1 && "Weak - add uppercase or numbers"}
                  {strength === 2 && "Good - almost there"}
                  {strength === 3 && "Strong password"}
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm h-12 rounded-xl transition-all duration-300 flex items-center justify-center mt-2"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>
            <p className="mt-8 text-white/70 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white font-semibold hover:text-brand-400 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Right Info Side */}
          <div className="hidden lg:flex w-full lg:w-[55%] p-16 flex-col justify-start relative overflow-hidden bg-gradient-to-br from-dark to-[#040812]">
            {/* Abstract Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="relative z-10 max-w-md mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-6 leading-tight">
                Join <br />  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                  SW Technologies,
                </span> <br /> your digital<span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent"> growth partner</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-10 text-sm">
                Create an account to get project updates, track your quote requests, and stay in sync with our team.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  { title: "Track your project in real time", desc: "See progress updates, milestones, and deliverables as they happen.", icon: Zap },
                  { title: "Manage your quote requests", desc: "Submit and review proposals without a single back-and-forth email.", icon: ShieldCheck },
                  { title: "Direct line to your team", desc: "Message your dedicated point of contact anytime from your dashboard.", icon: MessageSquare },
                  { title: "Your data, fully secure", desc: "JWT-protected accounts. Your information is never shared or sold.", icon: CheckCircle2 }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0 border border-brand-500/20">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
