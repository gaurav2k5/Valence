import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HeroFeatures } from "@/components/HeroFeatures";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Navbar />
      <Hero />
      <SocialProof />
      <HeroFeatures />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}
