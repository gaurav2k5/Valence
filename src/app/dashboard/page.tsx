"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ProjectCards } from "@/components/dashboard/ProjectCards";
import { MatchSuggestions } from "@/components/dashboard/MatchSuggestions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

const greetingByTime = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1200px]">
      {/* Welcome banner (dismissible) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 overflow-hidden"
          >
            <div className="relative flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.04] via-transparent to-cyan-500/[0.04] pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                  <Sparkles size={15} className="text-white/60" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white/90">Welcome to Valence, {userName} 👋</p>
                  <p className="text-[12px] text-white/40 mt-0.5">You have 4 new project matches and 7 unread messages. Start exploring!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
                <Link
                  href="/dashboard/discover"
                  className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium text-white/60 hover:text-white border border-white/[0.1] hover:border-white/[0.2] px-3 py-1.5 rounded-lg transition-all"
                >
                  Explore
                  <ArrowRight size={12} />
                </Link>
                <button onClick={() => setShowWelcome(false)} className="text-white/25 hover:text-white/60 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[13px] text-white/30 mb-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-white">
              {greetingByTime()}, {userName}
            </h1>
          </div>
          <QuickActions />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mb-10">
        <DashboardStats />
      </div>

      {/* Project Recommendations */}
      <div className="mb-10">
        <ProjectCards />
      </div>

      {/* Two Column: Matches + Activity */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <MatchSuggestions />
        <ActivityFeed />
      </div>
    </div>
  );
}
