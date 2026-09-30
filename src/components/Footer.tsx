"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Discover", href: "/#discover" },
    { label: "Live Projects", href: "/#projects" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full px-6 md:px-12 xl:px-24 pt-20 pb-10 border-t border-white/[0.06]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/valance logo 2.png"
                alt="VALENCE"
                width={22}
                height={22}
                className="invert brightness-0"
              />
              <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-white/80">
                Valence
              </span>
            </div>
            <p className="text-[13px] text-white/30 leading-relaxed max-w-[260px] mb-8">
              Where builders find their people. Meaningful team formation, powered by compatibility.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">
                Stay in the loop
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400/80 text-[13px]">
                  <Check size={15} />
                  You&apos;re on the list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 h-[38px] px-3.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] transition-all"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center w-[38px] h-[38px] rounded-lg bg-white text-black hover:bg-white/90 transition-colors flex-shrink-0"
                  >
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/25 hover:text-white/60 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-[12px] text-white/20">
            © {new Date().getFullYear()} Valence Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* X (Twitter) */}
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors" aria-label="Twitter/X">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            {/* GitHub */}
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

