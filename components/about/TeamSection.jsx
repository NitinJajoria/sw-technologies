import { team } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

function TeamCard({ name, role, bio, initials, linkedin, twitter, image }) {
  return (
    <div className="relative group overflow-hidden rounded-[40px] bg-[#151921]/60 border border-white/5 hover:border-brand-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col h-full">
      {/* Avatar area */}
      <div className="relative aspect-[4/5] bg-[#0a0c10] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-900/80 to-dark-border flex items-center justify-center">
            <span className="font-display text-6xl font-bold text-brand-500/20 select-none">
              {initials}
            </span>
          </div>
        )}

        {/* Social Links Over Image (Always visible on hover) */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <a
            href={linkedin}
            className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 group/social"
          >
            <div className="w-full h-full relative">
              <Image
                src="/images/socialicons/linkedin.png"
                alt="LinkedIn"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </a>
          <a
            href="#"
            className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 group/social"
          >
            <div className="w-full h-full relative">
              <Image
                src="/images/socialicons/instagram.png"
                alt="Instagram"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-8 flex flex-col flex-grow gap-3 sm:gap-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            {name}
          </h3>
          <p className="text-brand-400 text-xs font-black uppercase tracking-[0.2em] mt-1">
            {role}
          </p>
        </div>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
          {bio}
        </p>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <SectionHeading
            eyebrow="Meet the Team"
            title={
              <>
                The People Behind <br />{" "}
                <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                  the Work
                </span>
              </>
            }
            subtitle="A small, mighty team of specialists who care about craft, communication, and results."
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.12}>
              <TeamCard {...member} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
