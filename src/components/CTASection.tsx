"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full px-6 md:px-12 xl:px-24 py-32">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent" />
          <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />

          {/* Glowing orb accent */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              <span className="text-[11px] text-white/50 uppercase tracking-widest">
                Early access open
              </span>
            </motion.div>

            <h2 className="text-[32px] md:text-[40px] lg:text-[52px] font-semibold tracking-[-0.03em] text-white leading-[1.1] mb-6 max-w-[600px] mx-auto">
              Ready to find your people?
            </h2>

            <p className="text-[15px] md:text-[16px] text-white/40 leading-relaxed max-w-[460px] mx-auto mb-10">
              Join thousands of builders already forming incredible teams through Valence. Your next co-founder is one click away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-black font-medium text-[14px] hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.08)] group"
                >
                  Get Started Free
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent text-white/60 font-medium text-[14px] hover:text-white/80 border border-white/[0.08] hover:border-white/[0.15] transition-all"
                >
                  See How It Works
                </Link>
              </motion.div>
            </div>

            <p className="mt-8 text-[12px] text-white/20">
              No credit card required · Free forever for individuals
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
