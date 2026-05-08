"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IgniteCTA() {
  return (
    <section className="py-12 sm:py-20 md:py-32 relative overflow-hidden bg-dark">
      {/* Background Large Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap uppercase">
          DREAM. SCALE.
        </div>
        <div className="text-[18vw] font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap uppercase">
          REPEAT.
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8 sm:space-y-12"
        >
          <h2 className="font-display font-bold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto flex flex-col gap-2">
            <span className="text-4xl sm:text-5xl md:text-8xl">
              Ready to{" "}
              <span className="bg-[#3b82f6] rounded-2xl sm:rounded-3xl text-dark px-4 py-2 sm:px-6 sm:py-3 inline-block mx-auto">
                Ignite
              </span>
            </span>
            <span className="text-2xl sm:text-3xl md:text-6xl">your next</span>
            <span className="text-4xl sm:text-5xl md:text-8xl">
              big chapter?
            </span>
          </h2>

          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
              <Link
                href="/contact"
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-dark font-bold text-sm uppercase tracking-widest px-8 sm:px-10 h-12 rounded-full inline-flex items-center justify-center transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                GET IN TOUCH
              </Link>
              <Link
                href="/services"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm uppercase tracking-widest px-8 sm:px-10 h-12 rounded-full inline-flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md w-full sm:w-auto"
              >
                VIEW SERVICES
              </Link>
            </div>

            <div className="space-y-2">
              <p className="text-white/40 text-xs font-medium tracking-[0.2em] uppercase">
                No obligation. Just momentum.
              </p>
              <p className="text-brand-400/60 text-[10px] font-bold tracking-[0.3em] uppercase">
                ⚡ Usually responds within 24 hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
    </section>
  );
}
