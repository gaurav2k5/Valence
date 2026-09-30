"use client";

import { useEffect, useRef } from "react";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force playback in browsers with strict autoplay policies (like Edge)
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // Removed direct CSS filters (grayscale) which can cause black screen bugs on Edge hardware acceleration
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero-wave.mp4" type="video/mp4" />
    </video>
  );
}
