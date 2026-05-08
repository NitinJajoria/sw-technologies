"use client";

export default function InternalPageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Background glow orbs - Exact Match to Hero */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-700/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/20 blur-3xl rounded-full pointer-events-none" />

      {/* Grid texture overlay - Exact Match to Hero */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
