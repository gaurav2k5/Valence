"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation, PanInfo, AnimatePresence } from "framer-motion";
import { MapPin, X, Heart, Star, Sparkles } from "lucide-react";
import { discoverPeopleMock, PersonData } from "./DiscoverPeopleMock";

/* --- Circular Progress --- */
function CircularProgress({ percentage, size = 44 }: { percentage: number; size?: number }) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center group">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(16,185,129,0.8)" // Emerald green for compatibility
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-white tracking-tighter">
          {percentage}
        </span>
      </div>
      <span className="absolute -top-7 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Match Score
      </span>
    </div>
  );
}

/* --- Swipeable Card Component --- */
interface SwipeCardProps {
  person: PersonData;
  isFront: boolean;
  onSwipe: (id: string, direction: "left" | "right") => void;
  index: number;
}

function SwipeCard({ person, isFront, onSwipe, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Transforms based on drag distance
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  
  // Overlays for feedback
  const connectOpacity = useTransform(x, [10, 100], [0, 1]);
  const skipOpacity = useTransform(x, [-10, -100], [0, 1]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swiped Right
      controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } }).then(() => {
        onSwipe(person.id, "right");
      });
    } else if (info.offset.x < -threshold) {
      // Swiped Left
      controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } }).then(() => {
        onSwipe(person.id, "left");
      });
    } else {
      // Reset
      controls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full origin-bottom"
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        scale: isFront ? scale : 1 - index * 0.05,
        zIndex: 10 - index,
      }}
      animate={controls}
      initial={{ 
        scale: 1 - index * 0.05, 
        y: index * 16,
        opacity: index > 2 ? 0 : 1
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      layout
    >
      <div className="w-full h-full relative rounded-[32px] overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] cursor-grab">
        
        {/* Soft radial glow in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-b from-white/[0.08] to-transparent blur-3xl rounded-full pointer-events-none" />

        {/* Action Overlays (Connect/Skip glows) */}
        {isFront && (
          <>
            <motion.div 
              style={{ opacity: connectOpacity }} 
              className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent pointer-events-none z-20 flex items-center justify-center"
            >
              <div className="px-8 py-3 rounded-2xl border-4 border-emerald-400 text-emerald-400 text-4xl font-black uppercase tracking-widest rotate-[-15deg] bg-black/40 backdrop-blur-sm">
                Connect
              </div>
            </motion.div>
            <motion.div 
              style={{ opacity: skipOpacity }} 
              className="absolute inset-0 bg-gradient-to-tl from-rose-500/20 to-transparent pointer-events-none z-20 flex items-center justify-center"
            >
              <div className="px-8 py-3 rounded-2xl border-4 border-rose-400 text-rose-400 text-4xl font-black uppercase tracking-widest rotate-[15deg] bg-black/40 backdrop-blur-sm">
                Skip
              </div>
            </motion.div>
          </>
        )}

        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col p-8 pointer-events-none">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/[0.1] flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-[20px] font-semibold text-white/80">
                  {person.initials}
                </span>
              </div>
              <div>
                <h3 className="text-[24px] font-semibold text-white tracking-tight leading-tight">
                  {person.name}
                </h3>
                <p className="text-[14px] text-white/50 mt-1">{person.role}</p>
              </div>
            </div>
            <CircularProgress percentage={person.compatibility} />
          </div>

          {/* Details */}
          <div className="flex-1">
            <p className="text-[15px] text-white/70 leading-relaxed mb-8">
              {person.bio}
            </p>

            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mb-3">
                Top Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-[13px] text-white/80 bg-white/[0.04] border border-white/[0.08]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] mt-auto">
            <div className="flex items-center gap-1.5 text-[13px] text-white/40">
              <MapPin size={14} strokeWidth={1.5} />
              <span>{person.location}</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.03] text-[12px] text-white/50 font-medium border border-white/[0.05]">
              {person.availability}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* --- Main Component --- */

export function DiscoverPeople({ searchQuery }: { searchQuery: string }) {
  const [cards, setCards] = useState<PersonData[]>(discoverPeopleMock);
  const [superLiked, setSuperLiked] = useState<string | null>(null);

  // Client-side filtering applies to the initial deck
  useEffect(() => {
    const searchLower = searchQuery.toLowerCase();
    const filtered = discoverPeopleMock.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchLower) ||
        p.role.toLowerCase().includes(searchLower) ||
        p.bio.toLowerCase().includes(searchLower) ||
        p.skills.some((s) => s.toLowerCase().includes(searchLower))
      );
    });
    setCards(filtered);
  }, [searchQuery]);

  const handleSwipe = (id: string, direction: "left" | "right") => {
    setCards((prev) => prev.filter((p) => p.id !== id));
  };

  const manualSwipe = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    const currentCard = cards[0];
    handleSwipe(currentCard.id, direction);
  };

  const handleSuperLike = () => {
    if (cards.length === 0) return;
    const currentCard = cards[0];
    setSuperLiked(currentCard.name);
    setTimeout(() => {
      setCards((prev) => prev.filter((p) => p.id !== currentCard.id));
      setSuperLiked(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] pt-8">
      
      {/* Super Like Toast */}
      <AnimatePresence>
        {superLiked && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 backdrop-blur-xl shadow-[0_0_40px_rgba(251,191,36,0.15)]"
          >
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <span className="text-[13px] font-medium text-amber-300">Super liked {superLiked}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Deck Container */}
      <div className="relative w-full max-w-[420px] h-[520px] perspective-[1000px]">
        <AnimatePresence>
          {cards.length > 0 ? (
            cards.map((person, index) => (
              <SwipeCard
                key={person.id}
                person={person}
                index={index}
                isFront={index === 0}
                onSwipe={handleSwipe}
              />
            ))
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] border border-white/[0.06] rounded-[32px]"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full" />
                <div className="relative w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                  <Sparkles size={28} className="text-white/40" />
                </div>
              </div>
              <h3 className="text-[20px] font-semibold text-white tracking-tight mb-2">
                You're all caught up!
              </h3>
              <p className="text-[14px] text-white/40 leading-relaxed mb-8 max-w-[240px]">
                You've reviewed all potential collaborators in your area. Check back later for new matches.
              </p>
              <button 
                onClick={() => setCards(discoverPeopleMock)}
                className="px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-[13px] font-medium text-white hover:bg-white/[0.08] transition-all"
              >
                Reset Deck
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Action Buttons */}
      {cards.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 mt-10"
        >
          <button
            onClick={() => manualSwipe("left")}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.08] text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all shadow-lg hover:scale-105 active:scale-95 group"
          >
            <X size={24} strokeWidth={2.5} className="group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
          </button>
          
          <button
            onClick={handleSuperLike}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all shadow-lg hover:scale-105 active:scale-95 group"
          >
            <Star size={20} strokeWidth={2.5} className="group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:fill-amber-400 transition-all" />
          </button>

          <button
            onClick={() => manualSwipe("right")}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.08] text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all shadow-lg hover:scale-105 active:scale-95 group"
          >
            <Heart size={24} strokeWidth={2.5} className="group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
