"use client";
import { motion } from "framer-motion";
import { Code2, Target, Heart, Award } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "We build maintainable, scalable, and production-grade products at venture speed.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Goal-Driven",
    desc: "Every pixel and line of code serves a specific business purpose. No fluff, just results.",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    featured: true,
  },
  {
    icon: Heart,
    title: "Passion-Led",
    desc: "We are a tight-knit team of specialists who care deeply about craft and communication.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Award,
    title: "World-Class Excellence",
    desc: 'We don’t settle for "good enough." We aim for global standards in everything we deliver.',
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            The Principles That <span className="text-brand-400">Drive Us</span>
          </h2>
          <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto">
            Our values aren't just words on a wall; they are the framework for
            every decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 sm:p-8 md:p-10 rounded-[32px] sm:rounded-[40px] border transition-all duration-500 group relative overflow-hidden ${
                v.featured
                  ? "bg-gradient-to-br from-brand-500/20 to-brand-600/5 border-brand-500/30 shadow-2xl shadow-brand-500/10"
                  : "bg-[#151921]/60 backdrop-blur-sm border-white/5 hover:border-brand-500/20"
              }`}
            >
              {v.featured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
              )}

              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start relative z-10">
                <div
                  className={`w-16 h-16 shrink-0 ${v.bg} rounded-2xl flex items-center justify-center ${v.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                >
                  <v.icon size={32} />
                </div>
                <div className="space-y-4">
                  <h3
                    className={`font-display text-2xl font-bold ${v.featured ? "text-white" : "text-white/90"}`}
                  >
                    {v.title}
                  </h3>
                  <p
                    className={`${v.featured ? "text-white/70" : "text-white/40"} text-lg leading-relaxed group-hover:text-white/60 transition-colors`}
                  >
                    {v.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
