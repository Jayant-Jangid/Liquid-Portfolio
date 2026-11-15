import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Activity,
  Layers,
  Cpu,
  Eye,
  Workflow,
  Radio,
} from 'lucide-react';
import { LiquidShaderCanvas } from '../components/effects/LiquidShaderCanvas';
import { FluidDistortionImage } from '../components/effects/FluidDistortionImage';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { PROJECTS, CORE_METRICS, TESTIMONIALS } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { sound } from '../utils/audio';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Full Hero Liquid Shader Background Canvas */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] z-0 overflow-hidden pointer-events-none">
        <LiquidShaderCanvas
          preset="iridescent"
          viscosity={0.75}
          speed={1.0}
          turbulence={1.4}
          interactive={true}
          className="w-full h-full opacity-90"
        />
        {/* Smooth soft fade at bottom into content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/20 via-transparent to-[#050508] pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 max-w-6xl mx-auto text-center">

        {/* Live availability pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/15 text-xs font-mono text-slate-300 shadow-xl mb-6 backdrop-blur-md"
        >
          <span className="text-emerald-400 font-semibold">STAFF & LEAD ARCHITECTURE</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">OPEN FOR ENGAGEMENTS</span>
        </motion.div>

        {/* Hero headline with luxury editorial typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-cyan-300/90 font-medium">
            SENIOR FULL-STACK SYSTEMS & WEBGL ARCHITECT
          </div>
          <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.95]">
            AURA <span className="text-iridescent">VANCE</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed pt-2">
            Architecting <span className="text-white font-medium">high-concurrency distributed platforms</span> and{' '}
            <span className="text-cyan-300 font-medium">ethereal 60FPS fluid graphics</span> at the intersection of scale and sensory delight.
          </p>
        </motion.div>

        {/* Interactive CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          <NavLink
            to="/projects"
            onClick={() => sound.playHarmonicChime(520, 0.2)}
            className="group relative px-7 py-3.5 rounded-full text-sm font-mono font-medium text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl shadow-purple-950/50 border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            data-cursor="WORKS"
          >
            <span>EXPLORE ARCHITECTURE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>

          <NavLink
            to="/lab"
            onClick={() => sound.playLiquidRipple()}
            className="group px-7 py-3.5 rounded-full text-sm font-mono text-slate-200 glass-panel border border-white/15 hover:border-cyan-400/50 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            data-cursor="EXPERIMENT"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>ENTER LIQUID LAB</span>
          </NavLink>
        </motion.div>

        {/* Live System Diagnostics Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 sm:mt-16 flex items-center gap-4 sm:gap-8 text-xs font-mono text-slate-400 bg-[#0c0c16]/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-300">GPU: GLSL ES 3.0</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-slate-300">FRAME_PACE: 16.6ms (60 FPS)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">DRAG/HOVER: LIQUID_DISPLACE</span>
          </div>
        </motion.div>
      </section>

      {/* Core Architectural Metrics Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CORE_METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => sound.playHover(360 + idx * 40)}
              className="p-6 rounded-3xl glass-panel glass-panel-hover border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="font-syne text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                {metric.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mt-2 font-medium">
                {metric.label}
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Works Section with Liquid Hover Distortion */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4" /> CURATED_ARCHITECTURAL_WORKS
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured <span className="text-iridescent">Deployments</span>
            </h2>
          </div>
          <NavLink
            to="/projects"
            onClick={() => sound.playHarmonicChime(500, 0.15)}
            className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group"
            data-cursor="ALL"
          >
            <span>VIEW ALL 6 CASE STUDIES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => {
                sound.playHarmonicChime(640, 0.2);
                setSelectedProject(project);
              }}
              className="cursor-pointer group rounded-3xl glass-panel border border-white/10 hover:border-purple-500/50 overflow-hidden transition-all duration-500 flex flex-col justify-between"
              data-cursor="INSPECT"
            >
              {/* Liquid Ripple Canvas Image Preview */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <FluidDistortionImage
                  src={project.image}
                  alt={project.title}
                  intensity={1.2}
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md border border-white/20 text-cyan-300">
                  {project.categoryLabel}
                </div>
                <div className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-purple-400">
                    {project.metrics[0].label}: <span className="text-white font-bold">{project.metrics[0].value}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    READ_DOCS <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-28">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
          <div className="max-w-xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> ENGINEERING_PHILOSOPHY
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
              The Four Pillars of My <span className="text-iridescent">Architectural Practice</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="font-syne font-bold text-white text-lg">Subatomic Concurrency</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Zero-allocation pipelines using Go, Rust, and Kafka to process millions of streaming events with sub-millisecond p99 latencies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-syne font-bold text-white text-lg">GPU & Fluid Shaders</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Real-time WebGL/WebGPU shaders rendering Navier-Stokes fluid simulations, raymarched prism geometry, and dynamic physics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-syne font-bold text-white text-lg">Modular Resilience</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Self-healing micro-frontends with isolated blast radiuses, tokenized design systems, and automated visual regression testing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-syne font-bold text-white text-lg">0-Jank 60FPS Law</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Strict adherence to off-main-thread compute via Web Workers, OffscreenCanvas, and hardware-accelerated spring animations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Endorsements */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            INDUSTRY_VALIDATION
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white">
            Engineering <span className="text-iridescent">Endorsements</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between"
            >
              <p className="text-sm text-slate-300 italic font-sans leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <div className="font-syne font-bold text-sm text-white">{t.author}</div>
                  <div className="text-xs font-mono text-cyan-400">{t.role} • {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Liquid Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-24">
        <div className="relative p-8 sm:p-14 rounded-3xl glass-panel border border-white/20 text-center overflow-hidden">
          {/* Shimmering background fluid canvas */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <LiquidShaderCanvas preset="opal" speed={0.5} turbulence={1.0} interactive={false} />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AVAILABLE FOR SELECT ENGAGEMENTS
          </span>

          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Build a <span className="text-iridescent">High-Scale Digital Masterpiece</span>?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-xl mx-auto mt-4 leading-relaxed">
            Whether you need a Staff-level systems architect to scale distributed microservices or an award-winning creative developer to craft fluid WebGL experiences, let's connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <NavLink
              to="/contact"
              onClick={() => sound.playHarmonicChime(600, 0.25)}
              className="px-8 py-4 rounded-full text-sm font-mono font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-2xl shadow-purple-900/50 transition-all hover:scale-105 active:scale-95"
              data-cursor="INITIATE"
            >
              START ARCHITECTURAL CONVERSATION
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
