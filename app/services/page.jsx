import PageBanner from "@/components/services/PageBanner";
import ServiceCards from "@/components/services/ServiceCards";
import MomentumSection from "@/components/services/MomentumSection";
import IgniteCTA from "@/components/services/IgniteCTA";

export const metadata = {
  title: "Services - SW Technologies",
  description:
    "Explore our high-performance digital services designed for growth and momentum.",
};

import InternalPageBackground from "@/components/ui/InternalPageBackground";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="relative">
      <InternalPageBackground />

      <div className="relative z-10">
        <PageBanner
          eyebrow="What We Do"
          title={
            <>
              Our{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                Services
              </span>
            </>
          }
          subtitle="Comprehensive digital solutions designed to help your business grow and succeed in the modern landscape."
        >
          <div className="mt-10 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="h-12 group px-8 py-4 bg-brand-500 text-white font-bold rounded-full hover:bg-brand-600 transition-all duration-300 flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="h-12 px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/50 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                Scalable high-performance solutions
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                ROI-focused digital strategies
              </div>
            </div>
          </div>
        </PageBanner>
        <ServiceCards />
        <MomentumSection />
        <IgniteCTA />
      </div>
    </div>
  );
}
