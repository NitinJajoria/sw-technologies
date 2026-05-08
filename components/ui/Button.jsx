import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary", // 'primary' | 'ghost' | 'outline'
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20",
    ghost:
      "border border-brand-500/50 hover:bg-brand-500/10 text-brand-400 hover:text-white",
    outline:
      "border border-dark-border hover:border-brand-500/50 text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "text-sm px-4 h-8",
    md: "text-sm px-6 h-10",
    lg: "text-base px-8 h-12",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
