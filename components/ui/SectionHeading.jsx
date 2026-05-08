export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}) {
  // On mobile (xs), always center. On sm+, respect the `centered` prop.
  const alignClass = centered ? "text-center" : "text-center sm:text-left";
  const subtitleMx = centered ? "mx-auto" : "mx-auto sm:mx-0";

  return (
    <div className={alignClass}>
      {eyebrow && (
        <p className="text-brand-400 text-sm font-medium uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
          light ? "text-white" : "text-gray-50"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-white/80 text-base md:text-lg leading-relaxed max-w-2xl ${subtitleMx}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
