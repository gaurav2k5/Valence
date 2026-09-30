"use client";

import { motion } from "framer-motion";
import { Plus, UserCircle } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/dashboard/project/create"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-medium hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <Plus size={15} strokeWidth={2} />
          Create Project
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-[13px] font-medium hover:text-white/80 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all"
        >
          <UserCircle size={15} strokeWidth={1.5} />
          Update Profile
        </Link>
      </motion.div>
    </div>
  );
}
