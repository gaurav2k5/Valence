"use client";

import { MolecularCanvas } from "./MolecularCanvas";
import { motion } from "framer-motion";

export function LoginVisual() {
  return (
    <div className="hidden lg:flex lg:w-[55%] relative bg-black overflow-hidden">
      {/* Molecular canvas animation */}
      <MolecularCanvas />

      {/* Subtle radial gradient behind molecules */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-left tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-12 right-12 z-10"
      >
        <h2 className="text-[36px] md:text-[42px] leading-[1.1] font-semibold tracking-[-0.03em] text-white/90 max-w-[400px]">
          Where ideas find their people.
        </h2>
        <p className="mt-4 text-[14px] text-white/40 max-w-[340px] leading-relaxed">
          Every great product started with the right team. Valence maps the
          chemistry between builders.
        </p>
      </motion.div>

      {/* Vertical divider line */}
      <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
