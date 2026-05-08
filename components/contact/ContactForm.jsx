"use client";
import { useState } from "react";
import { contactSchema } from "@/lib/schemas";
import { useContactStore } from "@/store/useContactStore";
import { Send, Loader2 } from "lucide-react";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-gray-300 text-xs font-medium mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-dark border border-dark-border text-gray-100 placeholder-dark-muted text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200";

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
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
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setMessage("Thanks! We'll get back to you within 24 hours.");
    setFields({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-dark-card border border-dark-border rounded-2xl p-7"
    >
      <h2 className="font-display text-xl font-semibold text-white mb-2">
        Send Us a Message
      </h2>

      {/* Success banner */}
      {status === "success" && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
          <span>✓</span> {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name *" error={errors.name}>
          <input
            id="name"
            name="name"
            value={fields.name}
            onChange={onChange}
            placeholder="Arjun Kapoor"
            className={inputClass}
          />
        </Field>
        <Field label="Email Address *" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={onChange}
            placeholder="arjun@example.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone (optional)" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={onChange}
            placeholder="9876543210"
            className={inputClass}
          />
        </Field>
        <Field label="Subject *" error={errors.subject}>
          <input
            id="subject"
            name="subject"
            value={fields.subject}
            onChange={onChange}
            placeholder="Website redesign"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message *" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={onChange}
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <button
        type="submit"
        disabled={status === "loading"}
        id="contact-submit-btn"
        className="w-fit mx-auto flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm px-8 h-10 rounded-full transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-brand-500/20"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
