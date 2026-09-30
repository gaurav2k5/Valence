"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSocialAuth = async (provider: string) => {
    setSocialLoading(provider);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (step === "email") {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error("Failed to send code");
        setStep("otp");
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const res = await signIn("otp", {
          email,
          otp: otp.join(""),
          redirect: false,
        });

        if (res?.error) {
          throw new Error("Invalid or expired code");
        }
        
        router.push("/dashboard");
      } catch (err: any) {
        setError(err.message || "Invalid code.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full lg:w-[45%] min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px]"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
          <Image
            src="/valance logo 2.png"
            alt="VALENCE"
            width={24}
            height={24}
            className="invert brightness-0 group-hover:opacity-80 transition-opacity"
          />
          <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-white/80">
            Valence
          </span>
        </Link>

        {/* Heading */}
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-white leading-tight mb-2">
          {step === "email" ? "Welcome back" : "Check your email"}
        </h1>
        <p className="text-[14px] text-white/40 mb-10">
          {step === "email"
            ? "Sign in to continue building with your team."
            : (
              <>
                We've sent a 6-digit code to <span className="text-white/80 font-medium">{email}</span>
              </>
            )}
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
            {error}
          </div>
        )}

        {step === "email" && (
          <>
            {/* Social Login Buttons */}
        <div className="flex gap-3 mb-8">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            disabled={!!socialLoading || loading}
            className="flex-1 flex items-center justify-center gap-2.5 h-[46px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {socialLoading === "google" ? (
              <Loader2 size={16} className="animate-spin text-white/60" />
            ) : (
              <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
              {socialLoading === "google" ? "Connecting..." : "Google"}
            </span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={() => handleSocialAuth("github")}
            disabled={!!socialLoading || loading}
            className="flex-1 flex items-center justify-center gap-2.5 h-[46px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {socialLoading === "github" ? (
              <Loader2 size={16} className="animate-spin text-white/60" />
            ) : (
              <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            )}
            <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
              {socialLoading === "github" ? "Connecting..." : "GitHub"}
            </span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => handleSocialAuth("linkedin")}
            disabled={!!socialLoading || loading}
            className="flex-1 flex items-center justify-center gap-2.5 h-[46px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {socialLoading === "linkedin" ? (
              <Loader2 size={16} className="animate-spin text-white/60" />
            ) : (
              <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            )}
            <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
              {socialLoading === "linkedin" ? "Connecting..." : "LinkedIn"}
            </span>
          </button>
        </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-[12px] text-white/30 uppercase tracking-wider">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
          </>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {step === "email" ? (
            <div className="relative">
              <label
                htmlFor="login-email"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === "email" || email
                    ? "top-2 text-[10px] tracking-wider uppercase text-white/40"
                    : "top-1/2 -translate-y-1/2 text-[14px] text-white/30"
                }`}
              >
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full h-[56px] px-4 pt-5 pb-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-transparent focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-[50px] h-[60px] text-center bg-white/[0.03] border border-white/[0.08] rounded-xl text-[20px] font-medium text-white focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  Use a different email
                </button>
                <button
                  type="button"
                  onClick={() => { /* re-send logic */ }}
                  className="text-white/60 hover:text-white transition-colors font-medium"
                >
                  Resend code
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="w-full h-[50px] rounded-xl bg-white text-black font-medium text-[14px] flex items-center justify-center gap-2 group hover:bg-white/90 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.06)] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {step === "email" ? "Continue with Email" : "Verify Code"}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-[13px] text-white/40">
          New to Valence?{" "}
          <Link
            href="/signup"
            className="text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
          >
            Create an account
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-6 text-center text-[11px] text-white/20 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link href="#" className="underline hover:text-white/40 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-white/40 transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
