"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Link as LinkIcon,
  Save,
  Check,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  ChevronRight,
  LogOut,
  GitFork,
  AtSign,
} from "lucide-react";

type SectionId = "profile" | "notifications" | "privacy" | "appearance" | "integrations";

const sections: { id: SectionId; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "profile", label: "Profile", icon: User, desc: "Personal info & bio" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Email & push preferences" },
  { id: "privacy", label: "Privacy & Security", icon: Shield, desc: "Password & visibility" },
  { id: "appearance", label: "Appearance", icon: Palette, desc: "Theme & display" },
  { id: "integrations", label: "Integrations", icon: LinkIcon, desc: "Connected accounts" },
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${value ? "bg-white" : "bg-white/10"}`}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-4 h-4 rounded-full shadow-sm ${value ? "bg-black" : "bg-white/40"}`}
      />
    </button>
  );
}

function ProfileSection() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Alex Chen",
    username: "alexchen",
    role: "Full-Stack Developer",
    bio: "Passionate about building products that bridge the gap between design and engineering.",
    location: "San Francisco, CA",
    website: "alexchen.dev",
    email: "alex@alexchen.dev",
  });

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { label: string; key: keyof typeof form; placeholder: string; prefix?: string }[] = [
    { label: "Full Name", key: "name", placeholder: "Your name" },
    { label: "Username", key: "username", placeholder: "username", prefix: "@" },
    { label: "Primary Role", key: "role", placeholder: "e.g. Full-Stack Developer" },
    { label: "Location", key: "location", placeholder: "City, Country" },
    { label: "Website", key: "website", placeholder: "yoursite.com" },
    { label: "Email", key: "email", placeholder: "you@email.com" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center text-[24px] font-semibold text-white">
            AC
          </div>
          <button className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[11px] font-medium text-white">
            Change
          </button>
        </div>
        <div>
          <p className="text-[14px] font-medium text-white mb-1">{form.name}</p>
          <p className="text-[12px] text-white/40">@{form.username} · Member since Sep 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ label, key, placeholder, prefix }) => (
          <div key={key}>
            <label className="block text-[12px] font-medium text-white/50 mb-2 uppercase tracking-wider">
              {label}
            </label>
            <div className="relative">
              {prefix && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-white/30">
                  {prefix}
                </span>
              )}
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className={`w-full bg-white/[0.03] border border-white/[0.07] rounded-xl py-3 text-[14px] text-white outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all ${prefix ? "pl-8 pr-4" : "px-4"}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-white/50 mb-2 uppercase tracking-wider">Bio</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Tell the community who you are..."
          className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all resize-none"
        />
        <p className="text-[11px] text-white/20 mt-1 text-right">{form.bio.length} / 200</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-300 ${saved ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-white text-black hover:bg-white/90"}`}
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saved ? "Saved!" : "Save Changes"}
      </motion.button>
    </div>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    emailMatches: true,
    emailMessages: true,
    emailUpdates: false,
    pushMatches: true,
    pushMessages: true,
    pushMilestones: true,
    digestWeekly: false,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const groups: { icon: React.ElementType; title: string; items: { key: keyof typeof prefs; label: string; desc: string }[] }[] = [
    {
      icon: Mail,
      title: "Email Notifications",
      items: [
        { key: "emailMatches", label: "New project matches", desc: "When a new project fits your profile" },
        { key: "emailMessages", label: "Direct messages", desc: "When someone sends you a message" },
        { key: "emailUpdates", label: "Platform updates", desc: "News, features, and announcements" },
      ],
    },
    {
      icon: Smartphone,
      title: "Push Notifications",
      items: [
        { key: "pushMatches", label: "Match suggestions", desc: "Real-time match alerts" },
        { key: "pushMessages", label: "Messages", desc: "Incoming chat notifications" },
        { key: "pushMilestones", label: "Project milestones", desc: "Updates on projects you're part of" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {groups.map((group) => {
        const Icon = group.icon;
        return (
          <div key={group.title}>
            <div className="flex items-center gap-2 mb-5">
              <Icon size={16} className="text-white/40" />
              <h3 className="text-[14px] font-semibold text-white">{group.title}</h3>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div>
                    <p className="text-[14px] font-medium text-white/90">{item.label}</p>
                    <p className="text-[12px] text-white/30 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle value={prefs[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-white mb-1">Weekly Digest</p>
            <p className="text-[12px] text-white/40">A curated roundup of your top matches every Monday morning.</p>
          </div>
          <Toggle value={prefs.digestWeekly} onChange={() => toggle("digestWeekly")} />
        </div>
      </div>
    </div>
  );
}

function PrivacySection() {
  const [showPass, setShowPass] = useState(false);
  const [visibility, setVisibility] = useState({ skills: true, location: true, email: false });
  const [dangerOpen, setDangerOpen] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[14px] font-semibold text-white mb-5 flex items-center gap-2">
          <Lock size={16} className="text-white/40" />
          Change Password
        </h3>
        <div className="space-y-4 max-w-md">
          {["Current Password", "New Password", "Confirm Password"].map((label) => (
            <div key={label}>
              <label className="block text-[12px] font-medium text-white/50 mb-2 uppercase tracking-wider">{label}</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 transition-all pr-12"
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-[13px] font-medium hover:bg-white/90 transition-all">
            <Save size={14} />
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-white mb-5 flex items-center gap-2">
          <Eye size={16} className="text-white/40" />
          Profile Visibility
        </h3>
        <div className="space-y-1">
          {([
            { key: "skills" as const, label: "Show skills publicly" },
            { key: "location" as const, label: "Show location" },
            { key: "email" as const, label: "Show email address" },
          ]).map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
              <p className="text-[14px] text-white/80">{label}</p>
              <Toggle value={visibility[key]} onChange={(v) => setVisibility((prev) => ({ ...prev, [key]: v }))} />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06]">
        <button onClick={() => setDangerOpen(!dangerOpen)} className="flex items-center gap-2 text-red-400/70 hover:text-red-400 text-[13px] font-medium transition-colors mb-4">
          <AlertTriangle size={14} />
          Danger Zone
          <ChevronRight size={14} className={`transition-transform duration-300 ${dangerOpen ? "rotate-90" : ""}`} />
        </button>
        <AnimatePresence>
          {dangerOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-semibold text-red-300 mb-1">Delete Account</p>
                    <p className="text-[12px] text-white/30 max-w-xs">This will permanently delete your profile, projects, and all data. This action cannot be undone.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/20 transition-all flex-shrink-0 ml-4">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accent, setAccent] = useState("violet");

  const accents = [
    { id: "violet", color: "bg-violet-500" },
    { id: "cyan", color: "bg-cyan-500" },
    { id: "emerald", color: "bg-emerald-500" },
    { id: "rose", color: "bg-rose-500" },
    { id: "amber", color: "bg-amber-500" },
    { id: "fuchsia", color: "bg-fuchsia-500" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[14px] font-semibold text-white mb-5 flex items-center gap-2">
          <Moon size={16} className="text-white/40" />
          Theme
        </h3>
        <div className="flex gap-3">
          {(["dark", "light", "system"] as const).map((t) => (
            <button key={t} onClick={() => setTheme(t)} className={`flex-1 flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-300 ${theme === t ? "bg-white/[0.06] border-white/20 text-white" : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white/70"}`}>
              {t === "dark" ? <Moon size={20} /> : t === "light" ? <Sun size={20} /> : <Globe size={20} />}
              <span className="text-[12px] font-medium capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-white mb-5 flex items-center gap-2">
          <Palette size={16} className="text-white/40" />
          Accent Color
        </h3>
        <div className="flex items-center gap-3">
          {accents.map((a) => (
            <button key={a.id} onClick={() => setAccent(a.id)} className={`w-8 h-8 rounded-full ${a.color} transition-all duration-300 ${accent === a.id ? "scale-125 ring-2 ring-offset-2 ring-offset-black ring-white/30" : "hover:scale-110 opacity-60 hover:opacity-100"}`} />
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <p className="text-[13px] text-white/50 leading-relaxed">Theme customization is currently in preview. Full support for light mode and custom accents is coming soon.</p>
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const [connected, setConnected] = useState({ github: true, twitter: false });

  return (
    <div className="space-y-4">
      {([
        { key: "github" as const, icon: GitFork, label: "GitHub", desc: "Sync your repos and show open-source contributions.", username: connected.github ? "alexchen" : null },
        { key: "twitter" as const, icon: AtSign, label: "Twitter / X", desc: "Show your handle and grow your professional presence.", username: connected.twitter ? "@alexchendev" : null },
      ]).map(({ key, icon: Icon, label, desc, username }) => (
        <div key={key} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <Icon size={18} className="text-white/60" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-white">{label}</p>
              <p className="text-[12px] text-white/30 mt-0.5">{username ? <span className="text-emerald-400/70">{username}</span> : desc}</p>
            </div>
          </div>
          <button onClick={() => setConnected((prev) => ({ ...prev, [key]: !prev[key] }))} className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${connected[key] ? "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20" : "bg-white text-black hover:bg-white/90"}`}>
            {connected[key] ? "Disconnect" : "Connect"}
          </button>
        </div>
      ))}
    </div>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  const sectionContent: Record<SectionId, React.ReactNode> = {
    profile: <ProfileSection />,
    notifications: <NotificationsSection />,
    privacy: <PrivacySection />,
    appearance: <AppearanceSection />,
    integrations: <IntegrationsSection />,
  };

  return (
    <div className="px-4 lg:px-8 py-8 max-w-[1100px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-white mb-1.5">Settings</h1>
        <p className="text-[14px] text-white/40">Manage your account, preferences, and privacy.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="lg:w-56 flex-shrink-0">
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative ${isActive ? "text-white" : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"}`}>
                  {isActive && (
                    <motion.div layoutId="settings-nav-active" className="absolute inset-0 rounded-xl bg-white/[0.06]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className="relative z-10 flex-shrink-0" />
                  <div className="relative z-10 min-w-0">
                    <p className="text-[13px] font-medium truncate">{section.label}</p>
                    <p className={`text-[11px] truncate mt-0.5 ${isActive ? "text-white/40" : "text-white/20"}`}>{section.desc}</p>
                  </div>
                </button>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/[0.05]">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-300 text-[13px] font-medium">
                <LogOut size={16} strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </div>
        </motion.nav>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1 min-w-0">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="mb-8 pb-6 border-b border-white/[0.06]">
              <h2 className="text-[20px] font-semibold text-white tracking-tight">{sections.find((s) => s.id === activeSection)?.label}</h2>
              <p className="text-[13px] text-white/40 mt-1">{sections.find((s) => s.id === activeSection)?.desc}</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
                {sectionContent[activeSection]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

