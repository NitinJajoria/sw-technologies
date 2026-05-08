"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5 mb-2">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[activeIndex];

  return (
    <section className="py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <SectionHeading
            eyebrow="Client Stories"
            title={
              <>
                Built For Leaders,{" "}
                <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                  Backed By Leaders
                </span>
              </>
            }
            subtitle="Discover how SW Technologies is helping businesses automate operations and drive significant growth."
            centered
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Sidebar - Client Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:h-full lg:justify-center">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left shrink-0 lg:shrink ${
                  activeIndex === i
                    ? "bg-brand-500/10 shadow-lg shadow-brand-500/10 border border-brand-500/50 border-l-4 border-l-brand-500 translate-x-2"
                    : "bg-dark-card border border-dark-border opacity-60 hover:opacity-100"
                }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-500/10 shrink-0 relative">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <h4
                    className={`font-semibold text-sm ${activeIndex === i ? "text-white" : "text-gray-400"}`}
                  >
                    {t.name}
                  </h4>
                  <p
                    className={`text-[10px] uppercase tracking-wider ${activeIndex === i ? "text-brand-400" : "text-white/80"}`}
                  >
                    {t.role.split(",")[1] || t.role.split(" ")[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Middle - Large Portrait */}
          <div className="lg:col-span-5 relative aspect-[4/5] max-w-md mx-auto w-full group self-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl shadow-brand-500/10"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Testimonial Content */}
          <div className="lg:col-span-4 flex flex-col lg:h-full lg:justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-brand-400 mb-6">
                  <Quote size={56} fill="currentColor" className="opacity-20" />
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-relaxed mb-6 sm:mb-8 italic">
                  "{current.quote}"
                </blockquote>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-white">
                    {current.name}
                  </h4>
                  <p className="text-brand-400 text-sm font-medium">
                    {current.role}
                  </p>
                </div>

                <StarRating rating={current.rating} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i
                        ? "w-8 bg-brand-500"
                        : "w-2 bg-dark-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
