"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = () => {
      start += Math.ceil(target / 60);
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white relative inline-block"
    >
      {count}
      {suffix}
      <span className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full scale-110 -z-10" />
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map(({ value, suffix, label }, i) => (
            <AnimatedSection key={label} delay={i * 0.1}>
              <div className="text-center bg-[#151921]/40 backdrop-blur-sm border border-white/5 rounded-[32px] sm:rounded-[40px] py-8 sm:py-12 px-4 sm:px-6 hover:border-brand-500/30 hover:-translate-y-2 transition-all duration-500 group">
                <CountUp target={value} suffix={suffix} />
                <p className="text-white/40 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 font-medium uppercase tracking-widest group-hover:text-white/60 transition-colors">
                  {label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
