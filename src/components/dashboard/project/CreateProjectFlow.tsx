"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Wand2,
  Code2,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";

/* --- Constants & Types --- */

const categories = [
  { id: "saas", label: "SaaS", icon: Layers },
  { id: "opensource", label: "Open Source", icon: Terminal },
  { id: "ai", label: "AI & ML", icon: Cpu },
  { id: "web3", label: "Web3", icon: Globe },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "devtool", label: "Developer Tool", icon: Database },
];

const techTags = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", 
  "Rust", "Go", "PostgreSQL", "MongoDB", "Redis", 
  "Tailwind CSS", "Framer Motion", "GraphQL", "Docker", "AWS"
];

const defaultRoles = [
  "Frontend Engineer", "Backend Engineer", "Full-Stack Engineer",
  "UI/UX Designer", "Product Manager", "DevOps Engineer", "Data Scientist"
];

const stages = [
  { id: "idea", label: "Just an Idea", desc: "Still brainstorming and validating." },
  { id: "mvp", label: "Building MVP", desc: "Active development, getting to v1." },
  { id: "scaling", label: "Scaling Up", desc: "Launched, looking to grow." },
];

/* --- Component --- */

export function CreateProjectFlow() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "",
    description: "",
    stage: "",
    stack: [] as string[],
    roles: [] as string[],
    customRole: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.includes(tag)
        ? prev.stack.filter((t) => t !== tag)
        : [...prev.stack, tag],
    }));
  };

  const addRole = (role: string) => {
    if (role && !formData.roles.includes(role)) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, role],
        customRole: "",
      }));
    }
  };

  const removeRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== role),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSuccess(true);
  };

  // Validation
  const canProceed = () => {
    if (step === 1) return formData.name && formData.tagline && formData.category;
    if (step === 2) return formData.description && formData.stage;
    if (step === 3) return formData.stack.length > 0;
    if (step === 4) return formData.roles.length > 0;
    return true;
  };

  /* --- Render Steps --- */

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-2">Project Name</label>
              <input
                type="text"
                placeholder="e.g. Valence"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-2">Tagline <span className="text-white/30 font-normal">— Keep it short & punchy</span></label>
              <input
                type="text"
                placeholder="e.g. The matchmaking platform for builders."
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-3">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-violet-500/10 border-violet-500/30 text-white"
                          : "bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.5} className={isSelected ? "text-violet-400" : ""} />
                      <span className="text-[12px] font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-2">Detailed Description</label>
              <textarea
                rows={5}
                placeholder="What problem does it solve? Who is it for?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-fuchsia-500/50 focus:bg-white/[0.05] transition-all resize-none"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-3">Project Stage</label>
              <div className="space-y-3">
                {stages.map((stage) => {
                  const isSelected = formData.stage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setFormData({ ...formData, stage: stage.id })}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                        isSelected
                          ? "bg-fuchsia-500/10 border-fuchsia-500/30"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div>
                        <p className={`text-[14px] font-medium ${isSelected ? "text-white" : "text-white/70"}`}>
                          {stage.label}
                        </p>
                        <p className="text-[12px] text-white/40 mt-1">{stage.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? "border-fuchsia-400" : "border-white/20"
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-4">Select Tech Stack <span className="text-white/30 font-normal">— What are you building with?</span></label>
              <div className="flex flex-wrap gap-2.5">
                {techTags.map((tag) => {
                  const isSelected = formData.stack.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 ${
                        isSelected
                          ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/30 border shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : "bg-white/[0.03] text-white/50 border border-white/[0.08] hover:bg-white/[0.06] hover:text-white/80"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Selected Tags Preview */}
            {formData.stack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-white/[0.06]"
              >
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-3">Selected ({formData.stack.length})</p>
                <div className="flex flex-wrap gap-2">
                  {formData.stack.map(tag => (
                    <span key={`sel-${tag}`} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[12px] text-white/70">
                      {tag}
                      <button onClick={() => toggleTag(tag)} className="text-white/40 hover:text-white">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-2">Who are you looking for?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 3D Animator"
                  value={formData.customRole}
                  onChange={(e) => setFormData({ ...formData, customRole: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && addRole(formData.customRole)}
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                  autoFocus
                />
                <button
                  onClick={() => addRole(formData.customRole)}
                  disabled={!formData.customRole}
                  className="px-4 bg-white/[0.05] border border-white/[0.08] text-white rounded-xl hover:bg-white/[0.1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Quick add roles */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-3">Common Roles</p>
              <div className="flex flex-wrap gap-2">
                {defaultRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => addRole(role)}
                    disabled={formData.roles.includes(role)}
                    className="px-3 py-1.5 rounded-lg text-[12px] bg-white/[0.02] border border-white/[0.06] text-white/50 hover:bg-white/[0.05] hover:text-white/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    + {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Roles */}
            {formData.roles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-white/[0.06]"
              >
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-3">Team Needed</p>
                <div className="space-y-2">
                  {formData.roles.map((role) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-emerald-400" />
                        <span className="text-[13px] font-medium text-emerald-100">{role}</span>
                      </div>
                      <button onClick={() => removeRole(role)} className="text-emerald-400/50 hover:text-emerald-400 transition-colors">
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                <Sparkles size={20} className="text-amber-400" />
              </div>
              <h3 className="text-[20px] font-semibold text-white tracking-tight">Ready to Launch</h3>
              <p className="text-[14px] text-white/50 mt-1">Review your project before posting to the community.</p>
            </div>

            {/* Summary Card */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] font-semibold text-white">{formData.name}</h4>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20">
                    {stages.find(s => s.id === formData.stage)?.label}
                  </span>
                </div>
                <p className="text-[13px] text-white/50 mt-1">{formData.tagline}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[13px] text-white/70 leading-relaxed">{formData.description}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[11px] text-white/30 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.stack.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] text-white/50 bg-white/[0.04] border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-[11px] text-white/30 uppercase tracking-wider font-semibold mb-2">Looking For</p>
                <div className="space-y-1.5">
                  {formData.roles.map(role => (
                    <div key={role} className="flex items-center gap-2 text-[12px] text-emerald-200/70 bg-emerald-500/5 px-2 py-1.5 rounded border border-emerald-500/10">
                      <Users size={12} />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  /* --- Success State --- */

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        >
          <CheckCircle2 size={32} className="text-emerald-400" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[32px] font-semibold text-white tracking-tight mb-3 text-center"
        >
          Project Launched!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[15px] text-white/50 text-center mb-10 max-w-sm"
        >
          Your project <span className="text-white font-medium">{formData.name}</span> is now live. We'll start finding the best matches for your team.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 w-full"
        >
          <Link href="/dashboard/projects" className="flex-1 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-center text-[14px] font-medium hover:bg-white/[0.08] transition-all">
            View Project
          </Link>
          <Link href="/dashboard" className="flex-1 px-5 py-3 rounded-xl bg-white text-black text-center text-[14px] font-medium hover:bg-white/90 transition-all">
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  /* --- Form Layout --- */

  const stepTitles = ["The Vision", "The Details", "The Stack", "The Team", "Review"];
  const progressPercent = ((step - 1) / 4) * 100;

  // Background gradient color maps based on step
  const getGradient = () => {
    switch (step) {
      case 1: return "from-violet-500/20 via-transparent to-transparent";
      case 2: return "from-fuchsia-500/20 via-transparent to-transparent";
      case 3: return "from-cyan-500/20 via-transparent to-transparent";
      case 4: return "from-emerald-500/20 via-transparent to-transparent";
      case 5: return "from-amber-500/20 via-transparent to-transparent";
      default: return "from-white/10 via-transparent to-transparent";
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full max-w-2xl mx-auto px-6 relative">
      
      {/* Background glow tied to the current step */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b ${getGradient()} blur-3xl opacity-50 pointer-events-none transition-colors duration-1000`} />

      <div className="w-full relative z-10 bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.02]">
          <motion.div
            className="h-full bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[12px] font-mono text-white/30 mb-2 uppercase tracking-widest">
            Step {step} of 5
          </p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-white tracking-tight">
            {stepTitles[step - 1]}
          </h2>
        </div>

        {/* Content Area with fixed min-height so buttons don't jump around */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div /> // Spacer
          )}

          {step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium bg-white text-black hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-semibold bg-amber-500 text-black hover:bg-amber-400 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Wand2 size={16} className="animate-pulse" />
                  Launching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Rocket size={16} />
                  Launch Project
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
