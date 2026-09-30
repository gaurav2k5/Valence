"use client";

import { motion } from "framer-motion";
import { HeroActions } from "./HeroActions";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force playback in browsers with strict autoplay policies
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <main className="w-full min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 xl:px-24 bg-black">
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-[600px] z-10"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <span className="text-[12px] font-medium tracking-[0.1em] text-white/70 uppercase">
              Product • Use Cases • Docs • Pricing
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold tracking-[-0.02em] text-white mb-6">
            Where Ideas <br />
            Become <span className="text-white/80">Reality</span>
          </h1>

          <p className="text-[15px] md:text-[16px] text-[#A0A0A0] leading-[1.6] max-w-[480px]">
            A unified platform for finding the right collaborators. Stop searching for keywords and start building with people who share your vision.
          </p>

          <HeroActions />
        </motion.div>

        {/* Right Column: Wireframe Flower Video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative w-full aspect-[4/3] flex items-center justify-center pointer-events-none"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
            style={{ 
              mixBlendMode: "screen",
              filter: "contrast(1.2)"
            }}
          >
            <source src="/flower.mp4" type="video/mp4" />
          </video>
          
          {/* Patch specifically positioned over the star logo in the video file */}
          <div className="absolute bottom-6 right-8 w-24 h-24 bg-black rounded-full blur-xl" />
        </motion.div>
        
      </div>
    </main>
  );
}
