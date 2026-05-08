"use client";
import { useState } from "react";
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import IgniteCTA from "@/components/services/IgniteCTA";
import InternalPageBackground from "@/components/ui/InternalPageBackground";
import PageRevealer from "@/components/ui/PageRevealer";

export default function HomePage() {
  const [revealComplete, setRevealComplete] = useState(false);

  return (
    <PageRevealer onRevealComplete={() => setRevealComplete(true)}>
      <InternalPageBackground />
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials />
      <IgniteCTA />
    </PageRevealer>
  );
}
