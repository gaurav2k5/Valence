"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium text-[15px] hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] group justify-center"
        >
          Get Started
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <a
          href="#discover"
          className="inline-flex items-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent text-white/70 font-medium text-[15px] hover:text-white hover:bg-white/[0.04] transition-colors border border-white/[0.08] hover:border-white/[0.15] justify-center"
        >
          Explore Projects
        </a>
      </motion.div>
    </div>
  );
}

