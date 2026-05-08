"use client";

import { motion } from "framer-motion";
import { BarChart2, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MomentumSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Built for{" "}
            <span className="border-b-4 border-brand-500 pb-1">Momentum.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Yellow Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-brand-500 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4 sm:mb-6 max-w-md">
                ONE PARTNER, EVERY SOLUTION.
              </h3>
              <p className="text-dark/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl">
                We bridge the gap between idea and exit. Tech, design,
                marketing, and capital connections all under one roof to
                eliminate the fragmentation of multiple agencies.
              </p>
              <Link
                href="/about"
                className="bg-dark text-white font-bold text-xs uppercase tracking-widest px-8 h-12 rounded-full inline-flex items-center hover:scale-105 transition-transform duration-300"
              >
                Our Full Story
              </Link>
            </div>
          </motion.div>

          {/* Speed + Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-dark-card border border-white/5 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col"
          >
            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400 mb-6 sm:mb-8">
              <Rocket size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              SPEED + QUALITY
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We execute at venture speed without compromising on the
              pixel-perfect quality your vision deserves.
            </p>
          </motion.div>

          {/* Data Driven */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-dark-card border border-white/5 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 sm:mb-8">
              <BarChart2 size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">
              DATA DRIVEN
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Decisions are backed by traction signals, user feedback, and
              market research, not just intuition.
            </p>
          </motion.div>

          {/* Founder First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 bg-dark-card border border-white/5 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 sm:gap-8 items-center"
          >
            <div className="flex-1">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider">
                FOUNDER FIRST APPROACH.
              </h3>
              <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                We don't just deliver tasks; we solve problems. Every member of
                our squad operates with co-founder level ownership.
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    "/images/avatar/avatar1.png",
                    "/images/avatar/avatar2.png",
                    "/images/avatar/avatar3.png",
                    "/images/avatar/avatar4.png",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-dark overflow-hidden bg-gray-800 relative"
                    >
                      <Image
                        src={src}
                        alt={`Founder ${i + 1}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-brand-400 font-bold text-sm">
                  5.0 Rated by Founders
                </div>
              </div>
            </div>

            {/* Abstract Grid Decor */}
            <div className="hidden md:grid grid-cols-2 gap-3 opacity-20">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg border border-white/40"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="bg-brand-500 hover:bg-brand-600 text-dark font-bold text-sm uppercase tracking-widest px-12 h-12 rounded-full inline-flex items-center transition-all duration-300 shadow-2xl shadow-brand-500/40 cursor-pointer"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
