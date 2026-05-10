"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuoteStore } from "@/store/useQuoteStore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowLeft } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearUser } = useAuthStore();
  const { setOpen: setQuoteOpen } = useQuoteStore();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 ${scrolled
        ? "bg-dark/90 backdrop-blur-md shadow-lg shadow-black/20"
        : "bg-transparent"
        }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 flex items-center justify-between relative">
          <div className="flex items-center gap-4 z-10">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors bg-white/5 border border-white/5 p-2 rounded-full hover:border-brand-500 hover:text-brand-500 hover:-translate-x-1 transition-transform cursor-pointer group"
              title="Back to Home"
            >
              <ArrowLeft size={22} className="group-hover:text-brand-500 hover:scale-110" />
            </Link>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              SW Technologies
            </span>
          </div>

          <div className="w-10" />
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-dark/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo - Mobile Only */}
              <div className="w-12 h-12 relative lg:hidden group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="SW Technologies"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              {/* Text Branding */}
              <span className="font-display font-bold text-2xl tracking-tight leading-none">
                {/* Full Text - Desktop Gradient */}
                <span className="hidden lg:block bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent group-hover:from-brand-300 group-hover:to-brand-500 transition-all duration-300">
                  SW Technologies
                </span>
              </span>
            </Link>

            {/* Desktop Nav Links (Centered) */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${pathname === link.href
                    ? "text-brand-400"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-brand-400 transition-all duration-200 ${pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA (Right) */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:bg-white/5 p-2 pr-3 rounded-full transition-colors border border-white/10 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col items-start hidden sm:flex">
                      <span className="text-xs font-medium text-white leading-tight">
                        {user.name.split(" ")[0]}
                      </span>
                      <span className="text-[10px] text-white leading-tight">
                        {user.email.split("@")[0]}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50"
                      >
                        <Link href="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors">
                          Profile
                        </Link>
                        {user.role === "admin" && (
                          <Link href="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-brand-400 hover:bg-white/5 transition-colors">
                            Admin Panel
                          </Link>
                        )}
                        <div className="h-px bg-white/10 my-1"></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-white/80 hover:text-white font-medium transition-colors mr-2"
                >
                  Get Started
                </Link>
              )}
              <button
                onClick={() => setQuoteOpen(true)}
                className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-6 h-12 rounded-full transition-colors duration-200 shadow-lg shadow-brand-500/20 cursor-pointer inline-flex items-center justify-center"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-dark-card/95 backdrop-blur-xl border-b border-dark-border shadow-2xl lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                      ? "text-brand-400 bg-brand-500/10"
                      : "text-gray-400 hover:text-white hover:bg-dark-border/50"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-3 flex flex-col gap-2"
              >
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-slate-400 font-medium">
                      Hi, {user.name}
                    </div>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="px-4 py-2 text-sm text-brand-400 hover:text-brand-300 font-medium"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-left text-sm text-slate-400 hover:text-red-400 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white font-medium"
                  >
                    Get Started
                  </Link>
                )}
                <button
                  onClick={() => {
                    setQuoteOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-5 h-10 rounded-full transition-colors cursor-pointer mt-2"
                >
                  Get a Quote
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
