"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/schemas";
import { useContactStore } from "@/store/useContactStore";

const contactInfo = [
  {
    icon: Mail,
    label: "EMAIL US",
    value: "hello@swtech.dev",
    href: "mailto:hello@swtech.dev",
  },
  {
    icon: Phone,
    label: "CALL US",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Clock,
    label: "WORKING HOURS",
    value: "Mon - Sat, 9am - 6pm",
    href: null,
  },
  {
    icon: MapPin,
    label: "VISIT US",
    value: "Plot 12, Tech Park, South Delhi, India",
    href: "#",
  },
];

import { toast } from "react-hot-toast";

export default function ContactSection() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const { status, message, setStatus, setMessage, reset } = useContactStore();

  const onChange = (e) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors = {};
      (result.error?.issues || []).forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thanks! We'll get back to you within 24 hours.");
        toast.success("Message sent successfully!");
        setFields({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact-form"
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] rounded-[28px] sm:rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Left Column - Info */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-14 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
                  Get in Touch
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Tell Us About Your{" "}
                  <span className="text-brand-400">Requirements.</span>
                </h2>
                <p className="text-white/60 text-sm sm:text-base mb-8 sm:mb-12 max-w-sm">
                  Ready to transform your business? Let's get you started with
                  the perfect solution tailored for your needs.
                </p>

                <div className="space-y-8">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-dark shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-brand-400 tracking-widest mb-1">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-white font-semibold hover:text-brand-400 transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-white font-semibold">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-7 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5">
              <div className="p-6 sm:p-8 md:p-14 h-full">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                    <FormGroup label="YOUR NAME" error={errors.name}>
                      <input
                        name="name"
                        value={fields.name}
                        onChange={onChange}
                        placeholder="John Doe"
                        className={inputClasses}
                      />
                    </FormGroup>
                    <FormGroup label="E-MAIL ADDRESS" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={onChange}
                        placeholder="john@company.com"
                        className={inputClasses}
                      />
                    </FormGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                    <FormGroup label="PHONE NUMBER" error={errors.phone}>
                      <input
                        name="phone"
                        value={fields.phone}
                        onChange={onChange}
                        placeholder="+91 1234567890"
                        className={inputClasses}
                      />
                    </FormGroup>
                    <FormGroup label="COMPANY NAME" error={errors.company}>
                      <input
                        name="company"
                        value={fields.company}
                        onChange={onChange}
                        placeholder="Your Business Inc."
                        className={inputClasses}
                      />
                    </FormGroup>
                  </div>

                  <FormGroup label="SUBJECT" error={errors.subject}>
                    <input
                      name="subject"
                      value={fields.subject}
                      onChange={onChange}
                      placeholder="How can we help you?"
                      className={inputClasses}
                    />
                  </FormGroup>

                  <FormGroup label="YOUR REQUIREMENTS" error={errors.message}>
                    <textarea
                      name="message"
                      value={fields.message}
                      onChange={onChange}
                      placeholder="Tell us what you're looking for..."
                      rows={4}
                      className={`${inputClasses} resize-none`}
                    />
                  </FormGroup>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-widest px-8 h-12 rounded-full transition-all duration-300 shadow-xl shadow-brand-500/20 cursor-pointer"
                    >
                      {status === "loading" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          SEND MESSAGE
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-brand-500 transition-colors">
                            <Send size={14} />
                          </div>
                        </>
                      )}
                    </button>
                    {status === "success" && (
                      <p className="mt-4 text-emerald-400 text-sm font-medium">
                        {message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormGroup({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-white/60 tracking-[0.2em]">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
    </div>
  );
}

const inputClasses =
  "w-full bg-transparent border-b border-white/10 py-2 text-white/80 placeholder-white/30 focus:outline-none focus:border-brand-500 transition-colors text-sm";
