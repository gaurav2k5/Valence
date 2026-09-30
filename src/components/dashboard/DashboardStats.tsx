"use client";

import { motion } from "framer-motion";
import { Eye, Zap, FolderKanban, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Profile Views",
    value: "142",
    change: "+12%",
    period: "this week",
    icon: Eye,
    href: "/dashboard/profile",
    glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.05)]",
  },
  {
    label: "Match Score",
    value: "94%",
    change: "+3pts",
    period: "avg compatibility",
    icon: Zap,
    href: "/dashboard/discover",
    glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.06)]",
  },
  {
    label: "Active Projects",
    value: "3",
    change: "+1",
    period: "you're on",
    icon: FolderKanban,
    href: "/dashboard/projects",
    glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.05)]",
  },
  {
    label: "Messages",
    value: "7",
    change: "2 new",
    period: "unread",
    icon: MessageSquare,
    href: "/dashboard/messages",
    glow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.05)]",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={stat.href}
              className={`group flex flex-col p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 ${stat.glow} block`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.07] transition-colors">
                  <Icon size={16} className="text-white/50" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400/70">
                  <TrendingUp size={11} />
                  {stat.change}
                </div>
              </div>

              <p className="text-[30px] font-semibold text-white tracking-tight leading-none mb-1.5 group-hover:text-white transition-colors">
                {stat.value}
              </p>
              <p className="text-[11px] text-white/30 uppercase tracking-wider">{stat.label}</p>
              <p className="text-[11px] text-white/20 mt-0.5">{stat.period}</p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
