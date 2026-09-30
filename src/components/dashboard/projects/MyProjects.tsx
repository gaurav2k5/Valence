"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FolderKanban, MoreHorizontal, ArrowUpRight, Clock, Users } from "lucide-react";
import Link from "next/link";

const myProjects = [
  {
    id: "p1",
    name: "FieldSync",
    role: "Admin",
    status: "Active",
    lastUpdated: "2 hours ago",
    teamSize: 4,
    description: "Real-time field service management for enterprise teams.",
    color: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/20",
    progress: 75,
  },
  {
    id: "p7",
    name: "Aura",
    role: "Contributor",
    status: "Active",
    lastUpdated: "1 day ago",
    teamSize: 2,
    description: "A generative ambient soundscape player for deep focus.",
    color: "from-violet-500/20 to-fuchsia-500/5",
    border: "border-violet-500/20",
    progress: 40,
  },
  {
    id: "p8",
    name: "Vanguard",
    role: "Admin",
    status: "Draft",
    lastUpdated: "3 days ago",
    teamSize: 1,
    description: "Next-gen vulnerability scanner for CI/CD pipelines.",
    color: "from-amber-500/20 to-orange-500/5",
    border: "border-amber-500/20",
    progress: 15,
  },
  {
    id: "p9",
    name: "Echo Protocol",
    role: "Contributor",
    status: "Archived",
    lastUpdated: "2 months ago",
    teamSize: 5,
    description: "Decentralized messaging protocol built on Solana.",
    color: "from-white/10 to-white/5",
    border: "border-white/10",
    progress: 100,
  }
];

type Tab = "Active" | "Draft" | "Archived";

export function MyProjects() {
  const [activeTab, setActiveTab] = useState<Tab>("Active");

  const filteredProjects = myProjects.filter(p => p.status === activeTab);

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1200px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-white leading-tight mb-2 flex items-center gap-3">
            <FolderKanban className="text-white/40" size={28} />
            My Projects
          </h1>
          <p className="text-[14px] text-white/40 max-w-md">
            Manage your active ventures, drafts, and past contributions.
          </p>
        </div>

        <Link
          href="/dashboard/project/create"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus size={16} strokeWidth={2} />
          New Project
        </Link>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] w-fit mb-8"
      >
        {(["Active", "Draft", "Archived"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2 rounded-lg text-[13px] font-medium transition-colors duration-300 ${
              activeTab === tab ? "text-black" : "text-white/40 hover:text-white/80"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="projects-tab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border ${project.border} hover:border-white/[0.15] transition-all duration-500 overflow-hidden`}
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.color} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-white/[0.05] text-white/50 border border-white/[0.08]">
                        {project.role}
                      </span>
                      <h3 className="text-[18px] font-semibold text-white mt-3">
                        {project.name}
                      </h3>
                    </div>
                    <button className="text-white/30 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <p className="text-[13px] text-white/40 mb-6 flex-1 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-[11px] font-medium mb-2">
                      <span className="text-white/30 uppercase tracking-wider">Progress</span>
                      <span className="text-white/60">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                        className="h-full bg-white/40 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
                    <div className="flex items-center gap-3 text-[12px] text-white/30">
                      <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        {project.teamSize}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {project.lastUpdated}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/dashboard/project/${project.id}`}
                      className="text-[12px] font-medium text-white/50 hover:text-white flex items-center gap-1 transition-colors group-hover:translate-x-1 duration-300"
                    >
                      Open <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-4">
                <FolderKanban size={24} className="text-white/20" />
              </div>
              <h3 className="text-[16px] font-medium text-white mb-2">No {activeTab.toLowerCase()} projects</h3>
              <p className="text-[13px] text-white/40 mb-6">
                {activeTab === "Active" 
                  ? "You don't have any active projects yet." 
                  : activeTab === "Draft" 
                    ? "You don't have any drafts." 
                    : "You haven't archived any projects."}
              </p>
              {activeTab === "Active" && (
                <Link
                  href="/dashboard/project/create"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-[13px] font-medium hover:bg-white/[0.1] transition-all"
                >
                  Create a Project
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
