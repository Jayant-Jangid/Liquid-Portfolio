import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Layers, CheckCircle2, Zap, ChevronDown } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { sound } from '../../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playHover(380);
        onClose();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Reset scroll position to top whenever opened
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  // Use createPortal to mount directly to document.body, completely decoupling
  // the modal from any page scroll position, parent transforms, or filters.
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Full-screen Backdrop attached directly to viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playHover(380);
            onClose();
          }}
          className="fixed inset-0 bg-[#030308]/90 backdrop-blur-xl"
        />

        {/* Modal Window Dialog - guaranteed to fit and center in current viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[88vh] bg-[#0c0c16] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-200"
        >
          {/* Pinned Sticky Close Button */}
          <button
            onClick={() => {
              sound.playHover(380);
              onClose();
            }}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white hover:bg-white/25 hover:border-purple-400/60 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
            aria-label="Close modal (Escape)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container for Entire Modal Content */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain focus:outline-none"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#8b5cf6 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Hero Image Header */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-[#0c0c16]/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    BUILD_VER // {project.year}
                  </span>
                </div>
                <h2 className="font-syne text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-1 font-sans">
                  {project.subtitle}
                </p>
              </div>

              {/* Scroll down indicator badge */}
              <div className="absolute bottom-3 right-6 hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 pointer-events-none animate-pulse">
                <span>SCROLL_FOR_SPECS</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                {project.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="font-syne text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {m.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-xs font-mono uppercase text-cyan-400 tracking-widest flex items-center gap-1.5 mb-2">
                  <Layers className="w-4 h-4" /> SYSTEM_OVERVIEW
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Architecture Highlights */}
              <div>
                <h3 className="text-xs font-mono uppercase text-purple-400 tracking-widest flex items-center gap-1.5 mb-3">
                  <Cpu className="w-4 h-4" /> ARCHITECTURAL_DESIGN
                </h3>
                <ul className="space-y-2.5">
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
                  <div className="text-xs font-mono text-red-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-red-400" /> THE BOTTLENECK
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> THE RESOLUTION
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Tech stack pills */}
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                  TECHNOLOGY_STACK
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 pb-4">
                <div className="text-xs font-mono text-slate-400">
                  STATUS: <span className="text-emerald-400">PRODUCTION VERIFIED</span>
                </div>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-panel border border-white/10 hover:border-purple-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>VIEW SOURCE</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-900/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>LAUNCH DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
