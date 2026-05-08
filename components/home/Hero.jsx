"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const words = ["Build", "Digital", "Experiences", "That", "Convert."];
const highlighted = ["Experiences"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium px-4 py-2 rounded-full mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
          Web Agency Based in Delhi, India
        </motion.div>

        {/* Headline - Two Lines */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5 sm:mb-6 tracking-tight">
          <div className="block">
            {words.slice(0, 3).map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.25em] ${
                  highlighted.includes(word)
                    ? "bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="block mt-2">
            {words.slice(3).map((word, i) => (
              <motion.span
                key={word}
                custom={i + 3}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.25em] ${
                  highlighted.includes(word)
                    ? "bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subheading - Brighter color */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2 sm:px-0"
        >
          We design and develop high-performance websites, e-commerce stores,
          and digital marketing campaigns that drive real business results.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12 mb-8 sm:mb-12"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "3+", label: "Years Experience" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-white">
                {value}
              </div>
              <div className="text-white/80 text-xs mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs - Moved below stats + rounded-full */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm px-8 h-12 rounded-full transition-all duration-200 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 cursor-pointer w-full sm:w-auto"
          >
            Start Your Project
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 border border-brand-500/40 hover:bg-brand-500/10 text-brand-400 hover:text-white font-medium text-sm px-8 h-12 rounded-full transition-all duration-200 cursor-pointer w-full sm:w-auto"
          >
            <Play size={14} className="fill-current" />
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
