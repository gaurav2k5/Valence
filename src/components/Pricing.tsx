"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring and early-stage builders.",
    cta: "Get Started",
    href: "/signup",
    features: [
      "Up to 3 project applications",
      "Basic compatibility scoring",
      "Browse project listings",
      "Community access",
      "Profile page",
    ],
    featured: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For serious builders ready to form their dream team.",
    cta: "Start Free Trial",
    href: "/signup",
    features: [
      "Unlimited project applications",
      "AI-powered compatibility scoring",
      "Priority profile placement",
      "Advanced filters & search",
      "Direct messaging",
      "Team collaboration tools",
      "Analytics dashboard",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$29",
    period: "per seat / month",
    description: "For established teams scaling their hiring process.",
    cta: "Contact Sales",
    href: "/signup",
    features: [
      "Everything in Pro",
      "Up to 10 team seats",
      "Custom branding",
      "Bulk outreach tools",
      "Priority support",
      "API access",
      "SSO / SAML",
    ],
    featured: false,
    badge: null,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full px-6 md:px-12 xl:px-24 py-32 scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-white/30" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">
              Pricing
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl lg:text-[48px] leading-[1.1] font-semibold tracking-[-0.02em] text-white max-w-[480px]">
              Simple pricing,{" "}
              <span className="text-white/50">no surprises.</span>
            </h2>
            <p className="text-[15px] text-white/40 max-w-[320px] leading-relaxed">
              Start free and scale as your team grows. No credit card required.
            </p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-500 ${
                plan.featured
                  ? "bg-white/[0.04] border-white/[0.18] shadow-[0_0_60px_rgba(255,255,255,0.04)]"
                  : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {/* Featured Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <Zap size={10} />
                  {plan.badge}
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-4">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-[40px] font-semibold text-white tracking-tight leading-none">
                    {plan.price}
                  </span>
                  <span className="text-[13px] text-white/30">{plan.period}</span>
                </div>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`flex items-center justify-center h-11 rounded-xl text-[13px] font-medium transition-all duration-300 mb-8 ${
                  plan.featured
                    ? "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]"
                }`}
              >
                {plan.cta}
              </Link>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] mb-8" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.featured ? "bg-white/20" : "bg-white/[0.06]"
                    }`}>
                      <Check size={10} className="text-white/70" strokeWidth={2.5} />
                    </div>
                    <span className="text-[13px] text-white/50 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-[12px] text-white/20 mt-10"
        >
          All plans include a 14-day free trial. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
}
