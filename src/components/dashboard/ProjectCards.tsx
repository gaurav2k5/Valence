"use client";

import { motion } from "framer-motion";
import { Users, Code, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: "p1",
    name: "FieldSync",
    description: "Real-time field service management for enterprise teams. Scheduling, dispatch, and analytics.",
    tags: ["React", "Node.js", "PostgreSQL"],
    category: "SaaS",
    teamSize: 4,
    teamFilled: 2,
    compatibility: 96,
  },
  {
    id: "p2",
    name: "GreenLoop",
    description: "Carbon footprint tracker for supply chains. ML-powered predictions and reporting.",
    tags: ["Python", "TensorFlow", "Next.js"],
    category: "Climate Tech",
    teamSize: 5,
    teamFilled: 3,
    compatibility: 91,
  },
  {
    id: "p3",
    name: "Kindra",
    description: "Mental health platform connecting therapists with patients through async video sessions.",
    tags: ["React Native", "Firebase", "WebRTC"],
    category: "HealthTech",
    teamSize: 3,
    teamFilled: 1,
    compatibility: 88,
  },
  {
    id: "p4",
    name: "Eqo",
    description: "Accessibility-first design system and component library for React applications.",
    tags: ["TypeScript", "Storybook", "A11y"],
    category: "Developer Tools",
    teamSize: 4,
    teamFilled: 2,
    compatibility: 85,
  },
  {
    id: "p5",
    name: "NexaPay",
    description: "Cross-border payment rails for African startups. Fast settlement, low fees.",
    tags: ["Rust", "Solidity", "React"],
    category: "FinTech",
    teamSize: 6,
    teamFilled: 4,
    compatibility: 82,
  },
];

export function ProjectCards() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[18px] font-semibold text-white tracking-tight">
            Recommended Projects
          </h2>
          <p className="text-[13px] text-white/30 mt-0.5">
            Based on your skills and interests
          </p>
        </div>
        <Link href="/dashboard/discover" className="text-[12px] text-white/40 hover:text-white/60 transition-colors flex items-center gap-1.5">
          View all
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {projects.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-shrink-0 w-[280px] group"
          >
            <Link 
              href={`/dashboard/project/${project.id}`} 
              className="block h-full p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white mt-0.5">
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-[12px] font-bold text-white/70">
                    {project.compatibility}%
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-white/35 leading-relaxed mb-4 flex-1 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Team Size */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-[12px] text-white/30">
                  <Users size={14} strokeWidth={1.5} />
                  <span>
                    {project.teamFilled}/{project.teamSize} members
                  </span>
                </div>
                <div className="flex -space-x-1.5">
                  {Array.from({ length: project.teamFilled }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-white/[0.08] border-2 border-[#0a0a0a]"
                    />
                  ))}
                  {Array.from({
                    length: project.teamSize - project.teamFilled,
                  }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] border-dashed opacity-30"
                      style={{
                        borderStyle: "dashed",
                        borderColor: "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
