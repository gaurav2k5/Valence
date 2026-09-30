"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check, Sparkles, User, Code, Lightbulb, Loader2, CheckCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { verifyOtpAction } from "@/app/actions/auth";

const STEPS = [
  { id: "account", label: "Account" },
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "verify", label: "Verify" },
];

const SKILL_OPTIONS = [
  "Frontend", "Backend", "Full-Stack", "Mobile", "DevOps",
  "UI/UX Design", "Product Management", "Data Science",
  "Machine Learning", "Blockchain", "Cloud Architecture",
  "Cybersecurity", "Game Dev", "AR/VR",
];

const INTEREST_OPTIONS = [
  "SaaS", "FinTech", "HealthTech", "EdTech", "AI/ML",
  "Climate Tech", "Social Impact", "Gaming", "E-Commerce",
  "Developer Tools", "Open Source", "Web3", "Robotics", "Biotech",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export function SignUpForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // Can remove later if no password
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSocialAuth = async (provider: string) => {
    setSocialLoading(provider);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleLaunch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send code");
      goNext();
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await verifyOtpAction({
        email,
        otp: otp.join(""),
        name,
        role,
        bio,
        skills: JSON.stringify(selectedSkills),
        interests: JSON.stringify(selectedInterests),
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      
      // If success, the Server Action throws a redirect, so this code might not run.
      // But just in case:
      if (res?.success) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      // Don't catch Next.js redirects!
      if (err.message && err.message.includes("NEXT_REDIRECT")) {
        throw err;
      }
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="w-full lg:w-[50%] min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px]"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
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

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-500 ${
                    idx < step
                      ? "bg-white text-black"
                      : idx === step
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-white/[0.04] text-white/30 border border-white/[0.08]"
                  }`}
                >
                  {idx < step ? <Check size={12} strokeWidth={2.5} /> : idx + 1}
                </div>
                <span
                  className={`text-[12px] hidden sm:block transition-colors duration-300 ${
                    idx <= step ? "text-white/70" : "text-white/25"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-8 h-px transition-colors duration-500 ${
                    idx < step ? "bg-white/30" : "bg-white/[0.08]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="relative min-h-[380px]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="account"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <User size={20} className="text-white/50" />
                  <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white">
                    Create your account
                  </h1>
                </div>
                <p className="text-[14px] text-white/40 mb-8 pl-8">
                  Start finding your perfect team in minutes.
                </p>

                {/* Social Signup */}
                <div className="flex gap-3 mb-7">
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
                </div>

                <div className="flex items-center gap-4 mb-7">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[11px] text-white/25 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="signup-name" className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      Full name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-[48px] px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      Email address
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-[48px] px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="signup-password" className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full h-[48px] px-4 pr-12 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 bottom-3.5 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="profile"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Code size={20} className="text-white/50" />
                  <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white">
                    Tell us about you
                  </h1>
                </div>
                <p className="text-[14px] text-white/40 mb-8 pl-8">
                  This helps us find your ideal collaborators.
                </p>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="signup-role" className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      What describes you best?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Developer", "Designer", "Product Manager", "Founder"].map(
                        (r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`h-[46px] rounded-xl text-[13px] font-medium transition-all duration-300 border ${
                              role === r
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                : "bg-white/[0.03] text-white/50 border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06]"
                            }`}
                          >
                            {r}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-bio" className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      Short bio
                    </label>
                    <textarea
                      id="signup-bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="What are you building or looking to build?"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300 resize-none"
                    />
                    <p className="mt-1 text-[11px] text-white/25">{bio.length}/200</p>
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/50 mb-2 uppercase tracking-wider">
                      Portfolio / GitHub URL <span className="text-white/20">(optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/you"
                      className="w-full h-[48px] px-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="skills"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb size={20} className="text-white/50" />
                  <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em] text-white">
                    Your superpowers
                  </h1>
                </div>
                <p className="text-[14px] text-white/40 mb-7 pl-8">
                  Pick skills and interests to find compatible teammates.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[12px] text-white/50 mb-3 uppercase tracking-wider">
                      Skills <span className="text-white/25">— select up to 5</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_OPTIONS.map((skill) => {
                        const selected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            disabled={!selected && selectedSkills.length >= 5}
                            className={`px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 border ${
                              selected
                                ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                                : "bg-white/[0.03] text-white/50 border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                            }`}
                          >
                            {selected && <Check size={11} className="inline mr-1.5 -mt-0.5" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/50 mb-3 uppercase tracking-wider">
                      Interests <span className="text-white/25">— select up to 4</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((interest) => {
                        const selected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            disabled={!selected && selectedInterests.length >= 4}
                            className={`px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 border ${
                              selected
                                ? "bg-white/10 text-white border-white/30"
                                : "bg-white/[0.03] text-white/50 border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
                            }`}
                          >
                            {selected && <Check size={11} className="inline mr-1.5 -mt-0.5" />}
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-verify"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="text-white/40" size={16} />
                    <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-white leading-tight">
                      Check your email
                    </h1>
                  </div>
                  <p className="text-[14px] text-white/40 mb-8 pl-6">
                    We've sent a 6-digit code to <span className="text-white/80 font-medium">{email}</span>
                  </p>

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
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <motion.button
              type="button"
              onClick={goBack}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="h-[50px] px-6 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-[14px] flex items-center gap-2 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={step === STEPS.length - 1 ? handleVerify : step === STEPS.length - 2 ? handleLaunch : goNext}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="flex-1 h-[50px] rounded-xl bg-white text-black font-medium text-[14px] flex items-center justify-center gap-2 group hover:bg-white/90 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.06)] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : step === STEPS.length - 1 ? (
              <>
                Verify Code
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            ) : step === STEPS.length - 2 ? (
              <>
                <Sparkles size={16} />
                Launch Profile
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </motion.button>
        </div>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-[13px] text-white/40">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
          >
            Sign in
          </Link>
        </p>

        {/* Terms */}
        <p className="mt-5 text-center text-[11px] text-white/20 leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link href="#" className="underline hover:text-white/40 transition-colors">Terms</Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-white/40 transition-colors">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
