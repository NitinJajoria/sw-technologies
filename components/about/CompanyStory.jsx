"use client";

import { motion } from "framer-motion";
import { Zap, Users, Building2, Rocket } from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "Founded as a solo studio",
    desc: "Aditya launched SW Technologies to deliver world-class digital experiences with a focus on speed and transparency.",
    icon: Zap,
  },
  {
    year: "2023",
    title: "Multidisciplinary Expansion",
    desc: "Added specialized UI/UX and SEO talent to provide full-service solutions. Served our first 20+ global clients.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Full-Service Digital Partner",
    desc: "Established partnerships across eCommerce, FinTech, and SaaS. Reputation built on 50+ successful referrals.",
    icon: Building2,
  },
  {
    year: "2025 →",
    title: "Global Scaling",
    desc: "Expanding into new markets while maintaining our core obsession with technical craft and client success.",
    icon: Rocket,
  },
];

export default function CompanyStory() {
  return (
    <section className="py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:sticky lg:top-20 space-y-8 sm:space-y-10 text-center sm:text-left">
            <div className="space-y-4 sm:space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-400 text-xs font-black uppercase tracking-[0.3em]"
              >
                Our Story
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              >
                From Freelance to <br />
                <span className="text-blue-500">Full Agency</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 sm:space-y-6 text-white/70 text-base sm:text-lg leading-relaxed max-w-xl font-light mx-auto sm:mx-0"
            >
              <p>
                SW Technologies started as a one-person studio in 2022. Our
                founder,{" "}
                <span className="text-white font-medium">Aditya Sharma</span>,
                had a simple mission: deliver high-quality web experiences
                without the bloat of large agencies.
              </p>
              <p>
                Word spread fast. Within a year, we worked with{" "}
                <span className="text-blue-400 font-medium underline decoration-blue-500/30 underline-offset-4">
                  20+ clients
                </span>{" "}
                across e-commerce, fintech, and real estate.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />

            <div className="space-y-10 sm:space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 sm:gap-8 relative"
                >
                  {/* Icon Circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 shrink-0">
                    <item.icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="pt-1 space-y-2">
                    <span className="text-blue-400 font-bold text-sm tracking-wider uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
