"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { DiscoverProjects } from "@/components/dashboard/discover/DiscoverProjects";
import { DiscoverPeople } from "@/components/dashboard/discover/DiscoverPeople";

type Tab = "projects" | "people";

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-6 lg:px-10 py-8 max-w-[1200px]">
      
      {/* Header & Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-white leading-tight mb-2">
              Discover
            </h1>
            <p className="text-[14px] text-white/40">
              Find your next big project or the perfect team member.
            </p>
          </div>

          {/* Custom Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] w-fit">
            {(["projects", "people"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-lg text-[13px] font-medium capitalize transition-colors duration-300 ${
                  activeTab === tab ? "text-black" : "text-white/40 hover:text-white/80"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="discover-tab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/70 transition-colors" 
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab} by name, role, skill...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/[0.15] focus:bg-white/[0.04] transition-all"
            />
          </div>
          
          <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">
            <SlidersHorizontal size={18} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      {/* Dynamic Content Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === "projects" ? (
          <DiscoverProjects searchQuery={searchQuery} />
        ) : (
          <DiscoverPeople searchQuery={searchQuery} />
        )}
      </motion.div>
      
    </div>
  );
}
