"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Link as LinkIcon,
  GitFork,
  AtSign,
  Calendar,
  Edit3,
  X,
  Check,
  Briefcase,
  Trophy,
  ExternalLink,
  Users,
  Code2,
  ChevronRight,
  Zap,
  Star,
  Rocket,
  Heart,
  Package,
} from "lucide-react";
import Link from "next/link";

/* --- Mock Data --- */

const profileData = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "AC",
  role: "Full-Stack Developer",
  location: "San Francisco, CA",
  joinDate: "September 2024",
  bio: "Passionate about building products that bridge the gap between design and engineering. I love working with early-stage teams on ambitious projects. Currently exploring AI/ML applications in developer tooling.",
  website: "alexchen.dev",
  github: "alexchen",
  twitter: "alexchendev",
  stats: {
    projects: 8,
    collaborations: 14,
    matches: 23,
    reputation: 4.9,
  },
  skills: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Next.js", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 78 },
    { name: "Figma", level: 72 },
    { name: "AWS", level: 70 },
    { name: "Docker", level: 68 },
    { name: "GraphQL", level: 65 },
  ],
  interests: [
    "AI/ML",
    "Developer Tools",
    "Open Source",
    "Climate Tech",
    "SaaS",
    "EdTech",
  ],
  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "Vercel",
      period: "2022 - Present",
      current: true,
    },
    {
      title: "Full-Stack Developer",
      company: "Stripe",
      period: "2020 - 2022",
      current: false,
    },
    {
      title: "Software Engineer",
      company: "Airbnb",
      period: "2018 - 2020",
      current: false,
    },
  ],
  projects: [
    {
      name: "NexaPay",
      role: "Lead Developer",
      tags: ["Rust", "React", "Solidity"],
      status: "Active",
    },
    {
      name: "GreenLoop",
      role: "Frontend Engineer",
      tags: ["Next.js", "Python", "TensorFlow"],
      status: "Active",
    },
    {
      name: "Kindra",
      role: "Co-Founder",
      tags: ["React Native", "Firebase"],
      status: "Completed",
    },
  ],
  achievements: [
    { label: "Early Adopter", icon: Rocket, color: "from-violet-500/20 to-fuchsia-500/20", border: "border-violet-500/20" },
    { label: "Top Collaborator", icon: Heart, color: "from-rose-500/20 to-orange-500/20", border: "border-rose-500/20" },
    { label: "5 Projects Shipped", icon: Package, color: "from-sky-500/20 to-cyan-500/20", border: "border-sky-500/20" },
    { label: "Community Star", icon: Star, color: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20" },
  ],
};

/* --- Stat Card --- */

function StatBlock({
  label,
  value,
  delay,
}: {
  label: string;
  value: string | number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center px-4 py-3"
    >
      <p className="text-[22px] font-semibold text-white tracking-tight">
        {value}
      </p>
      <p className="text-[11px] text-white/30 mt-0.5 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

/* --- Main Page --- */

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: profileData.name,
    bio: profileData.bio,
    role: profileData.role,
    location: profileData.location,
    website: profileData.website,
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1000px]">
      {/* Header / Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6 overflow-hidden"
      >
        {/* Cover gradient banner */}
        <div className="relative h-32 sm:h-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Mesh dots pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Floating orb accents */}
          <div className="absolute top-6 right-20 w-32 h-32 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-8 left-1/3 w-48 h-24 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* Profile content overlapping the banner */}
        <div className="relative px-6 sm:px-8 pb-6 sm:pb-8 -mt-12">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#111]/90 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center shadow-xl shadow-black/30">
                <span className="text-[24px] sm:text-[28px] font-bold text-white/60">
                  {profileData.avatar}
                </span>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-[3px] border-[#0a0a0a] shadow-lg shadow-emerald-500/30" />
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1 sm:pt-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.input
                        key="edit-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="text-[24px] sm:text-[28px] font-semibold text-white bg-white/[0.06] border border-white/[0.12] rounded-lg px-3 py-1 outline-none focus:border-white/[0.25] transition-colors w-full"
                      />
                    ) : (
                      <motion.h1
                        key="display-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[24px] sm:text-[28px] font-semibold text-white tracking-tight"
                      >
                        {editData.name}
                      </motion.h1>
                    )}
                  </AnimatePresence>

                  <p className="text-[13px] text-white/25 mt-0.5 font-mono">
                    {profileData.username}
                  </p>

                  {isEditing ? (
                    <input
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                      className="text-[14px] text-white/60 bg-white/[0.06] border border-white/[0.12] rounded-lg px-3 py-1 mt-2 outline-none focus:border-white/[0.25] transition-colors w-full"
                    />
                  ) : (
                    <p className="text-[14px] text-white/40 mt-1 flex items-center gap-2">
                      <Zap size={13} className="text-amber-400/60" />
                      {editData.role}
                    </p>
                  )}
                </div>

                {/* Edit / Save / Cancel */}
                <div className="flex gap-2 flex-shrink-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium text-white/40 bg-white/[0.04] border border-white/[0.08] hover:text-white/60 hover:border-white/[0.15] transition-all duration-300"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium text-black bg-white hover:bg-white/90 transition-all duration-300"
                      >
                        <Check size={14} />
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.08] hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                    >
                      <Edit3 size={14} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Meta links */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-[12px] text-white/25">
                <span className="flex items-center gap-1.5 hover:text-white/40 transition-colors">
                  <MapPin size={12} strokeWidth={1.5} />
                  {isEditing ? (
                    <input
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      className="bg-white/[0.06] border border-white/[0.1] rounded px-2 py-0.5 outline-none focus:border-white/[0.2] text-white/60 transition-colors"
                    />
                  ) : (
                    editData.location
                  )}
                </span>
                <span className="flex items-center gap-1.5 hover:text-white/40 transition-colors">
                  <LinkIcon size={12} strokeWidth={1.5} />
                  {isEditing ? (
                    <input
                      value={editData.website}
                      onChange={(e) =>
                        setEditData({ ...editData, website: e.target.value })
                      }
                      className="bg-white/[0.06] border border-white/[0.1] rounded px-2 py-0.5 outline-none focus:border-white/[0.2] text-white/60 transition-colors"
                    />
                  ) : (
                    <a href="#" className="hover:text-white/50 transition-colors">
                      {editData.website}
                    </a>
                  )}
                </span>
                <a href="#" className="flex items-center gap-1.5 hover:text-white/40 transition-colors">
                  <GitFork size={12} strokeWidth={1.5} />
                  {profileData.github}
                </a>
                <a href="#" className="flex items-center gap-1.5 hover:text-white/40 transition-colors">
                  <AtSign size={12} strokeWidth={1.5} />
                  {profileData.twitter}
                </a>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={1.5} />
                  Joined {profileData.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
                rows={3}
                className="w-full text-[14px] text-white/60 leading-relaxed bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3 outline-none focus:border-white/[0.2] resize-none transition-colors"
              />
            ) : (
              <p className="text-[14px] text-white/35 leading-[1.7]">
                {editData.bio}
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-4 divide-x divide-white/[0.06]">
            <StatBlock label="Projects" value={profileData.stats.projects} delay={0.2} />
            <StatBlock label="Collabs" value={profileData.stats.collaborations} delay={0.25} />
            <StatBlock label="Matches" value={profileData.stats.matches} delay={0.3} />
            <StatBlock label="Rating" value={profileData.stats.reputation} delay={0.35} />
          </div>
        </div>
      </motion.div>

      {/* Two-Column Grid */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex items-center gap-2 mb-5">
              <Code2 size={16} strokeWidth={1.5} className="text-white/40" />
              <h2 className="text-[16px] font-semibold text-white tracking-tight">
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, idx) => {
                // Map skill level to visual intensity
                const opacity = 0.04 + (skill.level / 100) * 0.08;
                const borderOpacity = 0.06 + (skill.level / 100) * 0.12;
                const textOpacity = 0.35 + (skill.level / 100) * 0.45;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.25 + idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative px-3.5 py-2 rounded-xl cursor-default transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      backgroundColor: `rgba(255,255,255,${opacity})`,
                      border: `1px solid rgba(255,255,255,${borderOpacity})`,
                    }}
                  >
                    <span
                      className="text-[13px] font-medium transition-colors duration-300"
                      style={{ color: `rgba(255,255,255,${textOpacity})` }}
                    >
                      {skill.name}
                    </span>
                    {/* Tiny level indicator dot */}
                    <span
                      className="ml-2 text-[10px] font-mono"
                      style={{ color: `rgba(255,255,255,${textOpacity * 0.5})` }}
                    >
                      {skill.level}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <h2 className="text-[16px] font-semibold text-white tracking-tight mb-4">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, idx) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="px-3.5 py-1.5 rounded-full text-[12px] text-white/40 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:text-white/60 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={16} strokeWidth={1.5} className="text-white/40" />
              <h2 className="text-[16px] font-semibold text-white tracking-tight">
                Achievements
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {profileData.achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative flex items-center gap-3 p-3.5 rounded-xl overflow-hidden border ${achievement.border} hover:scale-[1.02] transition-all duration-300 cursor-default`}
                  >
                    {/* Subtle gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-60`} />
                    <Icon size={18} strokeWidth={1.5} className="relative text-white/50" />
                    <span className="relative text-[12px] text-white/60 font-medium">
                      {achievement.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex items-center gap-2 mb-5">
              <Briefcase size={16} strokeWidth={1.5} className="text-white/40" />
              <h2 className="text-[16px] font-semibold text-white tracking-tight">
                Experience
              </h2>
            </div>
            <div className="space-y-0">
              {profileData.experience.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-6 pb-6 last:pb-0"
                >
                  {/* Timeline line */}
                  {idx < profileData.experience.length - 1 && (
                    <div className="absolute left-[5px] top-3 bottom-0 w-px bg-gradient-to-b from-white/[0.1] to-white/[0.03]" />
                  )}
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 transition-all ${
                      exp.current
                        ? "bg-violet-400/30 border-violet-400/60 shadow-sm shadow-violet-500/20"
                        : "bg-transparent border-white/15"
                    }`}
                  />

                  <p className="text-[14px] font-medium text-white">
                    {exp.title}
                  </p>
                  <p className="text-[13px] text-white/35 mt-0.5">
                    {exp.company}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-white/20 font-mono">{exp.period}</span>
                    {exp.current && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold text-emerald-400/80 bg-emerald-500/[0.1] border border-emerald-500/[0.15] uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users size={16} strokeWidth={1.5} className="text-white/40" />
                <h2 className="text-[16px] font-semibold text-white tracking-tight">
                  Projects
                </h2>
              </div>
              <Link
                href="/dashboard/projects"
                className="text-[12px] text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
              >
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {profileData.projects.map((project, idx) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-medium text-white">
                        {project.name}
                      </h3>
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                          project.status === "Active"
                            ? "text-emerald-400/70 bg-emerald-500/[0.08] border border-emerald-500/[0.15]"
                            : "text-white/30 bg-white/[0.04] border border-white/[0.06]"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/25 mt-0.5">
                      {project.role}
                    </p>
                    <div className="flex gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] text-white/25 bg-white/[0.03] border border-white/[0.05]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-white/10 group-hover:text-white/35 transition-colors flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
