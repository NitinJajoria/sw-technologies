"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useQuoteStore } from "@/store/useQuoteStore";
import { quoteSchema } from "@/lib/schemas";
import { toast } from "react-hot-toast";

const services = [
  "Website Design",
  "Website Development",
  "E-Commerce Development",
  "SEO & Digital Marketing",
  "Other",
];

const budgets = [
  "Under ₹25K",
  "₹25K–₹50K",
  "₹50K–₹1L",
  "₹1L+",
  "Let's discuss",
];

export default function QuoteModal() {
  const { isOpen, setOpen } = useQuoteStore();
  const [status, setStatus] = useState("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    serviceRequired: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        toast.success(data.message);
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
          setFields({
            name: "",
            email: "",
            phone: "",
            serviceRequired: "",
            budget: "",
            message: "",
          });
        }, 2500);
      } else {
        setStatus("idle");
        toast.error(data.error || "Failed to submit request");
      }
    } catch (err) {
      setStatus("idle");
      toast.error("Server error");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0f172a] border border-white/10 rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
          data-lenis-prevent
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="px-4 py-4 sm:px-8 sm:py-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Request a <span className="text-brand-400">Quote</span>
            </h2>
            <p className="text-white/60 text-sm mb-8">
              Tell us about your project and we'll get back to you with a
              proposal within 48 hours.
            </p>

            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                  <Send size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-white/60">
                  We've received your requirements and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormGroup label="NAME" error={errors.name}>
                    <input
                      type="text"
                      className={inputClasses}
                      placeholder="John Doe"
                      value={fields.name}
                      onChange={(e) =>
                        setFields({ ...fields, name: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup label="EMAIL" error={errors.email}>
                    <input
                      type="email"
                      className={inputClasses}
                      placeholder="john@company.com"
                      value={fields.email}
                      onChange={(e) =>
                        setFields({ ...fields, email: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>

                <FormGroup label="PHONE NUMBER" error={errors.phone}>
                  <input
                    type="text"
                    className={inputClasses}
                    placeholder="+91 1234567890"
                    value={fields.phone}
                    onChange={(e) =>
                      setFields({ ...fields, phone: e.target.value })
                    }
                  />
                </FormGroup>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormGroup
                    label="SERVICE REQUIRED"
                    error={errors.serviceRequired}
                  >
                    <select
                      className={selectClasses}
                      value={fields.serviceRequired}
                      onChange={(e) =>
                        setFields({
                          ...fields,
                          serviceRequired: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-dark text-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="BUDGET" error={errors.budget}>
                    <select
                      className={selectClasses}
                      value={fields.budget}
                      onChange={(e) =>
                        setFields({ ...fields, budget: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select your budget
                      </option>
                      {budgets.map((b) => (
                        <option
                          key={b}
                          value={b}
                          className="bg-dark text-white"
                        >
                          {b}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>

                <FormGroup label="PROJECT DETAILS" error={errors.message}>
                  <textarea
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your requirements..."
                    value={fields.message}
                    onChange={(e) =>
                      setFields({ ...fields, message: e.target.value })
                    }
                  />
                </FormGroup>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FormGroup({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-white/60 tracking-[0.2em]">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputClasses =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500 transition-colors";
const selectClasses =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none cursor-pointer";
