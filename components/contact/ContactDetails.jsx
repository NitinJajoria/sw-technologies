import { Mail, Phone, MapPin, Clock } from "lucide-react";

const details = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@swtech.dev",
    href: "mailto:hello@swtech.dev",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Find Us",
    value: "Delhi, India",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat, 10AM–7PM IST",
    href: null,
  },
];

export default function ContactDetails() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-white mb-6">
        Get in Touch
      </h2>
      {details.map(({ icon: Icon, label, value, href }) => (
        <div
          key={label}
          className="flex items-start gap-4 p-4 bg-dark-card border border-dark-border rounded-xl hover:border-brand-500/30 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center text-brand-400 shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-white/80 text-xs mb-0.5">{label}</p>
            {href ? (
              <a
                href={href}
                className="text-white text-sm font-medium hover:text-brand-400 transition-colors"
              >
                {value}
              </a>
            ) : (
              <p className="text-white text-sm font-medium">{value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
