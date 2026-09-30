"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Users, Code, Globe, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

// Initial data hardcoded for FieldSync for prototype purposes
const projectData = {
  id: "p1",
  name: "FieldSync",
  category: "SaaS",
  stage: "Seed",
  compatibility: 96,
  oneLiner: "Real-time field service management for enterprise teams.",
  about: `Field service management is broken. Teams are using spreadsheets, WhatsApp groups, and outdated legacy software to manage millions of dollars of field operations daily. 

At FieldSync, we are building the modern operating system for field teams. Our platform provides real-time dispatching, automated scheduling, and offline-first mobile apps for technicians. 

We recently closed a $2M Seed round led by top logistics investors and are scaling our engineering team to rebuild our core dispatch engine from the ground up for high availability and real-time syncing.`,
  techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
  links: {
    website: "https://fieldsync.example.com",
    github: "github.com/fieldsync",
  },
  team: [
    { name: "Marcus Chen", role: "CEO & Co-founder", initials: "MC", type: "founder" },
    { name: "Elena Rodriguez", role: "CTO & Co-founder", initials: "ER", type: "founder" },
    { name: "David Kim", role: "Frontend Lead", initials: "DK", type: "member" },
    { name: "Maya Patel", role: "Product Designer", initials: "MP", type: "member" },
  ],
  openRoles: [
    {
      title: "Backend Engineer (Distributed Systems)",
      commitment: "Full-time",
      salary: "$120k - $160k + 0.5% - 1.0%",
      description: "Own the rebuild of our dispatch engine. You'll architect a highly available, real-time WebSocket service that handles thousands of concurrent location updates.",
      requirements: ["5+ yrs Node.js/Go", "Experience with Redis pub/sub", "PostgreSQL optimization"],
    },
    {
      title: "Product Designer (UI/UX)",
      commitment: "Full-time",
      salary: "$100k - $140k + 0.25% - 0.75%",
      description: "Lead the design of our offline-first mobile app for technicians. The app needs to be incredibly intuitive and functional in high-stress, low-connectivity environments.",
      requirements: ["Enterprise SaaS experience", "Mobile-first design", "Figma wizardry"],
    },
  ]
};

function CircularProgress({ percentage, size = 64 }: { percentage: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[16px] font-bold text-white tracking-tight leading-none">{percentage}%</span>
        <span className="text-[8px] text-white/50 uppercase font-medium mt-0.5">Match</span>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  return (
    <div className="w-full">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#000000]" />
        <div 
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.15] blur-[100px] rounded-full"
          style={{ background: "radial-gradient(ellipse at top, #ffffff, transparent 70%)" }}
        />
        {/* Film grain over background */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-10 pt-10 pb-20 max-w-[1100px] mx-auto">
        
        {/* Back navigation */}
        <Link 
          href="/dashboard/discover" 
          className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors mb-10"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Discover
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase bg-white/[0.04] border border-white/[0.08] text-white/70">
                {projectData.category}
              </span>
              <span className="px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase bg-emerald-500/[0.05] border border-emerald-500/20 text-emerald-400/80">
                {projectData.stage}
              </span>
            </div>
            <h1 className="text-[40px] md:text-[56px] font-bold text-white tracking-[-0.02em] leading-none mb-4">
              {projectData.name}
            </h1>
            <p className="text-[18px] text-white/50 max-w-[500px] leading-relaxed">
              {projectData.oneLiner}
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-4">
            <CircularProgress percentage={projectData.compatibility} />
            <button className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black text-[14px] font-medium shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Request to Join
              <ArrowUpRight size={18} strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* Main Layout Grid */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* About */}
            <section className="mb-16">
              <h2 className="text-[20px] font-semibold text-white tracking-tight mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-white/40" />
                About the Vision
              </h2>
              <div className="space-y-4 text-[15px] text-white/60 leading-relaxed font-light">
                {projectData.about.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Open Roles */}
            <section>
              <h2 className="text-[20px] font-semibold text-white tracking-tight mb-6 flex items-center gap-2">
                <Users size={20} className="text-white/40" />
                Open Roles
              </h2>
              <div className="space-y-4">
                {projectData.openRoles.map((role, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-[18px] font-semibold text-white mb-1">{role.title}</h3>
                        <div className="flex items-center gap-3 text-[13px] text-white/40">
                          <span className="flex items-center gap-1.5"><MapPin size={14} /> {role.commitment}</span>
                          <span>•</span>
                          <span className="text-emerald-400/60 font-medium">{role.salary}</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                        Apply for role
                      </button>
                    </div>

                    <p className="text-[14px] text-white/50 leading-relaxed mb-5">
                      {role.description}
                    </p>

                    <div>
                      <p className="text-[11px] font-medium text-white/30 uppercase tracking-wider mb-2">Requirements</p>
                      <ul className="flex flex-wrap gap-2">
                        {role.requirements.map(req => (
                          <li key={req} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[12px] text-white/60">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>


          {/* RIGHT COLUMN: Sidebar Meta */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Current Team */}
            <section>
              <h3 className="text-[12px] font-semibold text-white/50 uppercase tracking-wider mb-5">
                Current Team ({projectData.team.length})
              </h3>
              <div className="space-y-4">
                {projectData.team.map(member => (
                  <div key={member.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                      <span className="text-[12px] font-semibold text-white/70">{member.initials}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-white leading-tight flex items-center gap-2">
                        {member.name}
                        {member.type === "founder" && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/[0.1] text-amber-500/80 tracking-wide">
                            Founder
                          </span>
                        )}
                      </p>
                      <p className="text-[12px] text-white/40 mt-0.5">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="w-full h-px bg-white/[0.06]" />

            {/* Tech Stack */}
            <section>
              <h3 className="text-[12px] font-semibold text-white/50 uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {projectData.techStack.map(tech => (
                  <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[13px] text-white/60">
                    <Code size={14} className="text-white/30" />
                    {tech}
                  </div>
                ))}
              </div>
            </section>

            <div className="w-full h-px bg-white/[0.06]" />

            {/* Links */}
            <section>
              <h3 className="text-[12px] font-semibold text-white/50 uppercase tracking-wider mb-4">
                Links
              </h3>
              <div className="space-y-3">
                <a href="#" className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-3 text-[13px] text-white/70">
                    <Globe size={16} className="text-white/40" />
                    {projectData.links.website.replace("https://", "")}
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                </a>
                <a href="#" className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-3 text-[13px] text-white/70">
                    <Code size={16} className="text-white/40" />
                    {projectData.links.github}
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                </a>
              </div>
            </section>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
