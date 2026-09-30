"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Discover", href: "/#discover" },
  { label: "Projects", href: "/#projects" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-black/70 border-b border-white/[0.06] py-4"
            : "backdrop-blur-sm bg-black/10 border-b border-white/5"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/valance logo 2.png"
            alt="VALENCE logo"
            width={26}
            height={26}
            className="invert brightness-0 group-hover:opacity-80 transition-opacity"
          />
          <span className="text-[13px] md:text-[14px] font-medium tracking-[0.2em] uppercase text-white/90 hidden sm:block">
            Valence
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-[13px] px-5 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            Find Your Team
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 md:hidden"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[16px] text-white/60 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-5">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-[14px] text-white/60 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-black font-medium text-[14px] hover:bg-white/90 transition-colors"
              >
                Find Your Team
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
