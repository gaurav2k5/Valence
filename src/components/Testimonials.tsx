"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Valence matched me with a designer who understood my product vision instantly. We shipped our MVP in 6 weeks.",
    name: "Priya Sharma",
    role: "Founder, NexaHealth",
    initials: "PS",
  },
  {
    quote: "I'd been looking for a technical co-founder for months. Found one through Valence in under a week.",
    name: "Marcus Chen",
    role: "CEO, FieldSync",
    initials: "MC",
  },
  {
    quote: "The compatibility scoring is unreal. Every match felt intentional, not random. We built genuine chemistry from day one.",
    name: "Elena Rodriguez",
    role: "Lead Designer, Lumina",
    initials: "ER",
  },
  {
    quote: "As a solo developer, finding non-technical co-founders felt impossible. Valence made it natural.",
    name: "Aiden Park",
    role: "CTO, GreenLoop",
    initials: "AP",
  },
  {
    quote: "We went from strangers to shipping a product in 8 weeks. The team Valence helped me form is now my company.",
    name: "Sarah Mitchell",
    role: "Founder, Kindra",
    initials: "SM",
  },
  {
    quote: "The platform understands context. It knew I needed a backend engineer who also cared about accessibility.",
    name: "Jordan Lee",
    role: "Product Lead, Eqo",
    initials: "JL",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  initials,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 group">
      <p className="text-[14px] text-white/60 leading-relaxed mb-8 group-hover:text-white/70 transition-colors duration-500">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
          <span className="text-[12px] font-semibold text-white/50">
            {initials}
          </span>
        </div>
        <div>
          <p className="text-[13px] font-medium text-white/80">{name}</p>
          <p className="text-[12px] text-white/30">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 100]);

  return (
    <section ref={containerRef} className="w-full py-32 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] leading-[1.1] font-semibold tracking-[-0.02em] text-white max-w-[550px]">
            Teams that started on{" "}
            <span className="text-white/50">Valence.</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1: Scrolls left on scroll */}
      <motion.div
        style={{ x: x1 }}
        className="flex gap-5 mb-5 pl-6 md:pl-12"
      >
        {testimonials.slice(0, 3).map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
        {/* Duplicate for seamless feel */}
        {testimonials.slice(0, 3).map((t) => (
          <TestimonialCard key={`dup-${t.name}`} {...t} />
        ))}
      </motion.div>

      {/* Row 2: Scrolls right on scroll */}
      <motion.div
        style={{ x: x2 }}
        className="flex gap-5 pl-6 md:pl-12"
      >
        {testimonials.slice(3).map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
        {testimonials.slice(3).map((t) => (
          <TestimonialCard key={`dup-${t.name}`} {...t} />
        ))}
      </motion.div>
    </section>
  );
}
