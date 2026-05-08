"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

function ServiceCard({ title, description, image, subFeatures }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-dark-card border border-white/5 rounded-[28px] sm:rounded-[32px] overflow-hidden group hover:border-brand-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10"
    >
      <div className="flex flex-col md:flex-row min-h-[300px] sm:min-h-[400px]">
        {/* Image Section */}
        <div className="md:w-5/12 relative min-h-[200px] sm:min-h-[250px] md:min-h-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out p-3 sm:p-4 md:p-6 rounded-[32px] sm:rounded-[40px]"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-7/12 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {title}
          </h3>
          <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Subfeatures Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
            {subFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
                  <Icons.CheckCircle2 size={12} className="text-brand-400" />
                </div>
                <span className="text-white/80 text-sm md:text-base font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="bg-brand-500 hover:bg-brand-600 text-dark font-bold text-xs uppercase tracking-widest px-8 h-12 rounded-full flex items-center transition-all duration-300 shadow-xl shadow-brand-500/20 cursor-pointer"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest border-b border-white/20 hover:border-brand-500 transition-all duration-300 cursor-pointer"
            >
              Discuss Project
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceCards() {
  return (
    <section className="py-12 sm:py-16 md:py-24 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            Our Expertise
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Services that <span className="text-brand-400">Scale.</span>
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <div id={`service-${service.id}`} className="scroll-mt-24">
                <ServiceCard {...service} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
