"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Compass,
  FolderKanban,
  MessageSquare,
  UserCircle,
  Settings,
  LogOut,
  Bell,
  X,
  CheckCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Discover", href: "/dashboard/discover", icon: Compass },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 7 },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

const mockNotifications = [
  {
    id: "n1",
    type: "match",
    title: "New Match",
    body: "FieldSync is a 96% match for your profile.",
    time: "2m ago",
    read: false,
  },
  {
    id: "n2",
    type: "message",
    title: "Sarah Mitchell",
    body: "I just pushed the new mockups to Figma, take a look!",
    time: "5m ago",
    read: false,
  },
  {
    id: "n3",
    type: "project",
    title: "Project Update",
    body: "Aura project hit a new milestone — 40% complete.",
    time: "1h ago",
    read: true,
  },
  {
    id: "n4",
    type: "message",
    title: "Jordan Lee",
    body: "The deployment pipeline is ready for review.",
    time: "2h ago",
    read: true,
  },
];

export function FloatingDock() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismissNotification = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 rounded-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl">

        {/* Main Nav Items */}
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {hoveredIndex === idx && !isActive && (
                <motion.div
                  layoutId="dock-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.04]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className={`relative z-10 ${isActive ? "text-white" : "text-white/50"}`}
              />

              {item.badge && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white border-2 border-[#0a0a0a]" />
              )}

              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-semibold tracking-wide shadow-xl whitespace-nowrap pointer-events-none"
                  >
                    {item.label}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        <div className="w-px h-8 bg-white/[0.1] mx-1" />

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}
            className="relative flex items-center justify-center w-12 h-12 rounded-full text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <Bell size={20} strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-violet-400 border-2 border-[#0a0a0a]" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-4 w-80 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl origin-bottom-right overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Bell size={14} className="text-white/50" />
                    <span className="text-[13px] font-semibold text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-semibold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors">
                      <CheckCheck size={12} />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center text-white/20 text-[13px]">All caught up!</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`relative flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0 ${!n.read ? "bg-white/[0.02]" : ""}`}
                      >
                        {!n.read && (
                          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0 pl-1">
                          <p className={`text-[12px] font-semibold mb-0.5 ${n.read ? "text-white/60" : "text-white"}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2">{n.body}</p>
                          <p className="text-[10px] text-white/20 mt-1">{n.time}</p>
                        </div>
                        <button
                          onClick={() => dismissNotification(n.id)}
                          className="flex-shrink-0 text-white/20 hover:text-white/50 transition-colors mt-0.5"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings Toggle */}
        <div
          className="relative"
          onMouseEnter={() => setShowSettings(true)}
          onMouseLeave={() => setShowSettings(false)}
        >
          <Link
            href="/dashboard/settings"
            className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
              pathname === "/dashboard/settings" 
                ? "text-white bg-white/[0.08]" 
                : "text-white/50 hover:text-white"
            }`}
          >
            <Settings size={20} strokeWidth={pathname === "/dashboard/settings" ? 2 : 1.5} />
          </Link>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-4 p-2 w-48 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl origin-bottom-right"
              >
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <Settings size={16} strokeWidth={1.5} />
                  Settings
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors"
                >
                  <LogOut size={16} strokeWidth={1.5} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
