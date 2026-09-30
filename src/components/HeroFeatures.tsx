"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Project Discovery",
    description: "Browse curated projects and startups looking for your exact skill set. Filter by stage, stack, and commitment level.",
    pill: "Smart Matching",
    visual: (
      <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" fill="none">
          <line x1="100" y1="60" x2="40" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="60" x2="160" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="60" x2="40" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="60" x2="160" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
        {/* Center node */}
        <div className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] z-10">
          <div className="w-5 h-5 rounded-full bg-white/70" />
        </div>
        {/* Satellite nodes */}
        {[{x:"left-8",y:"top-4"},{x:"right-8",y:"top-4"},{x:"left-8",y:"bottom-4"},{x:"right-8",y:"bottom-4"}].map((pos,i) => (
          <div key={i} className={`absolute ${pos.x} ${pos.y} w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center`}>
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Compatibility Scoring",
    description: "Our algorithm scores compatibility across skills, work style, ambition, and timezone — not just overlapping keywords.",
    pill: "AI-Powered",
    visual: (
      <div className="relative w-full h-32 flex items-center justify-center">
        <div className="relative w-24 h-24">
          {/* Concentric rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/[0.06]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full border border-white/[0.09]"
          />
          <div className="absolute inset-6 rounded-full border border-white/[0.15]" />
          {/* Orbiting dots */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          </motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} className="absolute inset-3">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />
          </motion.div>
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Team Formation",
    description: "See real-time team coverage. Identify missing roles instantly. Build balanced, high-functioning teams from day one.",
    pill: "Visual Tools",
    visual: (
      <div className="relative w-full h-32 flex items-center justify-center">
        <div className="relative w-40 h-24">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 96">
            <motion.line x1="80" y1="16" x2="24" y2="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
            <motion.line x1="80" y1="16" x2="136" y2="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
            <motion.line x1="24" y1="72" x2="136" y2="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} />
          </svg>
          {/* Nodes */}
          <motion.div animate={{ y: [0,-3,0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.06)]">
            <div className="w-3.5 h-3.5 rounded-full bg-white/70" />
          </motion.div>
          <motion.div animate={{ y: [0,3,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-0 left-3 w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/50" />
          </motion.div>
          <motion.div animate={{ y: [0,2,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-3 w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/50" />
          </motion.div>
          {/* Pulse */}
          <motion.div animate={{ scale: [1, 1.8], opacity: [0.15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-white/20" />
        </div>
      </div>
    ),
  },
];

// Mini project cards for the #projects section
const featuredProjects = [
  { name: "FieldSync", category: "SaaS", seeking: "Backend Eng", match: 96, color: "from-emerald-500/10 to-transparent" },
  { name: "GreenLoop", category: "Climate Tech", seeking: "Data Scientist", match: 91, color: "from-cyan-500/10 to-transparent" },
  { name: "Kindra", category: "HealthTech", seeking: "Mobile Dev", match: 88, color: "from-violet-500/10 to-transparent" },
  { name: "NexaPay", category: "FinTech", seeking: "Smart Contract Dev", match: 84, color: "from-amber-500/10 to-transparent" },
  { name: "Eqo", category: "Dev Tools", seeking: "Open Source Contributor", match: 81, color: "from-rose-500/10 to-transparent" },
  { name: "Lumina", category: "EdTech", seeking: "Full-Stack Engineer", match: 78, color: "from-fuchsia-500/10 to-transparent" },
];

export function HeroFeatures() {
  return (
    <>
      {/* === FEATURES SECTION === */}
      <section id="discover" className="w-full px-6 md:px-12 xl:px-24 pb-32 scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start"
          >
            {/* Left heading */}
            <div className="w-full lg:w-1/3 pt-4">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-white/30" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Platform</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[1.1] font-medium tracking-tight text-white max-w-[300px] mb-6">
                Build Teams That <span className="text-white/50">Execute.</span> Not Just Ideate.
              </h2>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white border border-white/[0.08] hover:border-white/[0.2] px-4 py-2.5 rounded-xl transition-all group"
              >
                Start for free
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right cards */}
            <div className="w-full lg:w-2/3 grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className="group bg-[#0c0c0c] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 p-6 rounded-2xl flex flex-col relative overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Pill */}
                  <span className="relative z-10 self-start px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/40 bg-white/[0.04] border border-white/[0.06] mb-4 uppercase tracking-wider">
                    {feature.pill}
                  </span>

                  {/* Visual */}
                  <div className="relative z-10 mb-4">
                    {feature.visual}
                  </div>

                  <h3 className="relative z-10 text-white font-semibold text-[15px] mb-2">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 text-[#666] text-[13px] leading-relaxed group-hover:text-white/40 transition-colors duration-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* === PROJECTS PREVIEW SECTION === */}
      <section id="projects" className="w-full px-6 md:px-12 xl:px-24 pb-32 scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-white/30" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Live Projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[1.1] font-semibold tracking-[-0.02em] text-white max-w-[420px]">
                Projects looking for builders <span className="text-white/40">like you.</span>
              </h2>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white border border-white/[0.08] hover:border-white/[0.2] px-5 py-2.5 rounded-xl transition-all group whitespace-nowrap self-start md:self-auto"
            >
              Browse all projects
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
              >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-[18px] font-semibold text-white mt-1">{project.name}</h3>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[13px] font-bold text-white/60">{project.match}%</span>
                      <span className="text-[9px] text-white/25 uppercase tracking-wider">match</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Looking for</span>
                      <span className="text-[12px] text-white/60 font-medium">{project.seeking}</span>
                    </div>
                    <Link
                      href="/signup"
                      className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white font-medium transition-colors group-hover:text-white/70"
                    >
                      Apply
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
