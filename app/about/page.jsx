import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/services/PageBanner";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import StatsSection from "@/components/about/StatsSection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import TestimonialsSection from "@/components/home/Testimonials";
import IgniteCTA from "@/components/services/IgniteCTA";
import InternalPageBackground from "@/components/ui/InternalPageBackground";

export const metadata = {
  title: "About Us - SW Technologies",
  description:
    "Learn about our story, mission, and the team behind SW Technologies.",
};

export default function AboutPage() {
  return (
    <div className="relative">
      <InternalPageBackground />

      <div className="relative z-10">
        <PageBanner
          eyebrow="Our Story"
          title={
            <>
              Built on Passion, <br />{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                Driven by Results
              </span>
            </>
          }
          subtitle="We are a tight-knit team of specialists dedicated to turning your digital vision into a high-performance reality."
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
                href="/services"
                className="h-12 px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                Explore Work
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/50 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                Trusted by startups & growing businesses
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                Delivering scalable digital experiences
              </div>
            </div>
          </div>
        </PageBanner>

        <StatsSection />
        <CompanyStory />
        <ValuesSection />
        <TeamSection />
        <TestimonialsSection />
        <MissionVision />
        <IgniteCTA />
      </div>
    </div>
  );
}
