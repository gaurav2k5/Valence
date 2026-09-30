"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    description:
      "Describe the product you're building, the problem you're solving, and what stage you're at. Our platform understands context, not just keywords.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Abstract document/form icon */}
        <div className="relative w-32 h-40">
          <div className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.02]" />
          <div className="absolute top-4 left-4 right-4 h-2 rounded-full bg-white/10" />
          <div className="absolute top-9 left-4 right-8 h-2 rounded-full bg-white/[0.06]" />
          <div className="absolute top-14 left-4 right-6 h-2 rounded-full bg-white/[0.06]" />
          <div className="absolute top-22 left-4 w-16 h-6 rounded-md border border-white/15 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
          {/* Floating cursor */}
          <motion.div
            animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-12 w-4 h-5"
          >
            <svg viewBox="0 0 16 20" fill="none" className="w-full h-full">
              <path d="M1 1L1 14L5 10L9 14L9 1L1 1Z" fill="white" fillOpacity="0.6" stroke="white" strokeOpacity="0.3" />
            </svg>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Get Matched Intelligently",
    description:
      "Valence analyzes compatibility across skills, ambition, work style, and timezone. Think of it as chemistry scoring for teams — not swiping.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Compatibility graph */}
        <div className="relative w-36 h-36">
          {/* Concentric rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/[0.06]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-white/[0.08]"
          />
          <div className="absolute inset-8 rounded-full border border-white/[0.12]" />

          {/* Orbiting dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8"
          >
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
          </motion.div>

          {/* Center core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Build & Ship Together",
    description:
      "Form your team, set milestones, and start collaborating. Valence provides the foundation — you bring the fire.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Team nodes connecting */}
        <div className="relative w-40 h-36">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 144">
            <motion.line
              x1="80" y1="20" x2="30" y2="100"
              stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="80" y1="20" x2="130" y2="100"
              stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.line
              x1="30" y1="100" x2="130" y2="100"
              stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </svg>

          {/* Top node — Lead */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <div className="w-4 h-4 rounded-full bg-white/70" />
            </div>
          </motion.div>

          {/* Bottom-left node */}
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-2 left-2"
          >
            <div className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white/50" />
            </div>
          </motion.div>

          {/* Bottom-right node */}
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-2 right-2"
          >
            <div className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-white/50" />
            </div>
          </motion.div>

          {/* Pulse ring behind center */}
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-white/20"
          />
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-6 md:px-12 xl:px-24 py-32">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] leading-[1.1] font-semibold tracking-[-0.02em] text-white max-w-[500px]">
            Three steps to your{" "}
            <span className="text-white/50">dream team.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center py-16 border-t border-white/[0.06] first:border-t-0"
            >
              {/* Left: Text */}
              <div className="lg:pr-8">
                <span className="text-[48px] lg:text-[64px] font-bold text-white/[0.04] leading-none block mb-4 group-hover:text-white/[0.08] transition-colors duration-700">
                  {step.number}
                </span>
                <h3 className="text-[22px] lg:text-[26px] font-semibold text-white mb-4 tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-[14px] lg:text-[15px] text-white/40 leading-relaxed max-w-[400px]">
                  {step.description}
                </p>
              </div>

              {/* Center: Connecting line */}
              <div className="hidden lg:flex flex-col items-center self-stretch">
                <div className="w-3 h-3 rounded-full border-2 border-white/20 bg-black group-hover:border-white/40 transition-colors duration-500" />
                <div className="flex-1 w-px bg-gradient-to-b from-white/15 to-transparent" />
              </div>

              {/* Right: Visual */}
              <div className="w-full h-48 lg:h-52 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-white/[0.1] transition-colors duration-500 overflow-hidden">
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
