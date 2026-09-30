import type { Metadata } from "next";
import { SignUpForm } from "@/components/signup/SignUpForm";
import { SignUpVisual } from "@/components/signup/SignUpVisual";

export const metadata: Metadata = {
  title: "Create Account — VALENCE",
  description: "Join Valence — find the perfect co-founders, designers, and developers to build your vision.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left: Atmospheric molecular visual */}
      <SignUpVisual />

      {/* Right: Multi-step sign-up form */}
      <SignUpForm />
    </div>
  );
}
