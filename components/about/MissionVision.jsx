import AnimatedSection from "@/components/ui/AnimatedSection";
import { Eye, Rocket } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Mission */}
          <AnimatedSection delay={0} className="lg:col-span-7">
            <div className="bg-gradient-to-br from-[#151921] to-[#0a0c10] border border-white/5 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 h-full hover:border-brand-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400 mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Our Mission
                </h3>
                <p className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl">
                  To empower businesses with world-class digital products that
                  are fast, beautiful, and engineered to drive measurable
                  growth.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection delay={0.1} className="lg:col-span-5">
            <div className="bg-brand-500 border border-brand-400/50 rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-500 opacity-90" />
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                  <Eye size={28} />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-4 sm:mb-6">
                  Our Vision
                </h3>
                <p className="text-dark/80 text-base sm:text-lg leading-relaxed font-medium">
                  To become the most trusted partner for brands looking to
                  dominate their market through design and technology.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
