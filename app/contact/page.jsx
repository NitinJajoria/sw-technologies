import PageBanner from "@/components/services/PageBanner";
import ContactSection from "@/components/contact/ContactSection";
import MapEmbed from "@/components/contact/MapEmbed";

export const metadata = {
  title: "Contact - SW Technologies",
  description:
    "Get in touch with SW Technologies. Get a free quote or discuss your project with our team.",
};

import InternalPageBackground from "@/components/ui/InternalPageBackground";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative">
      <InternalPageBackground />

      <div className="relative z-10">
        <PageBanner
          eyebrow="Get in Touch"
          title={
            <>
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </>
          }
          subtitle="Have a vision? We have the tools and expertise to bring it to life. Reach out today for a free consultation."
        >
          <div className="mt-10 flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#contact-form"
                className="h-12 group px-8 py-4 bg-brand-500 text-white font-bold rounded-full hover:bg-brand-600 transition-all duration-300 flex items-center gap-2"
              >
                Send a Message
                <MessageSquare
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
              </Link>
              <Link
                href="/services"
                className="h-12 px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                View Services
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/50 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                Fast response time
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                Free consultation available
              </div>
            </div>
          </div>
        </PageBanner>

        <ContactSection />

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MapEmbed />
          </div>
        </section>
      </div>
    </div>
  );
}
