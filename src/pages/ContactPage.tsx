import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Clock,
  ShieldCheck,
  Terminal,
  ArrowUpRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

const PROJECT_TYPES = [
  'Full-Stack Architecture',
  'WebGL & Custom Shaders',
  'Distributed Infrastructure',
  'Staff / Principal Role',
];

const BUDGET_RANGES = [
  '<$25k MVP',
  '$25k — $50k',
  '$50k — $100k',
  '$100k+ Enterprise',
  'Full-Time Staff/Lead',
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    budget: BUDGET_RANGES[1],
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    sound.playHover(520);
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    sound.playHarmonicChime(440, 0.1);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playSuccessCelebration();

      // Trigger celebratory holographic iridescent confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#ffffff'],
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <Terminal className="w-4 h-4" /> TRANSMISSION_PORTAL // INITIALIZE_COMMUNICATION
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Initiate <span className="text-iridescent">Connection</span>
        </h1>
        <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base font-sans leading-relaxed">
          Whether discussing high-scale system architecture, bespoke WebGL shader experiences, or leadership roles, let's explore how we can collaborate.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Form Terminal */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/15 relative overflow-hidden shadow-2xl">
            {/* Top terminal bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">ARCH_DISPATCH_v3.2</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> E2EE ENCRYPTED
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>. Your architectural brief has been securely queued. I typically respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      sound.playHover(420);
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: PROJECT_TYPES[0],
                        budget: BUDGET_RANGES[1],
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full glass-panel border border-white/20 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    SEND ANOTHER DISPATCH
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ada@domain.io"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      ENGAGEMENT FOCUS
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => {
                              sound.playHover(480);
                              setFormData({ ...formData, projectType: type });
                            }}
                            className={`p-2.5 rounded-xl text-xs font-mono text-left transition-all ${
                              isSelected
                                ? 'bg-purple-600/30 border border-purple-500 text-cyan-300'
                                : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget / Scope */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      TARGET BUDGET / SCOPE
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_RANGES.map((b) => {
                        const isSelected = formData.budget === b;
                        return (
                          <button
                            type="button"
                            key={b}
                            onClick={() => {
                              sound.playHover(460);
                              setFormData({ ...formData, budget: b });
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                              isSelected
                                ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200'
                                : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      ARCHITECTURAL BRIEF / REQUIREMENTS *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detail your system constraints, throughput targets, timeline, or design ambitions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full font-mono text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-xl shadow-purple-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    data-cursor="DISPATCH"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        DISPATCHING_ENCRYPTED_PACKET...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>DISPATCH ARCHITECTURAL BRIEF</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Info & Live Telemetry Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> DIRECT_EMAIL_LINK
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-white truncate mr-2">
                {PERSONAL_INFO.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-cyan-300 transition-colors shrink-0"
                title="Copy email to clipboard"
                data-cursor="COPY"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> COPIED_TO_CLIPBOARD
              </div>
            )}
          </div>

          {/* Live Status Card */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 text-xs font-mono">
            <div className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> REAL_TIME_SLA_METRICS
            </div>

            <div className="space-y-3 text-slate-300">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">SAN FRANCISCO TIME:</span>
                <span className="text-white font-bold">{timeStr || '12:00:00 PST'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">RESPONSE LATENCY:</span>
                <span className="text-cyan-400 font-semibold">&lt; 24 Hours Guaranteed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">CURRENT STATUS:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE / ACCEPTING
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              EXTERNAL_NETWORKS
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/30 flex items-center justify-between transition-all"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/30 flex items-center justify-between transition-all"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/30 flex items-center justify-between transition-all"
              >
                <span>X / Twitter</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
              <a
                href="#readcv"
                onClick={(e) => {
                  e.preventDefault();
                  alert("ReadCV profile link");
                }}
                className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-cyan-500/30 flex items-center justify-between transition-all"
              >
                <span>ReadCV</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
