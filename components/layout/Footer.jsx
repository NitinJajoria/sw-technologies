"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { toast } from "react-hot-toast";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Web Design", href: "/services#service-1" },
    { label: "Web Dev", href: "/services#service-2" },
    { label: "E-Commerce", href: "/services#service-3" },
    { label: "SEO & Marketing", href: "/services#service-4" },
  ],
};

const socials = [
  { icon: "/images/socialicons/twitter.png", href: "#", label: "Twitter" },
  { icon: "/images/socialicons/linkedin.png", href: "#", label: "LinkedIn" },
  { icon: "/images/socialicons/instagram.png", href: "#", label: "Instagram" },
  { icon: "/images/socialicons/facebook.png", href: "#", label: "Facebook" },
];

const contact = [
  { icon: Mail, text: "hello@swtech.dev" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: MapPin, text: "Delhi, India" },
];

export default function Footer() {
  const lenis = useLenis();
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  const isAdminPage = pathname.startsWith("/admin");

  if (pathname === "/login" || pathname === "/register" || isAdminPage) return null;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.error || data.message || "Subscription failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group w-fit block mb-4">
              <span className="font-display font-bold text-2xl tracking-tight leading-none">
                <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent group-hover:from-brand-300 group-hover:to-brand-500 transition-all duration-300">
                  SW Technologies
                </span>
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Building modern digital experiences for businesses and startups.
              Fast, beautiful, results-driven.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/icon"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={icon}
                      alt={label}
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-white text-sm mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/80 text-sm hover:text-brand-400 transition-colors duration-200 relative group w-fit block"
                    >
                      {label}
                      <span className="absolute -bottom-0.5 left-0 h-px bg-brand-400 transition-all duration-300 w-0 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              Contact
            </h3>
            <ul className="space-y-3 mb-6">
              {contact.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <Icon size={14} className="text-brand-400 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            <h3 className="font-display font-semibold text-white text-sm mb-4">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 pr-24 sm:pr-28 text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-500 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-brand-500 hover:bg-brand-600 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 rounded-full transition-colors shadow-lg shadow-brand-500/10 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm text-center sm:text-left">
            © 2026 SW Technologies. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-6 h-12 rounded-full transition-colors duration-200 shadow-lg shadow-brand-500/20 cursor-pointer"
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
