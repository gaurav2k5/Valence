"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const matches = [
  {
    name: "Sarah Mitchell",
    initials: "SM",
    role: "UI/UX Designer",
    skills: ["Figma", "Prototyping", "User Research"],
    compatibility: 97,
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    role: "Backend Engineer",
    skills: ["Go", "Kubernetes", "PostgreSQL"],
    compatibility: 93,
  },
  {
    name: "Aiden Park",
    initials: "AP",
    role: "Full-Stack Developer",
    skills: ["Next.js", "Python", "AWS"],
    compatibility: 89,
  },
  {
    name: "Elena Rodriguez",
    initials: "ER",
    role: "Product Manager",
    skills: ["Strategy", "Analytics", "Agile"],
    compatibility: 86,
  },
];

function CircularProgress({
  percentage,
  size = 44,
}: {
  percentage: number;
  size?: number;
}) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white/70">
        {percentage}
      </span>
    </div>
  );
}

export function MatchSuggestions() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-semibold text-white tracking-tight">
          Your Matches
        </h2>
        <Link href="/dashboard/discover" className="text-[12px] text-white/40 hover:text-white/60 transition-colors">
          See all →
        </Link>
      </div>

      <div className="space-y-3">
        {matches.map((match, idx) => (
          <motion.div
            key={match.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-semibold text-white/50">
                {match.initials}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-white truncate">
                {match.name}
              </p>
              <p className="text-[12px] text-white/30">{match.role}</p>
              <div className="flex gap-1.5 mt-2">
                {match.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] text-white/35 bg-white/[0.04] border border-white/[0.05]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility Score */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <CircularProgress percentage={match.compatibility} />
              <Link
                href="/dashboard/messages"
                className="text-[11px] text-white/40 hover:text-white font-medium px-3 py-1 rounded-md bg-white/[0.04] hover:bg-white hover:text-black border border-white/[0.08] hover:border-white transition-all duration-300"
              >
                Connect
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
