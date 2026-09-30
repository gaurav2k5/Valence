"use client";

import { motion } from "framer-motion";
import { Users, Code, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  teamSize: number;
  teamFilled: number;
  seeking: string[];
  stage: string;
}

export const discoverProjectsMock: ProjectData[] = [
  {
    id: "p1",
    name: "FieldSync",
    category: "SaaS",
    description: "Real-time field service management for enterprise teams. Looking to rebuild our dispatch engine.",
    tags: ["React", "Node.js", "PostgreSQL"],
    teamSize: 4,
    teamFilled: 2,
    seeking: ["Backend Engineer", "Product Designer"],
    stage: "Seed",
  },
  {
    id: "p2",
    name: "GreenLoop",
    category: "Climate Tech",
    description: "Carbon footprint tracker for supply chains. ML-powered predictions and ESG reporting.",
    tags: ["Python", "TensorFlow", "Next.js"],
    teamSize: 5,
    teamFilled: 3,
    seeking: ["Data Scientist", "Frontend Lead"],
    stage: "Series A",
  },
  {
    id: "p3",
    name: "Kindra",
    category: "HealthTech",
    description: "Mental health platform connecting therapists with patients through async video sessions.",
    tags: ["React Native", "Firebase", "WebRTC"],
    teamSize: 3,
    teamFilled: 1,
    seeking: ["Mobile Dev", "Marketing"],
    stage: "Pre-seed",
  },
  {
    id: "p4",
    name: "Eqo",
    category: "Developer Tools",
    description: "Accessibility-first design system and component library for React applications.",
    tags: ["TypeScript", "Storybook", "A11y"],
    teamSize: 4,
    teamFilled: 2,
    seeking: ["Open Source Contributor"],
    stage: "Side Project",
  },
  {
    id: "p5",
    name: "NexaPay",
    category: "FinTech",
    description: "Cross-border payment rails for African startups. Fast settlement, low fees.",
    tags: ["Rust", "Solidity", "React"],
    teamSize: 6,
    teamFilled: 4,
    seeking: ["Smart Contract Dev", "Compliance"],
    stage: "Seed",
  },
  {
    id: "p6",
    name: "Lumina",
    category: "EdTech",
    description: "AI tutor that adapts to a student's learning pace and generates personalized curriculums.",
    tags: ["OpenAI", "Next.js", "Tailwind"],
    teamSize: 2,
    teamFilled: 1,
    seeking: ["Full-Stack Engineer"],
    stage: "MVP",
  },
];

export function DiscoverProjects({ searchQuery }: { searchQuery: string }) {
  // Client-side filtering
  const filteredProjects = discoverProjectsMock.filter((p) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some((t) => t.toLowerCase().includes(searchLower)) ||
      p.seeking.some((s) => s.toLowerCase().includes(searchLower))
    );
  });

  if (filteredProjects.length === 0) {
    return (
      <div className="py-20 text-center">
        <Code size={32} className="mx-auto text-white/20 mb-4" />
        <h3 className="text-[16px] font-medium text-white mb-2">No projects found</h3>
        <p className="text-[13px] text-white/40">Try adjusting your search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredProjects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-colors duration-500"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-wider bg-emerald-500/[0.05] px-2 py-1 rounded-md">
                {project.stage}
              </span>
              <h3 className="text-[18px] font-semibold text-white mt-3">
                {project.name}
              </h3>
            </div>
            <span className="text-[11px] text-white/30 px-2.5 py-1 rounded-full border border-white/[0.05] bg-white/[0.02]">
              {project.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-white/40 leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Seeking */}
          <div className="mb-5">
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-2">
              Seeking
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.seeking.map((role) => (
                <span
                  key={role}
                  className="px-2 py-1 rounded text-[11px] text-white/70 bg-white/[0.04] border border-white/[0.06]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Footer details */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
            <div className="flex items-center gap-1.5 text-[12px] text-white/30">
              <Users size={14} strokeWidth={1.5} />
              <span>
                {project.teamFilled}/{project.teamSize} filled
              </span>
            </div>
            <div className="flex gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[11px] text-white/30">
                  {tag}
                  {project.tags.indexOf(tag) === 0 ? " • " : ""}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-[11px] text-white/30">+{project.tags.length - 2}</span>
              )}
            </div>
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link 
              href={`/dashboard/project/${project.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-medium shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              View Project
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
