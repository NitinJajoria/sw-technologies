"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function ServiceCard({ icon, title, description, image, id }) {
  const Icon = Icons[icon] || Icons.Globe;
  return (
    <Link href={`/services#service-${id}`}>
      <motion.div
        variants={cardVariants}
        className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-500/50 transition-all duration-300 cursor-pointer"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent group-hover:via-dark-card/40 transition-colors duration-300" />

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-end">
          <div className="w-10 h-10 bg-brand-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/40 transition-colors duration-300">
            <Icon size={20} />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ServicesOverview() {
  return (
    <section className="py-10 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6 mb-10 sm:mb-14">
          <div className="text-center sm:text-left">
            <SectionHeading
              eyebrow="What We Do"
              title={
                <>
                  Services That{" "}
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                    Drive Growth
                  </span>
                </>
              }
              subtitle="From pixel-perfect designs to full-stack development, we cover every digital touchpoint your business needs."
            />
          </div>
          <Link
            href="/services"
            className="shrink-0 text-brand-400 hover:text-white border border-brand-500/40 hover:bg-brand-500/10 text-sm font-medium px-6 h-12 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto lg:self-end"
          >
            View All Services <Icons.ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
