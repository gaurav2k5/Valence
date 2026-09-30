"use client";

import { MolecularCanvas } from "@/components/login/MolecularCanvas";
import { motion } from "framer-motion";

const highlights = [
  { name: "Sarah M.", role: "UI/UX Designer", quote: "Found my co-founder in 3 days.", compat: "97%" },
  { name: "Jordan L.", role: "Backend Engineer", quote: "Matched with a team that actually ships.", compat: "93%" },
  { name: "Aiden P.", role: "Full-Stack Dev", quote: "Best platform for serious builders.", compat: "89%" },
];

export function SignUpVisual() {
  return (
    <div className="hidden lg:flex lg:w-[50%] relative bg-black overflow-hidden">
      <MolecularCanvas />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Floating match cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64">
          {highlights.map((h, idx) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + idx * 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: idx === 0 ? 0 : "-8px" }}
              className={`relative flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-xl ${idx === 1 ? "ml-8" : idx === 2 ? "ml-4" : ""}`}
            >
              <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-semibold text-white/60">{h.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white/80 truncate">{h.name}</p>
                <p className="text-[10px] text-white/30 truncate">{h.role}</p>
                <p className="text-[11px] text-white/50 mt-0.5 italic">&ldquo;{h.quote}&rdquo;</p>
              </div>
              <div className="flex-shrink-0 text-center">
                <span className="text-[13px] font-bold text-white/70">{h.compat}</span>
                <p className="text-[9px] text-white/25 uppercase tracking-wider">match</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-10 left-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-white/50 uppercase tracking-widest">12,400+ builders active</span>
      </motion.div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-12 right-12 z-10"
      >
        <h2 className="text-[32px] md:text-[36px] leading-[1.1] font-semibold tracking-[-0.03em] text-white/90 max-w-[360px]">
          Every great team starts with one connection.
        </h2>
        <p className="mt-4 text-[14px] text-white/40 max-w-[320px] leading-relaxed">
          Tell us what you build, and we&apos;ll show you who to build it with.
        </p>
      </motion.div>

      {/* Vertical divider */}
      <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
