"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  MoreHorizontal,
  Phone,
  Video,
  ArrowLeft,
  Check,
  CheckCheck,
  Sparkles,
} from "lucide-react";

/* --- Mock Data --- */

type Message = {
  id: string;
  text: string;
  sent: boolean;
  time: string;
  read: boolean;
};

type Conversation = {
  id: string;
  name: string;
  initials: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  color: string;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    initials: "SM",
    role: "UI/UX Designer",
    lastMessage: "I just pushed the new mockups to Figma, take a look!",
    time: "2m",
    unread: 3,
    online: true,
    color: "from-violet-500 to-fuchsia-500",
    messages: [
      { id: "1a", text: "Hey Alex! How's the project going?", sent: false, time: "10:24 AM", read: true },
      { id: "1b", text: "Going great! Just finished the API integration.", sent: true, time: "10:26 AM", read: true },
      { id: "1c", text: "That's awesome. I've been working on the design system components.", sent: false, time: "10:28 AM", read: true },
      { id: "1d", text: "Can you share the Figma link?", sent: true, time: "10:30 AM", read: true },
      { id: "1e", text: "Sure thing! Give me a sec.", sent: false, time: "10:31 AM", read: true },
      { id: "1f", text: "I just pushed the new mockups to Figma, take a look!", sent: false, time: "10:33 AM", read: false },
    ],
  },
  {
    id: "2",
    name: "Jordan Lee",
    initials: "JL",
    role: "Backend Engineer",
    lastMessage: "The deployment pipeline is ready for review",
    time: "15m",
    unread: 1,
    online: true,
    color: "from-cyan-500 to-blue-500",
    messages: [
      { id: "2a", text: "I set up the CI/CD pipeline for the staging environment.", sent: false, time: "9:45 AM", read: true },
      { id: "2b", text: "Nice! What stack are you using?", sent: true, time: "9:50 AM", read: true },
      { id: "2c", text: "GitHub Actions with Docker. Pretty standard setup.", sent: false, time: "9:52 AM", read: true },
      { id: "2d", text: "The deployment pipeline is ready for review", sent: false, time: "10:15 AM", read: false },
    ],
  },
  {
    id: "3",
    name: "Aiden Park",
    initials: "AP",
    role: "Full-Stack Developer",
    lastMessage: "Sounds good, let's sync tomorrow at 3pm?",
    time: "1h",
    unread: 0,
    online: false,
    color: "from-emerald-500 to-teal-500",
    messages: [
      { id: "3a", text: "Hey Aiden, would love to collaborate on the GreenLoop project.", sent: true, time: "8:30 AM", read: true },
      { id: "3b", text: "Absolutely! I've been looking at similar sustainability projects.", sent: false, time: "8:45 AM", read: true },
      { id: "3c", text: "Great. Let me know when you're free to discuss the technical architecture.", sent: true, time: "9:00 AM", read: true },
      { id: "3d", text: "Sounds good, let's sync tomorrow at 3pm?", sent: false, time: "9:10 AM", read: true },
    ],
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    initials: "ER",
    role: "Product Manager",
    lastMessage: "I've drafted the PRD, sending it over now.",
    time: "3h",
    unread: 2,
    online: false,
    color: "from-amber-500 to-orange-500",
    messages: [
      { id: "4a", text: "Hey Elena! Ready to kick off the NexaPay sprint planning?", sent: true, time: "7:00 AM", read: true },
      { id: "4b", text: "Yes! I've been going through the backlog.", sent: false, time: "7:15 AM", read: true },
      { id: "4c", text: "I've drafted the PRD, sending it over now.", sent: false, time: "7:30 AM", read: false },
    ],
  },
];

/* --- Main Page --- */

export function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string>(conversations[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [localConversations, setLocalConversations] = useState(conversations);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = localConversations.find((c) => c.id === activeConversation);

  const filteredConversations = localConversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, localConversations]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;

    const msg: Message = {
      id: `new-${Date.now()}`,
      text: newMessage.trim(),
      sent: true,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      read: false,
    };

    setLocalConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation
          ? { ...c, messages: [...c.messages, msg], lastMessage: msg.text, time: "now" }
          : c
      )
    );
    setNewMessage("");
    inputRef.current?.focus();
  };

  const selectConversation = (id: string) => {
    setActiveConversation(id);
    setShowMobileChat(true);
  };

  return (
    <div className="px-4 lg:px-8 py-6 h-[calc(100vh-120px)] relative">
      {/* Soft background orb for the entire page */}
      {activeChat && (
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr ${activeChat.color} opacity-[0.03] blur-[120px] pointer-events-none transition-colors duration-1000`} 
        />
      )}

      <div className="h-full flex rounded-[32px] overflow-hidden border border-white/[0.04] bg-[#050505]/60 backdrop-blur-3xl shadow-2xl shadow-black/50">

        {/* Sidebar - Conversation list */}
        <div className={`${showMobileChat ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[360px] bg-white/[0.01] z-10 border-r border-white/[0.04]`}>
          
          {/* Sidebar header */}
          <div className="p-6 pb-4">
            <h1 className="text-[24px] font-semibold text-white tracking-tight mb-5 flex items-center gap-2">
              Messages
              <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40 text-[11px] font-mono tracking-widest uppercase">Beta</span>
            </h1>
            <div className="relative group">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/50 transition-colors" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-[13px] text-white/70 placeholder:text-white/20 outline-none focus:border-white/[0.15] focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-4">
            <div className="space-y-1">
              {filteredConversations.map((conv, idx) => {
                const isActive = activeConversation === conv.id;
                return (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => selectConversation(conv.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-300 relative group overflow-hidden ${
                      isActive
                        ? "bg-white/[0.06]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Subtle active glow behind the button */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${conv.color} opacity-[0.03]`} />
                    )}

                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? `bg-gradient-to-br ${conv.color} shadow-lg`
                          : "bg-white/[0.05] border border-white/[0.08]"
                      }`}>
                        <span className={`text-[13px] font-semibold tracking-wide ${isActive ? "text-white" : "text-white/50"}`}>
                          {conv.initials}
                        </span>
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-[2.5px] border-[#0a0a0a]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[14px] font-medium truncate transition-colors duration-300 ${
                          isActive || conv.unread > 0 ? "text-white" : "text-white/60"
                        }`}>
                          {conv.name}
                        </span>
                        <span className="text-[11px] font-medium text-white/20 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className={`text-[12px] truncate transition-colors duration-300 ${
                        isActive ? "text-white/60" : conv.unread > 0 ? "text-white/50" : "text-white/25"
                      }`}>
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unread > 0 && (
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-violet-400"}`} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className={`${showMobileChat ? "flex" : "hidden lg:flex"} flex-col flex-1 bg-black/20 z-0 relative`}>
          
          {/* Subtle noise texture over chat area */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

          {activeChat ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-6 lg:px-8 py-5 bg-white/[0.01] border-b border-white/[0.03] backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.05] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <div className="flex flex-col">
                    <p className="text-[16px] font-semibold text-white tracking-tight">{activeChat.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {activeChat.online && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      <p className="text-[12px] font-medium text-white/40">
                        {activeChat.online ? "Online now" : activeChat.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                    <Phone size={17} strokeWidth={1.5} />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                    <Video size={17} strokeWidth={1.5} />
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-2" />
                  <button className="flex items-center justify-center w-10 h-10 rounded-full text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                    <MoreHorizontal size={17} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 z-10 scrollbar-hide">
                <div className="space-y-6 max-w-3xl mx-auto">
                  {activeChat.messages.map((msg, idx) => {
                    const prevMsg = activeChat.messages[idx - 1];
                    const showGap = prevMsg && prevMsg.sent !== msg.sent;
                    
                    return (
                      <div key={msg.id} className={showGap ? "mt-8" : "mt-2"}>
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}
                        >
                          <div className="relative group max-w-[75%]">
                            <div
                              className={`px-5 py-3.5 text-[14px] leading-relaxed shadow-xl ${
                                msg.sent
                                  ? `bg-gradient-to-br ${activeChat.color} text-white rounded-3xl rounded-br-sm shadow-black/20`
                                  : "bg-white/[0.04] text-white/80 border border-white/[0.05] rounded-3xl rounded-bl-sm backdrop-blur-md"
                              }`}
                            >
                              <p>{msg.text}</p>
                            </div>
                            
                            {/* Timestamp - fades in on hover */}
                            <div className={`absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 ${
                              msg.sent ? "right-2" : "left-2"
                            }`}>
                              <span className="text-[10px] font-medium text-white/30">{msg.time}</span>
                              {msg.sent && (
                                msg.read
                                  ? <CheckCheck size={12} className="text-white/40 ml-0.5" />
                                  : <Check size={12} className="text-white/20 ml-0.5" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              </div>

              {/* Floating Input Area */}
              <div className="p-6 lg:p-8 pt-2 z-10">
                <div className="max-w-3xl mx-auto relative group">
                  {/* Subtle glow behind input when focused */}
                  <div className="absolute inset-0 bg-white/[0.03] blur-xl rounded-[24px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative flex items-center gap-3 bg-black/40 border border-white/[0.08] p-2 rounded-[24px] backdrop-blur-xl shadow-2xl shadow-black/40">
                    <button className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full text-white/30 hover:text-white hover:bg-white/[0.06] transition-all">
                      <Paperclip size={18} strokeWidth={1.5} />
                    </button>
                    
                    <div className="flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder={`Message ${activeChat.name.split(' ')[0]}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="w-full bg-transparent text-[14px] text-white placeholder:text-white/20 outline-none px-2"
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className={`flex-shrink-0 relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                        newMessage.trim()
                          ? "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          : "bg-white/[0.04] text-white/20"
                      }`}
                    >
                      <Send size={16} strokeWidth={1.5} className={newMessage.trim() ? "ml-0.5" : ""} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-center flex flex-col items-center">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-white/[0.02] to-white/[0.05] border border-white/[0.05] flex items-center justify-center mb-6 shadow-2xl shadow-black/20"
                >
                  <Sparkles size={28} strokeWidth={1} className="text-white/30" />
                </motion.div>
                <h3 className="text-[20px] font-semibold text-white tracking-tight mb-2">Your Messages</h3>
                <p className="text-[14px] text-white/30 max-w-xs leading-relaxed">
                  Select a conversation from the sidebar or start a new chat with a collaborator.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
