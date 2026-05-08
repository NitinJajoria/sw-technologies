"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { strengths } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function WhyChooseUs() {
  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10 sm:mb-14 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={
              <>
                Built for{" "}
                <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                  Results
                </span>
              </>
            }
            subtitle="We combine technical excellence with creative vision to deliver outcomes that actually matter to your business."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {strengths.map(({ icon, title, desc }, i) => {
            const Icon = Icons[icon] || Icons.Star;
            return (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-brand-500/30 transition-colors duration-300 group h-full">
                  <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
