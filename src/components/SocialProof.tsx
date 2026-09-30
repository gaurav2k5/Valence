"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "12,400+", label: "Builders on Valence" },
  { value: "3,200+", label: "Projects Launched" },
  { value: "94%", label: "Team Match Satisfaction" },
  { value: "6 weeks", label: "Avg. Time to First Ship" },
];

const logos = ["Stripe", "Figma", "Notion", "Linear", "Vercel", "Arc"];

export function SocialProof() {
  return (
    <section className="w-full px-6 md:px-12 xl:px-24 pb-24">
      <div className="w-full max-w-7xl mx-auto">
        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/[0.06] rounded-2xl overflow-hidden mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center py-8 px-6 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500 text-center"
            >
              <span className="text-[32px] md:text-[38px] font-semibold text-white tracking-[-0.03em] leading-none mb-2">
                {stat.value}
              </span>
              <span className="text-[12px] text-white/30 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <p className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-8">
            Builders from teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, idx) => (
              <motion.span
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.06 }}
                className="text-[14px] font-semibold text-white/15 hover:text-white/35 transition-colors duration-500 tracking-wider"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
