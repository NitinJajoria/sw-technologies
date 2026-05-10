"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Animation timing helpers ────────────────────────────────────────────────
const buildTimings = (duration) => {
  const lineGrow = duration * 0.15; // faster line growth
  const lineExpand = duration * 0.15; // faster line expansion
  const contentIn = duration * 0.2; // logo + text fade in (longer)
  const hold = duration * 0.3; // pause at full visibility (much longer)
  const contentOut = duration * 0.1; // logo + text + line fade out
  const panelOut = duration * 0.25; // panels split open

  const t = {
    lineStart: 0,
    contentStart: lineGrow + lineExpand,
    contentOut: lineGrow + lineExpand + contentIn + hold,
    panelStart: lineGrow + lineExpand + contentIn + hold + contentOut,
    lineGrow,
    lineExpand,
    contentIn,
    hold,
    contentOut,
    panelOut,
  };
  return t;
};

/**
 * PageRevealer
 */
const PageRevealer = ({
  children,
  duration = 4.0, // Increased default duration
  revealText = "SW Technologies",
  overlayColor = "#030712", // Dark theme
  lineColor = "#3b82f6", // Brand blue
  logoSrc = "/logo.png",
  onRevealComplete,
  showLoader = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(showLoader);

  // Re-enable scroll if animation is cut short or for some reason stuck
  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAnimating]);

  if (!showLoader) return <>{children}</>;

  const t = buildTimings(duration);

  // Keyframe arrays for the line width animation
  const lineTotalDuration =
    t.lineGrow + t.lineExpand + t.contentIn + t.hold + t.contentOut;
  const lineTimes = [
    0,
    t.lineGrow / lineTotalDuration,
    (t.lineGrow + t.lineExpand) / lineTotalDuration,
    1,
  ];

  // Keyframe arrays for content (logo + text block)
  const contentTotalDuration = t.contentIn + t.hold + t.contentOut;
  const contentTimes = [
    0,
    t.contentIn / contentTotalDuration,
    (t.contentIn + t.hold) / contentTotalDuration,
    1,
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <div
            key="revealer"
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          >
            {/* ── Top panel ── */}
            <motion.div
              style={{ backgroundColor: overlayColor }}
              className="absolute top-0 left-0 w-full h-1/2 overflow-hidden"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                delay: t.panelStart,
                duration: t.panelOut,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => {
                setIsAnimating(false);
                if (onRevealComplete) onRevealComplete();
              }}
            >
              {/* Texture on panels */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full" />
            </motion.div>

            {/* ── Bottom panel ── */}
            <motion.div
              style={{ backgroundColor: overlayColor }}
              className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden"
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{
                delay: t.panelStart,
                duration: t.panelOut,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {/* Texture on panels */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
              <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-700/15 blur-[120px] rounded-full" />
            </motion.div>

            {/* ── Horizontal line ── */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                style={{ backgroundColor: lineColor, height: "1.5px" }}
                initial={{ width: 0, opacity: 1 }}
                animate={{
                  width: ["0px", "180px", "100%", "100%"],
                  opacity: [1, 1, 1, 0],
                }}
                transition={{
                  duration: lineTotalDuration,
                  times: lineTimes,
                  ease: "easeInOut",
                  delay: t.lineStart,
                }}
              />
            </div>

            {/* ── Logo + Brand name (Perfectly Centered Logo) ── */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="relative flex flex-col items-center">
                {/* Logo - This defines the center point */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 1],
                    y: [10, 0, 0, 0],
                  }}
                  transition={{
                    delay: t.contentStart,
                    duration: contentTotalDuration,
                    times: contentTimes,
                    ease: "easeInOut",
                  }}
                  className="w-64 h-64 md:w-80 md:h-80 relative"
                >
                  <Image
                    src={logoSrc}
                    alt={`${revealText} logo`}
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain"
                    priority
                    loading="eager"
                  />
                </motion.div>

                {/* Brand text - Positioned absolutely below the logo to keep logo centered */}
                <motion.p
                  className="absolute top-full -mt-20 font-display text-white font-bold text-3xl md:text-5xl tracking-[0.25em] uppercase m-0 leading-none select-none whitespace-nowrap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [12, 0, 0, 0],
                  }}
                  transition={{
                    delay: t.contentStart + 0.1, // slight stagger after logo
                    duration: contentTotalDuration,
                    times: contentTimes,
                    ease: "easeInOut",
                  }}
                >
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                    {revealText}
                  </span>
                </motion.p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div
        style={{
          visibility: isAnimating ? "hidden" : "visible",
          opacity: isAnimating ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageRevealer;
