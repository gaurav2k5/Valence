"use client";

import { motion } from "framer-motion";
import { Eye, Zap, UserPlus, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

const activities = [
  {
    icon: Eye,
    text: "Sarah Mitchell viewed your profile",
    time: "2 min ago",
    color: "text-blue-400/60",
    href: "/dashboard/profile",
  },
  {
    icon: Zap,
    text: "New project match: FieldSync",
    detail: "96% compatible",
    time: "15 min ago",
    color: "text-emerald-400/60",
    href: "/dashboard/project/p1",
  },
  {
    icon: UserPlus,
    text: "Marcus Chen sent a connection request",
    time: "1 hour ago",
    color: "text-purple-400/60",
    href: "/dashboard/messages",
  },
  {
    icon: Star,
    text: "Your project 'Kindra' was featured",
    time: "3 hours ago",
    color: "text-amber-400/60",
    href: "/dashboard/projects",
  },
  {
    icon: MessageSquare,
    text: 'Jordan Lee: "Hey, love your portfolio..."',
    time: "5 hours ago",
    color: "text-cyan-400/60",
    href: "/dashboard/messages",
  },
  {
    icon: Zap,
    text: "New project match: GreenLoop",
    detail: "91% compatible",
    time: "Yesterday",
    color: "text-emerald-400/60",
    href: "/dashboard/discover",
  },
];

export function ActivityFeed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-semibold text-white tracking-tight">
          Activity
        </h2>
        <button className="text-[12px] text-white/40 hover:text-white/60 transition-colors">
          Mark all read
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, idx) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={activity.href}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-300"
              >
                {/* Icon + Timeline */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 ${activity.color} group-hover:bg-white/[0.06] transition-colors`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </div>
                  {idx < activities.length - 1 && (
                    <div className="w-px h-4 bg-white/[0.04] mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors leading-snug">
                    {activity.text}
                    {activity.detail && (
                      <span className="text-white/30 ml-1">— {activity.detail}</span>
                    )}
                  </p>
                  <p className="text-[11px] text-white/20 mt-1">{activity.time}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
