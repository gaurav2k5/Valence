import type { Metadata } from "next";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginVisual } from "@/components/login/LoginVisual";

export const metadata: Metadata = {
  title: "Sign In — VALENCE",
  description: "Sign in to Valence and start building your dream team.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left: Atmospheric molecular visual */}
      <LoginVisual />

      {/* Right: Login form */}
      <LoginForm />
    </div>
  );
}
